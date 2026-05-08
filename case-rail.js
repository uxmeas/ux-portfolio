/* =============================================================
   case-rail.js — case-switcher (scroll-anchored)
   - Rail anchors smooth-scroll to each section
   - IntersectionObserver tracks which panel is in view → sets active rail item
   - Same observer triggers slide-in animation per panel (one-shot via .is-visible)

   Extracted from inline <script> 2026-05-08 — CSP `script-src 'self'`
   without `'unsafe-inline'` was blocking the inline IIFE on dev/prod.
   ============================================================= */
(function () {
  'use strict';

  const rail = Array.from(document.querySelectorAll('.case-rail-item'));
  const panels = Array.from(document.querySelectorAll('.case-panel'));
  if (!rail.length || !panels.length) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Active rail tracking: pick the panel currently centred in viewport.
     rootMargin biases the trigger zone toward the upper-third of the screen
     so the rail flips as soon as a section starts dominating the view. */
  const activeIo = new IntersectionObserver((entries) => {
    let best = null;
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
    });
    if (!best) return;
    const id = best.target.id;
    rail.forEach((r) => {
      r.classList.toggle('is-active', 'case-' + r.dataset.target === id);
    });
  }, {
    rootMargin: '-30% 0px -55% 0px',
    threshold: [0, 0.25, 0.5, 0.75, 1]
  });
  panels.forEach((p) => activeIo.observe(p));

  /* Slide-in reveal: one-shot per panel as it enters view */
  if (reduced) {
    panels.forEach((p) => p.classList.add('is-visible'));
  } else {
    const revealIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealIo.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    panels.forEach((p) => revealIo.observe(p));
  }

  /* Smooth scroll on rail click. Native anchor would jump; we override
     to honour scroll-margin-top and avoid layout-shift jank. */
  rail.forEach((r) => {
    r.addEventListener('click', (e) => {
      const id = r.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'start'
      });
      history.replaceState(null, '', '#' + id);
    });
  });
})();
