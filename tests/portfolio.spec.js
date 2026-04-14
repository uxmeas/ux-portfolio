// MZM-365: Playwright E2E tests for uxmeas portfolio
const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:8081';
const CASE_STUDIES = [
  'compliance-ux', 'dealflow', 'donations-rewards', 'lending',
  'fuzehq', 'multipaste', 'mockupkit', 'docs-to-design',
  'mypick', 'relationsync', 'akmsecure', 'isoblock'
];

test.describe('Homepage', () => {
  test('loads with 200', async ({ page }) => {
    const resp = await page.goto(BASE);
    expect(resp.status()).toBe(200);
  });

  test('has correct title', async ({ page }) => {
    await page.goto(BASE);
    await expect(page).toHaveTitle(/Pheak Meas/);
  });

  test('nav renders with logo', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('.nav__brand img')).toBeVisible();
  });

  test('has 12 project cards', async ({ page }) => {
    await page.goto(BASE);
    const cards = page.locator('.project-card');
    await expect(cards).toHaveCount(12);
  });

  test('project cards link to case studies', async ({ page }) => {
    await page.goto(BASE);
    const firstCard = page.locator('.project-card').first();
    const href = await firstCard.getAttribute('href');
    expect(href).toContain('case-study/');
  });

  test('about section exists', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('#about')).toBeVisible();
  });

  test('email obfuscation works', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForTimeout(500);
    const mailto = page.locator('a[href^="mailto:"]');
    const count = await mailto.count();
    expect(count).toBeGreaterThan(0);
  });

  test('no console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    await page.goto(BASE);
    expect(errors).toHaveLength(0);
  });
});

test.describe('Case Studies', () => {
  for (const slug of CASE_STUDIES) {
    test(`${slug} loads with 200`, async ({ page }) => {
      const resp = await page.goto(`${BASE}/case-study/${slug}/`);
      expect(resp.status()).toBe(200);
    });
  }

  test('compliance-ux has nav + breadcrumbs', async ({ page }) => {
    await page.goto(`${BASE}/case-study/compliance-ux/`);
    await expect(page.locator('.nav')).toBeVisible();
    await page.waitForTimeout(500);
    const breadcrumb = page.locator('.breadcrumb');
    await expect(breadcrumb).toBeVisible();
  });

  test('case study has hero section', async ({ page }) => {
    await page.goto(`${BASE}/case-study/compliance-ux/`);
    await expect(page.locator('.cs-hero')).toBeVisible();
    await expect(page.locator('.cs-hero__title')).toBeVisible();
  });

  test('case study has CTA footer', async ({ page }) => {
    await page.goto(`${BASE}/case-study/compliance-ux/`);
    await expect(page.locator('.cs-cta')).toBeVisible();
  });

  test('no console errors on case study', async ({ page }) => {
    const errors = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    await page.goto(`${BASE}/case-study/dealflow/`);
    expect(errors).toHaveLength(0);
  });
});

test.describe('Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('no horizontal scroll on homepage', async ({ page }) => {
    await page.goto(BASE);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test('no horizontal scroll on case study', async ({ page }) => {
    await page.goto(`${BASE}/case-study/compliance-ux/`);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });

  test('cards stack on mobile', async ({ page }) => {
    await page.goto(BASE);
    const grid = page.locator('.projects__grid');
    const style = await grid.evaluate(el => getComputedStyle(el).gridTemplateColumns);
    expect(style).not.toContain(' ');
  });
});

test.describe('Navigation Flow', () => {
  test('breadcrumb shows correct next case study', async ({ page }) => {
    await page.goto(`${BASE}/case-study/compliance-ux/`);
    await page.waitForTimeout(500);
    const next = page.locator('.breadcrumb__next');
    const text = await next.textContent();
    expect(text).toContain('Deal Management');
  });

  test('last case study links to all projects', async ({ page }) => {
    await page.goto(`${BASE}/case-study/isoblock/`);
    await page.waitForTimeout(500);
    const next = page.locator('.breadcrumb__next');
    const text = await next.textContent();
    expect(text).toContain('All Projects');
  });
});
