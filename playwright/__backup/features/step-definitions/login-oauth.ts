import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Browser, chromium, Page } from 'playwright';
import dotenv from 'dotenv';
dotenv.config();

const headless = process.env.HEADLESS === 'true';
const baseUrl = process.env.BASE_URL || '';

let browser: Browser;
let page: Page;

Given('I am on the login page', async () => {
  browser = await chromium.launch({ headless });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto(baseUrl);
});

When('I click the login button', async () => {
  await page.click('[data-e2eid="btn-login"]');
});

Then('I should be redirected to the OAuth login page', async () => {
  // Tunggu maksimal 10 detik sampai URL mengandung domain OAuth
  for (let i = 0; i < 20; i++) {
    const currentUrl = page.url();
    if (currentUrl.includes('privypass-oauth2-landing-web-app')) break;
    await new Promise((r) => setTimeout(r, 500));
  }

  const url = page.url();
  console.log('[DEBUG] Final URL:', url);
  expect(url).toContain('response_type=code');
  expect(url).toContain('redirect_uri=');
  expect(url).toContain('client_id=');
});

Then('the URL should contain {string}', async (param: string) => {
  const url = page.url();
  expect(url).toContain(param);
});
