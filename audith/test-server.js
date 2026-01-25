const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_DIR = __dirname;

const server = http.createServer((req, res) => {
    // Default to login.html if root requested
    let filePath = req.url === '/' ? '/login.html' : req.url;
    filePath = path.join(BASE_DIR, filePath);

    const ext = path.extname(filePath);
    let contentType = 'text/html';

    if (ext === '.js') contentType = 'application/javascript';
    if (ext === '.css') contentType = 'text/css';
    if (ext === '.json') contentType = 'application/json';
    if (['.jpeg', '.jpg'].includes(ext)) contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`<h1>404 Not Found</h1><p>${req.url}</p><pre>${err.message}</pre>`);
            console.log(`❌ 404: ${req.url}`);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
            console.log(`✓ 200: ${req.url} (${contentType})`);
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`📄 Open http://localhost:${PORT}/login.html in your browser\n`);
});
