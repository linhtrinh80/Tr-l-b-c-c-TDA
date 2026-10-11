import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ImageUploader } from './components/ImageUploader';
import { MultiImageUploader } from './components/MultiImageUploader';
import { ScoreOverview } from './components/ScoreOverview';
import { DetailedScorecard } from './components/DetailedScorecard';
import { TabooChecklist } from './components/TabooChecklist';
import { ImprovementPlan } from './components/ImprovementPlan';
import { SideBySideComparisonView } from './components/SideBySideComparisonView';
import { StandardModal } from './components/StandardModal';
import { PrintReport } from './components/PrintReport';
import { AoDaiAnalysisResult, ComparisonSlot, ComparisonSynthesis } from './types/aodai';
import { SAMPLE_AODAI_LIST } from './data/sampleAoDai';
import { 
  Sparkles, 
  Layers, 
  CheckSquare, 
  TrendingUp, 
  Copy, 
  Check, 
  AlertCircle, 
  ArrowRightLeft,
  BookOpen
} from 'lucide-react';
import { postJson } from './utils/apiClient';
import { optimizeImageForUpload } from './utils/imageCompressor';

export default function App() {
  const [appMode, setAppMode] = useState<'single' | 'compare'>('single');

  // Single-image evaluation state
  const [result, setResult] = useState<AoDaiAnalysisResult | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'scorecard' | 'taboos' | 'plan'>('overview');
  const [copied, setCopied] = useState<boolean>(false);

  // Multi-image comparison state
  const [slots, setSlots] = useState<ComparisonSlot[]>([
    {
      id: 'slot-1',
      label: 'Mẫu A (S-Flow)',
      imageUrl: SAMPLE_AODAI_LIST[0].imageUrl,
      mimeType: 'image/svg+xml',
      note: SAMPLE_AODAI_LIST[0].description,
      result: null,
    },
    {
      id: 'slot-2',
      label: 'Mẫu B (Vương Miện)',
      imageUrl: SAMPLE_AODAI_LIST[2].imageUrl,
      mimeType: 'image/svg+xml',
      note: SAMPLE_AODAI_LIST[2].description,
      result: null,
    },
  ]);
  const [comparisonSynthesis, setComparisonSynthesis] = useState<ComparisonSynthesis | null>(null);
  const [isComparing, setIsComparing] = useState<boolean>(false);

  // Common UI State
  const [isStandardOpen, setIsStandardOpen] = useState<boolean>(false);

  // --- Single-Image Handlers ---
  const handleSingleAnalyze = async (imageBase64: string, mimeType: string, note: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentImage(imageBase64);

    try {
      const { dataUrl, mimeType: optMime } = await optimizeImageForUpload(imageBase64);
      const data = await postJson<{ success: boolean; data: AoDaiAnalysisResult }>('/api/analyze-aodai', {
        imageBase64: dataUrl,
        mimeType: optMime,
        note,
      });

      setResult(data.data);
      setActiveTab('overview');
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Không thể kết nối đến máy chủ thẩm định AI.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopySingleReport = () => {
    if (!result) return;
    const textReport = `
# BÁO CÁO THẨM ĐỊNH BỐ CỤC ÁO DÀI VẼ TAY (CHUẨN V2.1)
- Tác phẩm: ${result.overview.title || 'Mẫu áo dài'}
- Xếp hạng: ${result.scores.rank.name} (${result.scores.totalScore}/100 điểm)
- Cấp độ tư duy: ${result.overview.designLevelName}
- Nhóm bố cục: ${result.overview.layoutTypeVi} (${result.overview.layoutType})
- Dòng chảy: ${result.overview.flowType}
- Tỷ lệ khoảng thở: Họa tiết ${result.overview.negativeSpaceRatio.motifPercent}% / Trống ${result.overview.negativeSpaceRatio.emptyPercent}%

## 1. ĐIỂM SỐ 5 CẤU PHẦN:
- A. Bố cục tổng thể (25%): ${result.scores.categoryA.weightedScore}/25
- B. Chuyển động thị giác (15%): ${result.scores.categoryB.weightedScore}/15
- C. Cân bằng & Khoảng thở (20%): ${result.scores.categoryC.weightedScore}/20
- D. Màu sắc, Tương phản & Hack dáng (20%): ${result.scores.categoryD.weightedScore}/20
- E. Kỹ thuật nét vẽ & Hoàn thiện (20%): ${result.scores.categoryE.weightedScore}/20

## 2. ĐIỂM MẠNH:
${result.strengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## 3. ĐIỂM CẦN CẢI THIỆN:
${result.weaknesses.map((w, i) => `${i + 1}. ${w}`).join('\n')}

## 4. KẾT LUẬN:
${result.verdict.overallConclusion}
    `.trim();

    navigator.clipboard.writeText(textReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // --- Multi-Image Comparison Handlers ---
  const handleUpdateSlot = (slotId: string, updates: Partial<ComparisonSlot>) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, ...updates, result: updates.imageUrl !== undefined ? null : s.result } : s))
    );
    // Reset synthesis if images change
    if (updates.imageUrl !== undefined) {
      setComparisonSynthesis(null);
    }
  };

  const handleAddSlot = () => {
    if (slots.length >= 4) return;
    const nextIdx = slots.length + 1;
    setSlots((prev) => [
      ...prev,
      {
        id: `slot-${Date.now()}`,
        label: `Mẫu ${nextIdx}`,
        imageUrl: null,
        mimeType: 'image/jpeg',
        result: null,
      },
    ]);
  };

  const handleRemoveSlot = (slotId: string) => {
    if (slots.length <= 2) return;
    setSlots((prev) => prev.filter((s) => s.id !== slotId));
    setComparisonSynthesis(null);
  };

  const handleLoadPresetPair = (presetIds: string[]) => {
    const newSlots: ComparisonSlot[] = presetIds.map((pid, idx) => {
      const sample = SAMPLE_AODAI_LIST.find((s) => s.id === pid) || SAMPLE_AODAI_LIST[idx % SAMPLE_AODAI_LIST.length];
      return {
        id: `slot-${idx + 1}`,
        label: `Mẫu ${idx === 0 ? 'A' : idx === 1 ? 'B' : idx === 2 ? 'C' : 'D'} (${sample.title})`,
        imageUrl: sample.imageUrl,
        mimeType: 'image/svg+xml',
        note: sample.description,
        result: null,
      };
    });
    setSlots(newSlots);
    setComparisonSynthesis(null);
    setError(null);
  };

  const handleCompareAll = async () => {
    const validFilledSlots = slots.filter((s) => !!s.imageUrl);
    if (validFilledSlots.length < 2) {
      setError('Vui lòng cung cấp ít nhất 2 hình ảnh áo dài để thực hiện so sánh.');
      return;
    }

    setIsComparing(true);
    setError(null);

    try {
      // 1. Analyze each slot that doesn't have a result yet
      const evaluatedSlots: ComparisonSlot[] = await Promise.all(
        slots.map(async (slot) => {
          if (!slot.imageUrl) return slot;
          if (slot.result) return slot; // already evaluated

          try {
            const { dataUrl, mimeType: optMime } = await optimizeImageForUpload(slot.imageUrl);
            const data = await postJson<{ success: boolean; data: AoDaiAnalysisResult }>('/api/analyze-aodai', {
              imageBase64: dataUrl,
              mimeType: optMime,
              note: slot.note || '',
            });
            return { ...slot, result: data.data };
          } catch (slotErr: any) {
            console.error(`Error analyzing slot ${slot.id}:`, slotErr);
            throw new Error(`Thất bại khi thẩm định [${slot.label}]: ${slotErr?.message}`);
          }
        })
      );

      setSlots(evaluatedSlots);

      // 2. Cross-compare the analyzed results
      const comparePayload = evaluatedSlots
        .filter((s) => !!s.result)
        .map((s) => ({
          id: s.id,
          label: s.label,
          result: s.result,
        }));

      const compData = await postJson<{ success: boolean; data: ComparisonSynthesis }>('/api/compare-aodai', {
        items: comparePayload,
      });

      setComparisonSynthesis(compData.data);
    } catch (err: any) {
      console.error('Lỗi khi so sánh đa bản:', err);
      setError(err?.message || 'Quá trình so sánh gặp sự cố. Vui lòng thử lại.');
    } finally {
      setIsComparing(false);
    }
  };

  // --- Reset & Print ---
  const handleReset = () => {
    if (appMode === 'single') {
      setResult(null);
      setCurrentImage(null);
    } else {
      setComparisonSynthesis(null);
      setSlots((prev) => prev.map((s) => ({ ...s, result: null })));
    }
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const hasResult = appMode === 'single' ? !!result : !!comparisonSynthesis;

  return (
    <div className="min-h-screen bg-stone-100/60 text-stone-900 font-sans flex flex-col selection:bg-amber-200 selection:text-amber-900">
      {/* Top Navbar with Mode Toggle */}
      <Navbar
        onOpenStandard={() => setIsStandardOpen(true)}
        onReset={hasResult ? handleReset : undefined}
        onPrint={hasResult ? handlePrint : undefined}
        hasResult={hasResult}
        appMode={appMode}
        onChangeMode={(newMode) => {
          setAppMode(newMode);
          setError(null);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Error notification */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl flex items-start gap-3 text-rose-900 text-xs sm:text-sm shadow-sm">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong>Có lỗi xảy ra:</strong> {error}
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs font-bold text-rose-700 hover:underline"
            >
              Đóng
            </button>
          </div>
        )}

        {/* MODE 1: SINGLE-IMAGE EVALUATION */}
        {appMode === 'single' && (
          <>
            {/* Upload & Inspect Section */}
            <section>
              <ImageUploader onAnalyze={handleSingleAnalyze} isLoading={isLoading} />
            </section>

            {/* Evaluation Results Dashboard */}
            {result && (
              <section className="space-y-6 animate-fadeIn pt-2">
                {/* Navigation Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-stone-200/80 shadow-sm">
                  <div className="flex flex-wrap gap-1">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl transition ${
                        activeTab === 'overview'
                          ? 'bg-amber-800 text-white shadow-sm font-semibold'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      1. Tổng Quan & Điểm Số
                    </button>
                    <button
                      onClick={() => setActiveTab('scorecard')}
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl transition ${
                        activeTab === 'scorecard'
                          ? 'bg-amber-800 text-white shadow-sm font-semibold'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      2. Bảng Điểm 5 Cấu Phần (A-E)
                    </button>
                    <button
                      onClick={() => setActiveTab('taboos')}
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl transition ${
                        activeTab === 'taboos'
                          ? 'bg-amber-800 text-white shadow-sm font-semibold'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                      }`}
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      3. 11 Điều Cấm & 10 Câu Hỏi Vàng
                    </button>
                    <button
                      onClick={() => setActiveTab('plan')}
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl transition ${
                        activeTab === 'plan'
                          ? 'bg-amber-800 text-white shadow-sm font-semibold'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                      }`}
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                      4. Điểm Mạnh & Lộ Trình Nâng Hạng
                    </button>
                  </div>

                  {/* Single report copy */}
                  <div className="flex items-center gap-2 px-2 self-end sm:self-center">
                    <button
                      onClick={handleCopySingleReport}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition"
                      title="Sao chép toàn bộ báo cáo"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Đã sao chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-stone-500" />
                          <span>Sao chép báo cáo</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Tab content */}
                <div className="transition-all duration-200">
                  {activeTab === 'overview' && <ScoreOverview result={result} />}
                  {activeTab === 'scorecard' && <DetailedScorecard result={result} />}
                  {activeTab === 'taboos' && (
                    <TabooChecklist
                      taboos={result.tabooChecks}
                      goldenQuestions={result.goldenQuestions}
                    />
                  )}
                  {activeTab === 'plan' && <ImprovementPlan result={result} />}
                </div>
              </section>
            )}
          </>
        )}

        {/* MODE 2: MULTI-IMAGE COMPARISON */}
        {appMode === 'compare' && (
          <div className="space-y-8">
            {/* Multi-Image Upload & Slot Setup */}
            <section>
              <MultiImageUploader
                slots={slots}
                onUpdateSlot={handleUpdateSlot}
                onAddSlot={handleAddSlot}
                onRemoveSlot={handleRemoveSlot}
                onCompare={handleCompareAll}
                isComparing={isComparing}
                onLoadPresetPair={handleLoadPresetPair}
              />
            </section>

            {/* Comparison Results */}
            {slots.some((s) => !!s.result) && (
              <section className="space-y-6 animate-fadeIn">
                <SideBySideComparisonView
                  slots={slots}
                  synthesis={comparisonSynthesis}
                />
              </section>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-stone-900 text-stone-400 border-t border-stone-800 text-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-amber-200">Họa Sắc Áo Dài</span>
            <span>—</span>
            <span>Thẩm định đơn bản & So sánh đối chiếu đa bản bố cục áo dài vẽ tay theo Chuẩn V2.1</span>
          </div>
          <div className="flex items-center gap-4 text-stone-500">
            <button
              onClick={() => setIsStandardOpen(true)}
              className="hover:text-amber-300 transition flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Quy chuẩn V2.1
            </button>
            <span>•</span>
            <span>Haute Couture Fashion Standard</span>
          </div>
        </div>
      </footer>

      {/* Printable Certificate (Single or Comparison) */}
      <PrintReport
        result={result}
        imageUrl={currentImage}
        isCompareMode={appMode === 'compare'}
        comparisonSlots={slots}
        synthesis={comparisonSynthesis}
      />

      {/* Reference Handbook Modal */}
      <StandardModal
        isOpen={isStandardOpen}
        onClose={() => setIsStandardOpen(false)}
      />
    </div>
  );
}
