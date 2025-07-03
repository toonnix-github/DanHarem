/** @jest-environment jsdom */
let create, update, tileSize, setHero, setInputs, setMonsters, getMonsters, getBattleState, setBattleState, mapData, enterBattle, endBattle, checkRespawns, monsterSpawns, RESPAWN_DELAY;

describe('monster encounters', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
    global.Phaser = { Game: jest.fn(), AUTO: 0, Input: { Keyboard: { KeyCodes: {} } } };
    ({
      create,
      update,
      tileSize,
      setHero,
      setInputs,
      setMonsters,
      getMonsters,
      getBattleState,
      setBattleState,
      mapData,
      enterBattle,
      endBattle,
      checkRespawns,
      monsterSpawns,
      RESPAWN_DELAY
    } = require('../public/main.js'));
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

  test('monster respawns after cooldown', () => {
    const scene = {
      add: {
        graphics: () => ({ fillStyle: jest.fn(), fillRect: jest.fn() }),
        rectangle: jest.fn(() => ({}))
      },
      input: { keyboard: { createCursorKeys: () => ({}), addKeys: () => ({}) } }
    };
    create.call(scene);
    const spawn = monsterSpawns[0];
    const monster = getMonsters().find(m => m.spawn === spawn);
    const initial = getMonsters().length;
    document.body.innerHTML = '<div id="combat-container"></div><div id="turn-indicator"></div>';
    enterBattle(monster);
    endBattle();
    expect(getMonsters().length).toBe(initial - 1);
    expect(getMonsters().find(m => m.spawn === spawn)).toBeUndefined();
    jest.advanceTimersByTime(RESPAWN_DELAY);
    checkRespawns.call(scene, scene);
    expect(getMonsters().find(m => m.spawn === spawn)).toBeDefined();
  });
});
