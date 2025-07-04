/** @jest-environment jsdom */
let enterBattle, heroStats, attackAction, defendAction, setMonsters, getMonsters, playerRewards, equipWeapon, heroAttackPower;

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
  global.Phaser = { Game: jest.fn() };
  ({ enterBattle, heroStats, attackAction, defendAction, setMonsters, getMonsters, playerRewards, equipWeapon, heroAttackPower } = require('../public/main.js'));
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
    <div id="reward-container"><div id="reward-message"></div></div>`;
  heroStats.critChance = 0;
});

async function flushTimers() {
  while (jest.getTimerCount() > 0) {
    jest.runOnlyPendingTimers();
    await Promise.resolve();
  }
}

test('enterBattle shows combat container with stats', () => {
  const monster = { stats: { hp: 30, atk: 5 } };
  enterBattle(monster);
  const container = document.getElementById('combat-container');
  expect(container.style.display).toBe('block');
  expect(document.getElementById('hero-hp-fill').style.width).toBe('100%');
  expect(document.getElementById('monster-hp-fill').style.width).toBe('100%');
  expect(document.getElementById('turn-indicator').textContent).toBe('Player Turn');
});

test('attackAction damages monster and hero takes damage', async () => {
  const monster = { stats: { hp: 30, maxHp: 30, atk: 5 } };
  enterBattle(monster);
  const promise = attackAction();
  expect(document.getElementById('turn-indicator').textContent).toBe('Player Turn');
  await flushTimers();
  await promise;
  expect(monster.stats.hp).toBe(20);
  expect(heroStats.hp).toBe(95);
  expect(document.getElementById('hero-hp-fill').style.width).toBe('95%');
  expect(document.getElementById('monster-hp-fill').style.width).toBe('66.66666666666666%');
  expect(document.getElementById('combat-message').textContent).toContain('Monster attacks');
  expect(document.getElementById('turn-indicator').textContent).toBe('Player Turn');
});

test('weapon base damage increases attack', async () => {
  equipWeapon('right', { name: 'Sword', twoHanded: false, baseDamage: 5, type: 'sword' });
  const monster = { stats: { hp: 40, maxHp: 40, atk: 0 } };
  enterBattle(monster);
  const before = heroAttackPower();
  const promise = attackAction();
  await flushTimers();
  await promise;
  const expected = 40 - before;
  expect(monster.stats.hp).toBe(expected);
});

 test('critical hit deals bonus damage', async () => {
   const monster = { stats: { hp: 30, maxHp: 30, atk: 0 } };
   heroStats.critChance = 1;
  heroStats.critMultiplier = 2;
  enterBattle(monster);
  const before = heroAttackPower();
  const promise = attackAction();
  expect(document.querySelector(".damage-number.critical")).not.toBeNull();
  await flushTimers();
  await promise;
  const expected = 30 - before * heroStats.critMultiplier;
  expect(monster.stats.hp).toBe(expected);
 });

test('defendAction reduces incoming damage', async () => {
  const monster = { stats: { hp: 30, maxHp: 30, atk: 5 } };
  enterBattle(monster);
  const promise = defendAction();
  expect(document.getElementById('turn-indicator').textContent).toBe('Player Turn');
  await flushTimers();
  await promise;
  expect(heroStats.hp).toBe(98);
  expect(document.getElementById('hero-hp-fill').style.width).toBe('98%');
  expect(document.getElementById('combat-message').textContent).toContain('Monster attacks');
  expect(document.getElementById('turn-indicator').textContent).toBe('Player Turn');
});

test('monster removed after defeat', async () => {
  const monster = { stats: { hp: 10, atk: 0 }, sprite: { destroy: jest.fn() } };
  setMonsters([monster]);
  enterBattle(monster);
  await attackAction();
  jest.advanceTimersByTime(3000);
  await flushTimers();
  expect(getMonsters().length).toBe(0);
  expect(monster.sprite.destroy).toHaveBeenCalled();
});

test('rewards granted after defeating monster', async () => {
  const monster = { stats: { hp: 10, atk: 0 }, sprite: { destroy: jest.fn() } };
  setMonsters([monster]);
  enterBattle(monster);
  await attackAction();
  expect(playerRewards.exp).toBeGreaterThan(0);
  expect(document.getElementById('reward-container').style.display).toBe('block');
  expect(document.getElementById('reward-message').textContent).toContain('XP');
  jest.advanceTimersByTime(3000);
  await flushTimers();
  expect(document.getElementById('reward-container').style.display).toBe('none');
});

test('monster action delayed with six 1 second steps', async () => {
  const monster = { stats: { hp: 30, atk: 5 } };
  enterBattle(monster);
  const spy = jest.spyOn(global, 'setTimeout');
  const promise = attackAction();
  await flushTimers();
  const oneSecondCalls = spy.mock.calls.filter(c => c[1] === 1000);
  expect(oneSecondCalls.length).toBe(6);
  await promise;
  spy.mockRestore();
});
