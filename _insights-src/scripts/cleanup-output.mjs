#!/usr/bin/env node
/**
 * Post-build cleanup for uxmeas.com /insights.
 *
 * Astro 5 in static mode leaks server-side build chunks (chunks/, collections/,
 * content-*.mjs) into the output dir. These files are never referenced from the
 * static HTML, but they bloat the deploy. This script removes them.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../../insights');

const STALE_PATHS = [
  'chunks',
  'collections',
  'content-assets.mjs',
  'content-modules.mjs',
];

let removed = 0;
for (const rel of STALE_PATHS) {
  const target = path.join(OUT, rel);
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
    removed++;
  }
}

console.log(`[insights:cleanup] removed ${removed} build artifact(s) from ${path.relative(process.cwd(), OUT)}/`);
