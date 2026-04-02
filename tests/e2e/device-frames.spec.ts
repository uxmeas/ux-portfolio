import { test, expect, Page } from '@playwright/test';

/**
 * Device Frame Tests — Screenshot fitting inside laptop mockups
 *
 * Validates that dashboard screenshots inside MacBook device frames
 * are fully visible (no clipping) across all target viewports.
 * Covers the hero laptop frame in compliance, dealflow, and akmsecure.
 */

const VIEWPORTS = {
  macbookPro16: { width: 1728, height: 1117 },
  macbookPro14: { width: 1512, height: 982 },
  desktop: { width: 1440, height: 900 },
  macbookAir: { width: 1280, height: 800 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
};

const CASE_STUDIES = ['compliance', 'dealflow', 'akm'];

async function openModal(page: Page, key: string) {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await page.click(`[data-project="${key}"]`);
  await page.waitForSelector('.modal-panel', { state: 'visible', timeout: 5000 });
  await page.waitForSelector('.modal-panel .cs-hero__headline', { state: 'visible', timeout: 8000 });
}

// ── DEVICE FRAME: no clipping at any viewport ───────────────────────────────

for (const [vpName, vpSize] of Object.entries(VIEWPORTS)) {
  test.describe(`Device frames — ${vpName} (${vpSize.width}×${vpSize.height})`, () => {
    test.use({ viewport: vpSize });

    for (const project of CASE_STUDIES) {
      test(`${project}: hero screenshot fits inside device frame`, async ({ page }) => {
        await openModal(page, project);

        const deviceScreen = page.locator('.cs-hero__device-screen');
        const screenImg = page.locator('.cs-hero__screen-img');

        // Both elements should exist
        await expect(deviceScreen).toBeVisible();
        await expect(screenImg).toBeVisible();

        const containerBox = await deviceScreen.boundingBox();
        const imgBox = await screenImg.boundingBox();

        expect(containerBox).not.toBeNull();
        expect(imgBox).not.toBeNull();

        // Image should not exceed container bounds (no overflow clipping)
        // 3px tolerance for subpixel rounding at small viewports
        const tol = 3;
        expect(imgBox!.x).toBeGreaterThanOrEqual(containerBox!.x - tol);
        expect(imgBox!.y).toBeGreaterThanOrEqual(containerBox!.y - tol);
        expect(imgBox!.x + imgBox!.width).toBeLessThanOrEqual(
          containerBox!.x + containerBox!.width + tol
        );
        expect(imgBox!.y + imgBox!.height).toBeLessThanOrEqual(
          containerBox!.y + containerBox!.height + tol
        );

        // Container should have positive dimensions
        expect(containerBox!.width).toBeGreaterThan(50);
        expect(containerBox!.height).toBeGreaterThan(50);
      });

      test(`${project}: device frame has no horizontal overflow`, async ({ page }) => {
        await openModal(page, project);

        const hasOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        expect(hasOverflow).toBe(false);
      });
    }
  });
}

// ── DEVICE FRAME: proportional scaling ──────────────────────────────────────

test.describe('Device frame proportional scaling', () => {
  test.use({ viewport: VIEWPORTS.macbookAir });

  for (const project of CASE_STUDIES) {
    test(`${project}: screen container uses same % at MacBook Air as desktop`, async ({ page }) => {
      await openModal(page, project);

      const deviceScreen = page.locator('.cs-hero__device-screen');
      const device = page.locator('.cs-hero__device');

      const screenBox = await deviceScreen.boundingBox();
      const deviceBox = await device.boundingBox();

      expect(screenBox).not.toBeNull();
      expect(deviceBox).not.toBeNull();

      // Screen should be roughly 76% of device width (our pure % value)
      const widthRatio = screenBox!.width / deviceBox!.width;
      expect(widthRatio).toBeGreaterThan(0.70);
      expect(widthRatio).toBeLessThan(0.82);

      // Screen should be roughly 81% of device height
      const heightRatio = screenBox!.height / deviceBox!.height;
      expect(heightRatio).toBeGreaterThan(0.75);
      expect(heightRatio).toBeLessThan(0.87);
    });
  }
});
