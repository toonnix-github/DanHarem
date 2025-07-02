/** @jest-environment jsdom */
let enterBattle, heroStats;

beforeEach(() => {
  jest.resetModules();
  global.Phaser = { Game: jest.fn() };
  ({ enterBattle, heroStats } = require('../public/main.js'));
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
    </div>`;
});

test('enterBattle shows combat container with stats', () => {
  const monster = { stats: { hp: 30 } };
  enterBattle(monster);
  const container = document.getElementById('combat-container');
  expect(container.style.display).toBe('block');
  expect(document.getElementById('hero-stats').textContent).toBe(`Hero HP: ${heroStats.hp}`);
  expect(document.getElementById('monster-stats').textContent).toBe('Monster HP: 30');
});
