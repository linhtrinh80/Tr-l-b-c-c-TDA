import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Layers, Compass, Eye, Palette, CheckCircle } from 'lucide-react';
import { AoDaiAnalysisResult, CriterionScore, CategoryEvaluation } from '../types/aodai';

interface DetailedScorecardProps {
  result: AoDaiAnalysisResult;
}

export const DetailedScorecard: React.FC<DetailedScorecardProps> = ({ result }) => {
  const { scores } = result;
  const [selectedCat, setSelectedCat] = useState<'all' | 'A' | 'B' | 'C' | 'D' | 'E'>('all');

  const renderStars = (score: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= score
                ? 'fill-amber-400 text-amber-500'
                : 'fill-stone-200 text-stone-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 5) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 4) return 'text-sky-700 bg-sky-50 border-sky-200';
    if (score >= 3) return 'text-amber-700 bg-amber-50 border-amber-200';
    if (score >= 2) return 'text-orange-700 bg-orange-50 border-orange-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  const renderCriterionCard = (item: CriterionScore) => {
    return (
      <div key={item.id} className="p-4 bg-stone-50/60 rounded-xl border border-stone-200/80 space-y-2 hover:bg-stone-50 transition">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-stone-200/80 text-stone-800 rounded font-mono font-bold text-xs">
              {item.id}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-stone-900">
              {item.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {renderStars(item.score)}
            <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getScoreColor(item.score)}`}>
              {item.score}/5
            </span>
          </div>
        </div>

        {/* Note / Technical comment */}
        <p className="text-xs text-stone-700 leading-relaxed pl-1 border-l-2 border-amber-400/70">
          {item.note}
        </p>
      </div>
    );
  };

  const categories = [
    { key: 'A', data: scores.categoryA, maxRaw: 30, formulaText: '(A1 + A2 + A3 + A4a + A4b + A4c) / 30 × 25' },
    { key: 'B', data: scores.categoryB, maxRaw: 15, formulaText: '(B1 + B2 + B3) / 15 × 15' },
    { key: 'C', data: scores.categoryC, maxRaw: 15, formulaText: '(C1 + C2 + C3) / 15 × 20' },
    { key: 'D', data: scores.categoryD, maxRaw: 20, formulaText: '(D1 + D2 + D3 + D4) / 20 × 20' },
    { key: 'E', data: scores.categoryE, maxRaw: 20, formulaText: '(E1 + E2 + E3 + E4) / 20 × 20' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
            Bảng Chấm Điểm Chi Tiết Theo 5 Cấu Phần (Thang 100)
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Chiếu theo bảng điểm chuẩn V2.1 với từng tiêu chí con từ 1 đến 5 điểm
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-stone-100 rounded-xl">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
              selectedCat === 'all'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Tất cả (5 Phần)
          </button>
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelectedCat(c.key as any)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition ${
                selectedCat === c.key
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Phần {c.key} ({c.data.weightedScore}đ)
            </button>
          ))}
        </div>
      </div>

      {/* Render Selected Categories */}
      <div className="space-y-8">
        {categories
          .filter((cat) => selectedCat === 'all' || selectedCat === cat.key)
          .map((cat) => {
            const criteriaList = Object.values(cat.data.criteria || {});
            return (
              <div key={cat.key} className="border border-stone-200 rounded-2xl p-5 bg-white space-y-4 shadow-sm">
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 font-serif font-bold flex items-center justify-center text-sm shadow-sm">
                      {cat.key}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-serif font-bold text-stone-900">
                        {cat.data.title}
                      </h4>
                      <span className="text-[11px] text-stone-500 font-mono">
                        Công thức: {cat.formulaText}
                      </span>
                    </div>
                  </div>

                  {/* Component Score pill */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-500">
                      Điểm thô: <strong className="text-stone-800">{cat.data.rawTotal}/{cat.maxRaw}</strong>
                    </span>
                    <div className="px-3.5 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-bold text-sm">
                      Quy đổi: {cat.data.weightedScore} / {cat.data.weight} điểm
                    </div>
                  </div>
                </div>

                {/* Sub-criteria list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {criteriaList.map((criterion) => renderCriterionCard(criterion))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
