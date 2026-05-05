/**
 * UX Meas Portfolio — Compliance bootstrap
 *
 * Initializes:
 *   - Cookie consent banner (UX Meas dark theme overrides)
 *   - Microsoft Clarity (loaded only after analytics consent)
 *   - GA4 consent-mode update on consent change
 *
 * Depends on:
 *   - cookie-consent.js (must be loaded before this script)
 *   - gtag() consent-mode default already set in <head>
 *
 * Storage key: uxmeas-cookie-preferences
 * Policy URL : /cookies.html
 */
(function () {
  'use strict';

  // --- UX Meas dark theme overrides for cookie consent ---
  var styleEl = document.createElement('style');
  styleEl.id = 'cc-uxmeas-theme';
  styleEl.textContent = [
    ':root{',
    '--cc-bg:#0A0A0A;',
    '--cc-surface:#1A1A1A;',
    '--cc-surface-hover:rgba(0,163,255,0.08);',
    '--cc-text:#FFFFFF;',
    '--cc-text-muted:#94949C;',
    '--cc-text-link:#00A3FF;',
    '--cc-border:rgba(255,255,255,0.08);',
    '--cc-border-strong:#00A3FF;',
    '--cc-glow:0 0 0 1px rgba(0,163,255,0.2);',
    '--cc-shadow:0 10px 50px 0 rgba(0,0,0,0.6);',
    '--cc-accent:#00A3FF;',
    "--cc-font:'Space Grotesk',system-ui,-apple-system,sans-serif;",
    '}'
  ].join('');
  document.head.appendChild(styleEl);

  // --- Microsoft Clarity loader (only after analytics consent) ---
  // TODO: Pheak provide Clarity project ID for uxmeas
  var CLARITY_ID = '';

  function initClarity() {
    if (!CLARITY_ID) return; // No-op until Clarity ID is supplied
    if (typeof window.clarity !== 'undefined') return;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
  }

  // --- Initialize cookie consent ---
  if (typeof window.CookieConsent === 'undefined') {
    console.warn('[uxmeas/compliance] cookie-consent.js missing — banner will not render.');
    return;
  }

  window.CookieConsent.init({
    storageKey: 'uxmeas-cookie-preferences',
    policyUrl: '/cookies.html',
    title: 'We use cookies',
    description: 'I use cookies and analytics tools to understand how visitors use this portfolio. See',
    policyLinkText: 'Cookie Policy',
    categories: [
      {
        id: 'necessary',
        label: 'Necessary',
        description: 'Required for the site to function — never disabled.',
        required: true,
        default: true
      },
      {
        id: 'analytics',
        label: 'Analytics',
        description: 'Helps me understand how visitors use the site so I can improve it. Includes Google Analytics 4 and Microsoft Clarity (session replay + heatmaps).',
        required: false,
        default: false
      }
    ],
    onSave: function (consent) {
      if (typeof gtag === 'function') {
        if (consent.analytics) {
          gtag('consent', 'update', { 'analytics_storage': 'granted' });
        } else {
          gtag('consent', 'update', { 'analytics_storage': 'denied' });
        }
      }
      if (consent.analytics) initClarity();
    }
  });

  // --- Returning-visitor: if they previously accepted analytics, load Clarity now ---
  window.addEventListener('cookieConsentUpdated', function (e) {
    if (e.detail && e.detail.analytics && typeof window.clarity === 'undefined') {
      initClarity();
    }
  }, { once: true });

  // --- "Cookie Settings" footer link delegate ---
  // Replaces inline onclick="CookieConsent.show()" so the strict CSP can drop
  // 'unsafe-inline' from script-src. Markup pattern:
  //   <a href="#" data-cookie-settings>Cookie Settings</a>
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-cookie-settings]');
    if (!trigger) return;
    e.preventDefault();
    if (window.CookieConsent && typeof window.CookieConsent.show === 'function') {
      window.CookieConsent.show();
    }
  });
})();
