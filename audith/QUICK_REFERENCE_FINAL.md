# 🚀 QUICK REFERENCE - SIAKAD SCRIPT INTEGRATION

**Untuk Developer - Akses Cepat & Cheat Sheet**

---

## 🔐 AUTHENTICATION QUICK START

### Login Demo Accounts

```
Admin:
  Username: admin
  Password: 123456
  Role: admin

Guru:
  Username: guru01
  Password: 123456
  Role: guru

Siswa:
  Username: siswa001
  Password: 123456
  Role: siswa
```

### Session Check

```javascript
// Get current user
const user = JSON.parse(localStorage.getItem("siakad_user"));
console.log(user.name, user.role);

// Check if logged in
if (!localStorage.getItem("siakad_user")) {
  window.location.href = "login.html";
}
```

---

## 📊 DATA ARRAYS & USAGE

### Accessing Data

```javascript
// Di Alpine.js context (@click, x-model, etc)
siswaData; // Array of all siswa
guruData; // Array of all guru
kelasData; // Array of all kelas
mapelData; // Array of all mata pelajaran
jadwalData; // Array of jadwal pelajaran
jadwalUjianData; // Array of jadwal ujian
nilaiData; // Array of nilai siswa
absensiData; // Array of kehadiran
keuanganData; // Array of pembayaran
```

### Data Structures

```javascript
// Siswa
{ nis: '10234', nama: 'Andi', kelas: '8A', agama: 'Islam', status: 'Lunas' }

// Guru
{ nip: '199201011', nama: 'D. Wonda', mapel: 'Matematika', status: 'PNS', telepon: '081234567890', email: 'dwonda@school.id' }

// Kelas
{ kode: '8A', nama: 'VIII A', wali: 'D. Wonda', ruang: '101', jmlSiswa: 28 }

// Mapel
{ kode: 'MTK001', nama: 'Matematika', sks: 4, guru: 'D. Wonda' }

// Jadwal
{ hari: 'Senin', jam_mulai: '07:00', jam_selesai: '07:40', kelas: '8A', mapel: 'Matematika', guru: 'D. Wonda', ruang: '101' }

// Nilai
{ nis: '10234', nama: 'Andi', nilai_harian: 78, uts: 80, uas: 85 }

// Keuangan
{ tanggal: '2024-10-01', nis: '10234', nama: 'Andi', jenis: 'SPP', jumlah: 150000, keterangan: 'SPP Oktober' }
```

---

## 🎮 COMMON OPERATIONS

### CRUD: Tambah Data

```javascript
// Form state
formSiswa: { nis: '10237', nama: 'Doni', kelas: '8A', agama: 'Islam', status: 'Lunas' }

// Tambah ke array
siswaData.push({ ...formSiswa });

// Reset form
formSiswa = { nis: '', nama: '', kelas: '8A', agama: 'Islam', status: 'Lunas' };

// Notify user
showToast('Siswa berhasil ditambahkan', 'success');
```

### CRUD: Edit Data

```javascript
// Saat click edit
editingIndex = 0;
formSiswa = { ...siswaData[0] }; // Copy to form

// Saat submit
siswaData[editingIndex] = { ...formSiswa };
editingIndex = null;
```

### CRUD: Delete Data

```javascript
// Delete
siswaData.splice(index, 1);

// Computed properties auto-update
get totalSiswa() { return this.siswaData.length; }
// totalSiswa otomatis -1
```

---

## 🎯 MODAL OPERATIONS

### Buka Modal

```html
<!-- Trigger -->
<button @click="openAddSiswaModal()">Tambah</button>

<!-- Di adminApp() -->
openAddSiswaModal() { this.showModal = 'siswa'; this.editingIndex = null;
this.resetForms(); }
```

### Modal Template

```html
<div class="modal" x-show="showModal === 'siswa'" @click.away="closeModal()">
  <form @submit.prevent="addSiswa()">
    <input x-model="formSiswa.nis" required />
    <button type="submit">Simpan</button>
    <button @click="closeModal()">Batal</button>
  </form>
</div>
```

---

## 📝 FORM BINDING PATTERNS

### Text Input

```html
<input x-model="formSiswa.nis" type="text" required />
```

### Number Input

```html
<input x-model.number="formKelas.jmlSiswa" type="number" min="0" />
```

### Select Dropdown

```html
<select x-model="formSiswa.kelas" required>
  <option value="8A">8A</option>
  <option value="8B">8B</option>
</select>
```

### Dynamic Dropdown (dari array)

```html
<select x-model="formJadwal.guru" required>
  <option value="">-- Pilih Guru --</option>
  <template x-for="guru in guruData" :key="guru.nip">
    <option :value="guru.nama" x-text="guru.nama"></option>
  </template>
</select>
```

### Date Input

```html
<input x-model="formJadwalUjian.tanggal" type="date" required />
```

### Textarea

```html
<textarea x-model="formKeuangan.keterangan" rows="3"></textarea>
```

---

## 🔄 COMPUTED PROPERTIES

### Akses di Template

```html
<!-- Display count -->
<h3 x-text="totalSiswa">0</h3>

<!-- Conditional render -->
<div x-show="totalSiswa > 0">Ada siswa</div>

<!-- Loop with computed -->
<template x-for="notif in notifikasi">
  <p x-text="notif.title"></p>
</template>
```

### Computed di JavaScript

```javascript
get totalSiswa() {
  return this.siswaData.length;
}

get sppTunggak() {
  return this.totalSiswa - this.sppLunas;
}

get notifikasi() {
  const notifs = [];
  if (this.sppTunggak > 0) {
    notifs.push({
      type: 'danger',
      title: `SPP Tunggakan (${this.sppTunggak} siswa)`
    });
  }
  return notifs;
}
```

---

## 🎨 CONDITIONAL RENDERING

### x-show (CSS display)

```html
<!-- Tampil/sembunyikan tanpa remove dari DOM -->
<div x-show="activeSection === 'dashboard'">Dashboard Content</div>
<div x-show="activeSection === 'data-siswa'">Data Siswa Content</div>
```

### x-if (Remove dari DOM)

```html
<!-- Tampil jika true, remove dari DOM jika false -->
<template x-if="siswaData.length === 0">
  <tr>
    <td colspan="8">Tidak ada data</td>
  </tr>
</template>
```

### x-text (Set text content)

```html
<span x-text="siswa.nama"></span>
```

### x-html (Set innerHTML)

```html
<div x-html="formattedHtml"></div>
```

---

## 🔘 EVENT HANDLING

### Click Event

```html
<button @click="editSiswa(index)">Edit</button>
<button @click="deleteSiswa(index)">Delete</button>
```

### Form Submit

```html
<form @submit.prevent="addSiswa()">
  <!-- .prevent = preventDefault() otomatis -->
</form>
```

### Click Away (Close on outside click)

```html
<div @click.away="closeModal()">
  <!-- Click outside = close modal -->
</div>
```

### Change Event

```html
<select @change="handleClassChange($el.value)"></select>
```

---

## 💡 UTILITY METHODS

### Format Currency

```javascript
formatCurrency(150000);
// Output: "Rp 150.000"
```

### Calculate Average

```javascript
calculateAverage(78, 80, 85);
// Output: 81.0
```

### Format Date

```javascript
getTanggalHariIni();
// Output: "Jumat, 11 Januari 2026"
```

### Show Toast Notification

```javascript
showToast("Siswa berhasil ditambahkan", "success");
showToast("Terjadi kesalahan", "error");
```

---

## 🚨 VALIDATION PATTERNS

### Required Field Check

```javascript
if (!this.formSiswa.nis || !this.formSiswa.nama) {
  alert("NIS dan Nama harus diisi");
  return;
}
```

### Confirmation Dialog

```javascript
if (confirm("Hapus siswa ini?")) {
  this.siswaData.splice(index, 1);
}
```

### Form-level Validation

```html
<input x-model="formSiswa.nis" required />
<!-- Browser auto-validate -->
```

---

## 📊 DATA FLOW CHEAT SHEET

```
USER INTERACTION (click button)
  ↓
EVENT HANDLER (@click, @submit)
  ↓
METHOD CALL (addSiswa, editSiswa, etc)
  ↓
DATA ARRAY UPDATE (siswaData.push/splice)
  ↓
COMPUTED PROPERTIES RECALCULATE (totalSiswa, sppTunggak)
  ↓
TEMPLATE RE-RENDER (x-for, x-if, x-text)
  ↓
UI UPDATE (instant, no refresh)
```

---

## 🔍 DEBUGGING TIPS

### Check Current State

```javascript
// In browser console
console.log(document.__alpine.dataUpdateQueue);
// atau lihat di component directly
```

### Log dalam Template

```html
<!-- Debug log di HTML -->
<span x-text="console.log(siswaData) || 'OK'"></span>
```

### Alpine Devtools

```
Install: Alpine.js DevTools Chrome Extension
Inspect: x-data components, state, computed
```

---

## 🎯 COMMON TASKS

### Task 1: Tambah Guru Baru

```
1. Click "Tambah Guru" button
2. Isi form: NIP, Nama, Mapel, Status, Telepon, Email
3. Click Simpan
4. Guru otomatis muncul di table
5. Dropdown guru di jadwal otomatis update
```

### Task 2: Edit Kelas

```
1. Cari kelas di tabel
2. Click tombol Edit
3. Form terisi data lama
4. Ubah nama kelas, wali, atau ruang
5. Click Simpan
6. Perubahan instant di table
```

### Task 3: Catat Pembayaran SPP

```
1. Click tombol pembayaran/keuangan
2. Pilih siswa dari dropdown
3. Isi tanggal, jenis (SPP), jumlah
4. Click Simpan
5. Total tagihan & pembayaran otomatis update
6. Notifikasi tunggakan update
```

### Task 4: Check Dashboard Real-Time

```
1. Buka dashboard
2. Lihat total siswa, guru, kelas
3. Lihat SPP lunas/tunggak
4. Lihat jadwal hari ini
5. Lihat notifikasi penting
6. Semua data auto-sync saat ada perubahan
```

---

## 📱 MOBILE TIPS

### Responsive Navigation

```
- Mobile: Sidebar collapse, hamburger menu
- Desktop: Sidebar always visible
```

### Touch-Friendly

```
- Buttons minimum 44px height
- Proper spacing untuk touch targets
- Modal pinch-to-zoom friendly
```

---

## ⚙️ CONFIGURATION

### Session Timeout

```javascript
// File: script.js
const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
```

### Demo Account

```javascript
// File: login.js
const demoUsers = {
  admin: { password: "123456", role: "admin", name: "Admin SIAKAD" },
  guru01: { password: "123456", role: "guru", name: "Bpk. D. Wonda" },
  siswa001: { password: "123456", role: "siswa", name: "Yulianus Tebai" },
};
```

---

## 🎓 LEARNING RESOURCES

### Alpine.js Basics

- `x-data` = Define component state
- `x-model` = Two-way binding
- `@click` = Event handler
- `x-for` = Loop template
- `x-if/x-show` = Conditional render
- `x-text` = Set text content

### Bootstrap 5

- Grid system: `container`, `row`, `col-*`
- Components: `btn`, `modal`, `form-control`
- Utilities: `m-*`, `p-*`, `d-flex`, etc

### JavaScript Methods

- `Array.push()` = Add element
- `Array.splice()` = Remove element
- `Array.find()` = Find element
- `Object.assign()` = Copy object
- `JSON.stringify/parse()` = Serialize

---

## ✅ CHECKLIST: SEBELUM GO-LIVE

- [ ] Test login dengan semua role
- [ ] Test tambah/edit/delete semua modul
- [ ] Cek form validation bekerja
- [ ] Cek computed properties update otomatis
- [ ] Test session timeout (24 jam)
- [ ] Test di mobile device
- [ ] Test di berbagai browser
- [ ] Backup data sebelum go-live
- [ ] Train users tentang fitur
- [ ] Create user manual

---

## 🆘 TROUBLESHOOTING

### Modal tidak muncul?

```
Cek: x-show="showModal === 'siswa'"
     Background color: rgba(0,0,0,0.5)
     z-index: 1050 (Bootstrap modal)
```

### Data tidak update?

```
Cek: siswaData adalah array reactive
     Method push/splice digunakan dengan benar
     Computed property dependency correct
```

### Form tidak reset?

```
Cek: resetForms() dipanggil saat close modal
     Semua field direset dengan default value
```

### Logout tidak bekerja?

```
Cek: localStorage.clear() dipanggil
     window.location.href = 'login.html'
     Session data dihapus
```

---

## 📞 SUPPORT & CONTACT

**Untuk pertanyaan teknis:**

- Check documentation files
- Review code comments
- Test di browser devtools
- Enable Alpine.js DevTools

**Files to review:**

- `INTEGRASI_SCRIPT_DETAIL.md` - Full documentation
- `STATUS_INTEGRASI_FINAL.md` - Status report
- `script.js` - Main application logic
- `admin.html` - Template & Alpine directives

---

## 🎉 YOU'RE READY!

Semua yang kamu butuhkan untuk menggunakan SIAKAD sudah tersedia.

**Happy Coding!** 🚀

---

_Last Updated: 11 Januari 2026_  
_Version: 2.0.0 - Quick Reference_
