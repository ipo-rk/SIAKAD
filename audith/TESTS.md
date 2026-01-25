# Test Instructions (E2E)

This project contains a basic Puppeteer end-to-end test script to validate the SIAKAD siswa dashboard flows (profile save, PDF generation).

Prerequisites

- Node.js (>=14)

Install dependencies:

```bash
npm install
```

Run the E2E test (headless):

```bash
npm run test:e2e
```

What the test does:

- Opens `siswa.html` using `file://` URL
- Sets a mock `siakad_user` in `localStorage`
- Edits the profile name and clicks `Simpan Profil`
- Verifies `siakad_siswa_data` contains the new name
- Monkeypatches jsPDF `save()` to capture the filename
- Triggers `downloadRaport()` (via click) and confirms the PDF save filename was captured

Notes:

- The script uses the local file URL. If you run in an environment where `file://` navigation is blocked, host the files on a local static server (e.g., `npx http-server`) and adjust the `fileUrl` in `scripts/puppeteer_test.js`.
- Puppeteer may download Chromium on first install.
