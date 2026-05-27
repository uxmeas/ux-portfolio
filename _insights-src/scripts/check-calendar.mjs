#!/usr/bin/env node
/**
 * Build-time cadence warning for uxmeas.com /insights.
 *
 * Reads _copy/uxmeas.com/content-calendar.md, finds the next 2 slots from today,
 * checks status. If status is OPEN (no topic seeded), prints a warning.
 *
 * Soft warning only — doesn't fail the build. Cloud builds (where _copy/ isn't
 * available) skip silently.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CALENDAR_PATH = path.resolve(__dirname, '../../../_copy/uxmeas.com/content-calendar.md');

function bail(msg) {
  console.warn(`[insights:calendar] ${msg}`);
  process.exit(0);
}

if (!fs.existsSync(CALENDAR_PATH)) {
  bail('content-calendar.md not found at expected path; skipping cadence check.');
}

const raw = fs.readFileSync(CALENDAR_PATH, 'utf8');

// Match table rows: | YYYY-MM-DD (Mon|Thu) | post-NNN | STATUS | ...
const rowPattern = /\|\s*(\d{4}-\d{2}-\d{2})\s*\((Mon|Thu)\)\s*\|\s*(post-\d+)\s*\|\s*(OPEN|SEEDED|DRAFT|READY|LIVE)\s*\|/g;

const slots = [];
let match;
while ((match = rowPattern.exec(raw)) !== null) {
  slots.push({
    date: new Date(`${match[1]}T00:00:00`),
    weekday: match[2],
    id: match[3],
    status: match[4],
  });
}

if (slots.length === 0) {
  bail('no slots parsed from content-calendar.md; skipping cadence check.');
}

const now = new Date();
now.setHours(0, 0, 0, 0);
const upcoming = slots.filter((s) => s.date >= now).sort((a, b) => a.date - b.date);
const nextTwo = upcoming.slice(0, 2);

const openCount = nextTwo.filter((s) => s.status === 'OPEN').length;

if (openCount > 0) {
  console.warn('');
  console.warn('  ⚠  uxmeas.com /insights — cadence warning');
  console.warn(`  ${openCount} of the next ${nextTwo.length} calendar slots are still OPEN:`);
  for (const s of nextTwo) {
    const flag = s.status === 'OPEN' ? '  ← needs topic' : '';
    console.warn(`     ${s.date.toISOString().slice(0, 10)} (${s.weekday}) ${s.id}  ${s.status}${flag}`);
  }
  console.warn(`  Edit ${path.relative(process.cwd(), CALENDAR_PATH)} to seed topics.`);
  console.warn('');
} else {
  console.log(`[insights:calendar] next 2 slots seeded: ${nextTwo.map((s) => `${s.date.toISOString().slice(0, 10)} (${s.status})`).join(', ')}`);
}
