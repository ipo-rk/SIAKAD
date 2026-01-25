# 🔐 SISTEM LOGIN & AUTENTIKASI SIAKAD

## 📋 Overview

Sistem login SIAKAD menggunakan **localStorage** untuk menyimpan session user dan redirect otomatis ke dashboard sesuai role.

---

## 🏗️ Alur Login

```
┌─────────────────┐
│  login.html     │  ← User memasukkan username, password, dan pilih role
└────────┬────────┘
         │
         ↓
┌─────────────────────────────────────┐
│  Validasi Credential                │
│  - Cek username di database         │
│  - Cek password                     │
│  - Cek role sesuai user             │
└────────┬────────────────────────────┘
         │
         ├─ ❌ Login Gagal → Tampilkan Error
         │
         ├─ ✅ Login Berhasil
         │
         ↓
┌──────────────────────────────┐
│  Simpan Session ke localStorage:
│  {
│    username: "admin",
│    name: "Admin SIAKAD",
│    role: "admin",
│    loginTime: "2025-01-01T..."
│  }
└────────┬─────────────────────┘
         │
         ↓
┌────────────────────────────────────┐
│  Redirect ke Dashboard:            │
│  - role: admin   → admin.html      │
│  - role: guru    → guru.html       │
│  - role: siswa   → siswa.html      │
└────────────────────────────────────┘
```

---

## 📝 Demo Akun

### **Admin**

- Username: `admin`
- Password: `123456`

### **Guru**

- Username: `guru01` atau `guru02`
- Password: `123456`

### **Siswa**

- Username: `siswa001`, `siswa002`, `siswa003`
- Password: `123456`

---

## 🔑 Database Demo

```javascript
const demoUsers = {
  admin: {
    password: "123456",
    role: "admin",
    name: "Admin SIAKAD",
  },
  guru01: {
    password: "123456",
    role: "guru",
    name: "Bpk. D. Wonda",
  },
  guru02: {
    password: "123456",
    role: "guru",
    name: "Ibu M. Dogopia",
  },
  siswa001: {
    password: "123456",
    role: "siswa",
    name: "Yulianus Tebai",
  },
  siswa002: {
    password: "123456",
    role: "siswa",
    name: "Maria Dogopia",
  },
  siswa003: {
    password: "123456",
    role: "siswa",
    name: "Andi Wijaya",
  },
};
```

---

## 🎯 Fitur Login

### **1. Role Selection (Pemilihan Role)**

User bisa memilih role mereka sebelum login dengan 3 pilihan:

- **Admin** (<i class="fa fa-shield"></i>)
- **Guru** (<i class="fa fa-chalkboard-teacher"></i>)
- **Siswa** (<i class="fa fa-user-graduate"></i>)

### **2. Input Validation (Validasi Input)**

```javascript
function handleLogin(e) {
  e.preventDefault();

  // 1. Ambil input user
  const role = document.querySelector('input[name="role"]:checked').value;
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  // 2. Validasi: username ada?
  if (!demoUsers[username]) {
    errorElement.textContent = "❌ Username tidak ditemukan!";
    return;
  }

  // 3. Validasi: password benar?
  if (user.password !== password) {
    errorElement.textContent = "❌ Password salah!";
    return;
  }

  // 4. Validasi: role sesuai?
  if (user.role !== role) {
    errorElement.textContent = `❌ User ini adalah ${user.role.toUpperCase()}!`;
    return;
  }
}
```

### **3. Session Storage (localStorage)**

```javascript
// Simpan session ke localStorage
const sessionData = {
  username: username,
  name: user.name,
  role: role,
  loginTime: new Date().toISOString(),
};

localStorage.setItem("siakad_user", JSON.stringify(sessionData));
```

### **4. Auto Redirect (Redirect Otomatis)**

```javascript
// Redirect ke dashboard sesuai role
if (role === "admin") {
  window.location.href = "admin.html";
} else if (role === "guru") {
  window.location.href = "guru.html";
} else if (role === "siswa") {
  window.location.href = "siswa.html";
}
```

### **5. Auto Login (Login Otomatis)**

```javascript
// Jika user sudah login, langsung masuk ke dashboard
window.addEventListener("load", () => {
  const siakad_user = localStorage.getItem("siakad_user");
  if (siakad_user) {
    const user = JSON.parse(siakad_user);
    if (user.role === "admin") {
      window.location.href = "admin.html";
    } else if (user.role === "guru") {
      window.location.href = "guru.html";
    } else if (user.role === "siswa") {
      window.location.href = "siswa.html";
    }
  }
});
```

---

## 🛡️ Authentication di Dashboard

Setiap dashboard (admin.html, guru.html, siswa.html) memiliki authentication check:

```javascript
// Di admin.html
function checkAuth() {
  const siakad_user = localStorage.getItem("siakad_user");
  if (!siakad_user) {
    window.location.href = "login.html"; // ← Tidak ada session, kembali ke login
    return null;
  }

  const user = JSON.parse(siakad_user);

  // ← Cek role (admin.html hanya untuk admin)
  if (user.role !== "admin") {
    window.location.href = "login.html";
  }
  return user;
}

const user = checkAuth();

// Update nama user di navbar
if (user) {
  document.getElementById("userName").textContent = user.name;
}
```

**Penjelasan:**

1. Cek localStorage ada session `siakad_user`
2. Jika tidak ada → redirect ke login.html
3. Jika ada, tapi role tidak sesuai → redirect ke login.html
4. Jika semuanya sesuai → tampilkan dashboard

---

## 📍 File Structure

```
Belajar-2/
├── login.html           ← Halaman login (public)
├── admin.html           ← Dashboard admin (protected, hanya admin)
├── guru.html            ← Dashboard guru (protected, hanya guru)
├── siswa.html           ← Dashboard siswa (protected, hanya siswa)
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
└── LOGIKA_APLIKASI.md   ← Dokumentasi logika
```

---

## 🔓 Logout Flow

```javascript
function logout() {
  if (confirm("Apakah Anda yakin ingin logout?")) {
    localStorage.removeItem("siakad_user"); // ← Hapus session
    window.location.href = "login.html"; // ← Redirect ke login
  }
}
```

**Alur:**

1. User klik tombol Logout
2. Konfirmasi logout
3. Hapus session dari localStorage
4. Redirect ke login.html

---

## 🌐 User Journey

### **Scenario: Admin Login & Logout**

```
1. User membuka login.html
   ↓
2. Pilih role "Admin"
   ↓
3. Masukkan username: "admin"
   ↓
4. Masukkan password: "123456"
   ↓
5. Klik tombol Login
   ↓
6. System validasi credentials ✓
   ↓
7. Simpan session ke localStorage
   ↓
8. Redirect ke admin.html
   ↓
9. admin.html cek localStorage ✓ (sudah login & role = admin)
   ↓
10. Tampilkan dashboard admin
    - Sidebar menu admin
    - Summary cards
    - Data siswa, guru, etc
   ↓
11. User klik Logout
    ↓
12. Hapus session dari localStorage
    ↓
13. Redirect ke login.html
```

### **Scenario: User Akses Dashboard Tanpa Login**

```
1. User akses guru.html langsung (tanpa login)
   ↓
2. checkAuth() dipanggil
   ↓
3. localStorage tidak ada siakad_user
   ↓
4. Redirect ke login.html
   ↓
5. User harus login terlebih dahulu
```

### **Scenario: Guru Coba Akses admin.html**

```
1. Guru login dengan username: "guru01"
   ↓
2. Session disimpan: { role: "guru" }
   ↓
3. Redirect ke guru.html
   ↓
4. User coba akses admin.html
   ↓
5. checkAuth() di admin.html cek role
   ↓
6. if (user.role !== 'admin') ← TRUE
   ↓
7. Redirect ke login.html
   ↓
8. User tidak bisa akses dashboard admin
```

---

## 💾 localStorage Data Structure

```json
{
  "siakad_user": {
    "username": "admin",
    "name": "Admin SIAKAD",
    "role": "admin",
    "loginTime": "2025-01-01T10:30:00.000Z"
  }
}
```

**Keterangan:**

- `username`: Username yang login
- `name`: Nama lengkap user
- `role`: Role user (admin/guru/siswa)
- `loginTime`: Waktu login (ISO format)

---

## 🔄 Session Management

### **Session Berlaku Selamanya (Sampai Logout)**

Karena menggunakan localStorage, session user akan tetap ada meskipun browser ditutup.

```javascript
// Browser ditutup, dibuka lagi
window.addEventListener("load", () => {
  const siakad_user = localStorage.getItem("siakad_user");
  if (siakad_user) {
    // Session masih ada, langsung ke dashboard
    // (tanpa perlu login lagi)
  }
});
```

### **Menghapus Session (Logout)**

```javascript
localStorage.removeItem("siakad_user");
```

---

## 🚀 Testing Login

### **Test 1: Admin Login**

1. Buka login.html
2. Pilih role "Admin"
3. Username: `admin`, Password: `123456`
4. Klik Login
5. **Expected:** Masuk ke admin.html dengan menu admin

### **Test 2: Guru Login**

1. Buka login.html
2. Pilih role "Guru"
3. Username: `guru01`, Password: `123456`
4. Klik Login
5. **Expected:** Masuk ke guru.html dengan menu guru

### **Test 3: Siswa Login**

1. Buka login.html
2. Pilih role "Siswa"
3. Username: `siswa001`, Password: `123456`
4. Klik Login
5. **Expected:** Masuk ke siswa.html dengan menu siswa

### **Test 4: Wrong Credential**

1. Buka login.html
2. Username: `admin`, Password: `salah`
3. Klik Login
4. **Expected:** Error message "Password salah!"

### **Test 5: Direct Access Without Login**

1. Buka guru.html langsung (tanpa login dulu)
2. **Expected:** Auto redirect ke login.html

### **Test 6: Logout**

1. Setelah login, klik dropdown profile
2. Klik Logout
3. **Expected:** Redirect ke login.html, session dihapus

---

## ⚠️ Keamanan (Production Notes)

### **Saat Ini (Demo):**

✅ Data user hardcoded di client (OK untuk demo)
✅ Password tidak di-hash (OK untuk demo)
✅ Session di localStorage (OK untuk demo)

### **Untuk Production:**

🔴 **HARUS** menggunakan backend API

- POST /api/login (validasi di server)
- Return JWT token
- Store token di localStorage/sessionStorage
- Setiap request kirim token di header Authorization
- Backend validasi token & role

---

## 📚 Contoh Session Usage

```javascript
// Di mana saja di aplikasi, bisa akses user data
const siakad_user = localStorage.getItem("siakad_user");
if (siakad_user) {
  const user = JSON.parse(siakad_user);

  console.log(user.username); // "admin"
  console.log(user.name); // "Admin SIAKAD"
  console.log(user.role); // "admin"
  console.log(user.loginTime); // "2025-01-01T..."
}
```

---

## 🎓 Kesimpulan

**Sistem Login SIAKAD:**

1. ✅ User input username, password, pilih role
2. ✅ Validasi credential di client (demo)
3. ✅ Simpan session ke localStorage
4. ✅ Redirect ke dashboard sesuai role
5. ✅ Dashboard melakukan auth check
6. ✅ User bisa logout & hapus session
7. ✅ Session persisten (sampai logout)

**Next Step untuk Production:**

- Move authentication ke backend
- Implement JWT token
- Hash password
- Add session timeout
- Implement refresh token
