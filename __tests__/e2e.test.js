const path = require('path');
const puppeteer = require('puppeteer');

jest.setTimeout(30000);

describe('End-to-end happy path', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--allow-file-access-from-files'
      ]
    });
    page = await browser.newPage();
    page.on('pageerror', err => console.error('pageerror', err));
    page.on('console', msg => console.log('console', msg.text()));
    await page.setRequestInterception(true);
    page.on('request', req => {
      if (req.url().includes('phaser.js')) {
        req.respond({ status: 200, contentType: 'text/javascript', body: 'window.Phaser={Game:function(){}};' });
      } else {
        req.continue();
      }
    });
    const htmlPath = 'file:' + path.resolve(__dirname, '../public/index.html');
    await page.goto(htmlPath);
  });

  afterAll(async () => {
    if (browser) await browser.close();
  });

  test('registers, selects clan and job', async () => {
    await page.type('#username', 'user');
    await page.type('#email', 'test@example.com');
    await page.type('#password', 'password123');
    await page.click('#registration-form button[type="submit"]');

    await page.waitForSelector('#clan-selection-container', { visible: true });
    const regDisplay = await page.$eval('#registration-container', el => el.style.display);
    expect(regDisplay).toBe('none');

    await page.click('.clan-option[data-clan="ARES"]');
    const stored = await page.evaluate(() => localStorage.getItem('selectedClan'));
    expect(stored).toBe('ARES');
    const message = await page.$eval('#selected-clan-message', el => el.textContent);
    expect(message).toBe('Selected Clan: ARES');

    await page.waitForSelector('#job-selection-container', { visible: true });
    await page.click('.job-option[data-job="Knight"]');
    const storedJob = await page.evaluate(() => localStorage.getItem('selectedJob'));
    expect(storedJob).toBe('Knight');
    const jobMsg = await page.$eval('#selected-job-message', el => el.textContent);
    expect(jobMsg).toBe('Selected Job: Knight');
    await page.click('#job-continue');
    const confirmMsg = await page.$eval('#selected-job-message', el => el.textContent);
    expect(confirmMsg).toBe('Job Confirmed: Knight');
  });
});
