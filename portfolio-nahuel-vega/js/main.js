/**
 * =============================================
 * MAIN — Portfolio Nahuel Vega
 * =============================================
 * Animaciones de entrada, scroll reveal, botón
 * flotante de WhatsApp, año dinámico y utilidades.
 */

(function () {
  'use strict';

  /* ── Año dinámico ── */
  function setDynamicYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ── Botón flotante de WhatsApp ── */
  function initWhatsAppButton() {
    const btn = document.getElementById('whatsapp-float');
    if (!btn || typeof CONFIG === 'undefined') return;

    const url = `https://wa.me/${CONFIG.whatsapp.number}?text=${encodeURIComponent(CONFIG.whatsapp.message)}`;
    btn.href = url;
  }

  /* ── Animaciones al hacer scroll (Intersection Observer) ── */
  function initScrollAnimations() {
    // Respetar preferencia de reducción de movimiento
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const elements = document.querySelectorAll('[data-animate]');

    if (prefersReducedMotion) {
      // Mostrar todo sin animación
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  /* ── Sección activa en la navegación ── */
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle(
              'nav-link--active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '-80px 0px -60% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  /* ── Inicialización ── */
  function init() {
    setDynamicYear();
    initWhatsAppButton();
    initScrollAnimations();
    initActiveNav();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
