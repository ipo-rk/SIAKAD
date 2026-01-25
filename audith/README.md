# 📚 SIAKAD - Sistem Informasi Akademik SMP YPPGI Bomou

Aplikasi web untuk mengelola data akademik sekolah dengan dukungan 3 role berbeda: **Admin**, **Guru**, dan **Siswa**.

---

## 🚀 Quick Start

### **1. Jalankan Server Lokal**

```powershell
cd "path/to/Belajar-2"
npx http-server -p 8000
```

### **2. Buka di Browser**

- **Login Page:** `http://localhost:8000/login.html`
- **Admin:** `http://localhost:8000/admin.html` (setelah login)
- **Guru:** `http://localhost:8000/guru.html` (setelah login)
- **Siswa:** `http://localhost:8000/siswa.html` (setelah login)

### **3. Demo Akun**

| Role  | Username                           | Password   |
| ----- | ---------------------------------- | ---------- |
| Admin | `admin`                            | `admin123` |
| Admin | `admin2`                           | `pass123`  |
| Guru  | `guru01`                           | `guru123`  |
| Guru  | `guru02`                           | `guru123`  |
| Siswa | `siswa001`                         | `siswa123` |
| Siswa | `siswa002`                         | `siswa123` |
| Guru  | `guru01` atau `guru02`             | `123456`   |
| Siswa | `siswa001`, `siswa002`, `siswa003` | `123456`   |

---

## 🎯 Fitur Utama

### **Dashboard Admin**

- Summary, Jadwal, Grafik, Data Siswa/Guru/Kelas, Nilai, Absensi, Keuangan, Laporan

### **Dashboard Guru**

- Jadwal Mengajar, Input Nilai, Absensi Kelas, Rekap Nilai, Profil

### **Dashboard Siswa**

- Jadwal Pelajaran, Nilai, Absensi, Pembayaran SPP, Cetak Raport, Profil

---

## 📚 Dokumentasi

- **LOGIKA_APLIKASI.md** - Penjelasan detail logika aplikasi
- **LOGIN_SYSTEM.md** - Penjelasan sistem login & authentication

---

## 🔐 Sistem Login

- ✅ 3 role berbeda (Admin, Guru, Siswa)
- ✅ Validasi credential
- ✅ Session management dengan localStorage
- ✅ Role-based access control

---

## 💻 Tech Stack

- HTML5, CSS3, Tailwind CSS, Bootstrap 5
- Vanilla JavaScript
- Chart.js, Font Awesome
- localStorage API

---

## 🎮 Cara Menggunakan

1. Buka `login.html`
2. Pilih role dan masukkan credential (lihat tabel di atas)
3. Klik Login → Dashboard sesuai role terbuka

---

Selamat belajar! 🎉
