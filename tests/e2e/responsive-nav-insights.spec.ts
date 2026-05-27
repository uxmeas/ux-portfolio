/**
 * Responsive E2E: nav consistency + scroll behavior + Insights link on every nav-bearing page,
 * across 4 viewports (mobile, tablet, desktop, wide).
 *
 * Tests the 2026-05-26 portfolio-wide nav update + new /insights/ Astro section:
 * - Insights nav link present and clickable on every page
 * - Wordmark renders correctly per viewport (mobile shows .wordmark__mark, desktop shows .wordmark__svg)
 * - nav-scroll.js behavior: scroll down hides nav, scroll up reveals, top of page always visible
 * - No critical console errors
 * - Tracking scripts loaded (GA4 + Clarity references in <head>)
 *
 * Per `_handoff/chloe-uxmeas-insights-baseline.md` uxmeas-specific checks A + B.
 */

import { test, expect, Page } from '@playwright/test';

type Viewport = { name: string; width: number; height: number; isMobile: boolean };

const VIEWPORTS: Viewport[] = [
  { name: 'mobile-375',  width: 375,  height: 667,  isMobile: true },
  { name: 'tablet-768',  width: 768,  height: 1024, isMobile: false },
  { name: 'desktop-1280', width: 1280, height: 800,  isMobile: false },
  { name: 'wide-1920',    width: 1920, height: 1080, isMobile: false },
];

// Canonical-pattern pages (use .nav-links + .wordmark inline SVG)
const CANONICAL_PAGES = [
  { path: '/',                     name: 'index' },
  { path: '/fuzehq.html',          name: 'fuzehq' },
  { path: '/katipult.html',        name: 'katipult' },
  { path: '/docs-to-design.html',  name: 'docs-to-design' },
  { path: '/compliance-ux.html',   name: 'compliance-ux' },
  { path: '/insights/',            name: 'insights-index' },
];

// Legacy BEM-pattern pages (use .nav__brand + .nav__link)
const BEM_PAGES = [
  { path: '/404.html',     name: '404' },
  { path: '/cookies.html', name: 'cookies' },
  { path: '/privacy.html', name: 'privacy' },
];

const ALL_PAGES = [...CANONICAL_PAGES, ...BEM_PAGES];

// Console-error filter — ignore known external noise.
function isCriticalConsoleError(text: string): boolean {
  const ignore = [
    /favicon\.ico.*404/i,
    /googletagmanager\.com/i,    // blocked when no consent given
    /google-analytics\.com/i,
    /clarity\.ms/i,
    /cookie/i,
    /third-party cookie/i,
    /lucide/i,                    // CDN may be slow in headless
    /preload/i,
    /sourcemap/i,
  ];
  return !ignore.some(re => re.test(text));
}

async function collectConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error' && isCriticalConsoleError(msg.text())) {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', err => errors.push(err.message));
  return errors;
}

for (const vp of VIEWPORTS) {
  test.describe(`@${vp.name} (${vp.width}×${vp.height})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const p of ALL_PAGES) {
      test(`${p.name}: loads, nav consistent, scroll-aware`, async ({ page }) => {
        const errors = await collectConsoleErrors(page);

        // 1. Load page
        const response = await page.goto(p.path, { waitUntil: 'domcontentloaded' });
        expect(response?.status(), `${p.path} HTTP status`).toBeLessThan(400);

        // 2. Nav exists and is visible
        const nav = page.locator('.nav, header.nav, nav.nav').first();
        await expect(nav, `${p.name} nav element exists`).toBeVisible();

        // 3. Insights link present
        const insightsLink = page.locator('a[href="/insights/"], a[href="/insights"]').first();
        await expect(insightsLink, `${p.name} has Insights link`).toBeVisible();

        // 4. Wordmark / brand visible
        //    Canonical pages: .wordmark with inline SVG (responsive)
        //    BEM pages: .nav__brand with <img>
        const isCanonical = CANONICAL_PAGES.some(c => c.path === p.path);
        if (isCanonical) {
          const wordmark = page.locator('.wordmark').first();
          await expect(wordmark, `${p.name} .wordmark exists`).toBeAttached();
          if (vp.isMobile) {
            // Mobile shows mark only
            const mark = page.locator('.wordmark__mark').first();
            await expect(mark, `${p.name} mobile .wordmark__mark visible`).toBeVisible();
          } else {
            // Desktop shows full lockup
            const svg = page.locator('.wordmark__svg').first();
            await expect(svg, `${p.name} desktop .wordmark__svg visible`).toBeVisible();
          }
        } else {
          const brand = page.locator('.nav__brand').first();
          await expect(brand, `${p.name} BEM .nav__brand exists`).toBeAttached();
        }

        // 5. Theme toggle exists (canonical pages only — BEM pages don't have one)
        if (isCanonical) {
          const toggle = page.locator('.theme-toggle').first();
          await expect(toggle, `${p.name} .theme-toggle exists`).toBeAttached();
        }

        // 6. nav-scroll.js loaded — query HTML source via locator on a script-attr selector
        //    Use evaluate() so we see all script tags in the parsed DOM, not just initial document.
        const navScrollPresent = await page.evaluate(() =>
          Array.from(document.querySelectorAll('script')).some(s =>
            (s as HTMLScriptElement).src.includes('nav-scroll.js'),
          ),
        );
        expect(navScrollPresent, `${p.name} loads nav-scroll.js`).toBe(true);

        // 7. Tracking script reference — at least ONE of ga4-bootstrap / googletagmanager / compliance / main.js
        //    (Different pages route GA4 through different loaders. 404 routes via main.js + no GA4 is acceptable.)
        //    This is a soft check — the load-bearing GA4 verification is Chloe's Tier 3 baseline.
        const trackingPresent = await page.evaluate(() =>
          Array.from(document.querySelectorAll('script')).some(s => {
            const src = (s as HTMLScriptElement).src;
            return /ga4-bootstrap|googletagmanager|compliance|main\.js/.test(src);
          }),
        );
        expect(trackingPresent, `${p.name} has at least one tracking-or-utility script reference`).toBe(true);

        // 8. Scroll behavior — only on pages tall enough to scroll
        const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
        const navHeight = await nav.evaluate(el => (el as HTMLElement).offsetHeight);

        if (bodyHeight > vp.height + navHeight + 100) {
          // Scroll down past nav height
          await page.evaluate((y) => window.scrollTo(0, y), navHeight + 200);
          await page.waitForTimeout(300); // let rAF + nav-scroll process

          const transformAfterDown = await nav.evaluate(el => getComputedStyle(el).transform);
          // Expect translateY negative — matrix(1, 0, 0, 1, 0, -N) where N>0
          const yAfterDown = parseTransformY(transformAfterDown);
          expect(yAfterDown, `${p.name} ${vp.name} nav hides on scroll-down (transform=${transformAfterDown})`).toBeLessThan(0);

          // Scroll back to top
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.waitForTimeout(300);

          const transformAtTop = await nav.evaluate(el => getComputedStyle(el).transform);
          const yAtTop = parseTransformY(transformAtTop);
          expect(yAtTop, `${p.name} ${vp.name} nav visible at top (transform=${transformAtTop})`).toBe(0);
        }

        // 9. No critical console errors collected
        expect(errors, `${p.name} ${vp.name} no critical console errors`).toEqual([]);
      });
    }
  });
}

// Helper: parse translateY value from a CSS transform matrix() string.
// matrix(a, b, c, d, tx, ty) — we want ty. "none" → 0.
function parseTransformY(t: string): number {
  if (!t || t === 'none') return 0;
  const m = t.match(/^matrix\(([^)]+)\)/);
  if (!m) return 0;
  const parts = m[1].split(',').map(s => parseFloat(s.trim()));
  return parts[5] ?? 0;
}
