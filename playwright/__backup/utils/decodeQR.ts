// import jsQR from 'jsqr';
// import { createCanvas, loadImage } from 'canvas';

// export async function decodeQRFromDataUrl(dataUrl: string): Promise<string> {
//   const image = await loadImage(dataUrl);
//   const canvas = createCanvas(image.width, image.height);
//   const ctx = canvas.getContext('2d');
//   ctx.drawImage(image, 0, 0);

//   const imageData = ctx.getImageData(0, 0, image.width, image.height);
//   const code = jsQR(imageData.data, image.width, image.height);
//   if (!code) throw new Error('QR code not detected');
//   return code.data;
// }
