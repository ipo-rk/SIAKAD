# Fitur Edit Profil - Dokumentasi Lengkap

## Ringkasan

Fitur edit profil di SIAKAD memungkinkan siswa untuk mengubah nama mereka di dashboard. Semua perubahan disimpan secara otomatis ke `localStorage` dan tersinkronisasi ke seluruh aplikasi (topbar, profil, session).

## Komponen-Komponen

### HTML Elements (siswa.html)

```html
<!-- Input nama (disabled by default) -->
<input
  type="text"
  class="form-control"
  id="profilNama"
  value="Yulianus Tebai"
  disabled
/>

<!-- Save button -->
<button id="saveProfileBtn" class="btn btn-primary me-2">Simpan Profil</button>

<!-- Cancel button -->
<button id="cancelEditProfileBtn" class="btn btn-secondary">Batal</button>
```

### JavaScript Functions (assets/js/siswa.js)

#### 1. `editProfile()`

**Tujuan**: Toggle mode edit profil (enable/disable input)
**Cara kerja**:

- Jika input disabled: aktifkan editing, fokus ke input, select teks
- Jika input enabled: save changes, disable input

```javascript
function editProfile() {
  // Toggle edit mode
}
```

#### 2. `saveProfile()`

**Tujuan**: Simpan nama baru ke localStorage dan update UI
**Validasi**:

- Nama tidak boleh kosong/whitespace saja
- Jika invalid → tampilkan toast warning dan batalkan

**Proses penyimpanan**:

1. Update `siakad_siswa_data.nama`
2. Update `siakad_user.name` (session)
3. Update UI topbar username
4. Log dan toast success

```javascript
function saveProfile() {
  // Validasi, simpan ke siakad_siswa_data & siakad_user, update UI
}
```

#### 3. `initializeProfileActions()`

**Tujuan**: Bind event listeners ke buttons dan input keyboard
**Event listeners**:

- `saveProfileBtn.click` → save profile dan disable input
- `cancelEditProfileBtn.click` → revert value dan disable input
- `profilNama.keydown` → Enter (save), Escape (cancel)

```javascript
function initializeProfileActions() {
  // Attach event listeners to buttons dan keyboard shortcuts
}
```

## Data Flow

```
┌─────────────────────────────────────────────┐
│ Siswa edit nama di profil section           │
│ Input: profilNama (disabled → enabled)      │
└──────────────────┬──────────────────────────┘
                   │
         ┌─────────▼──────────┐
         │ User klik Save /   │
         │ Tekan Enter        │
         └────────┬───────────┘
                  │
    ┌─────────────▼──────────────────┐
    │ saveProfile()                  │
    │ ├─ Validasi nama (tidak kosong)│
    │ ├─ Update siakad_siswa_data    │
    │ ├─ Update siakad_user          │
    │ ├─ Update UI (userName topbar) │
    │ ├─ Toast "Profil berhasil.."  │
    │ └─ Disable input               │
    └────────────────────────────────┘
                  │
    ┌─────────────▼──────────────────┐
    │ localStorage updated           │
    │ UI tersinkronisasi             │
    └────────────────────────────────┘
```

## Skenario Penggunaan

### Skenario 1: Edit Nama Berhasil

1. Buka Profil Saya
2. Klik "Edit Profil" → input menjadi enabled
3. Ubah nama (misal: "Yulianus Tebai" → "Andi Wijaya")
4. Klik "Simpan Profil"
5. Input disabled, nama di topbar berubah, toast "Profil berhasil disimpan"
6. Refresh halaman → nama tetap "Andi Wijaya" (dari localStorage)

### Skenario 2: Edit Nama Dengan Enter

1. Input in edit mode
2. Edit nama
3. Tekan Enter
4. Input disabled, nama tersimpan, toast success

### Skenario 3: Cancel Edit

1. Input in edit mode
2. Edit nama
3. Tekan Escape atau klik "Batal"
4. Nama kembali ke nilai sebelumnya, input disabled

### Skenario 4: Edit Nama Kosong (Validation)

1. Input in edit mode
2. Hapus semua teks
3. Klik "Simpan Profil"
4. Toast "Nama tidak boleh kosong" → input tetap enabled untuk edit lagi

## localStorage Keys

```javascript
// Penyimpanan nama di dua tempat:

// 1. Siswa data (general profile info)
localStorage.getItem("siakad_siswa_data");
// {
//   "nis": "2025001",
//   "nama": "Andi Wijaya",  // ← Disimpan di sini
//   "kelas": "VIII A",
//   ...
// }

// 2. User session (login session)
localStorage.getItem("siakad_user");
// {
//   "username": "siswa001",
//   "name": "Andi Wijaya",   // ← Disimpan di sini juga
//   "role": "siswa",
//   ...
// }
```

## Fitur Tambahan

### Keyboard Shortcuts

- **Enter** (saat input enabled): Simpan profil
- **Escape** (saat input enabled): Batal edit

### UI Feedback

- **Toast notifications**: Success, warning, info, error
- **Input state**: Disabled (view mode), Enabled (edit mode)
- **Button styling**: Primary (save), Secondary (cancel)

## Consistency & Reliability

### State Management

- Input selalu dimulai dengan `disabled=true`
- Setelah save, input otomatis `disabled=true`
- Nama selalu valid sebelum disimpan (trim & non-empty check)

### Data Synchronization

- Save ke `siakad_siswa_data` untuk profil general
- Save ke `siakad_user` untuk session user
- Update topbar immediately setelah save
- Refresh halaman → data loading dari localStorage (persistent)

### Error Handling

- Try-catch di setiap fungsi utama
- Toast untuk error messages
- Log di console untuk debugging
- Fallback behavior jika element tidak ditemukan

## Testing Checklist

- [ ] Input disabled pada load
- [ ] Click Edit Profil → input enabled, text selected, focused
- [ ] Edit nama → value berubah di input
- [ ] Click Simpan → save success, input disabled, topbar updated
- [ ] Refresh → nama tetap (loaded dari localStorage)
- [ ] Click Edit lagi → nama sesuai terakhir kali disimpan
- [ ] Edit → Tekan Enter → save, input disabled
- [ ] Edit → Tekan Escape → cancel, nama revert, input disabled
- [ ] Hapus nama semua → Click Simpan → warning toast, input tetap enabled
- [ ] Cancel button → revert ke nilai sebelumnya, input disabled
- [ ] Open DevTools → localStorage verify siakad_siswa_data & siakad_user
- [ ] Multiple edits → nama selalu konsisten di semua tempat

## Console Logs (Debugging)

Saat profile actions dijalankan, console akan menunjukkan:

```
[09/12/2025 10:30:45] ℹ️ Edit profil mode enabled
[09/12/2025 10:30:50] ✅ Profile updated: Yulianus Tebai → Andi Wijaya
[09/12/2025 10:30:50] ✅ Profil disimpan ke localStorage
[09/12/2025 10:30:50] ℹ️ Save button listener attached
```

## Troubleshooting

| Masalah                       | Penyebab                                    | Solusi                                                |
| ----------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| Input tidak bisa diedit       | Button Edit Profil tidak ada/tidak ter-bind | Pastikan `editProfile()` dipanggil dari dropdown menu |
| Nama tidak tersimpan          | localStorage disabled atau full             | Bersihkan localStorage / enable localStorage          |
| Toast tidak tampil            | Toast container atau Bootstrap tidak load   | Pastikan toast CDN dan siakadToast element ada        |
| Perubahan hilang saat refresh | localStorage tidak terupdate                | Pastikan saveProfile() disebut sebelum disable input  |
| Topbar nama tidak update      | userName element tidak ditemukan            | Pastikan #userName element ada di topbar              |

## Future Improvements

1. **Validasi nama lebih ketat** (min length, special chars, dll)
2. **Edit multiple fields** (agama, kelas, dll - jika data dinamis)
3. **Change password** feature
4. **Sync to backend** saat server tersedia (API endpoint POST /api/profil)
5. **Undo/Redo** untuk perubahan profil
6. **Avatar upload** custom
