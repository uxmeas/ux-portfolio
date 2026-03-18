import { test, expect } from '@playwright/test';

test.describe('uxmeas.com contact form', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the Netlify Function so no real Resend calls happen
    await page.route('**/.netlify/functions/contact', async (route) => {
      const request = route.request();
      const body = JSON.parse(request.postData() || '{}');

      // Validate the request has expected fields
      if (!body.name || !body.email || !body.message) {
        await route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({ success: false, errors: { _form: 'Missing fields' } }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto('/#inquiry');
  });

  test('form is visible and has required fields', async ({ page }) => {
    await expect(page.locator('#inquiryForm')).toBeVisible();
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#need')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
    await expect(page.locator('.form-submit')).toBeVisible();
  });

  test('submits successfully and shows confirmation', async ({ page }) => {
    await page.locator('#name').fill('Test User');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#need').selectOption('website');
    await page.locator('#message').fill('This is a test message for the contact form.');

    await page.locator('.form-submit').click();

    // Form should hide, success message should show
    await expect(page.locator('#inquiryForm')).toBeHidden({ timeout: 5000 });
    await expect(page.locator('#formSuccess')).toBeVisible();
    await expect(page.locator('#formSuccess')).toContainText('Message sent');
  });

  test('sends correct payload to function', async ({ page }) => {
    let capturedPayload: Record<string, unknown> = {};

    await page.route('**/.netlify/functions/contact', async (route) => {
      capturedPayload = JSON.parse(route.request().postData() || '{}');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.locator('#name').fill('Pheak Meas');
    await page.locator('#email').fill('hello@mzmlabs.com');
    await page.locator('#need').selectOption('brand-website');
    await page.locator('#message').fill('Testing the payload structure end to end.');

    await page.locator('.form-submit').click();
    await expect(page.locator('#formSuccess')).toBeVisible({ timeout: 5000 });

    expect(capturedPayload.name).toBe('Pheak Meas');
    expect(capturedPayload.email).toBe('hello@mzmlabs.com');
    expect(capturedPayload.need).toBe('brand-website');
    expect(capturedPayload.message).toBe('Testing the payload structure end to end.');
    expect(capturedPayload.honeypot).toBe('');
  });

  test('honeypot field blocks spam submissions', async ({ page }) => {
    // Fill honeypot field (hidden from real users)
    await page.locator('[name="website"]').fill('spam-value', { force: true });
    await page.locator('#name').fill('Spammer');
    await page.locator('#email').fill('spam@spam.com');
    await page.locator('#need').selectOption('website');
    await page.locator('#message').fill('Buy cheap products now!!!!');

    // Honeypot check happens client-side before fetch
    await page.locator('.form-submit').click();

    // Form should NOT submit (honeypot caught client-side)
    await expect(page.locator('#inquiryForm')).toBeVisible();
  });

  test('button shows loading state during submission', async ({ page }) => {
    await page.route('**/.netlify/functions/contact', async (route) => {
      // Delay response to observe loading state
      await new Promise((r) => setTimeout(r, 500));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.locator('#name').fill('Test User');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#need').selectOption('other');
    await page.locator('#message').fill('Testing the loading state of the button.');

    await page.locator('.form-submit').click();

    // Button should show "Sending..." and be disabled
    await expect(page.locator('.form-submit')).toHaveText('Sending...');
    await expect(page.locator('.form-submit')).toBeDisabled();

    // After response, success shows
    await expect(page.locator('#formSuccess')).toBeVisible({ timeout: 5000 });
  });
});
