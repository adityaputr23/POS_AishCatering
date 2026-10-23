# Design Spesifikasi: Fitur Login & Registrasi Staf Internal POS Aish Catering

- **Tanggal**: 23 Oktober 2026
- **Status**: Menunggu Persetujuan
- **Topik**: Autentikasi Pengguna & Manajemen Staf Operasional Internal

---

## 1. Latar Belakang & Tujuan (Why & Intent)
Aplikasi POS Aish Catering sebelumnya tidak memiliki lapisan autentikasi, sehingga sesi pengguna selalu menggunakan data statis (*Kasir Ratna*) dan siapapun dapat mengakses semua data kasir secara langsung tanpa perlindungan peran.

Tujuan dari fitur ini adalah:
1. Mengamankan akses aplikasi desktop POS agar hanya staf operasional yang terautentikasi yang dapat masuk.
2. Memastikan identitas kasir/staf yang bertransaksi tercatat akurat di header, struk invoice, dan slip dapur.
3. Memberikan kendali penuh kepada **Admin** untuk meregistrasi akun staf baru sesuai peran masing-masing.

---

## 2. Sasaran (Goals), Batasan (Non-Goals & Anti-Goals)
### Goals:
- **Layar Login Awal**: Menampilkan overlay login yang elegan dan responsif saat aplikasi dibuka jika belum ada sesi aktif.
- **Akun Bawaan (Default)**: Menyediakan akun inisial siap pakai saat pertama kali dijalankan:
  - Admin: `admin` (Password: `admin123`)
  - Kasir: `kasir` (Password: `123456`)
- **Registrasi Staf Khusus Admin**: Form pendaftaran staf baru (Nama, Username, Role, Password/PIN) yang hanya dapat diakses oleh akun Admin.
- **Dukungan Peran (Roles)**:
  - `Admin`: Akses penuh (Kasir POS, Jadwal, Katalog, Invoice, Dapur KDS, dan Kelola Staf).
  - `Kasir`: Akses POS, Jadwal Acara, Katalog, Invoice, dan Cetak.
  - `Dapur`: Akses khusus Kitchen Display System (KDS) dan Jadwal Acara.
- **Sinkronisasi Sesi Aktif**:
  - Header otomatis menampilkan nama staf, role, dan inisial avatar.
  - Struk cetak dan slip dapur mencantumkan nama staf yang sedang login.
- **Fitur Logout / Ganti Shift**: Menu dropdown/tombol logout untuk mengunci kembali layar kasir.
- **Persistensi Offline**: Data akun staf dan status sesi tersimpan di `LocalStorage` sehingga aman dan tidak hilang saat aplikasi ditutup.

### Non-Goals:
- Registrasi mandiri publik di layar depan (ditiadakan demi keamanan internal catering sesuai arahan).
- Integrasi server cloud atau sinkronisasi database online (aplikasi tetap 100% offline-first).
- Sistem recovery via email/SMS (reset password dilakukan secara internal oleh Admin).

### Anti-Goals:
- Memperlambat alur kerja kasir (login harus cepat, mendukung PIN/password sederhana).
- Merusak tata letak 3-pane antarmuka Aish Catering yang sudah ada.

---

## 3. Pendekatan yang Dipertimbangkan (Approaches)
1. **Opsi 1 (Dipilih)**: Overlay Login Responsif + Manajemen Staf Terpadu berbasis LocalStorage.
   - *Alasan Dipilih*: Berjalan 100% offline, tidak memerlukan dependensi server eksternal, sangat cepat untuk kasir, dan tidak mengubah arsitektur Electron yang ada.
2. **Opsi 2 (Ditolak)**: Penyimpanan file fisik `users.json` via IPC Electron.
   - *Alasan Ditolak*: Menambah kompleksitas bridge IPC dan rawan konflik file I/O tanpa memberi nilai tambah pada antarmuka.

---

## 4. Rincian Antarmuka & Alur Kerja (Workflow)
1. **Alur Masuk (Login)**:
   - Saat aplikasi diluncurkan, jika belum ada sesi aktif di penyimpanan, layar kerja terkunci di balik `Login Modal Overlay`.
   - Staf memasukkan Username dan Password/PIN.
   - Jika valid: sesi disimpan, layar login ditutup, header diperbarui dengan identitas staf, dan menu disesuaikan dengan role.
   - Jika salah: muncul notifikasi error (*toast*) berwarna merah.
2. **Alur Manajemen Staf (Registrasi Staf Baru)**:
   - Ditambahkan tab menu baru di sidebar: **Kelola Staf** (ikon ID Card/Pengguna). Menu ini hanya terlihat dan bisa dibuka oleh Admin.
   - Halaman Kelola Staf berisi:
     - Form Registrasi Staf Baru (Nama Lengkap, Username, Peran, Password).
     - Tabel Daftar Staf Aktif dengan opsi edit/hapus staf.
3. **Alur Logout**:
   - Klik pada avatar profil di pojok kanan atas menampilkan menu opsi profil & tombol *"Logout / Ganti Shift"*.
   - Saat diklik: sesi dihapus dari memori, dan layar overlay login kembali muncul mengunci aplikasi.

---

## 5. Yang Dikerjakan Builder (Implementation Checklist)
- [ ] Menambahkan komponen HTML Modal Login di `index.html`.
- [ ] Menambahkan tab dan view "Kelola Staf" di `index.html` (khusus Admin).
- [ ] Menambahkan styling CSS modern di `css/style.css` (Glassmorphism, Card Login mewah khas Aish Catering).
- [ ] Menambahkan modul manajemen autentikasi & staf di `js/app.js`:
  - Default user seeding (`admin` dan `kasir`).
  - Fungsi `login()`, `logout()`, `registerStaff()`, `deleteStaff()`.
  - Integrasi nama staf aktif ke cetakan struk dan slip dapur.
- [ ] Pengujian fungsionalitas (Login Admin, Registrasi Kasir baru, Login Kasir baru, Verifikasi pembatasan menu, Logout).
