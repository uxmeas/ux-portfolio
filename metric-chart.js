/* =============================================================
   metric-chart.js — case-study donut reveal
   Toggles .is-visible on .metric-chart when it enters viewport.
   The donut arc animates via CSS (gated by html.has-js), counting
   the percentage visually. Numbers stay static at their HTML target
   value — design call: with the donut animating the same data, a
   count-up on the number is redundant motion (overkill).

   Used by: compliance-ux.html, docs-to-design.html (and any future
   case study with a .metric-chart container).

   Reduced-motion: chart marks .is-visible immediately so the donut
   renders at target with no transition (CSS handles the no-anim path).
   ============================================================= */
(function () {
  'use strict';

  const charts = document.querySelectorAll('.metric-chart');
  if (!charts.length) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    charts.forEach((c) => c.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  charts.forEach((c) => io.observe(c));
})();
