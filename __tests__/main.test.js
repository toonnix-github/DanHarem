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
    loadScript();
    document.querySelector('[data-clan="ARES"]').click();
    expect(localStorage.getItem('selectedClan')).toBe('ARES');
    expect(document.querySelector('[data-clan="ARES"]').classList.contains('selected')).toBe(true);
  });

  test('loads selected clan from localStorage on init', () => {
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
});
