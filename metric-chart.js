/* =============================================================
   metric-chart.js — case-study donut + delta count-up animation
   Triggers when .metric-chart enters viewport (15% threshold).
   Resets [data-count] text to 0 before observer fires so
   scroll-triggered animation runs from 0 → target. Reduced-motion
   sets final value directly without animation.

   Used by: compliance-ux.html, docs-to-design.html (and any future
   case study with a .metric-chart container holding [data-count]).

   Extracted from inline <script> 2026-05-08 — CSP `script-src 'self'`
   without `'unsafe-inline'` was blocking the inline IIFE on dev/prod,
   so the donut arcs and stat numbers never animated.
   ============================================================= */
(function () {
  'use strict';

  const charts = document.querySelectorAll('.metric-chart');
  if (!charts.length) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateNumber = (el) => {
    const target = parseFloat(el.dataset.count);
    if (isNaN(target)) return;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    if (reduced) { el.textContent = prefix + Math.round(target) + suffix; return; }
    const duration = 1100;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* Reset countup text to "0" before observer fires so the scroll-triggered
     animation runs from 0 → target. HTML inner text holds the target as the
     no-JS fallback; with JS we need to reset. Skipped on reduced-motion
     since animateNumber sets the final value directly in that path.
     Defer-loaded so DOM is parsed by the time this runs — no flicker. */
  if (!reduced) {
    charts.forEach((chart) => {
      chart.querySelectorAll('[data-count]').forEach((el) => {
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        el.textContent = prefix + '0' + suffix;
      });
    });
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const chart = entry.target;
      chart.classList.add('is-visible');
      chart.querySelectorAll('[data-count]').forEach(animateNumber);
      io.unobserve(chart);
    });
  }, { threshold: 0.15 });

  charts.forEach((c) => io.observe(c));
})();
