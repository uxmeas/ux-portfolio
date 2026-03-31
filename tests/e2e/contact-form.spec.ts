import { test, expect } from '@playwright/test';

test.describe('uxmeas.com contact section', () => {

  test('contact section is visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#contact');
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('GET IN TOUCH button exists with obfuscated email', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('.btn-primary[data-u][data-d]');
    await expect(btn).toBeVisible();
    await expect(btn).toHaveText('GET IN TOUCH');
    // Email must NOT be in the href before click
    const href = await btn.getAttribute('href');
    expect(href).toBe('#');
  });

  test('email is not exposed in HTML source', async ({ page }) => {
    await page.goto('/');
    const html = await page.content();
    // Raw email should never appear in source
    expect(html).not.toContain('hello@uxmeas.com');
    // But obfuscation attributes should exist
    expect(html).toContain('data-u="hello"');
    expect(html).toContain('data-d="uxmeas.com"');
  });

  test('GET IN TOUCH assembles mailto on click', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('.btn-primary[data-u][data-d]');
    // Click and check the href was assembled
    await btn.click();
    const href = await btn.getAttribute('href');
    expect(href).toContain('mailto:hello@uxmeas.com');
    expect(href).toContain('subject=Portfolio');
  });

  test('VIEW LINKEDIN button links correctly', async ({ page }) => {
    await page.goto('/');
    const linkedin = page.locator('.contact-ctas .btn-outline');
    await expect(linkedin).toBeVisible();
    await expect(linkedin).toHaveText('VIEW LINKEDIN');
    const href = await linkedin.getAttribute('href');
    expect(href).toContain('linkedin.com/in/uxmeas');
  });

  test('no form elements exist on page', async ({ page }) => {
    await page.goto('/');
    // Form was intentionally removed — verify it stays gone
    await expect(page.locator('#contactForm')).toHaveCount(0);
    await expect(page.locator('.contact-submit')).toHaveCount(0);
  });
});
