import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Browser, Page, chromium } from 'playwright';
import dotenv from 'dotenv';
import jsQR from 'jsqr';
import sharp from 'sharp';
dotenv.config();

const headless = process.env.HEADLESS === 'true';
const baseUrl = process.env.VALID_WAITING_URL || '';

let browser: Browser;
let page: Page;

Given('I open an valid waiting URL', { timeout: 10000 }, async () => {
  browser = await chromium.launch({ headless });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto(baseUrl);
});

Then('I should see the QR code with the branch.io link & button open app', { timeout: 20000 }, async function () {
  const title = page.locator('.content__title');
  await expect(title).toBeVisible({ timeout: 10000 });
  await expect(title).toHaveText('Redirecting you to complete your data sharing');

  //
  //  TEST QR CODE
  //
  const qrImage = page.locator('[alt="img qr"]');
  await expect(qrImage).toBeVisible({ timeout: 10000 });

  let src: string | null = null;
  for (let i = 0; i < 20; i++) {
    src = await qrImage.getAttribute('src');
    if (src?.startsWith('data:image/png;base64')) break;
    await new Promise(r => setTimeout(r, 500));
  }
  if (!src) throw new Error('QR code src is not a valid base64 image');


  const base64 = src.split(',')[1];
  const imageBuffer = Buffer.from(base64, 'base64');

  // Gunakan sharp untuk ambil pixel data
  const sharpImage = sharp(imageBuffer);
  const { data, info } = await sharpImage
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Decode pakai jsQR
  const qr = jsQR(new Uint8ClampedArray(data), info.width, info.height);
  if (!qr || !qr.data) {
    throw new Error('QR decode failed or result is empty');
  }

  expect(qr.data).toMatch(/^https:\/\/privy\.test-app\.link\/[a-zA-Z0-9]+$/);

  //
  //  TEST OPEN PRIVY APP
  //
  const openAppButton = page.locator('button:has-text("Open Privy App")');
  await expect(openAppButton).toBeVisible({ timeout: 10000 });

  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    openAppButton.click(),
  ]);

  await newPage.waitForLoadState('load');
  const newUrl = newPage.url();

  if (!newUrl.includes('https://play.google.com')) {
    throw new Error(`Expected to be redirected to branch.io fallback, but got: ${newUrl}`);
  }
});
