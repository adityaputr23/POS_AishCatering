# Aturan Otomatis Pembersihan File Superpowers

## Cleanup Otomatis Setelah Plan Selesai

Setelah **setiap plan superpowers selesai** (semua tasks dalam plan sudah complete), saya **wajib** melakukan langkah-langkah berikut secara otomatis tanpa menunggu instruksi dari user:

### Langkah Wajib Setelah Plan Selesai:

1. **Arsipkan ke `docs/CHANGELOG.md`** — Tambahkan entri baru yang merangkum:
   - Nama sprint / fitur
   - File-file yang dibuat atau dimodifikasi
   - Apa yang dibangun (deskripsi singkat per task)
   - Hasil test (jumlah pass)
   - Daftar commit yang relevan
   
   Jika `docs/CHANGELOG.md` belum ada, buat file tersebut.
   Jika sudah ada, **append** entri baru di bagian bawah (jangan overwrite).

2. **Hapus folder progress ledger** — `rm -rf .superpowers/sdd/<nama-plan>/`

3. **Hapus file plan** — `rm docs/superpowers/plans/<nama-plan>.md`

4. **Hapus file spec** (jika ada) — `rm docs/superpowers/specs/<nama-plan>-design.md`

5. **Jika folder `docs/superpowers/` sudah kosong**, hapus juga folder tersebut.

6. **Jika folder `.superpowers/sdd/` sudah kosong**, hapus juga folder tersebut (beserta `.superpowers/` jika memang kosong).

7. **Commit semua perubahan** dengan pesan:
   ```
   chore: cleanup superpowers tracking files, archive to docs/CHANGELOG.md
   ```

### Kapan Cleanup Dijalankan:
- Segera setelah update progress ledger yang menandai task terakhir sebagai `complete`
- SEBELUM menyampaikan laporan selesai kepada user
- Berlaku untuk semua project yang menggunakan superpowers workflow

### Catatan Penting:
- Jangan hapus file project asli (source code, tests, config). Hanya hapus file internal superpowers.
- `docs/CHANGELOG.md` adalah file permanen milik project — jangan dihapus, hanya ditambahi.
- Jika `docs/` belum ada di project, buat direktori tersebut sebelum menulis CHANGELOG.
