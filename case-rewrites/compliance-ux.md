# Case Rewrite Brief — Compliance UX

**For:** Vendy (UXMEAS COO) + delegated rewrite agent
**Created:** 2026-05-04 by Pheak's session agent
**Status:** Brief ready for rewrite. Source HTML lives on dev branch + Cloudflare preview.

## Source

- **HTML file:** `/Users/pheakmeas/Documents/Development/uxmeas/compliance-ux.html`
- **Live preview:** https://dev.uxmeas.pages.dev/compliance-ux.html
- **Branch:** `dev` (current SHA `a67dbbd`)
- **Voice contract (must read first):** `/Users/pheakmeas/Documents/Development/_copy/uxmeas.com/scriptwriter-contract.md`

## Mission

Rewrite the case study to pass the senior-PD hiring-manager scan in 30–90 seconds. The fix is **tighter voice + stronger numbers + verb-first prose** — not more polish, not more sections. Default voice = verb-first. *"I"* appears 1–2x per section as agency anchor, never the subject of every sentence.

**Triggered by:** 2026-05-04 Feroot rejection. External recruiter feedback (verbatim): *"You struggled to give direct answers and generally spoke in terms of 'we' (the team) rather than focusing on your individual actions. Unfortunately, that's a deal breaker."* The we→I surgery is done; this brief addresses what the surgery doesn't reach.

## Case identity

| Field | Value |
|---|---|
| Eyebrow | CS-01 · COMPLIANCE UX · INVESTOR ONBOARDING · CAPITAL MARKETS |
| Hero h1 | "KYC that ships in 12 minutes. From 45. Across 20+ jurisdictions." |
| Role | Head of Product Design |
| Timeline | 2014–2025 (11 years) |
| Team | Founding designer → 30+ company → 2 design reports |
| Clients | 150+ institutional dealers incl. Canaccord Genuity, Raymond James, Sprott Capital |
| Live URL | https://dev.uxmeas.pages.dev/compliance-ux.html |

## Voice metrics — current (must improve, not regress)

- **"I" count in body prose:** 4 (after I-balance pass on 2026-05-04)
- **"me / my" count:** 0
- **"we / our / us" in body:** 0 (HMW callout phrase exempt)
- **Management verbs (banned without action verb pair):** Led / Managed / Oversaw / Owned / Drove / Spearheaded / Established — 0 hits in body

## Voice contract — every rewrite must satisfy these 7 rules

1. **Open with action, not context.** First sentence/bullet/spoken line = `"I [verb-past-tense] [specific thing]"` OR verb-first `"[Verbed] [thing]"`. Never company history, never *"This is a story about…"*.
2. **Numbers in first 10 seconds (or first 5 words of a bullet).** Before/after metric required.
3. **Mechanical cause, not adjective.** *"Made it faster"* fails. *"Replaced the wizard with a state machine"* succeeds. Name the design lever.
4. **One claim per beat.** Spoken: 1-claim per ~15 sec. Written: 1-claim per bullet.
5. **Verb-first default; "I" anchors agency, doesn't dominate.** 1–2 *"I"*s per section at openers + decision points. Both failure modes hurt: *"we"* = deflection, *"I-I-I"* = narcissism. Replace pronouns with **data, mechanical cause, results** wherever verb-first reads stronger.
6. **Kill management verbs without concrete action.** Banned: *led, managed, oversaw, owned, drove, spearheaded, established*. Replace with: *designed, shipped, built, cut, reduced, wrote, ran, pivoted, architected, delivered*.
7. **End with ROI / business consequence.** Not *"thanks for reading"*.

**The formula:** `[I VERBED] [SPECIFIC THING] [BY NUMBER]. WHY IT MATTERS: [CONSEQUENCE].`

**Anti-patterns that fail the rewrite:**
- Greeting / intro / company-history throat-clear
- First minute / first bullet without numbers
- *"better / improved / streamlined / optimized"* without metric
- *"we"* without a named co-creator
- *"led / managed / oversaw / drove"* without concrete action verb pair
- Closing on a personal sign-off rather than business outcome

## What's LOCKED (do not change)

- **Hero h1:** *"KYC that ships in 12 minutes. From 45. Across 20+ jurisdictions."* — already nails before/after.
- **Hero stats block:** 45→12 min · 85% from 47% · 150+ offerings — already executive-summary pattern, all numbers are evidence-backed.
- **Eyebrow:** CS-01 numbering (other cases CS-02/03/04, sequence is fixed).
- **Up next chain:** Currently *"Up next · 02 / 03 → Katipult"*. Don't break the chain across the 4 cases.
- **Foundation file path:** Don't rename images or break image refs.
- **Approved hero sub (most recent rewrite):** *"I redesigned investor onboarding from a six-document, 45-minute paper trail into one 12-minute adaptive flow — collapsed jurisdiction branching, replaced wizards with a state machine, surfaced compliance status in real time. Shipped to Canaccord, Raymond James, and Sprott across $2B+ in regulated transactions."* — Pheak signed off on this exact phrasing on 2026-05-04. Only change if you have a strictly stronger version.

## Reshape targets (where the rewriter has room)

### §02 Context paragraph (line ~1038 in HTML)
**Current:** *"Founded the design practice and ran it solo for three years. As the company grew to 30+, design's role got built inside it — every investment defended in numbers the business already tracked: drop-off rates, audit risk, dealer churn. Owned the design system, the jurisdiction-rules engine, and the compliance dashboard. Hired and managed a senior + junior designer. By the time Markette acquired the company, design was reviewing every major release. Time to move on."*
**Issue:** Already verb-first. Could push harder on numbers — what was drop-off rate when the design practice started vs ended?
**Reshape direction:** Add 1-2 evidence numbers. Optionally trim "Hired and managed" sentence.

### §03 Problem section
**Current:** Strong section-lede *"Every unverified AI handoff is a breach in motion."* + 2 prose-body paragraphs.
**Issue:** Reads well. Verify the body paragraphs lead with verbs not "Investors abandoned because…" passive.
**Reshape direction:** If any sentence starts with *"Investors abandoned"* or *"Compliance officers had"* — flip to verb-first or to the design lever that fixed it.

### §04 Approach paragraph (line ~1116 in HTML)
**Current:** *"I designed the research. The dealers ran it. Canaccord, Raymond James, and Sprott had daily access to real investors, so I set the protocol and their teams observed sessions on their floors. Their notes came back weekly. Platform drop-off analytics ran in parallel and confirmed the same patterns across every jurisdiction."*
**Issue:** 2 *"I"*s — might be on the edge. The two anchor specific division of labor (Pheak designed research / Pheak set protocol). Both are load-bearing — likely keep.
**Reshape direction:** Don't trim aggressively. Maybe combine the two action sentences: *"I designed the research and set the protocol — the dealers ran sessions on their floors."* (drops 1 "I", same content.)

### §05 Decisions section
**Current:** Read the HTML for current decisions list.
**Reshape direction:** Each decision should be a tight `[Verb] + [Specific feature/lever] + [Measurable outcome or rationale]` line. If any decision reads as descriptive ("we reorganized the menu") rather than mechanical ("collapsed 6 documents into a 4-step state machine"), tighten it.

### §06 Process section
**Reshape direction:** Process beats should each name a date-bounded action with an artifact. If any beat is vague ("worked with stakeholders") — replace with a specific output ("shipped Figma prototype reviewed by Sprott compliance officer on April 12").

### §07 Results paragraph
**Current:** *"NIGO (not-in-good-order) submissions dropped enough that ECM teams stopped chasing corrections and started closing deals. The compliance team grew slowly while investor volume kept climbing — automation handled the high-confidence cases, humans owned the exceptions."* + sister-product extension paragraph.
**Issue:** Strong story, but no numbers in the prose. The hero stats carry the numbers; the prose narrates the consequence. Could be even stronger with 1 number per sentence.
**Reshape direction:** Add a NIGO-rate-before-after if available, or compliance-team-headcount-vs-volume ratio.

### §08 Reflection (3 takeaways)
**Current:** *"Three takeaways. Compliance isn't a UX blocker. It's the brief. Wizards break when paths split. State machines don't. The people closest to users — dealers, compliance officers — know more than any lab. I use all three now."*
**Issue:** Strong close. *"I use all three now"* is a personal anchor — keep.
**Reshape direction:** Possibly add a 4th takeaway about leadership/scale (since this case spans 11 years and a team grew). Optional.

## Acceptance criteria (Vendy validates)

- [ ] All 7 voice contract rules pass on every paragraph
- [ ] *"I"* count stays at 4 ± 1 (don't add more, can drop 1-2)
- [ ] *"we / our / us"* count = 0 (HMW phrase exempt)
- [ ] Every body claim either ends in a number, names a tier-1 customer, or specifies a mechanical lever
- [ ] No *"better / improved / streamlined / optimized"* without a number
- [ ] No management verbs without paired action verb
- [ ] Locked items unchanged (hero h1, stats block, eyebrow, Up next chain, hero sub)
- [ ] Up next eyebrow still reads *"Up next · 02 / 03"* pointing to Katipult
- [ ] Voice contract Rule 7 satisfied at the close (ROI/business consequence, not personal sign-off)

## Vendy cold-read validation

After the rewrite lands, read the case fresh (no context) and answer:
1. **In 30 seconds, what did Pheak do at Katipult?** (target: KYC redesign 45→12 min, IIROC/Reg CF/MiFID/FINTRAC, $2B+, top-3 institutional dealers)
2. **What's the strongest single number?** (target: 45→12 OR 47%→85%)
3. **Does this read as senior IC or senior manager?** (target: senior IC who happened to also lead a small team)
4. **Any sentence trip the "I-I-I" or "we / team" alarm?** (target: zero)

If all 4 land cleanly, ship via dev → staging → main per CLAUDE.md branch flow. Otherwise iterate.

## Hand-off / questions

If the rewriter has questions Pheak needs to answer:
- Post on FuzeHQ with `[QUESTION for @Pheak]` per cross-machine collab protocol in CLAUDE.md
- Or comment in `case-rewrites/QUESTIONS.md` (create if needed)
- Don't guess at numbers — every metric must be evidence-backed in the existing case body or a known fact from CLAUDE.md
