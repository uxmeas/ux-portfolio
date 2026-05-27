---
title: uxmeas.com /insights — Spec Packet
status: phase-0-draft
last-updated: 2026-05-26
owners: Pheak (CEO + author), Claude session (build)
---

# uxmeas.com /insights — Spec Packet

## Problem

uxmeas.com needs a writing surface for 2x/week posts in a defined voice. Today the site is static HTML on Cloudflare Pages; case studies live in `case-studies/` and are a separate IA. Adding a blog must not break existing pages, must hold the tracking-baseline gate, and must support 104-posts/year cadence with low friction.

## Scope

### In
1. New `/insights` section at `uxmeas.com/insights/` — index + per-post pages
2. Astro 5 + content collections (Zod schema, MDX support)
3. MDX-in-repo authoring at `src/content/insights/*.mdx`
4. Voice doc at `_copy/uxmeas.com/voice.md` — uxmeas-specific (separate from MZM Labs studio voice in `_copy/mzmlabs/voice.md`; separate from `scriptwriter-contract.md` which is video-only)
5. Content calendar at `_copy/uxmeas.com/content-calendar.md` — Mon + Thu slots, 8 weeks rolling
6. Build-time cadence warning — `astro build` prints warning if next 2 calendar slots have no matching MDX with that `publishDate`
7. RSS feed + sitemap entries
8. Tracking baseline: GA4 `G-87HSHMKCBH`, Clarity `waeobadji5`, GDPR consent, security headers — inherited from existing portfolio

### Out
- Case-study migration to Astro (case studies stay where they are; opportunistic Astro adoption per pattern iii, not this scope)
- CMS / draft UI
- Comments, reactions, newsletter capture
- Pheak's portfolio root page rebuild

## Architecture

**Hybrid Astro + existing static HTML.** Astro at repo root, `dist/` is what Cloudflare Pages deploys.

- Existing static HTML files (`index.html`, `fuzehq.html`, `katipult.html`, `docs-to-design.html`, `compliance-ux.html`, `careers/*`, `case-studies/*`, etc.) move into `public/` — Astro copies them through unchanged, zero refactor
- New Astro content: `src/pages/insights/` + `src/content/insights/`
- Shared `src/layouts/Default.astro` (head + nav + slot + footer + GA4 + Clarity + consent banner) — chrome matches existing portfolio
- Build: `astro build` → `dist/`
- CF Pages config changes: build command `npm run build`, output dir `dist`

## Structural reference: Linear blog

**Decision 2026-05-26**: uxmeas /insights structure mirrors **Linear's blog** (linear.app/blog) — eyebrow + title + subtitle + byline + cover + body + footer; ~720px reading column; category eyebrows (single category, not tags); reading time + date in mono meta strip. Token system stays uxmeas: Inter Tight + JetBrains Mono, OKLCH palette, sharp corners (`--radius: 0px`), `--accent` blue.

Deliberately distinct from MZM Labs `/insights` template (which is `.insight-row` / `.surface-light` / `Base + Header + Footer` component split with SHAPE-enum voice governance). The two sister sites use different structural templates by design — uxmeas is Pheak the designer, MZM Labs is the studio.

## Content collection schema (Zod)

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const CATEGORY = z.enum(['Lever', 'Pattern', 'Anti-Pattern', 'Tool & Method', 'Industry']);

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().max(80),
    subtitle: z.string().max(160).optional(),
    excerpt: z.string().max(220),
    category: CATEGORY,
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    author: z.string().default('Pheak Meas'),
    readingTime: z.number().optional(),
    coverImage: z.string().optional(),
    coverImageDark: z.string().optional(),
    coverAlt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { insights };
```

**Category enum** maps 1:1 to the 5 post types in `_copy/uxmeas.com/voice.md`. One category per post. `featured: true` controls hero placement on the index.

## URL contract

| URL | What it is |
|---|---|
| `/insights/` | Index — newest first, paginated 20/page |
| `/insights/<slug>/` | Post detail |
| `/insights/tags/<tag>/` | Posts filtered by tag |
| `/insights/rss.xml` | RSS feed |
| `/sitemap-index.xml` | Sitemap (includes insights) |

## Acceptance criteria

- [ ] `uxmeas.com/insights/` index lists published posts, newest first
- [ ] `uxmeas.com/insights/<slug>/` renders MDX with title, date, summary, body, tags
- [ ] `draft: true` excludes post from build output
- [ ] `publishDate` in the future excludes post from build output
- [ ] RSS feed at `/insights/rss.xml` validates
- [ ] Sitemap includes all published insights
- [ ] All existing portfolio URLs (`/`, `/fuzehq.html`, `/katipult.html`, `/docs-to-design.html`, `/compliance-ux.html`, `/careers/*`) still resolve unchanged
- [ ] Tracking baseline passes Chloe's 10-item check on staging URL (per `.claude/rules/staging-deploy-checklist.md` #4.5)
- [ ] Lighthouse a11y ≥ 95 on insights index + a sample post
- [ ] Content calendar warning fires on `astro build` if next 2 slots are unfilled
- [ ] Voice doc at `_copy/uxmeas.com/voice.md` exists and is referenced by every post's draft cycle

## Phase plan

| Phase | Output | Gate |
|---|---|---|
| **0** (this session) | Spec + voice.md + content-calendar.md | Pheak reads voice, edits as needed, signs off |
| **1** (this session) | Astro scaffold: package.json deps, astro.config.mjs, content collection schema, Default layout, insights index template, post template, RSS, sitemap, cadence-warning script | Max code review |
| **2** (next session) | First post written in voice + dev push + Chloe Tier 3 QA on dev branch preview | Sage QA + tracking baseline pass |
| **3** (rolling) | 2x/week post cadence (Mon + Thu). Claude drafts from Pheak's topics; Pheak edits + ships | Per-post: short Tier 1 smoke |

## QA tier

**Tier 3** for Phase 1 ship (new pages + Astro = third-party integration + architecture change). Requires:
- Full Playwright suite on `/insights/*` routes
- axe-core a11y audit
- Lighthouse perf + a11y budgets
- Tracking baseline check (all 10 items, per checklist #4.5)
- 24h staging soak before main promote
- Explicit CEO approval for main

## Tracking baseline inheritance

Insights pages inherit the existing portfolio chrome's tracking (already wired in `js/compliance.js` per STATUS.md):
- GA4 property: `G-87HSHMKCBH`
- Microsoft Clarity: `waeobadji5`
- GDPR consent banner
- Security headers via `_headers` (copied through Astro build to `dist/_headers`)
- HSTS / CSP / Referrer-Policy / Permissions-Policy already configured

## Voice & content calendar gating

The voice doc is the slowest gate of Phase 0. Without locked voice:
- Phase 2 (first post) cannot ship — no voice to write to
- Phase 3 (2x/week cadence) is blocked

Therefore Phase 0's critical path is: scaffold can land on `dev` without voice locked, but no posts ship until Pheak signs off on voice.md.

## Open questions for Pheak

1. **Voice positioning**: Is uxmeas.com voice closer to (a) the portfolio team-player voice (no "I" as subject, verb-first, earned confidence) — which matches `_copy/uxmeas.com/index.md` — or (b) more personal first-person essay voice — different from the portfolio chrome but appropriate for blog writing? Default: (a) carries over, with "I" allowed in blog posts as agency anchor only (per scriptwriter-contract Rule 5 logic).
2. **Cadence days**: Mon + Thu, or different slots? Default: Mon + Thu.
3. **First topic seed**: what's post #1?
