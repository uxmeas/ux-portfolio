// Scroll reveal — subtle fade-up on section enter.
// Adopted from the current dev.uxmeas.pages.dev implementation.
// Any element with class `.reveal` starts hidden; adds `.visible` when it
// intersects the viewport. Respects prefers-reduced-motion (shows immediately).
//
// Case panels: .case-panel children (.case-content, .case-visual) start at
// opacity:0 and reveal when the panel hits the viewport — uses an .is-visible
// flag instead of .visible so the case-panel's own animation tokens apply.
(function () {
  'use strict';

  function flagAll(els, cls) { els.forEach(function (el) { el.classList.add(cls); }); }

  function init() {
    var reveals = document.querySelectorAll('.reveal');
    var panels  = document.querySelectorAll('.case-panel');
    var anyTargets = reveals.length + panels.length;
    if (!anyTargets) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var noObserver = typeof IntersectionObserver === 'undefined';

    if (reduced || noObserver) {
      // Show everything immediately — no fade.
      flagAll(reveals, 'visible');
      flagAll(panels, 'is-visible');
      return;
    }

    if (reveals.length) {
      var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function (el) { revealObs.observe(el); });
    }

    if (panels.length) {
      var panelObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            panelObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      panels.forEach(function (el) { panelObs.observe(el); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
