/** @jest-environment jsdom */
let enterBattle, heroStats, attackAction, defendAction, setMonsters, getMonsters;

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
  global.Phaser = { Game: jest.fn() };
  ({ enterBattle, heroStats, attackAction, defendAction, setMonsters, getMonsters } = require('../public/main.js'));
  document.body.innerHTML = `
    <div id="combat-container" style="display:none;">
      <div class="battle-panel">
        <div class="combatant">
          <img id="hero-img" />
          <div id="hero-stats"></div>
        </div>
        <div class="combatant">
          <img id="monster-img" />
          <div id="monster-stats"></div>
        </div>
      </div>
      <div id="combat-controls">
        <button id="attack-btn">Attack</button>
        <button id="defend-btn">Defend</button>
        <div id="turn-indicator"></div>
        <div id="combat-message"></div>
      </div>
    </div>`;
});

test('enterBattle shows combat container with stats', () => {
  const monster = { stats: { hp: 30, atk: 5 } };
  enterBattle(monster);
  const container = document.getElementById('combat-container');
  expect(container.style.display).toBe('block');
  expect(document.getElementById('hero-stats').textContent).toBe(`Hero HP: ${heroStats.hp}`);
  expect(document.getElementById('monster-stats').textContent).toBe('Monster HP: 30');
  expect(document.getElementById('turn-indicator').textContent).toBe('Player Turn');
});

test('attackAction damages monster and hero takes damage', async () => {
  const monster = { stats: { hp: 30, atk: 5 } };
  enterBattle(monster);
  const promise = attackAction();
  expect(document.getElementById('turn-indicator').textContent).toBe('Enemy Turn');
  jest.runAllTimers();
  await promise;
  expect(monster.stats.hp).toBe(20);
  expect(heroStats.hp).toBe(95);
  expect(document.getElementById('combat-message').textContent).toContain('Monster attacks');
  expect(document.getElementById('turn-indicator').textContent).toBe('Player Turn');
});

test('defendAction reduces incoming damage', async () => {
  const monster = { stats: { hp: 30, atk: 5 } };
  enterBattle(monster);
  const promise = defendAction();
  expect(document.getElementById('turn-indicator').textContent).toBe('Enemy Turn');
  jest.runAllTimers();
  await promise;
  expect(heroStats.hp).toBe(98);
  expect(document.getElementById('combat-message').textContent).toContain('Monster attacks');
  expect(document.getElementById('turn-indicator').textContent).toBe('Player Turn');
});

test('monster removed after defeat', async () => {
  const monster = { stats: { hp: 10, atk: 0 }, sprite: { destroy: jest.fn() } };
  setMonsters([monster]);
  enterBattle(monster);
  await attackAction();
  expect(getMonsters().length).toBe(0);
  expect(monster.sprite.destroy).toHaveBeenCalled();
});
