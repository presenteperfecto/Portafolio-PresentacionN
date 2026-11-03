/**
 * =============================================
 * PROYECTOS — Portfolio Nahuel Vega
 * =============================================
 * - Renderiza las tarjetas de proyectos comerciales.
 * - Gestiona el Lightbox / Modal en primer plano
 *   con reproducción de video en alta definición,
 *   sin sonido, controles completos y centrado.
 */

(function () {
  'use strict';

  /* ── Controlador del Modal / Lightbox de Video ── */
  const VideoModal = {
    elements: {},
    isOpen: false,
    activeProject: null,

    init() {
      this.elements = {
        modal: document.getElementById('video-modal'),
        backdrop: document.getElementById('video-modal-backdrop'),
        title: document.getElementById('video-modal-title'),
        closeBtn: document.getElementById('video-modal-close'),
        player: document.getElementById('video-modal-player'),
        centerPlay: document.getElementById('video-modal-center-play'),
        playBtn: document.getElementById('video-modal-play-btn'),
        progressWrap: document.getElementById('video-modal-progress'),
        progressBar: document.getElementById('video-modal-progress-bar'),
        currentTime: document.getElementById('video-modal-current'),
        durationTime: document.getElementById('video-modal-duration'),
        fsBtn: document.getElementById('video-modal-fs-btn'),
        centerPlayIcon: document.querySelector('.modal-center-play-icon'),
        centerPauseIcon: document.querySelector('.modal-center-pause-icon'),
        ctrlPlayIcon: document.querySelector('.modal-ctrl-play'),
        ctrlPauseIcon: document.querySelector('.modal-ctrl-pause'),
      };

      if (!this.elements.modal || !this.elements.player) return;

      this.bindEvents();
    },

    bindEvents() {
      const {
        backdrop, closeBtn, player, centerPlay, playBtn,
        progressWrap, fsBtn
      } = this.elements;

      // Cerrar modal
      backdrop?.addEventListener('click', () => this.close());
      closeBtn?.addEventListener('click', () => this.close());

      // Atajos de teclado
      document.addEventListener('keydown', (e) => {
        if (!this.isOpen) return;

        if (e.key === 'Escape') {
          e.preventDefault();
          this.close();
        } else if (e.key === ' ' || e.key === 'k') {
          e.preventDefault();
          this.togglePlay();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.seekRelative(5);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.seekRelative(-5);
        } else if (e.key === 'f') {
          e.preventDefault();
          this.toggleFullscreen();
        }
      });

      // Play / Pausa en centro y barra
      centerPlay?.addEventListener('click', () => this.togglePlay());
      playBtn?.addEventListener('click', () => this.togglePlay());
      player?.addEventListener('click', () => this.togglePlay());

      // Eventos de reproducción del video
      player?.addEventListener('play', () => this.onPlayStateChange(true));
      player?.addEventListener('pause', () => this.onPlayStateChange(false));
      player?.addEventListener('ended', () => {
        this.onPlayStateChange(false);
        if (this.elements.progressBar) this.elements.progressBar.style.width = '0%';
      });

      // Actualización de barra y tiempo
      player?.addEventListener('timeupdate', () => this.onTimeUpdate());
      player?.addEventListener('loadedmetadata', () => {
        if (this.elements.durationTime && player.duration) {
          this.elements.durationTime.textContent = formatTime(player.duration);
        }
      });

      // Clic en la barra de progreso para saltar
      progressWrap?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!player.duration) return;
        const rect = progressWrap.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = Math.max(0, Math.min(1, clickX / rect.width));
        player.currentTime = ratio * player.duration;
      });

      // Pantalla completa
      fsBtn?.addEventListener('click', () => this.toggleFullscreen());
    },

    open(project) {
      if (!project || !project.video) return;

      this.activeProject = project;
      const { modal, title, player, progressBar, currentTime, durationTime } = this.elements;

      // Configurar datos
      if (title) title.textContent = `${project.name} — ${project.category}`;

      // Garantizar SIN SONIDO
      player.muted = true;
      player.volume = 0;

      // Asignar fuente y resetear
      player.src = project.video;
      player.poster = project.image || '';
      player.currentTime = 0;
      if (progressBar) progressBar.style.width = '0%';
      if (currentTime) currentTime.textContent = '0:00';
      if (durationTime) durationTime.textContent = project.duration ? `${project.duration}` : '0:00';

      // Mostrar modal
      modal.classList.add('is-active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      this.isOpen = true;

      // Iniciar reproducción automática silenciada
      const playPromise = player.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.onPlayStateChange(true);
        }).catch(() => {
          this.onPlayStateChange(false);
        });
      }

      this.elements.closeBtn?.focus();
    },

    close() {
      if (!this.isOpen) return;

      const { modal, player } = this.elements;
      if (player) {
        player.pause();
        player.removeAttribute('src'); // Liberar memoria de video
        player.load();
      }

      modal.classList.remove('is-active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      this.isOpen = false;
      this.activeProject = null;
    },

    togglePlay() {
      const { player } = this.elements;
      if (!player) return;

      if (player.paused) {
        player.muted = true; // Reforzar sin sonido
        player.play().catch(err => console.warn('Play prevented:', err));
      } else {
        player.pause();
      }
    },

    onPlayStateChange(isPlaying) {
      const {
        centerPlayIcon, centerPauseIcon,
        ctrlPlayIcon, ctrlPauseIcon,
        modal, centerPlay, playBtn
      } = this.elements;

      if (isPlaying) {
        modal?.classList.add('is-playing');
        if (centerPlayIcon) centerPlayIcon.style.display = 'none';
        if (centerPauseIcon) centerPauseIcon.style.display = 'block';
        if (ctrlPlayIcon) ctrlPlayIcon.style.display = 'none';
        if (ctrlPauseIcon) ctrlPauseIcon.style.display = 'block';
        centerPlay?.setAttribute('aria-label', 'Pausar video');
        playBtn?.setAttribute('aria-label', 'Pausar video');
      } else {
        modal?.classList.remove('is-playing');
        if (centerPlayIcon) centerPlayIcon.style.display = 'block';
        if (centerPauseIcon) centerPauseIcon.style.display = 'none';
        if (ctrlPlayIcon) ctrlPlayIcon.style.display = 'block';
        if (ctrlPauseIcon) ctrlPauseIcon.style.display = 'none';
        centerPlay?.setAttribute('aria-label', 'Reproducir video');
        playBtn?.setAttribute('aria-label', 'Reproducir video');
      }
    },

    onTimeUpdate() {
      const { player, progressBar, currentTime, progressWrap } = this.elements;
      if (!player || !player.duration) return;

      const pct = (player.currentTime / player.duration) * 100;
      if (progressBar) progressBar.style.width = `${pct}%`;
      if (currentTime) currentTime.textContent = formatTime(player.currentTime);
      if (progressWrap) progressWrap.setAttribute('aria-valuenow', Math.round(pct));
    },

    seekRelative(seconds) {
      const { player } = this.elements;
      if (!player || !player.duration) return;
      player.currentTime = Math.max(0, Math.min(player.duration, player.currentTime + seconds));
    },

    toggleFullscreen() {
      const { player } = this.elements;
      if (!player) return;

      if (!document.fullscreenElement) {
        if (player.requestFullscreen) {
          player.requestFullscreen();
        } else if (player.webkitRequestFullscreen) {
          player.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  /* ── Inicialización de la Sección de Proyectos ── */
  function init() {
    if (typeof CONFIG === 'undefined') return;

    VideoModal.init();

    const container = document.getElementById('projects-grid');
    if (!container) return;

    container.innerHTML = '';

    const projects = CONFIG.projects;
    const order = ['vegna', 'fortunato', 'parrillaJoseLuis'];

    order.forEach((key, i) => {
      const p = projects[key];
      if (!p) return;
      const card = createProjectCard(p, i);
      container.appendChild(card);
    });
  }

  /* ── Construcción de la tarjeta de proyecto ── */
  function createProjectCard(project, index) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-animate', '');
    card.style.setProperty('--delay', `${index * 0.15}s`);

    const hasURL = project.url && project.url.trim() !== '';
    const hasVideo = project.video && project.video.trim() !== '';

    card.innerHTML = `
      <div class="project-card__media" role="${hasVideo ? 'button' : 'region'}" tabindex="${hasVideo ? '0' : '-1'}" aria-label="${hasVideo ? `Reproducir demo en primer plano de ${escapeHTML(project.name)}` : `Captura de ${escapeHTML(project.name)}`}">
        <img 
          class="project-card__poster"
          src="${escapeHTML(project.image)}" 
          alt="Vista previa de ${escapeHTML(project.name)}" 
          loading="lazy"
          onerror="this.parentElement.classList.add('project-card__media--fallback')"
        >
        <span class="project-card__category">${escapeHTML(project.category)}</span>

        ${hasVideo ? `
          <!-- Overlay de reproducción en primer plano -->
          <div class="project-card__video-prompt">
            <span class="project-card__play-bubble" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 3 20 12 6 21 6 3"/>
              </svg>
            </span>
            <div class="project-card__play-badge">
              <span class="project-card__play-pulse"></span>
              <span>Ver demo en video ${project.duration ? `(${escapeHTML(project.duration)})` : ''}</span>
            </div>
          </div>
        ` : ''}
      </div>

      <div class="project-card__body">
        <h3 class="project-card__title">${escapeHTML(project.name)}</h3>
        <p class="project-card__desc">${escapeHTML(project.description)}</p>
        
        ${project.technologies?.length ? `
        <div class="project-card__tech">
          ${project.technologies.map(t => `<span class="tech-tag">${escapeHTML(t)}</span>`).join('')}
        </div>
        ` : ''}

        <ul class="project-card__features">
          ${project.features.map(f => `<li>${escapeHTML(f)}</li>`).join('')}
        </ul>

        <div class="project-card__actions">
          ${hasURL ? `
            <a href="${escapeHTML(project.url)}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm">
              Ver sitio web
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          ` : `
            <span class="btn btn--outline btn--sm btn--disabled" aria-disabled="true">Próximamente</span>
          `}

          ${hasVideo ? `
            <button type="button" class="btn btn--outline btn--sm btn--play-trigger">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="6 3 20 12 6 21 6 3"/>
              </svg>
              Ver demo en video
            </button>
          ` : ''}
        </div>
      </div>
    `;

    // Vincular clics para abrir el modal en primer plano
    if (hasVideo) {
      const mediaEl = card.querySelector('.project-card__media');
      const triggerBtn = card.querySelector('.btn--play-trigger');

      const triggerOpen = (e) => {
        e.preventDefault();
        VideoModal.open(project);
      };

      mediaEl?.addEventListener('click', triggerOpen);
      triggerBtn?.addEventListener('click', triggerOpen);

      // Accesibilidad con Enter / Espacio en la tarjeta
      mediaEl?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          triggerOpen(e);
        }
      });
    }

    return card;
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
