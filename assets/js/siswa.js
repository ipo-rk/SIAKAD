// ========================================
// SIAKAD - SISTEM INFORMASI AKADEMIK
// Dashboard Siswa
// ========================================
// Version: 1.0.0
// Last Updated: 9 Desember 2025
// ========================================

// ==========================================
// UTILITY FUNCTIONS - Reusable Helpers
// ==========================================

function safeGetElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`⚠️ Element dengan ID '${id}' tidak ditemukan`);
    }
    return element;
}

function safeUpdateText(id, value) {
    const element = safeGetElement(id);
    if (element) {
        element.textContent = value;
    }
}

function formatCurrency(value) {
    if (isNaN(value)) return 'Rp 0';
    return `Rp ${parseInt(value).toLocaleString('id-ID')}`;
}

function calculateAverage(harian, uts, uas) {
    const avg = (parseInt(harian) + parseInt(uts) + parseInt(uas)) / 3;
    return avg.toFixed(1);
}

function calculateAttendancePercentage(hadir, sakit, izin, alfa) {
    const total = hadir + sakit + izin + alfa;
    if (total === 0) return '0.0';
    const percentage = (hadir / total) * 100;
    return percentage.toFixed(1);
}

function logMessage(message, type = 'info') {
    const timestamp = new Date().toLocaleString('id-ID');
    const emoji = {
        'info': 'ℹ️',
        'success': '✅',
        'error': '❌',
        'warning': '⚠️'
    }[type] || 'ℹ️';

    console.log(`[${timestamp}] ${emoji} ${message}`);
}

// Load image as Data URL (returns Promise)
function loadImageAsDataURL(url) {
    return new Promise((resolve, reject) => {
        try {
            fetch(url)
                .then(res => res.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = (e) => reject(e);
                    reader.readAsDataURL(blob);
                })
                .catch(err => reject(err));
        } catch (error) {
            reject(error);
        }
    });
}

function validateElements(elementIds) {
    const missing = [];
    elementIds.forEach(id => {
        if (!document.getElementById(id)) {
            missing.push(id);
        }
    });

    if (missing.length > 0) {
        logMessage(`Missing elements: ${missing.join(', ')}`, 'warning');
        return false;
    }

    return true;
}

// ==========================================
// SYSTEM VALIDATION FUNCTIONS
// ==========================================

function systemCheck() {
    logMessage('System check dimulai...', 'info');

    const requiredElements = [
        'toggleSidebar', 'sidebar', 'userName', 'userAvatar', 'profilNama', 'profilFoto',
        'section-dashboard', 'section-jadwal', 'section-nilai', 'section-absensi',
        'section-pembayaran', 'section-raport', 'section-profil'
    ];

    if (!validateElements(requiredElements)) {
        logMessage('Beberapa elemen penting tidak ditemukan', 'warning');
    } else {
        logMessage(`System check passed: ${requiredElements.length} required elements found`, 'success');
    }

    return true;
}

// ==========================================
// DATA FUNCTIONS - Mock Data Management
// ==========================================

function getSiswaData() {
    const savedData = localStorage.getItem('siakad_siswa_data');
    if (savedData) {
        return JSON.parse(savedData);
    }

    return {
        nis: '2025001',
        nama: 'Yulianus Tebai',
        kelas: 'VIII A',
        tahunAkademik: '2024/2025',
        jenisKelamin: 'Laki-laki',
        agama: 'Kristen',
        rataRataNilai: 8.5,
        kehadiran: 92,
        statusSPP: 'Lunas',
        ranking: '5 dari 28'
    };
}

// Crop a DataURL image to a center square of given size (px) and return new DataURL
function centerCropDataUrl(dataUrl, size) {
    return new Promise((resolve, reject) => {
        try {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = size;
                canvas.height = size;

                // calculate center square
                const minDim = Math.min(img.width, img.height);
                const sx = Math.floor((img.width - minDim) / 2);
                const sy = Math.floor((img.height - minDim) / 2);

                // draw the centered square scaled to target size
                ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
                const out = canvas.toDataURL('image/png');
                resolve(out);
            };
            img.onerror = function (e) { reject(new Error('Failed to load image for cropping')); };
            img.src = dataUrl;
        } catch (err) {
            reject(err);
        }
    });
}

function saveSiswaData(data) {
    localStorage.setItem('siakad_siswa_data', JSON.stringify(data));
    logMessage('Siswa data disimpan ke localStorage', 'info');
}

function getJadwalHariIni() {
    return [
        { jam: '07:00 - 08:30', mapel: 'Matematika', ruang: '101' },
        { jam: '08:30 - 10:00', mapel: 'IPA', ruang: '102' },
        { jam: '10:30 - 12:00', mapel: 'Bahasa Indonesia', ruang: '103' }
    ];
}

function getNilaiData() {
    return [
        { mapel: 'Matematika', harian: 8.5, uts: 8.2, uas: 8.8 },
        { mapel: 'IPA', harian: 8.2, uts: 8.0, uas: 8.5 },
        { mapel: 'Bahasa Indonesia', harian: 8.7, uts: 8.5, uas: 8.9 }
    ];
}

function getAbsensiData() {
    return {
        hadir: 18,
        sakit: 1,
        izin: 1,
        alfa: 0
    };
}

function getPembayaranData() {
    return [
        { bulan: 'Desember 2024', jumlah: 350000, status: 'Lunas', tanggal: '01-12-2024' },
        { bulan: 'November 2024', jumlah: 350000, status: 'Lunas', tanggal: '01-11-2024' },
        { bulan: 'Oktober 2024', jumlah: 350000, status: 'Lunas', tanggal: '01-10-2024' }
    ];
}

// ==========================================
// RENDER FUNCTIONS - Display Data
// ==========================================

function renderJadwalHariIni() {
    try {
        const jadwalContainer = safeGetElement('jadwal-hariini-list');
        if (!jadwalContainer) {
            logMessage('Jadwal container tidak ditemukan', 'warning');
            return;
        }

        const jadwal = getJadwalHariIni();
        jadwalContainer.innerHTML = '';

        jadwal.forEach((j, i) => {
            const div = document.createElement('div');
            div.className = 'list-group-item';
            div.innerHTML = `
                <div class="d-flex justify-content-between">
                    <div>
                        <strong>${j.jam}</strong> — ${j.mapel}
                    </div>
                    <small class="text-muted">Ruang ${j.ruang}</small>
                </div>
            `;
            jadwalContainer.appendChild(div);
        });

        logMessage(`Rendered ${jadwal.length} jadwal hari ini`, 'success');
    } catch (error) {
        logMessage(`Error rendering jadwal: ${error.message}`, 'error');
    }
}

function renderNilaiTerakhir() {
    try {
        const nilaiTable = document.querySelector('#section-dashboard tbody');
        if (!nilaiTable) {
            logMessage('Nilai table tidak ditemukan', 'warning');
            return;
        }

        const nilai = getNilaiData();
        nilaiTable.innerHTML = '';

        nilai.forEach((n, i) => {
            const rata = calculateAverage(n.harian, n.uts, n.uas);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${n.mapel}</td>
                <td>${n.harian}</td>
                <td>${n.uts}</td>
                <td>${n.uas}</td>
                <td><strong>${rata}</strong></td>
            `;
            nilaiTable.appendChild(tr);
        });

        logMessage(`Rendered ${nilai.length} nilai terakhir`, 'success');
    } catch (error) {
        logMessage(`Error rendering nilai terakhir: ${error.message}`, 'error');
    }
}

function renderNilaiSection() {
    try {
        const nilaiBody = document.querySelector('#section-nilai tbody');
        if (!nilaiBody) {
            logMessage('Nilai section table tidak ditemukan', 'warning');
            return;
        }

        const nilai = getNilaiData();
        nilaiBody.innerHTML = '';

        nilai.forEach((n, i) => {
            const rata = calculateAverage(n.harian, n.uts, n.uas);
            const rataNum = parseFloat(rata);
            let grade = 'D';
            if (rataNum >= 8.5) grade = 'A';
            else if (rataNum >= 7.5) grade = 'B';
            else if (rataNum >= 6.5) grade = 'C';

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${n.mapel}</td>
                <td>${n.harian}</td>
                <td>${n.uts}</td>
                <td>${n.uas}</td>
                <td><strong>${rata}</strong></td>
                <td><span class="badge ${grade === 'A' ? 'bg-success' : grade === 'B' ? 'bg-info' : 'bg-warning'}">${grade}</span></td>
            `;
            nilaiBody.appendChild(tr);
        });

        logMessage(`Rendered ${nilai.length} nilai di section`, 'success');
    } catch (error) {
        logMessage(`Error rendering nilai section: ${error.message}`, 'error');
    }
}

function renderJadwalSection() {
    try {
        const jadwalBody = document.querySelector('#section-jadwal tbody');
        if (!jadwalBody) {
            logMessage('Jadwal section table tidak ditemukan', 'warning');
            return;
        }

        const jadwal = [
            { hari: 'Senin', jam: '07:00-08:30', mapel: 'Matematika', guru: 'Bpk. D. Wonda', ruang: '101' },
            { hari: 'Senin', jam: '08:30-10:00', mapel: 'IPA', guru: 'Ibu M. Dogopia', ruang: '102' },
            { hari: 'Selasa', jam: '07:00-08:30', mapel: 'Bahasa Indonesia', guru: 'Bpk. A. Mote', ruang: '103' }
        ];

        jadwalBody.innerHTML = '';
        jadwal.forEach((j, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${j.hari}</td>
                <td>${j.jam}</td>
                <td>${j.mapel}</td>
                <td>${j.guru}</td>
                <td>${j.ruang}</td>
            `;
            jadwalBody.appendChild(tr);
        });

        logMessage(`Rendered ${jadwal.length} jadwal di section`, 'success');
    } catch (error) {
        logMessage(`Error rendering jadwal section: ${error.message}`, 'error');
    }
}

function renderAbsensiSection() {
    try {
        const absensi = getAbsensiData();
        const hadir = safeGetElement('absensi-hadir');
        const sakit = safeGetElement('absensi-sakit');
        const izin = safeGetElement('absensi-izin');

        if (hadir) safeUpdateText('absensi-hadir', absensi.hadir);
        if (sakit) safeUpdateText('absensi-sakit', absensi.sakit);
        if (izin) safeUpdateText('absensi-izin', absensi.izin);

        logMessage('Rendered absensi data', 'success');
    } catch (error) {
        logMessage(`Error rendering absensi: ${error.message}`, 'error');
    }
}

function renderPembayaranSection() {
    try {
        const pembayaranBody = document.querySelector('#section-pembayaran tbody');
        if (!pembayaranBody) {
            logMessage('Pembayaran table tidak ditemukan', 'warning');
            return;
        }

        const pembayaran = getPembayaranData();
        pembayaranBody.innerHTML = '';

        pembayaran.forEach((p, i) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${p.bulan}</td>
                <td>${formatCurrency(p.jumlah)}</td>
                <td><span class="badge bg-success">${p.status}</span></td>
                <td>${p.tanggal}</td>
            `;
            pembayaranBody.appendChild(tr);
        });

        logMessage(`Rendered ${pembayaran.length} pembayaran data`, 'success');
    } catch (error) {
        logMessage(`Error rendering pembayaran: ${error.message}`, 'error');
    }
}

function renderAllData() {
    logMessage('Rendering semua data siswa...', 'info');
    renderJadwalHariIni();
    renderNilaiTerakhir();
    renderNilaiSection();
    renderJadwalSection();
    renderAbsensiSection();
    renderPembayaranSection();
    logMessage('Semua data berhasil di-render', 'success');
}

// ==========================================
// AUTHENTICATION FUNCTIONS
// ==========================================

function checkAuth() {
    const siakad_user = localStorage.getItem('siakad_user');
    if (!siakad_user) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(siakad_user);
}

function initializeUserInfo() {
    try {
        const user = checkAuth();

        if (user) {
            const userName = safeGetElement('userName');
            const userAvatar = safeGetElement('userAvatar');
            const profilNama = safeGetElement('profilNama');
            const profilFoto = safeGetElement('profilFoto');

            // Prefer persisted siswa data if available
            const siswaData = getSiswaData();
            const displayName = (siswaData && siswaData.nama) || user.name || user.username || 'Siswa';

            // Check if custom avatar exists in localStorage
            const storedAvatar = localStorage.getItem('siakad_custom_avatar');
            let avatarUrl = storedAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=10b981&color=fff`;

            if (userName) userName.textContent = displayName;
            if (userAvatar) {
                userAvatar.src = avatarUrl;
                userAvatar.alt = displayName;
                // Keep dropdown behavior intact: don't trigger upload on topbar avatar click
                userAvatar.style.cursor = 'pointer';
            }
            if (profilNama) profilNama.value = displayName;
            if (profilFoto) {
                profilFoto.src = avatarUrl;
                profilFoto.style.cursor = 'pointer';
                // Allow upload from profile page avatar
                profilFoto.addEventListener('click', triggerAvatarUpload);
            }

            // Attach change avatar button in topbar dropdown (if present)
            const changeAvatarBtn = document.getElementById('changeAvatarBtn');
            if (changeAvatarBtn) {
                changeAvatarBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    triggerAvatarUpload();
                });
            }

            logMessage(`User ${displayName} logged in`, 'success');
        }
    } catch (error) {
        logMessage(`Error initializing user info: ${error.message}`, 'error');
    }
}

// ==========================================
// NAVIGATION FUNCTIONS
// ==========================================

function initializeNavigation() {
    try {
        const navLinks = document.querySelectorAll('[data-section]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');

                // Hide all sections
                document.querySelectorAll('main section').forEach(s => {
                    s.classList.add('d-none');
                });

                // Show selected section
                const selectedSection = document.getElementById(`section-${section}`);
                if (selectedSection) {
                    selectedSection.classList.remove('d-none');
                    logMessage(`Navigated to section: ${section}`, 'info');
                }

                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        logMessage('Navigation initialized', 'success');
    } catch (error) {
        logMessage(`Error initializing navigation: ${error.message}`, 'error');
    }
}

function initializeMobileSidebar() {
    try {
        const toggleBtn = safeGetElement('toggleSidebar');
        const sidebar = safeGetElement('sidebar');

        if (toggleBtn && sidebar) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('d-none');
                logMessage('Mobile sidebar toggled', 'info');
            });

            logMessage('Mobile sidebar initialized', 'success');
        }
    } catch (error) {
        logMessage(`Error initializing mobile sidebar: ${error.message}`, 'error');
    }
}

// Initialize profile buttons and actions
function initializeProfileActions() {
    try {
        const saveBtn = document.getElementById('saveProfileBtn');
        const cancelBtn = document.getElementById('cancelEditProfileBtn');
        const profilNama = safeGetElement('profilNama');

        // Hide buttons initially (they're shown when editProfile() is called)
        if (saveBtn) saveBtn.classList.add('d-none');
        if (cancelBtn) cancelBtn.classList.add('d-none');

        if (saveBtn) {
            saveBtn.addEventListener('click', (e) => {
                e.preventDefault();
                logMessage('Save button clicked', 'info');
                // Ensure input is enabled to get latest value
                if (profilNama && profilNama.disabled) {
                    profilNama.disabled = false;
                }
                saveProfile();
                // After save, disable the input
                if (profilNama && !profilNama.disabled) {
                    profilNama.disabled = true;
                }
                // Hide buttons after save
                if (saveBtn) saveBtn.classList.add('d-none');
                if (cancelBtn) cancelBtn.classList.add('d-none');
                showToast('Profil berhasil disimpan', 'success');
            });
            logMessage('Save button listener attached', 'info');
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', (e) => {
                e.preventDefault();
                logMessage('Cancel button clicked', 'info');
                // Revert input to stored value and disable edit mode
                const siswaData = getSiswaData();
                if (profilNama && siswaData) {
                    profilNama.value = siswaData.nama || profilNama.value;
                    profilNama.disabled = true;
                    showToast('Perubahan dibatalkan', 'info');
                    logMessage('Profile edit cancelled', 'info');
                } else if (profilNama) {
                    profilNama.disabled = true;
                }
                // Hide buttons after cancel
                if (saveBtn) saveBtn.classList.add('d-none');
                if (cancelBtn) cancelBtn.classList.add('d-none');
            });
            logMessage('Cancel button listener attached', 'info');
        }

        // Allow Enter key to save, Escape to cancel in edit mode
        if (profilNama) {
            profilNama.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !profilNama.disabled) {
                    e.preventDefault();
                    logMessage('Enter key pressed in profile name input', 'info');
                    saveProfile();
                    profilNama.disabled = true;
                    // Hide buttons after save
                    if (saveBtn) saveBtn.classList.add('d-none');
                    if (cancelBtn) cancelBtn.classList.add('d-none');
                    showToast('Profil berhasil disimpan', 'success');
                } else if (e.key === 'Escape' && !profilNama.disabled) {
                    e.preventDefault();
                    logMessage('Escape key pressed in profile name input', 'info');
                    const siswaData = getSiswaData();
                    profilNama.value = siswaData.nama || profilNama.value;
                    profilNama.disabled = true;
                    // Hide buttons after cancel
                    if (saveBtn) saveBtn.classList.add('d-none');
                    if (cancelBtn) cancelBtn.classList.add('d-none');
                    showToast('Perubahan dibatalkan', 'info');
                }
            });
            logMessage('Keyboard shortcuts (Enter/Escape) attached to profile input', 'info');
        }

        logMessage('Profile actions initialized', 'success');
    } catch (error) {
        logMessage(`Error initializing profile actions: ${error.message}`, 'error');
    }
}

// ==========================================
// USER ACTION FUNCTIONS
// ==========================================

function editProfile() {
    try {
        logMessage('Navigating to profile edit page...', 'info');

        // Hide all sections
        document.querySelectorAll('main section').forEach(sec => sec.classList.add('d-none'));

        // Show profil section
        const profilSection = safeGetElement('section-profil');
        if (profilSection) {
            profilSection.classList.remove('d-none');
            logMessage('Profile section displayed', 'success');
        }

        // Enable input field for editing
        const profilNama = safeGetElement('profilNama');
        if (profilNama) {
            profilNama.disabled = false;
            profilNama.focus();
            profilNama.select();
            logMessage('Profil nama input enabled and focused', 'info');
        }

        // Show action buttons
        const saveBtn = safeGetElement('saveProfileBtn');
        const cancelBtn = safeGetElement('cancelEditProfileBtn');
        if (saveBtn && cancelBtn) {
            saveBtn.classList.remove('d-none');
            cancelBtn.classList.remove('d-none');
        }
    } catch (error) {
        logMessage(`Error editing profile: ${error.message}`, 'error');
        showToast('Gagal membuka halaman profil', 'error');
    }
}

function saveProfile() {
    try {
        const profilNama = safeGetElement('profilNama');
        if (!profilNama) return;

        const newName = profilNama.value?.trim();
        if (!newName) {
            showToast('Nama tidak boleh kosong', 'warning');
            logMessage('Profile save cancelled: empty name', 'warning');
            return;
        }

        // Update siswa_data
        const siswaData = getSiswaData() || {};
        const oldName = siswaData.nama;
        siswaData.nama = newName;
        saveSiswaData(siswaData);

        // Update siakad_user session
        const siakadUserRaw = localStorage.getItem('siakad_user');
        if (siakadUserRaw) {
            try {
                const user = JSON.parse(siakadUserRaw);
                user.name = newName;
                localStorage.setItem('siakad_user', JSON.stringify(user));
                logMessage(`Profile updated: ${oldName} → ${newName}`, 'success');
            } catch (e) {
                logMessage('Warning: Could not update siakad_user', 'warning');
            }
        }

        // Update UI (userName in topbar)
        const userName = safeGetElement('userName');
        if (userName) userName.textContent = newName;

        logMessage('Profil disimpan ke localStorage', 'success');
    } catch (error) {
        logMessage(`Error saving profile: ${error.message}`, 'error');
        showToast('Gagal menyimpan profil', 'error');
    }
}

function showToast(message, type = 'info') {
    try {
        const toastEl = document.getElementById('siakadToast');
        const toastBody = document.getElementById('toast-body');
        const toastTime = document.getElementById('toast-time');

        if (!toastEl || !toastBody || !toastTime) {
            // Fallback to alert if toast not available
            alert(message);
            return;
        }

        // Update content
        toastBody.textContent = message;
        toastTime.textContent = new Date().toLocaleTimeString('id-ID');

        // Style by type (simple): add contextual class to header or body
        toastEl.classList.remove('bg-success', 'bg-danger', 'bg-warning', 'bg-info');
        if (type === 'success') toastEl.classList.add('bg-success');
        else if (type === 'error') toastEl.classList.add('bg-danger');
        else if (type === 'warning') toastEl.classList.add('bg-warning');
        else toastEl.classList.add('bg-info');

        // Use Bootstrap Toast
        const bsToast = bootstrap.Toast.getOrCreateInstance(toastEl);
        bsToast.show();
    } catch (error) {
        console.error('Toast error', error);
    }
}

// ==========================================
// AVATAR UPLOAD FUNCTIONS
// ==========================================

function triggerAvatarUpload() {
    try {
        logMessage('Avatar click triggered, initiating upload...', 'info');

        // Create hidden file input if not exists
        let fileInput = document.getElementById('avatarFileInput');
        if (!fileInput) {
            fileInput = document.createElement('input');
            fileInput.id = 'avatarFileInput';
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';
            fileInput.addEventListener('change', handleAvatarUpload);
            document.body.appendChild(fileInput);
            logMessage('Created hidden file input element', 'info');
        }

        // Trigger file picker
        fileInput.click();
    } catch (error) {
        logMessage(`Error triggering avatar upload: ${error.message}`, 'error');
        showToast('Gagal membuka file picker', 'error');
    }
}

function handleAvatarUpload(event) {
    try {
        const file = event.target.files?.[0];
        if (!file) {
            logMessage('No file selected', 'info');
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            showToast('Hanya file gambar yang diperbolehkan', 'warning');
            logMessage(`Invalid file type: ${file.type}`, 'warning');
            return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            showToast('Ukuran file maksimal 5MB', 'warning');
            logMessage(`File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB`, 'warning');
            return;
        }

        logMessage(`Processing avatar file: ${file.name} (${(file.size / 1024).toFixed(2)}KB)`, 'info');

        // Convert to Data URL
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const dataUrl = e.target.result;

                // Open preview modal and allow user to crop/confirm before saving
                window.__pendingAvatarData = dataUrl;
                window.__pendingAvatarCropped = null;
                const previewImg = document.getElementById('avatarPreviewImg');
                if (previewImg) previewImg.src = dataUrl;

                const modalEl = document.getElementById('avatarPreviewModal');
                if (modalEl) {
                    window.__avatarPreviewModal = new bootstrap.Modal(modalEl);
                    window.__avatarPreviewModal.show();
                } else {
                    // Fallback: save immediately if modal missing
                    localStorage.setItem('siakad_custom_avatar', dataUrl);
                    const userAvatar = safeGetElement('userAvatar');
                    const profilFoto = safeGetElement('profilFoto');
                    if (userAvatar) userAvatar.src = dataUrl;
                    if (profilFoto) profilFoto.src = dataUrl;
                    showToast('Avatar berhasil diubah!', 'success');
                }
                logMessage('Avatar ready for preview', 'info');
            } catch (error) {
                logMessage(`Error processing avatar: ${error.message}`, 'error');
                showToast('Gagal memproses avatar', 'error');
            }
        };

        reader.onerror = function (error) {
            logMessage(`Error reading file: ${error.message}`, 'error');
            showToast('Gagal membaca file', 'error');
        };

        // Read file as Data URL
        reader.readAsDataURL(file);

        // Reset file input so same file can be selected again
        event.target.value = '';
    } catch (error) {
        logMessage(`Error in handleAvatarUpload: ${error.message}`, 'error');
        showToast('Gagal mengganti avatar', 'error');
    }
}

// ✅ LOGOUT FUNCTION SUDAH DIIMPLEMENTASIKAN DI siswa.html
// Tidak perlu duplikasi di sini

async function downloadRaport() {
    try {
        const semester = document.querySelector('#section-raport select')?.value || 'Semester 1 (2024/2025)';
        logMessage(`Raport ${semester} siap untuk di-download`, 'info');

        // Build PDF using jsPDF (UMD bundle exposed on window.jspdf)
        try {
            const { jsPDF } = window.jspdf || {};
            if (!jsPDF) {
                showToast('Library PDF tidak tersedia', 'error');
                return;
            }

            // Create A4 document in mm
            const doc = new jsPDF({ unit: 'mm', format: 'a4' });
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 14;
            const siswa = getSiswaData();
            const nilai = getNilaiData();

            // Header: logo (left) + school info (center) + report title (below)
            let headerHeight = 0;
            try {
                const logoUrl = 'assets/img/logo.jpeg';
                const imgData = await loadImageAsDataURL(logoUrl);
                if (imgData) {
                    // keep logo square, 28mm
                    const logoSize = 28;
                    doc.addImage(imgData, 'JPEG', margin, margin, logoSize, logoSize);
                    headerHeight = Math.max(headerHeight, logoSize);
                }
            } catch (e) {
                // ignore logo errors
            }

            // School text centered
            const schoolName = 'SMP YPPGI Bomou';
            const schoolAddr = 'Kab. Deiyai';
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text(schoolName, pageWidth / 2, margin + 8, { align: 'center' });
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.text(schoolAddr, pageWidth / 2, margin + 14, { align: 'center' });

            // Report title
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            const titleY = margin + headerHeight + 12;
            doc.text('RAPORT SISWA', pageWidth / 2, titleY, { align: 'center' });
            doc.setFontSize(11);
            doc.setFont(undefined, 'normal');
            doc.text(semester, pageWidth / 2, titleY + 6, { align: 'center' });

            // Student info box (right side under header)
            const infoStartY = titleY + 12;
            const infoX = margin;
            const infoBoxWidth = pageWidth - margin * 2;

            doc.setFontSize(11);
            const infoLines = [
                `Nama: ${siswa.nama || '-'}`,
                `NIS: ${siswa.nis || '-'}`,
                `Kelas: ${siswa.kelas || '-'}`,
                `T.A: ${siswa.tahunAkademik || '-'}`
            ];

            let cursorY = infoStartY;
            infoLines.forEach((line) => {
                doc.text(line, infoX, cursorY);
                cursorY += 6;
            });

            // Table of grades (use autoTable if available)
            let tableEndY = cursorY + 4;
            try {
                const head = [['Mata Pelajaran', 'Harian', 'UTS', 'UAS', 'Rata-rata']];
                const body = nilai.map(n => {
                    const rata = calculateAverage(n.harian, n.uts, n.uas);
                    return [n.mapel, String(n.harian), String(n.uts), String(n.uas), String(rata)];
                });

                doc.autoTable({
                    head: head,
                    body: body,
                    startY: tableEndY,
                    margin: { left: margin, right: margin },
                    styles: { fontSize: 10 },
                    headStyles: { fillColor: [102, 126, 234], textColor: 255 },
                    theme: 'grid',
                    didDrawPage: function (data) {
                        // reserved for per-page decorations if needed
                    }
                });

                tableEndY = doc.lastAutoTable.finalY || (tableEndY + (body.length * 8));
            } catch (err) {
                // fallback simple rendering
                let y = tableEndY;
                doc.setFontSize(11);
                doc.text('Mata Pelajaran', margin, y);
                doc.text('Harian', margin + 90, y);
                doc.text('UTS', margin + 120, y);
                doc.text('UAS', margin + 145, y);
                doc.text('Rata-rata', margin + 170, y);
                y += 6;
                nilai.forEach((n, i) => {
                    const rata = calculateAverage(n.harian, n.uts, n.uas);
                    doc.text(n.mapel, margin, y + (i * 6));
                    doc.text(String(n.harian), margin + 90, y + (i * 6));
                    doc.text(String(n.uts), margin + 120, y + (i * 6));
                    doc.text(String(n.uas), margin + 145, y + (i * 6));
                    doc.text(String(rata), margin + 170, y + (i * 6));
                });
                tableEndY = y + (nilai.length * 6);
            }

            // Summary: average and attendance
            const avgValues = nilai.map(n => parseFloat(calculateAverage(n.harian, n.uts, n.uas)));
            const avg = (avgValues.reduce((a, b) => a + b, 0) / (avgValues.length || 1)).toFixed(1);
            const abs = getAbsensiData();
            const attendanceText = `Kehadiran: Hadir ${abs.hadir}, Sakit ${abs.sakit}, Izin ${abs.izin}, Alfa ${abs.alfa}`;

            const summaryY = tableEndY + 8;
            doc.setFontSize(11);
            doc.text(`Rata-rata Nilai: ${avg}`, margin, summaryY);
            doc.text(attendanceText, margin, summaryY + 6);

            // Signature boxes (bottom)
            const sigY = pageHeight - 50;
            const sigBoxWidth = 70;
            doc.rect(margin, sigY, sigBoxWidth, 35); // Guru
            doc.text('Guru/Wali Kelas', margin + 8, sigY + 42);

            doc.rect(pageWidth - margin - sigBoxWidth, sigY, sigBoxWidth, 35); // Kepala Sekolah
            doc.text('Kepala Sekolah', pageWidth - margin - sigBoxWidth + 6, sigY + 42);

            // Footer: page number and print date
            const printedAt = new Date().toLocaleString('id-ID');
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(9);
                doc.text(`Dicetak: ${printedAt}`, margin, pageHeight - 8);
                doc.text(`Halaman ${i} / ${pageCount}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
            }

            const fileName = `raport-${siswa.nis || 'siswa'}-${semester.replace(/[^0-9a-zA-Z]/g, '_')}.pdf`;
            doc.save(fileName);

            showToast(`Raport ${semester} berhasil dibuat (download)`, 'success');
            logMessage(`Raport ${semester} dibuat: ${fileName}`, 'success');
        } catch (pdfError) {
            logMessage(`Error creating PDF: ${pdfError.message}`, 'error');
            showToast('Gagal membuat PDF raport', 'error');
        }
    } catch (error) {
        logMessage(`Error downloading raport: ${error.message}`, 'error');
    }
}

// ==========================================
// DASHBOARD SUMMARY FUNCTIONS
// ==========================================

function updateDashboardSummary() {
    try {
        const siswa = getSiswaData();
        const absensi = getAbsensiData();
        const nilaiData = getNilaiData();

        // Hitung rata-rata nilai
        const avgValues = nilaiData.map(n => calculateAverage(n.harian, n.uts, n.uas));
        const rataRata = (avgValues.reduce((a, b) => a + parseFloat(b), 0) / avgValues.length).toFixed(1);

        // Update counters
        const rataRataNilaiElement = document.querySelector('[data-summary="rata-rata"]');
        const kehadiranElement = document.querySelector('[data-summary="kehadiran"]');
        const statusSppElement = document.querySelector('[data-summary="status-spp"]');
        const rankingElement = document.querySelector('[data-summary="ranking"]');

        if (rataRataNilaiElement) rataRataNilaiElement.textContent = rataRata;
        if (kehadiranElement) kehadiranElement.textContent = calculateAttendancePercentage(absensi.hadir, absensi.sakit, absensi.izin, absensi.alfa) + '%';
        if (statusSppElement) statusSppElement.textContent = 'Lunas';
        if (rankingElement) rankingElement.textContent = '5 dari 28';

        logMessage('Dashboard summary updated', 'success');
    } catch (error) {
        logMessage(`Error updating dashboard summary: ${error.message}`, 'error');
    }
}

// ==========================================
// INITIALIZATION - Page Load
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    try {
        logMessage('Sistem SIAKAD (Dashboard Siswa) diinisialisasi...', 'info');

        // Check authentication
        const user = checkAuth();
        if (!user) {
            logMessage('User tidak terautentikasi, redirect ke login', 'warning');
            return;
        }

        // Run system validation
        systemCheck();

        // Initialize UI components
        initializeUserInfo();
        initializeNavigation();
        initializeMobileSidebar();
        initializeProfileActions();

        // Attach avatar edit button listener (topbar small icon)
        try {
            const avatarEditBtn = document.getElementById('avatarEditBtn');
            if (avatarEditBtn) {
                avatarEditBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation(); // prevent dropdown from closing
                    triggerAvatarUpload();
                });
                logMessage('avatarEditBtn listener attached', 'info');
            }

            // Modal buttons: Crop Center and Save
            const cropBtn = document.getElementById('cropCenterBtn');
            const saveBtn = document.getElementById('saveAvatarBtn');
            if (cropBtn) {
                cropBtn.addEventListener('click', () => {
                    const data = window.__pendingAvatarData;
                    if (!data) return showToast('Tidak ada gambar untuk di-crop');
                    centerCropDataUrl(data, 300).then((cropped) => {
                        window.__pendingAvatarCropped = cropped;
                        const previewImg = document.getElementById('avatarPreviewImg');
                        if (previewImg) previewImg.src = cropped;
                        showToast('Gambar telah di-crop (pusat)');
                    }).catch((err) => {
                        logMessage(`Crop error: ${err.message}`, 'error');
                        showToast('Gagal crop gambar');
                    });
                });
            }
            if (saveBtn) {
                saveBtn.addEventListener('click', () => {
                    try {
                        const finalData = window.__pendingAvatarCropped || window.__pendingAvatarData;
                        if (!finalData) return showToast('Tidak ada gambar untuk disimpan');
                        localStorage.setItem('siakad_custom_avatar', finalData);
                        const userAvatar = safeGetElement('userAvatar');
                        const profilFoto = safeGetElement('profilFoto');
                        if (userAvatar) userAvatar.src = finalData;
                        if (profilFoto) profilFoto.src = finalData;
                        showToast('Avatar berhasil disimpan', 'success');
                        if (window.__avatarPreviewModal) window.__avatarPreviewModal.hide();
                    } catch (err) {
                        logMessage(`Save avatar error: ${err.message}`, 'error');
                        showToast('Gagal menyimpan avatar');
                    }
                });
            }
        } catch (err) {
            logMessage(`Error attaching avatar modal listeners: ${err.message}`, 'warning');
        }

        // Render all data
        renderAllData();
        updateDashboardSummary();

        logMessage('Sistem siap untuk digunakan', 'success');
    } catch (error) {
        logMessage(`Critical error during initialization: ${error.message}`, 'error');
    }
});

// ==========================================
// EXPORT FUNCTIONS (untuk debugging)
// ==========================================

// Expose utility functions globally for console access
window.SiakadUtils = {
    logMessage,
    formatCurrency,
    calculateAverage,
    calculateAttendancePercentage,
    systemCheck,
    renderAllData,
    getSiswaData,
    saveSiswaData
};

// Expose additional helpers
window.SiakadUtils.saveProfile = saveProfile;
window.SiakadUtils.showToast = showToast;
