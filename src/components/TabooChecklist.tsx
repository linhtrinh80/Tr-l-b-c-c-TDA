import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, ShieldCheck, HelpCircle } from 'lucide-react';
import { TabooCheck, GoldenQuestion } from '../types/aodai';

interface TabooChecklistProps {
  taboos: TabooCheck[];
  goldenQuestions: GoldenQuestion[];
}

export const TabooChecklist: React.FC<TabooChecklistProps> = ({ taboos, goldenQuestions }) => {
  const [activeTab, setActiveTab] = useState<'taboos' | 'golden'>('taboos');
  const violatedCount = taboos.filter((t) => t.violated).length;
  const passedQuestions = goldenQuestions.filter((q) => q.passed).length;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header with Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
            Kiểm Tra 11 Điều Cấm Kỵ & 10 Câu Hỏi Vàng
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Bộ lọc khắt khe xác định tính thẩm mỹ cao cấp và lỗi bố cục cốt tử
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-1.5 p-1 bg-stone-100 rounded-xl">
          <button
            onClick={() => setActiveTab('taboos')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              activeTab === 'taboos'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            11 Điều Cấm Kỵ ({violatedCount > 0 ? `Phát hiện ${violatedCount} lỗi` : 'An toàn'})
          </button>
          <button
            onClick={() => setActiveTab('golden')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              activeTab === 'golden'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            10 Câu Hỏi Vàng ({passedQuestions}/10 Đạt)
          </button>
        </div>
      </div>

      {/* Tab 1: 11 Điều Cấm Kỵ */}
      {activeTab === 'taboos' && (
        <div className="space-y-4">
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
            <span>
              Tài liệu V2.1 quy định: <strong>Chỉ cần 1 lỗi cấm kỵ</strong> là tác phẩm đã bị trừ điểm nặng và mất đi đẳng cấp Haute Couture.
            </span>
            <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
              violatedCount === 0
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-rose-100 text-rose-800'
            }`}>
              {violatedCount === 0 ? '✓ Đạt chuẩn an toàn' : `⚠ Có ${violatedCount} vi phạm`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {taboos.map((item) => {
              const isViolated = item.violated;
              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition ${
                    isViolated
                      ? 'bg-rose-50/60 border-rose-300 shadow-sm'
                      : 'bg-white border-stone-200/80 hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                        isViolated ? 'bg-rose-200 text-rose-900' : 'bg-stone-100 text-stone-700'
                      }`}>
                        Điều {item.id}
                      </span>
                      <h4 className={`text-xs font-bold ${isViolated ? 'text-rose-900' : 'text-stone-800'}`}>
                        {item.rule}
                      </h4>
                    </div>

                    {isViolated ? (
                      <span className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                        <XCircle className="w-3.5 h-3.5" />
                        Vi phạm
                      </span>
                    ) : (
                      <span className="shrink-0 flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Không vi phạm
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed pl-1 mt-1">
                    {item.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: 10 Câu Hỏi Vàng */}
      {activeTab === 'golden' && (
        <div className="space-y-4">
          <div className="p-3.5 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs text-amber-900">
            <strong>10 Câu Hỏi Vàng của Giám Tuyển:</strong> Đánh giá mức độ hoàn thiện tinh xảo từ thị giác, tỷ lệ đến sự tiết chế quý tộc của người thiết kế.
          </div>

          <div className="space-y-2.5">
            {goldenQuestions.map((q) => (
              <div
                key={q.id}
                className="p-3.5 bg-white border border-stone-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/50 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-800">
                      Câu {q.id}: {q.question}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 pl-4 border-l-2 border-amber-300">
                    {q.comment}
                  </p>
                </div>

                <div className="shrink-0 self-start sm:self-center">
                  {q.passed ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Đạt chuẩn
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Cần lưu ý
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
