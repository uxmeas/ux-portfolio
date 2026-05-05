/*
 * ga4-bootstrap.js — Google Consent Mode v2 + GA4 init
 *
 * Externalised from inline <head> blocks 2026-05-04 (Task C, Round 2 promote-prep)
 * so we can drop 'unsafe-inline' from CSP script-src.
 *
 * Loads BEFORE the gtag.js script tag in <head>. Idempotent — safe if loaded twice.
 *
 * Order of operations:
 *   1. Initialise dataLayer + gtag stub
 *   2. Set consent default = denied for all categories (Google Consent Mode v2)
 *   3. Read uxmeas-cookie-preferences from localStorage; if user previously
 *      granted analytics consent, upgrade analytics_storage to granted before
 *      gtag.js loads — avoids the brief "denied" window on repeat visits.
 *   4. Call gtag('js', new Date()) and gtag('config', PROPERTY_ID).
 *      The gtag.js <script async> tag still lives in the HTML head; this file
 *      runs first so dataLayer + consent defaults are ready when gtag.js arrives.
 */
(function () {
  'use strict';

  // Idempotency: bail if we've already run on this page
  if (window.__uxmeasGa4Bootstrapped) return;
  window.__uxmeasGa4Bootstrapped = true;

  var GA4_PROPERTY_ID = 'G-87HSHMKCBH';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Consent Mode v2 defaults — denied until user grants
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500
  });

  // Restore prior consent from localStorage if present
  try {
    var stored = JSON.parse(localStorage.getItem('uxmeas-cookie-preferences') || 'null');
    if (stored && stored.analytics) {
      gtag('consent', 'update', { 'analytics_storage': 'granted' });
    }
  } catch (e) { /* silent — corrupt JSON or storage blocked */ }

  // GA4 init — gtag.js is loaded by a separate <script async> tag in HTML
  gtag('js', new Date());
  gtag('config', GA4_PROPERTY_ID);
})();
