import { test, expect } from '@playwright/test';

/**
 * Phone Carousel Tests — Mobile Swipe & Desktop Layout
 *
 * Validates scroll-snap carousel behavior on mobile (≤640px)
 * and standard side-by-side layout on desktop for phone mockups.
 *
 * MZM Labs Design System Token: design-mobile-swipe-pattern.md
 */

const CASE_STUDIES = [
  { name: 'DealFlow', path: '/case-study/dealflow/' },
  { name: 'AKMSecure', path: '/case-study/akmsecure/' },
  { name: 'Compliance UX', path: '/case-study/compliance-ux/' },
];

// ── DESKTOP (1440px) ─────────────────────────────────────────────────────────

test.describe('Desktop — phone mockups side-by-side', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  for (const cs of CASE_STUDIES) {
    test(`${cs.name}: phones are 213px wide`, async ({ page }) => {
      await page.goto(cs.path);
      await page.waitForLoadState('domcontentloaded');
      const phone = page.locator('.device-phone').first();
      const width = await phone.evaluate((el) => getComputedStyle(el).width);
      expect(parseFloat(width)).toBeCloseTo(213, 0);
    });

    test(`${cs.name}: phone-pair is horizontal (not stacked)`, async ({ page }) => {
      await page.goto(cs.path);
      await page.waitForLoadState('domcontentloaded');
      const pair = page.locator('.phone-pair').first();
      const direction = await pair.evaluate((el) => getComputedStyle(el).flexDirection);
      expect(direction).toBe('row');
    });

    test(`${cs.name}: no horizontal scroll on desktop`, async ({ page }) => {
      await page.goto(cs.path);
      await page.waitForLoadState('domcontentloaded');
      const pair = page.locator('.phone-pair').first();
      const overflow = await pair.evaluate((el) => getComputedStyle(el).overflowX);
      // Desktop should not have scroll-snap overflow
      expect(['visible', 'hidden']).toContain(overflow);
    });

    test(`${cs.name}: aspect-ratio 9/19 preserved`, async ({ page }) => {
      await page.goto(cs.path);
      await page.waitForLoadState('domcontentloaded');
      const phone = page.locator('.device-phone').first();
      const ratio = await phone.evaluate((el) => getComputedStyle(el).aspectRatio);
      expect(ratio).toContain('9');
      expect(ratio).toContain('19');
    });
  }
});

// ── MOBILE (390px) — Swipe Carousel ─────────────────────────────────────────

test.describe('Mobile — phone carousel swipe', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const cs of CASE_STUDIES) {
    test(`${cs.name}: phone-pair has horizontal scroll-snap`, async ({ page }) => {
      await page.goto(cs.path);
      await page.waitForLoadState('domcontentloaded');
      const pair = page.locator('.phone-pair').first();
      const snapType = await pair.evaluate((el) => getComputedStyle(el).scrollSnapType);
      expect(snapType).toContain('x');
      expect(snapType).toContain('mandatory');
    });

    test(`${cs.name}: phone-pair has overflow-x auto`, async ({ page }) => {
      await page.goto(cs.path);
      await page.waitForLoadState('domcontentloaded');
      const pair = page.locator('.phone-pair').first();
      const overflow = await pair.evaluate((el) => getComputedStyle(el).overflowX);
      expect(overflow).toBe('auto');
    });

    test(`${cs.name}: phones are 75vw wide (flex-shrink 0)`, async ({ page }) => {
      await page.goto(cs.path);
      await page.waitForLoadState('domcontentloaded');
      const phone = page.locator('.device-phone').first();
      const width = await phone.evaluate((el) => parseFloat(getComputedStyle(el).width));
      const expected = 390 * 0.75; // 75vw = 292.5px
      expect(width).toBeCloseTo(expected, 0);
    });

    test(`${cs.name}: phones have snap-align start`, async ({ page }) => {
      await page.goto(cs.path);
      await page.waitForLoadState('domcontentloaded');
      const phone = page.locator('.device-phone').first();
      const snapAlign = await phone.evaluate((el) => getComputedStyle(el).scrollSnapAlign);
      expect(snapAlign).toBe('start');
    });

    test(`${cs.name}: scroll-padding is 16px`, async ({ page }) => {
      await page.goto(cs.path);
      await page.waitForLoadState('domcontentloaded');
      const pair = page.locator('.phone-pair').first();
      const scrollPadding = await pair.evaluate((el) => getComputedStyle(el).scrollPaddingInline);
      expect(scrollPadding).toBe('16px');
    });

    test(`${cs.name}: scrollbar is hidden`, async ({ page }) => {
      await page.goto(cs.path);
      await page.waitForLoadState('domcontentloaded');
      const pair = page.locator('.phone-pair').first();
      const scrollbarWidth = await pair.evaluate((el) => getComputedStyle(el).scrollbarWidth);
      expect(scrollbarWidth).toBe('none');
    });

    test(`${cs.name}: phone-pair is scrollable (content wider than container)`, async ({ page }) => {
      await page.goto(cs.path);
      await page.waitForLoadState('domcontentloaded');
      // Target phone-pairs with exactly 2 phones (not 5-phone galleries)
      const pairs = page.locator('.phone-pair');
      const count = await pairs.count();
      let found = false;
      for (let i = 0; i < count; i++) {
        const pair = pairs.nth(i);
        const phoneCount = await pair.locator('.device-phone').count();
        if (phoneCount === 2) {
          const isScrollable = await pair.evaluate((el) => el.scrollWidth > el.clientWidth);
          expect(isScrollable).toBe(true);
          found = true;
          break;
        }
      }
      expect(found).toBe(true);
    });

    test(`${cs.name}: first phone is dominant (>70% of container)`, async ({ page }) => {
      await page.goto(cs.path);
      await page.waitForLoadState('domcontentloaded');
      // Target phone-pairs with exactly 2 phones
      const pairs = page.locator('.phone-pair');
      const count = await pairs.count();
      for (let i = 0; i < count; i++) {
        const pair = pairs.nth(i);
        const phoneCount = await pair.locator('.device-phone').count();
        if (phoneCount === 2) {
          const containerWidth = await pair.evaluate((el) => el.clientWidth);
          const phone = pair.locator('.device-phone').first();
          const phoneWidth = await phone.evaluate((el) => parseFloat(getComputedStyle(el).width));
          const ratio = phoneWidth / containerWidth;
          expect(ratio).toBeGreaterThan(0.7);
          break;
        }
      }
    });
  }
});
