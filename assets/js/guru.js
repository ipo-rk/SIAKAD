// ========================================
// SIAKAD - SISTEM INFORMASI AKADEMIK
// Dashboard Guru
// ========================================
// Version: 1.0.0
// Last Updated: 11 Januari 2026
// ========================================

/**
 * Initialize Guru Page
 * Called on DOMContentLoaded
 */
function initGuruDashboard() {
    logMessage('Guru Dashboard diinisialisasi...', 'info');

    // Check authentication with guru role
    checkAuthAfterPageLoad();

    // Set user info in navbar
    const siakad_user = localStorage.getItem('siakad_user');
    if (siakad_user) {
        try {
            const user = JSON.parse(siakad_user);
            const userNameEl = document.getElementById('userName');
            if (userNameEl) userNameEl.textContent = user.name || user.username;

            const userAvatar = document.getElementById('userAvatar');
            if (userAvatar && user.name) {
                const name = user.name.replace(/\s+/g, '+');
                userAvatar.src = `https://ui-avatars.com/api/?name=${name}&background=f59e0b&color=fff`;
            }

            const profilNama = document.getElementById('profilNama');
            if (profilNama) profilNama.value = user.name || user.username;
        } catch (e) {
            console.error('❌ Error loading user info:', e);
        }
    }

    // Navigation - Section switching
    document.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');

            // Hide all sections
            document.querySelectorAll('main section').forEach(s => s.classList.add('d-none'));

            // Show selected section
            const targetSection = document.getElementById(`section-${section}`);
            if (targetSection) {
                targetSection.classList.remove('d-none');
            }

            // Update active nav link
            document.querySelectorAll('[data-section]').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Mobile sidebar toggle
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.toggle('d-none');
            }
        });
    }

    logMessage('Guru Dashboard siap digunakan', 'success');
}

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', initGuruDashboard);
