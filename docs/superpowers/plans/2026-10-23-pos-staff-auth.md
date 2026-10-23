# Fitur Login & Registrasi Staf Internal POS Aish Catering Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun sistem autentikasi login modal overlay, proteksi sesi kerja kasir, dan fitur registrasi/manajemen staf berbasis peran (Admin, Kasir, Dapur) secara offline persisten pada aplikasi POS Aish Catering.

**Architecture:** Modul autentikasi mandiri (`js/auth.js`) mengelola penyimpanan akun dan sesi aktif di `localStorage`, terintegrasi dengan `index.html` via modal overlay login dan panel view baru "Kelola Staf" untuk Admin, serta memperbarui secara dinamis header kasir dan slip cetak transaksi.

**Tech Stack:** Vanilla JavaScript (ES6+), HTML5, CSS3 (Modern Glassmorphism), Electron (v45.0.0), Node.js native test runner (`node --test`).

**Spec:** `docs/superpowers/specs/2026-10-23-pos-staff-auth-design.md`

## Global Constraints
- Aplikasi berjalan 100% offline di lingkungan Electron desktop.
- Menggunakan skema warna dan design token yang sudah ada (Dark slate-900, Amber-500, Emerald-500, Plus Jakarta Sans).
- Akun bawaan awal:
  - Admin: username `admin`, password `admin123`, role `admin`
  - Kasir: username `kasir`, password `123456`, role `kasir`
- Registrasi staf baru hanya dapat dilakukan oleh akun dengan role `admin`.
- Header kasir dan cetakan struk harus menampilkan nama staf yang sedang aktif.

## Review Focus
1. Password/Username kosong atau salah saat login: Menampilkan pesan peringatan toast merah tanpa me-refresh halaman.
2. Username duplikat saat registrasi staf: Menolak registrasi dengan notifikasi "Username sudah digunakan".
3. Akun Admin terakhir dihapus: Mencegah penghapusan akun admin jika hanya tersisa satu akun admin.
4. Akses menu "Kelola Staf" oleh non-admin: Menu tidak ditampilkan di sidebar untuk Kasir/Dapur, dan view dicegah jika diakses paksa.
5. Sesi login tetap bertahan saat window Electron direfresh atau dibuka kembali.

---

### Task 1: Auth Module & LocalStorage Persistence Engine

**Files:**
- Create: `js/auth.js`
- Test: `tests/auth.test.js`

**Interfaces:**
- Produces:
  - `AishAuth.init(): void`
  - `AishAuth.login(username, password): { success: boolean, message?: string, user?: object }`
  - `AishAuth.logout(): void`
  - `AishAuth.getCurrentUser(): object | null`
  - `AishAuth.getStaffList(): Array<object>`
  - `AishAuth.registerStaff({ name, username, role, password }): { success: boolean, message: string }`
  - `AishAuth.deleteStaff(userId): { success: boolean, message: string }`

- [ ] **Step 1: Write the failing test for AishAuth**

Create `tests/auth.test.js` testing initial seed accounts, login success/failure, staff registration by admin, and session persistence mock.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/auth.test.js`
Expected: FAIL (module `js/auth.js` not found).

- [ ] **Step 3: Implement `js/auth.js`**

Implement modular auth engine with default seed users (`admin`, `kasir`), `localStorage` wrapper, and validation logic.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/auth.test.js`
Expected: PASS all test cases.

- [ ] **Step 5: Commit**

```bash
git add js/auth.js tests/auth.test.js
git commit -m "feat(auth): implement core auth and staff management engine"
```

---

### Task 2: Login Overlay Modal UI & Header Session Synchronization

**Files:**
- Modify: `index.html` (tambahkan `<div id="loginOverlay">` dan script `js/auth.js`)
- Modify: `css/style.css` (styling overlay login modern, floating card, input groups)
- Modify: `js/app.js` (hubungkan event login, update header, dan tombol logout)

**Interfaces:**
- Consumes: `AishAuth.login()`, `AishAuth.logout()`, `AishAuth.getCurrentUser()`
- Produces: Dynamic DOM updates for `#loginOverlay`, `#currentStaffName`, `#currentStaffRole`, `#currentStaffAvatar`, `#btnLogout`

- [ ] **Step 1: Add Login Modal Markup in `index.html`**

Tambahkan modal overlay `#loginOverlay` dengan logo Aish Catering, input Username, input Password, pilihan Quick-Login demo, tombol Masuk, dan badge status.

- [ ] **Step 2: Add CSS Styling for Login Overlay in `css/style.css`**

Buat style dark glassmorphism mewah yang menutupi workspace sebelum autentikasi berhasil, dengan animasi fade-in dan input highlight.

- [ ] **Step 3: Connect Login & Logout in `js/app.js`**

Implementasikan `AishPOS.handleLogin(event)` dan `AishPOS.handleLogout()`. Perbarui tampilan header:
- Nama staf aktif di `#shiftStatusText`
- Inisial avatar di `.avatar-circle`
- Tombol dropdown / icon logout di area user profile.

- [ ] **Step 4: Verify login flow in browser or Electron**

Jalankan pemeriksaan DOM dan simulasi login untuk memastikan overlay tertutup saat kredensial valid dan header terupdate.

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css js/app.js
git commit -m "feat(auth): add login overlay modal and session header sync"
```

---

### Task 3: Admin Staff Management Screen (Registrasi Staf Baru)

**Files:**
- Modify: `index.html` (tambahkan nav item "Kelola Staf" dan view container `#view-staff`)
- Modify: `css/style.css` (styling form registrasi staf, card daftar staf, role badge)
- Modify: `js/app.js` (fungsi `renderStaffManagement()`, `handleRegisterStaff()`, `handleDeleteStaff()`)

**Interfaces:**
- Consumes: `AishAuth.getStaffList()`, `AishAuth.registerStaff()`, `AishAuth.deleteStaff()`
- Produces: Rendered staff table, registration form submit handler, role-based nav visibility

- [ ] **Step 1: Add Nav Item and Staff Management View in `index.html`**

Tambahkan `<a class="nav-item" data-view="staff">` di sidebar (diberi penanda `id="navStaffItem"`) dan `<section class="view-container" id="view-staff">` berisi form registrasi (Nama, Username, Role, Password) dan tabel daftar staf aktif.

- [ ] **Step 2: Add CSS Styling for Staff Management in `css/style.css`**

Tambahkan styling formulir 2-kolom, grid card staf, badge warna untuk masing-masing role (Admin: ungu/emas, Kasir: hijau, Dapur: oranye), dan tombol aksi hapus.

- [ ] **Step 3: Implement Staff Management Logic in `js/app.js`**

Tambahkan method `renderStaffView()`, `submitNewStaff()`, `deleteStaff(id)` di `AishPOS`. Sembunyikan `#navStaffItem` jika staf yang login bukan `admin`.

- [ ] **Step 4: Test staff registration and role-based switching**

Daftarkan staf baru (misal: "Dewi - Kasir Pagi"), coba login dengan akun tersebut, dan pastikan akun baru bisa bertransaksi namun tidak bisa mengakses menu kelola staf.

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css js/app.js
git commit -m "feat(staff): add admin staff registration and management view"
```

---

### Task 4: Dynamic Invoice & Kitchen Slip Attribution + Final Polish

**Files:**
- Modify: `js/app.js:980-1040` (ganti hardcoded `Kasir Ratna` pada struk thermal & slip dapur dengan `currentUser.name`)

**Interfaces:**
- Consumes: `AishAuth.getCurrentUser()`

- [ ] **Step 1: Update receipt & kitchen slip templates in `js/app.js`**

Ganti string statis `oleh Kasir Ratna` di `printThermalReceipt()` dan `printKitchenSlip()` menjadi `oleh ${currentUser.name} (${currentUser.role.toUpperCase()})`.

- [ ] **Step 2: Run verification test suite**

Jalankan test suite Node: `node --test tests/auth.test.js` dan validasi build Electron: `npm run build:exe` (atau test startup).

- [ ] **Step 3: Final Commit**

```bash
git add js/app.js
git commit -m "feat(pos): link active cashier to thermal receipts and kitchen slips"
```
