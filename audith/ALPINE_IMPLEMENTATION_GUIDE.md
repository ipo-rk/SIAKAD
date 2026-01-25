# 🚀 SIAKAD Dashboard - Alpine.js Integration Guide

**Target:** Membuat dashboard BENAR-BENAR INTERAKTIF dengan Alpine.js  
**Status:** Step-by-Step Implementation Guide  
**Date:** 11 Januari 2026

---

## 📋 Quick Reference - Alpine.js Directives

| Directive         | Fungsi                  | Contoh                                         |
| ----------------- | ----------------------- | ---------------------------------------------- |
| `x-data`          | Inisialisasi app        | `<body x-data="adminApp()">`                   |
| `x-model`         | Two-way binding         | `<input x-model="formSiswa.nama">`             |
| `x-text`          | Update text content     | `<td x-text="siswa.nama"></td>`                |
| `x-for`           | Loop data array         | `<template x-for="(s, i) in siswaData">`       |
| `x-show`          | Toggle display          | `<div x-show="activeSection === 'siswa'">`     |
| `x-if`            | Conditional rendering   | `<div x-if="!editingIndex">Add New</div>`      |
| `@click`          | Event handler           | `<button @click="addSiswa()">Save</button>`    |
| `@submit.prevent` | Form submit             | `<form @submit.prevent="addSiswa()">`          |
| `:class`          | Dynamic class           | `<div :class="getStatusBadgeClass(s.status)">` |
| `x-cloak`         | Hide until Alpine loads | `<body x-cloak>`                               |

---

## ✅ Checklist Implementasi

### FASE 1: Setup Dasar ✅

- [x] Alpine.js sudah di CDN di admin.html
- [x] script.js sudah diubah ke versi 2.0 (Alpine.js reactive)
- [x] Semua data sudah pindah ke Alpine.js state

### FASE 2: Implementasi (TO DO)

- [ ] Tambah x-cloak ke body tag
- [ ] Update navbar/dropdown (notification)
- [ ] Update sidebar navigation
- [ ] Update Dashboard section
- [ ] Update Data Siswa section (CRUD)
- [ ] Update Data Guru section (CRUD)
- [ ] Update Data Kelas section (CRUD)
- [ ] Update Data Mapel section (CRUD)
- [ ] Update Jadwal section (CRUD)
- [ ] Update Jadwal Ujian section (CRUD)
- [ ] Update Nilai section (CRUD)
- [ ] Update Keuangan section (CRUD)
- [ ] Update Absensi section
- [ ] Update Laporan section
- [ ] Test all CRUD operations

### FASE 3: Validation & Testing

- [ ] Semua form validasi bekerja
- [ ] Modal open/close sempurna
- [ ] Edit functionality bekerja
- [ ] Delete confirmation muncul
- [ ] Data update real-time
- [ ] Counters auto-update
- [ ] No console errors

---

## 🔧 Step-by-Step Implementation

### STEP 1: Body Tag Setup

**File:** `admin.html`  
**Location:** Opening `<body>` tag (Line ~15)

```html
<!-- BEFORE -->
<body>
  <!-- AFTER -->
  <body x-cloak x-data="adminApp()">
    <!-- Semua content sekarang reactive -->
  </body>
</body>
```

**Penjelasan:**

- `x-cloak` = Sembunyikan element sampai Alpine.js siap
- `x-data="adminApp()"` = Inisialisasi Alpine app dari script.js

---

### STEP 2: Navigation dengan Active State

**File:** `admin.html`  
**Location:** Sidebar menu

```html
<!-- BEFORE: Static links -->
<ul class="navbar-nav">
  <li><a href="#" data-section="dashboard">Dashboard</a></li>
  <li><a href="#" data-section="data-siswa">Data Siswa</a></li>
</ul>

<!-- AFTER: Dynamic with Alpine.js -->
<ul class="navbar-nav">
  <li>
    <a
      href="#"
      @click.prevent="navigateTo('dashboard')"
      :class="{ 'active': activeSection === 'dashboard' }"
    >
      <i class="fas fa-home"></i> Dashboard
    </a>
  </li>
  <li>
    <a
      href="#"
      @click.prevent="navigateTo('data-siswa')"
      :class="{ 'active': activeSection === 'data-siswa' }"
    >
      <i class="fas fa-users"></i> Data Siswa
    </a>
  </li>
  <li>
    <a
      href="#"
      @click.prevent="navigateTo('data-guru')"
      :class="{ 'active': activeSection === 'data-guru' }"
    >
      <i class="fas fa-chalkboard-user"></i> Data Guru
    </a>
  </li>
  <!-- Tambah semua menu items dengan pattern yang sama -->
</ul>
```

---

### STEP 3: Section Visibility dengan x-show

**File:** `admin.html`  
**Location:** Main content area

```html
<!-- Dashboard Section -->
<div x-show="activeSection === 'dashboard'" class="container py-4">
  <h2>Dashboard</h2>
  <div class="row">
    <div class="col-md-3">
      <div class="card">
        <div class="card-body">
          <h5>Total Siswa</h5>
          <h2 x-text="totalSiswa" style="color: #007bff;"></h2>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card">
        <div class="card-body">
          <h5>Total Guru</h5>
          <h2 x-text="totalGuru" style="color: #28a745;"></h2>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card">
        <div class="card-body">
          <h5>Total Kelas</h5>
          <h2 x-text="totalKelas" style="color: #ffc107;"></h2>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card">
        <div class="card-body">
          <h5>Total Guru</h5>
          <h2 x-text="totalMapel" style="color: #dc3545;"></h2>
        </div>
      </div>
    </div>
  </div>

  <!-- Chart -->
  <div class="card mt-4">
    <div class="card-body">
      <canvas id="chartKehadiran" height="80"></canvas>
    </div>
  </div>
</div>

<!-- Data Siswa Section -->
<div x-show="activeSection === 'data-siswa'" class="container py-4">
  <h2>Data Siswa</h2>
  <!-- TABLE & FORMS HERE (next step) -->
</div>

<!-- Data Guru Section -->
<div x-show="activeSection === 'data-guru'" class="container py-4">
  <h2>Data Guru</h2>
  <!-- TABLE & FORMS HERE (next step) -->
</div>

<!-- Dan seterusnya untuk section lainnya... -->
```

**Key Points:**

- `x-show="activeSection === 'data-siswa'"` = Show hanya saat activeSection = 'data-siswa'
- Hanya satu section visible pada waktu yang sama
- `x-text` = Update text content secara realtime

---

### STEP 4: CRUD Form & Table (Data Siswa)

**File:** `admin.html`  
**Location:** Inside `<div x-show="activeSection === 'data-siswa'">` section

#### A. Button to Open Add Modal

```html
<div class="d-flex justify-content-between align-items-center mb-3">
  <h2>Data Siswa</h2>
  <button class="btn btn-primary" @click="openModal('siswa')">
    <i class="fas fa-plus"></i> Tambah Siswa
  </button>
</div>
```

#### B. Table dengan x-for Loop

```html
<div class="table-responsive">
  <table class="table table-striped table-hover">
    <thead class="table-dark">
      <tr>
        <th>No</th>
        <th>NIS</th>
        <th>Nama Siswa</th>
        <th>Kelas</th>
        <th>Agama</th>
        <th>Status</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <!-- Loop melalui siswaData array -->
      <template x-for="(siswa, index) in siswaData" :key="index">
        <tr>
          <td x-text="index + 1"></td>
          <td x-text="siswa.nis"></td>
          <td x-text="siswa.nama"></td>
          <td x-text="siswa.kelas"></td>
          <td x-text="siswa.agama"></td>
          <td>
            <span
              class="badge"
              :class="getStatusBadgeClass(siswa.status)"
              x-text="siswa.status"
            >
            </span>
          </td>
          <td>
            <button
              class="btn btn-sm btn-outline-secondary"
              @click="editSiswa(index)"
              title="Edit"
            >
              <i class="fas fa-pen"></i>
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="deleteSiswa(index)"
              title="Hapus"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</div>

<!-- If no data -->
<div x-show="siswaData.length === 0" class="alert alert-info">
  Tidak ada data siswa. Klik "Tambah Siswa" untuk menambah data.
</div>
```

#### C. Modal Add/Edit Form

```html
<!-- Modal Siswa -->
<div
  x-show="showModal === 'siswa'"
  class="modal"
  style="display: block; background: rgba(0,0,0,0.5);"
  @click.away="closeModal()"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5
          class="modal-title"
          x-text="editingIndex === null ? 'Tambah Siswa' : 'Edit Siswa'"
        ></h5>
        <button class="btn-close" @click="closeModal()"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="addSiswa()">
          <div class="mb-3">
            <label class="form-label">NIS</label>
            <input
              type="text"
              class="form-control"
              x-model="formSiswa.nis"
              placeholder="Masukkan NIS"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Nama Siswa</label>
            <input
              type="text"
              class="form-control"
              x-model="formSiswa.nama"
              placeholder="Masukkan nama"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Kelas</label>
            <select class="form-control" x-model="formSiswa.kelas">
              <option value="">-- Pilih Kelas --</option>
              <option value="8A">8A</option>
              <option value="8B">8B</option>
              <option value="9A">9A</option>
              <option value="9B">9B</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Agama</label>
            <select class="form-control" x-model="formSiswa.agama">
              <option value="">-- Pilih Agama --</option>
              <option value="Islam">Islam</option>
              <option value="Kristen">Kristen</option>
              <option value="Katolik">Katolik</option>
              <option value="Hindu">Hindu</option>
              <option value="Budha">Budha</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Status Keuangan</label>
            <select class="form-control" x-model="formSiswa.status">
              <option value="">-- Pilih Status --</option>
              <option value="Lunas">Lunas</option>
              <option value="Tunggakan">Tunggakan</option>
            </select>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeModal()"
            >
              Batal
            </button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
```

---

### STEP 5: Apply Same Pattern untuk Semua CRUD

#### Data Guru (Pattern sama):

```html
<!-- Button -->
<button class="btn btn-primary" @click="openModal('guru')">
  <i class="fas fa-plus"></i> Tambah Guru
</button>

<!-- Table -->
<table class="table table-striped">
  <thead class="table-dark">
    <tr>
      <th>No</th>
      <th>NIP</th>
      <th>Nama Guru</th>
      <th>Mapel</th>
      <th>Status</th>
      <th>Aksi</th>
    </tr>
  </thead>
  <tbody>
    <template x-for="(guru, index) in guruData" :key="index">
      <tr>
        <td x-text="index + 1"></td>
        <td x-text="guru.nip"></td>
        <td x-text="guru.nama"></td>
        <td x-text="guru.mapel"></td>
        <td>
          <span
            class="badge"
            :class="getStatusBadgeClass(guru.status)"
            x-text="guru.status"
          >
          </span>
        </td>
        <td>
          <button
            class="btn btn-sm btn-outline-secondary"
            @click="editGuru(index)"
          >
            <i class="fas fa-pen"></i>
          </button>
          <button class="btn btn-sm btn-danger" @click="deleteGuru(index)">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    </template>
  </tbody>
</table>

<!-- Modal Form -->
<div x-show="showModal === 'guru'" class="modal" style="display: block;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 x-text="editingIndex === null ? 'Tambah Guru' : 'Edit Guru'"></h5>
      </div>
      <div class="modal-body">
        <form @submit.prevent="addGuru()">
          <input
            type="text"
            class="form-control mb-2"
            x-model="formGuru.nip"
            placeholder="NIP"
          />
          <input
            type="text"
            class="form-control mb-2"
            x-model="formGuru.nama"
            placeholder="Nama Guru"
          />
          <input
            type="text"
            class="form-control mb-2"
            x-model="formGuru.mapel"
            placeholder="Mapel"
          />
          <select class="form-control mb-2" x-model="formGuru.status">
            <option value="Aktif">Aktif</option>
            <option value="Nonaktif">Nonaktif</option>
          </select>
          <input
            type="tel"
            class="form-control mb-2"
            x-model="formGuru.telepon"
            placeholder="Telepon"
          />
          <input
            type="email"
            class="form-control mb-2"
            x-model="formGuru.email"
            placeholder="Email"
          />
          <button type="submit" class="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  </div>
</div>
```

#### Data Kelas, Data Mapel, Jadwal, dst:

**Pattern sama seperti Guru dan Siswa:**

1. Button dengan `@click="openModal('kelas')"` dll
2. Table dengan `<template x-for="(item, index) in kelasData">`
3. Modal form dengan `x-show="showModal === 'kelas'"`
4. Inputs dengan `x-model="formKelas.field"`
5. Buttons dengan `@click="editKelas(index)"` dan `@click="deleteKelas(index)"`

---

### STEP 6: Financial Dashboard (Keuangan Section)

```html
<!-- Keuangan Section -->
<div x-show="activeSection === 'keuangan'" class="container py-4">
  <h2>Keuangan (SPP)</h2>

  <!-- Summary Cards -->
  <div class="row mb-4">
    <div class="col-md-4">
      <div class="card bg-success text-white">
        <div class="card-body">
          <h5>SPP Bulan Ini</h5>
          <h2 x-text="formatCurrency(sppBulanIni)"></h2>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card bg-primary text-white">
        <div class="card-body">
          <h5>Siswa Lunas</h5>
          <h2>
            <span x-text="sppLunas"></span> / <span x-text="totalSiswa"></span>
          </h2>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card bg-danger text-white">
        <div class="card-body">
          <h5>Tunggakan</h5>
          <h2 x-text="sppTunggak"></h2>
        </div>
      </div>
    </div>
  </div>

  <!-- Transaction Table -->
  <button class="btn btn-primary mb-3" @click="openModal('keuangan')">
    <i class="fas fa-plus"></i> Tambah Transaksi
  </button>

  <table class="table table-striped">
    <thead class="table-dark">
      <tr>
        <th>No</th>
        <th>Tanggal</th>
        <th>NIS</th>
        <th>Jenis</th>
        <th>Jumlah</th>
        <th>Keterangan</th>
        <th>Aksi</th>
      </tr>
    </thead>
    <tbody>
      <template x-for="(item, index) in keuanganData" :key="index">
        <tr>
          <td x-text="index + 1"></td>
          <td x-text="item.tanggal"></td>
          <td x-text="item.nis"></td>
          <td x-text="item.jenis"></td>
          <td x-text="formatCurrency(item.jumlah)"></td>
          <td x-text="item.keterangan"></td>
          <td>
            <button
              class="btn btn-sm btn-outline-secondary"
              @click="editKeuangan(index)"
            >
              Edit
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="deleteKeuangan(index)"
            >
              Hapus
            </button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</div>

<!-- Modal Keuangan -->
<div x-show="showModal === 'keuangan'" class="modal" style="display: block;">
  <div class="modal-dialog">
    <div class="modal-content">
      <form @submit.prevent="addKeuangan()">
        <div class="modal-header">
          <h5
            x-text="editingIndex === null ? 'Tambah Transaksi' : 'Edit Transaksi'"
          ></h5>
        </div>
        <div class="modal-body">
          <input
            type="date"
            class="form-control mb-2"
            x-model="formKeuangan.tanggal"
          />
          <input
            type="text"
            class="form-control mb-2"
            x-model="formKeuangan.nis"
            placeholder="NIS Siswa"
          />
          <select class="form-control mb-2" x-model="formKeuangan.jenis">
            <option value="SPP">SPP</option>
            <option value="Pendaftaran">Pendaftaran</option>
            <option value="Buku">Buku</option>
            <option value="Seragam">Seragam</option>
          </select>
          <input
            type="number"
            class="form-control mb-2"
            x-model="formKeuangan.jumlah"
            placeholder="Jumlah"
          />
          <input
            type="text"
            class="form-control mb-2"
            x-model="formKeuangan.keterangan"
            placeholder="Keterangan"
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal()">
            Batal
          </button>
          <button type="submit" class="btn btn-primary">Simpan</button>
        </div>
      </form>
    </div>
  </div>
</div>
```

---

## 📊 Data Summary Reference

### Siswa Data Fields:

```javascript
{
    nis: "10234",
    nama: "Andi",
    kelas: "8A",
    agama: "Kristen",
    status: "Lunas"
}
```

### Guru Data Fields:

```javascript
{
    nip: "12345",
    nama: "Budi",
    mapel: "Matematika",
    status: "Aktif",
    telepon: "081234567890",
    email: "budi@school.com"
}
```

### Keuangan Data Fields:

```javascript
{
    tanggal: "2026-01-11",
    nis: "10234",
    jenis: "SPP",
    jumlah: 500000,
    keterangan: "SPP Januari 2026"
}
```

---

## 🎯 Testing After Implementation

### Test Checklist:

```
DASHBOARD:
✅ Counters display correct numbers
✅ Counters update when adding/deleting data
✅ Chart renders correctly

DATA SISWA:
✅ Table shows all siswa from array
✅ "Tambah Siswa" button opens modal
✅ Form inputs bind correctly (x-model)
✅ "Simpan" adds new siswa to array
✅ "Edit" button loads siswa data into form
✅ "Edit" then "Simpan" updates existing siswa
✅ "Hapus" shows confirmation
✅ "Hapus" removes siswa from array

NAVIGATION:
✅ Clicking menu item switches section
✅ Only one section visible at a time
✅ Menu item highlights when active
✅ Mobile sidebar works

MODALS:
✅ Modal opens with correct title (Add/Edit)
✅ Form clears after submit
✅ Modal closes on "Batal" button
✅ Modal closes when clicking outside
✅ editingIndex resets on close

FINANCIAL:
✅ SPP Bulan Ini calculated correctly
✅ Siswa Lunas count correct
✅ Tunggakan = Total - Lunas
✅ Currency formatting works (Rp format)
```

---

## 🐛 Debugging Tips

```javascript
// In browser console:

// Check app state
console.log(Alpine.$data);

// Check specific data
console.log(document.__x.data);

// Monitor changes
document.addEventListener('alpine:init', () => {
    console.log('Alpine.js initialized');
});

// Add breakpoints in methods
addSiswa() {
    debugger;  // Pause execution here
    this.siswaData.push({...this.formSiswa});
}
```

---

## ✨ Summary

**Implementation Plan:**

1. ✅ Setup x-cloak & x-data on body
2. ✅ Update navigation with @click & :class
3. ✅ Update sections with x-show
4. ✅ Implement CRUD table & form for Data Siswa
5. ✅ Apply same pattern to Data Guru, Kelas, Mapel, Jadwal, etc.
6. ✅ Test all functionality

**Expected Result:**

- ✅ Full Alpine.js reactivity
- ✅ All CRUD operations working
- ✅ Real-time data updates
- ✅ Professional, responsive UI
- ✅ No page reloads needed

---

**Status:** Ready for Implementation  
**Estimated Time:** 2-3 hours for complete implementation  
**Difficulty:** Beginner-Friendly (Follow patterns)
