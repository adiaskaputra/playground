import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Browser, Page, chromium } from 'playwright';
import { decodeQrImageBase64 } from '../../helpers/decodeQR';
import dotenv from 'dotenv';
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


Then('I should see "Redirecting you to complete your data sharing" in the title', { timeout: 20000 }, async function () {
  const title = page.locator('.content__title');
  await expect(title).toBeVisible({ timeout: 10000 });
  await expect(title).toHaveText('Redirecting you to complete your data sharing');
});

Then('I should see the QR code with valid deeplink branch.io', { timeout: 20000 }, async function () {
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

let newPage: Page | null = null;
let openAppButton: ReturnType<Page['locator']>; // Locator tombol global


Then('I should see the button Open Privy App', { timeout: 20000 }, async function () {
  openAppButton = page.locator('button:has-text("Open Privy App")');
  await expect(openAppButton).toBeVisible({ timeout: 10000 });
});

When('I click the button Open Privy App', async () => {
  if (!openAppButton) {
    openAppButton = page.locator('button:has-text("Open Privy App")');
  }

  const [popup] = await Promise.all([
    page.context().waitForEvent('page'),
    openAppButton.click(),
  ]);

  newPage = popup;
});


Then('I should see the the fallback branch.io playstore or appstore', { timeout: 20000 }, async function () {
  if (!newPage) throw new Error('New tab was not opened');

  await newPage.waitForLoadState('load');
  const newUrl = newPage.url();

  if (!newUrl.includes('https://play.google.com') && !newUrl.includes('https://apps.apple.com')) {
    throw new Error(`Expected fallback to Play Store or App Store, but got: ${newUrl}`);
  }
});

