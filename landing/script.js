/* =========================================================
   MoonFit — script.js
   Hero parallax · Card scroll reveal · Smooth anchor scroll
   Sin dependencias externas
   ========================================================= */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Hero parallax ───────────────────────────────────── */
  const heroBg      = document.getElementById('heroBg');
  const heroSection = document.querySelector('.hero');

  if (heroBg && heroSection && !prefersReduced) {
    let ticking = false;

    function updateParallax() {
      const scrollY = window.scrollY;
      const heroH   = heroSection.offsetHeight;

      // Photo moves up at 30% of scroll speed
      heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;

      // Fade out photo as user scrolls away from hero
      const fade = Math.max(1 - (scrollY / (heroH * 0.75)), 0.15);
      heroBg.style.opacity = fade;

      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── Scroll reveal for cards ─────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !prefersReduced) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const idx   = Array.from(reveals).indexOf(entry.target);
          const delay = idx * 120;
          entry.target.style.transitionDelay = delay + 'ms';
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Smooth anchor scroll (Safari fallback) ──────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

})();
