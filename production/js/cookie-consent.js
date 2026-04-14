/**
 * Cookie Consent Modal — Reusable Drop-in Component
 * Zero dependencies. Works on any site.
 *
 * Design tokens defined in :root via --cc-* custom properties.
 * Shared across all system modals for consistent look and feel.
 *
 * Usage:
 *   <script src="cookie-consent.js"></script>
 *   <script>
 *     CookieConsent.init({
 *       policyUrl: '/cookies.html',
 *       storageKey: 'mysite_consent',
 *       onSave: function(consent) { ... }
 *     });
 *   </script>
 */
(function () {
  'use strict';

  // ── SVG Icons (inline, no external deps) ──────────────────────────

  var ICON_CLOSE = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  var ICON_PLUS = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';

  var ICON_MINUS = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>';

  var ICON_CHECK = '<svg width="10" height="10" viewBox="0 0 11 10" fill="none"><path d="M2.167 4.968L4.18 6.98a.42.42 0 00.59 0L8.834 2.917" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var ICON_COOKIE = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><circle cx="8.5" cy="8.5" r="1" fill="currentColor" stroke="none"/><circle cx="10.5" cy="15.5" r="1" fill="currentColor" stroke="none"/><circle cx="15.5" cy="13.5" r="1" fill="currentColor" stroke="none"/><circle cx="7.5" cy="12.5" r="1" fill="currentColor" stroke="none"/><circle cx="12.5" cy="9.5" r="1" fill="currentColor" stroke="none"/></svg>';

  var ICON_SETTINGS = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.32 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';

  // ── Default Configuration ─────────────────────────────────────────

  var defaults = {
    storageKey: 'cookie_consent',
    policyUrl: '/cookie-policy',
    title: 'We use cookies',
    description: 'We and our partners use cookies and other technologies to personalize your experience, show you ads, and perform analytics. See Our',
    policyLinkText: 'Cookie Policy',
    subText: 'Save your preferences to close:',
    cardHeader: 'You allow:',
    acceptLabel: 'Accept cookies',
    saveLabel: 'Save preferences',
    rejectLabel: 'Reject all',
    categories: [
      {
        id: 'necessary',
        label: 'Necessary',
        description: 'Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences.',
        required: true,
        default: true
      },
      {
        id: 'analytics',
        label: 'Performance & analytics',
        description: 'These cookies help us understand how visitors interact with the website by collecting and reporting information anonymously.',
        required: false,
        default: false
      },
      {
        id: 'marketing',
        label: 'Marketing & Advertising',
        description: 'Marketing cookies are used to track visitors across websites to allow publishers to display relevant and engaging advertisements.',
        required: false,
        default: false
      }
    ],
    onSave: null
  };

  // ── State ─────────────────────────────────────────────────────────

  var config = {};
  var modalEl = null;
  var triggerEl = null;
  var toggleStates = {};
  var expandedRows = {};
  var styleInjected = false;

  // ── Helpers ───────────────────────────────────────────────────────

  function merge(target, source) {
    var result = {};
    for (var k in target) result[k] = target[k];
    for (var k2 in source) {
      if (source[k2] !== undefined) result[k2] = source[k2];
    }
    return result;
  }

  function getStored() {
    try {
      var raw = localStorage.getItem(config.storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function save(consent) {
    consent.timestamp = new Date().toISOString();
    try {
      localStorage.setItem(config.storageKey, JSON.stringify(consent));
    } catch (e) { /* silent */ }
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consent }));
    if (typeof config.onSave === 'function') config.onSave(consent);
    return consent;
  }

  function buildConsent(allOn) {
    var consent = {};
    config.categories.forEach(function (cat) {
      consent[cat.id] = allOn ? true : (cat.required ? true : !!toggleStates[cat.id]);
    });
    return consent;
  }

  // ── CSS with Design Tokens ────────────────────────────────────────

  function injectStyles() {
    if (styleInjected) return;
    styleInjected = true;

    var css = [

      // ── Design System Tokens ──
      // Shared across cookie consent, future system modals, alerts, etc.
      ':root{' +
        '--cc-font:system-ui,-apple-system,Helvetica,Arial,sans-serif;' +

        // Surfaces
        '--cc-bg:#000000;' +
        '--cc-surface:rgb(39,39,42);' +
        '--cc-surface-hover:rgba(255,255,255,.1);' +

        // Text
        '--cc-text:#FFFFFF;' +
        '--cc-text-muted:rgba(255,255,255,.7);' +
        '--cc-text-link:#FFFFFF;' +

        // Borders
        '--cc-border:rgba(209,213,219,.2);' +
        '--cc-border-strong:#FFFFFF;' +
        '--cc-glow:0 0 0 1px rgba(255,255,255,.25);' +
        '--cc-shadow:0 10px 50px 0 rgba(0,0,0,.25);' +

        // Accent
        '--cc-accent:rgb(34,197,94);' +

        // Sizing
        '--cc-width:410px;' +
        '--cc-radius:10px;' +
        '--cc-radius-pill:30px;' +
        '--cc-radius-circle:9999px;' +
        '--cc-spacing-xs:4px;' +
        '--cc-spacing-sm:8px;' +
        '--cc-spacing-md:12px;' +
        '--cc-spacing-lg:16px;' +
        '--cc-spacing-xl:24px;' +

        // Typography
        '--cc-font-sm:12px;' +
        '--cc-font-base:14px;' +
        '--cc-font-lg:20px;' +
        '--cc-font-weight-normal:400;' +
        '--cc-font-weight-bold:700;' +
        '--cc-line-height-tight:16px;' +
        '--cc-line-height-base:20px;' +
        '--cc-line-height-lg:31px;' +

        // Components
        '--cc-btn-height:32px;' +
        '--cc-btn-padding:2px 16px;' +
        '--cc-toggle-w:48px;' +
        '--cc-toggle-h:24px;' +
        '--cc-toggle-thumb:18px;' +
        '--cc-icon-sm:24px;' +
        '--cc-icon-md:32px;' +
        '--cc-icon-lg:40px;' +
        '--cc-touch-target:44px' +
      '}',

      // ── Reset ──
      '#cc-modal,#cc-modal *,#cc-modal *::before,#cc-modal *::after,' +
      '#cc-collapsed,#cc-collapsed *,' +
      '#cc-trigger{box-sizing:border-box;margin:0;padding:0}',

      // ═══════════════════════════════════════════════
      // EXPANDED MODAL
      // ═══════════════════════════════════════════════

      '#cc-modal{' +
        'position:fixed;bottom:var(--cc-spacing-xl);left:var(--cc-spacing-xl);' +
        'width:var(--cc-width);z-index:9999;' +
        'display:flex;flex-direction:column;' +
        'padding:var(--cc-spacing-xl) var(--cc-spacing-lg) var(--cc-spacing-lg);' +
        'background:var(--cc-bg);color:var(--cc-text);' +
        'border-radius:var(--cc-radius);' +
        'box-shadow:var(--cc-shadow),var(--cc-glow);' +
        'overflow-y:auto;max-height:calc(100vh - 48px);' +
        'font-family:var(--cc-font)' +
      '}',

      // ── Header ──
      '#cc-modal .cc-header{padding:0 var(--cc-spacing-sm);position:relative}',

      '#cc-modal .cc-title{' +
        'font-size:var(--cc-font-lg);font-weight:var(--cc-font-weight-bold);' +
        'line-height:var(--cc-line-height-lg);color:var(--cc-text);' +
        'padding-right:32px' +  // clearance for close btn
      '}',

      '#cc-modal .cc-desc{' +
        'font-size:var(--cc-font-base);font-weight:var(--cc-font-weight-normal);' +
        'line-height:var(--cc-line-height-base);color:var(--cc-text);' +
        'margin-top:var(--cc-spacing-sm)' +
      '}',
      '#cc-modal .cc-desc a{color:var(--cc-text-link);text-decoration:underline}',
      '#cc-modal .cc-desc a:hover{opacity:.8}',

      // Close button
      '#cc-modal .cc-close{' +
        'position:absolute;top:0;right:0;' +
        'width:var(--cc-icon-sm);height:var(--cc-icon-sm);' +
        'background:transparent;border:none;border-radius:var(--cc-radius-circle);' +
        'cursor:pointer;display:flex;align-items:center;justify-content:center;' +
        'color:var(--cc-text);transition:opacity .15s' +
      '}',
      '#cc-modal .cc-close:hover{opacity:.7}',

      // Sub text
      '#cc-modal .cc-sub{' +
        'font-size:var(--cc-font-base);font-weight:var(--cc-font-weight-normal);' +
        'line-height:var(--cc-line-height-tight);color:var(--cc-text);' +
        'margin-top:var(--cc-spacing-xl);padding:0 var(--cc-spacing-sm)' +
      '}',

      // ── Preferences Card ──
      '#cc-modal .cc-card{' +
        'background:var(--cc-surface);border-radius:var(--cc-radius);' +
        'padding:var(--cc-spacing-lg) var(--cc-spacing-xl);' +
        'margin-top:var(--cc-spacing-xl)' +
      '}',
      '#cc-modal .cc-card-header{' +
        'font-size:var(--cc-font-base);font-weight:var(--cc-font-weight-bold);' +
        'color:var(--cc-text)' +
      '}',

      // ── Preference Rows ──
      '#cc-modal .cc-row{padding:var(--cc-spacing-lg) 0;border-bottom:2px solid var(--cc-border)}',
      '#cc-modal .cc-row:last-child{border-bottom:none}',

      '#cc-modal .cc-row-main{' +
        'display:flex;align-items:center;width:100%;gap:var(--cc-spacing-md)' +
      '}',

      // Expand button
      '#cc-modal .cc-expand-btn{' +
        'width:var(--cc-icon-sm);height:var(--cc-icon-sm);flex-shrink:0;' +
        'border:1px solid var(--cc-border-strong);border-radius:var(--cc-radius-circle);' +
        'background:transparent;cursor:pointer;' +
        'display:flex;align-items:center;justify-content:center;' +
        'color:var(--cc-text);transition:background .15s' +
      '}',
      '#cc-modal .cc-expand-btn:hover{background:var(--cc-surface-hover)}',

      // Label + badge
      '#cc-modal .cc-label-wrap{display:flex;align-items:center;flex:1;min-width:0}',
      '#cc-modal .cc-cat-label{' +
        'font-size:var(--cc-font-base);font-weight:var(--cc-font-weight-bold);' +
        'color:var(--cc-text);white-space:nowrap' +
      '}',
      '#cc-modal .cc-badge{' +
        'font-size:10px;font-weight:var(--cc-font-weight-normal);' +
        'color:var(--cc-accent);margin-left:var(--cc-spacing-sm)' +
      '}',

      // Expanded description
      '#cc-modal .cc-row-desc{' +
        'font-size:13px;font-weight:var(--cc-font-weight-normal);' +
        'line-height:18px;color:var(--cc-text-muted);' +
        'margin-top:var(--cc-spacing-md);' +
        'padding-left:calc(var(--cc-icon-sm) + var(--cc-spacing-md));' +  // align with label text
        'display:none' +
      '}',
      '#cc-modal .cc-row-desc.cc-open{display:block}',

      // ── Toggle Switch ──
      '#cc-modal .cc-toggle{' +
        'position:relative;flex-shrink:0;' +
        'width:var(--cc-toggle-w);height:var(--cc-toggle-h)' +
      '}',

      '#cc-modal .cc-toggle input{position:absolute;opacity:0;width:0;height:0}',

      '#cc-modal .cc-toggle-track{' +
        'display:block;position:relative;' +
        'width:var(--cc-toggle-w);height:var(--cc-toggle-h);' +
        'border:2px solid var(--cc-border-strong);border-radius:var(--cc-radius-circle);' +
        'background:transparent;cursor:pointer;transition:background .15s' +
      '}',

      '#cc-modal .cc-toggle-thumb{' +
        'position:absolute;top:1px;left:1px;' +
        'width:var(--cc-toggle-thumb);height:var(--cc-toggle-thumb);' +
        'border-radius:var(--cc-radius-circle);background:var(--cc-text);' +
        'transition:transform .15s ease;' +
        'display:flex;align-items:center;justify-content:center;' +
        'color:var(--cc-surface)' +
      '}',

      // ON state: green track + move thumb right
      '#cc-modal .cc-toggle input:checked ~ .cc-toggle-track{' +
        'background:var(--cc-accent);border-color:var(--cc-accent)' +
      '}',
      '#cc-modal .cc-toggle input:checked ~ .cc-toggle-track .cc-toggle-thumb{transform:translateX(24px)}',

      '#cc-modal .cc-toggle input:disabled ~ .cc-toggle-track{opacity:.6;cursor:default}',

      // Checkmark visibility
      '#cc-modal .cc-toggle .cc-check{display:none}',
      '#cc-modal .cc-toggle input:checked ~ .cc-toggle-track .cc-check{display:flex}',

      // Focus ring on toggle
      '#cc-modal .cc-toggle input:focus-visible ~ .cc-toggle-track{' +
        'outline:2px solid var(--cc-text);outline-offset:2px' +
      '}',

      // ── Modal Footer ──
      '#cc-modal .cc-footer{' +
        'display:flex;align-items:center;margin-top:var(--cc-spacing-lg);' +
        'gap:var(--cc-spacing-sm);width:100%' +
      '}',

      '#cc-modal .cc-cookie-icon{' +
        'width:var(--cc-icon-md);height:var(--cc-icon-md);flex-shrink:0;' +
        'background:transparent;border:none;cursor:pointer;' +
        'display:flex;align-items:center;justify-content:center;' +
        'color:var(--cc-text)' +
      '}',

      '#cc-modal .cc-actions{display:flex;flex:1;gap:var(--cc-spacing-sm)}',
      '#cc-modal .cc-actions .cc-btn{flex:1}',

      // ── Shared Button Styles ──
      '.cc-btn{' +
        'height:var(--cc-btn-height);padding:var(--cc-btn-padding);' +
        'font-size:var(--cc-font-base);font-weight:var(--cc-font-weight-bold);' +
        'border-radius:var(--cc-radius-pill);border:2px solid var(--cc-border-strong);' +
        'cursor:pointer;white-space:nowrap;font-family:var(--cc-font);' +
        'display:inline-flex;align-items:center;justify-content:center;' +
        'transition:background .15s,color .15s,border-color .15s;' +
        'line-height:1;text-decoration:none' +
      '}',
      '.cc-btn-primary{background:var(--cc-text);color:var(--cc-bg)}',
      '.cc-btn-primary:hover{background:#e5e5e5}',
      '.cc-btn-secondary{background:var(--cc-text);color:var(--cc-bg)}',
      '.cc-btn-secondary:hover{background:#e5e5e5}',
      '.cc-btn-outline{background:transparent;color:var(--cc-text)}',
      '.cc-btn-outline:hover{background:var(--cc-surface-hover)}',

      // Focus ring on buttons
      '.cc-btn:focus-visible{outline:2px solid var(--cc-text);outline-offset:2px}',

      // ═══════════════════════════════════════════════
      // COLLAPSED BAR
      // ═══════════════════════════════════════════════

      '#cc-collapsed{' +
        'position:fixed;bottom:var(--cc-spacing-xl);left:var(--cc-spacing-xl);' +
        'width:var(--cc-width);z-index:9999;' +
        'display:flex;flex-direction:column;' +
        'background:var(--cc-bg);border-radius:var(--cc-radius);' +
        'box-shadow:var(--cc-shadow),var(--cc-glow);' +
        'padding:var(--cc-spacing-lg);' +
        'font-family:var(--cc-font);color:var(--cc-text);' +
        'gap:var(--cc-spacing-md)' +
      '}',

      // Row 1: cookie icon + buttons fill evenly + settings gear
      '#cc-collapsed .cc-bar-top{' +
        'display:flex;align-items:center;gap:var(--cc-spacing-sm);width:100%' +
      '}',

      '#cc-collapsed .cc-cookie-trigger{' +
        'width:var(--cc-icon-md);height:var(--cc-icon-md);flex-shrink:0;' +
        'background:transparent;border:none;cursor:pointer;' +
        'display:flex;align-items:center;justify-content:center;' +
        'color:var(--cc-text)' +
      '}',

      // Buttons container fills remaining space, buttons stretch evenly
      '#cc-collapsed .cc-bar-actions{' +
        'display:flex;flex:1;gap:var(--cc-spacing-sm)' +
      '}',
      '#cc-collapsed .cc-bar-actions .cc-btn{flex:1}',

      '#cc-collapsed .cc-settings-btn{' +
        'width:var(--cc-icon-md);height:var(--cc-icon-md);flex-shrink:0;' +
        'background:var(--cc-surface-hover);border:none;border-radius:var(--cc-radius-circle);' +
        'cursor:pointer;display:flex;align-items:center;justify-content:center;' +
        'color:var(--cc-text);transition:background .15s' +
      '}',
      '#cc-collapsed .cc-settings-btn:hover{background:rgba(255,255,255,.2)}',

      // Row 2: description text
      '#cc-collapsed .cc-bar-desc{' +
        'font-size:var(--cc-font-sm);line-height:var(--cc-line-height-tight);' +
        'color:var(--cc-text-muted);text-align:left' +
      '}',
      '#cc-collapsed .cc-bar-desc a{color:var(--cc-text-link);text-decoration:underline}',

      // ═══════════════════════════════════════════════
      // TRIGGER BUTTON (after consent saved)
      // ═══════════════════════════════════════════════

      '#cc-trigger{' +
        'position:fixed;bottom:var(--cc-spacing-xl);left:var(--cc-spacing-xl);' +
        'z-index:9998;width:var(--cc-icon-lg);height:var(--cc-icon-lg);' +
        'background:var(--cc-bg);border:none;border-radius:var(--cc-radius-circle);' +
        'cursor:pointer;display:flex;align-items:center;justify-content:center;' +
        'box-shadow:0 4px 12px rgba(0,0,0,.3),var(--cc-glow);' +
        'color:var(--cc-text);transition:transform .15s' +
      '}',
      '#cc-trigger:hover{transform:scale(1.1)}',
      '#cc-trigger:focus-visible{outline:2px solid var(--cc-text);outline-offset:2px}',

      // ═══════════════════════════════════════════════
      // RESPONSIVE
      // ═══════════════════════════════════════════════

      '@media(max-width:480px){' +
        '#cc-modal{bottom:0;left:0;right:0;width:100%;border-radius:var(--cc-radius) var(--cc-radius) 0 0;max-height:85vh}' +
        '#cc-collapsed{bottom:0;left:0;right:0;width:100%;border-radius:var(--cc-radius) var(--cc-radius) 0 0}' +
        '#cc-trigger{bottom:var(--cc-spacing-lg);left:var(--cc-spacing-lg)}' +
        '.cc-btn{min-height:var(--cc-touch-target)}' +
      '}'

    ].join('\n');

    var style = document.createElement('style');
    style.id = 'cc-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ── Build Modal HTML ──────────────────────────────────────────────

  function buildModal() {
    var el = document.createElement('div');
    el.id = 'cc-modal';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Cookie consent preferences');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('tabindex', '-1');

    var h = '';

    // ── Scrollable content ──
    h += '<div class="cc-content">';

    // Header
    h += '<div class="cc-header">';
    h += '<h2 class="cc-title">' + esc(config.title) + '</h2>';
    h += '<button class="cc-close" aria-label="Close" data-cc="close">' + ICON_CLOSE + '</button>';
    h += '<p class="cc-desc">' + esc(config.description) + ' <a href="' + esc(config.policyUrl) + '">' + esc(config.policyLinkText) + '</a>.</p>';
    h += '</div>';

    // Sub text
    h += '<p class="cc-sub">' + esc(config.subText) + '</p>';

    // Preferences card
    h += '<div class="cc-card">';
    h += '<p class="cc-card-header">' + esc(config.cardHeader) + '</p>';

    config.categories.forEach(function (cat) {
      var isOn = cat.required ? true : !!toggleStates[cat.id];

      h += '<div class="cc-row" data-cat="' + cat.id + '">';
      h += '<div class="cc-row-main">';

      // Left: expand btn + label
      h += '<button class="cc-expand-btn" data-cc="expand" data-cat="' + cat.id + '" aria-label="Toggle details for ' + esc(cat.label) + '" aria-expanded="false">' + ICON_PLUS + '</button>';
      h += '<div class="cc-label-wrap">';
      h += '<span class="cc-cat-label">' + esc(cat.label) + '</span>';
      if (cat.required) {
        h += '<span class="cc-badge">Required</span>';
      }
      h += '</div>';

      // Right: toggle
      h += '<div class="cc-toggle">';
      h += '<input type="checkbox" id="cc-tog-' + cat.id + '" data-cc="toggle" data-cat="' + cat.id + '"' +
        (isOn ? ' checked' : '') +
        (cat.required ? ' disabled' : '') +
        ' role="switch"' +
        ' aria-checked="' + (isOn ? 'true' : 'false') + '"' +
        ' aria-label="' + esc(cat.label) + '">';
      h += '<label class="cc-toggle-track" for="cc-tog-' + cat.id + '">';
      h += '<span class="cc-toggle-thumb"><span class="cc-check">' + ICON_CHECK + '</span></span>';
      h += '</label>';
      h += '</div>';

      h += '</div>'; // .cc-row-main

      // Expandable description
      h += '<div class="cc-row-desc" id="cc-desc-' + cat.id + '" role="region" aria-hidden="true">' + esc(cat.description) + '</div>';

      h += '</div>'; // .cc-row
    });

    h += '</div>'; // .cc-card
    h += '</div>'; // .cc-content

    // Footer
    h += '<div class="cc-footer">';
    h += '<button class="cc-cookie-icon" data-cc="icon" aria-label="Cookie preferences">' + ICON_COOKIE + '</button>';
    h += '<div class="cc-actions">';
    h += '<button class="cc-btn cc-btn-primary" data-cc="accept">' + esc(config.acceptLabel) + '</button>';
    h += '<button class="cc-btn cc-btn-secondary" data-cc="save">' + esc(config.saveLabel) + '</button>';
    h += '</div>';
    h += '</div>';

    el.innerHTML = h;
    return el;
  }

  // ── Build Collapsed Bar ───────────────────────────────────────────

  function buildCollapsedBar() {
    var el = document.createElement('div');
    el.id = 'cc-collapsed';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Cookie consent');

    var h = '';

    // Row 1: cookie icon + [Reject all] [Accept cookies] + settings gear
    h += '<div class="cc-bar-top">';
    h += '<button class="cc-cookie-trigger" data-cc="icon" aria-label="Cookie preferences">' + ICON_COOKIE + '</button>';
    h += '<div class="cc-bar-actions">';
    h += '<button class="cc-btn cc-btn-outline" data-cc="reject">' + esc(config.rejectLabel) + '</button>';
    h += '<button class="cc-btn cc-btn-primary" data-cc="accept">' + esc(config.acceptLabel) + '</button>';
    h += '</div>';
    h += '<button class="cc-settings-btn" data-cc="settings" aria-label="Cookie settings">' + ICON_SETTINGS + '</button>';
    h += '</div>';

    // Row 2: description
    h += '<div class="cc-bar-desc">' + esc(config.description) + ' <a href="' + esc(config.policyUrl) + '">' + esc(config.policyLinkText) + '</a>.</div>';

    el.innerHTML = h;
    return el;
  }

  // ── Build Trigger (cookie icon after consent saved) ───────────────

  function buildTrigger() {
    var btn = document.createElement('button');
    btn.id = 'cc-trigger';
    btn.setAttribute('aria-label', 'Open cookie preferences');
    btn.innerHTML = ICON_COOKIE;
    return btn;
  }

  // ── Show / Hide ───────────────────────────────────────────────────

  function showModal() {
    removeAll();
    var stored = getStored();
    config.categories.forEach(function (cat) {
      toggleStates[cat.id] = stored ? !!stored[cat.id] : cat.default;
    });
    expandedRows = {};
    modalEl = buildModal();
    document.body.appendChild(modalEl);
    bindModalEvents();
    modalEl.focus();
  }

  function showCollapsed() {
    removeAll();
    var bar = buildCollapsedBar();
    document.body.appendChild(bar);
    bindCollapsedEvents(bar);
  }

  function showTrigger() {
    removeAll();
    triggerEl = buildTrigger();
    document.body.appendChild(triggerEl);
    triggerEl.addEventListener('click', function () {
      showModal();
    });
  }

  function removeAll() {
    ['cc-modal', 'cc-collapsed', 'cc-trigger'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.remove();
    });
    modalEl = null;
    triggerEl = null;
  }

  // ── Event Binding ─────────────────────────────────────────────────

  function bindModalEvents() {
    if (!modalEl) return;

    modalEl.addEventListener('click', function (e) {
      var target = e.target.closest('[data-cc]');
      if (!target) return;
      var action = target.getAttribute('data-cc');

      switch (action) {
        case 'close':
          showCollapsed();
          break;

        case 'accept':
          save(buildConsent(true));
          showTrigger();
          break;

        case 'save':
          config.categories.forEach(function (cat) {
            var cb = modalEl.querySelector('#cc-tog-' + cat.id);
            if (cb) toggleStates[cat.id] = cb.checked;
          });
          save(buildConsent(false));
          showTrigger();
          break;

        case 'expand':
          var catId = target.getAttribute('data-cat');
          var descEl = modalEl.querySelector('#cc-desc-' + catId);
          if (descEl) {
            var isOpen = descEl.classList.toggle('cc-open');
            expandedRows[catId] = isOpen;
            target.innerHTML = isOpen ? ICON_MINUS : ICON_PLUS;
            target.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            descEl.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
          }
          break;

        case 'toggle':
          var catId2 = target.getAttribute('data-cat');
          toggleStates[catId2] = target.checked;
          target.setAttribute('aria-checked', target.checked ? 'true' : 'false');
          break;
      }
    });

    modalEl.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') showCollapsed();
    });
  }

  function bindCollapsedEvents(bar) {
    bar.addEventListener('click', function (e) {
      var target = e.target.closest('[data-cc]');
      if (!target) return;
      var action = target.getAttribute('data-cc');

      switch (action) {
        case 'accept':
          save(buildConsent(true));
          showTrigger();
          break;

        case 'reject':
          config.categories.forEach(function (cat) {
            toggleStates[cat.id] = cat.required;
          });
          save(buildConsent(false));
          showTrigger();
          break;

        case 'icon':
        case 'settings':
          showModal();
          break;
      }
    });
  }

  // ── Escape HTML ───────────────────────────────────────────────────

  function esc(str) {
    var d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  }

  // ── Public API ────────────────────────────────────────────────────

  var api = {
    init: function (userConfig) {
      config = merge(defaults, userConfig || {});
      injectStyles();

      var stored = getStored();
      if (stored && stored.timestamp) {
        if (typeof config.onSave === 'function') config.onSave(stored);
        window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: stored }));
        showTrigger();
      } else {
        showCollapsed();
      }
    },

    hasConsent: function (category) {
      var stored = getStored();
      if (!stored) return category === 'necessary';
      return stored[category] === true;
    },

    getConsent: function () {
      return getStored();
    },

    show: function () {
      showModal();
    },

    reset: function () {
      try { localStorage.removeItem(config.storageKey); } catch (e) { /* silent */ }
      showCollapsed();
    }
  };

  window.CookieConsent = api;
})();
