# uxmeas Design System

**Status:** Filled 2026-05-26 (backfilled from `shared.css`; soft fields below still need Pheak input).
**Source of truth for tokens:** `shared.css` `:root` block (light) + `[data-theme="dark"]` (dark).
**Per memory `feedback_always_commit_designmd.md`:** any change touching tokens/canonical components ships an update to this file in the same commit.

## Brand Idea

| Attribute | Direction |
|---|---|
| Primary feeling | Earned confidence. Specific. No throat-clearing. 18 years across fintech / dev tools / AI-native, presented like a portfolio that doesn't need to apologize for itself. |
| Audience | Hiring managers (senior/staff product design roles), peers, design-curious PMs/engineers, Calgary scene + remote teams hiring product designers. |
| Product category | Personal product-design portfolio + insights essays. Sister to mzmlabs.com (studio site) but visually + voicewise distinct — uxmeas is Pheak the designer, MZM Labs is the studio. |
| Visual posture | Editorial-modern. Sharp corners. Type-forward. OKLCH neutrals with one blue accent. Inter Tight + JetBrains Mono. Generous whitespace. Restrained color. No decorative chrome. |

## Logo And Assets

| Asset | Role | Notes |
|---|---|---|
| `favicon.svg` | Site favicon (versioned `?v=20260508`) | SVG wordmark + mark |
| Inline SVG wordmark in `index.html` ~ln 494 | Primary wordmark (full lockup + standalone mark variant) | Embedded inline — CSP `script-src 'self'` |
| `images/og-default.png` | Default Open Graph card | Per-page `ogImage` override supported |

## Colour

All tokens live in `shared.css`. Light mode `:root`, dark mode `[data-theme="dark"]`. Both shipped per `theme.js` (localStorage flash prevention).

### Background + surface
| Token | Light | Dark | Role |
|---|---|---|---|
| `--bg` | `oklch(98.6% 0.003 60)` (warm cream) | `oklch(13.5% 0.004 60)` | Page background |
| `--bg-2` | `oklch(96.0% 0.003 60)` | `oklch(17.5% 0.004 60)` | Card / panel surface |
| `--placeholder-bg` | `oklch(92.5% 0.004 60)` | `oklch(26.0% 0.004 60)` | Image placeholder |
| `--placeholder-border` | `oklch(88.5% 0.004 60)` | `oklch(34.0% 0.004 60)` | Placeholder rule |

### Text ladder
| Token | Light | Dark | Contrast vs `--bg` |
|---|---|---|---|
| `--fg` | `oklch(18% 0.006 60)` | `oklch(96% 0.003 60)` | 14:1 (body, headings) |
| `--fg-2` | `oklch(38% 0.005 60)` | `oklch(78% 0.004 60)` | 6:1 (lede, secondary body) |
| `--fg-3` | `oklch(48% 0.005 60)` | `oklch(62% 0.004 60)` | 4.5:1 (eyebrow, meta, captions) |
| `--fg-4` | `oklch(58% 0.005 60)` | `oklch(55% 0.004 60)` | 3:1 (UI-only — dividers, decorative) |

### Rules + accents
| Token | Light | Dark | Role |
|---|---|---|---|
| `--rule` | `oklch(88.5% 0.004 60)` | `#181f33` | Hairline border between sections |
| `--rule-soft` | `oklch(92.5% 0.004 60)` | `#141829` | Subtle internal hairline |
| `--accent` | `#1e6fb8` (blue, 4.9:1 on cream) | `#7fc8ff` | Links, hover state, decorative emphasis |
| `--accent-soft` | `color-mix(--accent 22%, transparent)` | `color-mix(--accent 18%, transparent)` | Hover background / soft highlight |

### Do not invent new tokens
Per `feedback_tokens_only_never_hardcode.md`. If a new color is needed: add to `:root` + dark counterpart + document here in same commit.

## Typography

| Role | Token | Font stack | Notes |
|---|---|---|---|
| Display | `--t-h-display` `clamp(36px, 5.8vw, 72px)` | `--f-sans` Inter Tight | Hero H1, post H1. Weight 500. Letter-spacing -0.03em. |
| Section | `--t-h-section` `clamp(26px, 3.6vw, 44px)` | `--f-sans` | H2 in body. Weight 500. -0.022em. |
| Sub-section | `--t-h-sub` `clamp(22px, 2.8vw, 34px)` | `--f-sans` | H3 in body. Weight 500. -0.018em. |
| Stat number | `--t-stat-n` `clamp(34px, 4.5vw, 52px)` | `--f-sans` | Big-number callouts. |
| Lede | `--t-lede` `19px` | `--f-sans` | Hero subtitle, post excerpt. `--fg-2`. |
| Body | `--t-body` `16px` | `--f-sans` | Default text. Body content uses 18px override in `.post-body` for reading-measure essays. |
| Eyebrow | `--t-eyebrow` `11px` | `--f-sans` (uppercase, tracking 0.14em) | Category labels above titles. `--fg-3`. |
| Mono label | `--t-mono-label` `11px` | `--f-mono` JetBrains Mono | Meta strips (date, reading time). Tracking `--ls-mono` (0.06em). Uppercase. |

**Fonts loaded** in `index.html`: Inter Tight (display + body), JetBrains Mono (mono). No `--f-serif`. No fallback fonts that look meaningfully different.

## Layout And Components

| Pattern | Direction |
|---|---|
| Page width | `.wrap` class: `max-width: var(--max)` (1440px), `padding-inline: var(--gutter)` (clamp 20–48px) |
| Article width | `.wrap-narrow` class (insights only): `max-width: 720px` for reading measure |
| Radius | `--radius: 0px` (sharp corners, design-system constant). Use `var(--radius)` even when value is 0 — keeps option open to change globally. |
| Hairlines | `1px solid var(--rule)`. Use `--rule-soft` for internal subtleties. |
| Focus | `--focus: 0 0 0 2px var(--bg), 0 0 0 4px var(--accent)` — apply via `box-shadow` on `:focus-visible` |
| Navigation | `.nav` + `.nav-inner` + `.nav-links` (in `shared.css`). Includes wordmark (inline SVG, responsive: `.wordmark__svg` full + `.wordmark__mark` mobile-only) + theme toggle. Canonical link set: **Work · Insights · About · Contact** (portfolio-wide as of 2026-05-26). Scroll-aware behavior via `nav-scroll.js` (see Motion below). Legacy BEM-class auxiliary pages (404, cookies, privacy) use `.nav__brand` + `.nav__link` — slated for refactor to canonical pattern. |
| Hero | `.hero` class with `.hero-grid` (headline + stats columns). Reused on every top-level page. |
| Eyebrow / lede / display | Canonical classes `.eyebrow`, `.lede`, `.h-display`, `.h-section` in `shared.css`. ALWAYS use these — never reinvent typography in component CSS. |
| Reveal animations | `.reveal` opacity intersection (already shipped, see `js/main.js`). Honor `prefers-reduced-motion`. |

### Section-specific patterns

**Case Studies** (`/case-study/<slug>/index.html`): per-project CSS tokens scope (`cs--compliance`, `cs--dealflow`, etc.) defined in each case-study HTML. Device frames (8px radius — note: predates `--radius: 0` discipline, may refactor).

**Insights** (`/insights/*`): **Linear blog as structural reference** — eyebrow/title/subtitle/byline/cover/body/footer layout, ~720px reading column, category eyebrows (single category, not tag array), reading time + date in mono meta strip. uxmeas tokens throughout — no parallel palette. Source: `_insights-src/` (Astro 5). Output: `insights/` at repo root.

## Motion

- `prefers-reduced-motion: reduce` → disable all transitions, instant state changes
- Hover transitions: `0.15s ease` default (links, cards)
- Section reveals: opacity 0→1 on viewport intersection (`.reveal` class)
- Theme toggle: instant (no animation — theme switch should be snappy)
- Wordmark: no animation
- **Scroll-aware nav** (`nav-scroll.js`): on scroll-down, `.nav` translates up by its own height; on scroll-up, translates back to 0; always visible at top of page. Pattern adopted from MZM Labs (`Header.astro`). No CSS transition on transform — JS-driven via requestAnimationFrame with scroll-delta accumulation, gives an "attached to scroll velocity" feel. Honors `prefers-reduced-motion: reduce` (no-op). Applied portfolio-wide as of 2026-05-26 — all nav-bearing pages include `<script src="/nav-scroll.js" defer>`.

## Voice

| Surface | Voice doc | Notes |
|---|---|---|
| Portfolio chrome + case studies | `_copy/uxmeas.com/index.md` | Team-player positioning. No "I" as subject. No em-dash. No en-dash. Earned confidence backed by numbers. Skill: `agency-case-study-style` v5 Part 7A. |
| Spoken video / demo / sizzle | `_copy/uxmeas.com/scriptwriter-contract.md` | 7-rule contract for spoken voice. Verb-first. Numbers in first 10 sec. |
| Insights essays (`/insights/*`) | `_copy/uxmeas.com/voice.md` | 10 rules for written-voice essays. Verb-first default; "I" as agency anchor (not subject). No em-dash, no en-dash. Categories: Lever / Pattern / Anti-Pattern / Tool & Method / Industry. |

**Distinct from MZM Labs studio voice** (`_copy/mzmlabs/voice.md`) — uxmeas is Pheak's personal voice, MZM Labs is studio voice. Different positioning, different surface, different rules.

## Accessibility

| Requirement | Rule |
|---|---|
| Contrast | WCAG AA minimum. `--fg` 14:1, `--fg-2` 6:1, `--fg-3` 4.5:1 on `--bg`. `--accent` 4.9:1 on light cream. Verified. |
| Focus states | `--focus` ring (4px solid accent on `:focus-visible`) on EVERY interactive element. No outline removal without replacement. |
| Motion | `prefers-reduced-motion: reduce` honored across all animations. |
| Text fitting | `text-wrap: balance` on headings, `text-wrap: pretty` on lede + body. Max-width on body containers prevents overflow. |
| Screen readers | `aria-label` on icon-only buttons. `aria-hidden="true"` on decorative SVGs. Skip-to-content link `.skip` at top of every page. |
| Keyboard | Tab order matches visual order. No keyboard traps. Theme toggle keyboard-accessible. |
| Color independence | No information conveyed by color alone. Category eyebrows are text, not color swatches. |

## Don'ts

| Don't | Why |
|---|---|
| Don't invent new design tokens. | Use `shared.css` `:root` only. Add to source if needed, document here. Per `feedback_tokens_only_never_hardcode.md`. |
| Don't hardcode hex / px / rem / ms when a token exists. | Same rule. Pre-commit grep: `grep -nE '#[0-9a-fA-F]{3,6}\b' new-css.css` must be empty. |
| Don't reinvent canonical classes (`.h-display`, `.eyebrow`, `.lede`, `.wrap`, `.nav`). | They already work. Section-specific CSS adds layout only, never replicates type/color scale. |
| Don't use em-dash (—) or en-dash (–) in body copy. | Hard-banned per voice docs across all uxmeas surfaces. |
| Don't apply MZM Labs design language to uxmeas. | They're sister sites with deliberately distinct positioning. Insights surface uses Linear-as-structural-reference, NOT MZM Labs templates. |
| Don't ship UI work without reading this file + `shared.css`. | Per `feedback_read_design_sources_before_scaffolding_2026_05_26.md` HARD RULE. |
| Don't add rounded corners (`border-radius` other than `var(--radius)`). | Sharp corners are a design-system constant. |
| Don't add new fonts. | Inter Tight + JetBrains Mono only. Serif would be a brand-direction decision, not a one-off addition. |

## Filed sections that still need Pheak input

- **Brand Idea — Primary feeling**: backfilled best-guess from existing copy; Pheak to confirm/tune
- **Motion**: minimal current state; could specify hover micro-interactions for case-study cards / nav
- **Voice — Insights tone calibration**: voice.md is draft-status; Pheak to lock after first post lands
