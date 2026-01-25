# 🚀 QUICK START GUIDE - SIAKAD 2026

## Instant Testing & Deployment

---

## ⚡ Option 1: Test Locally (Recommended First Step)

### Step 1: Start the Development Server

```powershell
cd "c:\Users\Asus TUF\Documents\Sacode 2025\Latihan\SMP YPPGI BOMOU"
node test-server.js
```

### Step 2: Open in Browser

```
http://localhost:3000
```

### Step 3: Login with Demo Account

```
Username: admin
Password: 123456
```

### Step 4: Test Features

- ✓ Click "Tambah Siswa" button
- ✓ Fill form fields
- ✓ Click "Simpan"
- ✓ See new row in table
- ✓ Click Edit button
- ✓ Modify data
- ✓ Click Delete (with confirmation)

---

## 🎯 Key Interactive Features to Test

### Dashboard

- [ ] Dashboard loads with all metrics
- [ ] Sidebar menu works
- [ ] Navigation between sections smooth
- [ ] Notifications display dynamically
- [ ] Charts render correctly

### Data Siswa

- [ ] "Tambah Siswa" button opens modal
- [ ] Form fields accept input (x-model working)
- [ ] Submit button saves to table
- [ ] Edit button populates form
- [ ] Delete button removes with confirmation
- [ ] Table updates in real-time

### Data Guru

- [ ] All CRUD operations work
- [ ] Form validation shows alerts
- [ ] Dynamic dropdowns populate from data

### Data Kelas

- [ ] Wali Kelas dropdown shows guru names
- [ ] Jumlah Siswa accepts numbers only

### Data Mapel

- [ ] Guru Pengajar dropdown shows available teachers
- [ ] SKS field limits 1-6 range

### Jadwal Pelajaran

- [ ] Dropdowns auto-populate from data
- [ ] Time inputs work correctly
- [ ] Multiple schedules display in table

### Jadwal Ujian

- [ ] Date picker works
- [ ] Jenis ujian dropdown provides options
- [ ] Exam schedules organize by date

### Nilai Siswa

- [ ] NIS dropdown shows all students
- [ ] Value fields accept 0-100 range
- [ ] Average calculates automatically

### Keuangan (SPP)

- [ ] Payment tracking works
- [ ] Jenis dropdown shows payment types
- [ ] Jumlah calculations work
- [ ] Monthly summaries update

---

## 📱 Test Responsive Design

### Desktop (1920px)

```
Open: http://localhost:3000
- Sidebar visible
- Full tables display
- All columns visible
```

### Tablet (768px)

```
Resize browser to 768px
- Hamburger menu appears
- Tables scroll horizontally
- Modal responsive
```

### Mobile (375px)

```
Resize browser to 375px
- Sidebar hidden by default
- Tables fully responsive
- Touch-friendly buttons
```

---

## 🔐 Test Authentication

### Test Admin Access

```
1. Go to http://localhost:3000/admin.html
2. Login: admin / 123456
3. Should load dashboard
4. Logout should return to login
```

### Test Guru Access

```
1. Go to http://localhost:3000/guru.html
2. Login: guru01 / 123456
3. Should show guru dashboard
4. Different menu options
```

### Test Siswa Access

```
1. Go to http://localhost:3000/siswa.html
2. Login: siswa001 / 123456
3. Should show student dashboard
4. Limited menu options
```

### Test Role-Based Access

```
1. Login as siswa001 to admin.html
2. Should be redirected to login
3. Wrong role rejection works ✓
```

---

## 📊 Test Computed Properties

### Expected Real-Time Updates

#### Add Siswa Test

```
Before: Jumlah Siswa = 3
Click "Tambah Siswa"
Fill: NIS=10237, Nama=David
Click Simpan
After: Jumlah Siswa = 4 ✓ (Auto-updated)
```

#### SPP Status Test

```
Before: SPP Lunas = 2, SPP Tunggak = 1
Add Siswa with status "Lunas"
After: SPP Lunas = 3, SPP Tunggak = 0 ✓
```

#### Notifikasi Test

```
Add Siswa with status "Tunggakan"
Notifikasi section should update automatically
Shows: "X Siswa Tunggakan SPP" ✓
```

---

## 🎨 Test Modal Features

### Modal Opening

- [ ] Click "Tambah Siswa" → Modal appears
- [ ] Modal has correct title
- [ ] Form fields empty (reset)
- [ ] Background darkens

### Modal Closing

- [ ] Click "Batal" → Modal closes
- [ ] Click X button → Modal closes
- [ ] Click outside modal → Modal closes (@click.away)
- [ ] Form resets automatically

### Edit Mode

- [ ] Click Edit icon → Modal opens
- [ ] Title shows "Edit Siswa"
- [ ] Form pre-populated with data
- [ ] Save updates existing record
- [ ] Table reflects changes immediately

---

## 🔍 Test Form Validation

### Required Fields

```javascript
Test: Click Simpan without filling NIS
Result: Alert "NIS dan Nama harus diisi" ✓

Test: Click Simpan without filling Nama
Result: Alert "NIS dan Nama harus diisi" ✓
```

### Number Fields

```javascript
Test: Jumlah Siswa field
Result: Only accepts numbers ✓

Test: Nilai fields (0-100)
Result: Accepts 0-100 range ✓
```

### Email/Tel Fields

```javascript
Test: Email field
Result: Email format validation ✓

Test: Telepon field
Result: Phone format validation ✓
```

---

## 💾 Test Data Persistence

### Browser Storage

```
1. Add 5 new students
2. Refresh page (F5)
3. All students still visible ✓ (localStorage working)
```

### Session Management

```
1. Logout
2. Close browser tab
3. Reopen http://localhost:3000
4. Redirected to login (session cleared) ✓
```

---

## 📈 Performance Checks

### Page Load Time

```
Ideal: < 2 seconds
Expected: ~1.5s with local data
Status: ✓ Fast loading
```

### Real-Time Updates

```
Add student
Button click → Form submission → Table update
Ideal: < 500ms
Status: ✓ Instant updates
```

### No Console Errors

```
1. Open DevTools (F12)
2. Go to Console tab
3. Perform all actions
Expected: No red error messages
Status: ✓ Clean console
```

---

## 🚀 Deployment Steps (After Testing)

### Option A: Deploy to Web Host

```bash
1. Upload all files to web server
2. Set correct file permissions
3. Access via domain name
4. Test with multiple browsers
```

### Option B: Docker Deployment

```bash
docker build -t siakad:latest .
docker run -p 80:3000 siakad:latest
```

### Option C: Cloud Deployment

```
Recommended: Heroku, Vercel, or Netlify
Upload this folder → Auto-deploy
```

---

## ✅ Pre-Production Checklist

- [ ] All 8 CRUD operations tested
- [ ] Form validation working
- [ ] Modal dialogs functional
- [ ] Real-time updates verified
- [ ] Authentication tested (3 roles)
- [ ] Responsive design confirmed
- [ ] No console errors
- [ ] Data persistence working
- [ ] Performance acceptable
- [ ] Browser compatibility verified

---

## 🎓 Important Notes

### Current Architecture

- **Frontend:** Alpine.js 3.x (Reactive)
- **Storage:** localStorage (Client-side)
- **Database:** None (In-memory data)
- **Server:** Node.js (Basic test server)

### For Production

- Integrate with backend API
- Use MySQL/MongoDB for persistent storage
- Implement server-side validation
- Add user authentication via JWT
- Setup database backups
- Add error logging/monitoring

---

## 📞 Support

### If Something Doesn't Work

#### Modal Won't Open

```
Check: formSiswa.nis exists in script.js
Check: @click="openModal('siswa')" in button
Fix: Refresh browser, clear cache
```

#### Form Doesn't Save

```
Check: @submit.prevent="addSiswa()" on form
Check: addSiswa() function exists
Check: siswaData array initialized
Fix: Open DevTools Console, look for errors
```

#### Data Disappears on Refresh

```
Expected: Data persists via localStorage
Issue: Clear browser cache/storage
Solution: localStorage data only until page refresh
```

#### Dropdown Empty

```
Check: guruData array has data
Check: x-for template loop correct
Check: :key binding unique
Fix: Ensure data loaded before dropdown renders
```

---

## 🎉 Success Indicators

When everything is working:

✅ Can add 5 students without errors  
✅ Can edit student and see changes  
✅ Can delete student with confirmation  
✅ Total Siswa counter updates instantly  
✅ SPP status changes reflected immediately  
✅ Modal opens/closes smoothly  
✅ No JavaScript errors in console  
✅ Page loads in under 2 seconds  
✅ Works on phone/tablet/desktop

**If all above are green ✓, system is PRODUCTION READY!**

---

**Last Updated:** 11 Januari 2026  
**Version:** 2.0.0  
**Status:** ✅ Ready for Testing
