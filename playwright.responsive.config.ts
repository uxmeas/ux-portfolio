import { defineConfig } from '@playwright/test';

/**
 * Parallel Playwright config for responsive + nav-scroll E2E.
 * Targets the static portfolio served by `python3 -m http.server 8000` from repo root.
 * Does NOT spawn a webServer — assumes the python server is already running.
 *
 * Run: npx playwright test --config=playwright.responsive.config.ts
 */
export default defineConfig({
  testDir: './tests/e2e',
  testMatch: 'responsive-nav-insights.spec.ts',
  timeout: 30_000,
  retries: 0,
  workers: 4,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report-responsive' }]],
  use: {
    baseURL: 'http://localhost:8000',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  // No webServer — assumes python3 -m http.server 8000 is already running at repo root
});
