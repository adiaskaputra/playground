import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Browser, chromium, Page } from 'playwright';
import { decodeQrImageBase64 } from '../../helpers/decodeQR';
import dotenv from 'dotenv';
dotenv.config();

const headless = process.env.HEADLESS === 'true';
const baseUrl = process.env.VALID_LANDING_URL || '';

let browser: Browser;
let page: Page;

Given('I open an valid landing URL', { timeout: 10000 }, async () => {
  browser = await chromium.launch({ headless });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto(baseUrl);
});

Then('I should see "Download and Confirm your application via Privy app" in the title', { timeout: 20000 }, async function () {
  const title = page.locator('.content__title');
  await expect(title).toBeVisible({ timeout: 10000 });
  await expect(title).toHaveText('Download and Confirm your application via Privy app');
});


Then('I should see the QR code with valid deeplink', { timeout: 20000 }, async function () {
  const qrImage = page.locator('[alt="img qr"]');
  await expect(qrImage).toBeVisible({ timeout: 10000 });

  let src: string | null = null;
  for (let i = 0; i < 20; i++) {
    src = await qrImage.getAttribute('src');
    if (src?.startsWith('data:image/png;base64')) break;
    await new Promise(r => setTimeout(r, 500));
  }
  if (!src) throw new Error('QR code src is not a valid base64 image');

  const qrData = await decodeQrImageBase64(src);
  expect(qrData).toMatch(/^https:\/\/privy\.test-app\.link\/[a-zA-Z0-9]+$/);
});
