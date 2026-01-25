// Demo credentials database (default/system users)
const demoUsers = {
    admin: { password: '123456', role: 'admin', name: 'Admin SIAKAD' },
    guru01: { password: '123456', role: 'guru', name: 'Bpk. D. Wonda' },
    guru02: { password: '123456', role: 'guru', name: 'Ibu M. Dogopia' },
    siswa001: { password: '123456', role: 'siswa', name: 'Yulianus Tebai' },
    siswa002: { password: '123456', role: 'siswa', name: 'Maria Dogopia' },
    siswa003: { password: '123456', role: 'siswa', name: 'Andi Wijaya' }
};

// Helper: get stored (registered) users from localStorage
function getStoredUsers() {
    try {
        const raw = localStorage.getItem('registered_users');
        if (!raw) return {};
        return JSON.parse(raw);
    } catch (e) {
        return {};
    }
}

// Helper: save stored users
function saveStoredUsers(obj) {
    localStorage.setItem('registered_users', JSON.stringify(obj));
}

// Merge demo users and stored users (stored users override demo)
function getAllUsers() {
    const stored = getStoredUsers();
    return Object.assign({}, demoUsers, stored);
}

// Show error or success in errorMessage box (supports success)
function showMessage(message, type = 'error') {
    const el = document.getElementById('errorMessage');
    el.style.display = 'block';
    el.textContent = message;
    if (type === 'success') {
        el.style.background = '#d4edda';
        el.style.color = '#155724';
        el.style.borderColor = '#c3e6cb';
    } else {
        el.style.background = '#f8d7da';
        el.style.color = '#721c24';
        el.style.borderColor = '#f5c6cb';
    }
}

function clearMessage() {
    const el = document.getElementById('errorMessage');
    el.style.display = 'none';
    el.textContent = '';
    el.style.background = '';
    el.style.color = '';
    el.style.borderColor = '';
}

async function handleLogin(e) {
    e.preventDefault();

    clearMessage();
    const role = document.querySelector('input[name="role"]:checked').value;
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Try server login first
    try {
        const resp = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role })
        });

        if (resp.ok) {
            const data = await resp.json();
            const sessionData = { username: data.username, name: data.name, role: data.role, loginTime: new Date().toISOString() };
            localStorage.setItem('siakad_user', JSON.stringify(sessionData));
            if (role === 'admin') window.location.href = 'admin.html';
            else if (role === 'guru') window.location.href = 'guru.html';
            else window.location.href = 'siswa.html';
            return;
        } else {
            // show server error but allow fallback to local
            const err = await resp.json().catch(() => ({ error: resp.statusText }));
            showMessage(`❌ Login server: ${err.error || err.message || resp.statusText}`, 'error');
        }
    } catch (err) {
        // network/server not available -> fallback to local storage
    }

    // Fallback: local users (existing behavior)
    const users = getAllUsers();
    if (!users[username]) {
        showMessage('❌ Username tidak ditemukan!', 'error');
        return;
    }

    const user = users[username];
    if (user.password !== password) {
        showMessage('❌ Password salah!', 'error');
        return;
    }

    if (user.role !== role) {
        showMessage(`❌ User ini adalah ${user.role.toUpperCase()}, bukan ${role.toUpperCase()}!`, 'error');
        return;
    }

    // Login success (local)
    const sessionData = { username, name: user.name, role, loginTime: new Date().toISOString() };
    localStorage.setItem('siakad_user', JSON.stringify(sessionData));

    if (role === 'admin') window.location.href = 'admin.html';
    else if (role === 'guru') window.location.href = 'guru.html';
    else window.location.href = 'siswa.html';
}

async function handleRegister(e) {
    e.preventDefault();
    clearMessage();

    const name = document.getElementById('fullName').value.trim();
    const username = document.getElementById('regUsername').value.trim();
    const pass = document.getElementById('regPassword').value;
    const pass2 = document.getElementById('regPasswordConfirm').value;
    const role = document.querySelector('input[name="regRole"]:checked').value || 'siswa';

    if (!name || !username || !pass) {
        showMessage('❌ Lengkapi semua field', 'error');
        return;
    }

    if (pass !== pass2) {
        showMessage('❌ Password dan konfirmasi tidak cocok', 'error');
        return;
    }

    // Try to register via server
    try {
        const resp = await fetch('http://localhost:4000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, name, password: pass, role })
        });

        if (resp.status === 201) {
            showMessage('✅ Registrasi berhasil. Silakan login.', 'success');
            showLoginForm();
            document.getElementById('username').value = username;
            return;
        } else {
            const err = await resp.json().catch(() => ({ error: resp.statusText }));
            showMessage(`❌ Registrasi server: ${err.error || err.message || resp.statusText}`, 'error');
        }
    } catch (err) {
        // server not reachable -> fallback to local
    }

    // Fallback: save locally
    const users = getAllUsers();
    if (users[username]) {
        showMessage('❌ Username sudah terpakai, pilih yang lain', 'error');
        return;
    }

    const stored = getStoredUsers();
    stored[username] = { password: pass, role: role, name: name };
    saveStoredUsers(stored);

    showMessage('✅ Registrasi berhasil (lokal). Silakan login.', 'success');
    showLoginForm();
    document.getElementById('username').value = username;
}

// UI toggles
function showLoginForm() {
    clearMessage();
    document.getElementById('loginForm').classList.remove('d-none');
    document.getElementById('registerForm').classList.add('d-none');
    document.getElementById('showLoginBtn').classList.remove('btn-outline-primary');
    document.getElementById('showLoginBtn').classList.add('btn-primary');
    document.getElementById('showRegisterBtn').classList.remove('btn-primary');
    document.getElementById('showRegisterBtn').classList.add('btn-outline-primary');
}

function showRegisterForm() {
    clearMessage();
    document.getElementById('loginForm').classList.add('d-none');
    document.getElementById('registerForm').classList.remove('d-none');
    document.getElementById('showRegisterBtn').classList.remove('btn-outline-primary');
    document.getElementById('showRegisterBtn').classList.add('btn-primary');
    document.getElementById('showLoginBtn').classList.remove('btn-primary');
    document.getElementById('showLoginBtn').classList.add('btn-outline-primary');
}

// Cancel register
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('showLoginBtn').addEventListener('click', showLoginForm);
    document.getElementById('showRegisterBtn').addEventListener('click', showRegisterForm);
    document.getElementById('cancelRegisterBtn').addEventListener('click', () => {
        showLoginForm();
    });

    // ===== SESSION VALIDATION - Cek apakah user sudah login =====
    const siakad_user = localStorage.getItem('siakad_user');

    // CASE 1: Tidak ada session, tampilkan login form
    if (!siakad_user) {
        console.log('✅ No session - showing login form');
        showLoginForm();
        return;
    }

    // CASE 2: Ada data, validasi struktur
    let user = null;
    try {
        user = JSON.parse(siakad_user);
    } catch (e) {
        console.warn('❌ Session corrupted, clear and show login');
        localStorage.clear();
        sessionStorage.clear();
        showLoginForm();
        return;
    }

    // CASE 3: User object tidak valid
    if (!user || !user.role || !user.loginTime) {
        console.warn('⚠️ Invalid user data, clear session');
        localStorage.removeItem('siakad_user');
        sessionStorage.clear();
        showLoginForm();
        return;
    }

    // CASE 4: Cek session timeout (24 jam)
    const loginTime = new Date(user.loginTime);
    const now = new Date();
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 jam

    if (now - loginTime > sessionDuration) {
        console.warn('⏱️ Session expired');
        localStorage.clear();
        sessionStorage.clear();
        showLoginForm();
        return;
    }

    // CASE 5: Session valid - redirect ke dashboard
    console.log('✅ Session valid - redirect to', user.role);

    if (user.role === 'admin') {
        window.location.href = 'admin.html';
    } else if (user.role === 'guru') {
        window.location.href = 'guru.html';
    } else if (user.role === 'siswa') {
        window.location.href = 'siswa.html';
    } else {
        // Role tidak dikenal, clear dan show login
        console.warn('❌ Unknown role:', user.role);
        localStorage.clear();
        sessionStorage.clear();
        showLoginForm();
    }
});