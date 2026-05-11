# Phase 3: Finalisasi FlavorDash

## Tujuan Fase 3

Menyelesaikan aplikasi `FlavorDash` agar siap sebagai materi UTS Mobile Programming:

- fitur login/logout
- proteksi halaman detail
- dokumentasi konsep JWT dan Flexbox
- kode rapi dan mudah dipahami

## Yang Ditambahkan di Fase 3

1. Logout di halaman `detail.js` untuk membersihkan token di `AsyncStorage`.
2. Dokumentasi `phase3.md` sebagai ringkasan akhir.
3. Penjelasan tambahan di `blueprint.md` untuk fase 3.
4. Pastikan page `detail` hanya dapat diakses jika token valid.

## Ringkasan Akhir

- `app/index.js`: katalog makanan modern dengan `ScrollView` dan `FoodCard`.
- `app/login.js`: login sederhana dengan token JWT dummy.
- `app/detail.js`: halaman protected, memeriksa token dan menyediakan logout.
- `app/middleware/auth.js`: helper konsep JWT dan validasi token.
- `AsyncStorage`: menyimpan token secara persisten.

## Catatan untuk Mahasiswa

- `detail.js` menggunakan `useEffect()` untuk memeriksa token ketika file dimuat.
- `auth.js` menjelaskan konsep `Header`, `Payload`, `Signature` tetapi tidak digunakan untuk otentikasi backend nyata.
- `logout` menunjukkan bagaimana aplikasi menghapus token saat pengguna keluar.
- `Flexbox` di `FoodCard.js` membuat tata letak gambar dan teks sejajar secara responsif.

## Penutup

Aplikasi ini sudah siap dijalankan dengan `expo start` dan memberi contoh praktis penggunaan expo-router, AsyncStorage, dan konsep JWT untuk UTS.
