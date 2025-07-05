/** @jest-environment jsdom */
let showCompanionShop, purchaseCompanion, playerRewards, companions;

beforeEach(() => {
  jest.resetModules();
  global.Phaser = { Game: jest.fn() };
  ({ showCompanionShop, purchaseCompanion, playerRewards, companions } = require('../public/main.js'));
  document.body.innerHTML = `
    <div id="companion-shop">
      <div id="currency-display"></div>
      <div id="shop-list"></div>
      <div id="shop-message"></div>
    </div>
    <div id="hero-hud"></div>`;
});

test('purchase succeeds with enough gold', () => {
  playerRewards.gold = 1;
  showCompanionShop();
  const result = purchaseCompanion(0);
  expect(result).toBe(true);
  expect(companions.length).toBe(1);
  expect(playerRewards.gold).toBe(0);
  expect(document.getElementById('shop-message').textContent).toContain('recruited');
});

test('purchase fails without funds', () => {
  playerRewards.gold = 0;
  showCompanionShop();
  const result = purchaseCompanion(0);
  expect(result).toBe(false);
  expect(companions.length).toBe(0);
  expect(document.getElementById('shop-message').textContent).toContain('Insufficient');
});
