import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Page, chromium } from 'playwright';
import jsQR from 'jsqr'; // optional: use QR decoding library
import fetch from 'node-fetch'; // for QR image decoding if needed
import { decodeQRFromDataUrl } from './utils/decodeQR';

let page: Page;
let qrData: string;

Given('I open the landing page', async function () {
  const browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto('https://your-landing-page-url.com');
});

Then('I should see a QR code', async function () {
  const qr = await page.locator('img.qr-code'); // adjust selector
  await expect(qr).toBeVisible();
});

Then('I should see a deep link button', async function () {
  const button = await page.locator('button.deep-link'); // adjust selector
  await expect(button).toBeVisible();
});

When('I click the deep link button', async function () {
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'), // assuming opens in new tab
    page.click('button.deep-link'),
  ]);
  page = newPage;
});

Then('I should be redirected to the deeplink URL', async function () {
  await page.waitForLoadState('load');
  const url = page.url();
  expect(url).toContain('https://your-branchio-deeplink');
});

When('I extract the QR code image', async function () {
  const qrElement = await page.locator('img.qr-code');
  const qrSrc = await qrElement.getAttribute('src');

  if (!qrSrc) throw new Error('QR src not found');

  qrData = await decodeQRFromDataUrl(qrSrc);
});

Then('the QR code should contain the deeplink URL', async function () {
  expect(qrData).toContain('https://your-branchio-deeplink');
});
