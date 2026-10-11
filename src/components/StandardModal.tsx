import React, { useState } from 'react';
import { X, BookOpen, AlertTriangle, Sparkles, CheckCircle2, ChevronRight, Layers, Palette, Compass } from 'lucide-react';

interface StandardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StandardModal: React.FC<StandardModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'weights' | 'taboos' | 'flows' | 'hackDang' | 'golden'>('weights');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-stone-50 rounded-2xl shadow-2xl flex flex-col border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-100 border-b border-amber-900/40">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg text-amber-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-amber-100">
                Chuẩn Mực Đánh Giá Bố Cục Họa Tiết Vẽ Tay Trên Áo Dài – V2.1
              </h2>
              <p className="text-xs text-amber-300/80 font-sans">
                Bộ tiêu chuẩn nghệ thuật & thương mại hóa cao cấp (Haute Couture)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-stone-200 bg-stone-100 px-6 gap-2 pt-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('weights')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-t-lg transition border-b-2 whitespace-nowrap ${
              activeTab === 'weights'
                ? 'bg-stone-50 text-amber-900 border-amber-600 shadow-sm'
                : 'text-stone-600 hover:text-stone-900 border-transparent'
            }`}
          >
            <Layers className="w-4 h-4" />
            5 Cấu phần & Trọng số
          </button>
          <button
            onClick={() => setActiveTab('flows')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-t-lg transition border-b-2 whitespace-nowrap ${
              activeTab === 'flows'
                ? 'bg-stone-50 text-amber-900 border-amber-600 shadow-sm'
                : 'text-stone-600 hover:text-stone-900 border-transparent'
            }`}
          >
            <Compass className="w-4 h-4" />
            Nhóm Bố Cục & Dòng Chảy
          </button>
          <button
            onClick={() => setActiveTab('hackDang')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-t-lg transition border-b-2 whitespace-nowrap ${
              activeTab === 'hackDang'
                ? 'bg-stone-50 text-amber-900 border-amber-600 shadow-sm'
                : 'text-stone-600 hover:text-stone-900 border-transparent'
            }`}
          >
            <Palette className="w-4 h-4" />
            Chiến Lược Hack Dáng (V2.1)
          </button>
          <button
            onClick={() => setActiveTab('taboos')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-t-lg transition border-b-2 whitespace-nowrap ${
              activeTab === 'taboos'
                ? 'bg-stone-50 text-amber-900 border-amber-600 shadow-sm'
                : 'text-stone-600 hover:text-stone-900 border-transparent'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            11 Điều Cấm Kỵ
          </button>
          <button
            onClick={() => setActiveTab('golden')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium rounded-t-lg transition border-b-2 whitespace-nowrap ${
              activeTab === 'golden'
                ? 'bg-stone-50 text-amber-900 border-amber-600 shadow-sm'
                : 'text-stone-600 hover:text-stone-900 border-transparent'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            10 Câu Hỏi Vàng
          </button>
        </div>

        {/* Tab content */}
        <div className="p-6 overflow-y-auto space-y-4 text-stone-700 text-sm leading-relaxed">
          {activeTab === 'weights' && (
            <div className="space-y-6">
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-amber-950">
                <h3 className="font-serif font-bold text-base text-amber-900 mb-1">
                  Công Thức Tính Điểm Chuẩn V2.1 (Thang 100 điểm)
                </h3>
                <p className="text-xs text-amber-800">
                  Mỗi tiêu chí con được chấm từ 1 đến 5 điểm. Điểm tổng là tổng điểm theo tỷ lệ phần trăm của 5 cấu phần.
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 text-xs font-medium">
                  <div className="p-2 bg-white rounded-lg border border-amber-200 text-center">
                    <span className="block text-stone-500">Phần A (30 điểm thô)</span>
                    <strong className="text-amber-800 font-bold">25% Tổng số</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-amber-200 text-center">
                    <span className="block text-stone-500">Phần B (15 điểm thô)</span>
                    <strong className="text-amber-800 font-bold">15% Tổng số</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-amber-200 text-center">
                    <span className="block text-stone-500">Phần C (15 điểm thô)</span>
                    <strong className="text-amber-800 font-bold">20% Tổng số</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-amber-200 text-center">
                    <span className="block text-stone-500">Phần D (20 điểm thô)</span>
                    <strong className="text-amber-800 font-bold">20% Tổng số</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-amber-200 text-center">
                    <span className="block text-stone-500">Phần E (20 điểm thô)</span>
                    <strong className="text-amber-800 font-bold">20% Tổng số</strong>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between font-bold text-stone-900 border-b pb-2">
                    <span>A. Bố cục tổng thể & Dòng chảy</span>
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">25%</span>
                  </div>
                  <ul className="text-xs space-y-1.5 text-stone-600">
                    <li>• <strong>A1. Loại hình bố cục:</strong> Tư duy 3D ôm quanh người, không dán hoa phẳng 2D.</li>
                    <li>• <strong>A2. Hệ cấu trúc:</strong> Sinh trưởng (Growth), Cụm nổi (Floating), hay Trang sức (Ornamental).</li>
                    <li>• <strong>A3. Dòng chảy thị giác:</strong> S-Flow bắt buộc liên tục; Crowned & Diagonal không cần xuống tà.</li>
                    <li>• <strong>A4a. Hệ thống lá:</strong> Lá ẩn loang mờ, lá hiện đổ khối 3D, lá dẫn nhịp, khoảng thở eo.</li>
                    <li>• <strong>A4b. Hệ thống cành:</strong> Xuyên diệp nhất tuyến (chéo 45° bóp eo), gốc to ngọn nhỏ.</li>
                    <li>• <strong>A4c. Tương tác lá-cành-hoa:</strong> Giảm bão hòa lá để hoa tôn quý, không tranh chấp.</li>
                  </ul>
                </div>

                <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between font-bold text-stone-900 border-b pb-2">
                    <span>B. Chuyển động thị giác & Nhịp điệu</span>
                    <span className="px-2 py-0.5 bg-sky-100 text-sky-800 text-xs rounded-full">15%</span>
                  </div>
                  <ul className="text-xs space-y-1.5 text-stone-600">
                    <li>• <strong>B1. Cấu trúc dẫn mắt (Eye Path):</strong> Focal chính (ngực/vai) → Phụ (eo/hông) → Nhịp điệu (tà) → Kết thúc mềm.</li>
                    <li>• <strong>B2. Nhịp điệu (Rhythm):</strong> Visual Echo (vọng thị giác), Leaf Rhythm (nhịp lá nối dòng), Size Gradation.</li>
                    <li>• <strong>B3. Động năng (Kinetic Energy):</strong> Năng lượng phù hợp mục đích (lễ hội, dạ tiệc hay thiền tĩnh).</li>
                  </ul>
                </div>

                <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between font-bold text-stone-900 border-b pb-2">
                    <span>C. Cân bằng & Khoảng thở</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs rounded-full">20%</span>
                  </div>
                  <ul className="text-xs space-y-1.5 text-stone-600">
                    <li>• <strong>C1. Loại hình cân bằng:</strong> Bất đối xứng có kiểm soát (cân bằng nhờ khoảng trống đối diện).</li>
                    <li>• <strong>C2. Tỷ lệ vàng khoảng thở:</strong> Họa tiết 20-40%, Khoảng trống 60-80% (Dòng thiền 85-90%).</li>
                    <li>• <strong>C3. Gradient mật độ:</strong> Vai/ngực dày nhất, eo thưa vừa, tà áo thưa nhẹ nhất.</li>
                  </ul>
                </div>

                <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between font-bold text-stone-900 border-b pb-2">
                    <span>D. Màu sắc, Tương phản & Hack dáng</span>
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">20%</span>
                  </div>
                  <ul className="text-xs space-y-1.5 text-stone-600">
                    <li>• <strong>D1. Phối màu tổng thể:</strong> Không quá 3-4 màu chính; màu nền quyết định 70% cảm xúc.</li>
                    <li>• <strong>D2. Chiến lược tương phản:</strong> Nóng-lạnh, sáng-tối, giảm bão hòa ở lá.</li>
                    <li>• <strong>D3. Bảng màu ứng dụng:</strong> Tết, Cưới, Dạ tiệc, Thiền trà, Gallery.</li>
                    <li>• <strong>D4. Chiến lược hack dáng (V2.1):</strong> Gradient dọc, tông xuyệt tông, trụ cột màu, khoe vòng 1 che eo.</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between font-bold text-stone-900 border-b pb-2 mb-2">
                  <span>E. Kỹ thuật & Hoàn thiện vẽ tay (20%)</span>
                  <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-xs rounded-full">20%</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                  <div>• <strong>E1. Độ sạch & chính xác nét vẽ:</strong> Không lem, không vệt phác thảo bút chì, viền cánh mượt.</div>
                  <div>• <strong>E2. Kỹ thuật chuyển sắc:</strong> Gradient loang mịn màng, màu trong suốt không vón cục.</div>
                  <div>• <strong>E3. Xử lý chi tiết:</strong> Gân lá chừa sáng 1 ly, nhụy hoa stippling hạt nổi 3D, cành có mắt gỗ tự nhiên.</div>
                  <div>• <strong>E4. Tương thích chất liệu:</strong> Họa tiết tương hỗ hoàn hảo với vải lì, gấm, sa-tanh hoặc nhung.</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'flows' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-600 italic">
                Lưu ý quan trọng của tài liệu V2.1: Không phải mọi bố cục đều yêu cầu dòng chảy xuống tà áo. Việc đánh giá &ldquo;ngắt quãng&rdquo; chỉ áp dụng khi dòng chảy bị đứt đoạn mà không có lý do thiết kế hợp lý!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-bold text-stone-900">
                    <span>1. Continuous S-Flow (Chữ S liên tục)</span>
                    <span className="text-rose-600 font-semibold">Độ khó: Rất cao</span>
                  </div>
                  <p className="text-stone-600">Dòng hoa lượn sóng từ vai xuống tà áo. <strong>BẮT BUỘC</strong> phải liên tục; nếu đứt đoạn ở eo là lỗi ngắt quãng nghiêm trọng.</p>
                </div>
                <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-bold text-stone-900">
                    <span>2. Crowned Chest (Vương miện ngực)</span>
                    <span className="text-amber-700 font-semibold">Độ khó: Cao</span>
                  </div>
                  <p className="text-stone-600">Tập trung cung tỏa ở cổ và vai sáng mặt. <strong>KHÔNG CẦN</strong> kéo dài xuống tà; kết thúc mềm mại ở eo trên; thân dưới để trống sang trọng.</p>
                </div>
                <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-bold text-stone-900">
                    <span>3. Descending Diagonal (Đường chéo)</span>
                    <span className="text-amber-700 font-semibold">Độ khó: Cao</span>
                  </div>
                  <p className="text-stone-600">Chéo từ vai sang hông đối diện. <strong>KHÔNG CẦN</strong> xuống tà, chỉ cần hai điểm nhấn đối trọng và kết thúc mềm ở hông.</p>
                </div>
                <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-bold text-stone-900">
                    <span>4. Lower Anchor (Trọng tâm thấp)</span>
                    <span className="text-amber-700 font-semibold">Độ khó: Cao</span>
                  </div>
                  <p className="text-stone-600">Gốc rễ vững vàng ở gấu áo vươn lên hữu cơ. Không cần lên tới vai, chỉ cần kết nối thân trên bằng cuống dẫn mềm mại.</p>
                </div>
                <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-bold text-stone-900">
                    <span>5. Wrap-around (Không gian 3D)</span>
                    <span className="text-emerald-700 font-semibold">Độ khó: Rất cao</span>
                  </div>
                  <p className="text-stone-600">Họa tiết ôm trọn vòng cung cơ thể từ trước ra sau, coi chiếc áo là khối trụ 3D liên tục, không bị đứt đoạn bởi đường may.</p>
                </div>
                <div className="p-3 bg-white border border-stone-200 rounded-xl space-y-1">
                  <div className="flex items-center justify-between font-bold text-stone-900">
                    <span>6. Branch Narrative (Kể chuyện cội nguồn)</span>
                    <span className="text-stone-800 font-semibold">Độ khó: Cao</span>
                  </div>
                  <p className="text-stone-600">Cành cây có gốc, thân, nhánh và hoa nở theo từng tầng sinh trưởng tự nhiên (ví dụ mẫu Đào xuân mạch).</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hackDang' && (
            <div className="space-y-4">
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-purple-950 text-xs">
                <strong>Chiến Lược Hack Dáng Bằng Màu Sắc (Mục D4 – Cập nhật V2.1):</strong> Màu sắc là vũ khí tạo ảo giác thị giác nhằm kéo dài chiều cao, siết eo thon gọn và tôn vinh số đo chuẩn.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border border-stone-200 rounded-xl">
                  <h4 className="font-bold text-stone-900 mb-1">1. Hiệu ứng Tiến – Lùi (Advancing - Receding)</h4>
                  <p className="text-stone-600">Màu nóng (đỏ, cam, vàng) đẩy vật thể tiến gần (trông to hơn) → đặt ở vai/ngực. Màu lạnh (xanh, tím) lùi xa (nhỏ hơn) → đặt ở vùng eo/bụng.</p>
                </div>
                <div className="p-3 bg-white border border-stone-200 rounded-xl">
                  <h4 className="font-bold text-stone-900 mb-1">2. Sáng – Tối & Saturation</h4>
                  <p className="text-stone-600">Màu sáng làm vật thể nổi bật. Điểm nhấn bão hòa cao nhất đặt tại điểm cao vị (vai/ngực) để nâng tầm nhìn lên cao, tạo cảm giác thanh thoát.</p>
                </div>
                <div className="p-3 bg-white border border-stone-200 rounded-xl">
                  <h4 className="font-bold text-stone-900 mb-1">3. Gradient Dọc & Trụ Cột Màu (Color Pillar)</h4>
                  <p className="text-stone-600">Màu đậm/nóng ở trên chuyển nhạt dần xuống dưới, hoặc một dải màu nổi chạy dọc ép mắt người nhìn đi theo chiều đứng giúp hack chiều cao vượt trội.</p>
                </div>
                <div className="p-3 bg-white border border-stone-200 rounded-xl">
                  <h4 className="font-bold text-stone-900 mb-1">4. Cành Xuyên Eo 45° (Xuyên Diệp Nhất Tuyến)</h4>
                  <p className="text-stone-600">Cành mảnh chạy chéo 45° qua eo, không kèm lá rườm rà, cắt ngang tạo ảo giác siết nhỏ vòng eo của người mặc.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'taboos' && (
            <div className="space-y-3">
              <p className="text-xs text-rose-700 font-medium">
                11 Điều cấm kỵ cốt tử trong bố cục áo dài (chỉ cần vi phạm 1 điều là mẫu thiết kế đã bị giảm giá trị trầm trọng):
              </p>
              <div className="space-y-2 text-xs">
                {[
                  { id: 1, title: 'Họa tiết bị cắt đột ngột ở đường hông', desc: 'Làm mất đi tính liên tục của cơ thể 3D.' },
                  { id: 2, title: 'Flow bị đứt đoạn không có chủ đích', desc: 'Đặc biệt là bố cục S-Flow và Ascending Flow (Crowned và Diagonal kết thúc sớm không tính).' },
                  { id: 3, title: 'Mật độ dưới tà dày bằng hoặc hơn phần trên', desc: 'Khiến chiếc áo trĩu nặng, làm người mặc trông thấp lùn.' },
                  { id: 4, title: 'Lấp đầy toàn bộ thân áo — không có khoảng thở', desc: 'Khoảng trống < 60% làm tác phẩm trở nên ngột ngạt, tầm thường.' },
                  { id: 5, title: 'Đặt focal point quá thấp (gần tà)', desc: 'Kéo mắt người nhìn xuống chân, làm hỏng tỷ lệ cơ thể.' },
                  { id: 6, title: 'Sử dụng quá 4 màu chính trong một bố cục', desc: 'Gây rối loạn thị giác và mất đi sự sang trọng quý phái.' },
                  { id: 7, title: 'Hoa và lá có cùng độ bão hòa', desc: 'Lá phải luôn được giảm độ bão hòa (desaturated) để nhường đất cho hoa tỏa sáng.' },
                  { id: 8, title: 'Phủ thêm họa tiết vào bên đối diện của bố cục lệch', desc: 'Làm mất đi nét duyên dáng của cân bằng bất đối xứng có kiểm soát.' },
                  { id: 9, title: 'Mặt sau chỉ là bản copy của mặt trước', desc: 'Mặt sau phải là "chương tiếp theo" của câu chuyện chứ không phải bản sao.' },
                  { id: 10, title: 'Không có cấu trúc dẫn mắt (Eye path)', desc: 'Người xem không biết nhìn vào đâu, ánh nhìn bị nhảy loạn.' },
                  { id: 11, title: 'Sử dụng màu sắc đi ngược lại mục tiêu hack dáng (V2.1)', desc: 'Ví dụ: đặt màu nóng, sáng, bão hòa cao ở vùng eo/bụng làm phình to vòng 2.' },
                ].map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-2.5 bg-rose-50/70 border border-rose-200 rounded-lg">
                    <span className="px-2 py-0.5 bg-rose-200 text-rose-900 font-bold rounded text-xs shrink-0">
                      Điều {item.id}
                    </span>
                    <div>
                      <strong className="text-rose-900 block font-medium">{item.title}</strong>
                      <span className="text-stone-600">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'golden' && (
            <div className="space-y-3">
              <p className="text-xs text-amber-800 font-medium">
                10 Câu hỏi vàng dành cho giám tuyển và nghệ nhân đánh giá áo dài cao cấp (chỉ cần 1 câu trả lời &ldquo;Không&rdquo; là đã có vấn đề):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  '1. Họa tiết có bị cắt đứt bởi đường hông của áo không?',
                  '2. Khi người mặc xoay người, bố cục mặt trước và sau có liên kết với nhau không (hay chỉ copy)?',
                  '3. Mắt tôi có một hành trình rõ ràng để đi (từ lớn đến nhỏ, từ trên xuống dưới) hay tôi bị lóa mắt vì quá nhiều điểm nhấn?',
                  '4. Phần tà áo có được vẽ nhẹ và thưa hơn phần vai/ngực không?',
                  '5. Có một vùng khoảng trống đủ lớn và "có ý nghĩa" trên thân áo để mắt được nghỉ ngơi không?',
                  '6. Nếu bố cục lệch về một bên, bên còn lại có bị "trống chết" hay nó vẫn được cân bằng bởi hướng nhìn/chất liệu?',
                  '7. Màu lá có bị lấn át hoặc quá bão hòa so với hoa không?',
                  '8. Màu sắc và mật độ có tương thích với chất liệu vải (lì, bóng, thô, mịn) mà nó nằm trên đó không?',
                  '9. Họa tiết đang kể một câu chuyện/cảm xúc gì, hay nó chỉ đơn thuần được vẽ để lấp đầy chỗ trống?',
                  '10. Nếu phải giữ nguyên diện tích phủ hoa, liệu tôi có dám bỏ bớt một vài chi tiết nhỏ để bố cục trở nên tinh tế và sang trọng hơn không?',
                ].map((q, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 bg-white border border-stone-200 rounded-lg shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-stone-800 font-medium">{q}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 bg-stone-100 border-t border-stone-200 text-xs text-stone-500">
          <span>Phiên bản tiêu chuẩn: V2.1 (Tích hợp Chiến lược Hack Dáng & 5 Nhóm bố cục)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 text-stone-100 hover:bg-stone-900 rounded-lg font-medium transition"
          >
            Đóng sổ tay
          </button>
        </div>
      </div>
    </div>
  );
};
