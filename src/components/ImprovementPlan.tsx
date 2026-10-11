import React from 'react';
import { CheckCircle2, AlertCircle, ArrowUpRight, Sparkles, Tag, Users, Shirt, ShoppingBag } from 'lucide-react';
import { AoDaiAnalysisResult } from '../types/aodai';

interface ImprovementPlanProps {
  result: AoDaiAnalysisResult;
}

export const ImprovementPlan: React.FC<ImprovementPlanProps> = ({ result }) => {
  const { strengths, weaknesses, improvementSuggestions, verdict } = result;

  return (
    <div className="space-y-6">
      {/* 2-Column: Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-base border-b pb-3">
            <div className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span>Điểm Mạnh Nổi Bật Theo Chuẩn V2.1</span>
          </div>

          <ul className="space-y-3">
            {strengths && strengths.length > 0 ? (
              strengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-emerald-200">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-xs text-stone-500 italic">Chưa ghi nhận điểm mạnh đặc sắc.</li>
            )}
          </ul>
        </div>

        {/* Weaknesses / Points for Improvement */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-base border-b pb-3">
            <div className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
              <AlertCircle className="w-4 h-4" />
            </div>
            <span>Điểm Cần Khắc Phục & Tinh Chỉnh</span>
          </div>

          <ul className="space-y-3">
            {weaknesses && weaknesses.length > 0 ? (
              weaknesses.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-amber-200">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-xs text-emerald-700 font-medium">Bố cục đã được xử lý rất hài hòa, không phát hiện nhược điểm lớn.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Action Plan / Suggestions Table */}
      {improvementSuggestions && improvementSuggestions.length > 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="border-b border-stone-200 pb-3">
            <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Lộ Trình Tinh Chỉnh Bố Cục Nâng Hạng Tác Phẩm
            </h3>
            <p className="text-xs text-stone-500">
              Giải pháp can thiệp kỹ thuật cụ thể dành cho nghệ nhân & nhà thiết kế
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {improvementSuggestions.map((plan, idx) => (
              <div
                key={idx}
                className="p-4 bg-stone-50/70 rounded-xl border border-stone-200 space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wider">
                      {plan.aspect}
                    </span>
                    <span className="text-[11px] font-mono text-stone-400">#0{idx + 1}</span>
                  </div>

                  <div>
                    <span className="text-[11px] text-stone-500 font-medium block">Vấn đề hiện tại:</span>
                    <p className="text-xs text-stone-700 font-normal">{plan.currentIssue}</p>
                  </div>

                  <div>
                    <span className="text-[11px] text-amber-800 font-semibold block">Hành động điều chỉnh:</span>
                    <p className="text-xs text-stone-800 font-medium bg-white p-2 rounded-lg border border-stone-200">
                      {plan.actionStep}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200/60 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  <span>{plan.expectedImpact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Verdict & Commercial Advisory */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 rounded-2xl p-6 sm:p-8 text-stone-100 shadow-xl space-y-6 border border-stone-800">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
            Kết Luận Thẩm Định Chuyên Sâu
          </span>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-amber-100 mt-1">
            Đánh Giá Tổng Quan & Khuyến Nghị Ứng Dụng
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans bg-white/5 p-4 rounded-xl border border-white/10">
          {verdict.overallConclusion}
        </p>

        {/* 4 Application Criteria Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Silhouette */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Users className="w-4 h-4" />
              <span>Vóc Dáng Tôn Tối Ưu</span>
            </div>
            <p className="text-stone-300 text-[11px] leading-snug">
              {verdict.targetSilhouettes}
            </p>
          </div>

          {/* Occasions */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-sky-300 font-semibold">
              <Tag className="w-4 h-4" />
              <span>Dịp Sử Dụng Lý Tưởng</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {verdict.targetOccasions?.map((occ, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-200 border border-sky-500/20 text-[10px]">
                  {occ}
                </span>
              ))}
            </div>
          </div>

          {/* Fabric */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-purple-300 font-semibold">
              <Shirt className="w-4 h-4" />
              <span>Chất Liệu Khuyên Dùng</span>
            </div>
            <p className="text-stone-300 text-[11px] leading-snug">
              {verdict.recommendedFabric}
            </p>
          </div>

          {/* Commercial */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
              <ShoppingBag className="w-4 h-4" />
              <span>Tiềm Năng Thương Mại</span>
            </div>
            <p className="text-stone-300 text-[11px] leading-snug">
              {verdict.commercialViability}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
