/* has-js gate. MUST run synchronously in <head> before any stylesheet
   so the .has-js CSS rules (e.g. metric-chart donut starts at empty
   dashoffset and animates to target on .is-visible) take effect on first
   paint. No defer, no async — sync external script.

   Extracted from inline <script> 2026-05-08 — CSP `script-src 'self'`
   without `'unsafe-inline'` was blocking the inline setter, leaving
   .has-js unset, which made donut arcs render at target (no animation). */
document.documentElement.classList.add('has-js');
