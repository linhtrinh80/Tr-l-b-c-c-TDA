import React from 'react';
import { AoDaiAnalysisResult, ComparisonSlot, ComparisonSynthesis } from '../types/aodai';

interface PrintReportProps {
  result?: AoDaiAnalysisResult | null;
  imageUrl?: string | null;
  isCompareMode?: boolean;
  comparisonSlots?: ComparisonSlot[];
  synthesis?: ComparisonSynthesis | null;
}

export const PrintReport: React.FC<PrintReportProps> = ({
  result,
  imageUrl,
  isCompareMode = false,
  comparisonSlots = [],
  synthesis,
}) => {
  if (isCompareMode && comparisonSlots.length > 0) {
    const validSlots = comparisonSlots.filter((s) => !!s.result);

    return (
      <div id="print-area" className="hidden print:block text-stone-900 bg-white p-6 max-w-4xl mx-auto">
        <div className="border-b-2 border-stone-800 pb-4 mb-6 text-center">
          <h1 className="text-2xl font-serif font-black tracking-wide uppercase">
            BÁO CÁO SO SÁNH ĐA BẢN BỐ CỤC ÁO DÀI
          </h1>
          <p className="text-xs font-serif italic text-stone-600 mt-1">
            Đối chiếu và thẩm định theo Chuẩn Mực Bố Cục Họa Tiết Vẽ Tay Áo Dài – Phiên bản V2.1
          </p>
        </div>

        {/* Synthesis Summary */}
        {synthesis && (
          <div className="border border-stone-300 p-4 rounded mb-6 text-xs bg-stone-50">
            <h2 className="font-bold uppercase text-stone-800 mb-1">TỔNG QUAN ĐỐI CHIẾU:</h2>
            <p className="leading-relaxed text-stone-700">{synthesis.summary}</p>
          </div>
        )}

        {/* Matrix Table */}
        <h2 className="text-sm font-bold uppercase border-b border-stone-400 pb-1 mb-2">
          MA TRẬN ĐỐI CHIẾU TIÊU CHÍ (CHUẨN 100 ĐIỂM)
        </h2>
        <table className="w-full text-xs border border-stone-300 mb-6 border-collapse">
          <thead>
            <tr className="bg-stone-100 border-b border-stone-300">
              <th className="p-2 text-left border-r border-stone-300">Tiêu chí</th>
              {validSlots.map((s) => (
                <th key={s.id} className="p-2 text-center border-r border-stone-300 font-bold">
                  {s.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-stone-200 bg-amber-50/50">
              <td className="p-2 border-r border-stone-200 font-bold">Tổng điểm (/100)</td>
              {validSlots.map((s) => (
                <td key={s.id} className="p-2 text-center border-r border-stone-200 font-black">
                  {s.result?.scores.totalScore} đ
                </td>
              ))}
            </tr>
            <tr className="border-b border-stone-200">
              <td className="p-2 border-r border-stone-200 font-medium">Xếp hạng chuẩn</td>
              {validSlots.map((s) => (
                <td key={s.id} className="p-2 text-center border-r border-stone-200">
                  {s.result?.scores.rank.name}
                </td>
              ))}
            </tr>
            <tr className="border-b border-stone-200">
              <td className="p-2 border-r border-stone-200 font-medium">Level tư duy (L1-L5)</td>
              {validSlots.map((s) => (
                <td key={s.id} className="p-2 text-center border-r border-stone-200">
                  {s.result?.overview.designLevelName}
                </td>
              ))}
            </tr>
            <tr className="border-b border-stone-200">
              <td className="p-2 border-r border-stone-200 font-medium">Nhóm bố cục & Dòng chảy</td>
              {validSlots.map((s) => (
                <td key={s.id} className="p-2 text-center border-r border-stone-200">
                  {s.result?.overview.layoutTypeVi} ({s.result?.overview.flowType})
                </td>
              ))}
            </tr>
            <tr className="border-b border-stone-200">
              <td className="p-2 border-r border-stone-200 font-medium">Phần A: Bố cục (25%)</td>
              {validSlots.map((s) => (
                <td key={s.id} className="p-2 text-center border-r border-stone-200">
                  {s.result?.scores.categoryA.weightedScore} / 25
                </td>
              ))}
            </tr>
            <tr className="border-b border-stone-200">
              <td className="p-2 border-r border-stone-200 font-medium">Phần B: Dẫn mắt (15%)</td>
              {validSlots.map((s) => (
                <td key={s.id} className="p-2 text-center border-r border-stone-200">
                  {s.result?.scores.categoryB.weightedScore} / 15
                </td>
              ))}
            </tr>
            <tr className="border-b border-stone-200">
              <td className="p-2 border-r border-stone-200 font-medium">Phần C: Khoảng thở (20%)</td>
              {validSlots.map((s) => (
                <td key={s.id} className="p-2 text-center border-r border-stone-200">
                  {s.result?.scores.categoryC.weightedScore} / 20 (Trống {s.result?.overview.negativeSpaceRatio.emptyPercent}%)
                </td>
              ))}
            </tr>
            <tr className="border-b border-stone-200">
              <td className="p-2 border-r border-stone-200 font-medium">Phần D: Màu sắc & Hack dáng (20%)</td>
              {validSlots.map((s) => (
                <td key={s.id} className="p-2 text-center border-r border-stone-200">
                  {s.result?.scores.categoryD.weightedScore} / 20
                </td>
              ))}
            </tr>
            <tr className="border-b border-stone-200">
              <td className="p-2 border-r border-stone-200 font-medium">Phần E: Kỹ thuật hoàn thiện (20%)</td>
              {validSlots.map((s) => (
                <td key={s.id} className="p-2 text-center border-r border-stone-200">
                  {s.result?.scores.categoryE.weightedScore} / 20
                </td>
              ))}
            </tr>
            <tr className="border-b border-stone-200">
              <td className="p-2 border-r border-stone-200 font-medium">Lỗi cấm kỵ vi phạm</td>
              {validSlots.map((s) => {
                const count = s.result?.tabooChecks.filter((t) => t.violated).length || 0;
                return (
                  <td key={s.id} className="p-2 text-center border-r border-stone-200 font-bold">
                    {count === 0 ? '0 lỗi (An toàn)' : `${count} vi phạm`}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>

        {/* Best selections */}
        {synthesis && (
          <div className="border border-stone-300 p-4 rounded text-xs mb-6">
            <h3 className="font-bold uppercase text-stone-800 mb-2">HẠNG MỤC XUẤT SẮC NHẤT & LỜI KHUYÊN:</h3>
            <p className="mb-2"><strong>Mẫu chiến thắng toàn diện:</strong> {synthesis.bestSelections?.overallWinnerReason}</p>
            <p className="mb-2"><strong>Lời khuyên cho nhà thiết kế:</strong> {synthesis.verdictAndAdvice}</p>
          </div>
        )}

        <div className="flex justify-between text-[10px] text-stone-500 pt-4 border-t border-stone-200">
          <span>Hệ thống Thẩm định Bố cục Áo dài Vẽ tay - Chuẩn V2.1</span>
          <span>Ngày xuất: {new Date().toLocaleDateString('vi-VN')}</span>
        </div>
      </div>
    );
  }

  if (!result) return null;
  const { overview, scores, tabooChecks, strengths, weaknesses, verdict } = result;

  return (
    <div id="print-area" className="hidden print:block text-stone-900 bg-white p-6 max-w-4xl mx-auto">
      {/* Official Header */}
      <div className="border-b-2 border-stone-800 pb-4 mb-6 text-center">
        <h1 className="text-2xl font-serif font-black tracking-wide uppercase">
          PHIẾU THẨM ĐỊNH BỐ CỤC ÁO DÀI VẼ TAY
        </h1>
        <p className="text-xs font-serif italic text-stone-600 mt-1">
          Theo Chuẩn Mực Đánh Giá Bố Cục Họa Tiết Vẽ Tay Trên Áo Dài – Phiên bản V2.1
        </p>
      </div>

      {/* Basic metadata */}
      <div className="grid grid-cols-2 gap-4 text-xs mb-6 border border-stone-300 p-4 rounded">
        <div>
          <p><strong>Tên tác phẩm:</strong> {overview.title || 'Mẫu Áo Dài Thẩm Định'}</p>
          <p><strong>Nhóm bố cục:</strong> {overview.layoutTypeVi} ({overview.layoutType})</p>
          <p><strong>Hình thái dòng chảy:</strong> {overview.flowType}</p>
          <p><strong>Cấp độ tư duy:</strong> {overview.designLevelName} ({overview.designLevel})</p>
        </div>
        <div>
          <p><strong>Điểm tổng thể:</strong> <span className="text-lg font-bold">{scores.totalScore} / 100</span></p>
          <p><strong>Xếp hạng chuẩn:</strong> <span className="font-bold uppercase">{scores.rank.name}</span></p>
          <p><strong>Tỷ lệ khoảng thở:</strong> Họa tiết {overview.negativeSpaceRatio.motifPercent}% | Khoảng trống {overview.negativeSpaceRatio.emptyPercent}%</p>
          <p><strong>Vi phạm điều cấm:</strong> {tabooChecks.filter(t => t.violated).length} lỗi</p>
        </div>
      </div>

      {/* Image if available */}
      {imageUrl && (
        <div className="mb-6 flex justify-center">
          <img
            src={imageUrl}
            alt="Mẫu áo dài"
            className="max-h-64 object-contain border border-stone-300 rounded"
          />
        </div>
      )}

      {/* Detailed Score Table */}
      <h2 className="text-sm font-bold uppercase border-b border-stone-400 pb-1 mb-2">
        BẢNG ĐIỂM CHI TIẾT 5 CẤU PHẦN
      </h2>
      <table className="w-full text-xs border border-stone-300 mb-6 border-collapse">
        <thead>
          <tr className="bg-stone-100 border-b border-stone-300">
            <th className="p-2 text-left border-r border-stone-300">Cấu phần</th>
            <th className="p-2 text-center border-r border-stone-300">Trọng số</th>
            <th className="p-2 text-center border-r border-stone-300">Điểm thô</th>
            <th className="p-2 text-center">Điểm quy đổi</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-stone-200">
            <td className="p-2 border-r border-stone-200 font-medium">A. Bố cục tổng thể & Dòng chảy</td>
            <td className="p-2 text-center border-r border-stone-200">25%</td>
            <td className="p-2 text-center border-r border-stone-200">{scores.categoryA.rawTotal}/30</td>
            <td className="p-2 text-center font-bold">{scores.categoryA.weightedScore}/25</td>
          </tr>
          <tr className="border-b border-stone-200">
            <td className="p-2 border-r border-stone-200 font-medium">B. Chuyển động thị giác & Nhịp điệu</td>
            <td className="p-2 text-center border-r border-stone-200">15%</td>
            <td className="p-2 text-center border-r border-stone-200">{scores.categoryB.rawTotal}/15</td>
            <td className="p-2 text-center font-bold">{scores.categoryB.weightedScore}/15</td>
          </tr>
          <tr className="border-b border-stone-200">
            <td className="p-2 border-r border-stone-200 font-medium">C. Cân bằng & Khoảng thở (Negative space)</td>
            <td className="p-2 text-center border-r border-stone-200">20%</td>
            <td className="p-2 text-center border-r border-stone-200">{scores.categoryC.rawTotal}/15</td>
            <td className="p-2 text-center font-bold">{scores.categoryC.weightedScore}/20</td>
          </tr>
          <tr className="border-b border-stone-200">
            <td className="p-2 border-r border-stone-200 font-medium">D. Màu sắc, Tương phản & Hack dáng (V2.1)</td>
            <td className="p-2 text-center border-r border-stone-200">20%</td>
            <td className="p-2 text-center border-r border-stone-200">{scores.categoryD.rawTotal}/20</td>
            <td className="p-2 text-center font-bold">{scores.categoryD.weightedScore}/20</td>
          </tr>
          <tr className="border-b border-stone-200">
            <td className="p-2 border-r border-stone-200 font-medium">E. Kỹ thuật nét vẽ & Hoàn thiện</td>
            <td className="p-2 text-center border-r border-stone-200">20%</td>
            <td className="p-2 text-center border-r border-stone-200">{scores.categoryE.rawTotal}/20</td>
            <td className="p-2 text-center font-bold">{scores.categoryE.weightedScore}/20</td>
          </tr>
          <tr className="bg-stone-100 font-bold">
            <td colSpan={3} className="p-2 text-right border-r border-stone-300">TỔNG ĐIỂM CHUẨN:</td>
            <td className="p-2 text-center text-sm">{scores.totalScore} / 100</td>
          </tr>
        </tbody>
      </table>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-2 gap-4 text-xs mb-6">
        <div className="border border-stone-300 p-3 rounded">
          <h3 className="font-bold uppercase text-stone-800 mb-2 border-b pb-1">ĐIỂM MẠNH CHỦ ĐẠO</h3>
          <ul className="list-disc pl-4 space-y-1">
            {strengths?.map((s, idx) => <li key={idx}>{s}</li>)}
          </ul>
        </div>
        <div className="border border-stone-300 p-3 rounded">
          <h3 className="font-bold uppercase text-stone-800 mb-2 border-b pb-1">ĐIỂM CẦN CẢI THIỆN</h3>
          <ul className="list-disc pl-4 space-y-1">
            {weaknesses?.map((w, idx) => <li key={idx}>{w}</li>)}
          </ul>
        </div>
      </div>

      {/* Final Verdict */}
      <div className="border border-stone-300 p-4 rounded text-xs mb-6">
        <h3 className="font-bold uppercase text-stone-800 mb-1">KẾT LUẬN & ĐỀ XUẤT ỨNG DỤNG</h3>
        <p className="leading-relaxed mb-2">{verdict.overallConclusion}</p>
        <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-700">
          <p><strong>Vóc dáng tôn tối ưu:</strong> {verdict.targetSilhouettes}</p>
          <p><strong>Chất liệu vải may khuyên dùng:</strong> {verdict.recommendedFabric}</p>
          <p><strong>Dịp sử dụng:</strong> {verdict.targetOccasions?.join(', ')}</p>
          <p><strong>Khả năng thương mại:</strong> {verdict.commercialViability}</p>
        </div>
      </div>

      <div className="flex justify-between text-[10px] text-stone-500 pt-4 border-t border-stone-200">
        <span>Hệ thống Thẩm định Bố cục Áo dài Vẽ tay - Chuẩn V2.1</span>
        <span>Ngày xuất: {new Date().toLocaleDateString('vi-VN')}</span>
      </div>
    </div>
  );
};

