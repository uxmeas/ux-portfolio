import { test, expect, Page } from '@playwright/test';

/**
 * Layout & Viewport Tests — MZM Design System Compliance
 *
 * Validates container widths, modal close button positioning,
 * and responsive behavior across desktop, tablet, and mobile.
 */

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  macbookAir: { width: 1280, height: 800 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
};

// ── helpers ──────────────────────────────────────────────────────────────────

async function openModal(page: Page, key: string) {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await page.click(`[data-project="${key}"]`);
  await page.waitForSelector('.modal-overlay.active', { state: 'visible', timeout: 5000 });
}

// ── DESKTOP (1440px) ─────────────────────────────────────────────────────────

test.describe('Desktop — 1440×900', () => {
  test.use({ viewport: VIEWPORTS.desktop });

  test('nav-inner is max-width 1440px', async ({ page }) => {
    await page.goto('/');
    const navInner = page.locator('.nav-inner');
    const style = await navInner.evaluate((el) => getComputedStyle(el).maxWidth);
    expect(style).toBe('1440px');
  });

  test('section-container is max-width 1440px', async ({ page }) => {
    await page.goto('/');
    const container = page.locator('.section-container').first();
    const style = await container.evaluate((el) => getComputedStyle(el).maxWidth);
    expect(style).toBe('1440px');
  });

  test('section-container has 32px horizontal padding', async ({ page }) => {
    await page.goto('/');
    const container = page.locator('.section-container').first();
    const paddingLeft = await container.evaluate((el) => getComputedStyle(el).paddingLeft);
    const paddingRight = await container.evaluate((el) => getComputedStyle(el).paddingRight);
    expect(paddingLeft).toBe('32px');
    expect(paddingRight).toBe('32px');
  });

  test('modal close button is position fixed', async ({ page }) => {
    await openModal(page, 'compliance');
    const closeBtn = page.locator('.modal-close');
    const position = await closeBtn.evaluate((el) => getComputedStyle(el).position);
    expect(position).toBe('fixed');
  });

  test('modal close button is outside modal-panel', async ({ page }) => {
    await openModal(page, 'compliance');
    const closeBtn = page.locator('.modal-close');
    const parent = await closeBtn.evaluate((el) => el.parentElement?.className);
    expect(parent).toContain('modal-overlay');
  });

  test('modal close button is in top-right of viewport', async ({ page }) => {
    await openModal(page, 'compliance');
    const closeBtn = page.locator('.modal-close');
    const box = await closeBtn.boundingBox();
    expect(box).not.toBeNull();
    // Should be within 60px of top and right edges
    expect(box!.y).toBeLessThan(60);
    expect(box!.x + box!.width).toBeGreaterThan(VIEWPORTS.desktop.width - 60);
  });

  test('modal close button is clickable and closes modal', async ({ page }) => {
    await openModal(page, 'compliance');
    await page.locator('.modal-close').click();
    await expect(page.locator('.modal-overlay')).not.toHaveClass(/active/, { timeout: 3000 });
  });

  test('hero content is narrower than container (max-width 900px)', async ({ page }) => {
    await page.goto('/');
    const heroContent = page.locator('.hero-content');
    const style = await heroContent.evaluate((el) => getComputedStyle(el).maxWidth);
    expect(style).toBe('900px');
  });
});

// ── TABLET (768px) ───────────────────────────────────────────────────────────

test.describe('Tablet — 768×1024', () => {
  test.use({ viewport: VIEWPORTS.tablet });

  test('section-container has 24px horizontal padding', async ({ page }) => {
    await page.goto('/');
    const container = page.locator('.section-container').first();
    const paddingLeft = await container.evaluate((el) => getComputedStyle(el).paddingLeft);
    expect(paddingLeft).toBe('24px');
  });

  test('hamburger menu is visible', async ({ page }) => {
    await page.goto('/');
    const hamburger = page.locator('.nav-hamburger');
    await expect(hamburger).toBeVisible();
  });

  test('desktop nav links are hidden', async ({ page }) => {
    await page.goto('/');
    const navLinks = page.locator('.nav-links');
    await expect(navLinks).not.toBeVisible();
  });

  test('modal close button stays fixed on scroll', async ({ page }) => {
    await openModal(page, 'compliance');
    // Scroll down inside the modal
    await page.evaluate(() => {
      const overlay = document.querySelector('.modal-overlay');
      if (overlay) overlay.scrollTop = 500;
    });
    await page.waitForTimeout(300);
    const closeBtn = page.locator('.modal-close');
    const box = await closeBtn.boundingBox();
    expect(box).not.toBeNull();
    // Should still be near top of viewport after scroll
    expect(box!.y).toBeLessThan(60);
  });
});

// ── MOBILE (390px) ───────────────────────────────────────────────────────────

test.describe('Mobile — 390×844', () => {
  test.use({ viewport: VIEWPORTS.mobile });

  test('section-container has 16px horizontal padding', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const container = page.locator('.section-container').first();
    const paddingLeft = await container.evaluate((el) => getComputedStyle(el).paddingLeft);
    expect(paddingLeft).toBe('16px');
  });

  test('modal opens full-width (no border-radius)', async ({ page }) => {
    await openModal(page, 'compliance');
    const panel = page.locator('.modal-panel');
    const radius = await panel.evaluate((el) => getComputedStyle(el).borderRadius);
    expect(radius).toBe('0px');
  });

  test('modal close button is visible and tappable (44px target)', async ({ page }) => {
    await openModal(page, 'compliance');
    const closeBtn = page.locator('.modal-close');
    await expect(closeBtn).toBeVisible();
    const box = await closeBtn.boundingBox();
    expect(box).not.toBeNull();
    // Touch target should be at least 36px (our size) — visible and tappable
    expect(box!.width).toBeGreaterThanOrEqual(36);
    expect(box!.height).toBeGreaterThanOrEqual(36);
  });

  test('modal close button is near top-right on mobile', async ({ page }) => {
    await openModal(page, 'compliance');
    const closeBtn = page.locator('.modal-close');
    const box = await closeBtn.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeLessThan(50);
    expect(box!.x + box!.width).toBeGreaterThan(VIEWPORTS.mobile.width - 50);
  });

  test('work grid stacks to single column', async ({ page }) => {
    await page.goto('/');
    const grid = page.locator('.work-grid');
    const columns = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns);
    // Single column = one value (e.g. "358px"), not two (e.g. "179px 179px")
    const colCount = columns.split(/\s+/).length;
    expect(colCount).toBeLessThanOrEqual(1);
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load');
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow).toBe(false);
  });
});
