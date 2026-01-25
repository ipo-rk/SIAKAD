SIAKAD - Dev Server (Express)

Cara menjalankan (Windows PowerShell):

1. Buka terminal di folder `server`:

   cd "C:\Users\Asus TUF\Documents\Sacode 2025\Latihan\Belajar-2\server"

2. Install dependency:

   npm install

3. Jalankan server:

   npm start

Server akan berjalan pada `http://localhost:4000` (default). Endpoint:

- POST /api/register { username, name, password, role }
- POST /api/login { username, password, role }
- GET /api/users/:username

Catatan keamanan:

- Ini hanya contoh dev: password disimpan sebagai hash di `users.json`.
- Untuk produksi gunakan database, HTTPS, environment variables, dan manajemen sesi/token.
