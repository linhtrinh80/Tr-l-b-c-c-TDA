import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Layers, 
  ArrowRightLeft, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Eye, 
  Compass, 
  Palette, 
  ShieldAlert, 
  Users, 
  Check, 
  Copy,
  ChevronRight
} from 'lucide-react';
import { ComparisonSlot, ComparisonSynthesis, AoDaiAnalysisResult } from '../types/aodai';
import { DetailedScorecard } from './DetailedScorecard';
import { TabooChecklist } from './TabooChecklist';
import { ImprovementPlan } from './ImprovementPlan';

interface SideBySideComparisonViewProps {
  slots: ComparisonSlot[];
  synthesis: ComparisonSynthesis | null;
  onSelectSlotDetail?: (slotId: string) => void;
}

export const SideBySideComparisonView: React.FC<SideBySideComparisonViewProps> = ({
  slots,
  synthesis,
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'diffs' | 'awards' | 'detail'>('matrix');
  const [activeDetailSlotId, setActiveDetailSlotId] = useState<string>(slots[0]?.id || '');
  const [copied, setCopied] = useState<boolean>(false);

  // Filter slots that have results
  const validSlots = slots.filter((s) => !!s.result);

  if (validSlots.length === 0) return null;

  // Find overall highest score
  const highestScoreSlot = [...validSlots].sort(
    (a, b) => (b.result?.scores.totalScore || 0) - (a.result?.scores.totalScore || 0)
  )[0];

  const handleCopyComparisonReport = () => {
    if (!synthesis) return;
    const textReport = `
# BÁO CÁO SO SÁNH ĐA BẢN BỐ CỤC ÁO DÀI (CHUẨN V2.1)
${validSlots.map((s) => `- ${s.label}: ${s.result?.scores.totalScore}/100đ (${s.result?.scores.rank.name}) | Bố cục: ${s.result?.overview.layoutTypeVi}`).join('\n')}

## 1. TỔNG KẾT SO SÁNH:
${synthesis.summary}

## 2. ĐIỂM GIỐNG NHAU:
${synthesis.similarities?.map((sim) => `• ${sim.aspect}: ${sim.description}`).join('\n')}

## 3. ĐIỂM KHÁC BIỆT CỐT LÕI:
${synthesis.differences?.map((d) => `• ${d.aspect}: ${d.keyInsight}`).join('\n')}

## 4. VINH DANH HẠNG MỤC:
- Mẫu xuất sắc nhất toàn diện: ${validSlots.find(s => s.id === synthesis.bestSelections.overallWinnerSlotId)?.label || 'Mẫu dẫn đầu'} (${synthesis.bestSelections.overallWinnerReason})
- Mẫu có dòng chảy (Flow) tốt nhất: ${validSlots.find(s => s.id === synthesis.bestSelections.bestFlowSlotId)?.label || 'N/A'}
- Mẫu có khoảng thở tinh tế nhất: ${validSlots.find(s => s.id === synthesis.bestSelections.bestNegativeSpaceSlotId)?.label || 'N/A'}
- Mẫu hack dáng/eo tốt nhất: ${validSlots.find(s => s.id === synthesis.bestSelections.bestHackDangSlotId)?.label || 'N/A'}
- Mẫu có kỹ thuật vẽ tay tốt nhất: ${validSlots.find(s => s.id === synthesis.bestSelections.bestCraftSlotId)?.label || 'N/A'}

## 5. LỜI KHUYÊN & ĐỀ XUẤT ỨNG DỤNG:
${synthesis.verdictAndAdvice}
    `.trim();

    navigator.clipboard.writeText(textReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getRankBadgeClass = (score: number) => {
    if (score >= 90) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (score >= 80) return 'bg-sky-100 text-sky-800 border-sky-300';
    if (score >= 70) return 'bg-indigo-100 text-indigo-800 border-indigo-300';
    if (score >= 60) return 'bg-amber-100 text-amber-800 border-amber-300';
    if (score >= 50) return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-rose-100 text-rose-800 border-rose-300';
  };

  const currentDetailSlot = validSlots.find((s) => s.id === activeDetailSlotId) || validSlots[0];

  return (
    <div className="space-y-6">
      {/* Visual Side-by-Side Gallery Cards */}
      <div className={`grid grid-cols-1 ${
        validSlots.length === 2
          ? 'md:grid-cols-2'
          : validSlots.length === 3
          ? 'md:grid-cols-3'
          : 'sm:grid-cols-2 lg:grid-cols-4'
      } gap-5`}>
        {validSlots.map((slot, index) => {
          const res = slot.result as AoDaiAnalysisResult;
          const isWinner = slot.id === highestScoreSlot?.id;
          const violatedCount = res.tabooChecks.filter((t) => t.violated).length;

          return (
            <div
              key={slot.id}
              className={`rounded-2xl border overflow-hidden bg-white shadow-md transition flex flex-col justify-between ${
                isWinner
                  ? 'border-amber-400 ring-2 ring-amber-400/40'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              {/* Card Header */}
              <div className="p-3.5 bg-stone-900 text-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-amber-500/20 text-amber-300 text-xs font-bold font-serif flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-xs font-serif font-bold truncate max-w-[150px]">
                    {slot.label}
                  </span>
                </div>

                {isWinner && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-900 text-[10px] font-bold flex items-center gap-1 shadow-sm">
                    <Trophy className="w-3 h-3" />
                    Dẫn đầu ({res.scores.totalScore}đ)
                  </span>
                )}
              </div>

              {/* Image Preview Box with Badges */}
              <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden group">
                <img
                  src={slot.imageUrl || ''}
                  alt={slot.label}
                  className="w-full h-full object-contain"
                />

                {/* Score Pill Overlay */}
                <div className="absolute top-2.5 right-2.5 bg-stone-950/80 backdrop-blur-md border border-white/20 text-white rounded-xl px-2.5 py-1 text-center shadow-lg">
                  <span className="block text-base font-serif font-black text-amber-300 leading-none">
                    {res.scores.totalScore}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-stone-300">/100đ</span>
                </div>

                {/* Layout Type Overlay */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-stone-950/85 backdrop-blur-md border border-white/10 text-white rounded-lg p-2 text-xs shadow-lg space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-amber-300 font-semibold">{res.overview.designLevelName}</span>
                    {violatedCount > 0 ? (
                      <span className="text-rose-400 font-bold">⚠ {violatedCount} lỗi cấm</span>
                    ) : (
                      <span className="text-emerald-400 font-semibold">✓ An toàn</span>
                    )}
                  </div>
                  <div className="font-serif font-bold truncate text-[11px] text-stone-100">
                    {res.overview.layoutTypeVi}
                  </div>
                </div>
              </div>

              {/* Card Footer Quick Specs */}
              <div className="p-3 bg-stone-50 border-t border-stone-100 space-y-2 text-xs">
                <div className="flex justify-between items-center text-[11px] text-stone-600">
                  <span>Khoảng thở: {res.overview.negativeSpaceRatio.emptyPercent}%</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getRankBadgeClass(res.scores.totalScore)}`}>
                    {res.scores.rank.name.split('/')[0].trim()}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveDetailSlotId(slot.id);
                    setActiveTab('detail');
                  }}
                  className="w-full py-1.5 px-2 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-stone-700 text-[11px] font-medium flex items-center justify-center gap-1 transition"
                >
                  <span>Xem thẩm định chi tiết</span>
                  <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-stone-200/80 shadow-sm">
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl transition ${
              activeTab === 'matrix'
                ? 'bg-amber-800 text-white shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-amber-300" />
            1. Ma Trận Đối Chiếu Điểm Số & Tiêu Chí
          </button>
          <button
            onClick={() => setActiveTab('diffs')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl transition ${
              activeTab === 'diffs'
                ? 'bg-amber-800 text-white shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            2. Điểm Giống & Khác Nhau
          </button>
          <button
            onClick={() => setActiveTab('awards')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl transition ${
              activeTab === 'awards'
                ? 'bg-amber-800 text-white shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            3. Vinh Danh & Đề Xuất Ứng Dụng
          </button>
          <button
            onClick={() => setActiveTab('detail')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl transition ${
              activeTab === 'detail'
                ? 'bg-amber-800 text-white shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            4. Thẩm Định Chi Tiết Từng Mẫu
          </button>
        </div>

        {/* Copy comparison report */}
        <div className="flex items-center gap-2 px-2 self-end sm:self-center">
          <button
            onClick={handleCopyComparisonReport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition"
            title="Sao chép toàn bộ báo cáo so sánh"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-500" />
                <span>Sao chép kết quả so sánh</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* TAB 1: MA TRẬN ĐỐI CHIẾU TIÊU CHÍ (MATRIX TABLE) */}
      {activeTab === 'matrix' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
              Bảng Ma Trận Đối Chiếu Các Tiêu Chí Chuẩn Mực V2.1
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              So sánh trực diện 5 cấu phần, tỷ lệ khoảng thở và các điều cấm kỵ giữa các mẫu
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-stone-200 border-collapse">
              <thead>
                <tr className="bg-stone-900 text-stone-100">
                  <th className="p-3 text-left font-serif font-bold w-1/4">Tiêu Chí Thẩm Định</th>
                  {validSlots.map((slot) => {
                    const isWinner = slot.id === highestScoreSlot?.id;
                    return (
                      <th key={slot.id} className="p-3 text-center border-l border-stone-800">
                        <div className="font-serif font-bold text-sm text-amber-200 flex items-center justify-center gap-1.5">
                          {isWinner && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
                          <span>{slot.label}</span>
                        </div>
                        <span className="text-[10px] text-stone-400 font-normal">
                          {slot.result?.overview.title}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {/* 1. Tổng điểm */}
                <tr className="bg-amber-50/50">
                  <td className="p-3 font-bold text-stone-900">
                    TỔNG ĐIỂM CHUẨN (Thang 100)
                  </td>
                  {validSlots.map((slot) => {
                    const s = slot.result?.scores.totalScore || 0;
                    const isWinner = slot.id === highestScoreSlot?.id;
                    return (
                      <td key={slot.id} className="p-3 text-center border-l border-stone-200">
                        <span className={`text-base font-serif font-black ${isWinner ? 'text-amber-800' : 'text-stone-800'}`}>
                          {s} / 100
                        </span>
                        {isWinner && (
                          <span className="block text-[10px] text-amber-700 font-bold uppercase mt-0.5">
                            ★ Cao nhất
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* 2. Xếp hạng */}
                <tr>
                  <td className="p-3 font-semibold text-stone-700">Xếp Hạng Chuẩn V2.1</td>
                  {validSlots.map((slot) => (
                    <td key={slot.id} className="p-3 text-center border-l border-stone-200 font-medium">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getRankBadgeClass(slot.result?.scores.totalScore || 0)}`}>
                        {slot.result?.scores.rank.name}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 3. Level Tư duy */}
                <tr className="bg-stone-50/50">
                  <td className="p-3 font-semibold text-stone-700">Cấp Độ Tư Duy Thiết Kế (L1 - L5)</td>
                  {validSlots.map((slot) => (
                    <td key={slot.id} className="p-3 text-center border-l border-stone-200">
                      <strong className="text-stone-900 block font-serif">
                        {slot.result?.overview.designLevelName}
                      </strong>
                      <span className="text-[10px] text-stone-500">
                        {slot.result?.overview.designLevelDesc}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 4. Nhóm Bố Cục & Dòng Chảy */}
                <tr>
                  <td className="p-3 font-semibold text-stone-700">Nhóm Bố Cục & Dòng Chảy (Flow)</td>
                  {validSlots.map((slot) => (
                    <td key={slot.id} className="p-3 text-center border-l border-stone-200">
                      <span className="font-bold text-stone-800 block">
                        {slot.result?.overview.layoutTypeVi}
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        Dòng chảy: {slot.result?.overview.flowType}
                      </span>
                      <span className="text-[10px] text-amber-700 block font-medium">
                        Cấu trúc: {slot.result?.overview.structureType}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 5. Cấu phần A: Bố cục tổng thể 25% */}
                <tr className="bg-stone-50/50">
                  <td className="p-3 font-semibold text-stone-700">
                    Phần A: Bố cục tổng thể & Dòng chảy (25%)
                  </td>
                  {validSlots.map((slot) => (
                    <td key={slot.id} className="p-3 text-center border-l border-stone-200">
                      <span className="text-sm font-bold text-stone-900">
                        {slot.result?.scores.categoryA.weightedScore} / 25đ
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        (Thô: {slot.result?.scores.categoryA.rawTotal}/30)
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 6. Cấu phần B: Chuyển động thị giác 15% */}
                <tr>
                  <td className="p-3 font-semibold text-stone-700">
                    Phần B: Dẫn mắt & Nhịp điệu (15%)
                  </td>
                  {validSlots.map((slot) => (
                    <td key={slot.id} className="p-3 text-center border-l border-stone-200">
                      <span className="text-sm font-bold text-stone-900">
                        {slot.result?.scores.categoryB.weightedScore} / 15đ
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        (Thô: {slot.result?.scores.categoryB.rawTotal}/15)
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 7. Cấu phần C: Khoảng thở 20% */}
                <tr className="bg-stone-50/50">
                  <td className="p-3 font-semibold text-stone-700">
                    Phần C: Cân bằng & Khoảng thở (20%)
                  </td>
                  {validSlots.map((slot) => {
                    const c = slot.result?.scores.categoryC;
                    const ratio = slot.result?.overview.negativeSpaceRatio;
                    return (
                      <td key={slot.id} className="p-3 text-center border-l border-stone-200">
                        <span className="text-sm font-bold text-stone-900">
                          {c?.weightedScore} / 20đ
                        </span>
                        <div className="mt-1 flex items-center justify-center gap-1 text-[10px] text-stone-600">
                          <span>Trống: {ratio?.emptyPercent}%</span>
                          <span>|</span>
                          <span>Hoa: {ratio?.motifPercent}%</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* 8. Cấu phần D: Màu sắc & Hack dáng 20% */}
                <tr>
                  <td className="p-3 font-semibold text-stone-700">
                    Phần D: Màu sắc & Hack dáng V2.1 (20%)
                  </td>
                  {validSlots.map((slot) => (
                    <td key={slot.id} className="p-3 text-center border-l border-stone-200">
                      <span className="text-sm font-bold text-stone-900">
                        {slot.result?.scores.categoryD.weightedScore} / 20đ
                      </span>
                      <span className="text-[10px] text-stone-500 block">
                        {slot.result?.overview.colorPalette.styleCategory}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 9. Cấu phần E: Kỹ thuật nét vẽ 20% */}
                <tr className="bg-stone-50/50">
                  <td className="p-3 font-semibold text-stone-700">
                    Phần E: Kỹ thuật vẽ & Hoàn thiện (20%)
                  </td>
                  {validSlots.map((slot) => (
                    <td key={slot.id} className="p-3 text-center border-l border-stone-200">
                      <span className="text-sm font-bold text-stone-900">
                        {slot.result?.scores.categoryE.weightedScore} / 20đ
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 10. Điều cấm kỵ */}
                <tr>
                  <td className="p-3 font-semibold text-stone-700">Kiểm Tra 11 Điều Cấm Kỵ</td>
                  {validSlots.map((slot) => {
                    const violated = slot.result?.tabooChecks.filter((t) => t.violated) || [];
                    return (
                      <td key={slot.id} className="p-3 text-center border-l border-stone-200">
                        {violated.length === 0 ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            0 Lỗi (An toàn)
                          </span>
                        ) : (
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-1 text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                              <XCircle className="w-3.5 h-3.5" />
                              {violated.length} Vi phạm
                            </span>
                            <div className="text-[10px] text-rose-600 line-clamp-2">
                              {violated.map((v) => `Điều ${v.id}`).join(', ')}
                            </div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ĐIỂM GIỐNG NHAU & KHÁC BIỆT (SIMILARITIES & DIFFERENCES) */}
      {activeTab === 'diffs' && synthesis && (
        <div className="space-y-6">
          {/* Summary Box */}
          <div className="bg-amber-950 text-amber-100 rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-900/50 space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Tổng Quan So Sánh Đối Chiếu Đa Bản
            </span>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
              {synthesis.summary}
            </p>
          </div>

          {/* Section: Điểm Giống Nhau */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-base border-b pb-3">
              <div className="p-1.5 bg-sky-100 text-sky-800 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span>Các Điểm Tương Đồng Nổi Bật Giữa Các Mẫu</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {synthesis.similarities?.map((sim, idx) => (
                <div key={idx} className="p-4 bg-sky-50/40 border border-sky-100 rounded-xl space-y-1">
                  <h4 className="font-bold text-sky-950 text-xs flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-sky-200 text-sky-900 flex items-center justify-center text-[10px] font-mono">
                      {idx + 1}
                    </span>
                    {sim.aspect}
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed pl-5">
                    {sim.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Điểm Khác Biệt Then Chốt */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-base border-b pb-3">
              <div className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
                <ArrowRightLeft className="w-4 h-4" />
              </div>
              <span>Các Điểm Khác Biệt Cốt Tử Giữa Các Mẫu</span>
            </div>

            <div className="space-y-4">
              {synthesis.differences?.map((diff, idx) => (
                <div key={idx} className="p-5 bg-stone-50/70 border border-stone-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
                    <span className="font-serif font-bold text-stone-900 text-xs sm:text-sm">
                      {idx + 1}. Khía cạnh: {diff.aspect}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                      Đối chiếu trực tiếp
                    </span>
                  </div>

                  {/* Per-slot observations */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {diff.comparisons?.map((c, i) => (
                      <div key={i} className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                        <strong className="text-xs text-amber-900 block font-serif">
                          {c.label}:
                        </strong>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {c.observation}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Key Insight */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs text-amber-950 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold block">Đúc kết chuyên môn:</strong>
                      <span>{diff.keyInsight}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: VINH DANH HẠNG MỤC & KỊCH BẢN ỨNG DỤNG */}
      {activeTab === 'awards' && synthesis && (
        <div className="space-y-6">
          {/* Overall Champion Banner */}
          <div className="bg-gradient-to-r from-amber-700 via-stone-900 to-amber-900 text-amber-100 rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-600/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-stone-950 font-bold rounded-full text-xs">
                <Trophy className="w-3.5 h-3.5" />
                Phương Án Xuất Sắc Nhất Toàn Diện (Overall Winner)
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
                {validSlots.find((s) => s.id === synthesis.bestSelections?.overallWinnerSlotId)?.label || highestScoreSlot?.label}
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
                {synthesis.bestSelections?.overallWinnerReason}
              </p>
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center shrink-0 min-w-[180px]">
              <span className="text-[11px] uppercase tracking-wider text-amber-300 block">Điểm thẩm định</span>
              <span className="text-4xl font-serif font-black text-white">
                {validSlots.find((s) => s.id === synthesis.bestSelections?.overallWinnerSlotId)?.result?.scores.totalScore || highestScoreSlot?.result?.scores.totalScore}
              </span>
              <span className="text-xs text-stone-300 block">/100 Điểm Chuẩn</span>
            </div>
          </div>

          {/* Category Winners (4 Grid Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Best Flow */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-xs border-b pb-2">
                <Compass className="w-4 h-4 text-sky-600" />
                <span>Dòng Chảy (Flow) Xuất Sắc Nhất</span>
              </div>
              <div className="text-sm font-bold text-sky-950">
                {validSlots.find((s) => s.id === synthesis.bestSelections?.bestFlowSlotId)?.label || 'Mẫu dẫn đầu'}
              </div>
              <p className="text-[11px] text-stone-500">
                Đáp ứng chuẩn liên tục không đứt đoạn, dẫn dắt nhịp mắt uyển chuyển.
              </p>
            </div>

            {/* Best Negative Space */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-xs border-b pb-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>Khoảng Thở Tinh Tế Nhất</span>
              </div>
              <div className="text-sm font-bold text-emerald-950">
                {validSlots.find((s) => s.id === synthesis.bestSelections?.bestNegativeSpaceSlotId)?.label || 'Mẫu dẫn đầu'}
              </div>
              <p className="text-[11px] text-stone-500">
                Khoảng trống là nhân vật chính, tạo cảm giác sang trọng và không bị ngột ngạt.
              </p>
            </div>

            {/* Best Hack Dáng */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-xs border-b pb-2">
                <Palette className="w-4 h-4 text-purple-600" />
                <span>Chiến Lược Hack Dáng (D4) Tốt Nhất</span>
              </div>
              <div className="text-sm font-bold text-purple-950">
                {validSlots.find((s) => s.id === synthesis.bestSelections?.bestHackDangSlotId)?.label || 'Mẫu dẫn đầu'}
              </div>
              <p className="text-[11px] text-stone-500">
                Cành xuyên eo 45°, gradient dọc hoặc tương phản màu sắc giúp kéo dài dáng và siết eo ảo.
              </p>
            </div>

            {/* Best Craft */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-xs border-b pb-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Kỹ Thuật Vẽ & Hoàn Thiện Tốt Nhất</span>
              </div>
              <div className="text-sm font-bold text-amber-950">
                {validSlots.find((s) => s.id === synthesis.bestSelections?.bestCraftSlotId)?.label || 'Mẫu dẫn đầu'}
              </div>
              <p className="text-[11px] text-stone-500">
                Nét vẽ sắc mịn, chuyển sắc trong suốt, gân lá chừa sáng và nhụy hoa 3D tinh xảo.
              </p>
            </div>
          </div>

          {/* Scenario Recommendations */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-base border-b pb-3">
              <Users className="w-4 h-4 text-amber-700" />
              <span>Khuyến Nghị Lựa Chọn Theo Từng Kịch Bản Sử Dụng & Vóc Dáng</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {synthesis.scenarioRecommendations?.map((rec, idx) => {
                const recSlot = validSlots.find((s) => s.id === rec.recommendedSlotId);
                return (
                  <div key={idx} className="p-4 bg-stone-50/70 border border-stone-200 rounded-xl space-y-2">
                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                      {rec.scenario}
                    </span>
                    <div className="text-xs font-serif font-bold text-stone-900 flex items-center gap-1.5">
                      <span>Đề xuất:</span>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-bold">
                        {recSlot?.label || rec.recommendedSlotId}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {rec.reason}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strategic Advice for Designer */}
          <div className="bg-stone-900 text-stone-200 rounded-2xl p-6 sm:p-8 border border-stone-800 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Lời Khuyên Chiến Lược Cho Nhà Thiết Kế & Nghệ Nhân May
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans bg-white/5 p-4 rounded-xl border border-white/10">
              {synthesis.verdictAndAdvice}
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: THẨM ĐỊNH CHI TIẾT TỪNG MẪU (INDIVIDUAL DETAIL DEEP DIVE) */}
      {activeTab === 'detail' && currentDetailSlot?.result && (
        <div className="space-y-6">
          {/* Sub-selector for slots */}
          <div className="flex items-center gap-2 bg-stone-100 p-2 rounded-xl">
            <span className="text-xs text-stone-500 font-medium px-2">Đang xem mẫu:</span>
            {validSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setActiveDetailSlotId(slot.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition ${
                  activeDetailSlotId === slot.id
                    ? 'bg-amber-800 text-white shadow-sm'
                    : 'bg-white text-stone-700 hover:bg-stone-200'
                }`}
              >
                {slot.label} ({slot.result?.scores.totalScore}đ)
              </button>
            ))}
          </div>

          {/* Render individual detailed sections for the selected slot */}
          <DetailedScorecard result={currentDetailSlot.result} />
          <TabooChecklist
            taboos={currentDetailSlot.result.tabooChecks}
            goldenQuestions={currentDetailSlot.result.goldenQuestions}
          />
          <ImprovementPlan result={currentDetailSlot.result} />
        </div>
      )}
    </div>
  );
};
