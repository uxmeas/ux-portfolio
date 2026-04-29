# uxmeas.com — Product Specification
Last updated: 2026-04-07

THIS IS THE SOURCE OF TRUTH. All implementation must match this document. If code conflicts with this spec, update this spec to reflect reality and note the discrepancy, then resolve it.

---

## Identity

| Field | Value |
|-------|-------|
| Site name | UX Meas |
| Owner | Pheak Meas |
| Title on site | Senior Product Designer |
| Tagline | "18 years. Startup to IPO. Still shipping." |
| Live URL | https://uxmeas.com |
| Alternate URL | https://uxmeas.netlify.app |
| GitHub | Private repo (`uxmeas/ux-portfolio`) |
| Deploy platform | Netlify |
| Publish folder | `production/` |
| GA4 property | G-87HSHMKCBH |

---

## Architecture

### Stack
- Static HTML/CSS/JS (no build step, no framework)
- Netlify for hosting and Forms
- Google Fonts (Inter, Bebas Neue, Space Grotesk)
- Lucide Icons (UMD CDN, v1.6.0)
- Google Analytics 4 (consent-gated)

### File Structure
```
uxmeas/
├── production/           # ONLY deployed files go here (Netlify publish root)
│   ├── index.html        # Homepage (single-page portfolio)
│   ├── portfolio.html    # Alternate portfolio entry point
│   ├── 404.html          # Custom error page
│   ├── privacy.html      # Privacy policy
│   ├── cookies.html      # Cookie preferences
│   ├── terms.html        # Terms of use
│   ├── robots.txt        # Crawler rules
│   ├── sitemap.xml       # XML sitemap
│   ├── favicon.svg       # Site favicon
│   ├── health.json       # Health check endpoint
│   ├── css/
│   │   ├── portfolio.css      # Shell design system
│   │   ├── case-study.css     # Case study shared styles
│   │   └── case-study-page.css
│   ├── js/                    # JavaScript modules
│   ├── images/                # All images and assets
│   │   ├── covers/            # Card thumbnail images
│   │   ├── devices/           # Device frame images
│   │   ├── og-image.png       # Open Graph image
│   │   └── {project}/         # Per-project image folders
│   ├── case-study/            # Case study HTML (loaded via fetch)
│   │   ├── compliance-ux/index.html
│   │   ├── dealflow/index.html
│   │   ├── akmsecure/index.html
│   │   ├── multipaste/index.html
│   │   ├── docs-to-design/index.html     (ghost — not yet published)
│   │   ├── isoblock/index.html           (ghost — not yet published)
│   │   ├── relationsync/index.html       (ghost — not yet published)
│   │   └── mypick/index.html             (ghost — not yet published)
│   └── forms/                 # Netlify form configs if needed
├── careers/              # NOT deployed — resume and cover letters only
│   ├── resume.html
│   ├── _templates/
│   └── {company}/
├── netlify.toml          # Netlify config
├── BRIEF.md              # Product brief
├── PRD.md                # Product requirements
├── PRODUCT-SPEC.md       # This file — source of truth
├── STATUS.md             # Session state tracker
└── tests/                # Playwright tests
```

### Deployment
- Push to `main` branch → Netlify auto-deploys `production/` folder
- Git flow: `dev → staging → main`
- Never push directly to `staging` or `main`
- `careers/` folder is never deployed (local only)

---

## Design System

### Typography
| Font | Use | Weights |
|------|-----|---------|
| Bebas Neue | Display, nav logo, mobile menu | 400 |
| Inter | Body, case study content | 400, 500, 600, 700 |
| Space Grotesk | Shell labels, metadata | 400, 500, 600 |

### Color Tokens (Shell — Charcoal + Copper)
```css
:root {
  --bg-deep:        #141419;
  --bg-card:        #1C1C24;
  --bg-surface:     #26262F;
  --accent:         #D4915E;
  --accent-hover:   #C07D4A;
  --accent-light:   #F5E6D8;
  --accent-muted:   #8B6E52;
  --text-primary:   #F0F0F2;
  --text-secondary: #9298A0;
  --text-muted:     #5C6270;
  --border:         #2E2E3A;
  --white:          #FFFFFF;
  --section-light:  #F5F5F7;
}
```

### Typography Scale (Case Studies — Fixed px at 1440px)
```css
--type-hero:     80px;   /* Hero titles only */
--type-stat:     64px;   /* Stat numbers */
--type-section:  56px;   /* Section headings */
--type-subtitle: 22px;   /* Subtitles */
--type-body:     18px;   /* Body text */
--type-caption:  16px;   /* Supporting text */
--type-label:    14px;   /* Tags, metadata */
```
DO NOT use clamp() at desktop (1440px). Use fixed px values from this spec.

### Spacing Tokens (Case Studies)
```css
--space-sm:         32px;   /* Label→title gap */
--space-md:         40px;   /* Stats→subtitle gap */
--space-lg:         48px;   /* Section children gap */
--space-xl:         64px;   /* Subtitle→device, column gaps */
--space-hero-top:   100px;  /* Hero top padding */
--space-section-y:  100px;  /* Section vertical padding */
--space-side:       120px;  /* Section horizontal padding */
--table-cell-pad:   24px;
--table-col-gap:    32px;
```

### Layout Constants (Case Studies)
- Content width: 1200px (1440 total - 120px left padding - 120px right padding)
- Column gap: always 64px
- Section padding: 100px top/bottom, 120px sides
- Badge to first content: 48px

### Column Patterns (within 1200px content)
| Pattern | Left | Gap | Right |
|---------|------|-----|-------|
| 50/50 text | 568px | 64px | 568px |
| Challenge | 500px | 64px | 636px |
| 1/3 + 2/3 | 380px | 64px | 756px |
| 2/3 + 1/3 (zigzag) | 756px | 64px | 380px |

### Background Gradients
**Shell / Compliance UX / DealFlow (navy):**
```css
background:
  radial-gradient(circle 700px at 60% 6%, #243352 0%, transparent 100%),
  radial-gradient(circle 700px at 25% 20%, #1E2D45 0%, transparent 100%),
  /* ... alternating positions ... */
  #141419;
```

**AKMSecure (charcoal):**
- Base: `#0A0A0A`, glow centers: `#1A1A1E`, `#161618`

**Docs to Design (copper-teal):**
- Base: `#0C0C0C`, glow centers: `#2A1E15` (copper), `#152A28` (teal)

---

## Project Registry

| Key | CSS Class | Slug | Status | Accent |
|-----|-----------|------|--------|--------|
| compliance | `cs--compliance` | `compliance-ux` | LIVE | Gold `#C9A227` |
| dealflow | `cs--dealflow` | `dealflow` | LIVE | Gold `#C9A227` |
| akm | `cs--akm` | `akmsecure` | LIVE | Grey `#9CA3AF` |
| multipaste | `cs--multipaste` | `multipaste` | LIVE | (in CSS) |
| relationsync | `cs--relationsync` | `relationsync` | GHOST | Purple (in CSS) |
| mypick | `cs--mypick` | `mypick` | GHOST | (in CSS) |
| docstodesign | `cs--docstodesign` | `docs-to-design` | GHOST | Copper `#D4915E` |
| isoblock | `cs--isoblock` | `isoblock` | GHOST | (in CSS) |

### JavaScript Arrays (index.html)
```js
const projectKeys = ['compliance', 'dealflow', 'akm', 'multipaste', 'relationsync', 'mypick', 'docstodesign', 'isoblock'];

const slugMap = {
  'compliance':   'compliance-ux',
  'dealflow':     'dealflow',
  'akm':          'akmsecure',
  'relationsync': 'relationsync',
  'mypick':       'mypick',
  'docstodesign': 'docs-to-design',
  'isoblock':     'isoblock',
  'multipaste':   'multipaste'
};
```

---

## Modal System Specification

### Dimensions
- Width: 92vw
- Max-width: 1440px
- Border-radius: 8px
- Overlay: `rgba(0,0,0,0.9)`

### Behavior
- Opens on live card click
- Content loaded via JS fetch from `/case-study/{slug}/index.html`
- CSS injected into `<head>` once per session (cached)
- HTML body cached in memory after first load
- CSS class `cs--{key}` applied to `.modal-panel` root for theming
- URL hash updated on open: `#compliance`, `#dealflow`, etc.
- Keyboard: Escape to close, ArrowLeft/ArrowRight for prev/next
- Buttons: prev/next arrows on panel sides, X close button top-right

### Loading State
- Centered loader bar displayed while fetch is in progress
- Error state shown if fetch fails

### Deep Link
- `?project={key}` query param opens specified case study on page load

---

## Case Study Section Structure

Each case study follows this section pattern (may vary by project):
1. Hero — title, stats, subtitle, device mockup
2. Challenge — problem statement, metric cards
3. Design Approach — research, HMW, research table
4. User Flow / Process — flow diagram, step cards
5. Product Feature — zigzag layout (graphic + copy)
6. UI Showcase — screenshot gallery (2x2 grid)
7. Results — outcome stats + final screen
8. CTA Footer — next case study link, back to portfolio

### CTA Footer Pattern
- Divider line (accent color), centered
- "Next Case Study" title
- Next project name
- Description of next project
- Two buttons: "View Project" + "Back to Portfolio"
- "uxmeas.com" footer label

---

## Device Mockup Rules

```css
.device-composited { /* baked-in device frames — no border override */
  border: none;
}
.device-mockup {    /* standalone screenshots — apply frame border */
  border: 3px solid var(--border);
  border-radius: 8px;
}
```

### Device Sizes at Desktop (1440px)
- Hero MacBook: 1200 × 740px (inside 1200 × 804 wrapper)
- Phone pair: individual phones 220px wide, inside 756px column
- iPad/Tablet: 480px wide, centered in 756px column
- Floating screen: 756 × 480px in 2/3 column

### Mobile Device Rules
- MacBook screen: `top: 10%`, `height: 72%` (percentage-based, not calc)
- Browser bar: hidden on mobile (too small to render legibly)
- Tablet breakpoint (1024px): reduced calc offsets

---

## Analytics

- Platform: Google Analytics 4
- Property ID: G-87HSHMKCBH
- Consent: Google Consent Mode v2, default denied
- Consent storage key: `localStorage` → `uxmeas_consent`
- Fires on: page views, virtual page views per modal open

---

## Performance

- Images: WebP format, compressed
- Card thumbnails: 4:3 aspect ratio
- Font loading: `display=swap` on Google Fonts
- Static caching headers (via netlify.toml):
  - `/images/*`: `max-age=31536000, immutable`
  - `/*.css`: `max-age=31536000, immutable`
  - `/*.js`: `max-age=31536000, immutable`

---

## Security Headers (netlify.toml)

```
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

---

## Content Governance

Copy source of truth lives at `_copy/uxmeas.com/index.md`.

Update sequence (never skip steps):
1. Edit `_copy/uxmeas.com/index.md`
2. Update `.pen` screens in `uxmeas-portfolio.pen`
3. Update `production/` HTML files
4. Deploy

---

## Messaging Locked Values

These values are final. Do not change without updating this spec first.

| Element | Locked Value |
|---------|-------------|
| Title | Senior Product Designer |
| Years of experience | 18 |
| Hero tagline | "18 years. Startup to IPO. Still shipping." |
| Meta description | "Co-founded a fintech company that went from 3 people to a TSX-V IPO. 18 years shipping products across fintech, compliance, and enterprise software." |
| Stats row | 18 YEARS · $2B+ PROCESSED · TSX-V LISTED · 20+ JURISDICTIONS |
| Katipult role | "Co-founder & Lead Product Designer" |
| MZM Labs role | "Product Design Consultant" (never Co-Founder) |
| AKMSecure role | "Design Consultant" |

---

## Rules

- Resume is the source of truth for all copy. Portfolio, .pen, and content maps align TO the resume — never the reverse.
- No MZM Labs mentions anywhere on uxmeas.com.
- No "Solo" anywhere.
- No italics anywhere.
- Case studies are built FROM .pen designs, not invented separately.
- `main` branch = live site. Never push without Sage QA pass and Pheak's explicit deploy approval.
- `careers/` folder is never deployed. It is local-only.
- Every resume fact must be verified with Pheak before publishing (AMTC incident precedent).
- Nothing gets submitted in a job application without Pheak's explicit review and approval.

---

## Design Source

- Pencil file: `uxmeas-portfolio.pen`
- Location: `Pencil/uxmeas-portfolio.pen` (local, not in repo)
- Contains: homepage design + all case study designs
- MultiPaste node: `ynJWC`
- All layout values in this spec are extracted from the .pen file via Pencil MCP

---

## Known Issues (as of 2026-04-07)

| Issue | Impact | Status |
|-------|--------|--------|
| og:image not verified live | Social sharing may show no image | Open |
| Netlify Forms notification not configured | Contact submissions not emailed | Open |
| Compliance UX: conflicting drop-off stats (50% vs 60%) | Inaccurate case study content | Open |
| Hero laptop images may need dark/light swap | Visual mismatch vs .pen intent | Open |
| 4 case studies not yet built | Ghost cards cannot be activated | Open |
