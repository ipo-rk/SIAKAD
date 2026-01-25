# Avatar Upload Feature - Dokumentasi

**Tanggal:** 9 Desember 2025  
**Status:** ✅ Complete & Ready

---

## 📋 Ringkasan Fitur

Fitur **Avatar Upload** memungkinkan user untuk mengganti avatar dengan mengklik pada gambar avatar. Avatar custom akan disimpan di localStorage dan persistent across sessions.

---

## 🎯 Cara Menggunakan

### Step 1: Klik Avatar

Klik pada avatar di 2 tempat:

- **Topbar**: Avatar kecil di sebelah kanan atas (dropdown menu)
- **Profil Saya**: Avatar besar di halaman profil

```
Topbar Avatar (36x36px)          Profil Avatar (150x150px)
     ┌──────┐                          ┌──────────┐
     │ IMG  │ ← Click here             │   IMG    │ ← Click here
     └──────┘                          └──────────┘
```

### Step 2: Pilih Gambar

File picker akan terbuka secara otomatis. Pilih gambar yang ingin digunakan sebagai avatar.

**Format yang diperbolehkan:**

- ✅ JPG, PNG, GIF, WebP, BMP
- ❌ File bukan gambar
- ❌ File > 5MB

### Step 3: Upload & Simpan

Gambar akan langsung:

1. ✅ Dikonversi ke Data URL
2. ✅ Disimpan di localStorage
3. ✅ Ditampilkan di kedua avatar (topbar + profil)
4. ✅ Toast notifikasi "Avatar berhasil diubah!" muncul

---

## 💾 Data Storage

Avatar disimpan dalam format **Base64 Data URL** di localStorage:

```javascript
localStorage.getItem("siakad_custom_avatar");
// Result: "data:image/png;base64,iVBORw0KGgoAAAANS..."
```

**Saat reload halaman:**

- Avatar custom dimuat dari localStorage otomatis
- Jika tidak ada custom avatar, gunakan avatar default (ui-avatars.com)

---

## 🎨 Visual Feedback

Saat hover pada avatar, terjadi efek:

- **Scale up**: Gambar membesar 5% (1.05x)
- **Brightness**: Gambar sedikit lebih gelap

```css
#userAvatar:hover {
  transform: scale(1.05);
  filter: brightness(0.9);
}
```

---

## 📂 File yang Dimodifikasi

| File                   | Changes                                       |
| ---------------------- | --------------------------------------------- |
| `assets/js/siswa.js`   | Tambah fungsi avatar upload + event listeners |
| `assets/css/style.css` | Tambah CSS hover effects                      |
| `siswa.html`           | _(No changes)_ Avatar sudah ada di HTML       |

---

## 🔧 Fungsi-Fungsi Baru

### 1. `triggerAvatarUpload()`

```javascript
function triggerAvatarUpload() {
  // Buat hidden file input jika belum ada
  // Trigger file picker saat avatar diklik
  // Accept hanya file gambar
}
```

**Dipanggil oleh:**

- Click event pada `#userAvatar`
- Click event pada `#profilFoto`

---

### 2. `handleAvatarUpload(event)`

```javascript
function handleAvatarUpload(event) {
  // Validasi file type (harus gambar)
  // Validasi file size (max 5MB)
  // Konversi file ke Base64 Data URL
  // Simpan ke localStorage
  // Update UI (avatar images)
  // Tampilkan toast notifikasi
}
```

**Validasi:**

- File type: `image/*` (JPG, PNG, GIF, WebP, BMP, etc.)
- File size: Maksimal 5MB
- Error handling: Graceful error messages via toast

---

### 3. Modifikasi `initializeUserInfo()`

```javascript
// Check localStorage untuk custom avatar
const storedAvatar = localStorage.getItem("siakad_custom_avatar");
let avatarUrl = storedAvatar || defaultAvatarUrl;

// Make avatars clickable
userAvatar.addEventListener("click", triggerAvatarUpload);
profilFoto.addEventListener("click", triggerAvatarUpload);

// Add cursor pointer
userAvatar.style.cursor = "pointer";
profilFoto.style.cursor = "pointer";
```

---

## 📊 Flow Diagram

```
User klik avatar (topbar atau profil)
           ↓
   triggerAvatarUpload()
           ↓
  Create/Get file input element
           ↓
      Open file picker
           ↓
  User select image file
           ↓
   handleAvatarUpload(event)
           ↓
┌──────────────────────────────┐
│ Validate file:               │
│ • Type = image/* ✓          │
│ • Size < 5MB ✓              │
└──────────────────────────────┘
           ↓
┌──────────────────────────────┐
│ Read file as Data URL:       │
│ "data:image/png;base64,..." │
└──────────────────────────────┘
           ↓
┌──────────────────────────────┐
│ Save to localStorage:        │
│ siakad_custom_avatar = URL   │
└──────────────────────────────┘
           ↓
┌──────────────────────────────┐
│ Update UI:                   │
│ • userAvatar.src = URL      │
│ • profilFoto.src = URL      │
└──────────────────────────────┘
           ↓
   Toast: "Avatar berhasil diubah!"
           ↓
       ✅ Complete
```

---

## 🧪 Testing Checklist

✅ Avatar di topbar clickable  
✅ Avatar di profil clickable  
✅ File picker opens on click  
✅ File type validation (only images)  
✅ File size validation (max 5MB)  
✅ Avatar updates immediately  
✅ Avatar persists on reload  
✅ Toast notification appears  
✅ Hover effects work  
✅ Console logging for debugging  
✅ Error handling graceful  
✅ No JavaScript errors

---

## 🧬 Console Logs

Saat avatar upload, console akan menampilkan:

```javascript
[09/12/2025, 16:30:45] ℹ️ Avatar click triggered, initiating upload...
[09/12/2025, 16:30:45] ℹ️ Created hidden file input element
[09/12/2025, 16:30:50] ℹ️ Processing avatar file: photo.png (245.50KB)
[09/12/2025, 16:30:50] ✅ Avatar saved to localStorage
[09/12/2025, 16:30:50] ✅ Avatar images updated
```

---

## 🐛 Error Handling

Semua error ditangani gracefully dengan toast notifications:

| Error              | Message                                | Action               |
| ------------------ | -------------------------------------- | -------------------- |
| No file selected   | _(Silent - no action)_                 | Tetap bisa klik lagi |
| File bukan gambar  | "Hanya file gambar yang diperbolehkan" | Toast warning        |
| File terlalu besar | "Ukuran file maksimal 5MB"             | Toast warning        |
| File read error    | "Gagal membaca file"                   | Toast error          |
| General error      | "Gagal mengganti avatar"               | Toast error          |

---

## 💡 Fitur Bonus

### 1. Automatic Default Avatar

Jika user belum upload avatar custom, sistem auto-generate avatar dari nama user:

```javascript
// Default jika tidak ada siakad_custom_avatar:
`https://ui-avatars.com/api/?name=${encodeURIComponent(
  displayName
)}&background=10b981&color=fff`;
```

### 2. Persistent Storage

Avatar tetap tersimpan meskipun:

- ✅ Halaman di-refresh (F5)
- ✅ Browser ditutup dan dibuka lagi
- ✅ User pindah halaman lain
- ✅ Hanya hilang jika clear localStorage atau logout

### 3. Base64 Compression

File gambar dikonversi ke Base64 untuk:

- ✅ Mudah disimpan di localStorage
- ✅ Tidak perlu server untuk store image
- ✅ Portable across devices

---

## ⚠️ Limitasi & Catatan

1. **localStorage Limit**: Browser typically supports 5-10MB localStorage per domain

   - Base64 encoding memerlukan storage ~33% lebih besar dari file size
   - Jika image 3MB, akan memerlukan ~4MB storage

2. **Device-Specific**: Avatar hanya tersimpan di device ini

   - Jika login di device lain, avatar kembali default
   - Saat backend API integration, bisa save ke server database

3. **No Cropping/Editing**: User tidak bisa crop atau edit image

   - Image diupload apa adanya
   - Jika oversized, file size validation akan reject

4. **Session Persistence**: Avatar persists sampai:
   - User explicit clear localStorage
   - User logout dan login ulang
   - Browser clear cache/cookies (depending settings)

---

## 🚀 Future Enhancements

Fitur yang bisa ditambah:

- [ ] Image cropping/resizing sebelum save
- [ ] Drag & drop upload support
- [ ] Avatar preview sebelum final save
- [ ] Backend API integration untuk multi-device sync
- [ ] Avatar size optimization/compression
- [ ] Support untuk avatar dari URL external
- [ ] Avatar color picker (fallback ke default avatar)

---

## 🔐 Security Notes

**Current Implementation (Client-side only):**

- ✅ File type validation
- ✅ File size limit (5MB)
- ✅ Stored locally in browser

**Production Recommendations:**

- [ ] Implement server-side file upload validation
- [ ] Use CDN/Object Storage (S3, GCS, etc.) untuk image hosting
- [ ] Implement image resizing/optimization on backend
- [ ] Add CORS headers untuk secure image loading
- [ ] Implement token-based authentication untuk API
- [ ] Add rate limiting untuk upload requests

---

## 📱 Browser Compatibility

✅ Chrome/Edge (88+)  
✅ Firefox (85+)  
✅ Safari (14+)  
✅ Mobile browsers (iOS Safari, Chrome Mobile)  
✅ localStorage API support required

---

## 🎓 Code Example

```html
<!-- HTML: Avatar elements sudah ada di siswa.html -->
<img id="userAvatar" src="..." class="rounded-circle" width="36" height="36" />
<img
  id="profilFoto"
  src="..."
  class="rounded-circle"
  style="width: 150px; height: 150px;"
/>
```

```javascript
// JavaScript: Otomatis attach click listeners
function initializeUserInfo() {
  const userAvatar = document.getElementById("userAvatar");
  if (userAvatar) {
    userAvatar.style.cursor = "pointer";
    userAvatar.addEventListener("click", triggerAvatarUpload);
  }
}

// Trigger upload
function triggerAvatarUpload() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.addEventListener("change", handleAvatarUpload);
  fileInput.click();
}

// Handle upload
function handleAvatarUpload(event) {
  const file = event.target.files?.[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    localStorage.setItem("siakad_custom_avatar", e.target.result);
    document.getElementById("userAvatar").src = e.target.result;
    showToast("Avatar berhasil diubah!", "success");
  };
  reader.readAsDataURL(file);
}
```

---

**Status:** ✅ Fully Functional & Tested  
**Last Update:** 9 Desember 2025  
**Version:** 1.0
