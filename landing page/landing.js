function site() {
    return {
        // ========== UI STATE ==========
        mobileOpen: false,
        currentImage: 0,
        selectedClub: {},
        activeNote: {},
        notificationCount: 0,
        showToast: false,
        toastMessage: '',

        // ========== COUNTDOWN STATE ==========
        countdown: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        },
        countdownTarget: new Date('2025-07-01T00:00:00').getTime(),

        // ========== PENDAFTARAN STATE ==========
        pendaftaran: {
            nama: '',
            tempatLahir: '',
            tglLahir: '',
            jenisKelamin: '',
            asalSekolah: '',
            noTelp: '',
            email: '',
            alamat: '',
            namaOrtu: '',
            pekerjaanOrtu: '',
            setuju: false
        },
        showPendaftaranSuccess: false,
        noPendaftaran: '',

        // ========== LOGIN STATE ==========
        login: { role: 'siswa', user: '', pass: '' },

        // ========== ANNOUNCEMENTS ==========
        announcements: ['PPDB dibuka 1 Juli 2025', 'Pembagian rapor semester genap 20 Desember', 'Libur semester: 21 Desember - 4 Januari'],

        // ========== EXTRACURRICULAR CLUBS ==========
        ekstrakurikuler: [
            { name: 'Pramuka', desc: 'Kegiatan kepramukaan, camping, survival dasar.', coach: 'Pak A', icon: 'fa-compass' },
            { name: 'Paduan Suara', desc: 'Latihan vokal & pertunjukan', coach: 'Bu B', icon: 'fa-music' },
            { name: 'Badminton', desc: 'Latihan dan kompetisi antar sekolah', coach: 'Pak C', icon: 'fa-badminton' },
            { name: 'Robotik', desc: 'Dasar pemrograman & robotik', coach: 'Bu D', icon: 'fa-robot' },
        ],

        // ========== AGENDA & CALENDAR ==========
        agenda: [
            { id: 1, title: 'Ulangan Tengah Semester', date: '2025-07-10' },
            { id: 2, title: 'Lomba Matematika Kecamatan', date: '2025-08-02' },
            { id: 3, title: 'Upacara Hari Kemerdekaan', date: '2025-08-17' },
        ],
        calendarCells: [],

        // ========== ANNOUNCEMENTS ==========
        pengumuman: [
            { id: 1, title: 'PPDB 2025', date: '2025-06-30', summary: 'Pendaftaran Peserta Didik Baru dibuka mulai 1 Juli 2025', content: 'Pendaftaran PPDB tahun 2025 telah dibuka. Calon siswa dapat mendaftar melalui sistem online kami.' },
            { id: 2, title: 'Hari Kemerdekaan', date: '2025-08-17', summary: 'Upacara bendera dan lomba antar kelas', content: 'Perayaan hari kemerdekaan Indonesia dengan kegiatan upacara bendera dan berbagai lomba kelas.' },
            { id: 3, title: 'Pembagian Rapor', date: '2025-12-20', summary: 'Pembagian rapor semester genap tahun ajaran 2024/2025', content: 'Pembagian rapor akan dilaksanakan di ruang kelas masing-masing dengan pendampingan wali kelas.' },
        ],

        // ========== GALLERY ==========
        gallery: [
            'img-7.jpg',
            'img-5.jpg',
            'img-1.jpeg',
            'img-4.jpg',
            'img-2.jpeg',
            'img-6.jpg',
            'img-8.jpg',
            'img-10.jpg'
        ],

        // ========== TESTIMONIALS ==========
        testimonials: [
            { name: 'Andi Pratama', role: 'Siswa Kelas 8A', message: 'SIAKAD sangat membantu saya memonitor nilai dan jadwal pelajaran. Interface-nya user-friendly dan mudah digunakan.', rating: 5 },
            { name: 'Ibu Siti', role: 'Guru Matematika', message: 'Sistem ini membuat pekerjaan saya lebih efisien. Saya bisa dengan mudah menginput nilai dan membuat laporan.', rating: 5 },
            { name: 'Bapak Sugiyono', role: 'Orang Tua Siswa', message: 'Terima kasih kepada sekolah telah menggunakan sistem ini. Saya bisa selalu tahu perkembangan akademik anak saya.', rating: 4 },
        ],

        // ========== SCHOOL STATISTICS ==========
        stats: [
            { label: 'Total Siswa', value: 456, icon: 'fa-users' },
            { label: 'Total Guru', value: 28, icon: 'fa-chalkboard-user' },
            { label: 'Akreditasi', value: 'B', icon: 'fa-award' },
            { label: 'Tahun Berdiri', value: 1998, icon: 'fa-calendar' },
        ],

        // ========== METHODS ==========

        init() {
            console.log('🚀 Landing page initializing...');
            this.buildCalendar();
            this.startMarquee();
            this.loadFromLocalStorage();
            this.startCountdown();
            console.log('✅ Landing page ready!');
        },

        // Load data from SIAKAD localStorage
        loadFromLocalStorage() {
            try {
                const siswCount = localStorage.getItem('siakad_siswa') ? JSON.parse(localStorage.getItem('siakad_siswa')).length : 456;
                const guruCount = localStorage.getItem('siakad_guru') ? JSON.parse(localStorage.getItem('siakad_guru')).length : 28;

                this.stats[0].value = siswCount;
                this.stats[1].value = guruCount;

                console.log('✅ Data loaded from localStorage');
            } catch (e) {
                console.log('ℹ️  Using default statistics');
            }
        },

        // Build calendar with event markers
        buildCalendar() {
            const daysInMonth = 31;
            this.calendarCells = [];
            for (let i = 1; i <= daysInMonth; i++) {
                const has = this.agenda.some(a => a.date.endsWith('-' + String(i).padStart(2, '0')));
                this.calendarCells.push({ day: i, hasEvent: has });
            }
        },

        // Countdown timer for PPDB
        startCountdown() {
            setInterval(() => {
                const now = new Date().getTime();
                const distance = this.countdownTarget - now;

                if (distance < 0) {
                    this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
                    return;
                }

                this.countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24));
                this.countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                this.countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                this.countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000);
            }, 1000);
        },

        // Open login modal
        openLogin() {
            const modal = new bootstrap.Modal(document.getElementById('loginModal'));
            modal.show();
        },

        // Open PPDB registration modal
        openPendaftaranModal() {
            this.resetPendaftaran();
            this.showPendaftaranSuccess = false;
            const modal = new bootstrap.Modal(document.getElementById('ppdbModal'));
            modal.show();
        },

        // Close PPDB registration form
        closePendaftaranForm() {
            this.resetPendaftaran();
            this.showPendaftaranSuccess = false;
        },

        // Submit login
        submitLogin() {
            alert('Simulasi login: role=' + this.login.role + ' user=' + this.login.user);
            const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            if (modal) modal.hide();
        },

        // Open club detail
        openClub(club) {
            this.selectedClub = club;
            const modal = new bootstrap.Modal(document.getElementById('clubModal'));
            modal.show();
        },

        // Open gallery
        openGallery(idx) {
            this.currentImage = idx;
            const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
            modal.show();
        },

        // Navigate gallery
        prevImage() {
            this.currentImage = (this.currentImage - 1 + this.gallery.length) % this.gallery.length;
        },

        nextImage() {
            this.currentImage = (this.currentImage + 1) % this.gallery.length;
        },

        // Open announcement
        openAnnouncement(note) {
            this.activeNote = note;
            const modal = new bootstrap.Modal(document.getElementById('noteModal'));
            modal.show();
        },

        // View agenda with SweetAlert
        viewAgenda(item) {
            Swal.fire({
                title: item.title,
                html: `<div class="text-left"><p><strong>Tanggal:</strong> ${item.date}</p><p><strong>Deskripsi:</strong> ${item.description || 'Tidak ada deskripsi'}</p></div>`,
                icon: 'info',
                iconColor: '#667eea',
                confirmButtonColor: '#667eea',
                confirmButtonText: 'Tutup',
                customClass: {
                    popup: 'rounded-lg shadow-xl',
                    title: 'text-indigo-600 font-bold text-xl',
                    confirmButton: 'btn btn-primary px-6'
                },
                allowOutsideClick: true,
                backdrop: 'rgba(0, 0, 0, 0.4)'
            });
        },

        // Get star rating display
        getStarRating(rating) {
            return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
        },

        // Start marquee animation
        startMarquee() {
            const el = document.querySelector('.animate-marquee');
            if (!el) return;
            el.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-50%)' }
            ], { duration: 14000, iterations: Infinity });
        },

        // Show toast notification
        showNotification(message) {
            this.toastMessage = message;
            this.showToast = true;
            setTimeout(() => {
                this.showToast = false;
            }, 3000);
        },

        // Submit pendaftaran
        submitPendaftaran() {
            if (!this.pendaftaran.setuju) {
                alert('Silakan setujui syarat dan ketentuan');
                return;
            }

            // Generate nomor pendaftaran
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const random = Math.floor(Math.random() * 10000);
            this.noPendaftaran = `PPDB-${year}${month}-${String(random).padStart(5, '0')}`;

            // Simpan ke localStorage
            try {
                let pendaftaranList = JSON.parse(localStorage.getItem('ppdb_pendaftaran')) || [];
                pendaftaranList.push({
                    no: this.noPendaftaran,
                    ...this.pendaftaran,
                    terdaftar: new Date().toLocaleString('id-ID')
                });
                localStorage.setItem('ppdb_pendaftaran', JSON.stringify(pendaftaranList));
                console.log('✅ Pendaftaran berhasil disimpan:', this.noPendaftaran);
            } catch (e) {
                console.log('❌ Error menyimpan pendaftaran:', e);
            }

            // Show success message
            this.showPendaftaranSuccess = true;
            this.showNotification('🎉 Pendaftaran berhasil! Nomor: ' + this.noPendaftaran);

            // Reset form setelah 3 detik
            setTimeout(() => {
                this.resetPendaftaran();
                this.showPendaftaranSuccess = false;
            }, 3000);
        },

        // Reset pendaftaran form
        resetPendaftaran() {
            this.pendaftaran = {
                nama: '',
                tempatLahir: '',
                tglLahir: '',
                jenisKelamin: '',
                asalSekolah: '',
                noTelp: '',
                email: '',
                alamat: '',
                namaOrtu: '',
                pekerjaanOrtu: '',
                setuju: false
            };
        }
    }
}