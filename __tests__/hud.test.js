/** @jest-environment jsdom */
let updateHeroHUD, heroStats;

beforeEach(() => {
  jest.resetModules();
  global.Phaser = { Game: jest.fn() };
  ({ updateHeroHUD, heroStats } = require('../public/main.js'));
  document.body.innerHTML = '<div id="hero-hud"></div>';
});

test('updateHeroHUD displays hero stats', () => {
  heroStats.hp = 90;
  heroStats.mp = 20;
  heroStats.level = 2;
  updateHeroHUD();
  const hud = document.getElementById('hero-hud').textContent;
  expect(hud).toContain('Lv 2');
  expect(hud).toContain('HP: 90');
  expect(hud).toContain('MP: 20');
});
