const test = require('node:test');
const assert = require('node:assert/strict');

// Minimal DOM mock for Node.js test environment
function setupMockDOM() {
  const elements = new Map();

  class MockElement {
    constructor(tagName) {
      this.tagName = tagName.toUpperCase();
      this.id = '';
      this.className = '';
      this.classList = {
        _classes: new Set(),
        add(...cls) { cls.forEach(c => this._classes.add(c)); },
        remove(...cls) { cls.forEach(c => this._classes.delete(c)); },
        contains(c) { return this._classes.has(c); }
      };
      this.children = [];
      this.parentNode = null;
      this.innerHTML = '';
      this._listeners = {};
    }

    appendChild(child) {
      child.parentNode = this;
      this.children.push(child);
      if (child.id) elements.set(child.id, child);
      return child;
    }

    removeChild(child) {
      const idx = this.children.indexOf(child);
      if (idx !== -1) {
        this.children.splice(idx, 1);
        child.parentNode = null;
        if (child.id) elements.delete(child.id);
      }
      return child;
    }

    remove() {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    }

    addEventListener(event, fn) {
      if (!this._listeners[event]) this._listeners[event] = [];
      this._listeners[event].push(fn);
    }

    querySelector(selector) {
      // Very basic class or tag matching
      if (selector.startsWith('.')) {
        const cls = selector.slice(1);
        return this.children.find(c => c.classList.contains(cls)) || null;
      }
      return null;
    }
  }

  const body = new MockElement('BODY');
  elements.set('body', body);

  globalThis.document = {
    body: body,
    createElement: (tag) => new MockElement(tag),
    getElementById: (id) => elements.get(id) || null
  };
}

setupMockDOM();
const AishToast = require('../js/toast.js');

test('AishToast - Initialization creates toastContainer', () => {
  const container = AishToast.getContainer();
  assert.ok(container, 'Harus membuat atau mengembalikan kontainer toast');
  assert.equal(container.id, 'toastContainer');
});

test('AishToast - Show simple string toast with default success type', () => {
  const toast = AishToast.show('Data berhasil disimpan');
  assert.ok(toast, 'Harus mengembalikan instance elemen toast');
  assert.equal(toast.classList.contains('toast-item'), true);
  assert.equal(toast.classList.contains('toast-success'), true);
  assert.ok(toast.innerHTML.includes('Data berhasil disimpan'));
});

test('AishToast - Show with object options and different types', () => {
  const toastWarning = AishToast.show({
    title: 'Peringatan Stok',
    message: 'Bahan baku rendang tersisa sedikit',
    type: 'warning',
    duration: 5000
  });

  assert.equal(toastWarning.classList.contains('toast-warning'), true);
  assert.ok(toastWarning.innerHTML.includes('Peringatan Stok'));
  assert.ok(toastWarning.innerHTML.includes('Bahan baku rendang tersisa sedikit'));

  const toastError = AishToast.show({
    title: 'Gagal',
    message: 'Koneksi gagal',
    type: 'error'
  });
  assert.equal(toastError.classList.contains('toast-error'), true);
});

test('AishToast - Dismiss toast removes element from DOM', () => {
  const toast = AishToast.show({
    title: 'Untuk Dihapus',
    message: 'Testing dismiss',
    type: 'info',
    duration: 10000
  });

  const toastId = toast.id;
  assert.ok(document.getElementById(toastId));

  // Dismiss immediately
  AishToast.dismiss(toastId, 0);
  assert.equal(document.getElementById(toastId), null, 'Elemen toast harus terhapus dari DOM');
});

test('AishToast - Clear all toasts', () => {
  AishToast.show('Toast 1');
  AishToast.show('Toast 2');
  AishToast.clearAll();

  const container = AishToast.getContainer();
  assert.equal(container.children.length, 0, 'Semua toast harus terhapus dari kontainer');
});
