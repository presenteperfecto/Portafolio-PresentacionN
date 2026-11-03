/**
 * =============================================
 * NAVEGACIÓN — Portfolio Nahuel Vega
 * =============================================
 */

(function () {
  'use strict';

  const DOM = {
    header: null,
    nav: null,
    menuToggle: null,
    menuClose: null,
    mobileMenu: null,
    navLinks: null,
    backdrop: null,
  };

  /* ── Inicialización ── */
  function init() {
    DOM.header = document.getElementById('header');
    DOM.menuToggle = document.getElementById('menu-toggle');
    DOM.menuClose = document.getElementById('menu-close');
    DOM.mobileMenu = document.getElementById('mobile-menu');
    DOM.navLinks = document.querySelectorAll('a[href^="#"]');
    DOM.backdrop = document.getElementById('menu-backdrop');

    if (!DOM.header) return;

    bindEvents();
    handleScroll();
  }

  /* ── Eventos ── */
  function bindEvents() {
    // Scroll — header sticky
    window.addEventListener('scroll', throttle(handleScroll, 100), { passive: true });

    // Menú móvil
    if (DOM.menuToggle) {
      DOM.menuToggle.addEventListener('click', openMobileMenu);
    }
    if (DOM.menuClose) {
      DOM.menuClose.addEventListener('click', closeMobileMenu);
    }
    if (DOM.backdrop) {
      DOM.backdrop.addEventListener('click', closeMobileMenu);
    }

    // Links — scroll suave + cerrar menú
    DOM.navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    // Cerrar menú con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  /* ── Scroll — estilo del header ── */
  function handleScroll() {
    if (!DOM.header) return;
    const scrolled = window.scrollY > 60;
    DOM.header.classList.toggle('header--scrolled', scrolled);
  }

  /* ── Menú móvil ── */
  function openMobileMenu() {
    if (!DOM.mobileMenu) return;
    DOM.mobileMenu.classList.add('is-open');
    if (DOM.backdrop) DOM.backdrop.classList.add('is-visible');
    if (DOM.menuToggle) DOM.menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    DOM.menuClose?.focus();
  }

  function closeMobileMenu() {
    if (!DOM.mobileMenu) return;
    DOM.mobileMenu.classList.remove('is-open');
    if (DOM.backdrop) DOM.backdrop.classList.remove('is-visible');
    if (DOM.menuToggle) DOM.menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    DOM.menuToggle?.focus();
  }

  /* ── Navegación suave ── */
  function handleNavClick(e) {
    const href = this.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    closeMobileMenu();

    const headerHeight = DOM.header ? DOM.header.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

    window.scrollTo({ top, behavior: 'smooth' });

    // Actualizar URL sin scroll
    history.pushState(null, '', href);
  }

  /* ── Utilidades ── */
  function throttle(fn, wait) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn.apply(this, args);
      }
    };
  }

  /* ── Arranque ── */
  document.addEventListener('DOMContentLoaded', init);
})();
