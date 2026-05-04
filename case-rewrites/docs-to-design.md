# Case Rewrite Brief — Docs to Design

**For:** Vendy (UXMEAS COO) + delegated rewrite agent
**Created:** 2026-05-04 by Pheak's session agent
**Status:** Brief ready for rewrite. This case got ZERO session edits — it's the lightest-touched of the four. Voice is already pronoun-clean (0 we/our/us, 0 I), but that's because it reads almost entirely as descriptive product copy. Needs the most substantive Pheak-as-IC voice work.

## Source

- **HTML file:** `/Users/pheakmeas/Documents/Development/uxmeas/docs-to-design.html`
- **Live preview:** https://dev.uxmeas.pages.dev/docs-to-design.html
- **Branch:** `dev` (current SHA `a67dbbd`)
- **Voice contract (must read first):** `/Users/pheakmeas/Documents/Development/_copy/uxmeas.com/scriptwriter-contract.md`

## Mission

Transform the case from a **product description** into a **case study about a designer who shipped a product**. The current copy reads like a Figma plugin store listing — it tells the reader what the plugin does, not what Pheak did to design and ship it. Add Pheak's voice (1–2 *"I"* anchors per section), name the design decisions made, and surface the product/business case for *why* this plugin exists at all.

**Triggered by:** 2026-05-04 Feroot rejection. Recruiter feedback (verbatim): *"You struggled to give direct answers and generally spoke in terms of 'we' (the team) rather than focusing on your individual actions."* Even though this case has no *"we"*, it has no *"I"* either — equally invisible authorship is the same problem.

## Case identity

| Field | Value |
|---|---|
| Eyebrow | CS-04 (newest in sequence — was previously hidden, unhidden 2026-05-04) |
| Hero h1 | "Document to Figma in Under 60 Seconds" |
| Role | Product Designer and Developer |
| Timeline | 2025 to 2026 |
| Type | Figma Plugin and SaaS |
| Live URL | https://dev.uxmeas.pages.dev/docs-to-design.html |

## Voice metrics — current

- **"I" count in body:** 0 — too few. Needs 4–8 *"I"* anchors at section openers + decision points.
- **"me / my" count:** 0
- **"we / our / us" in body:** 0 (already clean)
- **Issue:** Anonymous descriptive voice. Reads as a marketing page for the plugin, not as Pheak's case study. The HM doesn't know what Pheak's design decisions were — only what the plugin does.

## Voice contract — every rewrite must satisfy these 7 rules

1. **Open with action, not context.** First sentence/bullet/spoken line = `"I [verb-past-tense] [specific thing]"` OR verb-first.
2. **Numbers in first 10 seconds (or first 5 words of a bullet).** Before/after metric required.
3. **Mechanical cause, not adjective.** Name the design lever, not the feeling.
4. **One claim per beat.** Spoken: 1-claim per ~15 sec. Written: 1-claim per bullet.
5. **Verb-first default; "I" anchors agency, doesn't dominate.** 1–2 *"I"*s per section. Replace pronouns with **data, mechanical cause, results** wherever verb-first reads stronger.
6. **Kill management verbs without concrete action.** Banned: *led, managed, oversaw, owned, drove, spearheaded, established*.
7. **End with ROI / business consequence.** Not *"thanks for reading"*.

**The formula:** `[I VERBED] [SPECIFIC THING] [BY NUMBER]. WHY IT MATTERS: [CONSEQUENCE].`

## What's LOCKED (do not change)

- **Hero h1:** *"Document to Figma in Under 60 Seconds"* — already strong before/after framing.
- **Hero sub:** *"Auto-detects document hierarchy. Maps to design tokens. Generates Figma layers. 98% reduction in translation time."* — verb-first triplet + closing metric. Already satisfies the contract; only edit if you have a strictly stronger version.
- **Stats block** (60→1 min · 2 modes · Auto-detect) — already executive-summary pattern.
- **CS-04 eyebrow** numbering (4-case sequence is fixed).
- **Up next chain:** Currently the LAST in the chain. Consider where it points — likely back to "Let's talk" or to Compliance UX.
- **Plugin name + capability claims:** 98% reduction, H1–H6 hierarchy detection, native Figma frames, design-token mapping, two UX modes (Wizard/Compact Pro). Don't invent new capabilities.

## Reshape targets (where the rewriter has room)

### 🎯 PRIMARY TARGET — Add a Pheak-as-IC origin paragraph
**Current:** Likely jumps from hero into product description.
**Reshape direction:** Add an Origin or Context paragraph after the hero stats, like compliance-ux and fuzehq do. Pattern:
> *"I designed Docs to Design because [the specific friction Pheak hit]. As a designer translating PRDs into wireframes by hand, [time/cost/error]. So I shipped a plugin that reads document hierarchy and maps it to design tokens — replacing a 60-minute manual translation with a paste."*

Pheak needs to confirm the personal-pain-point framing. If unknown, use evidence-backed phrasing about general designer friction.

### 🎯 PRIMARY TARGET — Two UX modes design decision
**Current:** Listed as a feature ("Two modes: Wizard for beginners, Compact Pro for power users").
**Reshape direction:** This is a senior-PD-coded design decision. Promote it. Pattern:
> *"I designed two UX modes — Wizard for first-time users, Compact Pro for power users — because the same plugin had to serve two non-overlapping user populations: designers paste-converting PRDs once a week, and PMs running batch conversions on every doc. Mode selection is a one-time decision; once chosen, it's invisible."*

### Hierarchy-detection mechanical cause
**Current:** Likely says "auto-detects H1–H6."
**Reshape direction:** Name the actual heuristic Pheak built. Was it style-based? Pattern-based? Both? *"I built a hierarchy-detection algorithm that reads document styles AND content patterns — handles both well-styled Word docs and styleless plain text without breaking."*

### Design-token mapping decision
**Current:** Listed as a feature.
**Reshape direction:** Why tokens? *"I chose design-token mapping over hard-coded styles so the plugin output stays in sync with the user's design system — change a token, every previously-converted frame updates."*

### Process / shipping narrative
**Current:** Likely missing or thin.
**Reshape direction:** Add 2–4 process beats with date-bounded actions:
- *"I shipped V1 to the Figma Community in [month], [N downloads]"*
- *"After [N user reports], I added Compact Pro mode in [month]"*
- *"V2 added [feature] for [reason]"*

If specific dates/numbers aren't available, post a question to Pheak.

### Outcome / impact
**Current:** Stats block carries the metrics; prose is thin.
**Reshape direction:** Add a results paragraph: *"98% time reduction in design-token mapping. [N] designers using the plugin in their daily workflow. [Tier-1 customer or notable adoption signal, if any]."*

### Reflection (if missing)
**Reshape direction:** A senior-PD case earns a reflection. Pattern from compliance-ux: *"Three takeaways. [Lesson 1]. [Lesson 2]. [Lesson 3]. I use all three now."*

## Acceptance criteria (Vendy validates)

- [ ] All 7 voice contract rules pass on every paragraph
- [ ] *"I"* count grows from 0 to 4–8 (anchored at section openers + decision points)
- [ ] *"we / our / us"* count = 0
- [ ] At least one Pheak-as-IC origin paragraph added (the *"why I built this"*)
- [ ] At least two design decisions named with mechanical cause + rationale (UX modes + hierarchy detection at minimum)
- [ ] Process/shipping narrative present (not just feature list)
- [ ] Reflection section present
- [ ] Locked items unchanged (hero h1, hero sub, stats block, eyebrow, evidence numbers)
- [ ] Voice contract Rule 7 satisfied at close

## Vendy cold-read validation

After the rewrite lands, read the case fresh and answer:
1. **In 30 seconds, what did Pheak do?** (target: designed and shipped a Figma plugin that converts hierarchical docs to native frames; built hierarchy-detection algorithm; designed two UX modes for non-overlapping users; mapped output to user's design tokens)
2. **What's the strongest single number?** (target: 60→1 min OR 98% reduction)
3. **Does this read as senior IC or senior manager?** (target: senior IC product designer who also ships code — Pheak's role is "Product Designer and Developer", which is the IC sweet spot for this case)
4. **Any sentence trip the "I-I-I" or "we / team" alarm?** (target: zero — currently zero "I" but that's because there's NO Pheak voice yet; rewrite must add 4–8 anchored *"I"*s without overshooting)

If all 4 land cleanly, ship via dev → staging → main. Otherwise iterate.

## Hand-off / questions

This case has the most unknowns of the four. Likely questions Pheak will need to answer:
- What was the specific design friction that triggered the plugin's creation?
- Real numbers: download count, active users, notable adoption?
- Date-bounded process beats (V1 ship, V2 features, etc.)?
- Did Pheak build the hierarchy-detection heuristic himself, or was it library-based?
- Are there design-token-mapping edge cases worth naming?

Post all questions via FuzeHQ `[QUESTION for @Pheak]` or in `case-rewrites/QUESTIONS.md`. Don't guess at numbers — every metric must be evidence-backed.
