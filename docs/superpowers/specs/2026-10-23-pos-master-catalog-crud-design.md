# Design Spec: Master Katalog & Manajemen Menu (CRUD)

## 1. Problem Statement
Daftar paket dan menu katering saat ini masih berstatus statis (*hardcoded*) di dalam file `js/app.js`. Tab navigasi *"Katalog Menu"* (`#view-catalog`) masih berupa kontainer kosong tanpa data yang dirender. Pemilik katering atau administrator tidak memiliki antarmuka untuk menambah paket baru, memperbarui harga jual saat harga bahan baku naik, mengedit komposisi lauk, atau menonaktifkan menu yang bahan bakunya sedang habis (*out of stock*).

## 2. Requirements & Desired Behavior
1. **Penyimpanan Persisten Katalog (`AishStorage`)**:
   - Menambahkan kunci `aish_catalog_v1` di `js/storage.js`.
   - Melakukan *default seeding* dari 6 menu bawaan saat storage pertama kali diinisialisasi.
   - Menyediakan API: `getCatalog()`, `saveCatalogItem(item)`, `deleteCatalogItem(itemId)`, `toggleCatalogAvailability(itemId)`.
   - Memasukkan data katalog ke dalam fitur export/import backup JSON dan reset demo data.
2. **Halaman Master Katalog Aktif (`#view-catalog`)**:
   - Merender tabel manajemen master menu yang lengkap:
     - Foto & Nama Paket
     - Kategori (Prasmanan, Nasi Kotak, Tumpeng, Snack Box, Gubukan)
     - Harga Satuan & Unit (`/pax`, `/set`, `/ekor`, `/box`)
     - Minimal Order (Min. Pax)
     - Komposisi Lauk & Sajian
     - Status Ketersediaan (Pill hijau *Tersedia*, abu-abu *Habis*)
     - Tombol Aksi: *Edit*, *Toggle Status*, dan *Hapus*.
   - Filter Kategori & Bar Pencarian Cepat di Master Katalog.
   - Tombol "+ Tambah Menu Baru" (khusus Admin).
3. **Modal Tambah & Edit Menu**:
   - Form modal interaktif untuk menambah atau mengubah data menu:
     - Nama Menu
     - Kategori
     - Harga (Rp)
     - Satuan (`/pax`, `/set`, `/ekor`, `/box`)
     - Min. Pax
     - Lauk Default (input teks dipisah koma)
     - Catatan / Fasilitas Gratis (*Free Complementary*)
     - Deskripsi Menu
4. **Sinkronisasi Otomatis ke Kasir POS**:
   - Setiap kali menu ditambah, diedit, atau dinonaktifkan:
     - Menu yang berstatus *Habis* (`isAvailable: false`) dinonaktifkan di kasir POS dengan badge *Stok Habis* dan tombol disabled.
     - Perubahan harga otomatis memperbarui kalkulasi di POS.
5. **Hak Akses Keamanan (Role-Based Guard)**:
   - Kasir biasa hanya dapat melihat daftar Master Katalog.
   - Tombol Tambah, Edit, Hapus, dan Toggle Status hanya aktif/dapat dijalankan oleh pengguna dengan `role === 'admin'`.

## 3. Compatibility & Testing
- Memperluas unit test di `tests/storage.test.js` untuk menguji operasi `getCatalog()`, `saveCatalogItem()`, `deleteCatalogItem()`, dan `toggleCatalogAvailability()`.
- Menjaga 100% kompatibilitas dengan modul `AishCart` dan transaksi yang sudah berjalan.
