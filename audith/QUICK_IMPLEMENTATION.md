# 🚀 Quick Implementation Guide - Alpine.js untuk admin.html

**Tujuan:** Membuat dashboard BENAR-BENAR INTERAKTIF  
**Waktu Estimasi:** 2-3 jam  
**Kesulitan:** ⭐⭐ Beginner-Friendly

---

## ⚡ Quick Start (5 Menit Setup)

### 1. Tambah ke <body> tag (Line ~15)

```html
<!-- BEFORE -->
<body>
  <!-- AFTER -->
  <body x-cloak x-data="adminApp()"></body>
</body>
```

### 2. Pastikan semua CDN terpasang (di <head>)

```html
<!-- Alpine.js - REQUIRED -->
<script
  defer
  src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
></script>

<!-- Chart.js - REQUIRED -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0"></script>

<!-- Font Awesome - REQUIRED -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
/>
```

### 3. Pastikan script.js sudah di-load (sebelum closing </body>)

```html
<script src="assets/js/script.js"></script>
</body>
```

---

## 🎯 11 Implementasi Utama

### IMPLEMENTASI #1: Dashboard Section dengan Counters

**File:** admin.html  
**Find:** `<div class="tab-pane" id="dashboard">`  
**Replace dengan:**

```html
<!-- Dashboard Section -->
<div x-show="activeSection === 'dashboard'" class="container py-4">
  <h2 class="mb-4">Dashboard</h2>

  <!-- Summary Cards -->
  <div class="row mb-4">
    <div class="col-md-3 mb-3">
      <div class="card shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h6 class="text-muted">Total Siswa</h6>
              <h2 class="text-primary" x-text="totalSiswa">0</h2>
            </div>
            <i class="fas fa-users text-primary" style="font-size: 2em;"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3 mb-3">
      <div class="card shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h6 class="text-muted">Total Guru</h6>
              <h2 class="text-success" x-text="totalGuru">0</h2>
            </div>
            <i
              class="fas fa-chalkboard-user text-success"
              style="font-size: 2em;"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3 mb-3">
      <div class="card shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h6 class="text-muted">Total Kelas</h6>
              <h2 class="text-warning" x-text="totalKelas">0</h2>
            </div>
            <i
              class="fas fa-door-open text-warning"
              style="font-size: 2em;"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3 mb-3">
      <div class="card shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <h6 class="text-muted">Total Mapel</h6>
              <h2 class="text-danger" x-text="totalMapel">0</h2>
            </div>
            <i class="fas fa-book text-danger" style="font-size: 2em;"></i>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Attendance Chart -->
  <div class="row">
    <div class="col-md-12">
      <div class="card shadow-sm">
        <div class="card-header bg-primary text-white">
          <h5 class="mb-0">Grafik Kehadiran 30 Hari</h5>
        </div>
        <div class="card-body">
          <canvas id="chartKehadiran" height="80"></canvas>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

### IMPLEMENTASI #2: Data Siswa (CRUD Lengkap)

**File:** admin.html  
**Find:** `<div class="tab-pane" id="data-siswa">`  
**Replace dengan:**

```html
<!-- Data Siswa Section -->
<div x-show="activeSection === 'data-siswa'" class="container py-4">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2>Data Siswa</h2>
    <button class="btn btn-primary" @click="openModal('siswa')">
      <i class="fas fa-plus"></i> Tambah Siswa
    </button>
  </div>

  <!-- Table -->
  <div class="card shadow-sm">
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead class="table-dark">
            <tr>
              <th>No</th>
              <th>NIS</th>
              <th>Nama Siswa</th>
              <th>Kelas</th>
              <th>Agama</th>
              <th>Status Keuangan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
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
                  ></span>
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

        <!-- Empty State -->
        <div x-show="siswaData.length === 0" class="alert alert-info">
          <i class="fas fa-info-circle"></i> Tidak ada data siswa. Klik "Tambah
          Siswa" untuk menambahkan data baru.
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modal Siswa -->
<div
  x-show="showModal === 'siswa'"
  class="modal d-block"
  style="background: rgba(0,0,0,0.5);"
  @click.away="closeModal()"
>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5
          class="modal-title"
          x-text="editingIndex === null ? 'Tambah Siswa' : 'Edit Siswa'"
        ></h5>
        <button type="button" class="btn-close" @click="closeModal()"></button>
      </div>

      <form @submit.prevent="addSiswa()">
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label"
              >NIS <span class="text-danger">*</span></label
            >
            <input
              type="text"
              class="form-control"
              x-model="formSiswa.nis"
              placeholder="Nomor Induk Siswa"
            />
          </div>

          <div class="mb-3">
            <label class="form-label"
              >Nama Siswa <span class="text-danger">*</span></label
            >
            <input
              type="text"
              class="form-control"
              x-model="formSiswa.nama"
              placeholder="Nama lengkap siswa"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Kelas</label>
            <select class="form-control" x-model="formSiswa.kelas">
              <option value="">-- Pilih Kelas --</option>
              <option value="8A">8A</option>
              <option value="8B">8B</option>
              <option value="9A">9A</option>
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
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal()">
            Batal
          </button>
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-save"></i> Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
```

---

### IMPLEMENTASI #3: Data Guru (Template sama dengan Siswa)

**Pattern:**

```html
<!-- Add/Edit Button -->
<button class="btn btn-primary" @click="openModal('guru')">
  <i class="fas fa-plus"></i> Tambah Guru
</button>

<!-- Table Loop -->
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
      ></span>
    </td>
    <td>
      <button class="btn btn-sm btn-outline-secondary" @click="editGuru(index)">
        Edit
      </button>
      <button class="btn btn-sm btn-danger" @click="deleteGuru(index)">
        Hapus
      </button>
    </td>
  </tr>
</template>

<!-- Modal Form -->
<div
  x-show="showModal === 'guru'"
  class="modal d-block"
  style="background: rgba(0,0,0,0.5);"
  @click.away="closeModal()"
>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <form @submit.prevent="addGuru()">
        <div class="modal-header">
          <h5 x-text="editingIndex === null ? 'Tambah Guru' : 'Edit Guru'"></h5>
          <button
            type="button"
            class="btn-close"
            @click="closeModal()"
          ></button>
        </div>
        <div class="modal-body">
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
            placeholder="Mata Pelajaran"
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

### IMPLEMENTASI #4: Keuangan (SPP) - Financial Dashboard

```html
<!-- Keuangan Section -->
<div x-show="activeSection === 'keuangan'" class="container py-4">
  <h2 class="mb-4">Keuangan (SPP)</h2>

  <!-- Summary Cards -->
  <div class="row mb-4">
    <div class="col-md-4 mb-3">
      <div class="card bg-success text-white">
        <div class="card-body">
          <h6 class="card-title">SPP Bulan Ini</h6>
          <h2 x-text="formatCurrency(sppBulanIni)">Rp 0</h2>
        </div>
      </div>
    </div>

    <div class="col-md-4 mb-3">
      <div class="card bg-primary text-white">
        <div class="card-body">
          <h6 class="card-title">Siswa Lunas</h6>
          <h2>
            <span x-text="sppLunas">0</span> /
            <span x-text="totalSiswa">0</span>
          </h2>
        </div>
      </div>
    </div>

    <div class="col-md-4 mb-3">
      <div class="card bg-danger text-white">
        <div class="card-body">
          <h6 class="card-title">Tunggakan</h6>
          <h2 x-text="sppTunggak">0</h2>
        </div>
      </div>
    </div>
  </div>

  <!-- Add Button -->
  <button class="btn btn-primary mb-3" @click="openModal('keuangan')">
    <i class="fas fa-plus"></i> Tambah Transaksi
  </button>

  <!-- Table -->
  <div class="card">
    <div class="table-responsive">
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
  </div>
</div>

<!-- Modal Keuangan -->
<div
  x-show="showModal === 'keuangan'"
  class="modal d-block"
  style="background: rgba(0,0,0,0.5);"
  @click.away="closeModal()"
>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <form @submit.prevent="addKeuangan()">
        <div class="modal-header">
          <h5
            x-text="editingIndex === null ? 'Tambah Transaksi' : 'Edit Transaksi'"
          ></h5>
          <button
            type="button"
            class="btn-close"
            @click="closeModal()"
          ></button>
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

### IMPLEMENTASI #5-10: Kelas, Mapel, Jadwal, Jadwal Ujian, Nilai, Absensi

**Gunakan pola yang sama seperti Siswa dan Guru:**

1. **Add/Edit Button** → `@click="openModal('namaEntity')"`
2. **Table Loop** → `<template x-for="(item, index) in namaEntityData">`
3. **Action Buttons** → `@click="editNamaEntity(index)"`, `@click="deleteNamaEntity(index)"`
4. **Modal Form** → `x-show="showModal === 'namaEntity'"` dengan `x-model` bindings
5. **Form Submit** → `@submit.prevent="addNamaEntity()"`

**Fields untuk setiap entity:**

- **Kelas:** kode, nama, wali, ruang, jmlSiswa
- **Mapel:** kode, nama, sks, guru
- **Jadwal:** hari, jam_mulai, jam_selesai, kelas, mapel, guru, ruang
- **Jadwal Ujian:** jenis_ujian, tanggal, mapel, kelas, waktu_mulai, ruang
- **Nilai:** nis, nilai_harian, uts, uas
- **Absensi:** nis, nama, hadir, sakit, izin, alfa

---

### IMPLEMENTASI #11: Navigation (Sidebar)

```html
<!-- Update Menu Items dengan @click & :class -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">SIAKAD v2.0</a>

    <!-- Menu Items -->
    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <a
          href="#"
          class="nav-link"
          @click.prevent="navigateTo('dashboard')"
          :class="{ 'active': activeSection === 'dashboard' }"
        >
          <i class="fas fa-home"></i> Dashboard
        </a>
      </li>

      <li class="nav-item">
        <a
          href="#"
          class="nav-link"
          @click.prevent="navigateTo('data-siswa')"
          :class="{ 'active': activeSection === 'data-siswa' }"
        >
          <i class="fas fa-users"></i> Data Siswa
        </a>
      </li>

      <li class="nav-item">
        <a
          href="#"
          class="nav-link"
          @click.prevent="navigateTo('data-guru')"
          :class="{ 'active': activeSection === 'data-guru' }"
        >
          <i class="fas fa-chalkboard-user"></i> Data Guru
        </a>
      </li>

      <li class="nav-item">
        <a
          href="#"
          class="nav-link"
          @click.prevent="navigateTo('data-kelas')"
          :class="{ 'active': activeSection === 'data-kelas' }"
        >
          <i class="fas fa-door-open"></i> Data Kelas
        </a>
      </li>

      <li class="nav-item">
        <a
          href="#"
          class="nav-link"
          @click.prevent="navigateTo('data-mapel')"
          :class="{ 'active': activeSection === 'data-mapel' }"
        >
          <i class="fas fa-book"></i> Data Mapel
        </a>
      </li>

      <li class="nav-item">
        <a
          href="#"
          class="nav-link"
          @click.prevent="navigateTo('jadwal')"
          :class="{ 'active': activeSection === 'jadwal' }"
        >
          <i class="fas fa-calendar"></i> Jadwal
        </a>
      </li>

      <li class="nav-item">
        <a
          href="#"
          class="nav-link"
          @click.prevent="navigateTo('keuangan')"
          :class="{ 'active': activeSection === 'keuangan' }"
        >
          <i class="fas fa-money-bill"></i> Keuangan
        </a>
      </li>

      <!-- Logout Button -->
      <li class="nav-item">
        <a href="#" class="nav-link text-danger" @click.prevent="logout()">
          <i class="fas fa-sign-out-alt"></i> Logout
        </a>
      </li>
    </ul>
  </div>
</nav>
```

---

## 📋 Checklist Implementasi

### Setup (5 menit)

- [ ] Tambah `x-cloak x-data="adminApp()"` ke body
- [ ] Verifikasi CDN terpasang
- [ ] Verifikasi script.js ter-load

### Implementasi (2-3 jam)

- [ ] Dashboard dengan counters & chart
- [ ] Data Siswa (CRUD lengkap)
- [ ] Data Guru (CRUD lengkap)
- [ ] Data Kelas (CRUD lengkap)
- [ ] Data Mapel (CRUD lengkap)
- [ ] Jadwal (CRUD lengkap)
- [ ] Jadwal Ujian (CRUD lengkap)
- [ ] Nilai (Add & Edit)
- [ ] Absensi (display + edit)
- [ ] Keuangan (CRUD + counters)
- [ ] Navigation (active state)
- [ ] Modals (styling & UX)

### Testing (30 menit)

- [ ] Semua button berfungsi
- [ ] Add/Edit/Delete bekerja
- [ ] Data terupdate real-time
- [ ] Modal open/close sempurna
- [ ] Navigation bekerja
- [ ] No console errors
- [ ] Responsive di mobile

---

## 🐛 Common Issues & Solutions

### Issue 1: "adminApp is not defined"

**Solusi:** Pastikan `<script src="assets/js/script.js"></script>` ada sebelum closing `</body>`

### Issue 2: Data tidak terupdate saat input

**Solusi:** Pastikan input punya `x-model="formFieldName"`

### Issue 3: Modal tidak buka

**Solusi:** Pastikan modal div punya `x-show="showModal === 'entityName'"` (harus sama dengan parameter di openModal())

### Issue 4: Tabel kosong

**Solusi:** Pastikan `<template x-for="(item, index) in dataArray">` dengan nama array yang benar

### Issue 5: Button edit/delete tidak bekerja

**Solusi:** Pastikan button ada `@click="editName(index)"` atau `@click="deleteName(index)"`

---

## ✨ Tips Sukses

1. **Copy-paste dari contoh** → Paling cepat dan akurat
2. **Ganti field names** → Sesuaikan dengan data structure
3. **Test satu section dulu** → Jangan semua sekaligus
4. **F12 Console** → Lihat error messages
5. **Konsisten** → Gunakan pola yang sama untuk semua entities

---

## 🎯 Expected Result

✅ Fully interactive dashboard  
✅ All CRUD operations working  
✅ Real-time data updates  
✅ Professional UI  
✅ No page reloads needed  
✅ Mobile responsive

---

**Selamat mengimplementasikan! 🚀**

Jika ada pertanyaan, lihat dokumentasi lengkap di folder `/audith/`
