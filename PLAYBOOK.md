# uxmeas.com — Deployment Playbook

> Single source of truth for testing, security, and deployment.
> Replaces: DEPLOY-CHECKLIST.md, DEPLOYMENT-STRATEGY.md, DEPLOYMENT-APPROVAL-WORKFLOW.md
> Last updated: March 24, 2026

---

## Branch Strategy

```
dev (all work starts here) → staging (QA gate) → main (production)
```

| Branch | Deploys To | Auto-Deploy |
|--------|-----------|:-----------:|
| `dev` | dev--uxmeas.netlify.app | Yes |
| `staging` | staging--uxmeas.netlify.app | Yes |
| `main` | uxmeas.com | Yes |

**Rules:**
- All work happens on `dev`
- Never push directly to `staging` or `main`
- One-directional: `dev → staging → main` (never merge backwards)
- Production merge requires **Pheak's explicit approval**

---

## Pre-Deployment Quality Gates

### Gate 1: Local (Pre-Commit Hook — auto-installed via `npm install`)

| Check | Blocks Commit | Auto-Fix |
|-------|:---:|:---:|
| ESLint | Yes | Partial |
| Stylelint | Yes | Partial |
| Prettier formatting | Yes | Yes |
| Sensitive data scan (`password`, `secret`, `api_key`, `token`) | Yes | No |
| HTML validation | Warn | No |
| File size > 1MB | Warn | No |

### Gate 2: CI/CD (GitHub Actions — runs on push to `dev` or `staging`)

**File:** `.github/workflows/ci.yml`

| Step | Tool | Blocks Deploy | Threshold |
|------|------|:---:|-----------|
| Lint JS/CSS/HTML | ESLint + Stylelint + HTMLHint | Yes | Zero errors |
| E2E tests | Playwright (39 tests) | Yes | 100% pass |
| Viewport coverage | Playwright (1440, 768, 390) | Yes | All pass |
| Accessibility | axe-core | Yes | Score ≥ 95 |
| Performance | Lighthouse CI | Yes | Perf ≥ 85, A11y ≥ 95 |
| Security scan | Sensitive data grep | Yes | Zero matches |
| Dependency audit | npm audit | Warn | Critical only |

### Gate 3: Staging Review (Manual — 24-48 hour window)

- [ ] All sections render on staging URL
- [ ] Modal system works (open, close, Escape, overlay click)
- [ ] Mobile responsive (hamburger, stacked layout, no overflow)
- [ ] Contact form test submission
- [ ] OG image preview (LinkedIn/Twitter preview tool)
- [ ] No console errors
- [ ] Council review (optional): `bash _scripts/council.sh "Gate check on staging"`

### Gate 4: Production (Pheak Approval — HARD GATE)

**No merge to main without explicit approval.**

---

## Test Suite

### Playwright E2E (39 tests across 3 spec files)

```bash
npx playwright test              # all tests, headless
npx playwright test --headed     # all tests, visible browser
```

| Spec File | Tests | Coverage |
|-----------|:---:|---------|
| `layout-viewport.spec.ts` | 18 | Container widths (1440px), responsive padding (32/24/16), modal close position, hamburger menu, mobile overflow, work grid stacking |
| `modal-qa.spec.ts` | 16 | Modal content, confidential data exclusion, image loading, research tables, competitor cards |
| `contact-form.spec.ts` | 5 | Form visibility, submission, payload, honeypot, loading state |

**Viewport coverage:**

| Viewport | Width | Tests |
|----------|:---:|:---:|
| Desktop | 1440×900 | 8 |
| Tablet | 768×1024 | 4 |
| Mobile | 390×844 | 6 |

### Other Test Commands

```bash
npm run test:accessibility    # axe-core WCAG validation
npm run test:performance      # Lighthouse CI audit
npm run test:links            # Check for broken links / 404s
npm run test:html             # HTMLHint validation
npm run test:css              # Stylelint validation
npm run test:js               # ESLint validation
npm run quality               # Run all quality checks
```

### Performance Budgets

| Metric | Threshold | Blocks |
|--------|:---------:|:---:|
| Lighthouse Performance | ≥ 85 | Yes (CI) |
| Lighthouse Accessibility | ≥ 95 | Yes (CI) |
| Lighthouse Best Practices | ≥ 90 | Warn |
| Lighthouse SEO | ≥ 80 | Warn |
| First Contentful Paint | < 1.5s | Warn |
| Cumulative Layout Shift | < 0.1 | Warn |

---

## Security

### Headers (netlify.toml)

| Header | Value | Purpose |
|--------|-------|---------|
| X-Frame-Options | DENY | Prevents clickjacking |
| X-Content-Type-Options | nosniff | Prevents MIME sniffing |
| X-XSS-Protection | 1; mode=block | XSS filter |
| Referrer-Policy | strict-origin-when-cross-origin | Controls referrer data |
| Content-Security-Policy | Whitelists self + Google + unpkg + fonts | Prevents XSS/injection |

### Subresource Integrity (SRI)

| Script | SRI | Status |
|--------|:---:|--------|
| Lucide Icons (unpkg, pinned v1.6.0) | Yes | `integrity="sha384-..."` |
| Google Tag Manager (gtag.js) | No | Cannot pin (Google updates server-side) |
| Google Fonts CSS | No | Cannot pin (dynamic generation) |

### Pre-Commit Security Scan

Greps staged files for patterns: `password`, `secret`, `api_key`, `token`, `credential`
Blocks commit if found. No exceptions.

### Email Obfuscation

All email addresses use JS obfuscation (`data-u` + `data-d` attributes).
Zero plaintext emails in HTML source.

---

## Deployment Commands

### Push to dev
```bash
git add [files]
git commit -m "description"
git push origin dev
```

### Promote dev → staging
```bash
git checkout staging && git merge dev --no-edit && git push origin staging && git checkout dev
```

### Promote staging → main (REQUIRES APPROVAL)
```bash
# Only after Pheak says "ship it"
git checkout main && git merge staging --no-edit && git push origin main && git checkout dev
```

### Rollback (emergency)
```bash
# Option 1: Restore backup file
cp production/index-backup-v1.html production/index.html
git add production/index.html && git commit -m "Rollback: restore previous version" && git push origin main

# Option 2: Netlify one-click rollback (via Netlify dashboard)
```

---

## Post-Deploy Verification

- [ ] https://uxmeas.com loads correctly
- [ ] All modals open and close
- [ ] Mobile responsive (test on real device if possible)
- [ ] Contact form test submission received
- [ ] Google PageSpeed Insights: Perf ≥ 85, A11y ≥ 95
- [ ] No console errors
- [ ] OG image preview works
- [ ] Monitor for 2-4 hours

---

## File Structure (What Ships)

Netlify publishes from `production/` only.

```
production/
├── index.html              ← Main portfolio (v2)
├── index-backup-v1.html    ← Rollback safety net
├── css/                    ← Stylesheets
├── js/                     ← Scripts
├── images/                 ← All assets
├── case-studies/           ← Generated modal content
├── 404.html                ← Custom error page
├── robots.txt              ← SEO crawl rules
├── sitemap.xml             ← XML sitemap
└── favicon.svg             ← Site icon
```

Internal files (`agents/`, `docs/`, `tests/`, `infrastructure/`) are NOT in `production/` and never deploy.

---

## Key Contacts

| Role | Who | Trigger |
|------|-----|---------|
| CEO / Final Approval | Pheak | Production deploy |
| PDM / Gate Checks | Ana | Staging review |
| CTO / Code Review | Max | Architecture, security |
| CCO / Design QA | Kai | Visual quality |
