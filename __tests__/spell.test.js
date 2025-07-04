/** @jest-environment jsdom */
let enterBattle, heroStats, castFireballAction, updateTurnIndicator;

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
  global.Phaser = { Game: jest.fn() };
  ({ enterBattle, heroStats, castFireballAction, updateTurnIndicator } = require('../public/main.js'));
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
        <button id="fireball-btn">Fireball</button>
        <button id="defend-btn">Defend</button>
        <div id="turn-indicator"></div>
      </div>
      <div id="combat-message"></div>
    </div>`;
});

async function flushTimers() {
  while (jest.getTimerCount() > 0) {
    jest.runOnlyPendingTimers();
    await Promise.resolve();
  }
}

test('castFireball consumes mana and damages monster', async () => {
  const monster = { stats: { hp: 30, maxHp: 30, atk: 0 } };
  heroStats.mp = 20;
  heroStats.mag = 7;
  enterBattle(monster);
  const promise = castFireballAction();
  await flushTimers();
  await promise;
  expect(heroStats.mp).toBe(10);
  expect(monster.stats.hp).toBe(18);
});

test('fireball button disabled when insufficient mana', () => {
  heroStats.mp = 5;
  updateTurnIndicator();
  expect(document.getElementById('fireball-btn').disabled).toBe(true);
});

test('casting fireball with insufficient mana returns empty string', async () => {
  const monster = { stats: { hp: 30, maxHp: 30, atk: 0 } };
  heroStats.mp = 5;
  enterBattle(monster);
  const result = await castFireballAction();
  expect(result).toBe('');
  expect(monster.stats.hp).toBe(30);
  expect(heroStats.mp).toBe(5);
});
