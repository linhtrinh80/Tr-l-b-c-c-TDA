import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Eye, Grid, Wand2, HelpCircle } from 'lucide-react';
import { SAMPLE_AODAI_LIST } from '../data/sampleAoDai';
import { SampleImage } from '../types/aodai';

interface ImageUploaderProps {
  onAnalyze: (imageBase64: string, mimeType: string, note: string) => Promise<void>;
  isLoading: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onAnalyze, isLoading }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(SAMPLE_AODAI_LIST[0].imageUrl);
  const [mimeType, setMimeType] = useState<string>('image/svg+xml');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showGridOverlay, setShowGridOverlay] = useState<boolean>(true);
  const [contextNote, setContextNote] = useState<string>('');
  const [activePresetId, setActivePresetId] = useState<string>(SAMPLE_AODAI_LIST[0].id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn tệp hình ảnh hợp lệ (PNG, JPG, WebP...).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedImage(result);
      setMimeType(file.type);
      setActivePresetId(''); // custom upload
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleSelectSample = (sample: SampleImage) => {
    setSelectedImage(sample.imageUrl);
    setMimeType('image/svg+xml');
    setActivePresetId(sample.id);
  };

  const handleSubmit = () => {
    if (!selectedImage) return;
    onAnalyze(selectedImage, mimeType, contextNote);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 shadow-lg shadow-stone-200/50 p-6 sm:p-8 space-y-6">
      {/* Top Banner / Headline */}
      <div className="border-b border-stone-100 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-amber-800 text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Hệ thống Thẩm định AI Vision theo Chuẩn V2.1
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
          Tải Lên Hình Ảnh Bố Cục Họa Tiết Áo Dài
        </h2>
        <p className="text-sm text-stone-600 mt-1 max-w-2xl">
          Tải lên ảnh chụp thực tế hoặc bản vẽ phác thảo bố cục áo dài vẽ tay. Hệ thống sẽ phân tích đa chiều theo 5 cấu phần, nhận diện dòng chảy (Flow), kiểm tra 11 điều cấm kỵ và xuất phiếu đánh giá chi tiết.
        </p>
      </div>

      {/* Main Grid: Upload & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Upload Zone & Presets (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Dropzone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[220px] ${
              isDragging
                ? 'border-amber-500 bg-amber-50/50 scale-[0.99]'
                : 'border-stone-300 hover:border-amber-400 hover:bg-stone-50/60 bg-stone-50/30'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="w-14 h-14 rounded-2xl bg-amber-100/70 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-105 transition">
              <Upload className="w-7 h-7 text-amber-700" />
            </div>
            <p className="text-sm font-medium text-stone-800">
              Kéo & thả hình ảnh áo dài vào đây, hoặc <span className="text-amber-700 underline font-semibold">chọn từ thiết bị</span>
            </p>
            <p className="text-xs text-stone-600 mt-1.5">
              Hỗ trợ JPG, PNG, WEBP (Khuyến nghị ảnh chụp rõ thân áo trước hoặc toàn bộ mannequin)
            </p>
          </div>

          {/* Preset Samples Selector */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-amber-600" />
                Hoặc thử ngay các mẫu bố cục mẫu chuẩn V2.1:
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {SAMPLE_AODAI_LIST.map((sample) => {
                const isSelected = activePresetId === sample.id;
                return (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden group ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/30 shadow-sm'
                        : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        sample.id === 'sample-error-layout'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-stone-100 text-stone-700 group-hover:bg-amber-100 group-hover:text-amber-800'
                      }`}>
                        {sample.tag}
                      </span>
                    </div>
                    <div className="text-xs font-serif font-bold text-stone-900 truncate">
                      {sample.title}
                    </div>
                    <div className="text-[10px] text-stone-600 line-clamp-1 mt-0.5">
                      {sample.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Context input (optional) */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-stone-700 flex items-center gap-1">
              Ghi chú thêm về ý đồ thiết kế / Chất liệu vải (Tùy chọn)
              <span className="text-stone-400" title="Ví dụ: Vải nhung đen, phục vụ dạ tiệc hoàng gia, cần hack eo...">
                <HelpCircle className="w-3.5 h-3.5" />
              </span>
            </label>
            <input
              type="text"
              value={contextNote}
              onChange={(e) => setContextNote(e.target.value)}
              placeholder="Ví dụ: Vải lụa cát trắng, phong cách thiền tối giản, người mặc dáng đầy đặn..."
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/40 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition"
            />
          </div>
        </div>

        {/* Right Side: Image Preview & Overlay (5 cols) */}
        <div className="lg:col-span-5 bg-stone-100/70 border border-stone-200/80 rounded-2xl p-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 text-xs">
            <span className="font-semibold text-stone-700 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-stone-500" />
              Khung Hình Thẩm Định
            </span>
            <button
              type="button"
              onClick={() => setShowGridOverlay(!showGridOverlay)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium border transition ${
                showGridOverlay
                  ? 'bg-amber-100/80 border-amber-300 text-amber-900'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Grid className="w-3 h-3" />
              {showGridOverlay ? 'Bật Lưới Tỷ Lệ' : 'Tắt Lưới Tỷ Lệ'}
            </button>
          </div>

          {/* Preview Image with Grid Overlay */}
          <div className="relative mt-3 rounded-xl overflow-hidden bg-stone-200/50 aspect-[3/4] flex items-center justify-center border border-stone-200/60 shadow-inner group">
            {selectedImage ? (
              <>
                <img
                  src={selectedImage}
                  alt="Mẫu áo dài thẩm định"
                  className="w-full h-full object-contain"
                />

                {/* Technical Aesthetic Grid Overlay */}
                {showGridOverlay && (
                  <div className="absolute inset-0 pointer-events-none border border-amber-500/20">
                    {/* Focal Zone Line (Upper 1/3) */}
                    <div className="absolute top-[28%] left-0 right-0 border-b border-dashed border-amber-500/50 flex justify-between px-2 text-[9px] text-amber-800 font-mono bg-amber-500/5">
                      <span>VÙNG NHẤN CHÍNH (VAI/NGỰC)</span>
                      <span>FOCAL POINT</span>
                    </div>

                    {/* Waist Line (45 degree angle hint) */}
                    <div className="absolute top-[48%] left-0 right-0 border-b border-dashed border-sky-500/40 flex justify-between px-2 text-[9px] text-sky-800 font-mono bg-sky-500/5">
                      <span>ĐƯỜNG EO (KHOẢNG THỞ CHIẾN LƯỢC)</span>
                      <span>WAIST 45°</span>
                    </div>

                    {/* Lower Flap Zone */}
                    <div className="absolute bottom-[18%] left-0 right-0 border-t border-dashed border-stone-400/50 flex justify-between px-2 text-[9px] text-stone-600 font-mono">
                      <span>MẬT ĐỘ TÀ ÁO (THƯA NHẸ)</span>
                      <span>GRADIENT</span>
                    </div>

                    {/* Center axis */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-r border-stone-400/20" />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center p-6 text-stone-400 space-y-2">
                <ImageIcon className="w-10 h-10 mx-auto text-stone-300" />
                <p className="text-xs">Chưa có ảnh nào được chọn</p>
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="mt-4 pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedImage || isLoading}
              className={`w-full py-3.5 px-6 rounded-xl font-medium text-sm transition-all shadow-md flex items-center justify-center gap-2.5 ${
                !selectedImage || isLoading
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-amber-50 shadow-amber-900/20 hover:shadow-lg active:scale-[0.99]'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-amber-300/30 border-t-amber-100 rounded-full animate-spin" />
                  <span>Đang Thẩm Định Theo Chuẩn V2.1...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="font-serif tracking-wide text-base">Thẩm Định Bố Cục Chi Tiết</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-stone-600 mt-2">
              Hệ thống sử dụng Gemini 3.8 Flash đối chiếu trực tiếp với 37 trang Chuẩn Mực V2.1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
