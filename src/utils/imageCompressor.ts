/**
 * Resizes and compresses an image data URL on client-side to ensure it never exceeds
 * Vercel Serverless Function payload limits (4.5MB) while preserving fine visual details
 * for Gemini 3.8 Flash analysis.
 */
export async function optimizeImageForUpload(
  dataUrl: string,
  maxDimension = 1600,
  quality = 0.88
): Promise<{ dataUrl: string; mimeType: string }> {
  // If it's an SVG (like presets), keep as is
  if (dataUrl.startsWith('data:image/svg+xml')) {
    return { dataUrl, mimeType: 'image/svg+xml' };
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;

      // Only downscale if larger than maxDimension
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        // Fallback to original
        resolve({ dataUrl, mimeType: 'image/jpeg' });
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const optimized = canvas.toDataURL('image/jpeg', quality);
      resolve({ dataUrl: optimized, mimeType: 'image/jpeg' });
    };

    img.onerror = () => {
      // Fallback to original on error
      resolve({ dataUrl, mimeType: 'image/jpeg' });
    };

    img.src = dataUrl;
  });
}
