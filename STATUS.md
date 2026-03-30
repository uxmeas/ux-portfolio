# UX Meas — Project Status

**Last updated**: 2026-03-30
**Priority**: #1a (job hunting + portfolio)
**Stage**: LIVE — production deployed
**Owners**: Ana (delivery gates), Rio (job hunting status + marketing), Kai (design QA)

---

## What EXISTS (do NOT recreate)

### Portfolio Site (LIVE)
- https://uxmeas.com (Netlify, auto-deploys from main)
- Static HTML/CSS/JS
- Contact: inline form (Netlify Forms)
- GA4: G-9HVVW1GBEC

### Case Studies (3 LIVE, 4 COMING SOON)
Designed in Pencil at `Pencil/uxmeas-portfolio.pen`:
1. **Compliance UX** (LIVE) — full .pen rewrite, responsive, GA4
2. **Katipult DealFlow** (LIVE) — full .pen rewrite, responsive, GA4
3. **AKMSecure** (LIVE) — built March 29, polished March 30
4. Docs to Design — ghost card
5. IsoBlock — ghost card
6. RelationSync — ghost card
7. MyPick.io — ghost card (last, personal project)

### HTML Resume (NEW — March 30)
- `uxmeas/resume.html` — tokenized HTML resume with left panel controls
- 3 presets: Default (9pt), Spacious (9.5pt), Dense (8.5pt)
- 30+ CSS custom properties for type, spacing, layout
- Left panel: number inputs for all tokens, preset toggle, Print + Save PDF buttons
- B&W print safe (copper → dark gray in @media print)
- Orphan prevention (text-wrap: pretty + &nbsp; guards)
- Two-column layout on both pages (skills left, experience right)
- Cover letter template at `careers/_templates/cover-letter.html`

### Careers Folder (NEW — March 30)
- `uxmeas/careers/` — per-company application folders
- `careers/_templates/resume.html` + `cover-letter.html`
- `careers/STATUS.md` — application tracker
- Paperclip project "Careers" linked (#13)

### Homepage
- 3 live interactive cards (Compliance UX, DealFlow, AKMSecure)
- 4 ghost "COMING SOON" cards (dimmed, no click, aria-hidden)
- Behance-style modal with fetch-based case study loading
- Stats: 16 Years, $2B+, TSX-V, 20+ Jurisdictions

### Design System
- Behance-style modal: 92vw / max-width 1440px, 8px radius
- Per-project CSS tokens (cs--compliance, cs--dealflow, cs--akm, etc.)
- Fonts: Inter for case studies, Bebas Neue for display, Space Grotesk for shell
- Device frames: phone 170px/22px radius/6px bezel, iPad 480px/24px radius

---

## Job Hunting (Rio Tracks)

### Strategy & Voice
- [x] `Client-Projects/job-hunting-strategy.md` — Master strategy (updated March 30)
- [x] `my-skills/job-hunting-voice/SKILL.md` — Voice, templates, rate card (updated March 30)
- [x] All sprint task files cleaned: title, case studies, AKM framing, dates (March 30)

### Firecrawl Intel Pipeline
**Report**: `_archive/docs-cleanup-march-2026/firecrawl-job-intel-play1.md`

#### Play 1 (DONE — March 26)
- 12 companies scraped. Tier 1: Coinbase ($180-212K), Binance ($155-175K), Forward Financing ($150-175K)
- Keywords: "cross-functional" (100%), "design system" (83%), "compliance" (42%)

#### Play 1 Language Changes (NOT YET APPLIED to uxmeas.com)
- "designed UI" → "owned product design from discovery through delivery"
- Add: "Shipped to production", "Compliance-first design", data-informed signals

### Rate
- **$100/hr USD anchor** (confirmed March 30)
- $80+ CAD from agencies. $75-85 USD for Upwork bootstrapping only.

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

## What's DONE (March 30 session)

### Data Accuracy Fixes (CRITICAL)
- [x] "SAIT Polytechnic" → "Applied Multimedia Training Centre" (old resume was wrong)
- [x] "EV Entrepreneur" → "EY Entrepreneur Of The Year" (typo)
- [x] "11 years" → "9 years" (founding to IPO = 2008-2017, not 11 years)
- [x] AKMSecure: "8 weeks" removed, reframed as consulting engagement (~5 months, Oct 2025-Feb 2026)
- [x] Email: pheak@uxmeas.com → hello@uxmeas.com
- [x] "Solo" removed from all production files and .pen
- [x] All fixes propagated across: resume, voice skill, strategy doc, sprint tasks, LinkedIn copy, .pen file
- [x] Accuracy safeguard rule saved to memory

### .pen File Fixes
- [x] DealFlow CTA: 2008-2023 → 2008-2025 (node zApr2)
- [x] Compliance UX CTA: 2014-2023 → 2008-2025, title fixed (node 73IA2)
- [x] AKMSecure CTA: "Solo" removed, title fixed (node YvfEi)

### Resume Built
- [x] HTML resume with tokenized design system
- [x] Left panel with number inputs (not sliders), preset switcher, Print + Save PDF
- [x] B&W print safe, orphan prevention, two-column layout both pages
- [x] Cover letter template matching resume design
- [x] Careers folder + Paperclip project created

### Production Fixes (NOT YET PROMOTED TO LIVE)
- [x] "Solo" removed from portfolio.html, mypick/index.html, isoblock/index.html
- [x] Duplicate "Shipped" tag fixed
- [x] Sage QA passed — ready to promote when Pheak approves

---

## What's NEXT

### Immediate
- [ ] Pheak: Final print review of resume
- [ ] Promote Solo removal fixes: dev → staging → main
- [ ] Execute sprint tasks (2, 7, 1, 4)
- [ ] Pheak: Update LinkedIn profile manually

### Portfolio
- [ ] Build remaining 4 case studies
- [ ] Apply Play 1 language changes to live case studies
- [ ] Create og:image

---

## Known Issues
- Compliance UX: conflicting drop-off stats (50% vs 60%)
- og:image missing
- Contact form untested / Netlify Forms notification not set up
- Tasks 3-8 still reference "7 case studies" (tasks 1-2 cleaned)

---

## Rules
- Case studies built FROM .pen designs
- Pheak = "Product Design Consultant" — never "Co-Founder" (except Katipult historical)
- No MZM Labs mentions on uxmeas.com
- No "Solo" anywhere
- main branch = live site — never push without approval
- Review gate: Nothing submitted without Pheak's approval
- Resume accuracy: Every fact verified with Pheak (AMTC incident)
