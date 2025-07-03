import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Browser, chromium, Page } from 'playwright';
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

Then('I should see the QR code with the branch.io link', async function () {
  const title = page.locator('.content__title')
  await expect(title).toBeVisible({ timeout: 10000 })
  await expect(title).toHaveText("Download and Confirm your application via Privy app")
})
