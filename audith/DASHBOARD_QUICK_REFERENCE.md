# 🚀 DASHBOARD QUICK REFERENCE GUIDE

**For**: Developers & Maintainers  
**Project**: SIAKAD v2.0 - SMP YPPGI BOMOU  
**Date**: 11 Januari 2026

---

## 📋 QUICK INDEX

1. [Dashboard Computed Properties](#dashboard-computed-properties)
2. [Dashboard Methods](#dashboard-methods)
3. [HTML Bindings](#html-bindings)
4. [Common Tasks](#common-tasks)
5. [Troubleshooting](#troubleshooting)

---

## 📊 DASHBOARD COMPUTED PROPERTIES

### Real-time Data

```javascript
// Summary counts (auto-update)
totalSiswa; // Count of all students
totalGuru; // Count of all teachers
totalKelas; // Count of all classes
totalMapel; // Count of all subjects

// Finance data
totalTagihanAktif; // Sum of all SPP bills
totalPembayaranBulanIni; // Sum of this month payments
sppLunas; // Count of paid students
sppTunggak; // Count of unpaid students

// Schedule (filtered by day)
jadwalHariIni; // Schedule for today

// Notifications (generated & sorted)
notifikasi; // Sorted by priority (danger > warning > info)
```

### Usage in HTML

```html
<!-- Display a value -->
<h3 x-text="totalSiswa">0</h3>

<!-- Format currency -->
<strong x-text="formatCurrency(totalTagihanAktif)">Rp 0</strong>

<!-- Loop through data -->
<template x-for="jadwal in jadwalHariIni">
  <div x-text="jadwal.mapel"></div>
</template>

<!-- Conditional render -->
<template x-if="jadwalHariIni.length === 0">
  <p>Tidak ada jadwal hari ini</p>
</template>
```

---

## 🎯 DASHBOARD METHODS

### Public Methods (Call from HTML)

```javascript
// Open modals
openAddSiswaModal();
openAddGuruModal();

// Chart operations
downloadChart();

// Dashboard utilities
getTanggalHariIni(); // Returns formatted date
getStatusJadwal(jamSelesai); // Returns: Aktif/Akan Datang/Selesai
formatCurrency(value); // Format to Rp notation
```

### Usage Examples

```html
<!-- Button click event -->
<button @click="openAddSiswaModal()">Tambah Siswa</button>

<!-- Display date -->
<small x-text="getTanggalHariIni()">Senin, 01 Januari 2025</small>

<!-- Dynamic status badge -->
<span
  :class="getStatusJadwal(jadwal.jam_selesai) === 'Aktif' ? 'bg-success' : 'bg-secondary'"
  x-text="getStatusJadwal(jadwal.jam_selesai)"
  >Aktif</span
>

<!-- Export chart -->
<button onclick="downloadChart()">Export Chart</button>
```

---

## 🔗 HTML BINDINGS

### Data Binding Patterns

```html
<!-- Text content -->
<span x-text="property">Default Value</span>

<!-- HTML content (use carefully) -->
<div x-html="htmlString"></div>

<!-- CSS classes -->
<div :class="condition ? 'class-true' : 'class-false'"></div>
<div :class="{ 'active': isActive, 'disabled': isDisabled }"></div>

<!-- Attributes -->
<img :src="imageUrl" :alt="imageName" />
<a :href="link" :title="linkTitle">Link</a>

<!-- Event listeners -->
<button @click="methodName()">Click</button>
<button @click.away="closeModal()">Close</button>
<button @click.stop="stopPropagation()">Stop</button>

<!-- Form inputs -->
<input x-model="formData.name" @input="handleChange()" />
<select x-model="selectedValue"></select>

<!-- Looping -->
<template x-for="(item, index) in items" :key="index">
  <div x-text="item.name"></div>
</template>

<!-- Conditionals -->
<template x-if="condition">
  <div>Show when true</div>
</template>
<div x-show="condition">Show with CSS</div>
```

---

## 📝 COMMON TASKS

### Task 1: Add New Dashboard Computed Property

```javascript
// In script.js, inside adminApp() return object:

get propertyName() {
    // Calculate or filter data
    return this.dataArray
        .filter(item => item.property === value)
        .reduce((sum, item) => sum + item.amount, 0);
}
```

Then use in HTML:

```html
<h3 x-text="propertyName">0</h3>
```

### Task 2: Add New Dashboard Method

```javascript
// In script.js, inside adminApp() return object:

methodName(param1, param2) {
    // Do something
    console.log(param1, param2);
    this.showToast('Action completed', 'success');
},

// Or for action methods:
openMyModal() {
    this.showModal = 'mymodal';
    this.editingIndex = null;
    this.resetForms();
}
```

Then use in HTML:

```html
<button @click="methodName('value1', 'value2')">Execute</button>
```

### Task 3: Add Notification

```javascript
// Modify get notifikasi() computed property:

get notifikasi() {
    const notifs = [];

    // Add your notification
    if (this.customCondition) {
        notifs.push({
            type: 'info',              // danger, warning, info
            icon: 'fa-bell',           // FontAwesome icon
            title: 'Your message',
            time: 'Just now',
            priority: 2                // Lower number = higher priority
        });
    }

    return notifs.sort((a, b) => a.priority - b.priority);
}
```

### Task 4: Update Dashboard When Data Changes

```javascript
// Data is automatically reactive!
// Just modify the data array:

this.siswaData.push(newStudent); // Auto-updates totalSiswa
this.siswaData.splice(index, 1); // Auto-updates totalSiswa
this.keuanganData.push(payment); // Auto-updates totalPembayaranBulanIni

// No manual DOM update needed!
```

### Task 5: Format Currency in HTML

```html
<!-- Use the formatCurrency method -->
<strong x-text="formatCurrency(totalTagihanAktif)">Rp 0</strong>

<!-- Output: Rp 12.450.000 -->
```

### Task 6: Create Dynamic Badge

```html
<!-- Use conditional CSS class -->
<span :class="getStatusBadgeClass(status)" x-text="status"> Status </span>

<!-- CSS class is applied based on status value -->
```

---

## 🐛 TROUBLESHOOTING

### Issue: Data not updating in dashboard

**Solution**: Ensure you're modifying the data array directly

```javascript
// ✅ Correct
this.siswaData.push(newItem);

// ❌ Wrong
this.siswaData = [...this.siswaData, newItem]; // Don't reassign
```

### Issue: Modal won't open

**Solution**: Check modal id matches Bootstrap data-bs-target

```html
<!-- Modal definition -->
<div class="modal" id="modalAddSiswa">...</div>

<!-- Button -->
<button data-bs-toggle="modal" data-bs-target="#modalAddSiswa">Open</button>

<!-- Method -->
<button @click="showModal = 'siswa'">Also works</button>
```

### Issue: Computed property not updating

**Solution**: Make sure it returns a new value or references reactive data

```javascript
// ✅ Correct
get total() {
    return this.items.length;  // Reactive to items changes
}

// ❌ Wrong
totalValue = this.items.length;  // Not reactive
```

### Issue: Chart not rendering

**Solution**: Ensure canvas element exists and Chart.js is loaded

```html
<!-- Must have matching ID -->
<canvas id="chartKehadiran" height="120"></canvas>

<!-- Check browser console for errors -->
```

### Issue: Alpine.js not initializing

**Solution**: Check order of script loading

```html
<!-- Order matters! -->
<script src="chart.js"></script>
<!-- 1st -->
<script defer src="alpinejs"></script>
<!-- 2nd (defer) -->
<script src="script.js"></script>
<!-- 3rd -->
<script src="admin-init.js"></script>
<!-- 4th (DOMContentLoaded) -->
```

### Issue: Method not found error

**Solution**: Ensure method is inside the return object

```javascript
function adminApp() {
    return {
        myMethod() {  // ✅ Inside return
            ...
        },

        otherProperty: 'value'
    };
}

// NOT outside:
function myMethod() {  // ❌ Won't be accessible
    ...
}
```

---

## 🎯 COMMON PATTERNS

### Pattern 1: Two-way Binding (Form)

```html
<input x-model="formSiswa.nama" class="form-control" />
<input x-model="formSiswa.kelas" class="form-control" />

<!-- Button to save -->
<button @click="addSiswa()">Simpan</button>

<!-- Data automatically syncs! -->
```

### Pattern 2: Conditional Class

```html
<div :class="isActive ? 'text-success' : 'text-danger'">Status</div>

<!-- Or multiple classes -->
<div
  :class="{
    'text-success': isActive,
    'text-danger': !isActive,
    'font-bold': isPriority
}"
>
  Status
</div>
```

### Pattern 3: Loop with Index

```html
<template x-for="(item, index) in items" :key="index">
  <div>
    <span x-text="index + 1"></span>
    <!-- 1, 2, 3... -->
    <span x-text="item.name"></span>
  </div>
</template>
```

### Pattern 4: Empty State

```html
<!-- Show when has data -->
<template x-if="items.length > 0">
  <div>
    <template x-for="item in items">
      <div x-text="item.name"></div>
    </template>
  </div>
</template>

<!-- Show when empty -->
<template x-if="items.length === 0">
  <div class="text-muted">Tidak ada data</div>
</template>
```

### Pattern 5: Modal with Form Reset

```javascript
openAddModal() {
    this.showModal = 'modalname';      // Show modal
    this.editingIndex = null;           // Reset edit mode
    this.resetForms();                  // Clear form
},

resetForms() {
    this.formData = {
        field1: '',
        field2: 0,
        field3: 'default'
    };
}
```

---

## 📚 REFERENCE DATA STRUCTURES

### Dashboard Data Arrays

```javascript
// Siswa data
siswaData: [
  {
    nis: "10234",
    nama: "Andi",
    kelas: "8A",
    agama: "Kristen",
    status: "Lunas",
  },
];

// Guru data
guruData: [
  {
    nip: "199201011",
    nama: "D. Wonda",
    mapel: "Matematika",
    status: "PNS",
    telepon: "081...",
    email: "...",
  },
];

// Jadwal data
jadwalData: [
  {
    hari: "Senin",
    jam_mulai: "07:00",
    jam_selesai: "07:40",
    kelas: "8A",
    mapel: "Matematika",
    guru: "D. Wonda",
    ruang: "101",
  },
];

// Keuangan data
keuanganData: [
  {
    tanggal: "2024-10-01",
    nis: "10234",
    nama: "Andi",
    jenis: "SPP",
    jumlah: 150000,
    keterangan: "...",
  },
];
```

---

## ✅ VERIFICATION CHECKLIST FOR NEW FEATURES

Before deploying new dashboard features:

- [ ] Feature uses computed property or method
- [ ] HTML binding is correct
- [ ] Data updates automatically (no manual refresh)
- [ ] Empty states handled
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Accessibility check (alt text, labels, etc)
- [ ] Performance acceptable
- [ ] Documentation updated

---

## 🔗 USEFUL LINKS

- Alpine.js Docs: https://alpinejs.dev
- Bootstrap 5 Docs: https://getbootstrap.com
- FontAwesome Icons: https://fontawesome.com
- Chart.js Docs: https://www.chartjs.org

---

**Quick Reference v1.0**  
**Last Updated**: 11 Januari 2026  
**For**: SIAKAD v2.0 Dashboard Developers
