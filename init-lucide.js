/* init-lucide.js — hydrate <i data-lucide="..."> elements after Lucide CDN loads.

   External per CSP `script-src 'self'` (no 'unsafe-inline') — the previous
   inline init was silently blocked, so case-study card icons (shield-check,
   dollar-sign, etc.) never rendered on dev/prod.

   Defer-loaded after the Lucide CDN tag, so by the time this runs, Lucide
   is parsed + DOM is ready (defer guarantees document order + DCL-equivalent
   timing). No DOMContentLoaded listener needed. */
(function () {
  'use strict';
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
})();
