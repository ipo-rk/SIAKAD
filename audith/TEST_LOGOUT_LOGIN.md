# 🧪 TEST LOGOUT & LOGIN FLOW

## ✅ PERBAIKAN YANG DILAKUKAN

### 1. **Logout Function** (admin.html, guru.html, siswa.html)

**SEBELUM:**

```javascript
setTimeout(() => {
  window.location.replace("login.html"); // ❌ Bisa fail
}, 300);
```

**SESUDAH:**

```javascript
setTimeout(function () {
  window.location.href = "login.html?logout=true"; // ✅ Lebih reliable
}, 100);
```

**Perubahan:**

- ✅ Hapus `localStorage.removeItem()` berulang, gunakan `localStorage.clear()`
- ✅ Hapus sessionStorage juga dengan `sessionStorage.clear()`
- ✅ Kurangi delay dari 300ms ke 100ms untuk lebih cepat
- ✅ Ganti `window.location.replace()` dengan `window.location.href` (lebih compatible)
- ✅ Tambah `?logout=true` parameter untuk tracking

### 2. **Login.js Redirect Logic**

**SEBELUM:**

```javascript
if (!siakad_user) {
  return; // ❌ Tapi form belum ditampilkan!
}
// ... validasi lainnya
showLoginForm(); // Terlambat dijalankan
```

**SESUDAH:**

```javascript
if (!siakad_user) {
  console.log("No session - showing login form");
  showLoginForm(); // ✅ Langsung tampilkan
  return;
}
// ... validasi lainnya
```

**Perubahan:**

- ✅ `showLoginForm()` dipanggil di SETIAP case sebelum return
- ✅ Tambah cek for session timeout (24 jam)
- ✅ Tambah try-catch untuk handle corrupted data
- ✅ Tambah cek untuk unknown role

---

## 🧪 TEST FLOW

### TEST 1: Login sebagai Admin

```
1. Buka login.html (tanpa session)
2. Pilih role "Admin"
3. Username: admin
4. Password: 123456
5. Klik Login
✅ EXPECTED: Redirect ke admin.html
✅ RESULT: [CHECK CONSOLE UNTUK ✅ Valid session message]
```

### TEST 2: Login sebagai Guru

```
1. Buka login.html (tanpa session)
2. Pilih role "Guru"
3. Username: guru01
4. Password: 123456
5. Klik Login
✅ EXPECTED: Redirect ke guru.html
✅ RESULT: [CHECK CONSOLE]
```

### TEST 3: Login sebagai Siswa

```
1. Buka login.html (tanpa session)
2. Pilih role "Siswa"
3. Username: siswa001
4. Password: 123456
5. Klik Login
✅ EXPECTED: Redirect ke siswa.html
✅ RESULT: [CHECK CONSOLE]
```

### TEST 4: Logout dari Admin

```
1. Sudah login sebagai admin (di admin.html)
2. Klik tombol Logout (biasanya di navbar)
3. Klik OK pada confirmation dialog
✅ EXPECTED: localStorage kosong + redirect ke login.html
✅ RESULT: [CHECK CONSOLE UNTUK ✅ Logout dimulai message]
```

### TEST 5: Logout kemudian Login lagi

```
1. Sudah logout (di login.html)
2. Buka developer console (F12)
3. Cek localStorage - HARUS KOSONG (tidak ada siakad_user)
4. Login lagi
✅ EXPECTED: Berhasil login dengan session baru
✅ RESULT: [CHECK localStorage untuk siakad_user baru]
```

### TEST 6: Session Timeout (24 jam)

```
1. Login
2. Buka console: localStorage.getItem('siakad_user')
3. Edit manual: ubah loginTime ke 25 jam lalu
4. Refresh page
✅ EXPECTED: Redirect ke login.html (session expired)
✅ RESULT: [CHECK CONSOLE UNTUK ⏱️ Session expired message]
```

### TEST 7: Manually clear localStorage then refresh

```
1. Login sebagai admin
2. Buka console (F12)
3. Jalankan: localStorage.clear()
4. Refresh page
✅ EXPECTED: Redirect ke login.html (no session)
✅ RESULT: [CHECK CONSOLE UNTUK ✅ No session message]
```

---

## 📋 CONSOLE LOG MESSAGES YANG HARUS MUNCUL

### Saat Login:

```
✅ No session - showing login form
[User login success]
✅ Session valid - redirect to admin
✅ Auth OK: Admin SIAKAD (ADMIN)
✅ Dashboard loaded for: Admin SIAKAD
```

### Saat Logout:

```
🔄 Logout dimulai...
↪️ Redirect ke login.html...
✅ No session - showing login form
```

### Saat Session Expired:

```
⏱️ Session expired
✅ No session - showing login form
```

---

## 🔍 DEBUG COMMANDS

**Check localStorage:**

```javascript
// Di console (F12)
localStorage.getItem("siakad_user");
localStorage.clear();
```

**Check sessionStorage:**

```javascript
sessionStorage.clear();
```

**Manual login test:**

```javascript
const testSession = {
  username: "admin",
  name: "Admin SIAKAD",
  role: "admin",
  loginTime: new Date().toISOString(),
};
localStorage.setItem("siakad_user", JSON.stringify(testSession));
```

---

## ✅ CHECKLIST

- [x] logout() menghapus localStorage.siakad_user
- [x] logout() menghapus sessionStorage
- [x] logout() redirect ke login.html
- [x] login.js tampilkan form jika tidak ada session
- [x] login.js redirect jika ada session valid
- [x] login.js clear session jika timeout 24 jam
- [x] Syntax check: OK (node -c)
- [ ] Manual testing semua flow
- [ ] Console log messages sesuai

---

## 🚀 NEXT STEP

1. Buka browser dan test flow di atas
2. Buka Developer Tools (F12) dan lihat console messages
3. Verifikasi localStorage di Application tab
4. Report hasil testing
