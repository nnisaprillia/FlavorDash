# Phase 4: Final Review FlavorDash

## Tujuan Fase 4

Fase 4 adalah finalisasi terakhir untuk memastikan aplikasi siap dipresentasikan:

- validasi kode dengan linting
- dokumentasi ringkas untuk run dan review
- memastikan semua fitur autentikasi dan layout bekerja

## Hasil Fase 4

- `npm run lint` dijalankan sebagai verifikasi kode, tanpa error.
- `phase4.md` dibuat sebagai ringkasan final.
- `app/detail.js` sudah mendukung route protection dan logout.
- `app/login.js` sudah menyimpan token di `AsyncStorage` dan redirect saat token valid.
- `app/index.js` menampilkan katalog makanan responsif dengan `ScrollView` dan kartu modern.

## Instruksi Menjalankan Aplikasi

1. Pastikan dependency terpasang:
   - `npm install`
2. Jalankan Expo:
   - `npm run start`
3. Buka aplikasi di emulator atau perangkat fisik.
4. Akses `Login`, masukkan username/password, lalu lihat `FlavorDash`.
5. Pilih menu makanan untuk membuka `detail.js`.
6. Tekan `Logout` untuk menghapus token dan kembali ke `Login`.

## Catatan Final

- Kode menggunakan JavaScript murni tanpa TypeScript.
- Struktur `app/` sesuai dengan permintaan UTS.
- `FoodCard.js` memanfaatkan Flexbox agar layout gambar-teks responsif.
- `auth.js` memberikan konsep JWT sederhana untuk pendidikan.
