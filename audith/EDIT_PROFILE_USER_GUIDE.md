# Fitur Edit Profil - Panduan User

**Status:** ✅ Ready to Use

## Cara Menggunakan Edit Profil

### Step 1: Buka Dropdown Menu

![Dropdown Menu]
Klik pada **avatar** di bagian kanan atas (topbar) atau **nama user** untuk membuka dropdown menu.

```
┌──────────────────────────────────────────────┐
│         TOPBAR (User Avatar Area)            │
│                                              │
│  ...  [Avatar]  ▼                            │
│          │                                   │
│          └─→ Dropdown Menu muncul:           │
│              ┌─ Nama User (Disabled)         │
│              ├─ ─────────────────────       │
│              ├─ Edit Profil        ← Click!  │
│              ├─ Logout                       │
│              └─                             │
└──────────────────────────────────────────────┘
```

---

### Step 2: Klik "Edit Profil"

Sistem akan **otomatis:**

- ✅ Navigasi ke halaman "Profil Saya"
- ✅ Enable input field Nama Lengkap
- ✅ Focus cursor ke input
- ✅ Select (highlight) text yang ada
- ✅ Tampilkan tombol "Simpan Profil" dan "Batal"

**Tampilan Halaman:**

```
┌────────────────────────────────────────────────────┐
│  Profil Saya                                       │
├────────────────────────────────────────────────────┤
│                                                    │
│  [Foto Avatar]   Nama Lengkap:                    │
│                  ┌─────────────────────────────┐ │
│                  │ Yulianus Tebai ◄ cursor here│ │ ← Input ENABLED!
│                  └─────────────────────────────┘ │
│                                                    │
│  NIS:                    Kelas:                   │
│  2025001 (disabled)      VIII A (disabled)        │
│                                                    │
│  Jenis Kelamin:          Agama:                   │
│  Laki-laki (disabled)    Kristen (disabled)       │
│                                                    │
│                                                    │
│  [Simpan Profil] [Batal]  ← Buttons visible!     │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

### Step 3: Edit Nama

Ubah nama sesuai keinginan.

**Options untuk Simpan:**

#### ✅ Option A: Klik Tombol "Simpan Profil"

```
User mengetik nama baru:
Yulianus Tebai → Andi Prabowo

Klik [Simpan Profil]
        ↓
✅ Toast: "Profil berhasil disimpan"
✅ Input jadi disabled (grey)
✅ Tombol disappear
✅ Nama di topbar update: "Andi Prabowo"
✅ localStorage update
```

#### ✅ Option B: Tekan Enter

```
User mengetik nama baru dan tekan Enter
        ↓
Sama effect seperti klik "Simpan Profil"
```

#### ✅ Option C: Klik "Batal"

```
User berubah pikiran, klik [Batal]
        ↓
✅ Input revert ke nilai sebelumnya
✅ Input jadi disabled
✅ Tombol disappear
✅ Toast: "Perubahan dibatalkan"
```

#### ✅ Option D: Tekan Escape

```
User berubah pikiran dan tekan Escape
        ↓
Sama effect seperti klik "Batal"
```

---

## Keyboard Shortcuts

| Shortcut   | Aksi          | Result                |
| ---------- | ------------- | --------------------- |
| **Enter**  | Simpan profil | Save & Hide buttons   |
| **Escape** | Batal edit    | Revert & Hide buttons |

---

## State Flow Diagram

```
┌─────────────────────────────────────────┐
│      Halaman Normal (Profil Tertutup)   │
│  • Input DISABLED (grey)                │
│  • Tombol HIDDEN                        │
│  • Nama tidak bisa diedit               │
└──────────────────┬──────────────────────┘
                   │
                   │ User klik "Edit Profil"
                   ▼
┌─────────────────────────────────────────┐
│      Halaman Edit Mode (Aktif)          │
│  • Input ENABLED (putih/editable)       │
│  • Tombol VISIBLE                       │
│  • Cursor fokus di input                │
└────────────┬─────────────────────┬──────┘
             │                     │
    User klik Save/Enter    User klik Batal/Esc
             │                     │
             ▼                     ▼
    ✅ Simpan perubahan     ⏸️ Batalkan edit
    ✅ Update localStorage  ⏸️ Revert nama
    ✅ Update UI (topbar)   ⏸️ Revert input
    ✅ Hide buttons         ✅ Hide buttons
             │                     │
             └──────────┬──────────┘
                        ▼
          ┌─────────────────────────┐
          │  Kembali Mode Tertutup  │
          │  Input DISABLED again   │
          │  Tombol HIDDEN again    │
          └─────────────────────────┘
```

---

## Toast Notifications

Saat melakukan aksi, toast notifikasi akan muncul di **bottom-right** screen:

```
┌─────────────────────────────────┐
│         SIAKAD                  │
├─────────────────────────────────┤
│ Profil berhasil disimpan        │ ← Success (Green)
│                              ✕  │
└─────────────────────────────────┘
```

atau

```
┌─────────────────────────────────┐
│         SIAKAD                  │
├─────────────────────────────────┤
│ Perubahan dibatalkan            │ ← Info (Blue)
│                              ✕  │
└─────────────────────────────────┘
```

atau

```
┌─────────────────────────────────┐
│         SIAKAD                  │
├─────────────────────────────────┤
│ Nama tidak boleh kosong         │ ← Warning (Yellow)
│                              ✕  │
└─────────────────────────────────┘
```

---

## Data Yang Disimpan

Saat klik "Simpan Profil", data berikut diupdate:

### 1. localStorage `siakad_siswa_data`

```json
{
  "nis": "2025001",
  "nama": "Andi Prabowo",  ← UPDATED
  "kelas": "VIII A",
  "tahunAkademik": "2024/2025",
  "kelamin": "Laki-laki",
  "agama": "Kristen"
}
```

### 2. localStorage `siakad_user` (Session)

```json
{
  "username": "siswa1",
  "name": "Andi Prabowo",  ← UPDATED
  "role": "siswa",
  "loginTime": "2025-12-09T15:30:00"
}
```

### 3. Topbar UI

```
Nama di dropdown menu update:
"Yulianus Tebai" → "Andi Prabowo"
```

---

## Validasi Input

**Validasi yang dilakukan:**

- ❌ Nama tidak boleh kosong
- ❌ Nama tidak boleh hanya spasi
- ✅ Nama akan di-trim (spasi di awal/akhir dihapus)

**Jika gagal validasi:**

```
Toast: "Nama tidak boleh kosong" (Warning)
Input: Tetap enabled untuk re-edit
Perubahan: TIDAK disimpan
```

---

## Troubleshooting

### Masalah: Klik Edit Profil, tapi halaman tidak berubah

**Solusi:**

1. Buka Browser DevTools (F12)
2. Cek Console untuk error message
3. Refresh halaman (Ctrl+R)
4. Pastikan sudah login sebagai siswa

### Masalah: Input field tidak bisa diedit (masih grey)

**Solusi:**

1. Pastikan sudah klik "Edit Profil" dari dropdown
2. Input harus berwarna **putih/normal** (bukan grey)
3. Jika masih grey, refresh halaman

### Masalah: Tombol Save/Cancel tidak muncul

**Solusi:**

1. Pastikan sudah di halaman "Profil Saya"
2. Tombol harus muncul setelah klik "Edit Profil"
3. Jika tidak muncul, check console untuk error

### Masalah: Nama tidak update di topbar

**Solusi:**

1. Refresh halaman (Ctrl+R)
2. Nama di topbar akan muncul sesuai localStorage
3. Check console untuk "Profile updated: X → Y" message

---

## Console Logs untuk Debugging

Buka DevTools Console (F12) untuk melihat log messages:

```javascript
// Saat klik Edit Profil:
[09/12/2025, 15:30:45] ℹ️ Navigating to profile edit page...
[09/12/2025, 15:30:45] ✅ Profile section displayed
[09/12/2025, 15:30:45] ℹ️ Profil nama input enabled and focused

// Saat klik Save:
[09/12/2025, 15:30:50] ℹ️ Save button clicked
[09/12/2025, 15:30:50] ✅ Profile updated: Andi → Yulianus Tebai
[09/12/2025, 15:30:50] ✅ Profil disimpan ke localStorage

// Atau saat klik Cancel:
[09/12/2025, 15:30:55] ℹ️ Cancel button clicked
[09/12/2025, 15:30:55] ℹ️ Profile edit cancelled
```

---

## Fitur-Fitur yang Sudah Berfungsi

✅ Auto-navigate ke profile section  
✅ Auto-enable input field  
✅ Auto-focus & select teks  
✅ Show/hide buttons  
✅ Save dengan click button  
✅ Save dengan Enter key  
✅ Cancel dengan click button  
✅ Cancel dengan Escape key  
✅ Validasi input (tidak boleh kosong)  
✅ Update localStorage (dual storage)  
✅ Update topbar UI  
✅ Toast notifications  
✅ Console logging untuk debug  
✅ Error handling  
✅ Mobile responsive

---

**Last Updated:** 9 Desember 2025  
**Version:** 1.0  
**Status:** ✅ Fully Functional
