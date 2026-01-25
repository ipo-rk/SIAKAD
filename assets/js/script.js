// --- Role switching (Admin / Guru / Siswa) ---
function switchRole(role) {
    const sidebar = document.getElementById('sidebar');
    const sidebarRole = document.getElementById('sidebarRole');

    if (sidebarRole) {
        sidebarRole.innerText = role.charAt(0).toUpperCase() + role.slice(1);
    }

    // Show/hide menus by role
    const menuAdmin = document.getElementById('menuAdmin');
    const menuGuru = document.getElementById('menuGuru');
    const menuSiswa = document.getElementById('menuSiswa');

    if (menuAdmin) menuAdmin.classList.toggle('d-none', role !== 'admin');
    if (menuGuru) menuGuru.classList.toggle('d-none', role !== 'guru');
    if (menuSiswa) menuSiswa.classList.toggle('d-none', role !== 'siswa');
}

// Initialize with admin role
switchRole('admin');

// ========================================
// ALPINE.JS REACTIVE APPLICATION
// ========================================
/**
 * MAIN ADMIN APP - Fully Interactive with Alpine.js
 * All CRUD operations, data binding, and state management
 * With localStorage persistence for all CRUD operations
 */
function adminApp() {
    return {
        // ========== UI STATE ==========
        activeSection: 'dashboard',
        sidebarOpen: false,
        showNotifications: false,
        editingIndex: null,
        showModal: null,
        importType: 'siswa',
        previewData: [],
        selectedSiswaForCard: '',
        dismissedNotifications: [],
        notificationFilter: 'all',
        pinnedAnnouncements: [],
        archivedAnnouncements: [],

        // ========== DEFAULT DATA (INITIAL SEED) ==========
        defaultSiswaData: [
            { nis: '10234', nama: 'Andi', kelas: '8A', agama: 'Kristen', status: 'Lunas' },
            { nis: '10235', nama: 'Budi', kelas: '8B', agama: 'Islam', status: 'Tunggakan' },
            { nis: '10236', nama: 'Citra', kelas: '9A', agama: 'Katolik', status: 'Lunas' }
        ],

        defaultGuruData: [
            { nip: '199201011', nama: 'D. Wonda', mapel: 'Matematika', status: 'PNS', telepon: '081234567890', email: 'dwonda@school.id' },
            { nip: '199302012', nama: 'M. Dogopia', mapel: 'IPA', status: 'PNS', telepon: '081234567891', email: 'mdogopia@school.id' },
            { nip: '199403013', nama: 'A. Mote', mapel: 'Bahasa Indonesia', status: 'Honorer', telepon: '081234567892', email: 'amote@school.id' }
        ],

        defaultKelasData: [
            { kode: '8A', nama: 'VIII A', wali: 'D. Wonda', ruang: '101', jmlSiswa: 28 },
            { kode: '8B', nama: 'VIII B', wali: 'M. Dogopia', ruang: '102', jmlSiswa: 30 },
            { kode: '9A', nama: 'IX A', wali: 'A. Mote', ruang: '201', jmlSiswa: 26 }
        ],

        defaultMapelData: [
            { kode: 'MTK001', nama: 'Matematika', sks: 4, guru: 'D. Wonda' },
            { kode: 'IPA001', nama: 'Ilmu Pengetahuan Alam', sks: 4, guru: 'M. Dogopia' },
            { kode: 'IND001', nama: 'Bahasa Indonesia', sks: 3, guru: 'A. Mote' }
        ],

        defaultJadwalData: [
            { hari: 'Senin', jam_mulai: '07:00', jam_selesai: '07:40', kelas: '8A', mapel: 'Matematika', guru: 'D. Wonda', ruang: '101' },
            { hari: 'Senin', jam_mulai: '07:40', jam_selesai: '08:20', kelas: '8A', mapel: 'IPA', guru: 'M. Dogopia', ruang: '101' },
            { hari: 'Selasa', jam_mulai: '07:00', jam_selesai: '07:40', kelas: '8B', mapel: 'Bahasa Indonesia', guru: 'A. Mote', ruang: '102' }
        ],

        defaultJadwalUjianData: [
            { jenis_ujian: 'UTS', tanggal: '2024-11-15', mapel: 'Matematika', kelas: '8A', waktu_mulai: '07:00', ruang: '101' },
            { jenis_ujian: 'UTS', tanggal: '2024-11-16', mapel: 'IPA', kelas: '8A', waktu_mulai: '07:00', ruang: '101' },
            { jenis_ujian: 'UAS', tanggal: '2024-12-20', mapel: 'Bahasa Indonesia', kelas: '8B', waktu_mulai: '08:00', ruang: '102' }
        ],

        defaultNilaiData: [
            { nis: '10234', nama: 'Andi', nilai_harian: 78, uts: 80, uas: 85 },
            { nis: '10235', nama: 'Budi', nilai_harian: 72, uts: 75, uas: 78 },
            { nis: '10236', nama: 'Citra', nilai_harian: 88, uts: 90, uas: 92 }
        ],

        defaultAbsensiData: [
            { nis: '10234', nama: 'Andi', hadir: 18, sakit: 1, izin: 1, alfa: 0 },
            { nis: '10235', nama: 'Budi', hadir: 16, sakit: 2, izin: 2, alfa: 0 },
            { nis: '10236', nama: 'Citra', hadir: 19, sakit: 0, izin: 1, alfa: 0 }
        ],

        defaultKeuanganData: [
            { tanggal: '2024-10-01', nis: '10234', nama: 'Andi', jenis: 'SPP', jumlah: 150000, keterangan: 'SPP Oktober' },
            { tanggal: '2024-10-02', nis: '10235', nama: 'Budi', jenis: 'SPP', jumlah: 150000, keterangan: 'SPP Oktober' },
            { tanggal: '2024-10-03', nis: '10234', nama: 'Andi', jenis: 'Uang Gedung', jumlah: 500000, keterangan: 'Pembayaran uang gedung' }
        ],

        // ========== REACTIVE DATA ARRAYS (LOADED FROM LOCALSTORAGE) ==========
        siswaData: [],
        guruData: [],
        kelasData: [],
        mapelData: [],
        jadwalData: [],
        jadwalUjianData: [],
        nilaiData: [],
        absensiData: [],
        keuanganData: [],

        // ========== ANNOUNCEMENT DATA ==========
        pengumumanData: [
            {
                id: 'pengumuman_001',
                title: 'Liburan Semester 1 Dimulai',
                content: 'Liburan semester 1 tahun ajaran 2024/2025 akan dimulai pada tanggal 15 Desember 2024 hingga 10 Januari 2025.',
                author: 'Kepala Sekolah',
                timestamp: new Date('2025-01-10T14:30:00'),
                priority: 1,
                category: 'Pengumuman',
                icon: 'fa-bullhorn',
                type: 'info',
                isRead: false,
                isPinned: false,
                status: 'active'
            },
            {
                id: 'pengumuman_002',
                title: 'Pengumpulan Rapor Semester 1',
                content: 'Pengumpulan rapor semester 1 akan dilaksanakan pada tanggal 20 Januari 2025 di ruang guru.',
                author: 'Wakil Kepala Sekolah',
                timestamp: new Date('2025-01-09T10:15:00'),
                priority: 2,
                category: 'Pengumuman',
                icon: 'fa-document',
                type: 'warning',
                isRead: false,
                isPinned: false,
                status: 'active'
            },
            {
                id: 'pengumuman_003',
                title: 'Rapat Orang Tua Siswa',
                content: 'Rapat orang tua siswa akan diadakan pada tanggal 25 Januari 2025 pukul 13:00 WIT di aula sekolah.',
                author: 'TU Sekolah',
                timestamp: new Date('2025-01-08T09:00:00'),
                priority: 2,
                category: 'Pengumuman',
                icon: 'fa-calendar',
                type: 'warning',
                isRead: true,
                isPinned: false,
                status: 'active'
            }
        ],

        // ========== FORM STATE WITH TWO-WAY BINDING ==========
        formSiswa: { nis: '', nama: '', kelas: '8A', agama: 'Islam', status: 'Lunas' },
        formGuru: { nip: '', nama: '', mapel: 'Matematika', status: 'PNS', telepon: '', email: '' },
        formKelas: { kode: '', nama: '', wali: '', ruang: '', jmlSiswa: 0 },
        formMapel: { kode: '', nama: '', sks: 4, guru: '' },
        formJadwal: { hari: 'Senin', jam_mulai: '', jam_selesai: '', kelas: '8A', mapel: '', guru: '', ruang: '' },
        formJadwalUjian: { jenis_ujian: 'UTS', tanggal: '', mapel: '', kelas: '8A', waktu_mulai: '', ruang: '' },
        formNilai: { nis: '', nilai_harian: 0, uts: 0, uas: 0 },
        formKeuangan: { tanggal: '', nis: '', jenis: 'SPP', jumlah: 0, keterangan: '' },

        // ========== MENU ITEMS ==========
        menuItems: [
            { id: 1, section: 'dashboard', label: 'Dashboard', icon: 'fa fa-home' },
            { id: 2, section: 'data-master', label: 'Data Master', icon: 'fa fa-database' },
            { id: 3, section: 'data-siswa', label: 'Data Siswa', icon: 'fa fa-user-graduate' },
            { id: 4, section: 'data-guru', label: 'Data Guru', icon: 'fa fa-chalkboard-teacher' },
            { id: 5, section: 'data-kelas', label: 'Data Kelas', icon: 'fa fa-school' },
            { id: 6, section: 'mapel', label: 'Data Mata Pelajaran', icon: 'fa fa-book' },
            { id: 7, section: 'jadwal', label: 'Jadwal Pelajaran', icon: 'fa fa-calendar-day' },
            { id: 8, section: 'jadwal-ujian', label: 'Jadwal Ujian', icon: 'fa fa-file-lines' },
            { id: 9, section: 'nilai', label: 'Nilai Siswa', icon: 'fa fa-star' },
            { id: 10, section: 'absensi', label: 'Absensi', icon: 'fa fa-check-square' },
            { id: 11, section: 'keuangan', label: 'Keuangan (SPP)', icon: 'fa fa-wallet' },
            { id: 12, section: 'laporan', label: 'Laporan', icon: 'fa fa-file-alt' },
            { id: 13, section: 'pengaturan', label: 'Pengaturan Sistem', icon: 'fa fa-cog' },
        ],

        // ========== UI METHODS ==========
        toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; },

        navigateTo(section) {
            this.activeSection = section;
            this.sidebarOpen = false;
        },

        navigateToSection(section) {
            // Alias for navigateTo - used by data-master "Kelola" buttons
            this.navigateTo(section);
        },

        openModal(modalName) {
            console.log('🔍 openModal called with:', modalName);
            this.showModal = modalName;
            this.editingIndex = null;
            this.resetForms();
            console.log('✅ Modal state updated:', { showModal: this.showModal, editingIndex: this.editingIndex });
        },

        closeModal() {
            console.log('❌ closeModal called');
            this.showModal = null;
            this.editingIndex = null;
            console.log('✅ Modal closed');
        },

        resetForms() {
            this.formSiswa = { nis: '', nama: '', kelas: '8A', agama: 'Islam', status: 'Lunas' };
            this.formGuru = { nip: '', nama: '', mapel: 'Matematika', status: 'PNS', telepon: '', email: '' };
            this.formKelas = { kode: '', nama: '', wali: '', ruang: '', jmlSiswa: 0 };
            this.formMapel = { kode: '', nama: '', sks: 4, guru: '' };
            this.formJadwal = { hari: 'Senin', jam_mulai: '', jam_selesai: '', kelas: '8A', mapel: '', guru: '', ruang: '' };
            this.formJadwalUjian = { jenis_ujian: 'UTS', tanggal: '', mapel: '', kelas: '8A', waktu_mulai: '', ruang: '' };
            this.formNilai = { nis: '', nilai_harian: 0, uts: 0, uas: 0 };
            this.formKeuangan = { tanggal: '', nis: '', jenis: 'SPP', jumlah: 0, keterangan: '' };
        },

        // ========== SISWA CRUD - FULLY INTERACTIVE WITH LOCALSTORAGE ==========
        addSiswa() {
            if (!this.formSiswa.nis || !this.formSiswa.nama) {
                alert('NIS dan Nama harus diisi');
                return;
            }
            if (this.editingIndex !== null) {
                this.siswaData[this.editingIndex] = { ...this.formSiswa };
                this.editingIndex = null;
                this.saveToLocalStorage('siakad_siswa', this.siswaData);
                this.showToast('✅ Siswa berhasil diperbarui', 'success');
            } else {
                this.siswaData.push({ ...this.formSiswa });
                this.saveToLocalStorage('siakad_siswa', this.siswaData);
                this.showToast('✅ Siswa berhasil ditambahkan', 'success');
            }
            this.closeModal();
        },

        editSiswa(index) {
            this.editingIndex = index;
            this.formSiswa = { ...this.siswaData[index] };
            this.openModal('siswa');
        },

        deleteSiswa(index) {
            if (confirm(`Hapus siswa ${this.siswaData[index].nama}?`)) {
                this.siswaData.splice(index, 1);
                this.saveToLocalStorage('siakad_siswa', this.siswaData);
                this.showToast('✅ Siswa berhasil dihapus', 'success');
            }
        },

        // ========== GURU CRUD ==========
        addGuru() {
            if (!this.formGuru.nip || !this.formGuru.nama) {
                alert('NIP dan Nama harus diisi');
                return;
            }
            if (this.editingIndex !== null) {
                this.guruData[this.editingIndex] = { ...this.formGuru };
                this.editingIndex = null;
                this.saveToLocalStorage('siakad_guru', this.guruData);
                this.showToast('✅ Guru berhasil diperbarui', 'success');
            } else {
                this.guruData.push({ ...this.formGuru });
                this.saveToLocalStorage('siakad_guru', this.guruData);
                this.showToast('✅ Guru berhasil ditambahkan', 'success');
            }
            this.closeModal();
        },

        editGuru(index) {
            this.editingIndex = index;
            this.formGuru = { ...this.guruData[index] };
            this.openModal('guru');
        },

        deleteGuru(index) {
            if (confirm(`Hapus guru ${this.guruData[index].nama}?`)) {
                this.guruData.splice(index, 1);
                this.saveToLocalStorage('siakad_guru', this.guruData);
                this.showToast('✅ Guru berhasil dihapus', 'success');
            }
        },

        // ========== KELAS CRUD ==========
        addKelas() {
            if (!this.formKelas.kode || !this.formKelas.nama) {
                alert('Kode dan Nama harus diisi');
                return;
            }
            if (this.editingIndex !== null) {
                this.kelasData[this.editingIndex] = { ...this.formKelas };
                this.editingIndex = null;
                this.saveToLocalStorage('siakad_kelas', this.kelasData);
                this.showToast('✅ Kelas berhasil diperbarui', 'success');
            } else {
                this.kelasData.push({ ...this.formKelas });
                this.saveToLocalStorage('siakad_kelas', this.kelasData);
                this.showToast('✅ Kelas berhasil ditambahkan', 'success');
            }
            this.closeModal();
        },

        editKelas(index) {
            this.editingIndex = index;
            this.formKelas = { ...this.kelasData[index] };
            this.openModal('kelas');
        },

        deleteKelas(index) {
            if (confirm(`Hapus kelas ${this.kelasData[index].nama}?`)) {
                this.kelasData.splice(index, 1);
                this.saveToLocalStorage('siakad_kelas', this.kelasData);
                this.showToast('✅ Kelas berhasil dihapus', 'success');
            }
        },

        // ========== MAPEL CRUD ==========
        addMapel() {
            if (!this.formMapel.kode || !this.formMapel.nama) {
                alert('Kode dan Nama harus diisi');
                return;
            }
            if (this.editingIndex !== null) {
                this.mapelData[this.editingIndex] = { ...this.formMapel };
                this.editingIndex = null;
                this.saveToLocalStorage('siakad_mapel', this.mapelData);
                this.showToast('✅ Mapel berhasil diperbarui', 'success');
            } else {
                this.mapelData.push({ ...this.formMapel });
                this.saveToLocalStorage('siakad_mapel', this.mapelData);
                this.showToast('✅ Mapel berhasil ditambahkan', 'success');
            }
            this.closeModal();
        },

        editMapel(index) {
            this.editingIndex = index;
            this.formMapel = { ...this.mapelData[index] };
            this.openModal('mapel');
        },

        deleteMapel(index) {
            if (confirm(`Hapus mapel ${this.mapelData[index].nama}?`)) {
                this.mapelData.splice(index, 1);
                this.saveToLocalStorage('siakad_mapel', this.mapelData);
                this.showToast('✅ Mapel berhasil dihapus', 'success');
            }
        },

        // ========== JADWAL CRUD ==========
        addJadwal() {
            if (!this.formJadwal.jam_mulai || !this.formJadwal.mapel) {
                alert('Semua field harus diisi');
                return;
            }
            if (this.editingIndex !== null) {
                this.jadwalData[this.editingIndex] = { ...this.formJadwal };
                this.editingIndex = null;
                this.saveToLocalStorage('siakad_jadwal', this.jadwalData);
                this.showToast('✅ Jadwal berhasil diperbarui', 'success');
            } else {
                this.jadwalData.push({ ...this.formJadwal });
                this.saveToLocalStorage('siakad_jadwal', this.jadwalData);
                this.showToast('✅ Jadwal berhasil ditambahkan', 'success');
            }
            this.closeModal();
        },

        editJadwal(index) {
            this.editingIndex = index;
            this.formJadwal = { ...this.jadwalData[index] };
            this.openModal('jadwal');
        },

        deleteJadwal(index) {
            if (confirm('Hapus jadwal ini?')) {
                this.jadwalData.splice(index, 1);
                this.saveToLocalStorage('siakad_jadwal', this.jadwalData);
                this.showToast('✅ Jadwal berhasil dihapus', 'success');
            }
        },

        // ========== JADWAL UJIAN CRUD ==========
        addJadwalUjian() {
            if (!this.formJadwalUjian.tanggal || !this.formJadwalUjian.mapel) {
                alert('Semua field harus diisi');
                return;
            }
            if (this.editingIndex !== null) {
                this.jadwalUjianData[this.editingIndex] = { ...this.formJadwalUjian };
                this.editingIndex = null;
                this.saveToLocalStorage('siakad_jadwal_ujian', this.jadwalUjianData);
                this.showToast('✅ Jadwal ujian berhasil diperbarui', 'success');
            } else {
                this.jadwalUjianData.push({ ...this.formJadwalUjian });
                this.saveToLocalStorage('siakad_jadwal_ujian', this.jadwalUjianData);
                this.showToast('✅ Jadwal ujian berhasil ditambahkan', 'success');
            }
            this.closeModal();
        },

        editJadwalUjian(index) {
            this.editingIndex = index;
            this.formJadwalUjian = { ...this.jadwalUjianData[index] };
            this.openModal('jadwalUjian');
        },

        deleteJadwalUjian(index) {
            if (confirm('Hapus jadwal ujian ini?')) {
                this.jadwalUjianData.splice(index, 1);
                this.saveToLocalStorage('siakad_jadwal_ujian', this.jadwalUjianData);
                this.showToast('✅ Jadwal ujian berhasil dihapus', 'success');
            }
        },

        // ========== NILAI CRUD ==========
        addNilai() {
            if (!this.formNilai.nis) {
                alert('NIS harus dipilih');
                return;
            }
            if (this.editingIndex !== null) {
                this.nilaiData[this.editingIndex] = {
                    ...this.nilaiData[this.editingIndex],
                    nilai_harian: this.formNilai.nilai_harian,
                    uts: this.formNilai.uts,
                    uas: this.formNilai.uas
                };
                this.editingIndex = null;
                this.saveToLocalStorage('siakad_nilai', this.nilaiData);
                this.showToast('✅ Nilai berhasil diperbarui', 'success');
            } else {
                const siswa = this.siswaData.find(s => s.nis === this.formNilai.nis);
                if (siswa && !this.nilaiData.find(n => n.nis === this.formNilai.nis)) {
                    this.nilaiData.push({
                        nis: this.formNilai.nis,
                        nama: siswa.nama,
                        nilai_harian: this.formNilai.nilai_harian,
                        uts: this.formNilai.uts,
                        uas: this.formNilai.uas
                    });
                    this.saveToLocalStorage('siakad_nilai', this.nilaiData);
                    this.showToast('✅ Nilai berhasil ditambahkan', 'success');
                }
            }
            this.closeModal();
        },

        editNilai(index) {
            this.editingIndex = index;
            this.formNilai = {
                nis: this.nilaiData[index].nis,
                nilai_harian: this.nilaiData[index].nilai_harian,
                uts: this.nilaiData[index].uts,
                uas: this.nilaiData[index].uas
            };
            this.openModal('nilai');
        },

        deleteNilai(index) {
            if (confirm(`Hapus nilai siswa ${this.nilaiData[index].nama}?`)) {
                this.nilaiData.splice(index, 1);
                this.saveToLocalStorage('siakad_nilai', this.nilaiData);
                this.showToast('✅ Nilai berhasil dihapus', 'success');
            }
        },

        // ========== KEUANGAN CRUD ==========
        addKeuangan() {
            if (!this.formKeuangan.tanggal || !this.formKeuangan.nis) {
                alert('Tanggal dan NIS harus diisi');
                return;
            }
            if (this.editingIndex !== null) {
                this.keuanganData[this.editingIndex] = { ...this.formKeuangan };
                this.editingIndex = null;
                this.saveToLocalStorage('siakad_keuangan', this.keuanganData);
                this.showToast('✅ Transaksi keuangan berhasil diperbarui', 'success');
            } else {
                const siswa = this.siswaData.find(s => s.nis === this.formKeuangan.nis);
                if (siswa) {
                    this.keuanganData.push({
                        ...this.formKeuangan,
                        nama: siswa.nama
                    });
                    this.saveToLocalStorage('siakad_keuangan', this.keuanganData);
                    this.showToast('✅ Transaksi keuangan berhasil ditambahkan', 'success');
                }
            }
            this.closeModal();
        },

        editKeuangan(index) {
            this.editingIndex = index;
            this.formKeuangan = { ...this.keuanganData[index] };
            this.openModal('keuangan');
        },

        deleteKeuangan(index) {
            if (confirm('Hapus transaksi keuangan ini?')) {
                this.keuanganData.splice(index, 1);
                this.saveToLocalStorage('siakad_keuangan', this.keuanganData);
                this.showToast('✅ Transaksi berhasil dihapus', 'success');
            }
        },

        // ========== COMPUTED PROPERTIES (Auto-updating) ==========
        get totalSiswa() { return this.siswaData.length; },
        get totalGuru() { return this.guruData.length; },
        get totalKelas() { return this.kelasData.length; },
        get totalMapel() { return this.mapelData.length; },

        get sppBulanIni() {
            return this.keuanganData
                .filter(k => k.jenis === 'SPP')
                .reduce((sum, k) => sum + k.jumlah, 0);
        },

        get sppLunas() {
            return this.siswaData.filter(s => s.status === 'Lunas').length;
        },

        get sppTunggak() {
            return this.totalSiswa - this.sppLunas;
        },

        get nilaiRataSiswa() {
            if (this.nilaiData.length === 0) return 0;
            return (this.nilaiData.map(n =>
                (parseInt(n.nilai_harian) + parseInt(n.uts) + parseInt(n.uas)) / 3
            ).reduce((sum, n) => sum + n, 0) / this.nilaiData.length).toFixed(1);
        },

        // ========== DASHBOARD DYNAMIC DATA ==========
        get jadwalHariIni() {
            // Filter jadwal hari ini (Senin = 1, Selasa = 2, dst)
            const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            const today = hari[new Date().getDay()];
            return this.jadwalData.filter(j => j.hari === today);
        },

        get totalAbsensiHariIni() {
            return this.absensiData.reduce((sum, a) => sum + a.hadir, 0);
        },

        get notifikasi() {
            const notifs = [];

            // Notifikasi SPP Tunggak
            if (this.sppTunggak > 0) {
                notifs.push({
                    id: 'spp-tunggak',
                    type: 'danger',
                    icon: 'fa-credit-card',
                    category: 'keuangan',
                    title: `SPP Tunggakan (${this.sppTunggak} siswa)`,
                    description: `${this.sppTunggak} siswa belum melunasi SPP bulan ini`,
                    time: 'Urgent',
                    priority: 1,
                    actionText: 'Lihat Detail'
                });
            }

            // Notifikasi Jadwal Ujian
            if (this.jadwalUjianData.length > 0) {
                notifs.push({
                    id: 'ujian-schedule',
                    type: 'warning',
                    icon: 'fa-file-lines',
                    category: 'akademik',
                    title: `Jadwal ${this.jadwalUjianData[0].jenis_ujian} diumumkan`,
                    description: `${this.jadwalUjianData.length} jadwal ujian tersedia`,
                    time: 'Hari ini',
                    priority: 2,
                    actionText: 'Lihat Jadwal'
                });
            }

            // Notifikasi Nilai Masuk
            if (this.nilaiData.length > 0) {
                notifs.push({
                    id: 'nilai-masuk',
                    type: 'info',
                    icon: 'fa-star',
                    category: 'akademik',
                    title: 'Pengumpulan nilai akhir semester',
                    description: `${this.nilaiData.length} nilai telah dikumpulkan`,
                    time: 'Kemarin',
                    priority: 3,
                    actionText: 'Lihat Nilai'
                });
            }

            // Notifikasi Absensi Rendah
            const absensiRendah = this.absensiData.filter(a => this.calculateAttendance(a.hadir, a.sakit, a.izin, a.alfa) < 75);
            if (absensiRendah.length > 0) {
                notifs.push({
                    id: 'absensi-rendah',
                    type: 'warning',
                    icon: 'fa-user-clock',
                    category: 'kehadiran',
                    title: `Absensi Rendah (${absensiRendah.length} siswa)`,
                    description: `${absensiRendah.length} siswa memiliki kehadiran di bawah 75%`,
                    time: 'Hari ini',
                    priority: 2,
                    actionText: 'Lihat Absensi'
                });
            }

            // Filter berdasarkan kategori yang dipilih
            let filtered = notifs;
            if (this.notificationFilter !== 'all') {
                filtered = notifs.filter(n => n.category === this.notificationFilter);
            }

            // Exclude dismissed notifications
            filtered = filtered.filter(n => !this.dismissedNotifications.includes(n.id));

            return filtered.sort((a, b) => a.priority - b.priority);
        },

        get unreadNotificationCount() {
            return this.notifikasi.length;
        },

        get notificationSummary() {
            const danger = this.notifikasi.filter(n => n.type === 'danger').length;
            const warning = this.notifikasi.filter(n => n.type === 'warning').length;
            const info = this.notifikasi.filter(n => n.type === 'info').length;
            return { danger, warning, info };
        },

        get totalTagihanAktif() {
            return this.keuanganData
                .filter(k => k.jenis === 'SPP')
                .reduce((sum, k) => sum + k.jumlah, 0);
        },

        get totalPembayaranBulanIni() {
            const today = new Date();
            const currentMonth = today.getMonth() + 1;
            const currentYear = today.getFullYear();

            return this.keuanganData
                .filter(k => {
                    const kDate = new Date(k.tanggal);
                    return k.jenis === 'SPP' &&
                        kDate.getMonth() + 1 === currentMonth &&
                        kDate.getFullYear() === currentYear;
                })
                .reduce((sum, k) => sum + k.jumlah, 0);
        },

        // ========== UTILITY METHODS ==========
        formatCurrency(value) {
            return 'Rp ' + parseInt(value).toLocaleString('id-ID');
        },

        calculateAverage(harian, uts, uas) {
            return ((parseInt(harian) + parseInt(uts) + parseInt(uas)) / 3).toFixed(1);
        },

        calculateAttendance(hadir, sakit, izin, alfa) {
            const total = hadir + sakit + izin + alfa;
            return total === 0 ? 0 : ((hadir / total) * 100).toFixed(1);
        },

        getStatusBadgeClass(status) {
            const classes = {
                'Lunas': 'bg-success',
                'Tunggakan': 'bg-danger',
                'PNS': 'bg-success',
                'Honorer': 'bg-warning',
                'UTS': 'bg-info',
                'UAS': 'bg-primary'
            };
            return classes[status] || 'bg-secondary';
        },

        getAvatarColor(nama) {
            const colors = ['ef4444', '3b82f6', '10b981', 'f59e0b', '8b5cf6', 'ec4899'];
            const hash = nama.charCodeAt(0);
            return colors[hash % colors.length];
        },

        showToast(message, type = 'info') {
            console.log(`[${type.toUpperCase()}] ${message}`);
            // Implementasi toast notification lebih lanjut bisa ditambahkan di sini
        },

        exportExcel(tipe) {
            this.showToast(`Mempersiapkan export ${tipe} dalam format Excel`, 'info');
            // Implementasi export Excel bisa menggunakan library seperti SheetJS
            console.log(`📊 Export ${tipe}: Feature development`);
        },

        exportData(tipe) {
            try {
                let data = [];
                let filename = '';
                let headers = [];

                switch (tipe) {
                    case 'siswa':
                        data = this.siswaData;
                        filename = 'Data_Siswa_' + new Date().toLocaleDateString('id-ID').replace(/\//g, '-') + '.csv';
                        headers = ['NIS', 'Nama', 'Kelas', 'Agama', 'Status Pembayaran'];
                        break;
                    case 'guru':
                        data = this.guruData;
                        filename = 'Data_Guru_' + new Date().toLocaleDateString('id-ID').replace(/\//g, '-') + '.csv';
                        headers = ['NIP', 'Nama', 'Mata Pelajaran', 'Status', 'Telepon', 'Email'];
                        break;
                    case 'kelas':
                        data = this.kelasData;
                        filename = 'Data_Kelas_' + new Date().toLocaleDateString('id-ID').replace(/\//g, '-') + '.csv';
                        headers = ['Kode', 'Nama', 'Wali', 'Ruang', 'Jumlah Siswa'];
                        break;
                    case 'mapel':
                        data = this.mapelData;
                        filename = 'Data_Mapel_' + new Date().toLocaleDateString('id-ID').replace(/\//g, '-') + '.csv';
                        headers = ['Kode', 'Nama', 'SKS', 'Guru'];
                        break;
                }

                if (data.length === 0) {
                    this.showToast('Tidak ada data untuk diexport', 'warning');
                    return;
                }

                // Convert to CSV
                let csv = headers.join(',') + '\n';
                data.forEach(row => {
                    const values = Object.values(row).map(v => `"${v}"`);
                    csv += values.join(',') + '\n';
                });

                // Create blob and download
                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                link.click();

                this.showToast(`✓ ${data.length} baris data ${tipe} berhasil diexport`, 'success');
            } catch (error) {
                this.showToast('Error: ' + error.message, 'error');
            }
        },

        handleImportSiswa(event) {
            const file = event.target.files[0];
            if (!file) return;

            this.importType = 'siswa';
            this.handleExcelFileSelect({ target: { files: [file] } });
        },

        handleImportGuru(event) {
            const file = event.target.files[0];
            if (!file) return;

            this.importType = 'guru';
            this.handleExcelFileSelect({ target: { files: [file] } });
        },

        handleImportKelas(event) {
            const file = event.target.files[0];
            if (!file) return;

            this.importType = 'kelas';
            this.handleExcelFileSelect({ target: { files: [file] } });
        },

        handleImportMapel(event) {
            const file = event.target.files[0];
            if (!file) return;

            this.importType = 'mapel';
            this.handleExcelFileSelect({ target: { files: [file] } });
        },

        logout() {
            if (confirm('Apakah Anda yakin ingin logout?')) {
                window.location.href = 'login.html';
            }
        },

        // ========== DASHBOARD ACTION METHODS ==========
        openAddSiswaModal() {
            console.log('📋 openAddSiswaModal: Starting...');
            this.showModal = 'siswa';
            this.editingIndex = null;
            this.resetForms();
            logMessage('Modal Tambah Siswa dibuka', 'info');
            console.log('📋 showModal state:', this.showModal);
            setTimeout(() => {
                const input = document.querySelector('#modalAddSiswa input[type="text"]');
                console.log('🎯 Input element found:', input);
                if (input) {
                    input.focus();
                    console.log('✅ Input focused successfully');
                }
            }, 100);
        },

        openAddGuruModal() {
            console.log('📋 openAddGuruModal: Starting...');
            this.showModal = 'guru';
            this.editingIndex = null;
            this.resetForms();
            logMessage('Modal Tambah Guru dibuka', 'info');
            console.log('📋 showModal state:', this.showModal);
            setTimeout(() => {
                const input = document.querySelector('#modalAddGuru input[type="text"]');
                console.log('🎯 Input element found:', input);
                if (input) {
                    input.focus();
                    console.log('✅ Input focused successfully');
                }
            }, 100);
        },

        openAddKelasModal() {
            console.log('📋 openAddKelasModal: Starting...');
            this.showModal = 'kelas';
            this.editingIndex = null;
            this.resetForms();
            logMessage('Modal Tambah Kelas dibuka', 'info');
            console.log('📋 showModal state:', this.showModal);
            setTimeout(() => {
                const input = document.querySelector('#modalAddKelas input[type="text"]');
                console.log('🎯 Input element found:', input);
                if (input) {
                    input.focus();
                    console.log('✅ Input focused successfully');
                }
            }, 100);
        },

        openAddMapelModal() {
            console.log('📋 openAddMapelModal: Starting...');
            this.showModal = 'mapel';
            this.editingIndex = null;
            this.resetForms();
            logMessage('Modal Tambah Mapel dibuka', 'info');
            console.log('📋 showModal state:', this.showModal);
            setTimeout(() => {
                const input = document.querySelector('#modalAddMapel input[type="text"]');
                console.log('🎯 Input element found:', input);
                if (input) {
                    input.focus();
                    console.log('✅ Input focused successfully');
                }
            }, 100);
        },

        downloadChart() {
            this.showToast('Mengunduh grafik kehadiran...', 'info');
            // Implementation untuk download chart bisa ditambahkan di sini
        },

        getTanggalHariIni() {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return new Date().toLocaleDateString('id-ID', options);
        },

        getJamSekarang() {
            return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        },

        getStatusJadwal(jamSelesai) {
            const [jam, menit] = jamSelesai.split(':').map(Number);
            const jamSelesaiMs = jam * 60 + menit;
            const jamSekarangMs = new Date().getHours() * 60 + new Date().getMinutes();

            if (jamSekarangMs < jamSelesaiMs) {
                return jamSekarangMs >= (jam * 60 + menit - 60) ? 'Aktif' : 'Akan Datang';
            }
            return 'Selesai';
        },

        getSiswaById(nis) {
            return this.siswaData.find(s => s.nis === nis);
        },

        handleExcelFileSelect(event) {
            const file = event.target.files[0];

            if (!file) {
                this.previewData = [];
                return;
            }

            // Validasi file type
            const validTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
            if (!validTypes.includes(file.type)) {
                this.showToast('Format file harus Excel (.xls atau .xlsx)', 'error');
                this.previewData = [];
                document.getElementById('excelFile').value = '';
                return;
            }

            // Validasi file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                this.showToast('Ukuran file terlalu besar (max 5MB)', 'error');
                this.previewData = [];
                document.getElementById('excelFile').value = '';
                return;
            }

            const reader = new FileReader();
            const self = this;
            reader.onload = function (e) {
                try {
                    // Simulasi parse Excel - dalam production gunakan library seperti xlsx
                    const mockData = [
                        { nis: '10237', nama: 'Dewi', kelas: '8A', agama: 'Kristen', status: 'Lunas' },
                        { nis: '10238', nama: 'Eka', kelas: '8B', agama: 'Islam', status: 'Tunggakan' },
                        { nis: '10239', nama: 'Farah', kelas: '9A', agama: 'Islam', status: 'Lunas' }
                    ];

                    self.previewData = mockData;
                    self.showToast(`✓ ${mockData.length} baris data siap untuk diimport`, 'success');
                } catch (error) {
                    self.showToast('Error membaca file: ' + error.message, 'error');
                    self.previewData = [];
                }
            };


            try {
                // Validasi dan import berdasarkan importType
                switch (this.importType) {
                    case 'siswa':
                        this.previewData.forEach(row => {
                            if (!this.siswaData.find(s => s.nis === row.nis)) {
                                this.siswaData.push(row);
                            }
                        });
                        this.showToast('✓ ' + this.previewData.length + ' data Siswa berhasil diimport', 'success');
                        break;
                    case 'guru':
                        this.previewData.forEach(row => {
                            if (!this.guruData.find(g => g.nip === row.nip)) {
                                this.guruData.push(row);
                            }
                        });
                        this.showToast('✓ ' + this.previewData.length + ' data Guru berhasil diimport', 'success');
                        break;
                    case 'kelas':
                        this.previewData.forEach(row => {
                            if (!this.kelasData.find(k => k.kode === row.kode)) {
                                this.kelasData.push(row);
                            }
                        });
                        this.showToast('✓ ' + this.previewData.length + ' data Kelas berhasil diimport', 'success');
                        break;
                    case 'mapel':
                        this.previewData.forEach(row => {
                            if (!this.mapelData.find(m => m.kode === row.kode)) {
                                this.mapelData.push(row);
                            }
                        });
                        this.showToast('✓ ' + this.previewData.length + ' data Mapel berhasil diimport', 'success');
                        break;
                }

                // Clear preview dan file input
                this.previewData = [];
                const fileInput = document.getElementById('excelFile');
                if (fileInput) fileInput.value = '';
                this.closeModal();
            } catch (error) {
                this.showToast('Error saat import: ' + error.message, 'error');
            }
        },

        printCard() {
            if (!this.selectedSiswaForCard) {
                this.showToast('Pilih siswa terlebih dahulu', 'warning');
                return;
            }

            const siswa = this.getSiswaById(this.selectedSiswaForCard);
            if (!siswa) {
                this.showToast('Data siswa tidak ditemukan', 'error');
                return;
            }

            // Buat window baru untuk print
            const printWindow = window.open('', '', 'width=600,height=400');

            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Cetak Kartu - ${siswa.nama}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .card { 
                            border: 2px solid #333; 
                            padding: 30px; 
                            max-width: 400px; 
                            margin: auto;
                            text-align: center;
                        }
                        .card-header {
                            border-bottom: 2px solid #6366f1;
                            padding-bottom: 15px;
                            margin-bottom: 15px;
                        }
                        .card-header h2 { margin: 5px 0; color: #333; }
                        .card-header p { margin: 3px 0; color: #666; font-size: 12px; }
                        .card-body { text-align: left; }
                        .card-row {
                            display: flex;
                            justify-content: space-between;
                            padding: 8px 0;
                            border-bottom: 1px solid #ddd;
                        }
                        .card-row strong { color: #333; }
                        .card-row span { color: #666; }
                        .card-footer {
                            margin-top: 20px;
                            text-align: center;
                            font-size: 12px;
                            color: #999;
                        }
                        img { width: 80px; height: 80px; border-radius: 50%; margin: 10px 0; }
                        @media print {
                            body { margin: 0; padding: 0; }
                        }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <div class="card-header">
                            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(siswa.nama)}&size=100&background=6366f1&color=fff&bold=true" alt="Avatar">
                            <h2>KARTU PELAJAR</h2>
                            <p>SMP YPPGI Bomou</p>
                        </div>
                        <div class="card-body">
                            <div class="card-row">
                                <strong>NIS:</strong>
                                <span>${siswa.nis}</span>
                            </div>
                            <div class="card-row">
                                <strong>Nama:</strong>
                                <span>${siswa.nama}</span>
                            </div>
                            <div class="card-row">
                                <strong>Kelas:</strong>
                                <span>${siswa.kelas}</span>
                            </div>
                            <div class="card-row">
                                <strong>Agama:</strong>
                                <span>${siswa.agama}</span>
                            </div>
                            <div class="card-row">
                                <strong>Status:</strong>
                                <span>${siswa.status}</span>
                            </div>
                        </div>
                        <div class="card-footer">
                            <p>Diterbitkan: ${new Date().toLocaleDateString('id-ID')}</p>
                            <p>Berlaku sampai akhir tahun pelajaran</p>
                        </div>
                    </div>
                </body>
                </html>
            `;

            printWindow.document.write(htmlContent);
            printWindow.document.close();

            // Print setelah content dimuat
            setTimeout(() => {
                printWindow.print();
                setTimeout(() => printWindow.close(), 1000);
            }, 250);

            this.closeModal();
            this.showToast('✓ Kartu siswa ' + siswa.nama + ' berhasil dicetak', 'success');
        },

        dismissNotification(notificationId) {
            if (!this.dismissedNotifications.includes(notificationId)) {
                this.dismissedNotifications.push(notificationId);
                this.showToast('Notifikasi ditutup', 'info');
            }
        },

        clearAllNotifications() {
            this.dismissedNotifications = [];
            this.showToast('Semua notifikasi telah direset', 'success');
        },

        executeNotificationAction(notifId) {
            const notif = this.notifikasi.find(n => n.id === notifId);
            if (notif) {
                if (notifId === 'spp-tunggak') {
                    this.navigateTo('keuangan');
                } else if (notifId === 'ujian-schedule') {
                    this.navigateTo('jadwal-ujian');
                } else if (notifId === 'nilai-masuk') {
                    this.navigateTo('nilai');
                } else if (notifId === 'absensi-rendah') {
                    this.navigateTo('absensi');
                }
                this.dismissNotification(notifId);
            }
        },

        // ========== ANNOUNCEMENT METHODS ==========
        pinAnnouncement(announcementId) {
            const announcement = this.pengumumanData.find(p => p.id === announcementId);
            if (announcement) {
                announcement.isPinned = !announcement.isPinned;
                const action = announcement.isPinned ? 'disematkan' : 'tidak lagi disematkan';
                this.showToast(`Pengumuman ${action}`, 'success');
                console.log(`📌 Announcement ${announcementId} ${action}`);
            }
        },

        archiveAnnouncement(announcementId) {
            const announcement = this.pengumumanData.find(p => p.id === announcementId);
            if (announcement) {
                announcement.status = announcement.status === 'active' ? 'archived' : 'active';
                const action = announcement.status === 'archived' ? 'diarsipkan' : 'dipulihkan';
                this.showToast(`Pengumuman ${action}`, 'success');
                console.log(`📂 Announcement ${announcementId} ${action}`);
            }
        },

        markAnnouncementAsRead(announcementId) {
            const announcement = this.pengumumanData.find(p => p.id === announcementId);
            if (announcement) {
                announcement.isRead = true;
                console.log(`✅ Announcement ${announcementId} marked as read`);
            }
        },

        viewAnnouncement(announcementId) {
            const announcement = this.pengumumanData.find(p => p.id === announcementId);
            if (announcement) {
                this.markAnnouncementAsRead(announcementId);
                this.showToast(`📢 ${announcement.title}`, 'info');
                console.log(`👁️ Viewing announcement: ${announcement.title}`);
            }
        },

        get activePengumuman() {
            return this.pengumumanData.filter(p => p.status === 'active' && !this.dismissedNotifications.includes(p.id));
        },

        get pinnedPengumuman() {
            return this.activePengumuman.filter(p => p.isPinned).sort((a, b) =>
                new Date(b.timestamp) - new Date(a.timestamp)
            );
        },

        get unreadPengumuman() {
            return this.activePengumuman.filter(p => !p.isRead);
        },

        // ========== LOCALSTORAGE PERSISTENCE METHODS ==========
        /**
         * Initialize localStorage - Load all data or create defaults
         */
        initializeLocalStorage() {
            console.log('📦 Initializing localStorage...');

            // Load each data array from localStorage or use defaults
            this.siswaData = JSON.parse(localStorage.getItem('siakad_siswa')) || this.defaultSiswaData;
            this.guruData = JSON.parse(localStorage.getItem('siakad_guru')) || this.defaultGuruData;
            this.kelasData = JSON.parse(localStorage.getItem('siakad_kelas')) || this.defaultKelasData;
            this.mapelData = JSON.parse(localStorage.getItem('siakad_mapel')) || this.defaultMapelData;
            this.jadwalData = JSON.parse(localStorage.getItem('siakad_jadwal')) || this.defaultJadwalData;
            this.jadwalUjianData = JSON.parse(localStorage.getItem('siakad_jadwal_ujian')) || this.defaultJadwalUjianData;
            this.nilaiData = JSON.parse(localStorage.getItem('siakad_nilai')) || this.defaultNilaiData;
            this.absensiData = JSON.parse(localStorage.getItem('siakad_absensi')) || this.defaultAbsensiData;
            this.keuanganData = JSON.parse(localStorage.getItem('siakad_keuangan')) || this.defaultKeuanganData;

            console.log('✅ localStorage initialized:', {
                siswaCount: this.siswaData.length,
                guruCount: this.guruData.length,
                kelasCount: this.kelasData.length,
                mapelCount: this.mapelData.length
            });
        },

        /**
         * Save specific data array to localStorage
         */
        saveToLocalStorage(key, data) {
            try {
                localStorage.setItem(key, JSON.stringify(data));
                console.log(`💾 Saved to localStorage: ${key}`);
            } catch (e) {
                console.error(`❌ Error saving to localStorage:`, e);
                this.showToast('Error menyimpan data ke localStorage', 'danger');
            }
        },

        /**
         * Save all data arrays to localStorage
         */
        saveAllToLocalStorage() {
            this.saveToLocalStorage('siakad_siswa', this.siswaData);
            this.saveToLocalStorage('siakad_guru', this.guruData);
            this.saveToLocalStorage('siakad_kelas', this.kelasData);
            this.saveToLocalStorage('siakad_mapel', this.mapelData);
            this.saveToLocalStorage('siakad_jadwal', this.jadwalData);
            this.saveToLocalStorage('siakad_jadwal_ujian', this.jadwalUjianData);
            this.saveToLocalStorage('siakad_nilai', this.nilaiData);
            this.saveToLocalStorage('siakad_absensi', this.absensiData);
            this.saveToLocalStorage('siakad_keuangan', this.keuanganData);
        },

        /**
         * Clear all localStorage data and reset to defaults
         */
        clearAllLocalStorage() {
            if (confirm('🗑️ Hapus semua data dari localStorage?\n\nData akan direset ke data default.')) {
                localStorage.removeItem('siakad_siswa');
                localStorage.removeItem('siakad_guru');
                localStorage.removeItem('siakad_kelas');
                localStorage.removeItem('siakad_mapel');
                localStorage.removeItem('siakad_jadwal');
                localStorage.removeItem('siakad_jadwal_ujian');
                localStorage.removeItem('siakad_nilai');
                localStorage.removeItem('siakad_absensi');
                localStorage.removeItem('siakad_keuangan');

                this.showToast('Data berhasil direset', 'success');
                setTimeout(() => window.location.reload(), 1000);
            }
        },

        /**
         * Export all data to JSON file
         */
        exportDataToJson() {
            const allData = {
                siswa: this.siswaData,
                guru: this.guruData,
                kelas: this.kelasData,
                mapel: this.mapelData,
                jadwal: this.jadwalData,
                jadwal_ujian: this.jadwalUjianData,
                nilai: this.nilaiData,
                absensi: this.absensiData,
                keuangan: this.keuanganData,
                exported_at: new Date().toISOString(),
                version: '2.0.0'
            };

            const dataStr = JSON.stringify(allData, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `siakad_backup_${new Date().toISOString().split('T')[0]}.json`;
            link.click();

            this.showToast('✅ Data berhasil diexport', 'success');
        },

        /**
         * Import data from JSON file
         */
        importDataFromJson(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);

                    // Validate and import
                    if (importedData.siswa && Array.isArray(importedData.siswa)) {
                        this.siswaData = importedData.siswa;
                        this.saveToLocalStorage('siakad_siswa', this.siswaData);
                    }
                    if (importedData.guru && Array.isArray(importedData.guru)) {
                        this.guruData = importedData.guru;
                        this.saveToLocalStorage('siakad_guru', this.guruData);
                    }
                    if (importedData.kelas && Array.isArray(importedData.kelas)) {
                        this.kelasData = importedData.kelas;
                        this.saveToLocalStorage('siakad_kelas', this.kelasData);
                    }
                    if (importedData.mapel && Array.isArray(importedData.mapel)) {
                        this.mapelData = importedData.mapel;
                        this.saveToLocalStorage('siakad_mapel', this.mapelData);
                    }
                    if (importedData.jadwal && Array.isArray(importedData.jadwal)) {
                        this.jadwalData = importedData.jadwal;
                        this.saveToLocalStorage('siakad_jadwal', this.jadwalData);
                    }
                    if (importedData.jadwal_ujian && Array.isArray(importedData.jadwal_ujian)) {
                        this.jadwalUjianData = importedData.jadwal_ujian;
                        this.saveToLocalStorage('siakad_jadwal_ujian', this.jadwalUjianData);
                    }
                    if (importedData.nilai && Array.isArray(importedData.nilai)) {
                        this.nilaiData = importedData.nilai;
                        this.saveToLocalStorage('siakad_nilai', this.nilaiData);
                    }
                    if (importedData.absensi && Array.isArray(importedData.absensi)) {
                        this.absensiData = importedData.absensi;
                        this.saveToLocalStorage('siakad_absensi', this.absensiData);
                    }
                    if (importedData.keuangan && Array.isArray(importedData.keuangan)) {
                        this.keuanganData = importedData.keuangan;
                        this.saveToLocalStorage('siakad_keuangan', this.keuanganData);
                    }

                    this.showToast('✅ Data berhasil diimport dari file', 'success');

                } catch (error) {
                    console.error('❌ Error importing data:', error);
                    this.showToast('❌ Error mengimport data. Format file tidak valid', 'danger');
                }

                // Clear file input
                event.target.value = '';
            };
            reader.readAsText(file);
        },

        /**
         * View localStorage statistics
         */
        viewLocalStorageStats() {
            const stats = {
                'siakad_siswa': localStorage.getItem('siakad_siswa') ? JSON.parse(localStorage.getItem('siakad_siswa')).length : 0,
                'siakad_guru': localStorage.getItem('siakad_guru') ? JSON.parse(localStorage.getItem('siakad_guru')).length : 0,
                'siakad_kelas': localStorage.getItem('siakad_kelas') ? JSON.parse(localStorage.getItem('siakad_kelas')).length : 0,
                'siakad_mapel': localStorage.getItem('siakad_mapel') ? JSON.parse(localStorage.getItem('siakad_mapel')).length : 0,
                'siakad_jadwal': localStorage.getItem('siakad_jadwal') ? JSON.parse(localStorage.getItem('siakad_jadwal')).length : 0,
                'siakad_keuangan': localStorage.getItem('siakad_keuangan') ? JSON.parse(localStorage.getItem('siakad_keuangan')).length : 0,
            };

            console.log('📊 localStorage Statistics:', stats);
            const message = `
📊 LOCAL STORAGE STATS:
• Siswa: ${stats['siakad_siswa']} data
• Guru: ${stats['siakad_guru']} data
• Kelas: ${stats['siakad_kelas']} data
• Mapel: ${stats['siakad_mapel']} data
• Jadwal: ${stats['siakad_jadwal']} data
• Keuangan: ${stats['siakad_keuangan']} data
            `;
            alert(message);
        },

        // ========== INIT METHOD ==========
        init() {
            console.log('🚀 SIAKAD App Initializing...');
            this.initializeLocalStorage();
            this.loadJadwalHariIni();
            this.initChart();
            console.log('✅ SIAKAD App Ready!');
        },
    };
}

// ========================================
// CHART INITIALIZATION
// ========================================
// Chart initialization is handled by admin-init.js
// This prevents duplicate chart instances on the same canvas

// ========================================
// UTILITY & HELPER FUNCTIONS
// ========================================

/**
 * Log message to console with type and timestamp
 * @param {string} message - Message to log
 * @param {string} type - Type of message (info, success, warning, error)
 */
function logMessage(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('id-ID');
    const typeEmoji = {
        'info': 'ℹ️',
        'success': '✅',
        'warning': '⚠️',
        'error': '❌'
    };

    const emoji = typeEmoji[type] || 'ℹ️';
    const color = {
        'info': 'color: #3b82f6; font-weight: bold;',
        'success': 'color: #10b981; font-weight: bold;',
        'warning': 'color: #f59e0b; font-weight: bold;',
        'error': 'color: #ef4444; font-weight: bold;'
    };

    console.log(`%c${emoji} [${timestamp}] ${message}`, color[type] || color.info);
}

/**
 * Download Chart as PNG
 */
function downloadChart() {
    const canvas = document.getElementById('chartKehadiran');
    if (!canvas) {
        alert('Chart tidak ditemukan');
        return;
    }

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'grafik-kehadiran-' + new Date().toLocaleDateString('id-ID') + '.png';
    link.click();

    logMessage('Grafik kehadiran diunduh', 'success');
}

/**
 * Generate Laporan Akademik
 */
function generateLaporanAkademik() {
    logMessage('Generate laporan akademik...', 'info');
    alert('Laporan Akademik akan dibuka dalam PDF (feature development)');
}

/**
 * Generate Laporan Kehadiran
 */
function generateLaporanKehadiran() {
    logMessage('Generate laporan kehadiran...', 'info');
    alert('Laporan Kehadiran akan dibuka dalam PDF (feature development)');
}

/**
 * Generate Laporan Keuangan
 */
function generateLaporanKeuangan() {
    logMessage('Generate laporan keuangan...', 'info');
    alert('Laporan Keuangan akan dibuka dalam PDF (feature development)');
}

/**
 * Generate Laporan Master
 */
function generateLaporanMaster() {
    logMessage('Generate laporan master...', 'info');
    alert('Laporan Master akan dibuka dalam PDF (feature development)');
}

/**
 * Save Settings
 */
function saveSettings() {
    logMessage('Pengaturan sistem disimpan', 'success');
    alert('Pengaturan berhasil disimpan');
}

/**
 * Reset Settings
 */
function resetSettings() {
    if (confirm('Apakah Anda yakin ingin reset pengaturan ke default?')) {
        logMessage('Pengaturan sistem direset ke default', 'info');
        location.reload();
    }
}

// ========================================
// AUTHENTICATION & SESSION MANAGEMENT
// ========================================

/**
 * Perform authentication check BEFORE page load (Pre-DOM IIFE)
 * This should be called in <head> of HTML files
 * @param {string} requiredRole - Role to check against (admin, guru, siswa)
 */
function checkAuthBeforePageLoad(requiredRole) {
    const siakad_user = localStorage.getItem('siakad_user');

    // If no user, redirect to login
    if (!siakad_user) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const user = JSON.parse(siakad_user);

        // Check role matches required role
        if (user.role !== requiredRole) {
            console.warn('❌ Akses ditolak: User ini adalah ' + user.role.toUpperCase() + ', bukan ' + requiredRole.toUpperCase());
            localStorage.removeItem('siakad_user');
            window.location.href = 'login.html';
            return;
        }

        // Check session validity (24 hour timeout)
        const loginTime = new Date(user.loginTime);
        const now = new Date();
        const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours

        if (now - loginTime > sessionDuration) {
            console.warn('⏱️ Session expired');
            localStorage.removeItem('siakad_user');
            window.location.href = 'login.html';
            return;
        }

        console.log('✅ Auth OK: ' + user.name + ' (' + user.role.toUpperCase() + ')');
    } catch (e) {
        console.error('❌ Auth error:', e);
        localStorage.removeItem('siakad_user');
        window.location.href = 'login.html';
    }
}

/**
 * Perform authentication check AFTER page load (Post-DOM DOMContentLoaded)
 * Double-check authentication and set user info in UI
 */
function checkAuthAfterPageLoad() {
    const siakad_user = localStorage.getItem('siakad_user');

    if (!siakad_user) {
        console.warn('❌ Akses ditolak: Harus login terlebih dahulu');
        window.location.href = 'login.html';
        return;
    }

    try {
        const user = JSON.parse(siakad_user);

        // Display user info in UI
        const userNameEl = document.getElementById('userName');
        if (userNameEl) {
            userNameEl.textContent = user.name || user.username;
        }

        // Display role in sidebar
        const sidebarRole = document.getElementById('sidebarRole');
        if (sidebarRole) {
            sidebarRole.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
        }

        // Set avatar
        const userAvatar = document.getElementById('userAvatar');
        if (userAvatar && user.name) {
            const name = user.name.replace(/\s+/g, '+');
            userAvatar.src = 'https://ui-avatars.com/api/?name=' + name + '&background=6366f1&color=fff&bold=true';
        }

        console.log('✅ Dashboard loaded for: ' + user.name);
    } catch (e) {
        console.error('❌ Auth error:', e);
        localStorage.removeItem('siakad_user');
        window.location.href = 'login.html';
    }
}

/**
 * Logout function - Clear session and redirect to login
 * Comprehensive cleanup of all storage (localStorage + sessionStorage)
 */
function logout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        try {
            console.log('🔄 Logout dimulai...');

            // Step 1: Clear all storage (comprehensive cleanup)
            localStorage.clear();
            sessionStorage.clear();

            // Step 2: Verify keys are deleted
            if (localStorage.getItem('siakad_user')) {
                localStorage.removeItem('siakad_user');
            }
            if (localStorage.getItem('registered_users')) {
                localStorage.removeItem('registered_users');
            }

            // Step 3: Redirect IMMEDIATELY (no delay)
            console.log('✅ Session cleared - Redirect ke login.html...');
            window.location.href = 'login.html';

        } catch (e) {
            console.error('❌ Error logout:', e);
            // Fallback: force redirect to login
            window.location.href = 'login.html';
        }
    }
}

/**
 * Edit profile (placeholder for profile editing functionality)
 */
function editProfile() {
    alert('Mock: Edit profil (akan dikembangkan lebih lanjut)');
}

// ========================================
// ALPINE.JS INTEGRATION WRAPPERS
// ========================================

/**
 * Alpine.js wrapper for logout
 * Called from HTML: @click.prevent="alpinejsLogout()"
 */
function alpinejsLogout() {
    logout();
}

/**
 * Alpine.js wrapper for editProfile
 * Called from HTML: @click.prevent="alpinejsEditProfile()"
 */
function alpinejsEditProfile() {
    editProfile();
}
function alpinejsEditProfile() {
    editProfile();
}