/** @jest-environment jsdom */
const {
  update,
  tileSize,
  mapData,
  setHero,
  setInputs
} = require('../public/main.js');

describe('hero movement', () => {
  beforeEach(() => {
    // ensure Phaser doesn't execute game loop
    global.Phaser = { Game: jest.fn() };
  });

  test('hero moves right when right key is pressed', () => {
    const hero = { x: tileSize + tileSize / 2, y: tileSize + tileSize / 2, width: tileSize, height: tileSize };
    setHero(hero);
    const cursors = {
      left: { isDown: false },
      right: { isDown: true },
      up: { isDown: false },
      down: { isDown: false }
    };
    const wasd = { left: { isDown: false }, right: { isDown: false }, up: { isDown: false }, down: { isDown: false } };
    setInputs(cursors, wasd);
    const context = {
      game: { loop: { delta: 16 } },
      sys: { game: { config: { width: tileSize * mapData[0].length, height: tileSize * mapData.length } } }
    };
    update.call(context);
    expect(hero.x).toBeGreaterThan(tileSize + tileSize / 2);
  });
});
