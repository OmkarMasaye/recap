const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Load the form page
    await page.goto('http://127.0.0.1:5500/index.html');

    // Simulate filling out the form multiple times rapidly
    for (let i = 0; i < 10; i++) {
        // Fill in the name field
        await page.type('#name', `Test User ${i}`);
        
        // Attempt to submit the form without solving the reCAPTCHA
        await page.click('#send_button');

        // Introduce a delay using setTimeout inside page.evaluate
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500))); // 500ms delay between attempts
    }

    // Close the browser
    await browser.close();
})();
