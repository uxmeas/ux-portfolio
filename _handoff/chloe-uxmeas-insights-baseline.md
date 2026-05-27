# Chloe — uxmeas /insights Tier 3 baseline (dev preview + staging)

**Mission:** Run the tracking-baseline gate on uxmeas's CF Pages dev preview after Pheak pushes `dev`. If GREEN, repeat on staging preview after `dev → staging` promote. Block any promote that fails.

**Per:** `.claude/rules/staging-deploy-checklist.md` #4.5 + `.claude/rules/cloudflare-guardrails.md` R1 + `feedback-tracking-baseline-gate.md` HARD RULE 2026-04-28.

**Project:** uxmeas.com (MZM-1511 EPIC, MZM-1512 Phase 2)
**Note:** uxmeas is a public-facing static portfolio — NO auth-walked dashboard. The auth-walk gate (#4 in staging-deploy-checklist) does NOT apply here. Annotate the deploy task with `Auth-walk exception: static-portfolio-no-auth`. Tier 3 baseline (#4.5) IS the load-bearing gate.

---

## Test URLs

| Environment | URL | Trigger |
|---|---|---|
| dev | `https://dev.uxmeas.pages.dev/insights/` + `https://dev.uxmeas.pages.dev/` | After `git push origin dev` lands on CF Pages |
| staging | `https://staging.uxmeas.pages.dev/insights/` + `https://staging.uxmeas.pages.dev/` | After `dev → staging` merge |
| production | `https://uxmeas.com/insights/` + `https://uxmeas.com/` | After `staging → main` (CEO-gated) |

Run the FULL checklist on each environment before promoting to the next.

---

## The 10-item Tier 3 baseline (uxmeas-tailored)

### 1. GA4 — property `G-87HSHMKCBH`

- View source on `<URL>/` and `<URL>/insights/` — confirm `gtag('config', 'G-87HSHMKCBH')` is present (loaded via `/js/ga4-bootstrap.js`).
- Open GA4 DebugView (https://analytics.google.com → Configure → DebugView), filter by property `G-87HSHMKCBH`.
- Trigger `page_view` events: visit `/insights/` directly + click an internal link.
- DebugView must show events within 5 minutes.
- **Fail:** missing script tag, wrong property ID, or no events in DebugView.

### 2. Microsoft Clarity — property `waeobadji5`

- View source — confirm Clarity script with `waeobadji5` reference (loaded via `/js/compliance.js?v=20260508`).
- Open https://clarity.microsoft.com → confirm project `waeobadji5` exists.
- Visit a few pages on the dev preview.
- Within 5–10 min, a session should appear in the Clarity dashboard.
- **Fail:** missing script, wrong ID, or no session captured.

### 3. Open Graph meta

For `https://dev.uxmeas.pages.dev/insights/`, validate at https://opengraph.xyz/url/<url-encoded>.

Required tags (in `<head>`):
- `og:title` = `"Insights — UX Meas"`
- `og:description` (full string)
- `og:type` = `"website"` on index, `"article"` on post-detail pages
- `og:url` = canonical URL
- `og:image` = absolute URL to `/images/og-default.png` (or per-post override)
- `og:site_name` = `"UX Meas"`
- (Post-detail only) `article:published_time`, `article:tag` for category

**Fail:** any missing, relative URL where absolute required, or 404 on the og:image.

### 4. Twitter card

Same `<head>`, validate at https://cards-dev.twitter.com/validator (if accessible) OR by inspecting source:
- `twitter:card` = `"summary_large_image"`
- `twitter:title`, `twitter:description`, `twitter:image` (absolute)

**Fail:** any missing.

### 5. GDPR cookie consent — blocks GA4 + Clarity until accept

- Open DevTools → Network tab → clear cookies for `dev.uxmeas.pages.dev`
- Hard-reload `/insights/`
- BEFORE clicking the cookie banner accept button: confirm NO requests to `googletagmanager.com`, `google-analytics.com`, `clarity.ms`, `c.clarity.ms` (filter the Network tab)
- Click accept on the banner
- Reload — confirm those requests now fire
- Reload again — confirm choice persists (localStorage check)

**Fail:** any tracker fires before consent. Consent doesn't persist across reloads.

### 6. Security headers via `curl -I`

```bash
curl -I https://dev.uxmeas.pages.dev/insights/ | grep -iE "strict-transport|content-security|permissions-policy|referrer-policy|x-frame|x-content-type"
```

Required (per `_headers` file in repo root + `.claude/rules/cloudflare-guardrails.md` R1):
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Content-Security-Policy: default-src 'self'; script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://c.clarity.ms https://cdn.jsdelivr.net; …`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

**Fail:** any missing, or CSP doesn't allow nav-scroll.js (it's `/nav-scroll.js` — must be `'self'` which IS already in the CSP).

### 7. Schema.org JSON-LD on `/insights/<slug>/` pages (when posts exist)

For now: confirm `/insights/` index does NOT have a broken JSON-LD block. Post-detail pages won't apply until first post lands.

After first post ships, validate via https://search.google.com/test/rich-results:
- `Article` schema with `author`, `datePublished`, `dateModified`, `headline`, `image`
- (Optional) `BreadcrumbList` from /insights/

### 8. Custom 404

Visit `https://dev.uxmeas.pages.dev/insights/this-does-not-exist/` and `https://dev.uxmeas.pages.dev/this-does-not-exist/`.

Must return:
- HTTP status 404 (not 200)
- Body = the branded uxmeas 404 page (loaded from `404.html` per CF Pages convention)
- NOT the Cloudflare default error page

**Fail:** generic CF error page or 200-with-empty-body.

### 9. robots.txt + sitemap

```bash
curl -sI https://dev.uxmeas.pages.dev/robots.txt | head -3
curl -sI https://dev.uxmeas.pages.dev/insights/sitemap-index.xml | head -3
curl -sI https://dev.uxmeas.pages.dev/sitemap.xml | head -3   # if existing portfolio sitemap
```

All must return 200 + correct `content-type`. Sitemap XML must validate.

The new `/insights/sitemap-index.xml` is generated by Astro `@astrojs/sitemap`. It references `/insights/sitemap-0.xml` which lists insights URLs.

**Fail:** any 404, wrong content-type, invalid XML.

### 10. favicon.svg + favicon.ico

```bash
curl -sI https://dev.uxmeas.pages.dev/favicon.svg | head -3
```

Must return 200 + `content-type: image/svg+xml`.

(uxmeas may not have a `.ico` — `.svg` only is acceptable for modern browsers.)

---

## Additional uxmeas-specific checks (beyond the 10)

### A. nav-scroll.js behavior on dev preview

- Visit `https://dev.uxmeas.pages.dev/insights/` and scroll down vigorously.
- Nav should slide up out of view (translateY accumulating to -NAV_H).
- Scroll up — nav slides back into view.
- Scroll to absolute top — nav stays visible.
- Test on `/`, `/fuzehq.html`, `/insights/` — behavior must be consistent.

### B. Wordmark visual consistency

- Compare `/` (existing portfolio) vs `/insights/` (new Astro page) — wordmark renders identically (inline SVG: full lockup desktop / mark-only mobile).
- Resize to <600px viewport — mobile mark variant should show, full lockup hides.

### C. Lighthouse on dev preview

```bash
npx lighthouse https://dev.uxmeas.pages.dev/insights/ --only-categories=performance,accessibility,best-practices,seo --quiet --chrome-flags="--headless"
```

Targets:
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 95
- SEO ≥ 90

### D. axe-core on dev preview

```bash
npx @axe-core/cli https://dev.uxmeas.pages.dev/insights/ --exit
npx @axe-core/cli https://dev.uxmeas.pages.dev/ --exit
```

0 critical / serious violations.

### E. RSS validates

Submit `https://dev.uxmeas.pages.dev/insights/rss.xml` to https://validator.w3.org/feed/ — must return 0 errors.

---

## Chloe `[TRACKING BASELINE PASS]` comment template

Post on MZM-1512 (Phase 2) or directly on MZM-1511 EPIC after dev preview pass:

```
[TRACKING BASELINE PASS — DEV https://dev.uxmeas.pages.dev/insights/]

10-item baseline:
✓ 1. GA4 G-87HSHMKCBH — page_view fires in DebugView
✓ 2. Clarity waeobadji5 — session captured in dashboard
✓ 3. OG meta — opengraph.xyz validates, all required tags present
✓ 4. Twitter card — summary_large_image with all required fields
✓ 5. GDPR consent — blocks GA4 + Clarity until accept, persists choice
✓ 6. Security headers — HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all set per _headers
✓ 7. JSON-LD — N/A on index (no posts yet); will re-check after first post
✓ 8. Custom 404 — branded page on /insights/this-does-not-exist/
✓ 9. robots.txt + sitemap — both 200, sitemap valid
✓ 10. favicon — 200, image/svg+xml

uxmeas-specific:
✓ A. nav-scroll behavior — verified on /, /insights/, /fuzehq.html
✓ B. Wordmark consistency — desktop SVG / mobile mark variant works
✓ C. Lighthouse — perf <n>, a11y <n>, best-practices <n>, seo <n>
✓ D. axe-core — 0 violations
✓ E. RSS — W3C feed validator 0 errors

Auth-walk exception: static-portfolio-no-auth ✓
Gate: UNBLOCKED for dev → staging promote

— Chloe DevOps
```

After staging passes the same checklist, repeat for prod after staging → main.

## If any gate fails

- Comment `[TRACKING BASELINE FAIL — <item>]` with specifics + screenshot
- Halt the promote
- Fix in `dev`, re-run dev preview chain
- Do NOT skip ahead to staging
