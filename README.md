# Coffee Space Tracker

Aplikasi web sederhana untuk pencatatan dan dokumentasi kedai kopi (*coffee shop*) favorit, dilengkapi dengan galeri foto, rating, lokasi Google Maps, dan catatan menu. Dibuat menggunakan **PHP Native** dan **JavaScript (Fetch API)**.

## 📸 Tampilan Aplikasi
<img width="100%" alt="Preview Coffee Space" src="link_screenshot_kamu.png" />

*(Ganti `link_screenshot_kamu.png` dengan tautan foto/screenshot dari GitHub kamu nanti)*

## 🛠️ Teknologi yang Digunakan

- **Bahasa:** PHP (Native / PDO) & JavaScript (ES6 Fetch API)
- **Database:** MySQL
- **Server:** Apache (via XAMPP / Laragon)
- **Frontend:** HTML, CSS, Bootstrap 5, FontAwesome
- **Library Tambahan:** SweetAlert2 (Pop-up alert & galeri foto)

## 📂 Struktur File

- `index.php` - Halaman utama aplikasi (Dashboard & Form)
- `config/db.php` - Konfigurasi koneksi ke database MySQL
- `api/` - Endpoint backend API untuk operasi CRUD (`read.php`, `create.php`, `update.php`, `delete.php`)
- `js/script.js` - Logika interaksi frontend, galeri foto, & AJAX Fetch
- `css/style.css` - Styling khusus dan tata letak pencarian *sticky*
- `uploads/` - Folder penyimpanan berkas gambar/foto kafe
- `database.sql` - File database (Import file ini ke PHPMyAdmin)

## 🚀 Cara Instalasi & Menjalankan

1. **Clone atau Download** repository ini.
2. Pastikan kamu memiliki web server lokal (seperti **XAMPP** atau **Laragon**).
3. **Import Database:**
   - Buka PHPMyAdmin (`http://localhost/phpmyadmin/`).
   - Buat database baru bernama `coffee_space`.
   - Import file `database.sql` yang ada di dalam folder project ini.
4. **Konfigurasi Koneksi:**
   - Buka file `config/db.php`.
   - Sesuaikan nama database, username, dan password jika berbeda dengan settingan lokal kamu.
5. **Folder Uploads:**
   - Pastikan folder `uploads/` sudah tersedia di dalam proyek untuk menyimpan foto yang diunggah.
6. Buka browser dan akses `localhost/coffee_space` (atau sesuaikan dengan nama folder project kamu).

---

Dibuat oleh: **[Norhisma Zulfani Anggraheni]**