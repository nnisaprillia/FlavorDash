# Blueprint Project FlavorDash

## Tujuan

Membuat aplikasi React Native Expo Router bernama **FlavorDash** dengan fitur katalog makanan dan autentikasi sederhana menggunakan konsep JWT.

## Teknologi Utama

- React Native
- Expo Router
- JavaScript (.js)
- AsyncStorage
- Flexbox

## Fase 1

## Struktur Folder

```
app/
├── _layout.js
├── index.js
├── login.js
├── detail.js
├── components/
│   └── FoodCard.js
└── middleware/
    └── auth.js
```

## Fitur Utama

1. Halaman utama katalog makanan dengan scrollable list.
2. Setidaknya 3 makanan: Burger, Pizza, Sushi.
3. Tata letak horizontal dengan `flexDirection: 'row'`.
4. Desain modern dengan kartu, `borderRadius`, `shadow`/`elevation`, `padding`, dan `margin`.
5. Komponen terpisah `FoodCard.js` untuk setiap item menu.
6. Autentikasi sederhana dengan konsep JWT.
7. Simpan token login di `AsyncStorage`.
8. Middleware `auth.js` untuk validasi token.
9. Proteksi route `detail.js` menggunakan pemeriksaan token.
10. Redirect ke halaman `login` jika token tidak ada.

## Halaman & Tujuan

- `app/_layout.js`: Layout utama Expo Router.
- `app/index.js`: Halaman katalog utama dengan `ScrollView`.
- `app/login.js`: Halaman login sederhana.
- `app/detail.js`: Halaman detail protected.
- `app/components/FoodCard.js`: Komponen presentasi kartu makanan.
- `app/middleware/auth.js`: Contoh middleware validasi token.

## Fase 2

## Konsep JWT dan Autentikasi

- **JWT (JSON Web Token)** adalah format token yang dapat disimpan di klien dan dikirim pada setiap permintaan untuk otentikasi.
- Token terdiri dari 3 bagian: `Header`, `Payload`, dan `Signature`.
- `Header` berisi informasi algoritma dan jenis token.
- `Payload` berisi data pengguna, peran, dan waktu kadaluarsa.
- `Signature` memastikan token tidak diubah.

### Stateless Authentication JWT

- Pendekatan stateless tidak menyimpan sesi di server.
- Server cukup memeriksa token setiap kali permintaan datang.
- Jika token valid, server menerima permintaan tanpa lookup session server-side.
- Aplikasi ini meniru konsep tersebut dengan menyimpan token di `AsyncStorage` dan mengecek validitasnya di klien.

### Stateful vs Stateless

- **Stateful**: server menyimpan data sesi pengguna di memori atau database.
  - Kelebihan: kontrol sesi lebih mudah, dapat menghapus sesi secara server-side.
  - Kekurangan: butuh penyimpanan session, tidak cocok untuk skala besar tanpa shared store.
- **Stateless**: server tidak menyimpan sesi.
  - Kelebihan: skalabilitas lebih baik, tidak perlu shared session store.
  - Kekurangan: kontrol logout dan revokasi token lebih sulit.

### Anatomi JWT

- `Header`: berisi `alg` (algoritma) dan `typ` (tipe token, misal `JWT`).
- `Payload`: berisi klaim seperti `username`, `role`, dan `exp` (expiry).
- `Signature`: hasil signing dari header dan payload menggunakan kunci rahasia.

## Rencana Implementasi

1. Buat `app/_layout.js` sebagai entry point dengan `Stack` dari `expo-router`.
2. Buat `FoodCard.js` untuk menampilkan gambar, judul, dan deskripsi.
3. Buat `index.js` dengan `ScrollView`, daftar `FoodCard`, dan desain responsif.
4. Buat `login.js` dengan form sederhana dan tombol login.
5. Simulasikan proses login menghasilkan token JWT dummy.
6. Simpan dan baca token menggunakan `AsyncStorage`.
7. Buat `auth.js` sebagai middleware untuk memeriksa token.
8. Buat `detail.js` yang memeriksa token dari `AsyncStorage` di `useEffect`.
9. Tambahkan komentar penjelasan di setiap bagian kode.

## Fase 3

## Penjelasan Tambahan untuk Mahasiswa

- Apa itu Flexbox dan bagaimana memengaruhi tata letak.
- Apa itu JWT dan anatominya: Header, Payload, Signature.
- Perbedaan stateful vs stateless authentication.
- Bagaimana `AsyncStorage` menyimpan token secara persisten di klien.
- Bagaimana halaman protected menggunakan `useEffect` untuk redirect.

## Rencana Fase 3

1. Tambahkan fitur logout di halaman `detail.js` untuk menghapus token.
2. Buat dokumentasi ringkas di `phase3.md` untuk materi UTS.
3. Periksa kembali komentar setiap file agar kode mudah dipahami.
4. Pastikan aplikasi bisa berjalan dengan Expo tanpa TypeScript.
5. Tambahkan `phase3.md` sebagai referensi akhir.

## Fase 4

### Tujuan Fase 4

- Final review kode dan dokumentasi.
- Verifikasi linter untuk memastikan tidak ada error.
- Tambahkan ringkasan akhir dan instruksi menjalankan aplikasi.
- Siapkan hasil akhir untuk presentasi UTS.

### Daftar Tugas Fase 4

1. Jalankan `npm run lint` untuk memeriksa kualitas kode.
2. Buat `phase4.md` sebagai ringkasan final dan panduan run.
3. Pastikan semua halaman `app/` jelas dan rapi.
4. Verifikasi proteksi route `detail.js` dan logout token.

## Kesiapan Expo

- Semua file akan menggunakan JavaScript biasa.
- Tidak ada TypeScript.
- Kode dirancang agar dapat dijalankan dalam proyek Expo.
- Gunakan `expo-router` untuk navigasi dan proteksi halaman.

## Catatan

- `middleware/auth.js` akan menunjukkan konsep validasi token, meski middleware Expo Router belum selalu menjalankan logika server-side pada Expo managed workflow.
- Proteksi halaman `detail.js` diimplementasikan dengan pengecekan token di `useEffect`.
- Komentar akan ditambahkan di setiap file dan blok kode untuk kejelasan.

## Fase 5

## Arsitektur Proteksi Route JWT

### Alur Authentication

1. User membuka aplikasi.
2. User masuk ke halaman `login.js`.
3. User memasukkan username dan password.
4. Sistem membuat JWT dummy setelah login berhasil.
5. Token disimpan ke `AsyncStorage`.
6. Saat user membuka `detail.js`, middleware `auth.js` dijalankan.
7. Middleware memeriksa apakah token tersedia.
8. Jika token valid:
   - User diizinkan mengakses halaman detail.
9. Jika token tidak ada:
   - User diarahkan kembali ke halaman login menggunakan `router.replace('/login')`.

---

## Simulasi Struktur JWT

JWT terdiri dari 3 bagian:

```text
HEADER.PAYLOAD.SIGNATURE
```

### 1. HEADER

- Menentukan tipe token: `JWT`
- Menentukan algoritma signature: misal `HS256`

Contoh header (encoded ke Base64):

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### 2. PAYLOAD

- Berisi klaim data pengguna seperti `username`, `role`, `exp` (expiry)
- Dalam aplikasi ini kita simulasikan dengan data sederhana:
  - `username`: nama user
  - `role`: `user`
  - `exp`: waktu kadaluarsa dalam format timestamp

Contoh payload:

```json
{
  "username": "student",
  "role": "user",
  "exp": 1710000000
}
```

### 3. SIGNATURE

- Mengamankan token agar tidak mudah diubah
- Dibuat dari header + payload + secret key
- Dalam implementasi dummy, signature hanya sebagai konsep

Contoh token akhir:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJ1c2VybmFtZSI6InN0dWRlbnQiLCJyb2xlIjoidXNlciIsImV4cCI6MTcxMDAwMDAwMH0
.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

## Implementasi Dummy JWT di FlavorDash

1. Pada `login.js`, ketika user klik tombol login, aplikasi membuat token JWT dummy.
2. Token dummy ini disimpan di `AsyncStorage` agar bisa persist saat aplikasi dibuka ulang.
3. Di `detail.js`, aplikasi memeriksa token di `AsyncStorage` sebelum menampilkan halaman detail.
4. Jika token tidak ditemukan atau tidak valid, user diarahkan ke `login.js`.
5. Di `detail.js` juga ada tombol logout yang menghapus token dan mengembalikan user ke `login`.

## Kenapa Dummy JWT?

- Tujuan utama adalah menjelaskan konsep otentikasi JWT.
- Tidak perlu backend nyata untuk presentasi UTS.
- Fokus pada alur `login -> simpan token -> cek token -> proteksi halaman`.

## Catatan Tambahan

- Pada aplikasi produksi, token harus divalidasi di server.
- `AsyncStorage` cocok untuk menyimpan token pada aplikasi React Native.
- Untuk demonstrasi UTS, konsep ini sudah cukup menggambarkan mekanisme JWT stateless.

## Fase 5: Integrasi API dan Fitur Tambahan

### Tujuan Fase 5

- Menambahkan integrasi API eksternal untuk data katalog makanan.
- Implementasi sistem fallback untuk keandalan aplikasi.
- Optimasi gambar dan error handling.
- Dokumentasi lengkap untuk presentasi UTS.

### Teknologi Tambahan

- Axios untuk HTTP requests
- MockAPI.io untuk data dummy
- Error handling dan loading states
- Image fallback system

### Fitur API Integration

1. **Koneksi API Eksternal**
   - Menggunakan MockAPI.io sebagai sumber data makanan
   - Endpoint: `https://6a01dc5836fb6ad04de1dc56.mockapi.io/foods`
   - Data format: JSON array dengan properti `name`, `price`, `description`, `image`

2. **Sistem Fallback**
   - Jika API gagal, otomatis gunakan data statis lokal
   - Data statis: Burger, Pizza, Sushi sebagai backup
   - Logging detail untuk debugging

3. **Optimasi Gambar**
   - Override gambar spesifik untuk item tertentu
   - Fallback gambar default jika URL rusak
   - Error handling pada komponen `Image`

4. **Error Handling**
   - Try-catch pada semua API calls
   - Loading indicator selama fetch data
   - Pesan error yang user-friendly

### Struktur Data API

```json
[
  {
    "id": "1",
    "name": "Burger Special",
    "price": "40.000",
    "description": "Burger juicy dengan daging premium dan keju leleh.",
    "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
  }
]
```

### Transformasi Data

1. **Validasi Data**: Pastikan response adalah array dan tidak kosong
2. **Override Gambar**: Untuk item spesifik gunakan gambar custom
3. **Fallback**: Jika gambar tidak valid, gunakan gambar default
4. **Format**: Pastikan semua properti ada dan dalam format yang benar

### Implementasi di Kode

#### app/index.js

```javascript
const fetchFoods = async () => {
  try {
    const response = await axios.get(API_URL);
    // Transform dan validasi data
    const transformedFoods = transformData(response.data);
    setFoods(transformedFoods);
  } catch (error) {
    console.log("API Error:", error.message);
    setFoods(staticFoodMenu); // Fallback
  } finally {
    setLoading(false);
  }
};
```

#### app/components/FoodCard.js

```javascript
const [imageUri, setImageUri] = useState(food.image);
const fallbackUri =
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80";

<Image
  source={{ uri: imageUri || fallbackUri }}
  onError={() => setImageUri(fallbackUri)}
/>;
```

### Keuntungan Integrasi API

1. **Data Dinamis**: Katalog makanan bisa diupdate tanpa rebuild app
2. **Skalabilitas**: Mudah menambah item makanan baru
3. **Real-world Experience**: Menunjukkan konsep API consumption
4. **Error Resilience**: Tetap berfungsi meski API down

### Testing API Integration

1. **Test Koneksi**: Verifikasi endpoint API dapat diakses
2. **Test Fallback**: Pastikan app berjalan dengan data statis jika API gagal
3. **Test Gambar**: Pastikan semua gambar tampil atau fallback ke default
4. **Test Loading**: Pastikan loading indicator muncul saat fetch data

### Dokumentasi untuk UTS

#### Penjelasan Konsep API

- **HTTP Requests**: Menggunakan Axios untuk komunikasi dengan server
- **Async/Await**: Menangani operasi asynchronous
- **Error Handling**: Try-catch untuk menangani kegagalan jaringan
- **Data Transformation**: Mengubah format data API ke format yang dibutuhkan app

#### Penjelasan Image Handling

- **URI Source**: React Native Image component menggunakan `source={{ uri: url }}`
- **Error Handling**: `onError` callback untuk fallback gambar
- **Loading States**: `ActivityIndicator` untuk UX yang baik

#### Penjelasan Network Concepts

- **REST API**: Representational State Transfer
- **HTTP Methods**: GET untuk mengambil data
- **JSON Format**: JavaScript Object Notation untuk data exchange
- **CORS**: Cross-Origin Resource Sharing (meski tidak relevan di mobile)

### Checklist Fase 5

- ✅ API endpoint terhubung ke MockAPI.io
- ✅ Sistem fallback data statis berfungsi
- ✅ Override gambar untuk item spesifik
- ✅ Error handling pada komponen Image
- ✅ Loading states diimplementasikan
- ✅ Dokumentasi lengkap untuk presentasi UTS
- ✅ Testing semua skenario edge case

### File yang Dimodifikasi

1. `app/index.js`: Tambah fetch API dan transform data
2. `app/components/FoodCard.js`: Tambah error handling gambar
3. `blueprint.md`: Dokumentasi fase 5

### Kesimpulan Fase 5

Fase 5 melengkapi aplikasi FlavorDash dengan fitur modern:

- **API Integration**: Menunjukkan konsep konsumsi API eksternal
- **Error Resilience**: Aplikasi tetap berjalan meski ada masalah
- **User Experience**: Loading states dan fallback yang smooth
- **Educational Value**: Materi lengkap untuk presentasi UTS

Aplikasi FlavorDash sekarang siap untuk presentasi dengan fitur lengkap dan dokumentasi komprehensif! 🚀
