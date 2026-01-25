# QUICK ACTIONS - INTEGRATION TEST GUIDE

## Version 2.0 - Comprehensive Testing

**Date:** January 13, 2025  
**Status:** READY FOR TESTING  
**All Systems:** INTEGRATED & FUNCTIONAL

---

## TEST ENVIRONMENT SETUP

### Prerequisites

- Browser: Chrome, Firefox, or Edge (latest)
- File: admin.html in web server
- Script: script.js properly loaded
- Excel file: Sample data file ready

### Sample Excel File Format

**For Siswa Import:**

```
| nis    | nama            | tempat_lahir | tgl_lahir | jenis_kelamin | alamat              | kelas |
|--------|-----------------|-------------|-----------|---------------|--------------------|-------|
| S001   | Andi Wijaya     | Jakarta     | 1-1-2010  | Laki-laki     | Jl. Merdeka 1      | VII A |
| S002   | Budi Santoso    | Bekasi      | 2-2-2010  | Laki-laki     | Jl. Sudirman 2     | VII B |
| S003   | Citra Dewi      | Bogor       | 3-3-2010  | Perempuan     | Jl. Ahmad Yani 3   | VII A |
```

---

## TEST CASE 1: QUICK ACTION BUTTON INTERACTION

### Test 1.1: Button Hover Effect

**Objective:** Verify hover effects work on all three buttons

**Steps:**

1. Open admin.html in browser
2. Locate Quick Actions section
3. Hover mouse over "Tambah Siswa" button
4. Hover mouse over "Import Excel" button
5. Hover mouse over "Cetak Kartu" button

**Expected Results:**

- ✓ Button scales up slightly (1.02x) when hovered
- ✓ Scale effect smooth (0.2s transition)
- ✓ All three buttons respond consistently
- ✓ No visual glitches or jumps

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 1.2: Badge Counter Update

**Objective:** Verify badge shows current student count

**Steps:**

1. Open admin.html
2. Check "Tambah Siswa" button badge
3. Note the number displayed
4. Add a new student via the button
5. Check badge number again

**Expected Results:**

- ✓ Initial badge shows count (0, 5, 10, etc.)
- ✓ Badge updates after adding student
- ✓ Number matches actual siswaData.length
- ✓ Badge is white text on primary background

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 1.3: Quick Actions Stats Display

**Objective:** Verify stats row shows current date

**Steps:**

1. Open admin.html
2. Look at bottom of Quick Actions section
3. Check the date displayed

**Expected Results:**

- ✓ Shows "Terakhir diperbaharui: [Day], [Date] [Month] [Year]"
- ✓ Format is Indonesian (Senin, 13 Januari 2025)
- ✓ Date matches current system date
- ✓ Updates when day changes (next day)

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

## TEST CASE 2: TAMBAH SISWA BUTTON

### Test 2.1: Open Modal

**Objective:** Verify Tambah Siswa opens correct modal

**Steps:**

1. Click "Tambah Siswa" button
2. Wait for modal to appear

**Expected Results:**

- ✓ Modal appears immediately
- ✓ Modal has title "Tambah Data Siswa"
- ✓ Modal has form fields
- ✓ Toast notification shows: "Form Tambah Siswa siap diisi"
- ✓ Form fields are empty (new entry)

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 2.2: Fill and Submit Form

**Objective:** Verify form submission adds student

**Steps:**

1. Click "Tambah Siswa"
2. Fill form fields:
   - Nama: "Test Student 001"
   - NIS: "T001"
   - Tempat Lahir: "Jakarta"
   - Tgl Lahir: "01-01-2010"
   - Jenis Kelamin: "Laki-laki"
   - Alamat: "Jl. Test No. 1"
   - Kelas: "VII A"
3. Click "Simpan" button

**Expected Results:**

- ✓ Form accepts all input
- ✓ "Simpan" button is clickable
- ✓ Toast shows: "✓ Data siswa berhasil ditambahkan"
- ✓ Modal closes automatically
- ✓ New student appears in Siswa table
- ✓ Badge counter increases by 1

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 2.3: Form Validation

**Objective:** Verify form doesn't submit incomplete data

**Steps:**

1. Click "Tambah Siswa"
2. Leave all fields empty
3. Click "Simpan" button

**Expected Results:**

- ✓ Form shows validation error
- ✓ Toast warning appears
- ✓ Modal stays open
- ✓ Student not added to list

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

## TEST CASE 3: IMPORT EXCEL BUTTON

### Test 3.1: Open Import Modal

**Objective:** Verify Import Excel opens correct modal

**Steps:**

1. Click "Import Excel" button
2. Wait for modal

**Expected Results:**

- ✓ Modal appears with title "Import Data Excel"
- ✓ Modal has data type selector dropdown
- ✓ Dropdown shows: Siswa, Guru, Kelas, Mapel
- ✓ File input is present
- ✓ "Import Data" button is disabled (no file yet)

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 3.2: File Validation - Wrong Format

**Objective:** Verify system rejects non-Excel files

**Steps:**

1. Click "Import Excel"
2. Try to upload a .txt file

**Expected Results:**

- ✓ File input accepts the file temporarily
- ✓ Toast error: "Format file harus Excel (.xls atau .xlsx)"
- ✓ File input clears
- ✓ No preview shown
- ✓ Import button remains disabled

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 3.3: File Validation - Size Limit

**Objective:** Verify system rejects files > 5MB

**Steps:**

1. Create a large Excel file (>5MB)
2. Try to upload it

**Expected Results:**

- ✓ File input accepts temporarily
- ✓ Toast error: "Ukuran file terlalu besar (max 5MB)"
- ✓ File input clears
- ✓ No preview shown

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 3.4: Valid Excel Upload & Preview

**Objective:** Verify preview shows Excel data correctly

**Steps:**

1. Click "Import Excel"
2. Select data type: "Data Siswa"
3. Upload valid Excel file with 12 rows
4. Wait for preview

**Expected Results:**

- ✓ File accepted (no error toast)
- ✓ Toast shows: "✓ 12 baris data siap untuk diimport"
- ✓ Preview table appears
- ✓ Shows all columns from Excel
- ✓ Shows first 5 rows
- ✓ Shows "... dan 7 baris lainnya" for remaining rows
- ✓ "Import Data" button enabled

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 3.5: Data Type Selection

**Objective:** Verify import type selector works

**Steps:**

1. Click "Import Excel"
2. Change dropdown to: "Data Guru"
3. Upload Excel file with guru data
4. Check preview

**Expected Results:**

- ✓ x-model updates correctly
- ✓ import type changes in script
- ✓ Preview shows correct columns for Guru
- ✓ Import button shows correct action

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 3.6: Duplicate Detection

**Objective:** Verify system detects and handles duplicates

**Steps:**

1. Click "Import Excel"
2. Select "Data Siswa"
3. Upload Excel with 10 new + 3 existing students
4. Click "Import Data"

**Expected Results:**

- ✓ Toast shows: "✓ 10 data Siswa berhasil diimport (3 duplikat diabaikan)"
- ✓ Only new students added (10, not 13)
- ✓ Existing students not duplicated
- ✓ Modal closes after import
- ✓ Badge updates (+10 only)

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 3.7: File Input Clear After Import

**Objective:** Verify file input clears after successful import

**Steps:**

1. Import Excel file successfully
2. Modal closes
3. Click "Import Excel" again
4. Check file input

**Expected Results:**

- ✓ File input is empty (shows "No file chosen")
- ✓ Preview data cleared
- ✓ Import button disabled again
- ✓ Ready for next import

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

## TEST CASE 4: CETAK KARTU BUTTON

### Test 4.1: Open Print Modal

**Objective:** Verify Cetak Kartu opens correct modal

**Steps:**

1. Click "Cetak Kartu" button
2. Wait for modal

**Expected Results:**

- ✓ Modal appears with title "Cetak Kartu Siswa"
- ✓ Student dropdown is present
- ✓ Dropdown shows all students (NIS - Nama format)
- ✓ "Cetak Kartu" button is disabled (no student selected)
- ✓ No preview shown yet

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 4.2: Student Selection & Card Preview

**Objective:** Verify card preview shows after student selection

**Steps:**

1. Click "Cetak Kartu"
2. Click dropdown
3. Select student "S001 - Andi Wijaya"
4. Wait for preview

**Expected Results:**

- ✓ Dropdown updates (student selected)
- ✓ Card preview appears below
- ✓ Card shows student data:
  - Title: "KARTU PELAJAR"
  - School: "SMP YPPGI Bomou"
  - Avatar: Student initials
  - NIS field with student NIS
  - Nama field with student name
  - Kelas field with student class
- ✓ "Cetak Kartu" button enabled

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 4.3: Print Functionality

**Objective:** Verify print dialog opens and prints correctly

**Steps:**

1. Click "Cetak Kartu"
2. Select a student
3. Wait for preview
4. Click "Cetak Kartu" button
5. Browser print dialog appears
6. Click "Print" (or "Save as PDF")

**Expected Results:**

- ✓ Browser print dialog opens
- ✓ Card preview shown in print preview
- ✓ Card formatted correctly for printing
- ✓ Toast shows: "✓ Jendela print terbuka, silahkan cetak kartu"
- ✓ Print to physical printer works
- ✓ Save as PDF works
- ✓ Can cancel print without error

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 4.4: Multiple Prints

**Objective:** Verify user can print multiple cards

**Steps:**

1. Click "Cetak Kartu"
2. Select Student A → Print → Cancel
3. Select different student (dropdown still open)
4. Select Student B → Print → Cancel
5. Select Student C → Print → Cancel

**Expected Results:**

- ✓ Can select different students without re-opening modal
- ✓ Preview updates each time student changes
- ✓ Can print multiple times without issues
- ✓ Each print shows correct student data

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

## TEST CASE 5: NOTIFICATION SYSTEM INTEGRATION

### Test 5.1: New Student Triggers Notifications

**Objective:** Verify adding student updates notification system

**Steps:**

1. Open admin.html
2. Check Notification panel (right side)
3. Note number of notifications
4. Add new student via "Tambah Siswa"
5. Check Notification panel again

**Expected Results:**

- ✓ After adding student, notification count may update
- ✓ New "Absensi Rendah" notifications may appear for new student
- ✓ Notification badges update
- ✓ Notification content reflects new data
- ✓ Can filter notifications by category

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 5.2: Import Triggers Batch Notifications

**Objective:** Verify importing multiple students affects notifications

**Steps:**

1. Check current notification count
2. Import 10 new students
3. Check notification count after import
4. Review notification details

**Expected Results:**

- ✓ Notification system refreshes after import
- ✓ New notifications appear for imported students
- ✓ Notification counts update accurately
- ✓ "Absensi Rendah" category may show new items
- ✓ Statistics at top show updated counts

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

## TEST CASE 6: REAL-TIME DATA BINDING

### Test 6.1: Badge Updates in Real-Time

**Objective:** Verify badge reflects actual data count

**Steps:**

1. Note current badge count on "Tambah Siswa"
2. Open admin.html in second window/tab
3. In window 1: Add student
4. In window 2: Check badge
5. Refresh window 2
6. Check badge again

**Expected Results:**

- ✓ Badge shows correct count in both windows (after refresh)
- ✓ Count matches siswaData.length
- ✓ Updates after each data operation

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 6.2: Form Reset After Save

**Objective:** Verify forms clear after successful save

**Steps:**

1. Add student
2. Immediately open "Tambah Siswa" again
3. Check form fields

**Expected Results:**

- ✓ All form fields are empty
- ✓ No previous data retained
- ✓ Form ready for new input

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

## TEST CASE 7: ERROR HANDLING

### Test 7.1: Network Error Simulation

**Objective:** Verify system handles potential errors gracefully

**Steps:**

1. Open browser console (F12)
2. Try operations:
   - Add incomplete student data
   - Import corrupted Excel file
   - Select non-existent student for print
3. Check error messages

**Expected Results:**

- ✓ Error messages are clear and helpful
- ✓ Toast notifications explain what went wrong
- ✓ System doesn't crash
- ✓ User can retry operation

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 7.2: Empty Data States

**Objective:** Verify system handles empty data gracefully

**Steps:**

1. If no students exist, try "Cetak Kartu"
2. Try import when dropdown empty
3. Try operations on empty dataset

**Expected Results:**

- ✓ Toast warning: "Pilih siswa terlebih dahulu"
- ✓ Dropdown disables or shows appropriate message
- ✓ Buttons disable appropriately
- ✓ No error in console

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

## TEST CASE 8: ACCESSIBILITY & USABILITY

### Test 8.1: Keyboard Navigation

**Objective:** Verify buttons work with keyboard

**Steps:**

1. Press Tab to focus buttons
2. Press Enter on each Quick Action button
3. Navigate modal with Tab
4. Use keyboard in form fields

**Expected Results:**

- ✓ Buttons get focus (visible outline)
- ✓ Enter key opens modals
- ✓ Can tab through all form fields
- ✓ Can submit forms with keyboard

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 8.2: Toast Notification Visibility

**Objective:** Verify notifications are readable

**Steps:**

1. Perform actions that trigger toast
2. Check visibility:
   - Color contrast
   - Text readability
   - Position not blocking content
   - Duration sufficient to read

**Expected Results:**

- ✓ Toast text readable (good contrast)
- ✓ Toast positioned top-right (not blocking)
- ✓ Stays visible for 3-4 seconds minimum
- ✓ Auto-dismisses or can be closed

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

## TEST CASE 9: PERFORMANCE

### Test 9.1: Modal Open/Close Speed

**Objective:** Verify modals open/close smoothly

**Steps:**

1. Click "Tambah Siswa" multiple times rapidly
2. Measure response time
3. Do same for other buttons
4. Check for lag or stuttering

**Expected Results:**

- ✓ Modals open within 50ms
- ✓ Modals close without delay
- ✓ No lag with repeated opens/closes
- ✓ No console errors

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 9.2: Large Dataset Performance

**Objective:** Verify system handles many students

**Steps:**

1. Import 100+ students
2. Open "Cetak Kartu" modal
3. Check dropdown with 100+ items
4. Select student and preview card

**Expected Results:**

- ✓ Dropdown loads without lag
- ✓ Can scroll through list smoothly
- ✓ Selection works responsively
- ✓ Preview renders quickly

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

## TEST CASE 10: CROSS-BROWSER COMPATIBILITY

### Test 10.1: Chrome Browser

**Objective:** Verify all features work in Chrome

**Steps:**

1. Complete all tests in Chrome
2. Check console for errors

**Expected Results:**

- [ ] All tests pass in Chrome
- [ ] No console errors
- [ ] All features fully functional

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 10.2: Firefox Browser

**Objective:** Verify all features work in Firefox

**Steps:**

1. Complete Test Cases 1-7 in Firefox

**Expected Results:**

- [ ] All tests pass in Firefox
- [ ] No console errors
- [ ] All features fully functional

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

### Test 10.3: Edge Browser

**Objective:** Verify all features work in Edge

**Steps:**

1. Complete Test Cases 1-7 in Edge

**Expected Results:**

- [ ] All tests pass in Edge
- [ ] No console errors
- [ ] All features fully functional

**Actual Results:**

- [ ] Pass
- [ ] Fail - Describe issue:

---

## TEST SUMMARY SHEET

### Quick Actions Buttons

- [ ] Tambah Siswa: PASS / FAIL
- [ ] Import Excel: PASS / FAIL
- [ ] Cetak Kartu: PASS / FAIL

### Core Features

- [ ] Hover effects: PASS / FAIL
- [ ] Badge counter: PASS / FAIL
- [ ] File validation: PASS / FAIL
- [ ] Preview display: PASS / FAIL
- [ ] Duplicate detection: PASS / FAIL
- [ ] Print functionality: PASS / FAIL

### Integration

- [ ] Notification system: PASS / FAIL
- [ ] Data binding: PASS / FAIL
- [ ] Error handling: PASS / FAIL
- [ ] Form validation: PASS / FAIL

### User Experience

- [ ] Toast notifications: PASS / FAIL
- [ ] Keyboard navigation: PASS / FAIL
- [ ] Performance: PASS / FAIL
- [ ] Cross-browser: PASS / FAIL

---

## OVERALL TEST RESULT

**Total Tests:** 50  
**Passed:** **_  
**Failed:** _**  
**Skipped:** \_\_\_

**Status:**

- [ ] READY FOR PRODUCTION
- [ ] NEEDS FIXES
- [ ] NEEDS FURTHER TESTING

**Tester Name:** ********\_\_\_********  
**Test Date:** ********\_\_\_********  
**Notes:**

```
[Add any additional notes, observations, or issues found]
```

---

## PRODUCTION CHECKLIST

Before deploying to production, verify:

- [ ] All 50 test cases passed
- [ ] No console errors
- [ ] All three Quick Action buttons fully functional
- [ ] Import Excel works with real data
- [ ] Print feature works on all printers
- [ ] Notification system integrates properly
- [ ] Data persists between sessions
- [ ] Error messages helpful and clear
- [ ] Performance acceptable with large datasets
- [ ] Works on all supported browsers

---

**Document Version:** 2.0  
**Date:** January 13, 2025  
**Status:** TESTING READY ✅
