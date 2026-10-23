# Master Catalog & Menu CRUD Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengaktifkan master katalog katering dengan fitur lengkap CRUD (tambah, edit, hapus, toggle ketersediaan stok), hak akses Administrator, dan sinkronisasi real-time ke kasir POS.

**Architecture:** Memperluas `AishStorage` (`js/storage.js`) dengan persistensi `aish_catalog_v1`. Mengaktifkan panel `#view-catalog` di `index.html` dengan modal form interaktif. Menghubungkan controller `AishPOS` di `js/app.js` agar katalog POS selalu membaca data dari storage engine.

**Tech Stack:** Vanilla JavaScript (ES6+), HTML5, Vanilla CSS, Node.js Test Runner (`node --test`), Electron.

**Spec:** `docs/superpowers/specs/2026-10-23-pos-master-catalog-crud-design.md`

## Global Constraints
- Tetap menggunakan Vanilla JavaScript murni tanpa runtime dependency tambahan.
- Kompatibel dengan format `AishStorage` yang sudah berjalan.
- Seluruh unit tests (`npm test`) wajib lulus 100%.

---

### Task 1: Catalog Persistence Engine & Unit Tests
**Files:**
- Modify: `js/storage.js`
- Modify: `tests/storage.test.js`

- [ ] Write failing unit tests in `tests/storage.test.js` covering:
  - `getCatalog()` seeding default items
  - `saveCatalogItem()` adding new item and updating existing item
  - `toggleCatalogAvailability()` flipping `isAvailable` boolean
  - `deleteCatalogItem()` removing an item by id
  - `exportFullBackup()` containing catalog array
- [ ] Run test to verify failure (`node --test tests/storage.test.js`)
- [ ] Implement catalog storage functions in `js/storage.js`
- [ ] Run test to verify tests pass (`node --test tests/storage.test.js`)
- [ ] Commit: `feat(storage): implement catalog persistence engine and unit tests`

---

### Task 2: Master Catalog Table & Form Modal UI
**Files:**
- Modify: `index.html`
- Modify: `css/style.css`

- [ ] Update `#view-catalog` in `index.html`:
  - Header with search input, category filter buttons, and "+ Tambah Menu Baru" button
  - Responsive data table for master menu management
- [ ] Add `#modalMenuForm` in `index.html` for creating & editing menu items
- [ ] Add CSS styling in `css/style.css` for catalog table rows, status pills, and menu form layout
- [ ] Commit: `feat(ui): add master catalog table and menu form modal`

---

### Task 3: Interactive Catalog Controller & Admin Role Guard
**Files:**
- Modify: `js/app.js`

- [ ] Connect `catalogData` to read from `AishStorage.getCatalog()`
- [ ] Implement `renderMasterCatalog()` to render table rows with edit/delete/toggle actions
- [ ] Implement `openAddMenuModal()` and `openEditMenuModal(itemId)` with pre-filled values
- [ ] Implement `saveMenuForm(e)` with form validation and persistence
- [ ] Implement `deleteCatalogMenu(itemId)` with confirmation dialog
- [ ] Implement `toggleMenuAvailability(itemId)` to toggle status
- [ ] Enforce Admin guard: hide/disable edit & delete controls if current user is not admin
- [ ] Commit: `feat(catalog): implement master catalog CRUD controller and admin guard`

---

### Task 4: POS Sync & Out-of-Stock Handling
**Files:**
- Modify: `js/app.js`

- [ ] Update `renderCatalog()` in POS to display "Stok Habis" badge and disable "+ Pilih" button if `item.isAvailable === false`
- [ ] Prevent adding out-of-stock items to cart in `selectCatalogItem()`
- [ ] Verify interactively in browser that toggling availability in Master Catalog immediately updates POS behavior
- [ ] Commit: `feat(pos): sync master catalog updates and enforce out-of-stock guard in POS`

---

### Task 5: End-to-End Verification & Automated Superpowers Cleanup
**Files:**
- Verify: `npm test`
- Update: `docs/CHANGELOG.md`

- [ ] Run full test suite: `npm test`
- [ ] Archive work to `docs/CHANGELOG.md`
- [ ] Clean up superpowers tracking files automatically according to rules
- [ ] Final commit: `chore: cleanup superpowers tracking files, archive to docs/CHANGELOG.md`
