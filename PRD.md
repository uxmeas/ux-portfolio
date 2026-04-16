# uxmeas.com — Product Requirements Document
Last updated: 2026-04-07

---

## Overview

uxmeas.com is a static portfolio site that showcases Pheak Meas's product design work. It is built from a Pencil design source (`uxmeas-portfolio.pen`), compiled to HTML/CSS/JS, and deployed to Netlify from the `production/` folder.

---

## Pages

### 1. Homepage (`/`)
File: `production/index.html`

**Sections:**
- Navigation (fixed, transparent → frosted glass on scroll)
- Hero (name, title, tagline, stats)
- About (brief bio, photo/graphic)
- Work (project card grid)
- Contact (Netlify Forms)
- Footer

**Acceptance Criteria:**
- [ ] Page loads under 3 seconds on mobile (3G)
- [ ] All 4 live project cards open modal correctly
- [ ] Ghost cards are non-interactive (aria-hidden, no pointer events)
- [ ] Contact form submits to Netlify Forms without JS errors
- [ ] GA4 fires only after consent is granted (Google Consent Mode v2)
- [ ] No console errors on load
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] Nav collapses to hamburger at mobile breakpoint

### 2. Portfolio Page (`/portfolio.html`)
File: `production/portfolio.html`

**Note:** Alternate entry point. Shares the same project grid and modal system as the homepage.

### 3. Case Studies (fetched inline)
Files: `production/case-study/{slug}/index.html`

Active slugs:
- `compliance-ux`
- `dealflow`
- `akmsecure`
- `multipaste`

Ghost slugs (not yet published):
- `docs-to-design`
- `isoblock`
- `relationsync`
- `mypick`

**Acceptance Criteria:**
- [ ] Case study HTML loads via JS fetch into modal panel
- [ ] Per-project CSS theme applies correctly (see CSS Tokens section)
- [ ] No layout breakage on mobile (375px)
- [ ] MacBook device frame renders correctly at mobile (percentage-based positioning)
- [ ] No shimmer overlays blocking hero images
- [ ] CTA footer links to next case study and back to portfolio

### 4. Legal Pages
- `production/privacy.html` — Privacy policy (GDPR)
- `production/cookies.html` — Cookie preferences
- `production/terms.html` — Terms of use

### 5. Support Pages
- `production/404.html` — Custom 404
- `production/robots.txt` — Search crawler rules
- `production/sitemap.xml` — Sitemap

### 6. Resume
File: `careers/resume.html`

- Tokenized HTML resume with left-panel controls
- 3 presets: Default (9pt), Spacious (9.5pt), Dense (8.5pt)
- 30+ CSS custom properties for type, spacing, layout
- Per-company cover letters in `careers/{company}/`

---

## Components

### Project Card (`.work-card`)
- Thumbnail at 4:3 aspect ratio
- Project title, category tag, and brief descriptor
- Hover state reveals card detail
- Click opens Behance-style modal
- Ghost variant: dimmed, non-clickable, "COMING SOON" badge

### Modal Panel (`.modal-panel`)
- Full-height panel: 92vw wide, max-width 1440px, 8px radius
- Dark overlay: `rgba(0,0,0,0.9)`
- Close button (X) top right, keyboard accessible (Escape)
- Prev/Next navigation between case studies
- Fetch-based content loading with loading state
- Per-project CSS class (`cs--{key}`) applied to panel root
- Keyboard navigation: left/right arrows for prev/next

### Navigation
- Fixed position, 72px height
- Transparent on page load, frosted glass (`backdrop-filter: blur(12px)`) on scroll
- Logo: "UXMEAS" in Bebas Neue, links to homepage
- Links: Work, About, Contact (accent color)
- Mobile: hamburger button, full-screen overlay menu

### Contact Form
- Netlify Forms (POST to Netlify)
- Fields: Name, Email, Message
- No client-side validation library required (HTML5 validation)

---

## Features

### Behance-Style Modal Viewer
- **Trigger:** Click on live project card
- **Load pattern:** JS fetch of `/case-study/{slug}/index.html`, cached in memory after first load
- **CSS load pattern:** JS fetch of `/case-study/{slug}/index.html` style block, injected into `<head>` once per session
- **Navigation:** Arrow buttons + keyboard arrows between projects in `projectKeys` array
- **URL sync:** Modal state reflected in URL hash (`#compliance`, `#dealflow`, etc.) for shareable links
- **Deep link:** `?project={key}` on load opens the correct case study immediately

### Cookie Consent (GDPR/CCPA)
- Consent banner on first visit
- Consent stored in `localStorage` as `uxmeas_consent`
- GA4 analytics only activates after user grants consent
- Google Consent Mode v2 implemented (default denied)

### GA4 Analytics
- Property: G-87HSHMKCBH
- Fires on: page views, modal opens (tracked as virtual page views)
- Consent-gated (Google Consent Mode v2)

### Reveal Animations
- `.reveal` class on cards and sections
- IntersectionObserver triggers `is-visible` class on scroll
- CSS transition: opacity 0 → 1, translateY 20px → 0

---

## CSS Theme Tokens (per project)

Each project injects a `cs--{key}` class on the modal panel, which scopes accent colors:

| Key | CSS Class | Accent Color |
|-----|-----------|-------------|
| compliance | `cs--compliance` | Gold `#C9A227` |
| dealflow | `cs--dealflow` | Gold `#C9A227` |
| akm | `cs--akm` | Grey `#9CA3AF` |
| relationsync | `cs--relationsync` | Purple (defined in CSS) |
| mypick | `cs--mypick` | (defined in CSS) |
| multipaste | `cs--multipaste` | (defined in CSS) |
| docstodesign | `cs--docstodesign` | Copper `#D4915E` |
| isoblock | `cs--isoblock` | (defined in CSS) |

---

## Performance Requirements

- LCP: under 2.5 seconds on 4G
- No render-blocking resources above the fold
- Images: WebP format, compressed
- Card thumbnails: 4:3 aspect ratio
- Fonts: Inter (case studies), Bebas Neue (display), Space Grotesk (shell) — Google Fonts with `display=swap`

---

## Security Requirements

- Security headers via `netlify.toml`: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy
- No email addresses exposed in HTML source (JS obfuscation via data-u/data-d if needed)
- No API keys or credentials in source files
- HTTPS enforced (Netlify default)

---

## Known Issues (as of 2026-04-02)

- og:image missing (file exists at `/images/og-image.png` but not verified live)
- Contact form Netlify notification not configured
- Compliance UX: conflicting drop-off stats (50% vs 60%) in case study copy
- Hero laptop images may need dark/light swap verification against .pen intent

---

## Out of Scope (v1)

- CMS or admin interface
- User accounts or authentication
- Server-side rendering
- Multi-language support
- Blog or articles section
- Job board integration
