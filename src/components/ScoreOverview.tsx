import React from 'react';
import { Award, Sparkles, Compass, Eye, ShieldAlert, CheckCircle2, Layers, Palette } from 'lucide-react';
import { AoDaiAnalysisResult } from '../types/aodai';

interface ScoreOverviewProps {
  result: AoDaiAnalysisResult;
}

export const ScoreOverview: React.FC<ScoreOverviewProps> = ({ result }) => {
  const { overview, scores, tabooChecks } = result;
  const violatedCount = tabooChecks.filter((t) => t.violated).length;

  const getRankColorClasses = (badgeColor: string) => {
    switch (badgeColor) {
      case 'emerald':
        return 'from-emerald-700 to-teal-900 text-emerald-100 border-emerald-500/40';
      case 'blue':
      case 'indigo':
        return 'from-sky-700 to-indigo-900 text-sky-100 border-sky-500/40';
      case 'amber':
        return 'from-amber-600 to-stone-900 text-amber-100 border-amber-500/40';
      case 'orange':
        return 'from-orange-600 to-amber-950 text-orange-100 border-orange-500/40';
      case 'rose':
      default:
        return 'from-rose-700 to-stone-950 text-rose-100 border-rose-500/40';
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'L5':
        return { label: 'L5: Triết học (Philosophical)', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      case 'L4':
        return { label: 'L4: Kể chuyện (Narrative)', color: 'bg-blue-100 text-blue-900 border-blue-300' };
      case 'L3':
        return { label: 'L3: Không gian 3D (3D Composition)', color: 'bg-indigo-100 text-indigo-900 border-indigo-300' };
      case 'L2':
        return { label: 'L2: Trang trí (Decorative)', color: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'L1':
      default:
        return { label: 'L1: Dán hoa (Placement)', color: 'bg-stone-200 text-stone-800 border-stone-300' };
    }
  };

  const levelInfo = getLevelBadge(overview.designLevel);

  return (
    <div className="space-y-6">
      {/* Hero Score Banner */}
      <div className={`rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${getRankColorClasses(scores.rank.badgeColor)} border shadow-xl relative overflow-hidden`}>
        {/* Subtle decorative watermark */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10 pointer-events-none">
          <Award className="w-80 h-80" />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: Overall Score Card (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-stone-950/40 backdrop-blur-md rounded-2xl border border-white/10 text-center">
            <span className="text-xs uppercase tracking-widest text-amber-200/90 font-medium mb-1">
              Điểm Thẩm Định Tổng Thể
            </span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-5xl sm:text-6xl font-serif font-black tracking-tight text-white">
                {scores.totalScore}
              </span>
              <span className="text-xl sm:text-2xl font-serif text-amber-300/80">/100</span>
            </div>

            {/* Rank badge */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-semibold text-white tracking-wide">
              <Award className="w-4 h-4 text-amber-300" />
              {scores.rank.name}
            </div>

            <p className="text-[11px] text-amber-100/70 mt-2.5 max-w-[240px] leading-relaxed">
              {scores.rank.meaning}
            </p>
          </div>

          {/* Right: Layout Identity, Description & Taboo warning (8 cols) */}
          <div className="md:col-span-8 space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${levelInfo.color}`}>
                  {levelInfo.label}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/10 border border-white/15 text-white">
                  {overview.layoutTypeVi}
                </span>
                {violatedCount > 0 ? (
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-rose-500/20 border border-rose-400 text-rose-200 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Vi phạm {violatedCount} điều cấm kỵ
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/20 border border-emerald-400 text-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Không vi phạm điều cấm kỵ
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                {overview.title || 'Mẫu Thẩm Định Bố Cục Áo Dài'}
              </h3>
            </div>

            {/* Summary description */}
            <p className="text-xs sm:text-sm text-stone-200/90 leading-relaxed font-sans bg-black/20 p-3.5 rounded-xl border border-white/5">
              {overview.summary}
            </p>

            {/* 5 Component Score mini pills */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-xs">
              <div className="p-2 rounded-lg bg-white/10 border border-white/10 text-center">
                <span className="block text-[10px] text-stone-300">A. Bố cục (25%)</span>
                <strong className="text-amber-200 font-bold">{scores.categoryA.weightedScore}</strong>
                <span className="text-[10px] text-stone-400">/25</span>
              </div>
              <div className="p-2 rounded-lg bg-white/10 border border-white/10 text-center">
                <span className="block text-[10px] text-stone-300">B. Dẫn mắt (15%)</span>
                <strong className="text-amber-200 font-bold">{scores.categoryB.weightedScore}</strong>
                <span className="text-[10px] text-stone-400">/15</span>
              </div>
              <div className="p-2 rounded-lg bg-white/10 border border-white/10 text-center">
                <span className="block text-[10px] text-stone-300">C. Khoảng thở (20%)</span>
                <strong className="text-amber-200 font-bold">{scores.categoryC.weightedScore}</strong>
                <span className="text-[10px] text-stone-400">/20</span>
              </div>
              <div className="p-2 rounded-lg bg-white/10 border border-white/10 text-center">
                <span className="block text-[10px] text-stone-300">D. Màu sắc (20%)</span>
                <strong className="text-amber-200 font-bold">{scores.categoryD.weightedScore}</strong>
                <span className="text-[10px] text-stone-400">/20</span>
              </div>
              <div className="p-2 rounded-lg bg-white/10 border border-white/10 text-center col-span-2 sm:col-span-1">
                <span className="block text-[10px] text-stone-300">E. Kỹ thuật (20%)</span>
                <strong className="text-amber-200 font-bold">{scores.categoryE.weightedScore}</strong>
                <span className="text-[10px] text-stone-400">/20</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Metric Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Dòng Chảy & Cấu Trúc Thị Giác */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm border-b pb-2">
            <Compass className="w-4 h-4 text-amber-700" />
            <span>Hình Thái Dòng Chảy & Cấu Trúc</span>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-stone-500 block">Dòng chảy (Flow Type):</span>
              <strong className="text-stone-800 font-semibold">{overview.flowType}</strong>
            </div>
            <div>
              <span className="text-stone-500 block">Hệ cấu trúc (Structure):</span>
              <span className="text-stone-800 font-medium">{overview.structureType}</span>
            </div>
            <div>
              <span className="text-stone-500 block">Tư duy không gian 3D:</span>
              <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                overview.has3DWrapAround ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-700'
              }`}>
                {overview.has3DWrapAround ? '✓ Wrap-around (ôm trọn cơ thể)' : 'Bố cục mặt phẳng (Placement/2D)'}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Tỷ Lệ Vàng Khoảng Thở (Negative Space) */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm border-b pb-2">
            <Layers className="w-4 h-4 text-sky-700" />
            <span>Tỷ Lệ Vàng Khoảng Thở (Negative Space)</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-stone-600 font-medium">
              <span>Họa tiết: {overview.negativeSpaceRatio.motifPercent}%</span>
              <span>Khoảng thở: {overview.negativeSpaceRatio.emptyPercent}%</span>
            </div>
            {/* Visual ratio bar */}
            <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden flex border border-stone-200">
              <div
                style={{ width: `${overview.negativeSpaceRatio.motifPercent}%` }}
                className="bg-amber-600 h-full"
                title={`Họa tiết: ${overview.negativeSpaceRatio.motifPercent}%`}
              />
              <div
                style={{ width: `${overview.negativeSpaceRatio.emptyPercent}%` }}
                className="bg-emerald-600/70 h-full"
                title={`Khoảng trống: ${overview.negativeSpaceRatio.emptyPercent}%`}
              />
            </div>
            <p className="text-[11px] text-stone-500 leading-snug">
              {overview.negativeSpaceRatio.assessment}
            </p>
            <div className="text-[10px] text-stone-400 italic">
              * Chuẩn cao cấp V2.1: Họa tiết 20-40%, khoảng trống 60-80% để vải &ldquo;thở&rdquo;.
            </div>
          </div>
        </div>

        {/* Card 3: Bảng Màu & Chiến Lược Hack Dáng */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm border-b pb-2">
            <Palette className="w-4 h-4 text-purple-700" />
            <span>Phối Màu & Hack Dáng (V2.1)</span>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-stone-500 block">Phong cách màu:</span>
              <strong className="text-stone-800">{overview.colorPalette.styleCategory}</strong>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {overview.colorPalette.primaryColors.map((c, i) => (
                <span key={i} className="px-2 py-0.5 bg-stone-100 rounded text-stone-700 text-[11px]">
                  {c}
                </span>
              ))}
            </div>
            <div>
              <span className="text-stone-500 block">Hiệu ứng hack dáng:</span>
              <p className="text-stone-700 text-[11px] leading-snug">
                {overview.colorPalette.hackDangEffect}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
