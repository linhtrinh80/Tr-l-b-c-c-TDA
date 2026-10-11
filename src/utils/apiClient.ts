import { AoDaiAnalysisResult, ComparisonSynthesis } from '../types/aodai';

export const API_ENDPOINTS = {
  ANALYZE_AODAI: '/api/analyze-aodai',
  COMPARE_AODAI: '/api/compare-aodai',
  HEALTH: '/api/health',
} as const;

export async function postJson<T = any>(endpoint: string, body: any): Promise<T> {
  // Ensure the endpoint always has the leading /api/ prefix
  let targetUrl = endpoint.trim();
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    if (!targetUrl.startsWith('/api/') && targetUrl !== '/api') {
      const cleanPath = targetUrl.startsWith('/') ? targetUrl.slice(1) : targetUrl;
      targetUrl = `/api/${cleanPath}`;
    }
  }

  let response: Response;
  try {
    response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (netErr: any) {
    throw new Error(
      `Không thể kết nối đến máy chủ (${netErr?.message || 'Lỗi mạng'}). Vui lòng kiểm tra đường truyền.`
    );
  }

  const contentType = response.headers.get('content-type') || '';

  // Handle non-JSON responses gracefully (e.g. Vercel 404 HTML, 504 Timeout, 413 Payload Too Large)
  if (!contentType.includes('application/json')) {
    const rawText = await response.text();

    if (response.status === 404) {
      throw new Error(
        `Không tìm thấy endpoint (${targetUrl} - HTTP 404). Trên Vercel, hãy đảm bảo file vercel.json và api/index.ts đã được deploy cùng nhau.`
      );
    }
    if (response.status === 504) {
      throw new Error(
        `Hết thời gian chờ phản hồi (HTTP 504 Gateway Timeout). Vui lòng thử lại với ảnh nhỏ hơn hoặc kiểm tra cấu hình maxDuration trên Vercel.`
      );
    }
    if (response.status === 413) {
      throw new Error(
        `Dung lượng ảnh vượt quá giới hạn của Vercel (HTTP 413 Payload Too Large). Vui lòng chọn ảnh có dung lượng nhỏ hơn.`
      );
    }

    const cleanSnippet = rawText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120);
    throw new Error(
      `Máy chủ phản hồi mã lỗi HTTP ${response.status} (${response.statusText}): ${cleanSnippet || 'Không nhận được dữ liệu JSON hợp lệ'}`
    );
  }

  let data: any;
  try {
    data = await response.json();
  } catch (jsonErr: any) {
    throw new Error(`Dữ liệu JSON từ máy chủ không hợp lệ: ${jsonErr?.message}`);
  }

  if (!response.ok || data.success === false) {
    throw new Error(data.error || `Yêu cầu thất bại với mã lỗi HTTP ${response.status}`);
  }

  return data;
}

/**
 * Helper to analyze a single Ao Dai layout image
 */
export async function analyzeAoDaiApi(imageBase64: string, mimeType: string, note?: string) {
  return postJson<{ success: boolean; data: AoDaiAnalysisResult }>(API_ENDPOINTS.ANALYZE_AODAI, {
    imageBase64,
    mimeType,
    note: note || '',
  });
}

/**
 * Helper to compare multiple Ao Dai layout results
 */
export async function compareAoDaiApi(items: Array<{ id: string; label: string; result: any }>) {
  return postJson<{ success: boolean; data: ComparisonSynthesis }>(API_ENDPOINTS.COMPARE_AODAI, {
    items,
  });
}
