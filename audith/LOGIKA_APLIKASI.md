# 📋 LOGIKA APLIKASI SIAKAD - SMP YPPGI BOMOU

## 🎯 Ringkasan Umum

Aplikasi ini adalah sistem informasi akademik (SIAKAD) berbasis web untuk mengelola data siswa, guru, jadwal, nilai, dan keuangan sekolah. Aplikasi mendukung **3 role berbeda** (Admin, Guru, Siswa) dengan interface dan fitur yang disesuaikan untuk masing-masing role.

---

## 🏗️ STRUKTUR ARSITEKTUR

### 1. **HTML (admin.html)**

Menggunakan Bootstrap 5 + Tailwind CSS untuk UI responsive dengan 3 komponen utama:

```
┌─────────────────────────────────────────┐
│           TOPBAR (Navbar)               │  ← Role Selector, User Profile
├──────────────┬──────────────────────────┤
│              │                          │
│   SIDEBAR    │      MAIN CONTENT        │  ← Konten dinamis berubah sesuai role
│   (Menu)     │      (Sections)          │
│              │                          │
└──────────────┴──────────────────────────┘
```

---

## 📦 KOMPONEN UTAMA

### **A. TOPBAR (Header Atas)**

```html
<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
  - Logo/Brand: "SIAKAD — SMP YPPGI Bomou" - Role Selector: Dropdown untuk ganti
  role (Admin/Guru/Siswa) - User Avatar: Dropdown profile, pengaturan, logout
</nav>
```

**Fungsi:**

- Menampilkan nama aplikasi
- Memungkinkan user untuk switching role
- Akses cepat ke profil dan logout

---

### **B. SIDEBAR (Menu Navigasi)**

Ada 3 menu berbeda sesuai role:

#### **Menu Admin (Default)**

```javascript
menuAdmin {
  ├─ Dashboard
  ├─ Data Master
  ├─ Data Siswa
  ├─ Data Guru
  ├─ Data Kelas
  ├─ Data Mata Pelajaran
  ├─ Jadwal Pelajaran
  ├─ Jadwal Ujian
  ├─ Nilai Siswa
  ├─ Absensi
  ├─ Keuangan (SPP)
  ├─ Laporan
  └─ Pengaturan Sistem
}
```

#### **Menu Guru**

```javascript
menuGuru {
  ├─ Dashboard
  ├─ Absensi Kelas
  ├─ Input Nilai
  ├─ Jadwal Mengajar
  ├─ Laporan Nilai
  └─ Profil Guru
}
```

#### **Menu Siswa**

```javascript
menuSiswa {
  ├─ Dashboard
  ├─ Jadwal Pelajaran
  ├─ Nilai
  ├─ Absensi
  ├─ Pembayaran SPP
  ├─ Cetak Raport
  └─ Profil Siswa
}
```

**Sistem CSS:**

- `d-none` = Menyembunyikan menu (display: none)
- Setiap link memiliki `data-section` attribute untuk navigasi

---

### **C. MAIN CONTENT (Area Konten Utama)**

Berisi **5 section utama**:

```html
1. section-dashboard → Tampilan ringkasan (summary cards, grafik, notifikasi) 2.
section-data-siswa → Tabel data siswa dengan CRUD operations 3.
section-input-nilai → Form input nilai siswa per kelas & mapel 4. section-raport
→ Raport digital online 5. section-pengumuman → Pengumuman sekolah
```

Semua section tersembunyi dengan `d-none`, hanya 1 yang tampil saat diakses.

---

## ⚙️ LOGIKA JAVASCRIPT

### **1. DATA MANAGEMENT (Mock Data)**

```javascript
const siswaData = [
  {
    nis: "10234",
    nama: "Andi",
    kelas: "8A",
    agama: "Kristen",
    status: "Lunas",
  },
  {
    nis: "10235",
    nama: "Budi",
    kelas: "8B",
    agama: "Islam",
    status: "Tunggakan",
  },
  {
    nis: "10236",
    nama: "Citra",
    kelas: "9A",
    agama: "Katolik",
    status: "Lunas",
  },
];
```

**Fungsi:**

- Menyimpan data siswa sementara di memory (bukan database)
- Array ini akan diubah saat user tambah/edit/hapus siswa

---

### **2. RENDER TABLE (Menampilkan Tabel Siswa)**

```javascript
function renderSiswaTable() {
  const tbody = document.getElementById("tableSiswaBody");
  tbody.innerHTML = ""; // Kosongkan tabel lama

  siswaData.forEach((s, i) => {
    // Buat <tr> untuk setiap siswa
    // Tampilkan foto, NIS, nama, kelas, agama, status pembayaran
    // Tambahkan tombol Edit & Hapus
  });
}
```

**Alur:**

1. Kosongkan isi tabel (`innerHTML = ''`)
2. Loop setiap siswa dalam `siswaData`
3. Buat row baru dengan HTML template
4. Insert ke dalam `<tbody>`

---

### **3. CRUD OPERATIONS**

#### **CREATE (Tambah Siswa)**

```javascript
function addSiswa(e) {
  e.preventDefault(); // Cegah form submit default
  const f = e.target; // Form element

  // Ambil nilai dari form input
  const newS = {
    nis: f.nis.value,
    nama: f.nama.value,
    kelas: f.kelas.value,
    agama: f.agama.value,
    status: f.status.value,
  };

  siswaData.push(newS); // Tambah ke array
  renderSiswaTable(); // Render ulang tabel

  // Tutup modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("modalAddSiswa")
  );
  modal.hide();

  f.reset(); // Kosongkan form
}
```

#### **READ (Tampilkan Data)**

Dilakukan oleh `renderSiswaTable()` saat halaman load.

#### **UPDATE (Edit Siswa)**

```javascript
function editSiswa(i) {
  alert("Mock edit: " + siswaData[i].nama);
  // TODO: Implementasi edit form modal
}
```

#### **DELETE (Hapus Siswa)**

```javascript
function hapusSiswa(i) {
  if (confirm("Hapus siswa?")) {
    siswaData.splice(i, 1); // Hapus dari array di index i
    renderSiswaTable(); // Render ulang
  }
}
```

---

### **4. ROLE SWITCHING (Ganti Role)**

```javascript
const roleSelect = document.getElementById("roleSelect");
roleSelect.addEventListener("change", (e) => switchRole(e.target.value));

function switchRole(role) {
  // 1. Update label role di sidebar
  document.getElementById("sidebarRole").innerText =
    role.charAt(0).toUpperCase() + role.slice(1);

  // 2. Show/Hide menu berdasarkan role
  document
    .getElementById("menuAdmin")
    .classList.toggle("d-none", role !== "admin");
  document
    .getElementById("menuGuru")
    .classList.toggle("d-none", role !== "guru");
  document
    .getElementById("menuSiswa")
    .classList.toggle("d-none", role !== "siswa");

  // 3. Show/Hide sections berdasarkan role
  document
    .getElementById("section-dashboard")
    .classList.toggle("d-none", false); // Always show
  document
    .getElementById("section-data-siswa")
    .classList.toggle("d-none", role !== "admin");
  document
    .getElementById("section-input-nilai")
    .classList.toggle("d-none", role !== "guru");
  document
    .getElementById("section-raport")
    .classList.toggle("d-none", role !== "guru" && role !== "siswa");
  document
    .getElementById("section-pengumuman")
    .classList.toggle("d-none", role === "siswa");

  // 4. Ubah konten khusus role (contoh: Guru melihat "Anda" bukan "28")
  if (role === "guru") {
    document.getElementById("countGuru").innerText = "Anda";
  } else {
    document.getElementById("countGuru").innerText = "28";
  }
}
```

**Logika `.toggle()`:**

```javascript
element.classList.toggle("d-none", condition);
// Jika condition = true  → tambah class d-none (sembunyikan)
// Jika condition = false → hapus class d-none (tampilkan)
```

**Contoh:**

```javascript
// Untuk Admin
document
  .getElementById("menuAdmin")
  .classList.toggle("d-none", role !== "admin");
// role = 'admin'  → condition = false → d-none dihapus → TAMPIL ✓
// role = 'guru'   → condition = true  → d-none ditambah → SEMBUNYI ✗
```

---

### **5. SIDEBAR NAVIGATION (Navigasi Antar Section)**

```javascript
document.querySelectorAll("[data-section]").forEach((a) =>
  a.addEventListener("click", (ev) => {
    ev.preventDefault(); // Cegah link default
    const s = a.getAttribute("data-section"); // Ambil nilai data-section

    // 1. Sembunyikan SEMUA section
    document
      .querySelectorAll("main section")
      .forEach((sec) => sec.classList.add("d-none"));

    // 2. Tampilkan section sesuai yang diklik
    if (s === "dashboard")
      document.getElementById("section-dashboard").classList.remove("d-none");
    if (s === "data-siswa")
      document.getElementById("section-data-siswa").classList.remove("d-none");
    if (s === "input-nilai" || s === "absensi-kelas" || s === "jadwal-mengajar")
      document.getElementById("section-input-nilai").classList.remove("d-none");
    if (s === "raport" || s === "laporan-nilai")
      document.getElementById("section-raport").classList.remove("d-none");
    if (s === "pengumuman")
      document.getElementById("section-pengumuman").classList.remove("d-none");
  })
);
```

**Alur:**

1. User klik link di sidebar dengan atribut `data-section="data-siswa"`
2. JavaScript tangkap event click
3. Ambil nilai `data-section` (misal: "data-siswa")
4. Sembunyikan semua section (`d-none`)
5. Cari section dengan id yang sesuai (`section-data-siswa`)
6. Tampilkan section itu (hapus class `d-none`)

---

### **6. CHART (Grafik Kehadiran)**

```javascript
const ctx = document.getElementById("chartKehadiran");
const chartKeh = new Chart(ctx, {
  type: "line", // Line chart
  data: {
    labels: Array.from({ length: 30 }, (_, i) => `D-${29 - i}`), // Label: D-29, D-28, ..., D-0
    datasets: [
      {
        label: "Hadir (%)",
        data: Array.from({ length: 30 }, () =>
          Math.round(75 + Math.random() * 25)
        ), // Random 75-100%
        tension: 0.3,
        fill: true,
        backgroundColor: "rgba(99,102,241,0.08)",
        borderColor: "rgba(99,102,241,0.9)",
      },
    ],
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, max: 100 } },
  },
});

function downloadChart() {
  const url = chartKeh.toBase64Image(); // Konversi chart ke image
  const a = document.createElement("a");
  a.href = url;
  a.download = "kehadiran.png";
  a.click(); // Download image
}
```

---

### **7. MOBILE SIDEBAR TOGGLE**

```javascript
document.getElementById("toggleSidebar").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("d-none");
});
```

**Fungsi:** Tampilkan/sembunyikan sidebar di mobile (screen width < lg)

---

## 🔄 ALUR KERJA APLIKASI

### **Scenario 1: User Login sebagai Admin**

```
1. Halaman load
   ↓
2. switchRole('admin') dipanggil
   ↓
3. menuAdmin tampil, menuGuru & menuSiswa sembunyi
   ↓
4. Admin bisa akses semua section: dashboard, data-siswa, input-nilai, dll
   ↓
5. Admin klik "Data Siswa" di sidebar
   ↓
6. section-data-siswa tampil, section lain sembunyi
   ↓
7. Tabel siswa ditampilkan dengan fungsi renderSiswaTable()
```

### **Scenario 2: Admin Tambah Siswa Baru**

```
1. Admin klik tombol "Tambah Siswa"
   ↓
2. Modal form muncul
   ↓
3. Admin isi form: NIS, Nama, Kelas, Agama, Status
   ↓
4. Admin klik "Simpan"
   ↓
5. Function addSiswa() dipanggil
   ↓
6. Data baru ditambah ke siswaData[]
   ↓
7. renderSiswaTable() dijalankan
   ↓
8. Tabel di-refresh, siswa baru tampil
   ↓
9. Modal ditutup, form direset
```

### **Scenario 3: Ganti Role dari Admin ke Guru**

```
1. User ubah dropdown roleSelect ke "guru"
   ↓
2. Event 'change' triggered
   ↓
3. switchRole('guru') dipanggil
   ↓
4. menuAdmin disembunyikan
   ↓
5. menuGuru ditampilkan (Dashboard, Absensi Kelas, Input Nilai, dll)
   ↓
6. Section yang tidak relevan disembunyikan
   ↓
7. Dashboard tetap tampil (role-agnostic)
   ↓
8. Guru hanya bisa akses fitur yang sesuai dengan rolenya
```

---

## 📊 DATA FLOW DIAGRAM

```
┌──────────────┐
│   HTML DOM   │
└──────────────┘
       ↓
   ┌─────────────────────┐
   │  JavaScript Events  │
   │  - Click           │
   │  - Change          │
   │  - Submit          │
   └─────────────────────┘
       ↓
   ┌──────────────────────────┐
   │  Event Handlers          │
   │  - switchRole()         │
   │  - navigation click     │
   │  - addSiswa/editSiswa   │
   └──────────────────────────┘
       ↓
   ┌──────────────────────────┐
   │  Data Management         │
   │  - siswaData[]           │
   │  - localStorage (future) │
   └──────────────────────────┘
       ↓
   ┌──────────────────────────┐
   │  DOM Manipulation        │
   │  - classList.toggle()    │
   │  - innerHTML             │
   │  - appendChild()          │
   └──────────────────────────┘
       ↓
   ┌──────────────────────────┐
   │  Visual Update           │
   │  - Show/Hide elements    │
   │  - Render data           │
   │  - Update charts         │
   └──────────────────────────┘
```

---

## 🔐 KEAMANAN & BATASAN SAAT INI

### ✅ Yang Sudah Ada:

- Role-based visibility (UI-level)
- Form validation (HTML5)
- CSRF-safe navigation

### ⚠️ Yang Perlu Ditambah (Production):

- Backend authentication & authorization
- Database untuk persist data
- Input sanitization
- HTTPS encryption
- Session management
- Audit logging

---

## 📝 NOTES TEKNIS

### **CSS Classes yang Sering Dipakai:**

- `d-none` (Bootstrap) → `display: none`
- `d-flex` → `display: flex`
- `d-grid` → `display: grid`
- `me-3` → `margin-end: 1rem` (spacing)
- `px-3 py-2` → padding horizontal & vertical

### **Data Attributes untuk Navigasi:**

```html
<a href="#" data-section="dashboard">Dashboard</a>
<!-- JavaScript bisa akses: element.getAttribute('data-section') -->
```

### **Bootstrap Modal:**

```javascript
const modal = bootstrap.Modal.getInstance(document.getElementById("modalId"));
modal.hide(); // Tutup modal
modal.show(); // Buka modal
```

---

## 🎓 KESIMPULAN

Aplikasi ini menggunakan **Single Page Application (SPA)** pattern dimana:

1. **Tidak ada page reload** saat navigasi
2. **Semua konten di-render dynamically** dengan JavaScript
3. **Data disimpan di memory** (sementara)
4. **Role-based access control** di level UI
5. **Reusable components** (form, modal, sections)

Untuk production, diperlukan backend API + database untuk persistent storage dan security yang lebih baik.
