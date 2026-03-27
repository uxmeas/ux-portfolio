import { test, expect } from '@playwright/test';

test.describe('uxmeas.com contact form', () => {

  test('form is visible and has required fields', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('#contactForm')).toBeVisible();
    await expect(page.locator('#contactName')).toBeVisible();
    await expect(page.locator('#contactEmail')).toBeVisible();
    await expect(page.locator('#contactMessage')).toBeVisible();
    await expect(page.locator('.contact-submit')).toBeVisible();
  });

  test('honeypot field exists and is hidden from users', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    // Honeypot field should exist (Netlify catches spam server-side)
    const honeypot = page.locator('[name="bot-field"]');
    await expect(honeypot).toBeAttached();
    await expect(honeypot).not.toBeVisible();
    // netlify-honeypot attribute should reference the field
    await expect(page.locator('#contactForm')).toHaveAttribute('netlify-honeypot', 'bot-field');
  });

  test('submits successfully and shows confirmation', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForSelector('#contactForm', { state: 'visible' });

    // Intercept POST only — must be set up before clicking submit
    await page.route('/', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({ status: 200, contentType: 'text/html', body: '<html></html>' });
      } else {
        await route.continue();
      }
    });

    await page.locator('#contactName').fill('Test User');
    await page.locator('#contactEmail').fill('test@example.com');
    await page.locator('#contactMessage').fill('This is a test message for the contact form.');
    await page.locator('.contact-submit').click();

    await expect(page.locator('#contactForm')).toBeHidden({ timeout: 5000 });
    await expect(page.locator('#contactSuccess')).toBeVisible();
  });

  test('sends correct payload to endpoint', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForSelector('#contactForm', { state: 'visible' });

    let capturedBody = '';
    await page.route('/', async (route) => {
      if (route.request().method() === 'POST') {
        capturedBody = route.request().postData() || '';
        await route.fulfill({ status: 200, contentType: 'text/html', body: '<html></html>' });
      } else {
        await route.continue();
      }
    });

    await page.locator('#contactName').fill('Pheak Meas');
    await page.locator('#contactEmail').fill('hello@mzmlabs.com');
    await page.locator('#contactMessage').fill('Testing the payload structure end to end.');
    await page.locator('.contact-submit').click();

    await expect(page.locator('#contactSuccess')).toBeVisible({ timeout: 5000 });

    const params = new URLSearchParams(capturedBody);
    expect(params.get('name')).toBe('Pheak Meas');
    expect(params.get('email')).toBe('hello@mzmlabs.com');
    expect(params.get('message')).toBe('Testing the payload structure end to end.');
  });

  test('button shows loading state during submission', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForSelector('#contactForm', { state: 'visible' });

    await page.route('/', async (route) => {
      if (route.request().method() === 'POST') {
        await new Promise((r) => setTimeout(r, 500));
        await route.fulfill({ status: 200, contentType: 'text/html', body: '<html></html>' });
      } else {
        await route.continue();
      }
    });

    await page.locator('#contactName').fill('Test User');
    await page.locator('#contactEmail').fill('test@example.com');
    await page.locator('#contactMessage').fill('Testing the loading state of the button.');

    await page.locator('.contact-submit').click();

    await expect(page.locator('.contact-submit')).toHaveText('Sending...', { timeout: 2000 });
    await expect(page.locator('.contact-submit')).toBeDisabled();
    await expect(page.locator('#contactSuccess')).toBeVisible({ timeout: 5000 });
  });
});
