import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { AoDaiAnalysisResult } from './src/types/aodai';

dotenv.config();

export const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize GoogleGenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_PROMPT_DOC = `
BẠN LÀ CHUYÊN GIA THẨM ĐỊNH NGHỆ THUẬT HÀNG ĐẦU VỀ HỌA TIẾT VẼ TAY TRÊN ÁO DÀI VIỆT NAM, VỚI BỘ TIÊU CHÍ CHÍNH THỨC:
"CHUẨN MỰC ĐÁNH GIÁ BỐ CỤC HỌA TIẾT VẼ TAY TRÊN ÁO DÀI – V2.1"

Nhiệm vụ của bạn: Phân tích hình ảnh mẫu áo dài / bản vẽ phác thảo bố cục áo dài được người dùng tải lên, và xuất ra một bản thẩm định chi tiết, khoa học, chính xác 100% theo các tiêu chí, công thức tính điểm và nguyên tắc của tài liệu V2.1.

=== NỘI DUNG TÀI LIỆU CHUẨN MỰC V2.1 ===

1. CẤU TRÚC 5 CẤU PHẦN ĐÁNH GIÁ & CÔNG THỨC CHUẨN:
- Cấu phần A: BỐ CỤC TỔNG THỂ & DÒNG CHẢY (Trọng số 25%)
  Gồm 6 tiêu chí con (mỗi tiêu chí 1-5 điểm):
  + A1. Loại hình bố cục: S-Flow Continuous, Wrap-around, Dual Diagonal, Cascading, Vertical Column, Crowned Chest, Branch Narrative, Scattered Flowing, Minimal Shoulder Accent. Đánh giá tính phù hợp, đẳng cấp, tư duy 3D hay 2D dán hoa.
  + A2. Hệ cấu trúc thị giác: Growth Composition (logic sinh trưởng gốc-thân-cành-hoa), Floating Cluster (cụm nổi watercolor/mờ), Ornamental Motif (trang sức/cung đình), Branch Line, Calligraphic (nét thư pháp).
  + A3. Dòng chảy thị giác (Flow Type): Đánh giá theo ý đồ. QUAN TRỌNG: Không phải mọi bố cục đều yêu cầu dòng chảy xuống tà áo! Ví dụ: Crowned Chest và Descending Diagonal KHÔNG BẮT BUỘC xuống tà (chỉ cần kết thúc mềm ở eo trên hoặc hông, không coi là đứt đoạn lỗi). Nhưng Continuous S-Flow và Ascending Spiral BẮT BUỘC phải liên tục không đứt đoạn (đứt là lỗi ngắt quãng).
  + A4a. Vai trò của lá: Lá ẩn (loang mờ, tạo chiều sâu), lá hiện (đổ khối 3D vững chãi bệ đỡ), lá dẫn (nối các cụm), tạo khoảng thở ở eo/bụng dưới (không có lá đặc ở vùng eo), mật độ giảm dần.
  + A4b. Vai trò của cành: Cành là xương sống dòng chảy. Kỹ thuật "Xuyên diệp nhất tuyến" (cành mảnh chạy chéo 45° qua eo tạo hiệu ứng bóp eo ảo), cành ẩn/hiện kết hợp, biến đổi độ dày (to ở gốc, nhỏ ở ngọn).
  + A4c. Tương tác lá - cành - họa tiết: Hệ sinh thái thống nhất. Màu lá giảm độ bão hòa (desaturated) nhường chỗ cho hoa nổi bật. Tương phản hình khối (lá to - hoa nhỏ, lá nhọn - hoa tròn).
  => Điểm cấu phần A = (A1 + A2 + A3 + A4a + A4b + A4c) / 30 * 25.

- Cấu phần B: CHUYỂN ĐỘNG THỊ GIÁC & NHỊP ĐIỆU (Trọng số 15%)
  Gồm 3 tiêu chí con (mỗi tiêu chí 1-5 điểm):
  + B1. Cấu trúc dẫn mắt (Eye Path): Hành trình có chủ đích: Focal chính (vai/ngực) -> Secondary (eo/hông) -> Detail -> Kết thúc mềm. Tối đa 3-4 điểm dừng chính, không để mắt bị rối nhảy loạn.
  + B2. Nhịp điệu biến hóa (Rhythmic Variation): Visual Echo (vọng thị giác), Cluster Rhythm (cụm theo tầng), Leaf Rhythm (nhịp lá nối dòng), Size Gradation, Density Gradation. Kết hợp ít nhất 2 loại nhịp.
  + B3. Động năng (Kinetic Energy): Năng lượng cao (dramatic, xiên nhọn), thác đổ mềm (cascading), thấp (tĩnh), rất thấp (thiền). Phù hợp mục đích trang phục (dạ tiệc/lễ hội hay thiền trà/đám cưới).
  => Điểm cấu phần B = (B1 + B2 + B3) / 15 * 15.

- Cấu phần C: CÂN BẰNG & KHOẢNG THỞ (Trọng số 20%)
  Gồm 3 tiêu chí con (mỗi tiêu chí 1-5 điểm):
  + C1. Loại hình cân bằng: Asymmetrical có kiểm soát (lệch thân nhưng cân bằng bằng khoảng trống lớn đối diện hoặc hướng nhìn), Organic, Offset, Soft Asymmetry. Tránh đối xứng cứng nhắc nhàm chán.
  + C2. Tỷ lệ vàng khoảng thở (Negative Space): Áo dài cao cấp họa tiết chiếm 20-40%, khoảng trống chiếm 60-80% (Dòng thiền 85-90%, lãng mạn 75-85%, trang trí cao cấp 65-80%, ornamental 50-65%). Cấm phủ kín >60% (bị coi là thấp cấp/chợ). Khoảng trống phải có đời sống.
  + C3. Gradient mật độ thị giác (Density Gradient): Vai/ngực dày và tương phản nhất -> eo/hông thưa vừa -> tà áo nhẹ và thưa nhất. Nếu dưới tà dày hơn hoặc bằng ngực thì áo nặng nề và làm người mặc lùn tịt.
  => Điểm cấu phần C = (C1 + C2 + C3) / 15 * 20.

- Cấu phần D: MÀU SẮC, TƯƠNG PHẢN & CHIẾN LƯỢC HACK DÁNG (Trọng số 20%)
  Gồm 4 tiêu chí con (mỗi tiêu chí 1-5 điểm):
  + D1. Phối màu tổng thể: Controlled Contrast, Warm Imperial, Cool Serene, Pastel Luxury, Tropical Warm, Monochrome Minimal. Không quá 3-4 màu chính. Màu nền quyết định 70% cảm xúc.
  + D2. Chiến lược tương phản: Nóng-lạnh, sáng-tối, độ bão hòa (lá luôn desaturated để hoa nổi), ánh sáng 3D.
  + D3. Bảng màu theo phong cách & Ứng dụng: Phù hợp ngữ cảnh (Tết, cưới, lễ hội, thiền trà, dạ tiệc, gallery).
  + D4. Chiến lược hack dáng bằng màu sắc (V2.1 - 30% của phần D): Gradient dọc (đậm/nóng trên, nhạt/trầm dưới để kéo dài dáng), Tông xuyệt tông (không cắt khúc thị giác), Trụ cột màu (color pillar chạy dọc), Tương phản có chọn lọc (màu nóng ở vai/ngực để tôn vòng 1, màu lạnh/tối ở eo/bụng để che khuyết điểm), Màu nền tôn dáng.
  => Điểm cấu phần D = (D1 + D2 + D3 + D4) / 20 * 20.

- Cấu phần E: KỸ THUẬT & HOÀN THIỆN (Trọng số 20%)
  Gồm 4 tiêu chí con (mỗi tiêu chí 1-5 điểm):
  + E1. Độ sạch & chính xác nét vẽ: Viền cánh hoa/lá/cành sắc nét, không lem, không vết chì phác thảo sót lại.
  + E2. Kỹ thuật màu & chuyển sắc: Gradient mịn màng không ranh giới đột ngột, màu trong suốt trên nền vải, không vón cục hay vệt cọ thô.
  + E3. Xử lý chi tiết: Gân lá mảnh và có chiều sâu (chừa sáng 1 ly), nhụy hoa stippling hạt nổi/kéo sợi 3D, cành có biến đổi gốc to ngọn nhỏ.
  + E4. Hoàn thiện & tương thích chất liệu vải: Họa tiết "sống" trên chất liệu (vải lì matte cần hoa rõ khối; vải gấm jacquard hay nhung thì họa tiết tối giản hơn để vải tự "thở").
  => Điểm cấu phần E = (E1 + E2 + E3 + E4) / 20 * 20.

TỔNG ĐIỂM = A + B + C + D + E (Thang điểm 100, làm tròn 1 chữ số thập phân).

2. THANG XẾP HẠNG:
- 90 - 100: "Masterpiece / Haute Couture" (Đẳng cấp gallery, sánh ngang với các mẫu cúc, mộc tĩnh, hồng miện)
- 80 - 89: "Excellent / Luxury Collection" (Cao cấp, đạt chuẩn fashion editorial)
- 70 - 79: "Good / Premium" (Tốt, có thể thương mại hóa cao cấp)
- 60 - 69: "Average / Commercial" (Trung bình, đạt yêu cầu thương mại phổ thông)
- 50 - 59: "Below Average" (Dưới trung bình, cần cải thiện nhiều)
- < 50: "Poor / Unacceptable" (Kém, không đạt chuẩn bố cục nghệ thuật)

3. CẤP ĐỘ TƯ DUY THIẾT KẾ (DESIGN LEVEL):
- L5 (Triết học): Tối giản đến mức tinh túy, khoảng trống là nhân vật chính, chiều sâu văn hóa wabi-sabi / thiền họa.
- L4 (Kể chuyện): Có gốc rễ cội nguồn, logic sinh trưởng tự nhiên, cành lá vươn mình có chủ đích.
- L3 (Không gian 3D): Hiểu áo là khối tròn, tạo flow vòng quanh cơ thể (wrap-around), liên kết trước-sau, không bị cắt ngang ở hông.
- L2 (Trang trí): Có bố cục đẹp trên mặt phẳng nhưng chưa có chiều sâu 3D.
- L1 (Dán hoa): Hoa rời, đặt lên áo, không flow, không liên kết.

4. 11 ĐIỀU CẤM KỴ (11 TABOOS):
1. Họa tiết bị cắt đột ngột ở đường hông.
2. Flow bị đứt đoạn không có chủ đích (đặc biệt S-Flow và Ascending; lưu ý Crowned chest và Diagonal kết thúc sớm không phải lỗi).
3. Mật độ dưới tà dày bằng hoặc hơn phần trên (làm nặng áo, dìm chiều cao).
4. Lấp đầy toàn bộ thân áo — không có khoảng thở.
5. Đặt focal point quá thấp (gần tà) làm người mặc lùn.
6. Sử dụng quá 4 màu chính trong một bố cục.
7. Hoa và lá có cùng độ bão hòa (làm rối mắt).
8. Phủ thêm họa tiết vào bên đối diện của bố cục lệch (mất đi vẻ sang trọng).
9. Mặt sau chỉ là bản copy của mặt trước (thiếu tư duy 3D).
10. Không có cấu trúc dẫn mắt (eye path) làm mắt nhìn lạc lõng.
11. Sử dụng màu sắc đi ngược lại mục tiêu hack dáng (ví dụ màu nóng bão hòa cao ở eo/bụng làm phình to vòng 2; màu tối ở ngực làm thu nhỏ vòng 1).

5. 10 CÂU HỎI VÀNG KIỂM TRA ĐẲNG CẤP CAO CẤP:
1. Họa tiết có bị cắt đứt bởi đường hông của áo không?
2. Khi người mặc xoay người, bố cục mặt trước và sau có liên kết với nhau không?
3. Mắt tôi có một hành trình rõ ràng để đi (từ lớn đến nhỏ, từ trên xuống dưới) hay bị lóa mắt vì quá nhiều điểm nhấn?
4. Phần tà áo có được vẽ nhẹ và thưa hơn phần vai/ngực không?
5. Có một vùng khoảng trống đủ lớn và "có ý nghĩa" trên thân áo để mắt được nghỉ ngơi không?
6. Nếu bố cục lệch về một bên, bên còn lại có bị "trống chết" hay nó vẫn được cân bằng bởi hướng nhìn/chất liệu?
7. Màu lá có bị lấn át hoặc quá bão hòa so với hoa không?
8. Màu sắc và mật độ có tương thích với chất liệu vải mà nó nằm trên đó không?
9. Họa tiết đang kể một câu chuyện/cảm xúc gì, hay chỉ đơn thuần để lấp đầy chỗ trống?
10. Nếu phải giữ nguyên diện tích phủ hoa, liệu có dám bỏ bớt một vài chi tiết nhỏ để bố cục tinh tế và sang trọng hơn không?

=== YÊU CẦU ĐẦU RA ===
Hãy thẩm định hình ảnh áo dài được cung cấp thật kỹ lưỡng, khách quan và chuyên nghiệp.
Trả về dữ liệu JSON thuần (không có markdown backticks ở ngoài).
`;

// Create router to mount on both `/api` and `/` (handles any Vercel rewrite configuration)
const apiRouter = Router();

// Health check endpoint
apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'Hoa Sac Ao Dai AI Analyzer', version: '2.1' });
});

// Analyze single Ao Dai layout
apiRouter.post('/analyze-aodai', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', note = '' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Hình ảnh là bắt buộc. Vui lòng cung cấp dữ liệu ảnh.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Chưa cấu hình biến môi trường GEMINI_API_KEY trên máy chủ (Vercel Environment Variables).',
      });
    }

    // Clean base64 string if it contains prefix
    const base64Clean = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const promptText = `
Hãy thẩm định bố cục chiếc áo dài vẽ tay trong hình ảnh đính kèm theo đúng Chuẩn Mực Đánh Giá Bố Cục Họa Tiết Vẽ Tay Trên Áo Dài – V2.1.
${note ? `Ghi chú bổ sung từ người dùng: ${note}` : ''}

Đảm bảo:
1. Mô tả chi tiết hình ảnh, nhận diện chuẩn xác Loại hình bố cục (Layout Type) và Hình thái dòng chảy (Flow Type).
2. Chấm điểm đầy đủ từng tiêu chí con từ A1 đến E4 theo thang điểm 1-5, tính đúng công thức theo tài liệu.
3. Kiểm tra chi tiết 11 điều cấm kỵ và 10 câu hỏi vàng.
4. Nêu bật các điểm mạnh, các điểm cần cải thiện, đề xuất giải pháp kỹ thuật cụ thể và đưa ra kết luận toàn diện.
5. Định dạng phản hồi: Chỉ trả về JSON hợp lệ theo đúng cấu trúc yêu cầu.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Clean,
              mimeType: mimeType || 'image/jpeg',
            },
          },
          {
            text: promptText,
          },
        ],
      },
      config: {
        systemInstruction: SYSTEM_PROMPT_DOC,
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const responseText = response.text || '';
    let parsedResult: AoDaiAnalysisResult;

    try {
      parsedResult = JSON.parse(responseText.trim());
    } catch (parseErr) {
      console.warn('Direct JSON parse failed, trying regex extraction:', parseErr);
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Không thể phân tích dữ liệu trả về từ mô hình AI.');
      }
    }

    // Calculate rawTotal and weightedScore calculations matching V2.1 rules
    const { scores } = parsedResult;
    if (scores?.categoryA?.criteria) {
      const cr = scores.categoryA.criteria;
      const sum = (cr.a1?.score || 3) + (cr.a2?.score || 3) + (cr.a3?.score || 3) + 
                  (cr.a4a?.score || 3) + (cr.a4b?.score || 3) + (cr.a4c?.score || 3);
      scores.categoryA.rawTotal = sum;
      scores.categoryA.weightedScore = Math.round((sum / 30) * 25 * 10) / 10;
    }

    if (scores?.categoryB?.criteria) {
      const cr = scores.categoryB.criteria;
      const sum = (cr.b1?.score || 3) + (cr.b2?.score || 3) + (cr.b3?.score || 3);
      scores.categoryB.rawTotal = sum;
      scores.categoryB.weightedScore = Math.round((sum / 15) * 15 * 10) / 10;
    }

    if (scores?.categoryC?.criteria) {
      const cr = scores.categoryC.criteria;
      const sum = (cr.c1?.score || 3) + (cr.c2?.score || 3) + (cr.c3?.score || 3);
      scores.categoryC.rawTotal = sum;
      scores.categoryC.weightedScore = Math.round((sum / 15) * 20 * 10) / 10;
    }

    if (scores?.categoryD?.criteria) {
      const cr = scores.categoryD.criteria;
      const sum = (cr.d1?.score || 3) + (cr.d2?.score || 3) + (cr.d3?.score || 3) + (cr.d4?.score || 3);
      scores.categoryD.rawTotal = sum;
      scores.categoryD.weightedScore = Math.round((sum / 20) * 20 * 10) / 10;
    }

    if (scores?.categoryE?.criteria) {
      const cr = scores.categoryE.criteria;
      const sum = (cr.e1?.score || 3) + (cr.e2?.score || 3) + (cr.e3?.score || 3) + (cr.e4?.score || 3);
      scores.categoryE.rawTotal = sum;
      scores.categoryE.weightedScore = Math.round((sum / 20) * 20 * 10) / 10;
    }

    const totalCalculated = Math.round(
      ((scores.categoryA?.weightedScore || 0) +
       (scores.categoryB?.weightedScore || 0) +
       (scores.categoryC?.weightedScore || 0) +
       (scores.categoryD?.weightedScore || 0) +
       (scores.categoryE?.weightedScore || 0)) * 10
    ) / 10;

    scores.totalScore = totalCalculated;

    // Verify Rank matching
    if (totalCalculated >= 90) {
      scores.rank = {
        name: 'Masterpiece / Haute Couture',
        badgeColor: 'emerald',
        meaning: 'Đẳng cấp gallery, sánh ngang với các tuyệt tác đỉnh cao (mẫu cúc, mộc tĩnh, hồng miện)',
      };
    } else if (totalCalculated >= 80) {
      scores.rank = {
        name: 'Excellent / Luxury Collection',
        badgeColor: 'blue',
        meaning: 'Cao cấp, đạt chuẩn thời trang fashion editorial quốc tế',
      };
    } else if (totalCalculated >= 70) {
      scores.rank = {
        name: 'Good / Premium',
        badgeColor: 'indigo',
        meaning: 'Tốt, sẵn sàng thương mại hóa phân khúc cao cấp',
      };
    } else if (totalCalculated >= 60) {
      scores.rank = {
        name: 'Average / Commercial',
        badgeColor: 'amber',
        meaning: 'Trung bình, đạt yêu cầu thương mại phổ thông, cần trau chuốt thêm điểm dừng',
      };
    } else if (totalCalculated >= 50) {
      scores.rank = {
        name: 'Below Average',
        badgeColor: 'orange',
        meaning: 'Dưới trung bình, cần tinh chỉnh bố cục và khoảng thở nhiều',
      };
    } else {
      scores.rank = {
        name: 'Poor / Unacceptable',
        badgeColor: 'rose',
        meaning: 'Kém, chưa đạt chuẩn bố cục nghệ thuật áo dài (cần vẽ lại theo flow chuẩn)',
      };
    }

    return res.json({ success: true, data: parsedResult });
  } catch (error: any) {
    console.error('Lỗi khi phân tích bố cục áo dài:', error);
    return res.status(500).json({
      error: error?.message || 'Đã xảy ra lỗi trong quá trình phân tích hình ảnh áo dài.',
    });
  }
});

// Compare multiple Ao Dai layouts
apiRouter.post('/compare-aodai', async (req: Request, res: Response) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length < 2) {
      return res.status(400).json({
        error: 'Cần ít nhất 2 mẫu áo dài đã được thẩm định để thực hiện so sánh đối chiếu.',
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Chưa cấu hình biến môi trường GEMINI_API_KEY trên máy chủ (Vercel Environment Variables).',
      });
    }

    const itemsSummary = items.map((item, index) => {
      const resData: AoDaiAnalysisResult = item.result;
      return `
[MẪU ${index + 1} - Mã: ${item.id} - Tên nhãn: "${item.label}"]:
- Tiêu đề tác phẩm: ${resData.overview.title}
- Điểm tổng: ${resData.scores.totalScore}/100 (Xếp hạng: ${resData.scores.rank.name})
- Cấp độ tư duy: ${resData.overview.designLevelName}
- Nhóm bố cục: ${resData.overview.layoutTypeVi} (${resData.overview.layoutType})
- Hình thái dòng chảy: ${resData.overview.flowType}
- Cấu trúc thị giác: ${resData.overview.structureType}
- Tư duy 3D Wrap-around: ${resData.overview.has3DWrapAround ? 'Có' : 'Không'}
- Tỷ lệ khoảng thở: Họa tiết ${resData.overview.negativeSpaceRatio.motifPercent}% / Trống ${resData.overview.negativeSpaceRatio.emptyPercent}%
- Phong cách màu: ${resData.overview.colorPalette.styleCategory} (${resData.overview.colorPalette.primaryColors.join(', ')})
- Hiệu ứng hack dáng màu sắc: ${resData.overview.colorPalette.hackDangEffect}
- Điểm thành phần: A=${resData.scores.categoryA.weightedScore}/25, B=${resData.scores.categoryB.weightedScore}/15, C=${resData.scores.categoryC.weightedScore}/20, D=${resData.scores.categoryD.weightedScore}/20, E=${resData.scores.categoryE.weightedScore}/20
- Số lỗi cấm kỵ vi phạm: ${resData.tabooChecks.filter(t => t.violated).length} lỗi
- Điểm mạnh chính: ${resData.strengths.slice(0, 3).join('; ')}
- Điểm cần cải thiện: ${resData.weaknesses.slice(0, 2).join('; ')}
- Kết luận: ${resData.verdict.overallConclusion}
`;
    }).join('\n');

    const promptText = `
Dựa vào dữ liệu thẩm định của ${items.length} mẫu áo dài vẽ tay theo "CHUẨN MỰC ĐÁNH GIÁ BỐ CỤC HỌA TIẾT VẼ TAY TRÊN ÁO DÀI – V2.1", hãy thực hiện bản so sánh - đối chiếu chuyên sâu.

DỮ LIỆU CÁC MẪU ÁO:
${itemsSummary}

YÊU CẦU:
1. Đánh giá khách quan, chuyên nghiệp, sử dụng đúng thuật ngữ của chuẩn mực V2.1 (như S-Flow, Crowned Chest, Xuyên diệp nhất tuyến, Negative Space Dominance, L1-L5, v.v.).
2. Nêu rõ các ĐIỂM GIỐNG NHAU (tương đồng về kỹ thuật/triết lý/bố cục).
3. Nêu rõ các ĐIỂM KHÁC BIỆT then chốt theo từng khía cạnh: Dòng chảy thị giác, Tỷ lệ khoảng thở, Chiến lược hack dáng bằng màu sắc và cành, Mức độ hoàn thiện.
4. Chọn ra mẫu xuất sắc nhất ở từng hạng mục (bestSelections) kèm lý giải ngắn gọn và chuẩn xác.
5. Đề xuất mẫu phù hợp nhất theo từng kịch bản sử dụng (scenarioRecommendations).
6. Đưa ra lời khuyên chiến lược cho nhà thiết kế (verdictAndAdvice).

Trả về định dạng JSON thuần không có markdown backticks bao ngoài.
`;

    const compareResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_PROMPT_DOC,
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const rawText = compareResponse.text || '';
    let parsedSynthesis;
    try {
      parsedSynthesis = JSON.parse(rawText.trim());
    } catch {
      const match = rawText.match(/\{[\s\S]*\}/);
      if (match) {
        parsedSynthesis = JSON.parse(match[0]);
      } else {
        throw new Error('Không thể phân tích dữ liệu so sánh từ mô hình AI.');
      }
    }

    return res.json({ success: true, data: parsedSynthesis });
  } catch (error: any) {
    console.error('Lỗi khi so sánh các mẫu áo dài:', error);
    return res.status(500).json({
      error: error?.message || 'Đã xảy ra lỗi trong quá trình so sánh các mẫu áo dài.',
    });
  }
});

// Mount on both `/api` and `/` so requests like `/api/analyze-aodai` OR `/analyze-aodai` both succeed
app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;
