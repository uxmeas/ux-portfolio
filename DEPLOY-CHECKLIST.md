# uxmeas.com v2 Deploy Checklist

> Ship the new homepage shell. Case study modal content stays as-is (v1). Iterate content next session.
> Date: March 23, 2026

---

## GROUP 1: Pre-Flight Validation (Local)

- [ ] Open `uxmeas/index-v2.html` in browser — verify all 7 sections render
- [ ] Click each project card — verify modal opens with case study content
- [ ] Close modal — verify scroll position restores, no overlay stuck
- [ ] Test hamburger menu on mobile viewport (390px)
- [ ] Check all image paths load (no broken images in cards or modals)
- [ ] Verify Netlify form has `data-netlify="true"` attribute
- [ ] Verify GA4 tracking code present (G-9HVVW1GBEC)
- [ ] Verify email obfuscation (no plaintext emails in source)
- [ ] Verify no API keys or secrets in source

---

## GROUP 2: Playwright Smoke Tests (Local)

Run from `uxmeas/` directory:

```bash
# Start local server
cd /Users/pheakmeas/Documents/Development/uxmeas/production
python3 -m http.server 8080 &

# Run tests
npx playwright test tests/e2e/modal-qa.spec.ts --headed
```

If no test file exists yet, run these manual Playwright checks:

```bash
npx playwright screenshot --browser chromium --viewport-size 1440,900 --wait-for-timeout 3000 http://localhost:8080 screenshots/deploy-check-desktop.png
npx playwright screenshot --browser chromium --viewport-size 390,844 --wait-for-timeout 3000 http://localhost:8080 screenshots/deploy-check-mobile.png
npx playwright screenshot --browser chromium --viewport-size 1440,900 --full-page --wait-for-timeout 3000 http://localhost:8080 screenshots/deploy-check-full.png
```

Verify screenshots:
- [ ] Desktop hero renders correctly (charcoal bg, copper accents, Bebas Neue headline)
- [ ] Mobile hero renders correctly (hamburger menu, stacked layout)
- [ ] Full page shows all 7 sections in order
- [ ] No overlapping elements or broken layouts

---

## GROUP 3: File Staging

- [ ] Confirm `production/index.html` is the v2 file (charcoal+copper, not old black+white)
- [ ] Confirm `production/index-backup-v1.html` exists (rollback safety)
- [ ] Confirm all CSS is inline in index.html (no missing external CSS files)
- [ ] Confirm all JS is inline in index.html (no missing external JS files)
- [ ] Confirm `production/images/` has all referenced images
- [ ] Confirm `production/robots.txt` exists
- [ ] Confirm `production/sitemap.xml` exists
- [ ] Confirm `production/favicon.svg` exists

---

## GROUP 4: Git — Commit to Dev

```bash
cd /Users/pheakmeas/Documents/Development/uxmeas

# Stage the key files
git add index.html index-v2.html production/index.html production/index-backup-v1.html

# Commit
git commit -m "Portfolio redesign v2: charcoal+copper palette, Bebas Neue+Inter typography, new homepage shell with scroll animations. Case study modals preserved from v1.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"

# Push to dev
git push origin dev
```

- [ ] Commit successful
- [ ] Push to dev successful
- [ ] Dev branch deploy preview works (`dev--uxmeas.netlify.app` or similar)

---

## GROUP 5: Staging Promotion

```bash
cd /Users/pheakmeas/Documents/Development/uxmeas
git checkout staging && git merge dev --no-edit && git push origin staging && git checkout dev
```

- [ ] Staging merge successful
- [ ] Staging deploy preview works
- [ ] All 7 sections render on staging URL
- [ ] Modal system works on staging URL
- [ ] Mobile responsive on staging URL

---

## GROUP 6: Council Gate (Staging Review)

Run council on the staging URL screenshots:

```bash
npx playwright screenshot --browser chromium --viewport-size 1440,900 --wait-for-timeout 3000 "https://staging--uxmeas.netlify.app" screenshots/staging-desktop.png
npx playwright screenshot --browser chromium --viewport-size 390,844 --wait-for-timeout 3000 "https://staging--uxmeas.netlify.app" screenshots/staging-mobile.png
```

Then send to council:
```bash
bash _scripts/council.sh "Final gate check on uxmeas.com staging. Ship to production or hold?"
```

- [ ] Council approves staging
- [ ] No blockers identified

---

## GROUP 7: Production Deploy (Pheak Approval Required)

**STOP — Do NOT proceed without Pheak's explicit approval.**

```bash
cd /Users/pheakmeas/Documents/Development/uxmeas
git checkout main && git merge staging --no-edit && git push origin main && git checkout dev
```

- [ ] Pheak approved production deploy
- [ ] Main merge successful
- [ ] Push to main successful
- [ ] https://uxmeas.com loads with new design
- [ ] All modals work on production
- [ ] Mobile works on production
- [ ] Contact form submits on production

---

## GROUP 8: Post-Deploy Verification

- [ ] Google PageSpeed Insights score checked (target: perf 70+, a11y 80+)
- [ ] OG image preview works (share URL on LinkedIn/Twitter preview tool)
- [ ] No console errors in browser dev tools
- [ ] Contact form test submission received
- [ ] Council notified of successful deploy

---

## ROLLBACK (If Needed)

```bash
cd /Users/pheakmeas/Documents/Development/uxmeas
cp production/index-backup-v1.html production/index.html
git add production/index.html
git commit -m "Rollback: restore v1 homepage"
git push origin main
```

---

## Next Session (Content Iteration)

- [ ] Kai finishes case study templates in Pencil (Compliance UX + DealFlow started)
- [ ] Council reviews each case study design
- [ ] Max rewrites modal content to match new templates
- [ ] Council reviews content
- [ ] Deploy updated modals
