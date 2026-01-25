# API Design - SIAKAD (Backend Proposal)

This document proposes two simple endpoints to integrate the frontend `siswa.html` with a backend for persistence and raport generation.

1. POST /api/profil

- Purpose: Save or update student profile data
- URL: `/api/profil`
- Method: POST
- Content-Type: `application/json`
- Request body example:

```json
{
  "nis": "2025001",
  "nama": "Yulianus Tebai",
  "kelas": "VIII A",
  "tahunAkademik": "2024/2025",
  "jenisKelamin": "Laki-laki",
  "agama": "Kristen"
}
```

- Success Response: 200 OK

```json
{
  "status": "ok",
  "message": "Profil tersimpan",
  "data": {
    /* saved record */
  }
}
```

- Error Response: 4xx/5xx with `message` field

Client example (curl):

```bash
curl -X POST https://your-api.example.com/api/profil \
  -H "Content-Type: application/json" \
  -d '{"nis":"2025001","nama":"Yulianus Tebai"}'
```

2. POST /api/raport/generate

- Purpose: Generate raport PDF server-side (optional). Returns URL to download or binary file.
- URL: `/api/raport/generate`
- Method: POST
- Content-Type: `application/json`
- Request body example:

```json
{
  "nis": "2025001",
  "semester": "Semester 1 (2024/2025)",
  "includeLogo": true
}
```

- Success Response (pre-signed URL): 200 OK

```json
{
  "status": "ok",
  "downloadUrl": "https://cdn.example.com/raports/2025001-2024S1.pdf"
}
```

- Alternative: return `application/pdf` binary with `Content-Disposition: attachment; filename=...`

Client example (curl):

```bash
curl -X POST https://your-api.example.com/api/raport/generate \
  -H "Content-Type: application/json" \
  -d '{"nis":"2025001","semester":"Semester 1 (2024/2025)"}' --output raport.pdf
```

Authentication & Security

- Use token-based authentication (e.g., Bearer JWT) for all endpoints.
- Validate payload server-side.
- Use HTTPS in production.

Storage

- Profiles: relational DB (e.g., MySQL/Postgres) or NoSQL.
- Raports: generated PDF stored in object storage (S3-compatible) and return signed URL.

Implementation Notes

- `/api/profil` should return canonical profile that front-end can store in `localStorage` after successful response.
- For `/api/raport/generate` consider async generation for large reports (return job ID, then poll for completion).
