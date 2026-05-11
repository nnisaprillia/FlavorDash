# Phase 2: Konsep dan Penjelasan JWT untuk FlavorDash

## Flexbox Singkat

Flexbox adalah sistem tata letak modern untuk membuat layout responsif di React Native. Dengan Flexbox, elemen dapat diatur secara horizontal atau vertikal, menyesuaikan ruang yang tersedia.

Dalam `FlavorDash`, komponen `FoodCard` menggunakan:

- `flexDirection: 'row'` untuk meletakkan gambar di kiri dan deskripsi di kanan.
- `flex: 1` pada info teks agar deskripsi mengisi ruang tersedia.
- `alignItems: 'center'` agar elemen berada sejajar secara vertikal.

## Stateless Authentication JWT

Stateless authentication menyimpan status login di token, bukan di server. Token dikirim bersama permintaan dan divalidasi setiap kali.

Pada aplikasi ini:

- Token dibuat secara dummy dengan `createJwtToken()`.
- Token disimpan di `AsyncStorage`.
- `detail.js` memeriksa token dan `validateToken()` sebelum menampilkan halaman.

## Stateful vs Stateless

### Stateful

- Server menyimpan informasi sesi (session) di memory atau database.
- Logout dapat dilakukan dengan menghapus sesi di server.
- Kurang scalable bila banyak server tanpa shared session storage.

### Stateless

- Server tidak menyimpan informasi sesi pengguna.
- Otentikasi dibuat dengan token yang valid.
- Lebih scalable tapi kontrol logout/revokasi token lebih sulit.

## Anatomi JWT

JWT memiliki tiga bagian terpisah yang dipisahkan oleh titik:

1. `Header`
   - Menyimpan metadata token.
   - Contoh: algoritma `HS256` dan tipe `JWT`.
2. `Payload`
   - Menyimpan data pengguna dan klaim.
   - Contoh: `username`, `role`, `exp` (expiry).
3. `Signature`
   - Memastikan token tidak dimanipulasi.
   - Dibuat dari header + payload + secret.

## Cara Aplikasi ini Menggunakan JWT Concept

- `auth.js` membuat token dummy dengan `Header.Payload.Signature`.
- `login.js` menyimpan token ke `AsyncStorage`.
- `detail.js` memeriksa token dan memaksa redirect ke `login` jika token tidak ada atau kedaluwarsa.
- `App` tetap menggunakan React Native + Expo Router dan JavaScript.

## Tujuan untuk Mahasiswa

- Memahami struktur proyek `app/` di Expo Router.
- Melihat bagaimana `AsyncStorage` digunakan untuk menyimpan token.
- Belajar konsep dasar `JWT` tanpa backend yang kompleks.
- Memahami perbedaan stateful dan stateless authentication.
