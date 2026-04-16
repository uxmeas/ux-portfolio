# Careers — Job Application Tracker

**Last updated**: 2026-03-30
**Priority**: #1a (tied with portfolio)
**Stage**: Active

---

## What EXISTS (do NOT recreate)

### Folder Structure
```
uxmeas/careers/
├── STATUS.md              ← This file (Rio updates)
├── _templates/
│   ├── resume.html        ← Master resume (copy + customize per company)
│   └── cover-letter.html  ← Cover letter template (customize per role)
└── {company-name}/        ← One folder per application
    ├── resume.html         ← Tailored resume (preset + content tweaks)
    ├── cover-letter.html   ← Tailored cover letter
    └── notes.md            ← Role details, contact, status, follow-up dates
```

### How to Apply to a New Company
1. Create folder: `careers/{company-name}/`
2. Copy templates: `cp _templates/resume.html _templates/cover-letter.html {company-name}/`
3. Customize resume: uncomment the right preset, tweak content to mirror job posting
4. Customize cover letter: fill in role, company, specific observation, mirrored language
5. Save as PDF: Print > Save as PDF (no headers/footers)
6. Update this STATUS.md with the new application
7. Create Paperclip task: `./paperclip.sh create "Apply: {Company} — {Role}"`

### Templates
- **Resume presets**: Default (9pt, senior standard), Compact (8.5pt, agencies), Spacious (9.5pt, design companies)
- **Cover letter**: Under 150 words. Katipult IPO leads. One specific observation about their product. Portfolio link.
- **Voice**: Job Hunting Voice skill (`my-skills/job-hunting-voice/SKILL.md`)

### Rate Card
- $100/hr USD (contract, remote US)
- $135/hr CAD (direct Calgary)
- $80+ CAD/hr (agency placements, they set rate)
- $140k+ CAD / $150k+ USD (full-time)

---

## Applications

| # | Company | Role | Applied | Status | Folder | Notes |
|---|---------|------|---------|--------|--------|-------|
| — | — | — | — | — | — | No applications yet |

**Status key**: Researching > Applied > Screening > Interview > Offer > Accepted / Rejected / Withdrawn

---

## What's DONE
- [x] Careers folder structure created (March 30)
- [x] Resume template built (HTML, tokenized, 3 presets)
- [x] Cover letter template built (HTML, matches resume design)
- [x] Paperclip project created and linked
- [x] MakerHQ task descriptions written for all 17 sprint tasks (March 31)

## MakerHQ Task Map
Full descriptions ready to paste: `Client-Projects/job-hunting-sprint/makerhq-task-descriptions.md`

| MakerHQ | Task | Category |
|---------|------|----------|
| MZM-45 | Update LinkedIn profile | Profile Setup |
| MZM-46 | Test uxmeas.com contact form | Profile Setup |
| MZM-47 | Register: Aquent / Vitamin T | Staffing Agency |
| MZM-48 | Register: Robert Half | Staffing Agency |
| MZM-49 | Register: Randstad Digital | Staffing Agency |
| MZM-50 | Register: Creative Niche | Staffing Agency |
| MZM-51 | Register: Tundra Technical | Staffing Agency |
| MZM-52 | Register: Hays Canada | Staffing Agency |
| MZM-53 | Register: David Aplin Group | Staffing Agency |
| MZM-54 | Apply: Coinbase — Sr Product Designer (AI) | Application (Tier 1) |
| MZM-55 | Apply: Binance.US — Product Designer | Application (Tier 1) |
| MZM-56 | Apply: Forward Financing — Sr Product Designer | Application (Tier 1) |
| MZM-57 | Apply: NerdWallet — Product Designer | Application (Tier 2) |
| MZM-58 | Apply: Brigit — Sr Product Designer II | Application (Tier 2) |
| MZM-59 | Apply: Webflow — Sr Product Designer | Application (Tier 2) |
| MZM-60 | Apply: Grow Therapy — Senior/Staff Designer | Application (Tier 2) |
| MZM-61 | Firecrawl Play 2 | Research |

## What's NEXT
- [ ] MZM-45: Pheak updates LinkedIn (copy ready, manual action)
- [ ] MZM-46: Test uxmeas.com contact form before sending applications
- [ ] MZM-47 to MZM-53: Register with 7 staffing agencies (Week 1)
- [ ] MZM-54 to MZM-56: Tier 1 applications — Coinbase, Binance.US, Forward Financing
- [ ] MZM-57 to MZM-60: Tier 2 applications — NerdWallet, Brigit, Webflow, Grow Therapy
- [ ] MZM-61: Firecrawl Play 2 (after Round 1 sent)

## Known Issues
- Education on resume: Applied Multimedia Training Centre (closed, unverifiable). Consider removing.
- Resume needs Pheak print review and final sign-off before any applications

## Rules
- **Review gate**: Nothing submitted without Pheak's approval
- **Voice**: Job Hunting Voice, not MZM Voice
- **Accuracy**: Every fact verified with Pheak (AMTC incident, March 30)
- **Per-company folders**: Every application gets its own folder with tailored resume + cover letter
- **Track in Paperclip**: Create a task for every application sent
- **Update this file**: After every application, interview, or status change
