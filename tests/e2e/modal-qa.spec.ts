import { test, expect } from '@playwright/test';

// ── helpers ──────────────────────────────────────────────────────────────────

async function openModal(page: any, key: string) {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await page.click(`[data-project="${key}"]`);
  await page.waitForSelector('.modal-panel', { state: 'visible', timeout: 5000 });
}

async function closeModal(page: any) {
  await page.keyboard.press('Escape');
  await page.waitForSelector('.modal-overlay:not(.active)', { timeout: 3000 }).catch(() => {});
}

// ── COMPLIANCE UX ─────────────────────────────────────────────────────────────

test.describe('Compliance UX modal', () => {

  test('opens and shows correct title', async ({ page }) => {
    await openModal(page, 'compliance');
    await expect(page.locator('.m-hero__title')).toContainText('Compliance UX');
  });

  test('hero stats — no confidential data', async ({ page }) => {
    await openModal(page, 'compliance');
    const heroText = await page.locator('.m-hero__stats').textContent();
    expect(heroText).not.toContain('$220K');
    expect(heroText).not.toContain('MRR');
    expect(heroText).not.toContain('95–99%');
    expect(heroText).not.toContain('17 active');
  });

  test('industry benchmark labels present on 65% figure', async ({ page }) => {
    await openModal(page, 'compliance');
    const modalText = await page.locator('.modal-panel').textContent();
    expect(modalText).toContain('65%');
    expect(modalText).toContain('Industry benchmark');
  });

  test('"Up from 35%" does not appear', async ({ page }) => {
    await openModal(page, 'compliance');
    const modalText = await page.locator('.modal-panel').textContent();
    expect(modalText).not.toContain('Up from 35%');
    expect(modalText).not.toContain('Up from 35');
  });

  test('"Banking Tech" does not appear', async ({ page }) => {
    await openModal(page, 'compliance');
    const modalText = await page.locator('.modal-panel').textContent();
    expect(modalText).not.toContain('Banking Tech');
  });

  test('results section is visible', async ({ page }) => {
    await openModal(page, 'compliance');
    const results = page.locator('.m-results');
    await expect(results).toBeVisible();
  });

  test('all images load without error', async ({ page }) => {
    const failedImages: string[] = [];
    page.on('response', (response) => {
      if (response.request().resourceType() === 'image' && !response.ok()) {
        failedImages.push(response.url());
      }
    });
    await openModal(page, 'compliance');
    await page.waitForTimeout(1500);
    expect(failedImages).toEqual([]);
  });

  test('modal closes on Escape', async ({ page }) => {
    await openModal(page, 'compliance');
    await page.keyboard.press('Escape');
    await expect(page.locator('.modal-overlay')).not.toHaveClass(/active/, { timeout: 3000 });
  });

});

// ── KATIPULT DEALFLOW ─────────────────────────────────────────────────────────

test.describe('Katipult DealFlow modal', () => {

  test('opens and shows correct title', async ({ page }) => {
    await openModal(page, 'dealflow');
    await expect(page.locator('.m-hero__title')).toContainText('DealFlow');
  });

  test('hero stats — no confidential data', async ({ page }) => {
    await openModal(page, 'dealflow');
    const heroText = await page.locator('.m-hero__stats').textContent();
    expect(heroText).not.toContain('$220K');
    expect(heroText).not.toContain('MRR');
    expect(heroText).not.toContain('95–99%');
    expect(heroText).not.toContain('17 active');
    expect(heroText).not.toContain('Q3 2023');
  });

  test('research table is present with 3 columns', async ({ page }) => {
    await openModal(page, 'dealflow');
    const table = page.locator('.modal-panel table');
    await expect(table).toBeVisible();
    const headers = page.locator('.modal-panel table th');
    await expect(headers).toHaveCount(3);
  });

  test('research table has 5 data rows', async ({ page }) => {
    await openModal(page, 'dealflow');
    const rows = page.locator('.modal-panel table tbody tr');
    await expect(rows).toHaveCount(5);
  });

  test('HMW statement is present', async ({ page }) => {
    await openModal(page, 'dealflow');
    const modalText = await page.locator('.modal-panel').textContent();
    expect(modalText).toContain('How might we');
  });

  test('competitor analysis shows 4 cards', async ({ page }) => {
    await openModal(page, 'dealflow');
    const modalText = await page.locator('.modal-panel').textContent();
    expect(modalText).toContain('Carta');
    expect(modalText).toContain('AngelList');
    expect(modalText).toContain('Persona');
    expect(modalText).toContain('SVX');
  });

  test('SVX is not labeled as live or current client', async ({ page }) => {
    await openModal(page, 'dealflow');
    const modalText = await page.locator('.modal-panel').textContent();
    expect(modalText).not.toContain('Live client');
    expect(modalText).not.toContain('live client');
    expect(modalText).not.toContain('Current client');
    expect(modalText).not.toContain('current client');
  });

  test('design decision callouts are present', async ({ page }) => {
    await openModal(page, 'dealflow');
    const modalText = await page.locator('.modal-panel').textContent();
    expect(modalText).toContain('Design Decision');
  });

  test('"Banking Tech" does not appear', async ({ page }) => {
    await openModal(page, 'dealflow');
    const modalText = await page.locator('.modal-panel').textContent();
    expect(modalText).not.toContain('Banking Tech');
  });

  test('no confidential financial data in modal', async ({ page }) => {
    await openModal(page, 'dealflow');
    const modalText = await page.locator('.modal-panel').textContent();
    expect(modalText).not.toContain('$220K');
    expect(modalText).not.toContain('95–99%');
    expect(modalText).not.toContain('Q3 2023');
    expect(modalText).not.toContain('board meeting');
    expect(modalText).not.toContain('17 active');
  });

  test('results section is visible', async ({ page }) => {
    await openModal(page, 'dealflow');
    const results = page.locator('.m-results');
    await expect(results).toBeVisible();
  });

  test('all images load without error', async ({ page }) => {
    const failedImages: string[] = [];
    page.on('response', (response) => {
      if (response.request().resourceType() === 'image' && !response.ok()) {
        failedImages.push(response.url());
      }
    });
    await openModal(page, 'dealflow');
    await page.waitForTimeout(1500);
    expect(failedImages).toEqual([]);
  });

  test('modal closes on Escape', async ({ page }) => {
    await openModal(page, 'dealflow');
    await page.keyboard.press('Escape');
    await expect(page.locator('.modal-overlay')).not.toHaveClass(/active/, { timeout: 3000 });
  });

});
