# Design Diff Report — .pen v2 vs Staging

**Date**: 2026-03-28
**Audited by**: CoWork
**Source**: design-diff/compare.html (pen-v2/ vs staging/)

---

## PAGE 1: PORTFOLIO (Homepage)

### Hero Section
- [ ] Change hero alignment from center to LEFT-aligned
- [ ] Remove `margin: auto` / `justify-content: center` on hero container
- [ ] Update subtitle copy: "16 years of shipping products. From startup to IPO." (remove italic)
- [ ] Add blue/teal radial gradient glow in upper-right quadrant of hero
- [ ] Remove scroll-down chevron indicator

### Selected Work Section — ENTIRELY MISSING
- [ ] Build pill-label "SELECTED WORK"
- [ ] Build two-column card grid (Compliance UX + DealFlow)
- [ ] Each card: screenshot thumbnail, category tags, title, description, metrics, process steps

### About Section — ENTIRELY MISSING
- [ ] Build pill-label "ABOUT"
- [ ] Build heading + "Product Designer & Builder" subtitle (copper)
- [ ] Three body-text paragraphs
- [ ] Four stat cards: 16/Years, $50M+/Processed, TSX/Venture Exchange, 20+/Jurisdictions

### Specializations Section — ENTIRELY MISSING
- [ ] Build pill-label "SPECIALIZATIONS"
- [ ] Three equal-width cards: Fintech UX, Design Systems, Product Strategy

### CTA Section — ENTIRELY MISSING
- [ ] Build pill-label "LET'S WORK TOGETHER"
- [ ] Large headline: "LOOKING FOR A SENIOR ROLE..."
- [ ] "Canada · Remote"
- [ ] Two buttons: "GET IN TOUCH" (copper) + "VIEW LINKEDIN" (outlined)

### Footer
- [ ] Change "UX Meas" to "Pheak Meas" in copyright
- [ ] Remove "hello@uxmeas.com" link

---

## PAGE 2: COMPLIANCE UX

### Navigation
- [ ] Remove full site nav (WORK · ABOUT · CONTACT)
- [ ] Replace with logo + inline tag breadcrumbs

### Hero
- [ ] Fix broken Katipult logo image
- [ ] Replace "about block + person photo" with laptop mockup image

### Section Labels (ALL)
- [ ] Change from full-width horizontal-line labels to pill/badge style

### KSign
- [ ] Update image to match .pen KSign mockup

### UI Showcase
- [ ] Change from compact thumbnail grid to full-width individual screenshots

### Results
- [ ] Replace dark grid with light-themed dashboard screenshot

### Next Case Study
- [ ] Verify button labels match exactly

---

## PAGE 3: DEALFLOW

### Hero
- [ ] Fix broken logo image
- [ ] Update stat labels to exact .pen wording
- [ ] Update description copy to match .pen

### Challenge Section
- [ ] Change title: "MANAGING DEALS AT ENTERPRISE SCALE"
- [ ] Replace metrics with: $2B+, 150+, 5 ROLES

### Research Table
- [ ] Change columns to: Metric | Business Problem | User Need

### Competitor Section
- [ ] Remove category label tags from cards

### Platform/Dashboard Sections
- [ ] Fix ALL broken placeholder images
- [ ] Update section headings

### Results
- [ ] Replace metrics with: 3→49+, IPO, 20+, 6

### Next Case Study
- [ ] Update to "AKMSecure — Brand to Browser in 8 Weeks"

---

## PAGE 4: AKMSECURE

### Hero
- [ ] Consolidate tags to single-row inline layout
- [ ] Apply condensed bold uppercase typeface
- [ ] Remove duplicated description/stats

### About the Client
- [ ] Remove tab navigation
- [ ] Restructure to two-column (text left, images right)

### Typography & Color
- [ ] Simplify to match .pen compact layout

### Website
- [ ] Consolidate to single screenshot

### Print Collateral
- [ ] Fix broken image paths

### Next Case Study
- [ ] Fix: currently links to itself. Should link to RelationSync

---

## PAGE 5: DOCS TO DESIGN

### Hero
- [ ] Change title to "DOCS TO DESIGN" in condensed uppercase
- [ ] Add actual plugin screenshot (replace placeholder)

### Challenge
- [ ] Change heading to "THE UNIVERSAL PAIN POINT"
- [ ] Add plugin screenshot

### Wizard
- [ ] Add "FIVE STEPS, ZERO FRICTION" heading

### Compact Pro
- [ ] Add actual plugin screenshot

### Brand Identity
- [ ] Change heading to "COPPER TO TEAL"

### Results
- [ ] Change heading to "THE NUMBERS THAT PROVED IT WORKED"

### Next Case Study
- [ ] Fix: links to itself. Should link to IsoBlock

---

## PAGE 6: MYPICK.IO

### Hero
- [ ] Update stats: 4 Terrains, 4 Weather, 17 Audio Files, 0 Dependencies
- [ ] Remove triple phone mockups, add correct hero image

### Problem Section
- [ ] Remove section numbering prefix

### Build Section
- [ ] Change to "THE BUILD" with 3×2 grid
- [ ] Update stat values

### Full Experience
- [ ] Change heading to "THE FULL EXPERIENCE"

### CTA
- [ ] Update to "TRY MYPICK.IO" with matching button text

---

## PAGE 7: RELATIONSYNC

### Hero
- [ ] Remove phone mockups from hero
- [ ] Move tags to top, inline text

### About
- [ ] Remove tab navigation system

### Philosophy
- [ ] Remove "Remember what matters." section (not in .pen)

### Onboarding
- [ ] Change heading to "THE FIRST 60 SECONDS DECIDE EVERYTHING"

### Key Screens
- [ ] Change heading to "EVERY SCREEN DESIGNED IN PENCIL"

### Design System
- [ ] Remove separate Design System section (not in .pen)

### CTA
- [ ] Update to "NEXT CASE STUDY — MyPick.io"

---

## PAGE 8: ISOBLOCK

### Hero
- [ ] Apply condensed uppercase typeface: "ISOBLOCK"

### Section Labels
- [ ] Remove dot prefixes and breadcrumb formatting
- [ ] Use simple text labels

### Problem
- [ ] Change heading to "WHY ISOMETRIC IS HARD IN FIGMA"

### Plugin Interface
- [ ] Change heading to "VERTICAL SIDEBAR, 300PX WIDE"

### Results
- [ ] Change heading to "MEASURABLE OUTCOMES"

### Footer CTA
- [ ] Update to full description format

---

## GLOBAL FIXES

- [ ] Condensed bold typeface (Bebas Neue) must load and apply to ALL h1/h2 headings
- [ ] ALL section labels → pill/badge style (not horizontal-line)
- [ ] Fix ALL broken images across all case studies
- [ ] Fix ALL "Next Case Study" links to point to correct project
- [ ] Homepage footer: "Pheak Meas" not "UX Meas", remove email link

---

## ROUND 2 FEEDBACK (CoWork - DealFlow + AKMSecure)

### DEALFLOW — Content is completely rewritten between .pen and staging
- Copy tells different story (builder/infrastructure vs investor-outcome)
- Stats are different data sets
- Research table has different columns and data
- HMW statement is different
- Results metrics are completely different
- Multiple broken images
- Next case study footer incomplete

### AKMSECURE
- Duplicated stat row (bug)
- About section: narrative vs formal, missing screenshots
- Typography section: missing usage descriptions
- Website section: different heading, different showcase layout
- Print collateral: broken/faded images
- Hero has placeholder in .pen but rendered hero on staging

