# Master Admin Dashboard - Panduan Lengkap

## Overview

Master Admin Dashboard adalah pusat kontrol penuh untuk mengelola seluruh data akademik SMP YPPGI Bomou. Admin dapat mengelola data Siswa, Guru, Kelas, dan Mata Pelajaran dengan operasi CRUD lengkap.

## Struktur Data

### 1. Data Siswa

**Table ID:** `tableSiswaBody`

| Field  | Tipe   | Deskripsi                           |
| ------ | ------ | ----------------------------------- |
| NIS    | String | Nomor Induk Siswa (Primary)         |
| Nama   | String | Nama lengkap siswa                  |
| Kelas  | String | Kelas yang diikuti (8A, 8B, 9A)     |
| Agama  | String | Agama siswa                         |
| Status | String | Status pembayaran (Lunas/Tunggakan) |

**Fungsi CRUD:**

- `renderSiswaTable()` - Tampilkan semua data siswa
- `addSiswa(e)` - Tambah siswa baru via form
- `editSiswa(i)` - Edit siswa (index ke-i) - _Mock implementation_
- `hapusSiswa(i)` - Hapus siswa (index ke-i)

**Mock Data:** 3 siswa (Andi, Budi, Citra)

---

### 2. Data Guru

**Table ID:** `tableGuruBody`

| Field          | Tipe   | Deskripsi                                |
| -------------- | ------ | ---------------------------------------- |
| NIP            | String | Nomor Induk Pegawai (Primary)            |
| Nama           | String | Nama lengkap guru                        |
| Mata Pelajaran | String | Mapel yang diampu                        |
| Status         | String | Status kepegawaian (PNS/Honorer/Kontrak) |
| Telepon        | String | Nomor telepon                            |
| Email          | String | Email guru                               |

**Fungsi CRUD:**

- `renderGuruTable()` - Tampilkan semua data guru
- `addGuru(e)` - Tambah guru baru via form
- `editGuru(i)` - Edit guru (index ke-i) - _Mock implementation_
- `hapusGuru(i)` - Hapus guru (index ke-i)

**Modal Form:** `#modalAddGuru` - Form dengan 6 field input

**Mock Data:** 3 guru (D. Wonda, M. Dogopia, A. Mote)

---

### 3. Data Kelas

**Table ID:** `tableKelasBody`

| Field        | Tipe   | Deskripsi                   |
| ------------ | ------ | --------------------------- |
| Kode         | String | Kode kelas (8A, 8B, 9A)     |
| Nama         | String | Nama lengkap kelas (VIII A) |
| Wali Kelas   | String | Nama guru wali kelas        |
| Jumlah Siswa | Number | Jumlah siswa di kelas       |
| Ruang        | String | Nomor ruang kelas           |

**Fungsi CRUD:**

- `renderKelasTable()` - Tampilkan semua data kelas
- `addKelas(e)` - Tambah kelas baru via form
- `editKelas(i)` - Edit kelas (index ke-i) - _Mock implementation_
- `hapusKelas(i)` - Hapus kelas (index ke-i)

**Modal Form:** `#modalAddKelas` - Form dengan 4 field input

**Mock Data:** 3 kelas (8A, 8B, 9A)

---

### 4. Data Mata Pelajaran (Mapel)

**Table ID:** `tableMapelBody`

| Field         | Tipe   | Deskripsi                    |
| ------------- | ------ | ---------------------------- |
| Kode Mapel    | String | Kode unik mata pelajaran     |
| Nama          | String | Nama mata pelajaran          |
| SKS           | Number | Satuan Kredit Semester (1-6) |
| Guru Pengajar | String | Nama guru pengajar           |

**Fungsi CRUD:**

- `renderMapelTable()` - Tampilkan semua data mapel
- `addMapel(e)` - Tambah mapel baru via form
- `editMapel(i)` - Edit mapel (index ke-i) - _Mock implementation_
- `hapusMapel(i)` - Hapus mapel (index ke-i)

**Modal Form:** `#modalAddMapel` - Form dengan 4 field input

**Mock Data:** 3 mapel (Matematika, IPA, Bahasa Indonesia)

---

## Workflow Operasional

### Menambah Data

1. Klik tombol **"Tambah [Tipe Data]"** (Siswa/Guru/Kelas/Mapel)
2. Modal form akan terbuka
3. Isi semua field yang diperlukan
4. Klik **"Simpan"** untuk menyimpan
5. Data akan ditambahkan ke tabel dan modal ditutup
6. Form direset untuk input berikutnya

### Mengedit Data

1. Klik tombol **Edit (Pen icon)** pada baris data
2. _Mock implementation_ - Akan menampilkan alert dengan nama data
3. **TODO:** Implementasi lengkap form edit dengan pre-fill data

### Menghapus Data

1. Klik tombol **Hapus (Trash icon)** pada baris data
2. Akan muncul konfirmasi "Hapus [Tipe]?"
3. Jika dikonfirmasi, data dihapus dari tabel
4. Tabel akan di-render ulang secara otomatis

### Export Data

- Tombol **"Export Excel"** untuk Siswa: `exportExcel('siswa')`
- Tombol **"Export Excel"** untuk Guru: `exportExcel('guru')`
- **TODO:** Implementasi fungsi exportExcel()

---

## Struktur HTML Modal

### Modal Siswa (`#modalAddSiswa`)

```html
<form id="formAddSiswa" onsubmit="addSiswa(event)">
  - NIS - Nama Lengkap - Kelas (Dropdown) - Agama (Dropdown) - Status Pembayaran
  (Dropdown) - Upload Foto (File)
</form>
```

### Modal Guru (`#modalAddGuru`)

```html
<form id="formAddGuru" onsubmit="addGuru(event)">
  - NIP - Nama Lengkap - Mata Pelajaran (Dropdown) - Status (Dropdown:
  PNS/Honorer/Kontrak) - Telepon - Email - Upload Foto (File)
</form>
```

### Modal Kelas (`#modalAddKelas`)

```html
<form id="formAddKelas" onsubmit="addKelas(event)">
  - Kode Kelas - Nama Kelas - Wali Kelas (Dropdown) - Ruang Kelas
</form>
```

### Modal Mapel (`#modalAddMapel`)

```html
<form id="formAddMapel" onsubmit="addMapel(event)">
  - Kode Mapel - Nama Mapel - SKS (Number 1-6) - Guru Pengajar (Dropdown)
</form>
```

---

## Fitur-Fitur Sudah Diimplementasi ✅

- ✅ CRUD Siswa (Add, Read, Edit\*, Delete)
- ✅ CRUD Guru (Add, Read, Edit\*, Delete)
- ✅ CRUD Kelas (Add, Read, Edit\*, Delete)
- ✅ CRUD Mapel (Add, Read, Edit\*, Delete)
- ✅ Modal form untuk semua tipe data
- ✅ Dynamic table rendering dengan data mock
- ✅ Delete confirmation
- ✅ Form reset setelah submit
- ✅ Modal auto-close setelah submit

**Edit\* = Mock implementation (hanya alert, belum form edit)**

---

## TODO / Features untuk Development Lanjutan

### 1. Implementasi Edit Lengkap

- [ ] Buat modal edit untuk Siswa
- [ ] Buat modal edit untuk Guru
- [ ] Buat modal edit untuk Kelas
- [ ] Buat modal edit untuk Mapel
- [ ] Pre-fill form dengan data existing
- [ ] Update data dengan validasi

### 2. Fungsi Export

- [ ] Implementasi `exportExcel()` function
- [ ] Export Siswa ke Excel format
- [ ] Export Guru ke Excel format
- [ ] Export Kelas ke Excel format
- [ ] Export Mapel ke Excel format

### 3. Validasi Data

- [ ] Validasi unique NIS/NIP/Kode
- [ ] Validasi format email guru
- [ ] Validasi range SKS (1-6)
- [ ] Validasi telepon (11-13 digit)
- [ ] Error message untuk duplicate data

### 4. Persistensi Data

- [ ] Simpan data ke localStorage (JSON)
- [ ] Load data dari localStorage saat page load
- [ ] Clear data / Reset database (Admin only)
- [ ] Backup data functionality

### 5. Advanced Features

- [ ] Search/Filter per tabel
- [ ] Sorting by column
- [ ] Pagination untuk data > 50 records
- [ ] Image upload & preview (Foto Siswa/Guru)
- [ ] Bulk import dari CSV/Excel

---

## Testing Checklist

### Test CRUD Siswa

- [ ] Buka Admin Dashboard
- [ ] Klik "Tambah Siswa" → Form muncul
- [ ] Isi form → Klik Simpan → Siswa ditambah di tabel
- [ ] Klik Edit → Alert muncul _(mock)_
- [ ] Klik Delete → Konfirmasi → Siswa dihapus

### Test CRUD Guru

- [ ] Klik "Tambah Guru" → Form muncul
- [ ] Isi form (NIP, Nama, Mapel, Status, Telepon, Email)
- [ ] Klik Simpan → Guru ditambah di tabel
- [ ] Klik Edit → Alert muncul _(mock)_
- [ ] Klik Delete → Konfirmasi → Guru dihapus

### Test CRUD Kelas

- [ ] Klik "Tambah Kelas" → Form muncul
- [ ] Isi form (Kode, Nama, Wali, Ruang)
- [ ] Klik Simpan → Kelas ditambah di tabel
- [ ] Klik Edit → Alert muncul _(mock)_
- [ ] Klik Delete → Konfirmasi → Kelas dihapus

### Test CRUD Mapel

- [ ] Klik "Tambah Mapel" → Form muncul
- [ ] Isi form (Kode, Nama, SKS, Guru)
- [ ] Klik Simpan → Mapel ditambah di tabel
- [ ] Klik Edit → Alert muncul _(mock)_
- [ ] Klik Delete → Konfirmasi → Mapel dihapus

---

## Demo Credentials untuk Admin

| Username | Password | Role  |
| -------- | -------- | ----- |
| admin    | admin123 | Admin |
| admin2   | pass123  | Admin |

Untuk testing, gunakan salah satu akun di atas saat login.

---

## File References

- **HTML:** `admin.html` - Master Admin Dashboard
- **JavaScript:** `assets/js/script.js` - Semua logic CRUD
- **CSS:** `assets/css/style.css` - Custom styling
- **Login:** `login.html` - Authentication page

---

**Last Updated:** 2025  
**Status:** CRUD Lengkap - Ready for Edit Implementation
