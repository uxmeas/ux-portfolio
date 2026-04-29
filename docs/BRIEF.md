# uxmeas.com — Product Brief
Last updated: 2026-04-07

---

## What It Is

**uxmeas.com** is Pheak Meas's professional design portfolio. It is a static website that presents 18 years of product design work across fintech, compliance, and enterprise software — from startup to TSX-V IPO.

The site showcases case studies in a Behance-style modal viewer, establishes credibility for senior contract and full-time roles, and serves as the anchor for all job hunting outreach.

---

## The Problem

A LinkedIn profile and resume alone are insufficient for securing senior product design roles at $100/hr USD. Hiring managers and recruiters expect to see design process, visual depth, and measurable outcomes — not just job titles.

uxmeas.com closes that gap by delivering case studies that show the work behind the results.

---

## Who It's For

**Primary:** Hiring managers, recruiting agencies, and direct clients evaluating Pheak for senior product design roles or design consulting engagements.

**Secondary:** Pheak's own outreach — every application links here as the proof of work.

**Not for:** MZM Labs team, internal tooling, or co-founder positioning. This is a personal portfolio, not a company site.

---

## How It Works

1. Visitor lands on a single-page portfolio (index.html) showing a hero section, about section, and project card grid
2. Clicking a live project card opens a Behance-style modal panel that fetches and renders the full case study inline
3. Case studies load from `/case-study/{slug}/index.html` via JavaScript fetch, with per-project CSS theming
4. Ghost cards (COMING SOON) show remaining projects that are not yet published
5. Contact section at the bottom triggers a Netlify Forms submission

---

## Identity Rules

| Element | Value |
|---------|-------|
| Title | Senior Product Designer |
| Tagline | "18 years. Startup to IPO. Still shipping." |
| Stats | 18 YEARS · $2B+ PROCESSED · TSX-V LISTED · 20+ JURISDICTIONS |
| Katipult framing | "Co-founder & Lead Product Designer" (historical credential — company no longer exists) |
| MZM Labs framing | "Product Design Consultant" — never Co-Founder |
| AKMSecure framing | "Design Consultant" |
| No MZM Labs branding on this site | |
| No italics anywhere | |

---

## Status

Live at https://uxmeas.com. Auto-deploys from the `main` branch via Netlify.

4 case studies published (Compliance UX, Katipult DealFlow, AKMSecure, MultiPaste). 4 ghost cards visible for remaining projects (Docs to Design, IsoBlock, RelationSync, MyPick.io).
