/**
 * =============================================
 * CONTACTO / FORMULARIO — Portfolio Nahuel Vega
 * =============================================
 */

(function () {
  'use strict';

  const DOM = {
    form: null,
    fields: {},
    submitBtn: null,
    statusMsg: null,
  };

  const FIELD_NAMES = ['name', 'business', 'email', 'phone', 'project-type', 'message'];

  /* ── Validaciones ── */
  const validators = {
    name(value) {
      if (!value.trim()) return 'Por favor, ingresá tu nombre.';
      if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres.';
      return '';
    },
    business(value) {
      // Opcional
      return '';
    },
    email(value) {
      if (!value.trim()) return 'Por favor, ingresá tu correo electrónico.';
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(value.trim())) return 'El correo electrónico no es válido.';
      return '';
    },
    phone(value) {
      if (!value.trim()) return 'Por favor, ingresá tu número de WhatsApp.';
      const cleaned = value.replace(/[\s\-()]/g, '');
      if (cleaned.length < 8) return 'El número debe tener al menos 8 dígitos.';
      return '';
    },
    'project-type'(value) {
      if (!value) return 'Seleccioná el tipo de proyecto.';
      return '';
    },
    message(value) {
      if (!value.trim()) return 'Por favor, contanos sobre tu proyecto.';
      if (value.trim().length < 10) return 'La descripción debe tener al menos 10 caracteres.';
      return '';
    },
  };

  /* ── Inicialización ── */
  function init() {
    DOM.form = document.getElementById('contact-form');
    if (!DOM.form) return;

    FIELD_NAMES.forEach(name => {
      DOM.fields[name] = DOM.form.querySelector(`[name="${name}"]`);
    });

    DOM.submitBtn = DOM.form.querySelector('[type="submit"]');
    DOM.statusMsg = document.getElementById('form-status');

    bindEvents();
  }

  /* ── Eventos ── */
  function bindEvents() {
    DOM.form.addEventListener('submit', handleSubmit);

    // Validación en tiempo real (al salir del campo)
    Object.entries(DOM.fields).forEach(([name, field]) => {
      if (!field) return;
      field.addEventListener('blur', () => validateField(name));
      field.addEventListener('input', () => clearFieldError(name));
    });
  }

  /* ── Validar un campo ── */
  function validateField(name) {
    const field = DOM.fields[name];
    if (!field) return true;

    const validator = validators[name];
    if (!validator) return true;

    const error = validator(field.value);
    const group = field.closest('.form-group');
    const errorEl = group?.querySelector('.form-error');

    if (error) {
      field.classList.add('is-invalid');
      field.classList.remove('is-valid');
      if (errorEl) {
        errorEl.textContent = error;
        errorEl.hidden = false;
      }
      return false;
    } else {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.hidden = true;
      }
      return true;
    }
  }

  function clearFieldError(name) {
    const field = DOM.fields[name];
    if (!field) return;
    const group = field.closest('.form-group');
    const errorEl = group?.querySelector('.form-error');
    if (field.classList.contains('is-invalid')) {
      field.classList.remove('is-invalid');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.hidden = true;
      }
    }
  }

  /* ── Envío del formulario ── */
  function handleSubmit(e) {
    e.preventDefault();

    // Validar todos los campos
    let allValid = true;
    FIELD_NAMES.forEach(name => {
      const valid = validateField(name);
      if (!valid) allValid = false;
    });

    if (!allValid) {
      // Enfocar primer campo inválido
      const firstInvalid = DOM.form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      showStatus('Por favor, completá los campos marcados.', 'error');
      return;
    }

    // Construir mensaje de WhatsApp
    const data = {
      name: DOM.fields.name.value.trim(),
      business: DOM.fields.business.value.trim(),
      email: DOM.fields.email.value.trim(),
      phone: DOM.fields.phone.value.trim(),
      projectType: DOM.fields['project-type'].value,
      message: DOM.fields.message.value.trim(),
    };

    const whatsappNumber = typeof CONFIG !== 'undefined' ? CONFIG.whatsapp.number : '5491158708358';

    const lines = [
      `*Nuevo contacto desde el portfolio*`,
      ``,
      `*Nombre:* ${data.name}`,
    ];
    if (data.business) lines.push(`*Comercio:* ${data.business}`);
    lines.push(
      `*Email:* ${data.email}`,
      `*WhatsApp:* ${data.phone}`,
      `*Tipo de proyecto:* ${data.projectType}`,
      ``,
      `*Descripción:*`,
      data.message
    );

    const text = encodeURIComponent(lines.join('\n'));
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${text}`;

    // Abrir WhatsApp
    window.open(whatsappURL, '_blank', 'noopener,noreferrer');

    showStatus('¡Redirigiendo a WhatsApp! Si no se abre automáticamente, revisá las ventanas emergentes de tu navegador.', 'success');
  }

  /* ── Mensaje de estado ── */
  function showStatus(msg, type) {
    if (!DOM.statusMsg) return;
    DOM.statusMsg.textContent = msg;
    DOM.statusMsg.className = `form-status form-status--${type}`;
    DOM.statusMsg.hidden = false;

    if (type === 'success') {
      setTimeout(() => {
        DOM.statusMsg.hidden = true;
      }, 8000);
    }
  }

  /* ── Arranque ── */
  document.addEventListener('DOMContentLoaded', init);
})();
