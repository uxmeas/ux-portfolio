(function() {
  'use strict';

  function hashString(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  function detectAudience() {
    const profile = { sources: [], returning: false, mobile: false };
    // UTM params
    try {
      const params = new URLSearchParams(location.search);
      const us = params.get('utm_source');
      const uc = params.get('utm_campaign');
      if (us) profile.sources.push(us.toLowerCase());
      if (uc && /recruit|hiring|hire/i.test(uc)) profile.sources.push('recruiter');
    } catch (e) {}
    // Referrer
    const ref = document.referrer || '';
    let refHost = '';
    try {
      refHost = ref ? new URL(ref).hostname.toLowerCase().replace(/^www\./, '') : '';
    } catch (e) {}
    const referrerMap = {
      'linkedin.com': 'linkedin',
      'lnkd.in': 'linkedin',
      'indeed.com': 'jobboard',
      'hired.com': 'jobboard',
      'wellfound.com': 'jobboard',
      'angel.co': 'jobboard',
      'builtin.com': 'jobboard',
      'dribbble.com': 'dribbble',
      'awwwards.com': 'awwwards',
      'sidebar.io': 'designer-news',
      'designernews.co': 'designer-news',
      'news.ycombinator.com': 'hn',
      'twitter.com': 'twitter',
      'x.com': 'twitter',
      't.co': 'twitter'
    };
    for (const host in referrerMap) {
      if (refHost === host || refHost.endsWith('.' + host)) {
        profile.sources.push(referrerMap[host]);
      }
    }
    if (refHost === 'google.com' || refHost.endsWith('.google.com')) profile.sources.push('google');
    if (!ref) profile.sources.push('direct');
    // Returning
    try {
      const visited = localStorage.getItem('uxmeas-visited');
      if (visited) profile.returning = true;
      profile.sources.push(visited ? 'returning' : 'firsttime');
      localStorage.setItem('uxmeas-visited', String(Date.now()));
    } catch (e) {}
    // Mobile
    profile.mobile = /Mobi|Android|iPhone|iPad/.test(navigator.userAgent);
    if (profile.mobile) profile.sources.push('mobile');
    // Always include "any" fallback
    profile.sources.push('any');
    return profile;
  }

  function getVisitorId() {
    try {
      let id = localStorage.getItem('uxmeas-visitor-id');
      if (!id) {
        id = (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random();
        localStorage.setItem('uxmeas-visitor-id', id);
      }
      return id;
    } catch (e) {
      return 'no-storage';
    }
  }

  function selectVariant(slotName, allVariants, profile, visitorId) {
    if (!allVariants || allVariants.length === 0) return null;
    // Filter by audience match
    const matched = allVariants.filter(v => {
      const audiences = v.audiences || ['any'];
      return audiences.some(a => profile.sources.indexOf(a) !== -1);
    });
    // Prefer specific (non-any-only) matches
    const specific = matched.filter(v => {
      const audiences = v.audiences || ['any'];
      return audiences.some(a => a !== 'any' && profile.sources.indexOf(a) !== -1);
    });
    const candidates = specific.length > 0 ? specific : matched.length > 0 ? matched : allVariants;
    // Deterministic seed: date + visitor + slot
    const today = new Date().toISOString().slice(0, 10);
    const seed = hashString(slotName + today + visitorId);
    return candidates[seed % candidates.length];
  }

  async function rotate() {
    try {
      const res = await fetch('/copy/variants.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error('variants.json not OK');
      const data = await res.json();
      const profile = detectAudience();
      const visitorId = getVisitorId();
      Object.keys(data).forEach(slotName => {
        const el = document.querySelector('[data-rotate-slot="' + slotName + '"]');
        if (!el) return;
        const variant = selectVariant(slotName, data[slotName], profile, visitorId);
        if (!variant) return;
        // Support \n in variant text → replace with <br>
        el.innerHTML = variant.text.replace(/\n/g, '<br>');
        console.log('[copy-rotation]', { slot: slotName, served: variant.id, sources: profile.sources, returning: profile.returning });
      });
    } catch (e) {
      console.warn('[copy-rotation] failed, leaving HTML defaults:', e.message);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rotate);
  } else {
    rotate();
  }
})();
