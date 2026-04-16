# Behance Playbook — uxmeas Case Studies

## Pipeline

```
Pheak approves .pen design → goes live on uxmeas.com → export_nodes (Pencil MCP) → composite.py → Behance upload
```

**Behance is the LAST step** — only after designs are production-ready and live.

---

## Export Flow

### Step 1: Export transparent sections from .pen
```
Pencil MCP export_nodes at 2x scale → behance/{slug}/{nodeId}.png
```

### Step 2: Composite gradient backgrounds
```bash
python3 behance/composite.py
```
Reconstructs the navy atmospheric gradient, composites transparent sections on top, outputs named PNGs at 2880px wide.

### Step 3: Upload to Behance
Manual drag-and-drop. Paste copy from this file. Click Publish.

---

## Node IDs (uxmeas-portfolio.pen) — MUST use v2 frames

```
v2 Compliance UX: bjygT
  Sections: vGzrN, sZNHW, F3nTd, qCGVc, MCYVj, iokne, nDLF8

v2 DealFlow: BeC5J
  Sections: kv6Ol, A4Ab3, sjdrT, YL4EJ, TT09Q, qUyn8, KJF9f, BpsiQ, Zdh8Q
```

v1 frames (zw5Ei, PW1oJ) are ARCHIVED — never export from these.

---

## Image Specs
- **Width**: 2880px (2x retina, displays at 1400px on Behance)
- **Format**: PNG
- **File size**: under 10MB each (all currently under 1MB)

---

## PUBLISHING STRATEGY

### Timing
- **Best day: Tuesday or Wednesday**
- **Best time: 9:00-10:00 AM EST**
- Avoid Friday-Sunday (low engagement)
- Avoid Monday (feed congestion)

### Publish Order
1. **First: Compliance UX** (Tuesday) — specific, measurable, hooks recruiters
2. **Second: DealFlow** (following Tuesday) — career-defining depth piece, converts

**Stagger by 7 days.** Two at once means they compete. Staggering gives two visibility spikes and re-surfaces your profile in feeds.

---

## BEHANCE PROFILE SETUP (Do Before First Publish)

### Display Name
Pheak Meas

### Bio
```
Product Designer & Builder. 16 years. Co-founded a company that went public. Portfolio: uxmeas.com
```

### Location
Calgary, Canada (or target market for US remote roles)

### Profile Creative Fields
- UI/UX
- Interaction Design
- Product Design

### Website Link
uxmeas.com

### Available for Work Badge
**Turn ON** — recruiters filter by this. Critical.

### Clean Up
Delete or archive any old/basic projects before publishing the new ones. The profile should show ONLY strong work. Two polished projects > ten mediocre ones.

---

## PROJECT 1: COMPLIANCE UX

### Title (paste)
```
Redesigning KYC Onboarding — 45 to 12 Minutes Across 20+ Jurisdictions
```

### Description (paste)
```
Katipult went public on the TSX Venture Exchange. I led product design across the platform for 16 years — including the investor onboarding system that processes KYC/AML verification across 20+ regulatory jurisdictions.

The existing flow took 45 minutes. Investors dropped off before completing verification, which meant deals didn't close. I redesigned the full onboarding journey: jurisdiction-aware field logic, smart document upload, progress persistence, and a new digital signature ceremony (KSign) that replaced a fragmented e-sign process.

Completion time dropped to 12 minutes. Completion rate hit 85%. The system scaled to every white-label deployment on the platform and met WCAG 2.1 AA accessibility standards. This redesign directly increased funded deals.

Role: Lead Product Designer · Katipult Technology Corp. (TSX-V: FUND)
```

### Tags (all 15)
```
UX Design, Product Design, Fintech, KYC, Onboarding, User Research, Compliance, Interaction Design, Design Systems, Enterprise UX, Accessibility, WCAG, User Flow, Investor Experience, Digital Signatures
```

### Creative Fields
- UI/UX
- Interaction Design
- Product Design

### Cover Image
Use 01-hero.png — shows the product at its most polished. Recruiters scroll fast; the hero gives immediate context: fintech, real product, enterprise-grade.

### Upload Order
1. 01-hero.png
2. 02-challenge.png
3. 04-user-flow.png
4. 03-design-approach.png
5. 05-ksign.png
6. 06-ui-showcase.png
7. 07-results.png

**Add short text captions between image sections** (Behance text blocks, not baked into images). This increases time-on-project, which the algorithm rewards.

---

## PROJECT 2: DEALFLOW

### Title (paste)
```
From Startup to IPO — Designing the Platform That Processed $2B+ in Private Capital
```

### Description (paste)
```
Katipult went public on the TSX Venture Exchange. I led product design for 16 years — deal management, portfolio tracking, investor relations, and the design system that powered the entire product organization.

The platform serves 150+ enterprise clients across 6 markets, processing $2B+ in private capital. I designed and maintained the system across 20+ white-label deployments, each with unique branding, jurisdiction requirements, and user bases. Components that flex across brands. Flows that adapt across regulatory environments. Dashboards that serve both issuers managing deals and investors tracking portfolios.

Research-driven feature prioritization, competitive analysis, and the platform design that supported a public listing. 16 years of design decisions distilled into the work that mattered most.

Role: Lead Product Designer · Katipult Technology Corp. (TSX-V: FUND)
```

### Tags (all 15)
```
Product Design, UX Design, Fintech, Dashboard Design, Design Systems, Enterprise Software, SaaS, Data Visualization, White Label, Investor Relations, Portfolio Management, B2B Design, Interaction Design, User Research, IPO
```

### Creative Fields
- UI/UX
- Interaction Design
- Product Design

### Cover Image
Use 01-hero.png — the dashboard view with data density proves enterprise scale.

### Upload Order
1. 01-hero.png
2. 02-challenge.png
3. 04-research-table.png
4. 05-hmw-statement.png
5. 06-competitors.png
6. 03-platform-overview.png
7. 07-investor-dashboard.png
8. 08-equity-debt.png
9. 09-results.png

---

## LINKEDIN CROSS-PROMOTION (Post Within 1 Hour of Each Publish)

### For Compliance UX
```
New case study: I redesigned investor onboarding (KYC) at Katipult Technology — cut completion time from 45 minutes to 12 minutes across 20+ jurisdictions.

This is the kind of problem I love solving: regulated, complex, high-stakes, and directly tied to revenue.

Full case study on Behance: [link]

#ProductDesign #UXDesign #Fintech #KYC
```

### For DealFlow
```
New case study: 16 years of product design at Katipult Technology — from startup to IPO on the TSX Venture Exchange.

$2B+ processed. 150+ enterprise clients. A design system powering 20+ white-label deployments across 6 markets.

This is the full arc. Full case study on Behance: [link]

#ProductDesign #Fintech #DesignSystems #Enterprise
```

---

## BEHANCE ALGORITHM TIPS

1. **First image loads fast and looks distinct** — real product screens on gradient backgrounds outperform mockup templates
2. **Descriptions over 150 words** — Behance indexes text for search
3. **All 15 tag slots filled** — mix specific (KYC) with broad (Product Design)
4. **1400px+ wide images** — yours are 2880px, well above threshold
5. **Text blocks between images** — increases time-on-project
6. **Early engagement matters** — first 24 hours drive algorithmic visibility. LinkedIn post is critical.
7. **Set project background color** to match gradient (#141419) for visual cohesion

### Groups to Join
- UX/UI Design (largest)
- Dashboard & Data Visualization
- Financial Services Design
- Product Design
- Interaction Design

Share projects to each group after publishing.

---

## PRE-PUBLISH CHECKLIST

For each project:
- [ ] Section PNGs exported with gradient backgrounds (composite.py)
- [ ] Cover image selected (hero section)
- [ ] Behance profile cleaned up (delete/archive old work)
- [ ] "Available for Work" badge ON
- [ ] Profile bio updated
- [ ] Title pasted
- [ ] Description pasted
- [ ] All 15 tags added
- [ ] Creative fields selected (UI/UX, Interaction Design, Product Design)
- [ ] Background color set (#141419)
- [ ] Text captions added between image sections
- [ ] LinkedIn post drafted
- [ ] Published Tuesday 9-10 AM EST
- [ ] LinkedIn post published within 1 hour
- [ ] Shared to Behance groups

---

## ADDING FUTURE CASE STUDIES

1. Design in .pen → get Pheak approval → build HTML → go live on uxmeas.com
2. Get section node IDs: `batch_get` on the v2 parent frame
3. Export: `export_nodes` at 2x to `behance/{slug}/`
4. Run: `python3 behance/composite.py` (add project to PROJECTS dict first)
5. Write title, description, tags following the same format above
6. Upload to Behance, publish Tuesday AM EST
7. Post to LinkedIn within 1 hour

---

## Rules
- **Behance is the LAST step** — only after Pheak approves designs as production-ready AND they are live on uxmeas.com
- **Always verify you're using the ACTIVE/latest .pen frames** — check for "v2" or "ACTIVE" labels. Never export from archived/v1 frames. Exports must match what's live
- Always export from .pen — never screenshot HTML
- Role: "Lead Product Designer" — never "Co-Founder"
- Company: Katipult Technology Corp. (TSX-V: FUND)
- No AI tools mentioned — show Figma, design systems
- No MZM Labs on Behance
