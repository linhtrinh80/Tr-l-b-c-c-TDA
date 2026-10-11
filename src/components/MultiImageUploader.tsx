import React, { useRef } from 'react';
import { Upload, Plus, Trash2, Wand2, Sparkles, Image as ImageIcon, ArrowRightLeft, Layers } from 'lucide-react';
import { ComparisonSlot, SampleImage } from '../types/aodai';
import { SAMPLE_AODAI_LIST } from '../data/sampleAoDai';

interface MultiImageUploaderProps {
  slots: ComparisonSlot[];
  onUpdateSlot: (id: string, updates: Partial<ComparisonSlot>) => void;
  onAddSlot: () => void;
  onRemoveSlot: (id: string) => void;
  onCompare: () => Promise<void>;
  isComparing: boolean;
  onLoadPresetPair: (presetIds: string[]) => void;
}

export const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  slots,
  onUpdateSlot,
  onAddSlot,
  onRemoveSlot,
  onCompare,
  isComparing,
  onLoadPresetPair,
}) => {
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileUpload = (slotId: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn tệp hình ảnh hợp lệ (PNG, JPG, WebP...).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onUpdateSlot(slotId, {
        imageUrl: result,
        mimeType: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleApplySampleToSlot = (slotId: string, sample: SampleImage) => {
    onUpdateSlot(slotId, {
      label: sample.title,
      imageUrl: sample.imageUrl,
      mimeType: 'image/svg+xml',
      note: sample.description,
    });
  };

  const filledSlotsCount = slots.filter((s) => !!s.imageUrl).length;
  const canCompare = filledSlotsCount >= 2 && !isComparing;

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 shadow-lg shadow-stone-200/50 p-6 sm:p-8 space-y-6">
      {/* Top Banner */}
      <div className="border-b border-stone-100 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-amber-800 text-xs font-medium mb-3">
            <ArrowRightLeft className="w-3.5 h-3.5 text-amber-600" />
            Chế Độ So Sánh Đa Bản Bố Cục (Side-by-Side Comparison)
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
            Tải Lên & So Sánh Nhiều Bố Cục Áo Dài Cùng Lúc
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            Tải lên từ 2 đến 4 mẫu áo dài để đối chiếu dòng chảy, bảng điểm 5 cấu phần, tỷ lệ khoảng thở, kiểm tra điều cấm và phân tích điểm giống & khác nhau.
          </p>
        </div>

        {/* Quick Demo Pre-fill Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onLoadPresetPair(['sample-s-flow', 'sample-crowned-chest'])}
            className="px-3 py-1.5 text-xs font-medium bg-amber-100/70 hover:bg-amber-100 text-amber-900 rounded-lg border border-amber-300/80 transition flex items-center gap-1.5"
            title="So sánh S-Flow (chữ S) và Crowned Chest (vương miện ngực)"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Nạp cặp mẫu: S-Flow vs Vương Miện</span>
          </button>
          <button
            type="button"
            onClick={() => onLoadPresetPair(['sample-s-flow', 'sample-error-layout'])}
            className="px-3 py-1.5 text-xs font-medium bg-rose-100/70 hover:bg-rose-100 text-rose-900 rounded-lg border border-rose-300/80 transition flex items-center gap-1.5"
            title="So sánh mẫu chuẩn mực vs mẫu vi phạm lỗi ngắt quãng"
          >
            <Layers className="w-3.5 h-3.5 text-rose-700" />
            <span>Nạp cặp: Chuẩn vs Mẫu Lỗi</span>
          </button>
        </div>
      </div>

      {/* Grid of Slots (2, 3 or 4 columns) */}
      <div className={`grid grid-cols-1 ${
        slots.length === 2
          ? 'md:grid-cols-2'
          : slots.length === 3
          ? 'md:grid-cols-3'
          : 'sm:grid-cols-2 lg:grid-cols-4'
      } gap-5`}>
        {slots.map((slot, index) => {
          return (
            <div
              key={slot.id}
              className="bg-stone-50/70 border border-stone-200 rounded-2xl p-4 flex flex-col justify-between space-y-4 hover:border-amber-300 transition shadow-sm"
            >
              {/* Slot Header: Label & Delete */}
              <div className="flex items-center justify-between gap-2 border-b border-stone-200/80 pb-2">
                <div className="flex items-center gap-2 flex-1">
                  <span className="w-6 h-6 rounded-md bg-stone-800 text-amber-200 text-xs font-bold font-serif flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={slot.label}
                    onChange={(e) => onUpdateSlot(slot.id, { label: e.target.value })}
                    className="text-xs font-bold text-stone-900 bg-transparent border-b border-transparent hover:border-stone-300 focus:border-amber-500 focus:outline-none w-full"
                    placeholder={`Mẫu ${index + 1}`}
                  />
                </div>

                {slots.length > 2 && (
                  <button
                    type="button"
                    onClick={() => onRemoveSlot(slot.id)}
                    className="p-1 text-stone-400 hover:text-rose-600 rounded transition"
                    title="Xóa mẫu này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Slot Image Box */}
              <div
                onClick={() => fileInputRefs.current[slot.id]?.click()}
                className={`relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border flex flex-col items-center justify-center transition group ${
                  slot.imageUrl
                    ? 'border-stone-300 bg-stone-100'
                    : 'border-2 border-dashed border-stone-300 hover:border-amber-400 bg-stone-100/50 hover:bg-amber-50/20'
                }`}
              >
                <input
                  ref={(el) => {
                    fileInputRefs.current[slot.id] = el;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(slot.id, e.target.files[0]);
                    }
                  }}
                />

                {slot.imageUrl ? (
                  <>
                    <img
                      src={slot.imageUrl}
                      alt={slot.label}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-medium">
                      <span>Thay đổi ảnh này</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4 space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-100/60 text-amber-800 flex items-center justify-center mx-auto">
                      <Upload className="w-5 h-5 text-amber-700" />
                    </div>
                    <p className="text-xs font-semibold text-stone-700">Tải ảnh mẫu {index + 1}</p>
                    <p className="text-[10px] text-stone-600">Nhấp để chọn ảnh</p>
                  </div>
                )}
              </div>

              {/* Presets Quick Picker Dropdown/Buttons */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-stone-600 font-medium block">
                  Hoặc gán mẫu có sẵn:
                </span>
                <div className="grid grid-cols-2 gap-1 text-[10px]">
                  {SAMPLE_AODAI_LIST.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => handleApplySampleToSlot(slot.id, sample)}
                      className="px-2 py-1 bg-white hover:bg-amber-50 border border-stone-200 hover:border-amber-300 rounded text-stone-700 truncate text-left transition"
                      title={sample.title}
                    >
                      {sample.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Slot Button (if < 4) */}
        {slots.length < 4 && (
          <button
            type="button"
            onClick={onAddSlot}
            className="border-2 border-dashed border-stone-300 hover:border-amber-500 hover:bg-amber-50/30 rounded-2xl p-6 flex flex-col items-center justify-center text-stone-500 hover:text-amber-800 transition min-h-[300px] space-y-2 group"
          >
            <div className="w-12 h-12 rounded-xl bg-stone-100 group-hover:bg-amber-100 flex items-center justify-center transition">
              <Plus className="w-6 h-6 text-stone-600 group-hover:text-amber-700" />
            </div>
            <span className="text-xs font-bold">Thêm Mẫu Thứ {slots.length + 1}</span>
            <span className="text-[11px] text-stone-600">So sánh tối đa 4 mẫu cùng lúc</span>
          </button>
        )}
      </div>

      {/* Action CTA Bar */}
      <div className="border-t border-stone-200/80 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs text-stone-600">
          Đã nạp <strong className="text-stone-900">{filledSlotsCount}/{slots.length}</strong> hình ảnh áo dài cần so sánh.
          {filledSlotsCount < 2 && (
            <span className="text-rose-600 ml-1 font-medium">
              (Cần tối thiểu 2 hình ảnh có bố cục để bắt đầu so sánh đối chiếu).
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onCompare}
          disabled={!canCompare}
          className={`py-3.5 px-8 rounded-xl font-medium text-sm transition-all shadow-md flex items-center justify-center gap-2.5 ${
            !canCompare
              ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-amber-50 shadow-amber-900/20 hover:shadow-lg active:scale-[0.99]'
          }`}
        >
          {isComparing ? (
            <>
              <div className="w-5 h-5 border-2 border-amber-300/30 border-t-amber-100 rounded-full animate-spin" />
              <span>Đang Thẩm Định & Đối Chiếu Đa Bản...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="font-serif tracking-wide text-base">
                Thẩm Định & So Sánh Đối Chiếu ({filledSlotsCount} Mẫu)
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
