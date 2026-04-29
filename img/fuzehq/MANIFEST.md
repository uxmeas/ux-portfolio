# FuzeHQ case-study image manifest
Generated: 2026-04-29 by Kai (Phase D.1)
Source: /Users/pheakmeas/Documents/Development/Pencil/fuzehq-dashboard.pen

All PNGs are RGBA (transparent backgrounds confirmed via `sips -g hasAlpha`). Working .pen file kept full-fidelity — no nodes deleted, no destructive surgery applied (per `feedback-pencil-export-non-destructive.md`).

## Hero shots (case-study WOW)
- `taskdetail-desktop.png` — Task Detail pipeline widget, audit-trail showcase (run-summary timeline + horizontal pipeline) — 1440 x 1440, scale 1x
- `memory-v2-desktop.png` — Memory v2 interactive knowledge graph (agent nodes orbiting v2.4 release tag, Pheak at center) — 1440 x 1100, scale 1x
- `taskdetail-mobile.png` — Task Detail vertical pipeline (WOW #1 at small scale) — 754 x 1672, scale 2x
- `memory-v2-mobile.png` — Memory v2 Tag-Stream pattern (WOW #2 at small scale) — 754 x 1672, scale 2x

## Supporting shots
- `dashboard-desktop.png` — Dashboard with Row Grammar locked (Avatar > Name > Badge > Description > Time + Trail-Signal), Roster strip with 6 agents, Live activity stream, Run Loop sidebar — 2880 x 2200, scale 2x
- `dashboard-mobile.png` — Dashboard mobile (greeting, brand sentence, roster horizontal scroll, agent runs counter, live activity, bottom tab bar) — 754 x 1672, scale 2x
- `inbox-desktop.png` — Inbox v2.4 release thread notifications — 2880 x 2200, scale 2x
- `inbox-mobile.png` — Inbox mobile — 754 x 1672, scale 2x
- `projects-desktop.png` — Projects with v2.4 milestone + workload breakdown — 2880 x 2200, scale 2x
- `projects-mobile.png` — Projects mobile — 754 x 1672, scale 2x
- `memory-v1-desktop.png` — Memory v1 list view (saved facts, v2.4 release thread) — 2880 x 2760, scale 2x
- `memory-v1-mobile.png` — Memory v1 mobile — 754 x 1672, scale 2x

## Foundation
- `foundation-brand.png` — "AI work, made visible." canonical brand sentence section — 2768 x 466, scale 2x

## Notes for Thea (Phase D.2 dispatch)
- All PNGs are transparent background. CSS bloom glow goes on top per CEO directive 2026-04-29.
- Mobile PNGs are screen-content-only (377 x 836 source frame, exported at 2x = 754 x 1672). No iPhone bezel baked in. If Thea wants a device frame, apply via CSS (or skip — screens are already corner-rounded at 42px).
- Hero shots: Task Detail pipeline (audit-trail) + Memory v2 knowledge graph are the two WOW screenshots — design the case-study around these.
- Dashboard desktop showcases the locked Row Grammar (Avatar > Name > Badge > Description > Time + Trail-Signal). Worth featuring in the design-system section.
- Foundation brand-sentence PNG is wide-and-short (2768 x 466 — aspect ratio ~6:1) — fits a hero band well.

## Export technical notes
- Desktop artboards exported at scale 2x via `mcp__pencil__export_nodes`.
- `taskdetail-desktop.png` and `memory-v2-desktop.png` exported at scale 1x (the export tool returned errors at scale 2x for these two artboards — likely bumping the 8192 max-resolution cap with effects/blob rendering overhead). Resolution still high enough for case-study hero use; if Thea needs higher fidelity, request scale 2x retry on isolated nodes.
- Mobile screens exported by selecting the inner `screen` frame (e.g., `VbCgm`, `A5YZW`) directly — bypasses the bezel decoration cleanly without any node toggles. The .pen file's bezel + status bar + home indicator nodes remain visible for future iteration.

## Source node ID map (reference)
| Filename | Pencil node ID | Type |
|---|---|---|
| `foundation-brand.png` | `Uo5ao` | Brand Sentence subset of `VUWJj` Foundation |
| `dashboard-desktop.png` | `W9pEO` | full artboard |
| `taskdetail-desktop.png` | `CPqzL` | full artboard |
| `inbox-desktop.png` | `JmwoG` | full artboard |
| `projects-desktop.png` | `gATA8` | full artboard |
| `memory-v1-desktop.png` | `v3hNP` | full artboard |
| `memory-v2-desktop.png` | `Aiont` | full artboard |
| `dashboard-mobile.png` | `VbCgm` | inner screen (parent: `jNFKo`) |
| `taskdetail-mobile.png` | `A5YZW` | inner screen (parent: `sxPjI`) |
| `inbox-mobile.png` | `O8H7gq` | inner screen (parent: `Thkl6`) |
| `projects-mobile.png` | `rdnsU` | inner screen (parent: `b6Qaty`) |
| `memory-v1-mobile.png` | `D9L7h` | inner screen (parent: `ON70X`) |
| `memory-v2-mobile.png` | `tPOtO` | inner screen (parent: `Z7ujk4`) |
