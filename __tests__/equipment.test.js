/** @jest-environment jsdom */
let equipWeapon, heroEquipment, updateEquipmentUI;

beforeEach(() => {
  jest.resetModules();
  global.Phaser = { Game: jest.fn() };
  ({ equipWeapon, heroEquipment, updateEquipmentUI } = require('../public/main.js'));
  document.body.innerHTML = `
    <div id="equipment-container">
      <div id="left-hand-slot"></div>
      <div id="right-hand-slot"></div>
    </div>`;
  updateEquipmentUI();
});

test('equip one-handed weapon to left slot', () => {
  const dagger = { name: 'Dagger', twoHanded: false };
  equipWeapon('left', dagger);
  expect(heroEquipment.left).toBe(dagger);
  expect(heroEquipment.right).toBeNull();
  expect(document.getElementById('left-hand-slot').textContent).toBe('Dagger');
  expect(document.getElementById('right-hand-slot').textContent).toBe('Empty');
});

test('two-handed weapon occupies both slots', () => {
  const gs = { name: 'Greatsword', twoHanded: true };
  equipWeapon('right', gs);
  expect(heroEquipment.left).toBe(gs);
  expect(heroEquipment.right).toBe(gs);
  expect(document.getElementById('left-hand-slot').textContent).toBe('Greatsword');
  expect(document.getElementById('right-hand-slot').textContent).toBe('Greatsword');
});

test('equipping one-handed clears two-handed weapon', () => {
  const gs = { name: 'Greatsword', twoHanded: true };
  equipWeapon('left', gs);
  const sword = { name: 'Sword', twoHanded: false };
  equipWeapon('left', sword);
  expect(heroEquipment.left).toBe(sword);
  expect(heroEquipment.right).toBeNull();
  expect(document.getElementById('left-hand-slot').textContent).toBe('Sword');
  expect(document.getElementById('right-hand-slot').textContent).toBe('Empty');
});
