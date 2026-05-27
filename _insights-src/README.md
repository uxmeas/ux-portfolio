# uxmeas.com /insights — Astro source

Astro 5 build for the `/insights/*` section of uxmeas.com.

## What this is

- Source for the `uxmeas.com/insights/*` blog
- Builds to `../insights/` at the portfolio repo root (so CF Pages serves it as static HTML, no Astro runtime needed in cloud)
- Content authored as MDX in `src/content/insights/*.mdx`
- Voice doc at `_copy/uxmeas.com/voice.md` (outside this folder, in `_copy/` governance tree)
- Content calendar at `_copy/uxmeas.com/content-calendar.md`

## Local development

```bash
cd _insights-src
npm install
npm run dev          # http://localhost:4321/insights/
```

## Add a post

```bash
# 1. Copy template
cp src/content/insights/_template.mdx src/content/insights/<slug>.mdx

# 2. Edit frontmatter (Linear-shaped schema):
#    - title (≤80 chars)
#    - subtitle (optional, ≤160 chars; dek under the title)
#    - excerpt (≤220 chars; shows in feed + RSS + OG)
#    - category (enum: Lever | Pattern | Anti-Pattern | Tool & Method | Industry)
#    - publishedAt (YYYY-MM-DD)
#    - readingTime (number, minutes)
#    - coverImage (optional path, e.g. /images/insights/<slug>.webp)
#    - coverAlt (description of the artifact, accessibility)
#    - featured (boolean; if true, post appears in the hero card on /insights/)
#    - draft: false (must be false to publish)

# 3. Write body in MDX. Apply the 10 rules from _copy/uxmeas.com/voice.md.
```

## Build + deploy

```bash
# Local build
npm run build         # runs cadence check + astro build, output goes to ../insights/

# Commit the built output (current pattern)
cd ..
git add insights/ _insights-src/
git commit -m "insights: <slug> live"
git push origin dev    # CF Pages auto-deploys dev → dev.uxmeas.pages.dev

# Promote dev → staging → main per existing portfolio flow
```

**Note:** The current deploy pattern commits the built `insights/` HTML output to git so CF Pages can serve it as static files (no build pipeline change required). When ready, switch to CF Pages running Astro in cloud — see Phase 1.5 in `../insights-spec.md`.

## Deleting a post (trap warning)

Astro 5 persists a content data store at `node_modules/.astro/data-store.json`. If you delete an `.mdx` file from `src/content/insights/` and rebuild, the data store still references the deleted entry and the build crashes with `UnknownContentCollectionError`.

**Fix:** run the clean script before the next build.

```bash
npm run clean    # nukes .astro/, node_modules/.astro/, ../insights/
npm run build    # rebuilds from scratch
```

Renaming or moving a post triggers the same trap.

## Cadence warning

`npm run build` runs `scripts/check-calendar.mjs` first. It reads the content calendar at `../../../_copy/uxmeas.com/content-calendar.md` and prints a warning if the next 2 slots are still `OPEN`. Soft warning only — never fails the build. Cloud builds where `_copy/` is absent skip silently.

## Files

```
_insights-src/
├── package.json          Astro 5 + MDX + RSS + sitemap deps
├── astro.config.mjs      base: '/insights', outDir: '../insights'
├── tsconfig.json
├── public/
│   └── _assets/
│       └── insights.css  blog-specific styles (chrome inherited from /shared.css)
├── scripts/
│   └── check-calendar.mjs   build-time cadence warning
└── src/
    ├── content/
    │   ├── config.ts          Zod schema
    │   └── insights/
    │       └── _template.mdx  draft seed (excluded by `draft: true`)
    ├── layouts/
    │   └── Default.astro      shared chrome (nav, footer, GA4, Clarity, consent)
    └── pages/
        ├── index.astro        /insights/  — post list
        ├── [...slug].astro    /insights/<slug>/  — post detail
        └── rss.xml.js         /insights/rss.xml
```

## Tracking baseline

The `/insights/*` pages inherit:
- GA4 `G-87HSHMKCBH` via `/js/ga4-bootstrap.js` (loaded by `/js/compliance.js`)
- Microsoft Clarity `waeobadji5` via `/js/compliance.js`
- GDPR consent banner via `/js/cookie-consent.js`
- Security headers from root `_headers` (CSP allows the same hosts as portfolio)

All three scripts are referenced as absolute paths from `Default.astro` — they live in the repo root `js/` directory and are served by CF Pages alongside the static portfolio.

## Open items (Phase 1.5+)

- **CF Pages-run Astro**: switch CF Pages build to run `cd _insights-src && npm install && npm run build` instead of committing built output. Cleaner long-term; requires CF Pages dashboard config change.
- **First post**: write post #001 in voice, get Pheak's review, push to dev.
- **OG default image**: `/images/og-default.png` referenced by `Default.astro`; create or repoint to existing portfolio OG image.
- **Wordmark SVG**: current `Default.astro` uses plain text "UX Meas" as the wordmark; port the full SVG wordmark from `index.html` for visual continuity.
- **Footer nav**: optionally add the existing portfolio footer pattern (more links, social, etc.).
- **Tag pages**: `/insights/tags/<tag>/` filtered indices (per spec; currently not implemented in Phase 1).

## References

- Spec: `../insights-spec.md`
- Voice: `../../_copy/uxmeas.com/voice.md`
- Calendar: `../../_copy/uxmeas.com/content-calendar.md`
- Portfolio chrome: `../shared.css`, `../theme.js`, `../js/compliance.js`, `../js/cookie-consent.js`
