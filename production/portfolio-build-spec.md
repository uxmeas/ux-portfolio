# Portfolio Case Study Build Spec — Max (CTO) Handoff

**Prepared by:** Ana (PDM) + Kai (CCO)
**Date:** March 25, 2026
**Source:** `Pencil/uxmeas-portfolio.pen` — v2 case studies at y=-8500

---

## Token System (CSS Custom Properties)

### Spacing Scale
```css
--space-sm: 32px;
--space-md: 40px;
--space-lg: 48px;
--space-xl: 64px;
--space-section-y: 100px;  /* vertical section padding */
--space-side: 120px;        /* horizontal section padding */
--space-hero-top: 100px;    /* hero top padding */
```

### Typography Scale (Dark Theme — +2px from standard)
```css
--type-hero: 80px;      /* hero title only */
--type-stat: 64px;      /* stat numbers */
--type-section: 56px;   /* section headings */
--type-subtitle: 22px;  /* subtitles, hero description */
--type-body: 18px;      /* body text */
--type-caption: 16px;   /* supporting text, card labels */
--type-label: 14px;     /* metadata, tags, small labels */
```

### Color Palette
```css
/* Backgrounds */
--bg-deep: #141419;     /* base / gradient edge */
--bg-card: #1A2030;     /* section alternating bg */
--bg-surface: #1F2937;  /* cards, elevated surfaces */

/* Text */
--text-primary: #F0F0F2;   /* headings, titles */
--text-secondary: #94A3B8; /* body text, descriptions */
--text-muted: #A0ADB8;     /* captions, metadata — WCAG AA compliant on dark */

/* Accent */
--gold: #C9A227;        /* stats, labels, accents */

/* Border */
--border: #2A3545;      /* card borders, dividers */
```

### Fonts
```css
font-family: 'Bebas Neue', sans-serif;  /* titles, labels, stats */
font-family: 'Inter', sans-serif;        /* body, descriptions */
```

---

## Section Backgrounds — Vector Gradients (NOT images)

Each section uses a CSS radial gradient. Two alternating tints against the base:

```css
/* Tint A — slightly warmer */
background: radial-gradient(ellipse at 60% 30%, #1A2540 0%, #141419 100%);

/* Tint B — slightly cooler */
background: radial-gradient(ellipse at 30% 50%, #1C2438 0%, #141419 100%);
```

Offset the gradient center per section for subtle variety:
| Section | Center | Tint |
|---------|--------|------|
| Hero | 60% 30% | A |
| Challenge | 50% 40% | A |
| Design Approach | 30% 50% | B |
| User Flow | 70% 40% | A |
| KSign | 40% 60% | B |
| UI Showcase | 50% 30% | A |
| Results | 60% 50% | B |
| CTA Footer | 50% 50% | A |

**NEVER use image backgrounds.** NB2 generates at ~1376px (sub-retina), pixelates at 1440px+.

---

## Layout Rules

### Section Structure
```
section {
  padding: var(--space-section-y) var(--space-side);
  gap: var(--space-lg);  /* 48px between children */
  width: 100%;
  max-width: 1440px;
}
```

### Two-Column Patterns

**Text-only columns (50/50):**
```
.cols-text { gap: var(--space-xl); }
.col-left { flex: 1; }
.col-right { flex: 1; }
```

**Copy + Graphic columns (1/3 · 2/3):**
```
.cols-graphic { gap: var(--space-xl); }
.col-copy { width: 380px; flex-shrink: 0; }
.col-graphic { flex: 1; }  /* takes ~756px */
```

**Zigzag rule:** Alternate copy-left/graphic-right with graphic-left/copy-right across consecutive graphic-paired sections. Text-only and gallery sections don't zigzag.

### Hero Spacing (Variable gaps)
The hero uses progressive gaps instead of uniform spacing:
```
label → title:    var(--space-sm)   /* 32px */
title → stats:    var(--space-lg)   /* 48px */
stats → subtitle: var(--space-md)   /* 40px */
subtitle → image: var(--space-xl)   /* 64px */
```

---

## Component Patterns

### Step Cards (User Flow)
```
- Gold outlined circle badge (36px, 2px stroke)
- Step number inside (18px, bold)
- Time badge (14px, gold)
- Step name (18px, bold, --text-primary)
- Description (16px, --text-muted)
- Background: --bg-surface, border-radius: 6px, padding: 24px 20px
```

### Metric Cards (Challenge / Results)
```
- Stat number (--type-stat: 64px or --type-section: 56px, Bebas Neue, --gold)
- Label (--type-body: 18px, bold, --text-primary)
- Description with before→after context (--type-label: 14px, --text-muted)
- Background: --bg-surface, border-radius: 6px, padding: 32px 24px
```

### Feature List (KSign style)
```
- Icon (22px lucide icon, --gold)
- Title (--type-body: 18px, semibold, --text-primary)
- Description (--type-caption: 16px, --text-muted)
- Inline layout: icon left, text right, 12px gap
```

### Testimonial
```
- Gold accent line (80px × 3px)
- Quote text (--type-subtitle: 22px, italic, --text-primary)
- Attribution (--type-caption: 16px, medium, --gold)
- No background box — open layout with top padding
```

### Device Mockups
- Always Figma-composited PNGs (device + screen merged)
- Stored in: `images/devices/`
- Applied with `object-fit: contain` on dark bg
- Never build device frames from CSS/SVG

---

## Typography Rules

- **Bebas Neue:** Titles, labels, stats, section headings. Always uppercase inherently.
- **Inter:** Body text, descriptions, quotes, metadata. Mixed case.
- **No orphan words:** Check every text block. A single word alone on the last line is not acceptable.
- **textGrowth on constrained titles:** Any heading in a column < 600px needs word-wrap control.
- **Letter spacing:** Labels get 4-6px tracking. Titles get 1px. Body gets 0.

---

## Contrast Requirements

- All text must pass WCAG AA (4.5:1 ratio minimum)
- --text-muted (#A0ADB8) on --bg-surface (#1F2937) = ~5:1 ✓
- --text-secondary (#94A3B8) on --bg-card (#1A2030) = ~5.5:1 ✓
- --gold (#C9A227) on --bg-deep (#141419) = ~5:1 ✓
- **NEVER use colors darker than #A0ADB8 for readable text on dark backgrounds**

---

## Case Study Section Order

Each case study follows this template (adapt per project):

1. **Hero** — centered title, stats (stacked 3-col), subtitle, device mockup
2. **Challenge** — text columns + metric cards
3. **Design Approach** — copy/HMW columns + research table
4. **User Flow** — copy/graphic (1/3·2/3) + step cards
5. **Feature Deep-Dive** — copy/graphic ZIGZAGGED + feature list
6. **UI Showcase** — gallery grid (2×2 or 2×3)
7. **Results** — title + metric cards + testimonial
8. **CTA Footer** — centered next case study link

Not every project needs all 8. Adapt to scope.
