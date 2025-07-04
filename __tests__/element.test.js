/** @jest-environment jsdom */
let create, getMonsters, enterBattle, castFireballAction,
    heroStats, modifyMonsterResistance, setMonsterElement, updateMonsterInfo,
    ELEMENT_ICONS;

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
  global.Phaser = { Game: jest.fn(), Input: { Keyboard: { KeyCodes: {} } } };
  ({ create, getMonsters, enterBattle, castFireballAction,
     heroStats, modifyMonsterResistance, setMonsterElement, updateMonsterInfo,
     ELEMENT_ICONS } = require('../public/main.js'));
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
      <div id="monster-info"></div>
      <div id="combat-controls">
        <button id="attack-btn">Attack</button>
        <button id="fireball-btn">Fireball</button>
        <button id="defend-btn">Defend</button>
        <div id="turn-indicator"></div>
      </div>
      <div id="combat-message"></div>
    </div>
  `;
});

async function flushTimers() {
  while (jest.getTimerCount() > 0) {
    jest.runOnlyPendingTimers();
    await Promise.resolve();
  }
}

test('spawned monsters have element and resistances', () => {
  const scene = {
    add: {
      graphics: () => ({ fillStyle: jest.fn(), fillRect: jest.fn() }),
      rectangle: jest.fn(() => ({}))
    },
    input: { keyboard: { createCursorKeys: () => ({}), addKeys: () => ({}) } }
  };
  create.call(scene);
  const m = getMonsters()[0];
  expect(m.element).toBeDefined();
  expect(m.resistances).toBeDefined();
});

test('enterBattle displays monster element and resistances', () => {
  const monster = { element: 'Fire', resistances: { Fire: 0.2, Physical: 0 }, stats: { hp: 20, atk: 0 } };
  enterBattle(monster);
  updateMonsterInfo();
  const info = document.getElementById('monster-info').textContent;
  expect(info).toContain('Fire');
  expect(info).toContain('20%');
});

test('fireball damage reduced by monster resistance', async () => {
  const monster = { element: 'Physical', resistances: { Fire: 0.5 }, stats: { hp: 30, maxHp: 30, atk: 0 } };
  heroStats.mag = 5;
  heroStats.mp = 20;
  enterBattle(monster);
  const base = 5 + heroStats.mag; // FIREBALL_BASE_DAMAGE + mag
  const promise = castFireballAction();
  await flushTimers();
  await promise;
  expect(monster.stats.hp).toBe(30 - Math.floor(base * (1 - 0.5)));
});

test('modifyMonsterResistance affects damage calculation', async () => {
  const monster = { element: 'Physical', resistances: { Fire: 0.2 }, stats: { hp: 40, maxHp: 40, atk: 0 } };
  heroStats.mag = 5;
  heroStats.mp = 20;
  enterBattle(monster);
  modifyMonsterResistance(monster, 'Fire', 0.3);
  const base = 5 + heroStats.mag;
  const promise = castFireballAction();
  await flushTimers();
  await promise;
  expect(monster.stats.hp).toBe(40 - Math.floor(base * (1 - 0.5)));
});

test('monster element icon updates with element', () => {
  const monster = { element: 'Fire', resistances: {}, stats: { hp: 10, atk: 0 } };
  document.body.innerHTML += '<img id="monster-element-icon">';
  enterBattle(monster);
  updateMonsterInfo();
  let icon = document.getElementById('monster-element-icon');
  expect(icon.src).toBe(ELEMENT_ICONS.fire);
  expect(icon.title).toBe('Fire');
  setMonsterElement(monster, 'Water');
  updateMonsterInfo();
  expect(icon.src).toBe(ELEMENT_ICONS.water);
  expect(icon.title).toBe('Water');
});
