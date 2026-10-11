export async function postJson<T = any>(endpoint: string, body: any): Promise<T> {
  let response: Response;
  try {
    response = await fetch(endpoint, {
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
        `Không tìm thấy endpoint (${endpoint} - HTTP 404). Trên Vercel, hãy đảm bảo file vercel.json và api/index.ts đã được deploy cùng nhau.`
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
