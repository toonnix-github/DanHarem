/** @jest-environment jsdom */

const { validateRegistration } = require('../public/validation');

describe('main.js DOM interactions', () => {
  let domCallback;
  const html = `
    <div id="registration-container">
      <form id="registration-form">
        <div id="error-message"></div>
        <input type="text" id="username" name="username">
        <input type="email" id="email" name="email">
        <input type="password" id="password" name="password">
        <button type="submit">Register</button>
      </form>
    </div>
    <div id="clan-selection-container">
      <div id="selected-clan-message"></div>
      <div class="clan-option" data-clan="ARES"><h3>ARES</h3></div>
      <div class="clan-option" data-clan="ATHENA"><h3>ATHENA</h3></div>
    </div>
    <div id="job-selection-container">
      <div id="selected-job-message"></div>
      <div id="job-warning"></div>
      <div class="job-option" data-job="Knight"><h3>Knight</h3></div>
      <div class="job-option" data-job="Ranger"><h3>Ranger</h3></div>
      <div class="job-option" data-job="Mage"><h3>Mage</h3></div>
      <button id="job-continue">Continue</button>
    </div>
  `;

  const loadScript = () => {
    jest.resetModules();
    // intercept DOMContentLoaded handler
    domCallback = undefined;
    const originalAdd = document.addEventListener.bind(document);
    document.addEventListener = (evt, cb) => {
      if (evt === 'DOMContentLoaded') domCallback = cb;
      else originalAdd(evt, cb);
    };
    global.Phaser = { Game: jest.fn() };
    global.validateRegistration = validateRegistration;
    require('../public/main.js');
    domCallback(new Event('DOMContentLoaded'));
  };

  beforeEach(() => {
    document.body.innerHTML = html;
    localStorage.clear();
    const form = document.getElementById('registration-form');
    form.username = document.getElementById('username');
    form.email = document.getElementById('email');
    form.password = document.getElementById('password');
  });

  test('clicking clan option stores selection in localStorage', () => {
    localStorage.setItem('registered', 'true');
    loadScript();
    document.querySelector('[data-clan="ARES"]').click();
    expect(localStorage.getItem('selectedClan')).toBe('ARES');
    expect(document.querySelector('[data-clan="ARES"]').classList.contains('selected')).toBe(true);
  });

  test('loads selected clan from localStorage on init', () => {
    localStorage.setItem('registered', 'true');
    localStorage.setItem('selectedClan', 'ATHENA');
    loadScript();
    expect(document.querySelector('[data-clan="ATHENA"]').classList.contains('selected')).toBe(true);
    expect(document.getElementById('selected-clan-message').textContent).toBe('Selected Clan: ATHENA');
  });

  test('successful registration hides form and shows clan container', () => {
    loadScript();
    const form = document.getElementById('registration-form');
    form.querySelector('#username').value = 'user';
    form.querySelector('#email').value = 'test@example.com';
    form.querySelector('#password').value = 'password123';
    form.dispatchEvent(new Event('submit'));
    expect(document.getElementById('error-message').textContent).toBe('');
    expect(document.getElementById('registration-container').style.display).toBe('none');
    expect(document.getElementById('clan-selection-container').style.display).toBe('block');
  });

  test('clicking job option stores selection in localStorage', () => {
    localStorage.setItem('registered', 'true');
    loadScript();
    document.querySelector('[data-clan="ARES"]').click();
    document.querySelector('[data-job="Knight"]').click();
    expect(localStorage.getItem('selectedJob')).toBe('Knight');
    expect(document.querySelector('[data-job="Knight"]').classList.contains('selected')).toBe(true);
  });

  test('loads selected job from localStorage on init', () => {
    localStorage.setItem('registered', 'true');
    localStorage.setItem('selectedClan', 'ARES');
    localStorage.setItem('selectedJob', 'Mage');
    loadScript();
    expect(document.querySelector('[data-job="Mage"]').classList.contains('selected')).toBe(true);
    expect(document.getElementById('selected-job-message').textContent).toBe('Selected Job: Mage');
  });

  test('cannot continue without selecting job', () => {
    localStorage.setItem('registered', 'true');
    loadScript();
    document.querySelector('[data-clan="ARES"]').click();
    document.getElementById('job-continue').click();
    expect(document.getElementById('job-warning').textContent).toBe('Please select a job.');
  });

  test('confirmation message appears after job selected and continue clicked', () => {
    localStorage.setItem('registered', 'true');
    loadScript();
    document.querySelector('[data-clan="ARES"]').click();
    document.querySelector('[data-job="Ranger"]').click();
    document.getElementById('job-continue').click();
    expect(document.getElementById('selected-job-message').textContent).toBe('Job Confirmed: Ranger');
  });

  test('default weapon equipped when job confirmed', () => {
    localStorage.setItem('registered', 'true');
    loadScript();
    document.querySelector('[data-clan="ARES"]').click();
    document.querySelector('[data-job="Knight"]').click();
    document.getElementById('job-continue').click();
    const { heroEquipment } = require('../public/main.js');
    expect(heroEquipment.right).toEqual(expect.objectContaining({ name: 'Sword', type: 'sword', twoHanded: false, baseDamage: 5, durability: 100 }));
    expect(heroEquipment.left).toBeNull();
  });
});
