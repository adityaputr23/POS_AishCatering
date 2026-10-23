# Penyimpanan Permanen Transaksi & Otomatisasi KDS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengimplementasikan mesin penyimpanan permanen offline untuk riwayat transaksi invoice, jadwal acara, dan antrean dapur KDS, serta otomatisasi pembuatan tiket dapur saat kasir menyelesaikan pesanan.

**Architecture:** Modul penyimpanan `js/storage.js` membungkus penyimpanan `localStorage` untuk `eventsData` dan `kitchenOrders`, diintegrasikan ke alur transaksi kasir (`confirmPayment`) dan operasional dapur (`advanceKds`) di `js/app.js`, serta menyediakan antarmuka ekspor cadangan file JSON di panel Admin.

**Tech Stack:** Vanilla JavaScript (ES6+), HTML5, CSS3, Node.js native test runner (`node --test`).

**Spec:** `docs/superpowers/specs/2026-10-23-pos-transactions-persistence-design.md`

## Global Constraints
- Seluruh data transaksi dan antrean dapur harus tersimpan persisten secara offline.
- Jika data kosong pada pertama kali buka, isi dengan data awal bawaan agar tampilan tidak kosong.
- Tiket dapur KDS harus otomatis terbuat saat kasir menyimpan pesanan & memproses DP/pembayaran.
- Format cadangan ekspor berupa file JSON terstruktur yang dapat diunduh langsung.

## Review Focus
1. Transaksi baru disimpan: Nilai total, DP, sisa, dan tanggal acara tersimpan utuh dan tetap ada setelah halaman direfresh.
2. Otomatisasi tiket KDS: Pembuatan tiket dapur otomatis menghasilkan ID unik (`KDS-xxx`), komposisi lauk lengkap, dan waktu pengiriman sesuai data invoice.
3. Transaksi pelunasan: Membayar sisa pelunasan pada invoice lama memperbarui status menjadi 'Lunas' tanpa membuat data duplikat.
4. Perubahan stage KDS: Memajukan status pesanan dapur (Antrean ➔ Masak ➔ Kirim) langsung tersimpan dan tidak kembali ke status awal saat reload.
5. Ekspor data backup: Menghasilkan string JSON yang valid dan mencakup riwayat transaksi, tiket dapur, dan staf aktif.

---

### Task 1: Storage Engine Module & Unit Tests

**Files:**
- Create: `js/storage.js`
- Test: `tests/storage.test.js`

**Interfaces:**
- Produces:
  - `AishStorage.init(): void`
  - `AishStorage.getEvents(): Array<object>`
  - `AishStorage.saveEvent(eventData): object`
  - `AishStorage.getKitchenOrders(): Array<object>`
  - `AishStorage.saveKitchenOrder(orderData): object`
  - `AishStorage.advanceKitchenOrderStage(orderId): object | null`
  - `AishStorage.createKitchenTicketFromOrder(event, cartItem): object`
  - `AishStorage.exportFullBackup(): object`
  - `AishStorage.resetToDefault(): void`

- [ ] **Step 1: Write failing test in `tests/storage.test.js`**

Create test file covering initial default seeding, saving events, updating payments, advancing KDS stages, auto-generating KDS tickets, and full export.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/storage.test.js`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement `js/storage.js`**

Implement `AishStorage` with robust localStorage wrapper, default dataset, validation, and auto-generation algorithms.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/storage.test.js`
Expected: PASS all test cases.

- [ ] **Step 5: Commit**

```bash
git add js/storage.js tests/storage.test.js
git commit -m "feat(storage): implement offline storage engine and KDS ticket generator"
```

---

### Task 2: Integrate Storage Engine with POS Runtime & KDS Auto-Sync

**Files:**
- Modify: `index.html` (include `<script src="js/storage.js"></script>`)
- Modify: `js/app.js` (hubungkan `eventsData` & `kitchenOrders` ke `AishStorage`, update `confirmPayment`, `advanceKds`, dan `loadEventToCart`)

**Interfaces:**
- Consumes: `AishStorage.init()`, `AishStorage.getEvents()`, `AishStorage.saveEvent()`, `AishStorage.getKitchenOrders()`, `AishStorage.advanceKitchenOrderStage()`, `AishStorage.createKitchenTicketFromOrder()`

- [ ] **Step 1: Add `js/storage.js` script tag in `index.html`**

Tambahkan `<script src="js/storage.js"></script>` sebelum `js/app.js`.

- [ ] **Step 2: Connect Storage in `js/app.js` Initialization**

Gantikan inisialisasi array statis dengan pembacaan dari `AishStorage.getEvents()` dan `AishStorage.getKitchenOrders()`.

- [ ] **Step 3: Update `confirmPayment()` with Persistence and KDS Auto-Creation**

Simpan invoice ke `AishStorage.saveEvent()`, panggil `AishStorage.createKitchenTicketFromOrder(newEvent, state.cartItem)`, dan sinkronkan tampilan KDS serta tabel event.

- [ ] **Step 4: Update `advanceKds()` to Persist Stage Changes**

Gunakan `AishStorage.advanceKitchenOrderStage(orderId)` sehingga perubahan status dapur langsung tersimpan secara permanen.

- [ ] **Step 5: Run tests and commit**

```bash
git add index.html js/app.js
git commit -m "feat(pos): wire storage engine to payment flow and KDS auto-sync"
```

---

### Task 3: Backup Export & Reset Data UI in Admin View

**Files:**
- Modify: `index.html` (tambahkan panel "Cadangan & Pemulihan Data" di `#view-staff`)
- Modify: `css/style.css` (styling card backup, tombol download JSON)
- Modify: `js/app.js` (implementasi `AishPOS.exportBackupData()` dan `AishPOS.resetDemoData()`)

**Interfaces:**
- Consumes: `AishStorage.exportFullBackup()`, `AishStorage.resetToDefault()`

- [ ] **Step 1: Add Backup UI Section in `index.html`**

Tambahkan card "Cadangan Data & Arsip" di dalam `#view-staff` dengan tombol unduh file JSON dan tombol reset demo data.

- [ ] **Step 2: Add CSS Styling for Backup Section in `css/style.css`**

Tambahkan styling card arsip, badge info, dan tombol export bergradasi biru-indigo.

- [ ] **Step 3: Implement `exportBackupData()` and `resetDemoData()` in `js/app.js`**

Implementasikan trigger download file blob `.json` di browser dengan nama file ber-timestamp: `backup-aish-pos-YYYY-MM-DD.json`.

- [ ] **Step 4: Run complete test suite and package validation**

Jalankan `node --test tests/storage.test.js tests/auth.test.js` dan verifikasi `npm run build:exe`.

- [ ] **Step 5: Final Commit**

```bash
git add index.html css/style.css js/app.js
git commit -m "feat(backup): add JSON backup export and data reset controls"
```
