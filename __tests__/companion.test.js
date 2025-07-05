/** @jest-environment jsdom */
let addCompanion, removeCompanion, getInventory, updateInventoryUI, loadInventory;

beforeEach(() => {
  jest.resetModules();
  document.body.innerHTML = '<ul id="companion-inventory"></ul>';
  ({ addCompanion, removeCompanion, getInventory, updateInventoryUI, loadInventory } = require('../public/companion.js'));
  localStorage.clear();
  loadInventory();
});

test('addCompanion stores data and updates UI', () => {
  const comp = { name: 'Lili', job: 'Healer', stats: { hp: 100, attack: 5, defense: 5, speed: 5 }, level: 1 };
  addCompanion(comp);
  expect(getInventory().length).toBe(1);
  expect(JSON.parse(localStorage.getItem('companionInventory')).length).toBe(1);
  updateInventoryUI();
  expect(document.getElementById('companion-inventory').textContent).toContain('Lili');
});

test('removeCompanion deletes from inventory and UI', () => {
  const comp = addCompanion({ name: 'Bell', job: 'Adventurer', stats: { hp: 90, attack: 12, defense: 6, speed: 8 }, level: 1 });
  updateInventoryUI();
  expect(document.getElementById('companion-inventory').textContent).toContain('Bell');
  removeCompanion(comp.id);
  expect(getInventory().length).toBe(0);
  updateInventoryUI();
  expect(document.getElementById('companion-inventory').textContent).not.toContain('Bell');
});

test('inventory persists after reload', () => {
  const comp = addCompanion({ name: 'Haruhime', job: 'Support', stats: { hp: 80, attack: 8, defense: 4, speed: 7 }, level: 1 });
  updateInventoryUI();
  expect(document.getElementById('companion-inventory').textContent).toContain('Haruhime');
  // reload module
  jest.resetModules();
  document.body.innerHTML = '<ul id="companion-inventory"></ul>';
  ({ loadInventory, getInventory, updateInventoryUI } = require('../public/companion.js'));
  loadInventory();
  updateInventoryUI();
  expect(getInventory().length).toBe(1);
  expect(document.getElementById('companion-inventory').textContent).toContain('Haruhime');
});
