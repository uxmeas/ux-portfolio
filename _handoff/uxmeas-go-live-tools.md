# uxmeas.com — Live analytics + tools stack for go-live

**CEO directive 2026-05-27:** Stack stays as the tools already wired on the live site. NO net-new analytics or monitoring tools added at go-live. The Tier 1 / 2 / 3 proposals below are DECLINED. Kept in this doc as historical reference only — do not re-propose without explicit CEO ask.

---

## Already live (no action)

| Tool | Property / ID | Surface | Notes |
|---|---|---|---|
| Google Analytics 4 | `G-87HSHMKCBH` | All pages via `/js/ga4-bootstrap.js` | Cookie-gated by GDPR consent banner. Property owner: Pheak. |
| Microsoft Clarity | `waeobadji5` | All pages via `/js/compliance.js` | Session replay + heatmaps. Cookie-gated. |
| GDPR cookie consent | `/js/cookie-consent.js` | All pages | Blocks GA4 + Clarity until user accept; persists choice. |
| Security headers | `_headers` (Cloudflare Pages) | All routes | HSTS preload, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy. |
| Schema.org JSON-LD | `index.html` inline | Homepage | Person schema with name, jobTitle, awards, knowsAbout. |

---

## Tier 1 — DECLINED 2026-05-27 (kept for history, do not re-propose)

### T1.1 Cloudflare Web Analytics — privacy-friendly + no-cookie + free
**Why:** GA4 is cookie-gated by GDPR consent, so it misses 30-40% of EU/CA bounces who never accept cookies. CW Analytics is server-side, no cookies, no consent required, captures the full baseline. Complementary to GA4 — not a replacement.

**Setup:**
1. Cloudflare dashboard → uxmeas.com → Web Analytics → Enable
2. Copy the auto-injected beacon snippet OR use the JS beacon for SPA tracking
3. Add `static.cloudflareinsights.com` to `_headers` CSP `script-src`
4. Verify: open `https://uxmeas.com/`, DevTools Network tab, confirm `static.cloudflareinsights.com/beacon.min.js` loaded

**Effort:** 5 min (mostly dashboard click) + 1 line CSP update + 1 script tag per page (or auto-inject via CF dashboard).
**Cost:** Free.
**Account owner:** Pheak (existing Cloudflare account).

### T1.2 Sentry browser SDK — production JS error monitoring
**Why:** Static portfolio + new Astro section + nav-scroll.js across 8 HTML pages = surface area for "site looks broken" bugs that users won't report. Sentry catches uncaught errors, console errors, asset 404s, hydration mismatches — before hiring managers hit them.

**Setup:**
1. Sentry signup at sentry.io → create project "uxmeas" → JavaScript / Browser SDK
2. Get the DSN (public, can be in HTML)
3. Add minimal init script to every page (~15KB minified, defer):
   ```html
   <script src="https://browser.sentry-cdn.com/<version>/bundle.tracing.min.js" crossorigin="anonymous" defer></script>
   <script>Sentry.init({ dsn: "<PUBLIC_DSN>", tracesSampleRate: 0.1, replaysSessionSampleRate: 0, environment: "production" });</script>
   ```
4. Add `https://*.sentry.io` and `https://browser.sentry-cdn.com` to `_headers` CSP `script-src` + `connect-src`
5. Inline `<script>` with the init call requires `'unsafe-inline'` in CSP OR move init to an external `js/sentry-init.js` file (preferred — keeps strict CSP).

**Effort:** 30 min (Sentry signup + DSN + script wiring + CSP + test).
**Cost:** Free tier 5K errors/mo. Production volume on a portfolio: well under.
**Privacy:** Sentry session replay collects user input by default — set `replaysSessionSampleRate: 0` to opt out. Or use only error tracking, no replay.

### T1.3 Google Search Console — submit sitemap before launch
**Why:** SEO indexing kicks off when sitemap is submitted. The new `/insights/*` URLs are not in production yet, but once they ship to main, having Search Console wired = day-1 indexing.

**Setup:**
1. https://search.google.com/search-console — add `uxmeas.com` property
2. Verify via Cloudflare DNS TXT record (CF DNS dashboard supports this)
3. Submit sitemaps:
   - `https://uxmeas.com/sitemap.xml` (existing portfolio)
   - `https://uxmeas.com/insights/sitemap-index.xml` (new from Astro build)
4. Crawl stats + indexing reports start populating within 48h.

**Effort:** 15 min (signup + DNS verification + sitemap submit).
**Cost:** Free.
**Account owner:** Pheak's Google account.

### T1.4 Bing Webmaster Tools — same pattern, Bing search
**Why:** Bing share is ~10-15% of search in NA; non-trivial for hiring managers who default to Bing on Windows or Edge.

**Setup:**
1. https://www.bing.com/webmasters → add uxmeas.com → import from Google Search Console (one click if T1.3 done)
2. Verify automatically inherited from GSC

**Effort:** 5 min (if T1.3 done first).
**Cost:** Free.

---

## Tier 2 — recommended within first week post-launch

### T2.1 LinkedIn Post Inspector — one-time OG validation
**Why:** LinkedIn caches OG metadata aggressively. After go-live, share the homepage + 1 case study to LinkedIn → use Post Inspector to force re-crawl with new OG image/title.

**Setup:** https://www.linkedin.com/post-inspector/ → paste each URL → "Inspect" → confirms preview card matches expectation.
**Effort:** 5 min one-time, repeat after any OG meta change.

### T2.2 Twitter Card Validator — same, Twitter
**Setup:** https://cards-dev.twitter.com/validator (may require login). Validates summary_large_image cards.

### T2.3 Schema.org rich-results test
**Setup:** https://search.google.com/test/rich-results → paste each URL. Confirms Person schema (homepage), Article schema (post-detail pages once they exist) is valid.

---

## Tier 3 — defer until first metrics signal need

### T3.1 Lighthouse CI in GitHub Actions
**Why:** Automated performance budgets on every PR. Catches regressions before merge.
**Effort:** ~1 hour to set up GHA workflow + budgets file.
**Defer until:** First time someone ships a perf regression. Probably overkill for a low-deploy-frequency personal portfolio.

### T3.2 UptimeRobot or BetterStack uptime monitoring
**Why:** Alert on uxmeas.com going down.
**Why defer:** Cloudflare Pages SLA is functionally 100%. A static site on a global CDN doesn't go down. Adds noise (false-positive transient timeouts) more than it catches real outages.
**Reconsider if:** Forms or backend APIs get added later — then yes.

### T3.3 PostHog / Mixpanel funnel analytics
**Why:** Cohort analysis, funnel tracking (e.g., "homepage → case study → contact form").
**Why defer:** No conversion funnel today. GA4 + Clarity already cover top-of-funnel behavior. PostHog would shine if Pheak adds gated content (newsletter signup, downloadable resume gate, etc.).

### T3.4 Cloudflare Turnstile or hCaptcha on contact form
**Why:** Bot protection on the eventual contact form.
**Why defer:** No contact form ships in this scope. Email is `hello@uxmeas.com` (mailto link). When a real form lands, wire Turnstile then.

---

## Pre-go-live final checklist (post-Tier-1 wiring)

| Item | Tool | Status |
|---|---|---|
| GA4 fires on every page | Chloe T3 baseline | Per `_handoff/chloe-uxmeas-insights-baseline.md` #1 |
| Clarity captures sessions | Chloe T3 baseline | #2 |
| OG meta validates | LinkedIn Post Inspector + opengraph.xyz | T2.1 + Chloe #3 |
| Cookie consent blocks before accept | Chloe T3 baseline | #5 |
| Security headers verified | `curl -I` | Chloe #6 |
| Custom 404 works | `curl /this-does-not-exist` | Chloe #8 |
| Sitemap submitted | Google Search Console | T1.3 |
| Bing indexing imported | Bing Webmaster | T1.4 |
| (Optional) Sentry capturing errors | Sentry dashboard | T1.2 |
| (Optional) CW Analytics tracking | CF dashboard | T1.1 |

---

## Recommendation

**Do all Tier 1 (T1.1 – T1.4) before main promote.** That's ~1 hour total wiring + 4 accounts to register/verify. Locks in zero-blind-spot launch.

**Tier 2 in first week after launch** — quick wins, no rush.

**Tier 3 deferred** until specific metrics or workflows demand them.

If short on time: T1.1 (CW Analytics) + T1.3 (Search Console) are the highest-leverage. Sentry (T1.2) is a "nice to have" — without it, you'd discover JS errors via user reports (unlikely for a portfolio) or Clarity rage-clicks.

---

## What I can wire vs. what needs Pheak

| Item | I can do | Pheak does |
|---|---|---|
| T1.1 CW Analytics — code + CSP | Wire script tag + CSP update + DESIGN.md note | Click "Enable" in CF dashboard + grab token |
| T1.2 Sentry — code + CSP | Wire script tag + init module + CSP update | Signup at sentry.io + grab DSN |
| T1.3 Search Console | n/a (browser action) | Full setup |
| T1.4 Bing | n/a (browser action) | Full setup (auto-imports if T1.3 done) |
| T2.x validators | n/a (one-time browser actions) | Run post-launch |

Confirm which Tier 1 items to wire and I'll do my side; you do yours.
