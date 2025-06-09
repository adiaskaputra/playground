import sharp from 'sharp';
import jsQR from 'jsqr';

/**
 * Decode QR code dari base64 image data
 * @param base64Src - string base64 dari <img src="data:image/png;base64,...">
 * @returns string hasil QR code
 */
export async function decodeQrImageBase64(base64Src: string): Promise<string> {
  if (!base64Src.startsWith('data:image/png;base64,')) {
    throw new Error('Invalid base64 image format');
  }

  const base64 = base64Src.split(',')[1];
  const buffer = Buffer.from(base64, 'base64');

  const sharpImage = sharp(buffer);
  const { data, info } = await sharpImage
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const qr = jsQR(new Uint8ClampedArray(data), info.width, info.height);
  if (!qr || !qr.data) {
    throw new Error('QR decode failed or result is empty');
  }

  return qr.data;
}
