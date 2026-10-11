import React from 'react';
import { BookOpen, Sparkles, Printer, RotateCcw, Award, ArrowRightLeft, Image as ImageIcon } from 'lucide-react';

interface NavbarProps {
  onOpenStandard: () => void;
  onReset?: () => void;
  onPrint?: () => void;
  hasResult: boolean;
  appMode: 'single' | 'compare';
  onChangeMode: (mode: 'single' | 'compare') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenStandard,
  onReset,
  onPrint,
  hasResult,
  appMode,
  onChangeMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 p-0.5 shadow-md shadow-amber-900/30">
            <div className="w-full h-full bg-stone-900 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-serif font-bold tracking-wide text-amber-100">
                Họa Sắc Áo Dài
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded text-[10px] font-medium tracking-wider uppercase">
                <Award className="w-3 h-3 text-amber-400" />
                Chuẩn V2.1
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">
              Thẩm định chuyên sâu bố cục họa tiết vẽ tay trên áo dài
            </p>
          </div>
        </div>

        {/* Center Mode Switcher */}
        <div className="flex items-center bg-stone-800 p-1 rounded-xl border border-stone-700/60 shadow-inner">
          <button
            onClick={() => onChangeMode('single')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              appMode === 'single'
                ? 'bg-amber-600 text-white shadow-sm font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Đơn Bản</span>
          </button>
          <button
            onClick={() => onChangeMode('compare')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              appMode === 'compare'
                ? 'bg-amber-600 text-white shadow-sm font-semibold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>So Sánh Đa Bản</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenStandard}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/30 rounded-lg shadow-sm transition hover:border-amber-400/50"
            title="Tra cứu tiêu chuẩn đánh giá V2.1"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Sổ Tay</span> Chuẩn V2.1
          </button>

          {hasResult && onPrint && (
            <button
              onClick={onPrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-600 hover:bg-amber-500 text-white rounded-lg shadow-sm transition"
              title="Xuất phiếu đánh giá / In báo cáo"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">In Báo Cáo</span>
            </button>
          )}

          {hasResult && onReset && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition"
              title="Thẩm định lại"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Làm mới</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

