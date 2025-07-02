/** @jest-environment jsdom */
let create, update, tileSize, setHero, setInputs, setMonsters, getMonsters, getBattleState, setBattleState, mapData;

describe('monster encounters', () => {
  beforeEach(() => {
    jest.resetModules();
    global.Phaser = { Game: jest.fn(), AUTO: 0, Input: { Keyboard: { KeyCodes: {} } } };
    ({ create, update, tileSize, setHero, setInputs, setMonsters, getMonsters, getBattleState, setBattleState, mapData } = require('../public/main.js'));
  });

  test('create spawns monsters', () => {
    const scene = {
      add: {
        graphics: () => ({ fillStyle: jest.fn(), fillRect: jest.fn() }),
        rectangle: jest.fn(() => ({}))
      },
      input: { keyboard: { createCursorKeys: () => ({}), addKeys: () => ({}) } }
    };
    create.call(scene);
    expect(getMonsters().length).toBeGreaterThan(0);
  });

  test('hero near monster triggers battle', () => {
    const hero = { x: tileSize * 2 + tileSize / 2, y: tileSize * 2 + tileSize / 2, width: tileSize, height: tileSize };
    setHero(hero);
    setInputs({ left:{isDown:false}, right:{isDown:false}, up:{isDown:false}, down:{isDown:false} }, { left:{isDown:false}, right:{isDown:false}, up:{isDown:false}, down:{isDown:false} });
    const monster = { sprite: {}, tileX: 2, tileY: 2 };
    setMonsters([monster]);
    setBattleState(false);
    const ctx = { game:{ loop:{ delta: 16 } }, sys:{ game:{ config:{ width: tileSize * mapData[0].length, height: tileSize * mapData.length } } } };
    update.call(ctx);
    expect(getBattleState()).toBe(true);
  });
});
