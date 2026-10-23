# Aish Catering POS — Development Changelog

Dokumen ini merangkum seluruh pekerjaan pengembangan sistem POS Aish Catering yang telah selesai dilaksanakan. Semua file internal superpowers (plans, specs, progress ledgers) telah dihapus setelah task selesai dan diarsipkan ringkasannya di sini.

---

## Sprint 1: Sistem Autentikasi Staf (Staff Auth)
**Tanggal:** 23 Oktober 2026  
**Plan:** `docs/superpowers/plans/2026-10-23-pos-staff-auth.md` *(diarsipkan)*  
**Spec:** `docs/superpowers/specs/2026-10-23-pos-staff-auth-design.md` *(diarsipkan)*

### Yang Dibangun:
- **`js/auth.js`** — Modul autentikasi `AishAuth` dengan localStorage persistence:
  - Login/Logout berdasarkan username + password
  - Registrasi akun staf baru (kasir / admin)
  - Hapus akun staf dengan safeguard (tidak bisa hapus akun sendiri, tidak bisa hapus admin terakhir)
  - Seeding data staf bawaan: `admin` (admin123) dan `kasir` (123456)
- **`tests/auth.test.js`** — 4 unit tests, semua pass
- **`index.html`** — Login overlay fullscreen + form registrasi staf di Admin View (`#view-staff`)
- **`css/style.css`** — Styling login card, form staf, avatar, dan admin-only nav badge

### Commits:
- `c97fd56` feat(pos): link active cashier to thermal receipts and kitchen slips
- `85a0abe` feat(staff): add admin staff registration and management view

---

## Sprint 2: Storage Engine & Persistensi Transaksi
**Tanggal:** 23 Oktober 2026  
**Plan:** `docs/superpowers/plans/2026-10-23-pos-transactions-persistence.md` *(diarsipkan)*  
**Spec:** `docs/superpowers/specs/2026-10-23-pos-transactions-persistence-design.md` *(diarsipkan)*

### Task 1: Storage Engine
- **`js/storage.js`** — Modul `AishStorage` dengan localStorage persistence:
  - `init()` + seeding data transaksi/KDS awal (≥5 events, ≥3 kitchen orders)
  - `getEvents()` / `saveEvent()` — CRUD data pesanan acara
  - `getKitchenOrders()` / `advanceKitchenOrderStage()` — Update stage antrean/masak/kirim
  - `createKitchenTicketFromOrder()` — Auto-generate tiket KDS saat pembayaran dikonfirmasi
  - `exportFullBackup()` / `resetToDefault()` — Backup JSON dan reset data demo
- **`tests/storage.test.js`** — 5 unit tests, semua pass

### Task 2: Integrasi Storage ke Runtime
- `index.html` — include `js/storage.js`
- `js/app.js` — `eventsData` dan `kitchenOrders` terhubung ke `AishStorage`, `renderEventsTable()` dan `renderKitchenDisplay()` membaca data persisten
- Total 9 tests pass

### Task 3: Backup Export & Reset Data UI
- `index.html` — Card "Cadangan Data & Arsip" di Admin View (`#view-staff`) dengan:
  - Chip statistik: jumlah transaksi, tiket KDS, akun staf
  - Tombol "Unduh Backup JSON" → download `backup-aish-pos-YYYY-MM-DD.json`
  - Tombol "Reset Data Demo" → reset ke dataset awal dengan konfirmasi
- `js/app.js` — `updateBackupStats()`, `exportBackupData()`, `resetDemoData()`
- `css/style.css` — Styling card backup dark gradient

### Commits:
- `be2eddc` feat(storage): implement offline storage engine and KDS ticket generator
- `c016396` feat(pos): wire storage engine to payment flow and KDS auto-sync
- `d33c326` feat(backup): add JSON backup export and data reset controls

---

## Sprint 3: Floating Toast Notification System
**Tanggal:** 23 Oktober 2026  
**Plan:** `docs/superpowers/plans/2026-10-23-pos-toast-notifications.md` *(diarsipkan)*

### Yang Dibangun:
- **`js/toast.js`** — Modul `AishToast` mandiri dengan API:
  - `show(message, type)` atau `show({ title, message, type, duration })`
  - `dismiss(toastId)` — Tutup manual dengan animasi slide-out
  - `clearAll()` — Hapus semua toast aktif
  - Auto-dismiss (default 3500ms) dengan pause-on-hover
  - 4 tipe: `success` (emerald), `info` (sky), `warning` (amber), `error` (red)
- **`tests/toast.test.js`** — 5 unit tests, semua pass
- **`css/style.css`** — Glassmorphism dark slate, backdrop-blur, animasi keyframe slide-in/out, progress bar
- **`index.html`** — Hapus `alert()` pada Bantuan Kasir & Notifikasi Dapur
- **`js/app.js`** — Seluruh `alert()` native diganti toast melayang:
  - Pilih menu katalog, update porsi, hapus keranjang
  - Konfirmasi pembayaran, Invoice WA
  - Update status KDS, Notifikasi ringkasan dapur (klik lonceng)
  - Registrasi/hapus staf, Backup & Reset data

### Commits:
- `0a3100f` feat(toast): implement floating toast notification engine and tests
- `219e9f7` feat(toast): add glassmorphism styling and keyframe animations for toast notifications
- `67195bb` feat(toast): wire toast notifications to all POS workflows and eliminate native alerts

---

## Sprint 4: Multi-Item Cart & Historical Invoice Fix
**Tanggal:** 23 Oktober 2026  
**Plan:** `docs/superpowers/plans/2026-10-23-pos-multi-item-cart.md` *(diarsipkan)*  
**Spec:** `docs/superpowers/specs/2026-10-23-pos-multi-item-cart-design.md` *(diarsipkan)*

### Yang Dibangun:
- **`js/cart.js`** — Modul `AishCart` untuk manajemen keranjang multi-menu:
  - `addItem()` — Tambah menu baru atau akumulasi porsi menu yang sudah ada
  - `updatePax()` — Update porsi/pax per item dengan validasi minimal 1
  - `removeItem()` — Hapus item berdasarkan index
  - `calculateFinancials()` — Kalkulasi subtotal gabungan seluruh item, ongkir (kurir/buffet/pickup), pajak PB1 10%, termin pembayaran (DP 30%, DP 50%, Lunas)
  - `formatSummaryText()` — Generate string ringkasan gabungan multi-menu
- **`tests/cart.test.js`** — 5 unit tests, semua pass
- **Right Rail POS UI (`index.html`, `css/style.css`, `js/app.js`)**:
  - `#cartItemsContainer` untuk merender daftar kartu multi-item
  - Stepper jumlah porsi (- / + / direct input / quick chips +10, +25, +50) per item
  - Tombol kustomisasi lauk per menu di dalam keranjang
  - Tombol hapus (trash) per item
  - Badge porsi satuan/eceran per item
  - Filter katalog dan tombol katalog menunjukkan jumlah porsi yang sudah ada di keranjang
- **Integrasi Checkout & KDS (`js/app.js`, `js/storage.js`)**:
  - Modal pembayaran merangkum seluruh menu dan total porsi
  - Persistensi order menyimpan array `items` lengkap ke `AishStorage`
  - Tiket dapur (KDS) memuat seluruh daftar paket dan rincian lauk masing-masing
- **Cetak Nota & WhatsApp (`js/app.js`)**:
  - Tabel rincian nota invoice merender seluruh baris menu beserta subtotalnya
  - Perbaikan bug "Lihat Nota": membuka nota riwayat invoice membaca data asli invoice tersebut, bukan data keranjang aktif
  - Rincian pesan WhatsApp merinci seluruh menu yang dipesan

### Commits:
- `84dbf2f` feat(cart): add AishCart engine and unit tests
- `3e98204` feat(ui): implement multi-item cart right-rail UI and catalog integration
- `024b0d5` feat(checkout): support multi-item persistence and KDS ticket generation
- `760d295` feat(invoice): render multi-item invoice slips and fix historical invoice preview

---

## Status Keseluruhan

| Modul | Status | Tests |
|---|---|---|
| Auth (Login, Staf) | ✅ Selesai | 4 pass |
| Storage (Persistensi, KDS, Backup) | ✅ Selesai | 5 pass |
| UI Toast Notification | ✅ Selesai | 5 pass |
| Multi-Item Cart & Invoice | ✅ Selesai | 5 pass |
| **Total** | **✅ Semua Selesai** | **19/19 pass** |

Build executable: `dist\Aish Catering POS-win32-x64` ✅

