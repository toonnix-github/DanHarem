/** @jest-environment jsdom */
let equipWeapon, heroEquipment, updateEquipmentUI;

beforeEach(() => {
  jest.resetModules();
  global.Phaser = { Game: jest.fn() };
  ({ equipWeapon, heroEquipment, updateEquipmentUI } = require('../public/main.js'));
  document.body.innerHTML = `
    <div id="equipment-container">
      <div>Left Hand: <span id="left-hand-slot"></span></div>
      <div>Right Hand: <span id="right-hand-slot"></span></div>
    </div>`;
  updateEquipmentUI();
});

test('equip one-handed weapon to left slot', () => {
  const dagger = { name: 'Dagger', twoHanded: false, baseDamage: 3, type: 'dagger' };
  equipWeapon('left', dagger);
  expect(heroEquipment.left).toBe(dagger);
  expect(heroEquipment.right).toBeNull();
  expect(document.getElementById('left-hand-slot').textContent).toBe('Dagger (3) - 100%');
  expect(document.getElementById('right-hand-slot').textContent).toBe('Empty');
});

test('two-handed weapon occupies both slots', () => {
  const gs = { name: 'Greatsword', twoHanded: true, baseDamage: 8, type: 'greatsword' };
  equipWeapon('right', gs);
  expect(heroEquipment.left).toBe(gs);
  expect(heroEquipment.right).toBe(gs);
  expect(document.getElementById('left-hand-slot').textContent).toBe('Greatsword (8) - 100%');
  expect(document.getElementById('right-hand-slot').textContent).toBe('Greatsword (8) - 100%');
});

test('equipping one-handed clears two-handed weapon', () => {
  const gs = { name: 'Greatsword', twoHanded: true, baseDamage: 8, type: 'greatsword' };
  equipWeapon('left', gs);
  const sword = { name: 'Sword', twoHanded: false, baseDamage: 5, type: 'sword' };
  equipWeapon('left', sword);
  expect(heroEquipment.left).toBe(sword);
  expect(heroEquipment.right).toBeNull();
  expect(document.getElementById('left-hand-slot').textContent).toBe('Sword (5) - 100%');
  expect(document.getElementById('right-hand-slot').textContent).toBe('Empty');
});

test('equipping two-handed weapon replaces both one-handed weapons', () => {
  const sword = { name: 'Sword', twoHanded: false, baseDamage: 5, type: 'sword' };
  const dagger = { name: 'Dagger', twoHanded: false, baseDamage: 3, type: 'dagger' };
  equipWeapon('left', sword);
  equipWeapon('right', dagger);
  const gs = { name: 'Greatsword', twoHanded: true, baseDamage: 8, type: 'greatsword' };
  equipWeapon('left', gs);
  expect(heroEquipment.left).toBe(gs);
  expect(heroEquipment.right).toBe(gs);
  expect(document.getElementById('left-hand-slot').textContent).toBe('Greatsword (8) - 100%');
  expect(document.getElementById('right-hand-slot').textContent).toBe('Greatsword (8) - 100%');
});

test('one-handed weapons equip independently', () => {
  const sword = { name: 'Sword', twoHanded: false, baseDamage: 5, type: 'sword' };
  const dagger = { name: 'Dagger', twoHanded: false, baseDamage: 3, type: 'dagger' };
  equipWeapon('left', sword);
  equipWeapon('right', dagger);
  expect(heroEquipment.left).toBe(sword);
  expect(heroEquipment.right).toBe(dagger);
  expect(document.getElementById('left-hand-slot').textContent).toBe('Sword (5) - 100%');
  expect(document.getElementById('right-hand-slot').textContent).toBe('Dagger (3) - 100%');
});
