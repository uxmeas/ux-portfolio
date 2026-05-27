# Sage — uxmeas /insights + portfolio-wide nav local QA

**Task:** Confirm pre-push gates for dev branch promote. Post `[QA PASS]` on the parent task (MZM-1512 Phase 2) with the lint/build/route attestations below, OR post `[QA FAIL — <which gate>]` with details.

**Branch:** `dev`
**Local server:** `http://localhost:8000` (python3 -m http.server 8000 from repo root)

---

## Preliminary checks already run (proof attached)

These ran on 2026-05-26 in the CEO session. Sage should spot-verify, not re-run all from scratch.

| Gate | Status | Evidence |
|---|---|---|
| Astro build (`cd _insights-src && npm run build`) | PASS | Build green, output `insights/` has 5 clean files (index, rss, sitemap-0, sitemap-index, _assets/insights.css) |
| All 13 routes serve 200 | PASS | `/`, `/index.html`, `/fuzehq.html`, `/katipult.html`, `/docs-to-design.html`, `/compliance-ux.html`, `/404.html`, `/cookies.html`, `/privacy.html`, `/insights/`, `/insights/rss.xml`, `/nav-scroll.js`, `/insights/_assets/insights.css` |
| Insights link consistency | PASS | 1× `href="/insights/"` on every nav-bearing page (8 files) |
| nav-scroll.js script consistency | PASS | 1× script tag on every nav-bearing page (8 files) |
| Secret scan (grep `sk_\|pk_live\|ghp_\|xoxb_\|AKIA`) | CLEAN | No matches in new code |
| `debugger` / `TODO` / `FIXME` / `XXX` in new code | CLEAN | None |
| `console.log` in new code | 2 legitimate uses | `_insights-src/scripts/check-calendar.mjs:66` (cadence-warning telemetry) + `_insights-src/scripts/cleanup-output.mjs:33` (post-build cleanup count). Both are build-time scripts, NOT runtime client code. Acceptable per staging-deploy-checklist P4 (which scopes to client `.ts/.tsx`). |
| TOKENS ONLY audit on `_insights-src/public/_assets/insights.css` | CLEAN | No hardcoded hex, no fake-token fallbacks. All values reference `shared.css` tokens. |
| Astro 5 data-store trap | DOCUMENTED | `npm run clean` script added; README has trap warning section. |

## What Sage should additionally verify

### S1. Pre-existing uncommitted files NOT in scope of this commit

Per `git status -s` at session end, the working tree had these PRE-EXISTING uncommitted items unrelated to /insights/ work:

- `M .DS_Store` (always-modified macOS metadata — should be `.gitignore`d or stashed)
- `?? _legacy/` (Pheak's local archive, predates session)
- `?? "careers/Pheak Meas - Senior Product Designer - vClean.pdf"` (Pheak's local file, predates session)

These are NOT part of the /insights/ scope. If `git add .` is used to stage, they will bundle in. Recommended:
```bash
# Stage only this scope
git add \
  404.html cookies.html privacy.html \
  compliance-ux.html docs-to-design.html fuzehq.html index.html katipult.html \
  STATUS.md DESIGN.md \
  insights-spec.md nav-scroll.js \
  _insights-src/ insights/
```

(Sage: confirm `git diff --cached` after staging matches the intended scope before push.)

### S2. Verify `_insights-src/.gitignore` excludes `node_modules/` and `.astro/`

Read `_insights-src/.gitignore`. Must contain `node_modules/`, `.astro/`, `dist/`. Confirms ~340 npm packages don't enter the repo.

### S3. Spot-check 3 pages locally

Visit in browser (`http://localhost:8000`):
- `/` — nav has Work · Insights · About · Contact. Insights link works. Scroll down → nav slides up. Scroll up → nav reappears. At top → nav visible.
- `/insights/` — empty state ("No posts yet. First one ships soon."). Wordmark matches portfolio. Nav has same Insights link.
- `/fuzehq.html` — case study page nav has Insights link in correct position. Scroll behavior works.

### S4. Astro build is reproducible

```bash
cd _insights-src
npm run clean
npm run build
# Expect: build green, 5 files in ../insights/, cadence warning fires (2 OPEN slots), no errors
```

### S5. Lighthouse a11y spot-check on local

```bash
# From repo root
npx lighthouse http://localhost:8000/insights/ --only-categories=accessibility --quiet --chrome-flags="--headless"
npx lighthouse http://localhost:8000/ --only-categories=accessibility --quiet --chrome-flags="--headless"
```

Both must score ≥ 95. If lower, identify violations and either fix or note for Chloe Tier 3 follow-up on dev preview.

### S6. axe-core local scan

```bash
# Per package.json: npx axe --dir . --dest <reports>
npx @axe-core/cli http://localhost:8000/insights/ --exit
```

Must return 0 violations. Critical/serious findings = QA FAIL.

## Sage `[QA PASS]` comment template

Post on MZM-1512:

```
[QA PASS] Local QA for uxmeas /insights Phase 1 scaffold + portfolio-wide nav update

Verified on local (http://localhost:8000):
- Astro build green, 5-file output
- All 13 routes 200
- 8 HTML pages: Insights link added + nav-scroll.js wired, consistent
- nav-scroll behavior works (scroll-down hides, scroll-up reveals, at-top always visible)
- TOKENS ONLY audit clean on insights.css
- No secrets, no debugger, no TODO in new code
- Pre-existing uncommitted files flagged (not in scope; staged scope confirmed via git diff --cached)
- Astro `npm run clean && npm run build` reproducible
- Lighthouse a11y: <score> /insights/, <score> /
- axe-core: 0 violations

CSP CHECK: nav-scroll.js loaded via 'self' — CSP `script-src 'self'` permits this. is:inline on Astro Default.astro script tags prevents bundling of root /js/* references. Verified curl -I confirms _headers still serves correct CSP.

Auth-walk exception: backend-only ❌ — this IS a public UI deploy. But per staging-deploy-checklist note: uxmeas is a static portfolio with no auth surface, so Chloe's auth-walk (#4) is not applicable. Tier 3 baseline (#4.5) IS required. Chloe brief: _handoff/chloe-uxmeas-insights-baseline.md

Ready for CEO to push origin/dev → trigger CF Pages dev preview build → Chloe runs Tier 3 baseline against dev.uxmeas.pages.dev.

— Sage QA
```

## If any gate fails

- Comment `[QA FAIL — <gate>]` with the specific finding
- Move task back to `in_progress`
- Tag Rex/Thea for fix (or Pheak if it's a design/copy decision)
- Do NOT post `[QA PASS]` until fixed and re-verified
