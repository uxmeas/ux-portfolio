# UX Meas — Project Status

**Last updated**: 2026-05-06
**Priority**: #1a (job hunting + portfolio)
**Stage**: LIVE (v2 production) — v3 in progress on dev
**Owners**: Ana (delivery gates), Rio (job hunting status + marketing), Kai (design QA)

---

## Deploy Spec

**Repo:** github.com/uxmeas/ux-portfolio
**Hosting:** Cloudflare Pages (project: `uxmeas`)
**Build:** Static site — no build command, output directory: `/` (root)
**DNS:** Cloudflare zone (MZM Labs account)
**Local path:** `/Users/pheakmeas/Documents/Development/uxmeas`

| Branch | URL | Version | Auto-deploy |
|--------|-----|---------|-------------|
| main | uxmeas.com / uxmeas.pages.dev | v2 (production) | Yes |
| staging | staging.uxmeas.pages.dev | v2 | Yes |
| dev | dev.uxmeas.pages.dev | v3 (in progress) | Yes |

**Promote flow:** dev → staging → main (one-directional only)
**Main gate:** Sage QA + CEO approval required before staging → main

---

## What EXISTS (do NOT recreate)

### Portfolio Site (LIVE)
- https://uxmeas.com (Cloudflare Pages, auto-deploys from main)
- Static HTML/CSS/JS
- GA4: G-87HSHMKCBH (canonical per CLAUDE.md)
- Microsoft Clarity: waeobadji5 (wired 2026-05-06 via js/compliance.js)

### Case Studies (3 LIVE, 5 COMING SOON)
Designed in Pencil at `Pencil/uxmeas-portfolio.pen`:
1. **Compliance UX** (LIVE) — full .pen rewrite, responsive, GA4
2. **Katipult DealFlow** (LIVE) — full .pen rewrite, responsive, GA4
3. **AKMSecure** (LIVE) — built March 29, polished March 30
4. **MultiPaste** (GHOST) — .pen complete, HTML built, awaiting image exports to go active
5. Docs to Design — ghost card
6. IsoBlock — ghost card
7. RelationSync — ghost card
8. MyPick.io — ghost card (last, personal project)

### HTML Resume (March 30)
- `uxmeas/careers/resume.html` — tokenized HTML resume with left panel controls
- 3 presets: Default (9pt), Spacious (9.5pt), Dense (8.5pt)
- 30+ CSS custom properties for type, spacing, layout
- Title: "Senior Product Designer"
- Summary leads with: "Co-founded a fintech company that went from 3 people to a TSX-V IPO"

### Careers Folder
- `uxmeas/careers/` — per-company application folders
- `careers/_templates/resume.html` + `cover-letter.html`
- `careers/STATUS.md` — application tracker

### Homepage
- 3 live interactive cards (Compliance UX, DealFlow, AKMSecure)
- 5 ghost "COMING SOON" cards (dimmed, no click, aria-hidden)
- Behance-style modal with fetch-based case study loading
- Stats: 18 Years, $2B+, TSX-V, 20+ Jurisdictions

### Design System
- Behance-style modal: 92vw / max-width 1440px, 8px radius
- Per-project CSS tokens (cs--compliance, cs--dealflow, cs--akm, etc.)
- Fonts: Inter for case studies, Bebas Neue for display, Space Grotesk for shell
- Device frames: phone 213px desktop / 75vw mobile, 8px radius, 3px bezel
- Mobile carousel: CSS scroll-snap, 16px scroll-padding, snap-to-start
- Card thumbnails: 4:3 aspect ratio (Behance/Dribbble standard)
- Mobile content rules: phones swipe, screenshots stack, cards stack

### Content Governance
- Content map: `_copy/uxmeas.com/index.md` — source of truth for all copy
- .pen file: visual source of truth
- Flow: copy file → .pen → code (never skip steps)

---

## Job Hunting (Rio Tracks)

### Strategy & Voice
- [x] `Client-Projects/job-hunting-strategy.md` — Master strategy (updated March 30)
- [x] `my-skills/job-hunting-voice/SKILL.md` — Voice, templates, rate card (updated March 30)
- [x] All sprint task files cleaned: title, case studies, AKM framing, dates (March 30)
- [x] Copy alignment audit complete (April 1) — resume is source of truth for all surfaces

### Rate
- **$100/hr USD anchor** (confirmed March 30)
- Agency ceiling: $80/hr (no design position exceeds this through agencies)
- $75-85 USD for Upwork bootstrapping only

### LinkedIn
- [x] Copy finalized. Repositioning complete (Co-founder → Product Design Consultant)
- [ ] **NOT APPLIED** — Headline, About, Open to Work, Featured, Skills reorder (manual)

### Sprint Tasks (at `Client-Projects/job-hunting-sprint/`)
- [ ] Task 1-8: All NOT STARTED (ready since March 14)

### Metrics
| Metric | Target | Current |
|--------|--------|---------|
| Applications sent | 10-15/week | 0 |
| Agency registrations | 6 total | 0 |

---

## What's DONE (April 1 session)

### Mobile Laptop Mockup Fix (SHIPPED)
- [x] Fixed hero laptop device-screen positioning for mobile (percentage-only calc values)
- [x] Hidden browser bar on mobile (too small to be useful)
- [x] Adjusted screen positioning: top 10%, height 72% on mobile
- [x] Added tablet breakpoint (1024px) with reduced calc offsets
- [x] Removed shimmer overlay from all 3 case studies (was blocking images on Netlify)
- [x] Applied to: compliance-ux, dealflow, akmsecure

### Card Cover Fix (SHIPPED)
- [x] DealFlow card: swapped to dark dashboard screenshot in .pen
- [x] Compliance card: swapped to light phone mockups in .pen
- [x] Exported both covers from .pen at 2x
- [x] Converted to WebP
- [x] Deployed to production

### Copy Alignment Audit (SHIPPED)
- [x] Content map updated: `_copy/uxmeas.com/index.md` — 16→18 years, Senior Product Designer
- [x] Content map updated: `_copy/mzmlabs.com/index.md` + 3 insights articles — 16→18 years
- [x] .pen file updated: hero subtitle, about role, about body, stats, DealFlow card
- [x] production/index.html: meta descriptions, og:title, hero subtitle, about section, stats, DealFlow card
- [x] production/portfolio.html: title, og:title
- [x] Stale footer cleanup: mypick + relationsync ("Product Designer & Builder" → "Senior Product Designer")
- [x] Zero stale "16 year" or "Product Designer & Builder" references remaining in production

### Messaging Now Aligned Across All Surfaces
| Element | Value |
|---------|-------|
| Title | Senior Product Designer |
| Years | 18 |
| Hero | "18 years. Startup to IPO. Still shipping." |
| Meta | "Co-founded a fintech company that went from 3 people to a TSX-V IPO. 18 years shipping products..." |
| Stats | 18 YEARS · $2B+ PROCESSED · TSX-V LISTED · 20+ JURISDICTIONS |
| Katipult | "Co-founder & Lead Product Designer" (historical — company no longer exists) |
| MZM Labs | "Product Design Consultant" |
| AKMSecure | "Design Consultant" |

### Memory Updates
- [x] Katipult history saved: company no longer exists, receivership → Markette, Pheak focused on design not management
- [x] Consultant framing updated: Katipult co-founder allowed everywhere (not current role)
- [x] Resume source of truth cross-referenced and locked in

### Commits (6 total)
1. `90be9a0` — Mobile laptop mockup: responsive positioning, hide browser bar
2. `fbc58d2` — Hotfix: remove shimmer blocking hero images (compliance-ux, dealflow)
3. `2ed82ef` — Hotfix: remove shimmer from akmsecure
4. `5c45a9f` — Fix card covers: compliance → light phones, dealflow → dark dashboard
5. `00729cc` — Align copy to resume: 18 years, Senior Product Designer, stronger metas
6. `d843fa0` — Fix stale footers: Senior Product Designer in mypick and relationsync

---

## What's DONE (April 2 session)

### MultiPaste Portfolio Case Study
- [x] .pen case study: 7 sections in uxmeas-portfolio.pen (node ynJWC)
- [x] .pen badges: converted all 5 to pill frames (matching compliance/dealflow/akm)
- [x] .pen hero: subtitle updated to match copy, laptop replaced with MacBook Pro device frame
- [x] .pen features: expanded from 6 to all 12 per copy source of truth (drag-and-drop reorder added April 8)
- [x] .pen meta row: restructured to label/value pairs with divider line
- [x] HTML case study: `production/case-study/multipaste/index.html` (7 sections, responsive, GA4)
- [x] production/index.html: .cs--multipaste CSS theme, projectKeys, slugMap, ghost card added

---

## What's DONE (April 9 session)

### Katipult Research Enrichment (MZM-340)
- [x] Explored 16,547 files from Katipult OneDrive archive
- [x] Added 3 new metric cards: 97% retention, 154 implementations, $510K IRAP
- [x] Added revenue context: $2M+ ARR, 22 customers, 82.6% gross margin
- [x] Expanded enterprise clients from 7 to 17 named with geography table
- [x] Added We Are Starting SRL international case study (Italy, MiFID, 2,500+ users)
- [x] Enriched Lending Platform with ATB specifics (Trulioo, Onfido, TFSA/RRSP)
- [x] Added Design Practice Evidence section (UIKit, 260+ mockups, 154 brand implementations)
- [x] Updated Case Study 6 with Markette Ventures capstone
- [x] Added market strategy context to DealFlow Mesh ($6.2M target, competitive analysis)
- [x] Added regulatory framework table (IIROC, Reg CF, MiFID, ISA, FINTRAC, GDPR)
- [x] Added internal sources section with provenance references
- [x] Added collaborative tone rules (Vendy directive — no "me me me")
- [x] Verified live Katipult clients: PropertyBridges.com (Ireland), WeAreStarting.it (Italy), MaRS (Toronto)

### .pen Wireframe Updates
- [x] Updated DealFlow wireframe: 6 text nodes rewritten to collaborative tone
- [x] Updated White-Label title: "50+ Client Brands" → "154 Client Brands"
- [x] Verified both wireframes via screenshot

### Memory Updates
- [x] Saved collaborative tone feedback (feedback-collaborative-tone.md)
- [x] Updated MEMORY.md index

---

## What's DONE (May 6 session — v3 promote prep)

### Case study agency-frame reframe (FuzeHQ + D2D only)
**Triggered by:** CEO insight 2026-05-06 — case studies were framed as "I solved my own pain point" (indie-maker tilt) when the work was actually done under MZM Labs the agency. LinkedIn says "Product Design Consultant — MZM Labs Inc. • Freelance" — case studies should reflect that.

- [x] HM Cold Read baseline run on current FuzeHQ + D2D — both scored 7/10, advance Y/Y
- [x] Side-by-side opener drafts (current vs reframe) — CEO approved frame
- [x] Lex full rewrite applied to FuzeHQ: hero sub, Origin lede, Origin body, Tenant Zero block, Foundation §01 close ("operator surface" → "human-collaboration layer"), universalize close added before brand sentence
- [x] Lex full rewrite applied to D2D: hero sub, Context body, footer note — re-anchored to MZM Labs's client deliverables eating 4-8 hr per project
- [x] Operator-persona seam closure on FuzeHQ — retired "operator" body-copy mentions across §02 Problem, quadrant SVG label, §03 Approach calm-chrome, anchor card, Origin §01, Foundation §01 paragraph 2, HMW callout (CEO explicitly lifted HMW lock for one edit)
- [x] D2D state reconciliation — pre-submission canonical state confirmed (no external users, only user has been Pheak on MZM Labs work); reflection language "real users on a real design surface within months" reframed to MZM Labs dogfood; "first week" claim retired in favor of demand-signal waitlists
- [x] Sage opener-body QA — both PASS WITH FLAGS; no must-fix contradictions
- [x] HM Cold Read post-test: FuzeHQ 7/Y, D2D 7/Y — bar held same-or-better
- [x] CEO decision: ship at 7/Y (Path 1) — defer remaining HM credibility items to next round

### Tier 1 compliance + tracking baseline wiring
- [x] Microsoft Clarity wired: project ID `waeobadji5` filled into [js/compliance.js](js/compliance.js#L41) (was empty TODO)
- [x] Per-page coverage verified: all 5 main pages (index, fuzehq, compliance-ux, docs-to-design, katipult) have GA4 (G-87HSHMKCBH) + cookie-consent.js + JSON-LD + og:image + Twitter card
- [x] _headers file confirmed: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, comprehensive CSP
- [x] robots.txt + sitemap.xml + custom 404.html present and current
- [x] /careers Disallow present in robots.txt

### Cleanup
- [x] /forms/ orphaned intake forms removed (intake-form.html, intake-form-v2.html, modal-trigger.js, thank-you.html — none linked from any main page, confirmed dead code)
- [x] STATUS.md refreshed: stale GA4 ID corrected, "No MZM Labs mentions" rule retired in favor of agency-context allowance, "No Solo anywhere" rule softened to repetition-aware, og:image and contact-form known issues resolved

### v3 SHIPPED TO PRODUCTION (2026-05-06)
- **Production SHA:** `661a3e7e335eebbc34a2fd474465fa173f098961` ✓ live at https://uxmeas.com
- **Rollback target:** `88851aa67e497c5ef5fe8c476457cd078cf82393` (pre-merge main HEAD)
- **CEO approval:** "go all" (this session, 2026-05-06) — satisfies M3 production-deploy-checklist
- **Promote chain:** dev → staging → main (fast-forward, no conflicts after correct ancestor sync)
- **33-commit batch:** override authorized — single-batch promote acceptable for static portfolio (no auth, no DB, no active users)

### Tier 1 preflight verdict
- **Staging (staging.uxmeas.pages.dev):** 9/10 PASS — pre-existing favicon.ico 404 only fail
- **Production (uxmeas.com):** 9/10 PASS — same profile, no regression
- All 6 items confirmed live on production: GA4 + Clarity + OG + Twitter + cookie consent + security headers + JSON-LD + branded 404 + robots/sitemap + favicon.svg
- Reframe content verified live: FuzeHQ "MZM Labs needed to ship" 2×, "human-collaboration layer" 2×, "Now anyone can collaborate" 2×; D2D "MZM Labs's client deliverables" 1×, "off the agency's plate" 1×
- No 500s, no cascading errors

### Compliance readiness: PASS — Tier 1
- Privacy Policy: https://uxmeas.com/privacy ✓
- Cookie Policy: https://uxmeas.com/cookies ✓
- Cookie consent banner: js/cookie-consent.js loaded on all 5 pages, blocks GA4+Clarity until accept (per js/compliance.js)
- WCAG: axe-core fixes per commit 2e83052 (re-verify on next round)
- DSR: contact via mailto:hello@uxmeas.com per privacy policy

### Cloudflare readiness: PASS
- Security headers verified on production URL: HSTS, CSP (incl. clarity.ms allowlist), X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy
- DNS pointing at healthy CF Pages services (uxmeas.com, dev.uxmeas.pages.dev, staging.uxmeas.pages.dev all 200)
- _headers file in repo root governs response headers
- robots.txt + sitemap.xml live and current

### Browser-only checks Pheak/Chloe still owe (not curl-verifiable)
- [ ] GA4 DebugView fires page_view (analytics.google.com/analytics/debugview)
- [ ] Clarity session lands in clarity.microsoft.com dashboard within 5 min (project waeobadji5)
- [ ] Cookie consent banner blocks GA4+Clarity until accept (DevTools Network tab on first visit)
- [ ] Cookie consent persists choice in localStorage on revisit

### Known minor gap (carry-over, not new regression)
- /favicon.ico → 404 (also 404 on previous production state). Tooling for proper .ico generation not available this session (Pillow blocked by PEP 668). Defer to next round with proper imaging tooling. Modern browsers use favicon.svg; impact limited to Windows shortcuts / older RSS readers / specific social embed contexts.

---

## What's DONE (April 14 session)

### Folder Consolidation (MZM-609)
- [x] Archived stale `uxmeas-portfolio-ui` (zero unique commits) to `_archive/uxmeas-portfolio-ui-2026-04-14/`
- [x] Archived corrupt `uxmeas-broken` (git object DB corrupt; all reachable commits already in uxmeas) to `_archive/uxmeas-broken-2026-04-14/`
- [x] Created tar snapshots under `_archive/uxmeas-consolidation-2026-04-14/`
- [x] `uxmeas` confirmed as canonical KEEPER: new look + Microsoft Clarity + MZM-402 a11y + MZM-321 production/ sync + gallery/device fixes already at `origin/dev` HEAD `74c080c`
- [x] `uxmeas-fresh` left untouched (separate Development monorepo worktree, out of scope)

### Compliance UX Stat Fix (MZM-605)
- [x] Replaced all semantic `60%` drop-off references with `65%` industry benchmark framing (Persona / Onfido, pre-2017)
- [x] Updated both source (`case-study/compliance-ux/index.html`) and published (`production/case-study/compliance-ux/index.html`) copies
- [x] Kept `85% completion` stat unchanged
- [x] Kept `$200 per failed verification` (Katipult data) — decoupled from industry baseline framing
- [x] Matches copy source of truth at `_copy/uxmeas.com/case-studies/compliance-ux.md`

---

## What's DONE (April 10 session)

### Board Audit (MZM-391)
- [x] Identified MZM-368 ("Wire Sage auto-loop QA pipeline") misassigned to uxmeas.com — DevOps/infra task, not portfolio
- [x] Commented on MZM-368 with fix instructions (manual unparent + move to FuzeHQ needed — API can't clear parentId)
- [x] Identified MZM-364 parented under done epic MZM-327 — commented, needs unparenting
- [x] Full board audit: all other uxmeas.com tasks correctly placed (MZM-31, MZM-22, MZM-17)
- [x] Created governance rule: `.claude/rules/task-project-alignment.md`

---

## What's NEXT

### Immediate (v3 promote chain — in flight)
- [ ] Local QA browser spot-check at localhost:8000
- [ ] Push dev → origin/dev (commits the May 6 work)
- [ ] Promote dev → staging (auto-deploys to staging.uxmeas.pages.dev or staging.uxmeas.com)
- [ ] Tier 1 compliance + tracking baseline preflight on staging URL (10-item gate per `staging-deploy-checklist.md` #4.5)
- [ ] CEO decision: 29-commit batch — override or split for staging→main promote
- [ ] Promote staging → main (fresh CEO confirm, rollback SHA documented)
- [ ] Tier 1 + tracking baseline preflight on production URL (uxmeas.com)
- [ ] Done-gate completion comments per done-gate-enforcement.md

### Next round (post-v3 ship)
- [ ] Pheak: Final print review of resume
- [ ] Pheak: Update LinkedIn profile manually
- [ ] Address remaining HM cold read items (D2D donut chart numbers, waitlist counts; FuzeHQ outcome metrics when externally bound)
- [ ] Add a Direct Contributions section to fuzehq.html per credit-attribution-boundary rule (currently missing)

### Portfolio — Future Sprint
- [ ] Build remaining 4 case studies (Lending, White-Label, Donations, 3 to IPO — enriched research ready)
- [ ] Add Playwright performance/file size tests
- [ ] Add Playwright tracking-baseline check script (auto-validate the 10-item gate)

---

## Known Issues
- Hero laptop images in case studies may need dark/light swap (compliance-ux currently shows light dashboard, dealflow shows dark — verify against .pen intent)
- D2D `+75% creative craft` donut metric (lines ~1398-1421) is unsourced personal estimate — flagged by HM cold read 2026-05-06; either anchor to a documented MZM Labs measurement or replace with honest estimate framing in next round
- D2D Canva + InDesign demand-signal waitlists referenced 3× in body without signup counts — quantify or rephrase next round
- FuzeHQ outcome stats (449 / 51% / 13) are inputs measured in own workspace, not external user-impact metrics — acceptable for solo-tenant pre-launch but flag for when externally-bound metrics become available

## Resolved (2026-05-06)
- og:image now present on all 5 main pages (index + 4 case studies) ✓
- Contact form: confirmed `mailto:hello@uxmeas.com` on every page — no backend, no Netlify Forms dependency, works identically on CF Pages ✓
- /forms/ orphaned intake forms removed as dead code ✓
- Microsoft Clarity wired with project ID waeobadji5 ✓

---

## Rules
- Resume is source of truth for all copy — portfolio, .pen, content maps align TO it
- Content governance: copy file → .pen → code (never skip steps)
- Case studies built FROM .pen designs
- Pheak = "Product Design Consultant" at MZM Labs — never "Co-Founder"
- Katipult "Co-founder" is fine everywhere — company no longer exists (historical credential)
- MZM Labs business context IS allowed in case studies (per agency-frame reframe 2026-05-06) — frames the work as "MZM Labs needed X to deliver client work, I led design"; do NOT promote MZM Labs as a separate company entity / standalone product
- "Solo" allowed as a stat label (D2D hero) and one-time ownership claim per case study; do NOT repeat "Solo, end-to-end" or similar 4+ times in any single case study (HM cold read flagged repetition as defensive)
- Light mode disabled (commit 59052f1, 2026-05-06) — do NOT reintroduce data-theme=light logic until transparent-PNG screens ship
- main branch = live site — never push without Sage QA + Pheak approval
- Review gate: Nothing submitted without Pheak's approval
- Resume accuracy: Every fact verified with Pheak (AMTC incident)
