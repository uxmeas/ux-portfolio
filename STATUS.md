# uxmeas.com — Project Status

**Last updated**: 2026-03-27 (evening — staging deployed)
**Priority**: #1 (PRIMARY — revenue driver)
**Stage**: Staging deployed — case studies ready for review

---

## What EXISTS (do NOT recreate)

### Portfolio Site (LIVE)
- https://uxmeas.netlify.app
- Static HTML/CSS/JS, deployed on Netlify
- Contact: inline form (Netlify Forms)

### Case Studies (7 — IN PROGRESS)
Designed in Pencil at `Pencil/uxmeas-portfolio.pen`:
1. Compliance UX (node: zw5Ei)
2. Katipult DealFlow (node: PW1oJ)
3. AKMSecure (node: n3rto)
4. RelationSync (node: 52206)
5. MyPick.io (node: v4u6R)
6. Docs to Design (node: siX2x)
7. IsoBlock (node: 6mdKh)

Each is 1440px wide, spaced 1520px apart at y=3800.

### Design System
- Behance-style modal: 92vw / max-width 1440px, 8px radius
- Per-project CSS tokens (cs--compliance, cs--dealflow, etc.)
- Fonts: Inter for case studies, Space Grotesk for shell
- Layout: label bar → two-column (320px left / flex right) → gallery rows → results → CTA

### Existing Docs
- PROJECT-STATUS.md (older version)
- DEPLOY-CHECKLIST.md
- PLAYBOOK.md
- Multiple strategy/setup docs

## Staging URLs (deployed 2026-03-27)
- https://staging--uxmeas.netlify.app/case-studies/compliance-ux.html
- https://staging--uxmeas.netlify.app/case-studies/katipult-dealflow.html

## What's DONE
- Site shell and navigation
- Modal interaction pattern
- 7 case study frames designed in .pen (all node IDs documented in memory)
- Design tokens per project (cs--compliance, cs--dealflow, etc.)
- Accessibility: focus-visible, reduced-motion, ARIA
- Added to Paperclip as Priority 1 project
- STATUS.md created
- MZM-15 created: build case study HTML from .pen designs
- MZM-16 created: test contact form e2e
- Kai ran MZM-23: design QA on case study pages vs .pen
- Kai screenshotted .pen designs (MZM-40) — handoff screenshots in workspace
- Max built case study HTML matching .pen designs (MZM-43)
- Max integrated HTML + deployed to staging (MZM-49) — commit `110604a` on dev, merged to staging
- **Compliance UX + DealFlow case studies live on staging**

## What's NEXT
- [ ] Review staging against .pen designs (visual QA)
- [ ] Promote staging → main (go live) — needs Pheak approval
- [ ] Build remaining 5 case study HTML pages (AKMSecure, RelationSync, MyPick, Docs to Design, IsoBlock)
- [ ] Implement modal content for each project
- [ ] Job hunting collateral (resume, cover letter templates)
- [ ] Contact form testing

## Rules
- Case studies built FROM .pen designs — do not invent layouts
- 1/3 copy · 2/3 graphic rule for mixed-content columns
- No orphan words
- Hide AI tools (NB2, Claude Code) — show industry tools (Figma, design systems)
- Pheak = "Product Design Consultant" — never "Co-Founder"
- No MZM Labs mentions on uxmeas.com
