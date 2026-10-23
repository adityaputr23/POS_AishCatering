# Design Spesifikasi: Penyimpanan Permanen Transaksi & Otomatisasi Antrean Dapur POS Aish Catering

- **Tanggal**: 23 Oktober 2026
- **Status**: Menunggu Persetujuan
- **Topik**: Persistensi Data Transaksi, Jadwal Acara, dan Antrean KDS Offline

---

## 1. Latar Belakang & Tujuan (Why & Intent)
Sebelumnya, data transaksi invoice (`eventsData`) dan antrean dapur (`kitchenOrders`) hanya tersimpan dalam memori runtime JavaScript. Jika aplikasi kasir ditutup, listrik mati, atau perangkat di-restart, seluruh transaksi baru yang dibuat pada hari itu akan hilang dan kembali ke data dummy awal.

Tujuan dari fitur ini adalah:
1. Menyimpan setiap transaksi pembayaran, invoice, dan jadwal acara catering secara otomatis dan permanen ke penyimpanan lokal offline (`localStorage`).
2. Menyimpan setiap perubahan tahapan antrean dapur di Kitchen Display System (KDS) secara permanen.
3. Mengotomatiskan pembuatan tiket dapur KDS saat kasir menyelesaikan transaksi pembayaran / DP.
4. Menyediakan fitur Export Backup Data (.json) dan Import/Restore Data untuk pemilik catering.

---

## 2. Sasaran (Goals), Batasan (Non-Goals & Anti-Goals)
### Goals:
- **Penyimpanan Permanen Offline**:
  - `aish_pos_events_history`: menyimpan seluruh invoice dan pesanan acara.
  - `aish_pos_kitchen_orders`: menyimpan seluruh tiket produksi dapur.
- **Inisialisasi Cerdas**: Jika penyimpanan masih kosong pada peluncuran pertama, sistem mengisi dengan data bawaan default agar kasir tetap memiliki referensi riwayat.
- **Sinkronisasi Otomatis Kasir ➔ Dapur**: Saat kasir menekan *"Proses Pembayaran & Cetak"*, selain mencatat invoice, sistem secara otomatis menerbitkan tiket antrean dapur baru dengan status `antrean` (Antrean Produksi) dan daftar lauk lengkap.
- **Penyimpanan Perubahan Status Dapur**: Saat staf dapur menekan tombol geser status (*Antrean ➔ Dimasak ➔ Siap Kirim*), perubahan langsung tersimpan permanen.
- **Fitur Backup & Restore Data**: Tombol di halaman Admin / sidebar untuk:
  - *"Ekspor Cadangan Data (.json)"*: Mengunduh snapshot seluruh data kasir, invoice, dan staf.
  - *"Pulihkan / Reset Data Bawaan"*: Mengembalikan ke data demo awal jika diperlukan.

### Non-Goals:
- Sinkronisasi server database cloud online (tetap mengusung filosofi 100% offline-first kasir lokal).
- Penyimpanan multi-cabang terdistribusi (fokus pada operasional dapur tunggal cabang Jakarta Selatan).

### Anti-Goals:
- Menghambat kecepatan transaksi kasir dengan proses write yang berat.

---

## 3. Pendekatan yang Dipertimbangkan (Approaches)
1. **Pendekatan A (Dipilih)**: LocalStorage Storage Engine + Auto-Sync KDS + Backup JSON.
   - *Alasan Dipilih*: Instan, bebas dari risiko deadlock/file-locking di Windows, terintegrasi mulus dengan arsitektur saat ini, dan menyediakan file fisik melalui fitur download backup JSON.
2. **Pendekatan B (Ditolak)**: Database file fisik lokal via IPC Electron.
   - *Alasan Ditolak*: Memerlukan preload IPC bridge tambahan dan penanganan asinkron file-locking yang rawan korup saat aplikasi ditutup mendadak.

---

## 4. Alur Kerja (Workflow)
1. **Saat Aplikasi Dibuka (`AishPOS.init`)**:
   - `loadEvents()` memuat transaksi dari storage. Jika tidak ada, simpan data awal.
   - `loadKitchenOrders()` memuat tiket dapur dari storage. Jika tidak ada, simpan data awal.
2. **Saat Kasir Memproses Pembayaran (`confirmPayment`)**:
   - Invoice baru ditambahkan ke `eventsData` dan disimpan permanen via `saveEvents()`.
   - Tiket dapur baru (`KDS-xxx`) otomatis dibuat dari menu & lauk yang dipesan, dimasukkan ke `kitchenOrders`, dan disimpan permanen via `saveKitchenOrders()`.
   - Notifikasi sukses muncul, antrean KDS otomatis bertambah.
3. **Saat Dapur Mengubah Status (`advanceKds`)**:
   - Status tiket diperbarui (Antrean ➔ Masak ➔ Kirim) dan disimpan permanen via `saveKitchenOrders()`.
4. **Saat Admin Mengekspor Data**:
   - Sistem membungkus seluruh data (events, kitchen, staff) menjadi file `backup-aish-pos-[tanggal].json` dan mengunduhnya ke komputer.

---

## 5. Yang Dikerjakan Builder (Checklist)
- [ ] Membuat modul penyimpanan `js/storage.js` untuk mengelola load, save, backup, dan restore `eventsData` & `kitchenOrders`.
- [ ] Menghubungkan `js/storage.js` ke `js/app.js` di `init()`, `confirmPayment()`, dan `advanceKds()`.
- [ ] Menambahkan otomatisasi pembuatan tiket KDS saat invoice baru diselesaikan.
- [ ] Menambahkan tombol "Ekspor Cadangan Data (.JSON)" di tab Kelola Staf / Admin.
- [ ] Menulis unit test untuk memverifikasi persistensi dan otomatisasi tiket KDS di `tests/storage.test.js`.
- [ ] Menjalankan verifikasi pengujian dan build executable.
