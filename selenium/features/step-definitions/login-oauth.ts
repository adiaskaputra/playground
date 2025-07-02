import { Given, When, Then, AfterAll } from '@cucumber/cucumber';
import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai'; // gunakan chai untuk assertion
import dotenv from 'dotenv';
dotenv.config();

let driver: WebDriver;
const headless = process.env.HEADLESS === 'true';
const baseUrl = process.env.BASE_URL || '';

Given('I am on the login page', { timeout: 20000 }, async () => {
  driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(
      headless
        ? require('selenium-webdriver/chrome').Options().headless()
        : new (require('selenium-webdriver/chrome').Options)()
    )
    .build();

  await driver.get(baseUrl);
});

When('I click the login button', { timeout: 20000 }, async () => {
  const loginButton = await driver.wait(
    until.elementLocated(By.css('[data-e2eid="btn-login"]')),
    10000
  );
  await driver.wait(until.elementIsVisible(loginButton), 10000);
  await driver.wait(until.elementIsEnabled(loginButton), 10000);
  await loginButton.click();
});

Then('I should be redirected to the OAuth login page', async () => {
  // Tunggu sampai URL berubah dan mengandung oauth2
  await driver.wait(async () => {
    const currentUrl = await driver.getCurrentUrl();
    return currentUrl.includes('privypass-oauth2-landing-web-app');
  }, 10000);

  const url = await driver.getCurrentUrl();
  console.log('[DEBUG] Final URL:', url);

  expect(url).to.include('response_type=code');
  expect(url).to.include('redirect_uri=');
  expect(url).to.include('client_id=');
});

Then('the URL should contain {string}', async (param: string) => {
  const url = await driver.getCurrentUrl();
  expect(url).to.include(param);
});

AfterAll(async () => {
  if (driver) {
    await driver.quit();
  }
});
