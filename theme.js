// Forced dark mode (2026-05-04 — case study screens have black backgrounds baked in;
// light mode is disabled until transparent PNG exports are available).
// Reverse: restore the previous theme.js from git history when transparent screens ship.
(function () {
  document.documentElement.setAttribute('data-theme', 'dark');
})();
