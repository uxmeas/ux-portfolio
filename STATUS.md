# uxmeas-portfolio-ui — Project Status

**Last updated**: 2026-04-10
**Priority**: #1 (PRIMARY — job search)
**Stage**: Dev branch deployed — 12 case studies live, awaiting Vendy review

---

## What EXISTS

### Portfolio Site (DEV)
- https://dev--uxmeas.netlify.app
- Static HTML/CSS/JS, deployed on Netlify from dev branch
- 12 case study pages + homepage
- MZM Labs token system (Space Grotesk, dark theme, CSS custom properties)

### Case Studies (12)
1. Compliance UX — KYC/AML onboarding (45→12min, 85% completion)
2. DealFlow — Deal management ($2B+, Canaccord/Raymond James/Echelon)
3. Donations & Rewards — White-label crowdfunding SaaS (InvestYYC, ATB Booster)
4. Lending — Private lending module (equity → debt extension)
5. FuzeHQ — AI team management (9 agents, 14 MCP tools)
6. MultiPaste — Figma text distribution plugin
7. MockupKit — Figma device mockup plugin (DLT homography)
8. Docs to Design — Document-to-design wizard
9. MyPick.io — Visual elimination randomizer (NOT "game")
10. RelationSync — AI voice journal for therapists
11. AKMSecure — Brand identity + website
12. IsoBlock — Blender isometric plugin

### Design System
- css/tokens.css — all values tokenized, zero hardcoded
- css/base.css — reset, typography, utilities, sticky nav, breadcrumbs
- css/case-study.css — 13-section template with glow borders
- Resend.com benchmark applied (transparent cards, glass borders, subtle badges)

### Local Tools (not in git)
- token-preview.html — live token switcher
- tokens/ — 21 scraped brand token files (growing to 200+)
- scripts/ — Firecrawl scraping + conversion tools

## What's DONE

### MZM-321: Critical Technical Fixes (April 9-10, staging)
- Broken Behance-style modal replaced with direct links to standalone pages (MZM-325)
- RelationSync, MyPick, "More Coming" cards removed — 3 active cards remain (MZM-326)
- Hero h1 accessibility fix — space before `<br>` for screen readers (MZM-322)
- All inline JS (~970 lines) externalized to `js/main.js` (148 lines, defer) (MZM-323)
- Card contrast increased, meta description forward-looking, hero 88vh (MZM-324)
- Sage QA pass (MZM-329) — 13-point checklist all green
- Pushed to dev (`bd156ae`), production/ folder synced (`0e4ce44`)
- Staging promotion blocked by branch history divergence — needs force-push coordination
- File reduced 74%: ~2715 → ~983 lines

### V3 Rebuild (separate agent)
- 12 case study pages built and deployed to dev
- CoWork design audit applied (typography, spacing, hierarchy)
- Resend visual polish (glass borders, transparent cards, pill badges)
- Client testimonials with press release sources
- Collaborative tone (Vendy directive)
- LendR references removed (unapproved ATB project)
- Enriched Katipult content (17 clients, 97% retention, regulatory specifics)
- Token consistency audit (zero hardcoded values in CSS)
- 260+ inline styles moved to CSS classes
- Favicon, robots.txt, sitemap.xml, 404.html
- OG tags on all pages
- Breadcrumb navigation
- Text width capped at 680px for legibility
- Lucide icons on insight cards
- Logo on all pages
- Design token library started (21 sites scraped)

## What's NEXT
- [ ] Vendy reviews 4 Katipult case studies (copy accuracy, framing)
- [ ] MZM-362: Mobile responsive audit (Sage)
- [ ] MZM-363: WCAG contrast + legibility audit (Sage)
- [ ] MZM-364: Performance / Lighthouse audit (Sage)
- [ ] MZM-365: Playwright E2E tests (Sage)
- [ ] MZM-368: Wire Sage auto-loop QA pipeline
- [ ] MZM-373: Scrape remaining 179 sites for token library
- [ ] Replace image placeholders with real screenshots
- [ ] CEO picks final visual direction from token library

## Rules
- No CPO/Chief titles — function-based only
- Collaborative tone — "our team" default, "I" for leadership context
- No LendR references — unapproved ATB project
- MyPick is a RANDOMIZER, never "game"
- Pheak = "Product Design Consultant" — never "Co-Founder" on uxmeas.com
- Task before execution — always create FuzeHQ task first
- Token-first — never hardcode values in component CSS
- Sage QA on every push
- Dev branch only — no staging/main without CEO approval
