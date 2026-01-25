const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname, 'users.json');
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

function readUsers() {
    try {
        if (!fs.existsSync(DATA_FILE)) return {};
        const raw = fs.readFileSync(DATA_FILE, 'utf8') || '{}';
        return JSON.parse(raw);
    } catch (e) {
        return {};
    }
}

function writeUsers(obj) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2), 'utf8');
}

app.post('/api/register', (req, res) => {
    const { username, name, password, role } = req.body || {};
    if (!username || !password || !name) return res.status(400).json({ error: 'Missing fields' });

    const users = readUsers();
    if (users[username]) return res.status(409).json({ error: 'User already exists' });

    const hash = bcrypt.hashSync(password, 10);
    users[username] = { password: hash, role: role || 'siswa', name };
    writeUsers(users);

    return res.status(201).json({ message: 'Registered' });
});

app.post('/api/login', (req, res) => {
    const { username, password, role } = req.body || {};
    if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

    const users = readUsers();
    const user = users[username];
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.role && role && user.role !== role) return res.status(403).json({ error: 'Wrong role' });

    const ok = bcrypt.compareSync(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    return res.json({ username, name: user.name, role: user.role || role });
});

app.get('/api/users/:username', (req, res) => {
    const users = readUsers();
    const u = users[req.params.username];
    if (!u) return res.status(404).json({ error: 'Not found' });
    // Do not return password hash
    const { password, ...rest } = u;
    res.json(rest);
});

app.listen(PORT, () => console.log(`SIAKAD dev server running: http://localhost:${PORT}`));
