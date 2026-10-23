// ==========================================================================
// Aish Catering POS - Floating Toast Notification Engine
// ==========================================================================

const AishToast = (() => {
  let counter = 0;

  const ICONS = {
    success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
    warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
  };

  const DEFAULT_TITLES = {
    success: 'Berhasil',
    info: 'Informasi',
    warning: 'Perhatian',
    error: 'Terjadi Kesalahan'
  };

  function getContainer() {
    if (typeof document === 'undefined') return null;
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  function show(opts, secondArgType) {
    if (typeof document === 'undefined') return null;

    let title = '';
    let message = '';
    let type = 'success';
    let duration = 3500;

    if (typeof opts === 'string') {
      message = opts;
      if (typeof secondArgType === 'string') {
        type = secondArgType;
      }
      title = DEFAULT_TITLES[type] || 'Notifikasi';
    } else if (typeof opts === 'object' && opts !== null) {
      message = opts.message || opts.text || '';
      type = opts.type || 'success';
      title = opts.title || DEFAULT_TITLES[type] || 'Notifikasi';
      if (typeof opts.duration === 'number') {
        duration = opts.duration;
      }
    }

    const container = getContainer();
    if (!container) return null;

    counter++;
    const toastId = `aishToast_${Date.now()}_${counter}`;

    const toastEl = document.createElement('div');
    toastEl.id = toastId;
    toastEl.className = `toast-item toast-${type}`;
    if (toastEl.classList && toastEl.classList.add) {
      toastEl.classList.add('toast-item');
      toastEl.classList.add(`toast-${type}`);
    }

    const iconSvg = ICONS[type] || ICONS.info;

    toastEl.innerHTML = `
      <div class="toast-content-wrapper">
        <div class="toast-icon-box">${iconSvg}</div>
        <div class="toast-text-box">
          <div class="toast-title">${escapeHtml(title)}</div>
          <div class="toast-message">${escapeHtml(message)}</div>
        </div>
        <button type="button" class="toast-close-btn" aria-label="Tutup notifikasi" onclick="AishToast.dismiss('${toastId}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="toast-progress-bar" style="animation-duration: ${duration}ms;"></div>
    `;

    container.appendChild(toastEl);

    // Auto-dismiss handler with timer pause on hover if element supports addEventListener
    let timerId = null;
    let remainingTime = duration;
    let startTime = Date.now();

    const startTimer = () => {
      if (duration <= 0) return;
      startTime = Date.now();
      timerId = setTimeout(() => {
        dismiss(toastId);
      }, remainingTime);
    };

    const pauseTimer = () => {
      if (timerId) {
        clearTimeout(timerId);
        remainingTime -= (Date.now() - startTime);
      }
    };

    if (toastEl.addEventListener) {
      toastEl.addEventListener('mouseenter', pauseTimer);
      toastEl.addEventListener('mouseleave', () => {
        if (remainingTime > 0) startTimer();
      });
    }

    startTimer();

    return toastEl;
  }

  function dismiss(toastId, animDelay = 300) {
    if (typeof document === 'undefined') return;
    const toastEl = document.getElementById(toastId);
    if (!toastEl) return;

    if (animDelay <= 0) {
      toastEl.remove();
      return;
    }

    if (toastEl.classList && toastEl.classList.add) {
      toastEl.classList.add('toast-dismissing');
    }

    setTimeout(() => {
      toastEl.remove();
    }, animDelay);
  }

  function clearAll() {
    if (typeof document === 'undefined') return;
    const container = document.getElementById('toastContainer');
    if (container) {
      container.innerHTML = '';
      if (container.children) {
        while (container.children.length > 0) {
          container.removeChild(container.children[0]);
        }
      }
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  return {
    getContainer,
    show,
    dismiss,
    clearAll
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = AishToast;
}
