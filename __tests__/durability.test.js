/** @jest-environment jsdom */
let attackAction, equipWeapon, heroEquipment, heroAttackPower, enterBattle;

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
  global.Phaser = { Game: jest.fn() };
  ({ attackAction, equipWeapon, heroEquipment, heroAttackPower, enterBattle } = require('../public/main.js'));
  document.body.innerHTML = `
    <div id="combat-container" style="display:none;">
      <div class="battle-panel">
        <div class="combatant">
          <img id="hero-img" />
          <div id="hero-stats" class="hp-bar"><div id="hero-hp-fill" class="hp-fill"></div></div>
        </div>
        <div class="combatant">
          <img id="monster-img" />
          <div id="monster-stats" class="hp-bar"><div id="monster-hp-fill" class="hp-fill"></div></div>
        </div>
      </div>
      <div id="combat-controls">
        <button id="attack-btn">Attack</button>
        <button id="defend-btn">Defend</button>
        <div id="turn-indicator"></div>
      </div>
      <div id="combat-message"></div>
    </div>
    <div id="equipment-container">
      <div>Left Hand: <span id="left-hand-slot"></span></div>
      <div>Right Hand: <span id="right-hand-slot"></span></div>
    </div>`;
});

async function flushTimers() {
  while (jest.getTimerCount() > 0) {
    jest.runOnlyPendingTimers();
    await Promise.resolve();
  }
}

test('durability decreases after attack', async () => {
  const sword = { name: 'Sword', twoHanded: false, baseDamage: 5, type: 'sword' };
  equipWeapon('right', sword);
  const monster = { stats: { hp: 30, maxHp: 30, atk: 0 } };
  enterBattle(monster);
  const promise = attackAction();
  await flushTimers();
  await promise;
  expect(heroEquipment.right.durability).toBe(95);
  expect(document.getElementById('right-hand-slot').textContent).toContain('95%');
});

test('weapon effectiveness scales with durability', () => {
  const sword = { name: 'Sword', twoHanded: false, baseDamage: 5, type: 'sword', durability: 50 };
  equipWeapon('right', sword);
  expect(heroAttackPower()).toBe(10 + Math.floor(5 * 0.5));
});

test('slot indicator uses color classes', () => {
  const sword = { name: 'Sword', twoHanded: false, baseDamage: 5, type: 'sword', durability: 20 };
  equipWeapon('left', sword);
  const slot = document.getElementById('left-hand-slot');
  expect(slot.classList.contains('status-bad')).toBe(true);
});
