import { test, expect } from '@playwright/test';

test.describe('uxmeas.com contact section', () => {

  test('contact section is visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#contact');
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('role discussion CTA is visible and opens email', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: 'Schedule a role discussion' });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute(
      'href',
      'mailto:hello@uxmeas.com?subject=Product%20design%20role',
    );
  });

  test('candidate contact metadata is present', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('UX Meas. Senior Product Designer for complex B2B products.');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /Senior, Staff, Founding Product Designer, and hands-on Product Design Lead roles/,
    );
  });

  test('hero role CTA uses the same contact path', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: /Discuss a product design role/ });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /mailto:hello@uxmeas\.com/);
  });

  test('VIEW LINKEDIN button links correctly', async ({ page }) => {
    await page.goto('/');
    const linkedin = page.getByRole('link', { name: 'LinkedIn' }).first();
    await expect(linkedin).toBeVisible();
    await expect(linkedin).toHaveAttribute('href', 'https://linkedin.com/in/uxmeas');
  });

  test('no form elements exist on page', async ({ page }) => {
    await page.goto('/');
    // Form was intentionally removed — verify it stays gone
    await expect(page.locator('form')).toHaveCount(0);
  });
});
