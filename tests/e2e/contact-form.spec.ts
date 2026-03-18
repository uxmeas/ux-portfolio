import { test, expect } from '@playwright/test';

test.describe('uxmeas.com contact form', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the Netlify Function so no real Resend calls happen
    await page.route('**/.netlify/functions/contact', async (route) => {
      const request = route.request();
      const body = JSON.parse(request.postData() || '{}');

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

    await page.goto('/#contact');
  });

  test('form is visible and has required fields', async ({ page }) => {
    await expect(page.locator('#contactForm')).toBeVisible();
    await expect(page.locator('#contactName')).toBeVisible();
    await expect(page.locator('#contactEmail')).toBeVisible();
    await expect(page.locator('#contactMessage')).toBeVisible();
    await expect(page.locator('.contact-submit')).toBeVisible();
  });

  test('submits successfully and shows confirmation', async ({ page }) => {
    await page.locator('#contactName').fill('Test User');
    await page.locator('#contactEmail').fill('test@example.com');
    await page.locator('#contactMessage').fill('This is a test message for the contact form.');

    await page.locator('.contact-submit').click();

    await expect(page.locator('#contactForm')).toBeHidden({ timeout: 5000 });
    await expect(page.locator('#contactSuccess')).toBeVisible();
    await expect(page.locator('#contactSuccess')).toContainText('Message sent');
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

    await page.locator('#contactName').fill('Pheak Meas');
    await page.locator('#contactEmail').fill('hello@mzmlabs.com');
    await page.locator('#contactMessage').fill('Testing the payload structure end to end.');

    await page.locator('.contact-submit').click();
    await expect(page.locator('#contactSuccess')).toBeVisible({ timeout: 5000 });

    expect(capturedPayload.name).toBe('Pheak Meas');
    expect(capturedPayload.email).toBe('hello@mzmlabs.com');
    expect(capturedPayload.message).toBe('Testing the payload structure end to end.');
    expect(capturedPayload.honeypot).toBe('');
  });

  test('honeypot field blocks spam submissions', async ({ page }) => {
    // Fill honeypot field (hidden from real users)
    await page.locator('[name="bot-field"]').fill('spam-value', { force: true });
    await page.locator('#contactName').fill('Spammer');
    await page.locator('#contactEmail').fill('spam@spam.com');
    await page.locator('#contactMessage').fill('Buy cheap products now!!!!');

    await page.locator('.contact-submit').click();

    // Form should NOT submit (honeypot caught client-side)
    await expect(page.locator('#contactForm')).toBeVisible();
  });

  test('button shows loading state during submission', async ({ page }) => {
    await page.route('**/.netlify/functions/contact', async (route) => {
      await new Promise((r) => setTimeout(r, 500));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.locator('#contactName').fill('Test User');
    await page.locator('#contactEmail').fill('test@example.com');
    await page.locator('#contactMessage').fill('Testing the loading state of the button.');

    await page.locator('.contact-submit').click();

    await expect(page.locator('.contact-submit')).toHaveText('Sending...');
    await expect(page.locator('.contact-submit')).toBeDisabled();

    await expect(page.locator('#contactSuccess')).toBeVisible({ timeout: 5000 });
  });
});
