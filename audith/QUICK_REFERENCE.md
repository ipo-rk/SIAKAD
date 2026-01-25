# 🎯 QUICK REFERENCE GUIDE

## 7 NEW SECTIONS - QUICK ACCESS

### 1. Jadwal Pelajaran

- **Path:** Sidebar → Jadwal Pelajaran
- **Features:** Add/Edit/Delete class schedules
- **Table Columns:** Hari, Jam, Kelas, Mata Pelajaran, Guru, Ruang
- **Modal:** modalAddJadwal
- **Data Array:** jadwalData (3 sample schedules)

### 2. Jadwal Ujian

- **Path:** Sidebar → Jadwal Ujian
- **Features:** Add/Edit/Delete exam schedules
- **Table Columns:** Jenis Ujian, Tanggal, Mata Pelajaran, Kelas, Waktu Mulai, Ruang
- **Modal:** modalAddJadwalUjian
- **Data Array:** jadwalUjianData (3 sample exams)

### 3. Nilai Siswa

- **Path:** Sidebar → Nilai Siswa
- **Features:** View/Edit student grades with auto-calculated averages
- **Table Columns:** NIS, Nama, Nilai Harian, UTS, UAS, Rata-rata
- **Filters:** Kelas, Mata Pelajaran, Jenis Penilaian
- **Data Array:** nilaiData (3 sample records)

### 4. Absensi

- **Path:** Sidebar → Absensi
- **Features:** Track student attendance with percentages
- **Table Columns:** NIS, Nama, Hadir, Sakit, Izin, Alfa, Persentase
- **Filters:** Kelas, Bulan
- **Data Array:** absensiData (3 sample records)

### 5. Keuangan (SPP)

- **Path:** Sidebar → Keuangan (SPP)
- **Features:** Record payments, track SPP status
- **Summary Cards:** Total SPP (Rp), Paid Count, Unpaid Count, Expenditures
- **Table Columns:** Tanggal, NIS, Nama, Jenis, Jumlah, Keterangan
- **Modal:** modalTambahPembayaran
- **Data Array:** keuanganData (3 sample transactions)

### 6. Laporan

- **Path:** Sidebar → Laporan
- **Features:** Generate 4 types of PDF reports
- **Reports:** Academic, Attendance, Finance, Master Data
- **Action:** Click "Generate" button for each report type

### 7. Pengaturan Sistem

- **Path:** Sidebar → Pengaturan Sistem
- **Features:** Configure school settings
- **Settings:** Name, Principal, Address, Phone, Academic Year, Semester, SPP, Email
- **Storage:** Saved to localStorage

---

## 🔧 FUNCTION QUICK REFERENCE

### Schedule Functions (Jadwal)

```javascript
renderJadwalTable(); // Display all schedules
addJadwal(e); // Add new schedule from modal
editJadwal(i); // Edit schedule
hapusJadwal(i); // Delete schedule
```

### Exam Schedule Functions (Jadwal Ujian)

```javascript
renderJadwalUjianTable(); // Display all exam schedules
addJadwalUjian(e); // Add new exam from modal
editJadwalUjian(i); // Edit exam schedule
hapusJadwalUjian(i); // Delete exam schedule
```

### Grade Functions (Nilai)

```javascript
renderNilaiTable(); // Display all grades
editNilai(i); // Edit grades
```

### Attendance Functions (Absensi)

```javascript
renderAbsensiTable(); // Display all attendance
editAbsensi(i); // Edit attendance
filterAbsensi(); // Apply filters
```

### Finance Functions (Keuangan)

```javascript
renderKeuanganTable(); // Display all transactions
addKeuangan(e); // Add new transaction
editKeuangan(i); // Edit transaction
hapusKeuangan(i); // Delete transaction
updateKeuanganCounters(); // Update summary cards
```

### Report Functions (Laporan)

```javascript
generateLaporanAkademik(); // Academic report
generateLaporanKehadiran(); // Attendance report
generateLaporanKeuangan(); // Finance report
generateLaporanMaster(); // Master data report
```

### Settings Functions (Pengaturan)

```javascript
saveSettings(); // Save settings to localStorage
resetSettings(); // Reset to defaults
```

---

## 📊 DATA STRUCTURE EXAMPLES

### jadwalData

```javascript
{
  hari: 'Senin',
  jam_mulai: '07:00',
  jam_selesai: '07:40',
  kelas: '8A',
  mapel: 'Matematika',
  guru: 'D. Wonda',
  ruang: '101'
}
```

### nilaiData

```javascript
{
  nis: '10234',
  nama: 'Andi',
  nilai_harian: 78,
  uts: 80,
  uas: 85
  // rata-rata calculated as: (78+80+85)/3 = 81.0
}
```

### keuanganData

```javascript
{
  tanggal: '2024-10-01',
  nis: '10234',
  nama: 'Andi',
  jenis: 'SPP',
  jumlah: 150000,
  keterangan: 'SPP Oktober'
}
```

### absensiData

```javascript
{
  nis: '10234',
  nama: 'Andi',
  hadir: 18,
  sakit: 1,
  izin: 1,
  alfa: 0
  // persentase calculated as: (18/(18+1+1+0))*100 = 90.0%
}
```

---

## 🎯 COMMON TASKS

### To Add a New Schedule

1. Click "Jadwal Pelajaran" in sidebar
2. Click "Tambah Jadwal" button
3. Fill form: Hari, Jam Mulai, Jam Selesai, Kelas, Mapel, Guru, Ruang
4. Click "Simpan"
5. Table updates with new schedule

### To Record a Payment

1. Click "Keuangan (SPP)" in sidebar
2. Click "Catat Pembayaran" button
3. Fill form: Tanggal, Siswa, Jenis, Jumlah, Keterangan
4. Click "Simpan"
5. Table updates and summary counters refresh

### To View Student Grades

1. Click "Nilai Siswa" in sidebar
2. Optional: Filter by Kelas/Mapel/Jenis Penilaian
3. View table with auto-calculated averages
4. Click edit (pen icon) to edit individual grades

### To Check Attendance

1. Click "Absensi" in sidebar
2. Optional: Filter by Kelas and Bulan
3. View table with auto-calculated percentages
4. Percentages show attendance rate for each student

### To Generate a Report

1. Click "Laporan" in sidebar
2. Select report type
3. Click "Generate" button
4. Mock PDF generation (alert confirmation)

### To Configure Settings

1. Click "Pengaturan Sistem" in sidebar
2. Update desired settings
3. Click "Simpan Pengaturan"
4. Settings saved to browser storage

---

## 📱 RESPONSIVE DESIGN

All sections are mobile-friendly:

- ✅ Responsive grid layouts
- ✅ Scrollable tables on small screens
- ✅ Touch-friendly buttons
- ✅ Collapsible sidebar on mobile
- ✅ Modal forms work on all sizes

---

## 🔑 KEY HTML IDs

### Section IDs

```
section-jadwal
section-jadwal-ujian
section-nilai
section-absensi
section-keuangan
section-laporan
section-pengaturan
```

### Table Body IDs

```
tableJadwalBody
tableJadwalUjianBody
tableNilaiBody
tableAbsensiBody
tableKeuanganBody
```

### Modal IDs

```
modalAddJadwal
modalAddJadwalUjian
modalTambahPembayaran
```

### Form IDs

```
formAddJadwal
formAddJadwalUjian
formAddKeuangan
```

### Counter IDs

```
countSPPBulanIni
countSPPLunas
countSPPTunggak
countPengeluaran
```

---

## 🎓 LEARNING NOTES

### Auto-Calculations

- **Rata-rata (Average):** `(nilai_harian + uts + uas) / 3`
- **Persentase (Percentage):** `(hadir / total_hari) * 100`

### Currency Formatting

- **Rupiah Format:** `jumlah.toLocaleString('id-ID')`
- **Prefix:** "Rp " added in display

### localStorage Usage

```javascript
// Save
localStorage.setItem("siakad_settings", JSON.stringify(data));

// Load
const data = JSON.parse(localStorage.getItem("siakad_settings"));

// Delete
localStorage.removeItem("siakad_settings");
```

---

## 🐛 TROUBLESHOOTING

### Section Not Appearing

- Check if element ID matches (section-[name])
- Check if navigation data-section attribute is correct
- Check browser console for JavaScript errors

### Table Not Showing Data

- Check if render function is called: `render[Type]Table()`
- Check if data array is populated with mock data
- Check if table body ID is correct

### Modal Not Opening

- Check modal ID matches button data-bs-target
- Check Bootstrap JS is loaded
- Check form ID in modal body

### Counters Not Updating

- Check if `updateKeuanganCounters()` is called after add/delete
- Check counter element IDs are correct
- Check data array operations are working

---

## 📞 DEVELOPER NOTES

### Testing the System

1. Open admin.html in browser
2. Navigate through each section using sidebar
3. Test Add functionality in each section
4. Test Edit (shows mock alert)
5. Test Delete (with confirmation)
6. Check real-time updates (Keuangan counters)
7. Check responsive design on mobile

### Adding New Features

- Follow naming convention: `[action][Type]`
- Create data array: `const [type]Data = []`
- Create render function: `render[Type]Table()`
- Create CRUD functions: `add[Type](e)`, `edit[Type](i)`, `hapus[Type](i)`
- Add to navigation handler
- Add to sidebar menu

### Mock to Real Data

1. Replace array initialization with API call
2. Replace render function with fetch + render
3. Replace CRUD functions with fetch + method (POST/PUT/DELETE)
4. Add error handling
5. Add loading states
6. Add authentication headers

---

**Version:** 2.0  
**Last Updated:** December 8, 2025  
**Status:** Complete & Ready for Use ✅
