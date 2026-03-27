# Portfolio Build Spec — Extracted from Pencil MCP
# Source: uxmeas-portfolio.pen
# Generated: March 26, 2026
# THIS IS THE SOURCE OF TRUTH. All HTML must match these values exactly.

## Design Tokens (from mcp__pencil__get_variables)

### Colors (Katipult theme — Compliance UX + DealFlow)
| Token | Value | Use |
|-------|-------|-----|
| --bg-deep | #141419 | Page background base |
| --bg-card | #1A2030 | Card backgrounds |
| --bg-surface | #1F2937 | Elevated surfaces |
| --text-primary | #F0F0F2 | Headings, titles |
| --text-secondary | #94A3B8 | Body text |
| --text-muted | #969CA5 | Captions, metadata |
| --gold | #C9A227 | Accent (Katipult projects) |
| --border | #2A3545 | Borders, dividers |

### Colors (D2D theme)
| Token | Value | Use |
|-------|-------|-----|
| --bg-deep | #0C0C0C | Page background base |
| --bg-card | #161616 | Card backgrounds |
| --bg-surface | #222222 | Elevated surfaces |
| --gold (D2D copper) | #D4915E | Accent (NOT #D4956A) |

### Colors (AKMSecure theme)
| Token | Value | Use |
|-------|-------|-----|
| --bg-deep | #0A0A0A | Page background base |
| --bg-card | #141414 | Card backgrounds |
| --bg-surface | #181818 | Elevated surfaces |
| --accent | #9CA3AF | Monochromatic grey |

### Typography (fixed px at 1440px desktop)
| Token | Value | DO NOT USE clamp() at desktop |
|-------|-------|------|
| --type-hero | 80px | Hero titles only |
| --type-stat | 64px | Stat numbers |
| --type-section | 56px | Section headings |
| --type-subtitle | 22px | Subtitles |
| --type-body | 18px | Body text |
| --type-caption | 16px | Supporting text |
| --type-label | 14px | Tags, metadata |

### Spacing (fixed px)
| Token | Value | Use |
|-------|-------|-----|
| --space-sm | 32px | Label→title gap |
| --space-md | 40px | Stats→subtitle gap |
| --space-lg | 48px | Section children gap |
| --space-xl | 64px | Subtitle→device, column gaps |
| --space-hero-top | 100px | Hero top padding |
| --space-section-y | 100px | Section vertical padding |
| --space-side | 120px | Section horizontal padding |
| --table-cell-pad | 24px | Table cell padding |
| --table-col-gap | 32px | Table column gap |

---

## Compliance UX — Section Layout (from snapshot_layout)

### Overall Frame: 1440 × 7526px

### Section 1: Hero (vGzrN) — 1440 × 1330px
| Child | Position | Size | Description |
|-------|----------|------|-------------|
| Label bar (3H024) | x:120, y:100 | 1200 × 34 | Logo left, tags center, meta right |
| Title wrap (LJDF5) | x:120, y:134 | 1200 × 108 | "COMPLIANCE UX" centered |
| Stats row (GbET2) | x:120, y:242 | 1200 × 131 | 3 stacked stats, centered |
| Subtitle wrap (LdKBL) | x:120, y:373 | 1200 × 145 | 800px max, centered |
| Device wrap (iRZLt) | x:120, y:518 | 1200 × 804 | MacBook mockup |

**Progressive gaps:** label→title: 0px (y:134 - y:100 - h:34 = 0, padding handles it via $space-sm on wrap), title→stats: 0px (same), stats→subtitle: 0px (same), subtitle→device: 0px (same). All gaps handled by padding on wrapper frames, not by parent gap.

### Section 2: Challenge (sZNHW) — 1440 × 800px
| Child | Position | Size | Description |
|-------|----------|------|-------------|
| Badge (7ISJB) | x:120, y:100 | 185 × 29 | Pill badge |
| Columns (o6onC) | x:120, y:177 | 1200 × 310 | Two-column layout |
| Metric cards (oEEvf) | x:120, y:535 | 1200 × 165 | 3 cards |

**Column proportions (o6onC):**
- Left: 500px wide (title + body)
- Gap: 64px (564 - 500)
- Right: 636px wide (fill)
- Total: 500 + 64 + 636 = 1200px ✓

### Section 3: Design Approach (F3nTd) — 1440 × 903px
| Child | Position | Size | Description |
|-------|----------|------|-------------|
| Badge (9u7ug) | x:120, y:100 | 207 × 29 | Pill badge |
| Columns (AvTv7) | x:120, y:177 | 1200 × 305 | 50/50 layout |
| RT Label (COIzq) | x:120, y:530 | 128 × 17 | "RESEARCH TABLE" |
| Research Table (zVeDJ) | x:120, y:595 | 1200 × 208 | Data table |

**Column proportions (AvTv7) — 50/50:**
- Left: 568px wide (title + desc)
- Gap: 64px (632 - 568)
- Right: 568px wide (HMW card)
- Total: 568 + 64 + 568 = 1200px ✓

### Section 4: User Flow (qCGVc) — 1440 × 1030px
| Child | Position | Size | Description |
|-------|----------|------|-------------|
| Badge (8uy3V) | x:120, y:100 | 141 × 29 | Pill badge |
| Columns (Q73aS) | x:120, y:177 | 1200 × 480 | 1/3 copy + 2/3 graphic |
| Step cards (R3HBi) | x:120, y:705 | 1200 × 225 | 5 step cards |

**Column proportions (Q73aS) — 1/3 + 2/3:**
- Left (copy): 380px wide
- Gap: 64px (444 - 380)
- Right (graphic): 756px wide (fill)
- Total: 380 + 64 + 756 = 1200px ✓

### Section 5: KSign (MCYVj) — 1440 × 908px (ZIGZAG)
| Child | Position | Size | Description |
|-------|----------|------|-------------|
| Badge (UBGNj) | x:120, y:100 | 96 × 29 | Pill badge |
| Columns (EwN34) | x:120, y:177 | 1200 × 631 | 2/3 graphic + 1/3 copy |

**Column proportions (EwN34) — ZIGZAG 2/3 + 1/3:**
- Left (graphic): 756px wide
- Gap: 64px (820 - 756)
- Right (copy): 380px wide
- Total: 756 + 64 + 380 = 1200px ✓

### Section 6: UI Showcase (iokne) — 1440 × 1131px
| Child | Position | Size | Description |
|-------|----------|------|-------------|
| Badge (FyNBH) | x:120, y:100 | 163 × 29 | Pill badge |
| Title (iK86s) | x:120, y:177 | 449 × 118 | Section title |
| Gallery Row 1 (0Vc3y) | x:120, y:343 | 1200 × 320 | 2 screenshots |
| Gallery Row 2 (7zZgW) | x:120, y:711 | 1200 × 320 | 2 screenshots |

**Gallery:** 2×2 grid, each row 1200 × 320px, 16px gap between images, 48px gap between rows.

### Section 7: Results (nDLF8) — 1440 × 757px
| Child | Position | Size | Description |
|-------|----------|------|-------------|
| Badge (hycBK) | x:120, y:100 | 214 × 29 | Pill badge |
| Columns (Xiha8) | x:120, y:177 | 1200 × 480 | 1/3 stats + 2/3 screen |

**Column proportions (Xiha8) — 1/3 + 2/3:**
- Left (stats): 380px wide
- Gap: 64px (444 - 380)
- Right (screen): 756px wide, 480px tall
- Total: 380 + 64 + 756 = 1200px ✓

### Section 8: CTA Footer (3iiVF) — 1440 × 667px
| Child | Position | Size | Description |
|-------|----------|------|-------------|
| Divider line (o0LZ7) | x:660, y:100 | 120 × 2 | Gold line, centered |
| Title (ISX4G) | x:563.5, y:142 | 313 × 67 | "Next Case Study", centered |
| Subtitle (9iwk7) | x:580.5, y:249 | 279 × 27 | Next project name, centered |
| Description (wjGYt) | x:400, y:316 | 640 × 93 | Description, centered |
| Buttons (mnfqp) | x:505.5, y:449 | 429 × 61 | Two buttons |
| Footer (Uauvh) | x:677.5, y:550 | 85 × 17 | "uxmeas.com" |

---

## Layout Constants

### Content width: 1200px (1440 - 120 - 120 side padding)

### Column patterns (within 1200px content):
| Pattern | Left | Gap | Right | Total |
|---------|------|-----|-------|-------|
| 50/50 (text) | 568px | 64px | 568px | 1200px |
| 50/50 (challenge) | 500px | 64px | 636px | 1200px |
| 1/3 + 2/3 | 380px | 64px | 756px | 1200px |
| 2/3 + 1/3 (zigzag) | 756px | 64px | 380px | 1200px |

### Section vertical rhythm:
- Badge to first content: 48px (y:177 - y:100 - h:29 = 48)
- Between content blocks: 48px ($space-lg)
- Section padding: 100px top/bottom, 120px sides

### Gallery grid:
- Row height: 320px
- Gap between images: 16px
- Gap between rows: 48px (343 - 320 + adjustment)

### Device mockup sizes:
- Hero MacBook: 1200 × 740px (within 1200 × 804 wrapper)
- Phone pair: within 756px column, individual phones 220px wide
- iPad/Tablet: 480px wide, centered in 756px column
- Floating screen: 756 × 480px in 2/3 column

---

## Gradient Specifications (from Pencil parent frame fills)

### Compliance UX / DealFlow (navy):
```
base: #141419
glow centers: #243352, #1E2D45
circle size: 700-800px radius
positions: alternating left/right, distributed evenly
```

### AKMSecure (charcoal):
```
base: #0A0A0A
glow centers: #1A1A1E, #161618
circle size: 700-800px radius
```

### D2D (copper-teal):
```
base: #0C0C0C
glow centers: #2A1E15 (copper), #152A28 (teal)
circle size: 700-800px radius
```

---

## Critical Rules

1. ALL color values come from this spec, NOT from memory or live sites
2. Typography at desktop (1440px) uses FIXED px values, not clamp()
3. Column widths are EXACT: 380px, 500px, 568px, 636px, 756px — not approximations
4. Gap between columns is ALWAYS 64px ($space-xl)
5. Section padding is ALWAYS 100px vertical, 120px horizontal
6. Badge to content gap is ALWAYS 48px
7. Device mockups with baked-in frames use .device-composited (no border)
8. Standalone screenshots use .device-mockup (3px border)
