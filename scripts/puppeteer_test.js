// Basic Puppeteer E2E test for siswa.html
// Steps:
// 1. Open siswa.html (file://)
// 2. Set mock user in localStorage and reload
// 3. Verify window.SiakadUtils exists
// 4. Edit profile via DOM, click Save, verify localStorage update
// 5. Override jsPDF save to capture filename, call downloadRaport(), assert filename captured

const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Serve local file path
    const filePath = path.resolve(__dirname, '..', 'siswa.html');
    const fileUrl = 'file://' + filePath.replace(/\\/g, '/');

    await page.goto(fileUrl, { waitUntil: 'networkidle0' });

    // Set mock user in localStorage and reload
    await page.evaluate(() => {
        localStorage.setItem('siakad_user', JSON.stringify({ name: 'Puppeteer Siswa', username: 'puppet', id: 'PUP001' }));
    });
    await page.reload({ waitUntil: 'networkidle0' });

    // Wait for SiakadUtils to be available
    await page.waitForFunction(() => window.SiakadUtils && typeof window.SiakadUtils.renderAllData === 'function');
    console.log('SiakadUtils available');

    // Edit profile: enable, change value, click Save button
    await page.evaluate(() => {
        const editLink = document.querySelector('[onclick="editProfile()"]');
        if (editLink) editLink.click();
    });

    // Wait briefly and set input value
    await page.waitForSelector('#profilNama');
    await page.focus('#profilNama');
    await page.evaluate(() => {
        const input = document.getElementById('profilNama');
        input.value = 'Puppet Test';
    });

    // Click Save Profile button
    await page.click('#saveProfileBtn');
    await page.waitForTimeout(500);

    // Verify localStorage updated
    const siswaData = await page.evaluate(() => JSON.parse(localStorage.getItem('siakad_siswa_data') || '{}'));
    if (!siswaData || siswaData.nama !== 'Puppet Test') {
        console.error('Profile not saved correctly', siswaData);
        await browser.close();
        process.exit(1);
    }
    console.log('Profile saved in localStorage:', siswaData.nama);

    // Prepare to capture pdf filename by monkeypatching jsPDF.prototype.save
    await page.evaluate(() => {
        window.__lastSavedPdf = null;
        try {
            const jsPDF = window.jspdf && window.jspdf.jsPDF;
            if (jsPDF && jsPDF.prototype) {
                jsPDF.prototype._origSave = jsPDF.prototype.save;
                jsPDF.prototype.save = function (filename) {
                    window.__lastSavedPdf = filename || 'unknown.pdf';
                    // do not call original to avoid download in headless
                };
            }
        } catch (e) {
            // ignore
        }
    });

    // Trigger downloadRaport via click
    // Ensure raport section visible first by clicking nav
    await page.evaluate(() => {
        const raportLink = Array.from(document.querySelectorAll('[data-section]')).find(a => a.getAttribute('data-section') === 'raport');
        if (raportLink) raportLink.click();
    });
    await page.waitForSelector('#section-raport:not(.d-none)');

    // Click Download PDF button
    await page.click('#section-raport .btn-primary');
    await page.waitForTimeout(500);

    const savedFile = await page.evaluate(() => window.__lastSavedPdf || null);
    if (!savedFile) {
        console.error('PDF save not captured');
        await browser.close();
        process.exit(1);
    }

    console.log('PDF captured:', savedFile);

    // Restore jsPDF original save to avoid side effects
    await page.evaluate(() => {
        try {
            const jsPDF = window.jspdf && window.jspdf.jsPDF;
            if (jsPDF && jsPDF.prototype && jsPDF.prototype._origSave) {
                jsPDF.prototype.save = jsPDF.prototype._origSave;
                delete jsPDF.prototype._origSave;
            }
        } catch (e) { }
    });

    await browser.close();
    console.log('E2E puppeteer test completed successfully');
    process.exit(0);
})();
