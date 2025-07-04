/** @jest-environment jsdom */
let enterBattle, heroStats, doubleShotAction, shieldBashAction, skillCooldowns, updateTurnIndicator, heroAttackPower;

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
  global.Phaser = { Game: jest.fn() };
  ({ enterBattle, heroStats, doubleShotAction, shieldBashAction, skillCooldowns, updateTurnIndicator, heroAttackPower } = require('../public/main.js'));
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
        <button id="double-shot-btn">Double Shot</button>
        <button id="shield-bash-btn">Shield Bash</button>
        <button id="fireball-btn">Fireball</button>
        <button id="defend-btn">Defend</button>
        <div id="turn-indicator"></div>
      </div>
    <div id="combat-message"></div>
    </div>`;
  jest.spyOn(Math, 'random').mockReturnValue(0.6);
});

afterEach(() => {
  if (Math.random.mockRestore) Math.random.mockRestore();
});

async function flushTimers() {
  while (jest.getTimerCount() > 0) {
    jest.runOnlyPendingTimers();
    await Promise.resolve();
  }
}

test('double shot deals damage twice and enters cooldown', async () => {
  localStorage.setItem('selectedJob', 'Ranger');
  const monster = { stats: { hp: 40, maxHp: 40, atk: 0 } };
  enterBattle(monster);
  const dmg = heroAttackPower();
  const promise = doubleShotAction();
  await flushTimers();
  await promise;
  expect(monster.stats.hp).toBe(40 - dmg * 2);
  updateTurnIndicator();
  expect(document.getElementById('double-shot-btn').disabled).toBe(true);
  expect(skillCooldowns.doubleShot).toBe(2);
});

test('shield bash can stun monster and enters cooldown', async () => {
  localStorage.setItem('selectedJob', 'Knight');
  const monster = { stats: { hp: 30, maxHp: 30, atk: 5 } };
  jest.spyOn(Math, 'random').mockReturnValue(0); // force stun
  enterBattle(monster);
  const promise = shieldBashAction();
  await flushTimers();
  await promise;
  expect(heroStats.hp).toBe(100); // monster turn skipped
  updateTurnIndicator();
  expect(document.getElementById('shield-bash-btn').disabled).toBe(true);
  expect(skillCooldowns.shieldBash).toBe(3);
});

test('skill buttons hidden for other jobs', () => {
  localStorage.setItem('selectedJob', 'Mage');
  updateTurnIndicator();
  expect(document.getElementById('double-shot-btn').style.display).toBe('none');
  expect(document.getElementById('shield-bash-btn').style.display).toBe('none');
  expect(document.getElementById('fireball-btn').style.display).toBe('inline-block');
});
