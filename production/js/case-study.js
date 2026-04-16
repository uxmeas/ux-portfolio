/* case-study.js — Shared case study page interactions */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Page Loader ---- */
  document.addEventListener('DOMContentLoaded', function () {
    var loader = document.querySelector('.cs-pageloader');
    if (!loader) return initAll();

    var heroImg = document.querySelector('.cs-hero__img');
    var done = false;

    function dismiss() {
      if (done) return;
      done = true;
      loader.classList.add('done');
      initAll();
    }

    if (heroImg && !heroImg.complete) {
      heroImg.addEventListener('load', dismiss);
      heroImg.addEventListener('error', dismiss);
      setTimeout(dismiss, 3000);
    } else {
      dismiss();
    }
  });

  function initAll() {
    initScrollReveal();
    initImageLoading();
    initNavDots();
    initSmoothScroll();
    initTopBar();
  }

  /* ---- Scroll Reveal ---- */
  function initScrollReveal() {
    if (prefersReducedMotion) return;
    var els = document.querySelectorAll('.cs-reveal');
    if (!els.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ---- Image Lazy Loading with Skeletons ---- */
  function initImageLoading() {
    var images = document.querySelectorAll('.cs-img-wrap img');
    images.forEach(function (img) {
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', function () { img.classList.add('loaded'); });
        img.addEventListener('error', function () { img.classList.add('loaded'); });
        setTimeout(function () { img.classList.add('loaded'); }, 8000);
      }
    });
  }

  /* ---- Nav Dots ---- */
  function initNavDots() {
    var dots = document.querySelectorAll('.cs-nav__dot');
    var sections = document.querySelectorAll('[data-section]');
    if (!dots.length || !sections.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.getAttribute('data-section');
          dots.forEach(function (d) {
            d.classList.toggle('cs-nav__dot--active', d.getAttribute('data-target') === id);
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(function (s) { observer.observe(s); });

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        var target = document.querySelector('[data-section="' + dot.getAttribute('data-target') + '"]');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  /* ---- Smooth Scroll for Anchors ---- */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ---- Top Bar Scroll ---- */
  function initTopBar() {
    var bar = document.querySelector('.cs-topbar');
    if (!bar) return;
    window.addEventListener('scroll', function () {
      bar.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });
  }
})();
