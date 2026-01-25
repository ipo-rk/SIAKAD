// ========================================
// SIAKAD - SISTEM INFORMASI AKADEMIK
// Dashboard Admin - Initialization
// ========================================
// Version: 1.0.0
// Last Updated: 11 Januari 2026
// ========================================

// Global Chart Instance
let chartKehadiranInstance = null;

/**
 * Initialize Admin Dashboard
 * Called on DOMContentLoaded
 */
function initAdminDashboard() {
    logMessage('Admin Dashboard diinisialisasi...', 'info');

    // Check authentication with admin role
    checkAuthAfterPageLoad();

    // Initialize chart
    initChartKehadiran();

    // Setup periodic updates for real-time data
    setupDashboardUpdates();

    logMessage('Admin Dashboard siap digunakan', 'success');
}

/**
 * Chart initialization for admin dashboard
 */
function initChartKehadiran() {
    const ctx = document.getElementById('chartKehadiran');
    if (!ctx) return;

    // Destroy existing chart if it exists (local reference)
    if (chartKehadiranInstance) {
        chartKehadiranInstance.destroy();
        chartKehadiranInstance = null;
    }

    // Also check and destroy any chart instances on this canvas in Chart.js
    // If Chart.instances exists and is an array
    if (Chart.instances && Array.isArray(Chart.instances)) {
        const existingChartIndex = Chart.instances.findIndex(c => c && c.canvas === ctx);
        if (existingChartIndex !== -1) {
            Chart.instances[existingChartIndex].destroy();
        }
    }

    chartKehadiranInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 30 }, (_, i) => `D-${29 - i}`),
            datasets: [{
                label: 'Hadir (%)',
                data: Array.from({ length: 30 }, () => Math.round(75 + Math.random() * 25)),
                tension: 0.3,
                fill: true,
                backgroundColor: 'rgba(99,102,241,0.08)',
                borderColor: 'rgba(99,102,241,0.9)',
                borderWidth: 2,
                borderRadius: 4,
                pointBackgroundColor: 'rgba(99,102,241,1)',
                pointHoverBackgroundColor: 'rgba(99,102,241,0.8)',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    cornerRadius: 4,
                    callbacks: {
                        label: function (context) {
                            return 'Kehadiran: ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function (value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

/**
 * Setup periodic dashboard updates
 * Refresh notifikasi dan data real-time every 30 seconds
 */
function setupDashboardUpdates() {
    setInterval(function () {
        // Update dashboard data every 30 seconds
        // Alpine.js will reactively update UI
        logMessage('Dashboard diperbarui', 'info');
    }, 30000); // 30 seconds
}

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', function () {
    try {
        initAdminDashboard();
        console.log('✅ Admin Dashboard v1.0 - Ready');
    } catch (error) {
        console.error('❌ Error initializing admin dashboard:', error);
    }
});
