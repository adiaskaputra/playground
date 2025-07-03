import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Browser, chromium, Page } from 'playwright';
import dotenv from 'dotenv';
dotenv.config();

const headless = process.env.HEADLESS === 'true';
const baseUrl = process.env.INVALID_EXPIRED_URL || '';

let browser: Browser;
let page: Page;

Given('I open an expired URL', async () => {
  browser = await chromium.launch({ headless });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto(baseUrl);
});

Then('I should see "Your application has expired" in the title', async function () {
  const title = page.locator('.content__text__title')
  await expect(title).toHaveText("Your application has expired")
})
