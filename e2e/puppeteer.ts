const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.focus('[data-testid="cep-input"]');
  await page.keyboard.type('13566560');
  await page.waitForSelector('[data-testid="card-cep"]');

  await page.screenshot({ path: 'e2e/result.png' });

  await browser.close();
})();
