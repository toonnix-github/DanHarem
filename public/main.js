const tileSize = 32;
const mapData = [
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
const townMapData = Array.from({ length: mapData.length }, (_, y) =>
  Array.from({ length: mapData[0].length }, (_, x) =>
    y === 0 || y === mapData.length - 1 || x === 0 || x === mapData[0].length - 1 ? 0 : 1
  )
);
const DUNGEON_DOOR = { x: 1, y: 0 };
const TOWN_DOOR = { x: 1, y: townMapData.length - 1 };
const TOWN_ENTRY = { x: 1, y: townMapData.length - 2 };
townMapData[TOWN_DOOR.y][TOWN_DOOR.x] = 1;
townMapData[TOWN_ENTRY.y][TOWN_ENTRY.x] = 1;

const DUNGEON_ENTRY = { x: DUNGEON_DOOR.x, y: DUNGEON_DOOR.y + 1 };
const config = {
  type: Phaser.AUTO,
  width: tileSize * mapData[0].length,
  height: tileSize * mapData.length,
  scene: [
    { key: "DungeonScene", preload, create, update },
    { key: "TownScene", preload: townPreload, create: townCreate, update: townUpdate }
  ]
};

let hero;
let heroStats = {
  hp: 100,
  mp: 30,
  maxHp: 100,
  maxMp: 30,
  str: 10,
  spd: 5,
  mag: 3,
  level: 1,
  exp: 0,
  defending: false,
  attributePoints: 0,
  critChance: 0.1,
  critMultiplier: 1.5,
};
let heroEquipment = { left: null, right: null };
const DEFAULT_RESISTANCES = { Physical: 0, Fire: 0, Water: 0 };
const ELEMENT_ICONS = {
  fire:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAP0lEQVR4AZ3B0QmAMBAFwb20efW9OlcjBgTNjzMsBvlQnAxyq6Z4GAaZmotBHgZLgOZlVFNMDYQ9gwbZMcgfB/zMFZLXHOqhAAAAAElFTkSuQmCC',
  water:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAPklEQVR4AZXBwQ2AMAwEwd0mXaSbPBIJP4jgwQwPnXCQ0QmjlJtsnXAqZZFO+FIqWyecSllkdMIo5VUn/HUBN4sUVnEQkF8AAAAASUVORK5CYII=',
  physical:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAALklEQVR4AaXBsQ0AMAjAsJSr+H/KV3RFSBVDbTq1GIJFsDhq8ZCZh04thmAR/LpHUgq4BM/ldgAAAABJRU5ErkJggg=='
};
const DURABILITY_LOSS_PER_USE = 5;
const FIREBALL_COST = 10;
const FIREBALL_BASE_DAMAGE = 5;
const HEAL_COST = 10;
const HEAL_AMOUNT = 25;
const STUNNING_STRIKE_COOLDOWN = 2;
const STUNNING_STRIKE_STUN_CHANCE = 0.3;
const defaultWeapons = {
  Knight: { name: 'Sword', type: 'sword', twoHanded: false, baseDamage: 5 },
  Ranger: { name: 'Bow', type: 'bow', twoHanded: true, baseDamage: 4 },
  Mage: { name: 'Staff', type: 'staff', twoHanded: true, baseDamage: 3 }
};
let playerRewards = { exp: 0, gold: 0, items: [] };
let skillCooldowns = { doubleShot: 0, shieldBash: 0, stunningStrike: 0 };
let cursors;
let wasd;
let monsters = [];
let inBattle = false;
let currentMonster = null;
let turn = 'player';
const RESPAWN_DELAY = 10000;
const monsterSpawns = [
  { x: 5, y: 5, nextSpawn: 0 },
  { x: 10, y: 8, nextSpawn: 0 }
];

function showTurnBanner(text) {
  const banner = document.getElementById('turn-banner');
  if (!banner) return;
  banner.textContent = text;
  banner.classList.add('visible');
}

function updateTurnIndicator() {
  const indicator = document.getElementById('turn-indicator');
  if (indicator) {
    indicator.textContent = turn === 'player' ? 'Player Turn' : 'Enemy Turn';
  }
  showTurnBanner(turn === 'player' ? 'Hero Turn' : 'Enemy Turn');
  const attackBtn = document.getElementById('attack-btn');
  const defendBtn = document.getElementById('defend-btn');
  const display = turn === 'player' ? 'inline-block' : 'none';
  if (attackBtn) attackBtn.style.display = display;
  if (defendBtn) defendBtn.style.display = display;
  updateSkillButtons();
}

function updateSkillButtons() {
  const job = localStorage.getItem('selectedJob');
  const fireballBtn = document.getElementById('fireball-btn');
  const healBtn = document.getElementById('heal-btn');
  const doubleBtn = document.getElementById('double-shot-btn');
  const bashBtn = document.getElementById('shield-bash-btn');
  const stunBtn = document.getElementById('stun-strike-btn');
  const display = turn === 'player' ? 'inline-block' : 'none';
  if (fireballBtn) {
    fireballBtn.style.display = job === 'Mage' ? display : 'none';
    fireballBtn.disabled = heroStats.mp < FIREBALL_COST;
  }
  if (healBtn) {
    healBtn.style.display = job === 'Mage' ? display : 'none';
    healBtn.disabled = heroStats.mp < HEAL_COST;
  }
  if (doubleBtn) {
    doubleBtn.style.display = job === 'Ranger' ? display : 'none';
    doubleBtn.disabled = skillCooldowns.doubleShot > 0;
    doubleBtn.textContent =
      skillCooldowns.doubleShot > 0
        ? `Double Shot (${skillCooldowns.doubleShot})`
        : 'Double Shot';
  }
  if (bashBtn) {
    bashBtn.style.display = job === 'Knight' ? display : 'none';
    bashBtn.disabled = skillCooldowns.shieldBash > 0;
    bashBtn.textContent =
      skillCooldowns.shieldBash > 0
        ? `Shield Bash (${skillCooldowns.shieldBash})`
        : 'Shield Bash';
  }
  if (stunBtn) {
    stunBtn.style.display = job === 'Knight' ? display : 'none';
    stunBtn.disabled = skillCooldowns.stunningStrike > 0;
    stunBtn.textContent =
      skillCooldowns.stunningStrike > 0
        ? `Stunning Strike (${skillCooldowns.stunningStrike})`
        : 'Stunning Strike';
  }
}

function decrementCooldowns() {
  Object.keys(skillCooldowns).forEach(k => {
    if (skillCooldowns[k] > 0) skillCooldowns[k]--;
  });
}

function updateHeroHUD() {
  const hud = document.getElementById('hero-hud');
  if (!hud) return;
  const name = localStorage.getItem('username') || 'Hero';
  hud.innerHTML =
    `<div>${name} - Lv ${heroStats.level}</div>` +
    `<div>HP: ${heroStats.hp}/${heroStats.maxHp}</div>` +
    `<div>MP: ${heroStats.mp}/${heroStats.maxMp}</div>` +
    `<div>STR: ${heroStats.str} SPD: ${heroStats.spd} MAG: ${heroStats.mag}</div>`;
}

function updateMonsterInfo() {
  const info = document.getElementById('monster-info');
  const icon = document.getElementById('monster-element-icon');
  if (!info || !currentMonster) return;
  const res = currentMonster.resistances || {};
  const entries = Object.keys(res)
    .map(k => `${k} ${Math.round(res[k] * 100)}%`)
    .join(' ');
  info.textContent = `Element: ${currentMonster.element || 'Unknown'} | ${entries}`;
  if (icon) {
    const el = (currentMonster.element || 'Physical').toLowerCase();
    icon.src = ELEMENT_ICONS[el] || '';
    icon.title = currentMonster.element || 'Unknown';
    icon.style.display = 'block';
  }
}

function updateEquipmentUI() {
  const leftSlot = document.getElementById('left-hand-slot');
  const rightSlot = document.getElementById('right-hand-slot');
  const applyStatus = (el, weapon) => {
    if (!el) return;
    el.classList.remove('status-good', 'status-worn', 'status-bad');
    if (!weapon) {
      el.textContent = 'Empty';
      return;
    }
    const dur = weapon.durability ?? 0;
    el.textContent = `${weapon.name} (${weapon.baseDamage}) - ${dur}%`;
    if (dur > 70) el.classList.add('status-good');
    else if (dur > 30) el.classList.add('status-worn');
    else el.classList.add('status-bad');
  };
  applyStatus(leftSlot, heroEquipment.left);
  applyStatus(rightSlot, heroEquipment.right);
}

function updateAttributeUI() {
  const container = document.getElementById('attribute-container');
  const span = document.getElementById('points-remaining');
  if (!container || !span) return;
  span.textContent = heroStats.attributePoints;
  container.style.display = heroStats.attributePoints > 0 ? 'block' : 'none';
}

function allocateAttribute(stat) {
  if (heroStats.attributePoints <= 0) return;
  if (stat === 'str' || stat === 'spd' || stat === 'mag') {
    heroStats[stat] += 1;
    heroStats.attributePoints -= 1;
    updateHeroHUD();
    updateAttributeUI();
  }
}

function equipWeapon(slot, weapon) {
  if (!weapon || (slot !== 'left' && slot !== 'right')) return;
  if (weapon.durability == null) weapon.durability = 100;
  if (weapon.twoHanded) {
    heroEquipment.left = weapon;
    heroEquipment.right = weapon;
  } else {
    if (heroEquipment.left && heroEquipment.left.twoHanded) {
      heroEquipment.left = null;
      heroEquipment.right = null;
    }
    if (heroEquipment.right && heroEquipment.right.twoHanded) {
      heroEquipment.left = null;
      heroEquipment.right = null;
    }
    heroEquipment[slot] = weapon;
  }
  updateEquipmentUI();
}

function degradeWeapon(weapon, amount = DURABILITY_LOSS_PER_USE) {
  if (!weapon) return;
  weapon.durability = Math.max(0, (weapon.durability || 0) - amount);
}

function weaponDamage() {
  const calc = w => (w.baseDamage || 0) * ((w.durability ?? 0) / 100);
  let dmg = 0;
  if (heroEquipment.left) dmg += calc(heroEquipment.left);
  if (heroEquipment.right && heroEquipment.right !== heroEquipment.left) {
    dmg += calc(heroEquipment.right);
  }
  return Math.floor(dmg);
}

function heroAttackPower() {
  return heroStats.str + weaponDamage();
}

function fireballDamage() {
  return FIREBALL_BASE_DAMAGE + heroStats.mag;
}

function applyResistance(monster, dmg, element) {
  const res = monster.resistances?.[element] ?? 0;
  return Math.floor(dmg * (1 - res));
}

function assignDefaultWeapon(job) {
  const weapon = defaultWeapons[job];
  if (weapon) {
    equipWeapon('right', weapon);
  }
}

function updateHPBars() {
  const heroFill = document.getElementById('hero-hp-fill');
  if (heroFill) {
    heroFill.style.width = `${(heroStats.hp / heroStats.maxHp) * 100}%`;
  }
  const monsterFill = document.getElementById('monster-hp-fill');
  if (monsterFill && currentMonster) {
    const max = currentMonster.stats.maxHp || currentMonster.stats.hp;
    monsterFill.style.width = `${(currentMonster.stats.hp / max) * 100}%`;
  }
}

function endBattle(result) {
  const combat = document.getElementById('combat-container');
  if (combat) combat.style.display = 'none';
  inBattle = false;
  if (currentMonster) {
    if (currentMonster.sprite && typeof currentMonster.sprite.destroy === 'function') {
      currentMonster.sprite.destroy();
    }
    monsters = monsters.filter(m => m !== currentMonster);
    scheduleRespawn(currentMonster);
  }
  const icon = document.getElementById('monster-element-icon');
  if (icon) icon.style.display = 'none';
  currentMonster = null;
  turn = 'player';
  updateTurnIndicator();
  updateHeroHUD();
  updateHPBars();
  if (result) setCombatMessage(result);
  const banner = document.getElementById('turn-banner');
  if (banner) banner.classList.remove('visible');
}

function spawnMonsterAt(spawn, scene) {
  let sprite;
  if (scene.add.sprite) {
    sprite = scene.add.sprite(
      spawn.x * tileSize + tileSize / 2,
      spawn.y * tileSize + tileSize / 2,
      'skeletonSheet',
      0
    );
    sprite.setOrigin(0.5, 0.5);
    sprite.setScale(1);
  } else {
    sprite = scene.add.rectangle(
      spawn.x * tileSize + tileSize / 2,
      spawn.y * tileSize + tileSize / 2,
      tileSize,
      tileSize,
      0x00ff00
    );
  }
  return {
    sprite,
    tileX: spawn.x,
    tileY: spawn.y,
    element: spawn.element || 'Physical',
    resistances: { ...DEFAULT_RESISTANCES, ...(spawn.resistances || {}) },
    stats: { hp: 30, maxHp: 30, atk: 5, critChance: 0, critMultiplier: 1.5 },
    spawn
  };
}

function scheduleRespawn(monster) {
  if (monster.spawn) {
    monster.spawn.nextSpawn = Date.now() + RESPAWN_DELAY;
  }
}

function modifyMonsterResistance(monster, element, delta) {
  if (!monster.resistances) monster.resistances = { ...DEFAULT_RESISTANCES };
  monster.resistances[element] = (monster.resistances[element] || 0) + delta;
  updateMonsterInfo();
}

function setMonsterElement(monster, element) {
  if (!monster) return;
  monster.element = element;
  updateMonsterInfo();
}

function spawnMonsters(scene) {
  monsters = monsterSpawns.map(spawn => {
    spawn.nextSpawn = 0;
    return spawnMonsterAt(spawn, scene);
  });
}

function checkRespawns(scene) {
  const now = Date.now();
  monsterSpawns.forEach(spawn => {
    const occupied = monsters.some(m => m.spawn === spawn);
    if (!occupied && spawn.nextSpawn && now >= spawn.nextSpawn) {
      monsters.push(spawnMonsterAt(spawn, scene));
      spawn.nextSpawn = 0;
    }
  });
}

function enterBattle(monster) {
  const combat = document.getElementById('combat-container');
  if (!combat) return;
  const heroEl = document.getElementById('hero-stats');
  const monsterEl = document.getElementById('monster-stats');
  currentMonster = monster;
  heroStats.defending = false;
  turn = 'player';
  if (heroEl) heroEl.className = 'hp-bar';
  if (monsterEl) monsterEl.className = 'hp-bar';
  updateHPBars();
  updateMonsterInfo();
  combat.style.display = 'block';
  const msgEl = document.getElementById('combat-message');
  if (msgEl) msgEl.textContent = 'Battle started!';
  updateTurnIndicator();
}

function updateCombatDisplay() {
  updateHPBars();
  updateHeroHUD();
}

function setCombatMessage(msg) {
  const msgEl = document.getElementById('combat-message');
  if (msgEl) msgEl.textContent = msg;
}

function xpForNextLevel(level) {
  return 20 * level;
}

function checkLevelUp() {
  let leveled = false;
  while (heroStats.exp >= xpForNextLevel(heroStats.level)) {
    heroStats.exp -= xpForNextLevel(heroStats.level);
    heroStats.level += 1;
    heroStats.maxHp += 10;
    heroStats.maxMp += 5;
    heroStats.hp += 10;
    heroStats.mp += 5;
    heroStats.attributePoints += 3;
    leveled = true;
  }
  if (leveled) {
    const msgEl = document.getElementById('level-up-message');
    if (msgEl) msgEl.textContent = `Level Up! Level ${heroStats.level}`;
    updateHeroHUD();
    updateAttributeUI();
  }
}

function handleRewards() {
  const reward = { exp: 10 };
  playerRewards.exp += reward.exp;
  heroStats.exp += reward.exp;
  const msgEl = document.getElementById('reward-message');
  const container = document.getElementById('reward-container');
  if (msgEl) msgEl.textContent = `Earned ${reward.exp} XP`;
  checkLevelUp();
  updateHeroHUD();
  updateAttributeUI();
  return new Promise(resolve => {
    if (container) {
      container.style.display = 'block';
      setTimeout(() => {
        container.style.display = 'none';
        const lvlMsg = document.getElementById('level-up-message');
        if (lvlMsg) lvlMsg.textContent = '';
        resolve();
      }, 3000);
    } else {
      resolve();
    }
  });
}

function showDamage(targetId, amount, isCritical = false) {
  const target = document.getElementById(targetId);
  const container = document.getElementById('combat-container');
  if (!target || !container) return;
  const rect = target.getBoundingClientRect();
  const cRect = container.getBoundingClientRect();
  const dmg = document.createElement('div');
  dmg.className = "damage-number";

  if (isCritical) dmg.classList.add('critical');
  dmg.textContent = `-${amount}`;
  dmg.style.left = `${rect.left - cRect.left + rect.width / 2}px`;
  dmg.style.top = `${rect.top - cRect.top - 10}px`;
  container.appendChild(dmg);
  setTimeout(() => dmg.remove(), 800);
}

function animateAttack(attackerId, targetId, damage, isCritical = false) {
  const attacker = document.getElementById(attackerId);
  const target = document.getElementById(targetId);
  if (attacker) {
    const cls = attackerId === 'hero-img' ? 'lunge-left' : 'lunge-right';
    attacker.classList.add('attacking', cls);
  }
  if (target) target.classList.add('damaged');
  if (damage != null) showDamage(targetId, damage, isCritical);
  setTimeout(() => {
    if (attacker) {
      attacker.classList.remove('attacking', 'lunge-left', 'lunge-right');
    }
    if (target) target.classList.remove('damaged');
  }, 300);
}

function animateFireball(attackerId, targetId, damage, isCritical = false) {
  const attacker = document.getElementById(attackerId);
  const target = document.getElementById(targetId);
  const container = document.getElementById('combat-container');
  if (!attacker || !target || !container) {
    if (damage != null) showDamage(targetId, damage, isCritical);
    return Promise.resolve();
  }
  const aRect = attacker.getBoundingClientRect();
  const tRect = target.getBoundingClientRect();
  const cRect = container.getBoundingClientRect();
  const fireball = document.createElement('div');
  fireball.className = 'fireball';
  const startX = aRect.left - cRect.left + aRect.width / 2;
  const startY = aRect.top - cRect.top + aRect.height / 2;
  const endX = tRect.left - cRect.left + tRect.width / 2;
  const endY = tRect.top - cRect.top + tRect.height / 2;
  fireball.style.left = `${startX}px`;
  fireball.style.top = `${startY}px`;
  container.appendChild(fireball);
  const duration = 600;
  const peak = -50;
  return new Promise(resolve => {
    const startTime = performance.now();
    function step(time) {
      const t = Math.min((time - startTime) / duration, 1);
      const x = startX + (endX - startX) * t;
      const y = startY + (endY - startY) * t + peak * Math.sin(Math.PI * t);
      fireball.style.left = `${x}px`;
      fireball.style.top = `${y}px`;
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        if (damage != null) showDamage(targetId, damage, isCritical);
        fireball.remove();
        resolve();
      }
    }
    requestAnimationFrame(step);
  });
}

function monsterTurn() {
  if (!currentMonster) return '';
  if (currentMonster.stunned) {
    currentMonster.stunned = false;
    return 'Monster is stunned and cannot act.';
  }
  let damage = currentMonster.stats.atk;
  if (currentMonster.atkPenalty) {
    damage = Math.floor(damage / 2);
    currentMonster.atkPenalty--;
  }
  const crit = Math.random() < (currentMonster.stats.critChance || 0);
  if (crit) damage = Math.floor(damage * (currentMonster.stats.critMultiplier || 1.5));
  if (heroStats.defending) {
    damage = Math.floor(damage / 2);
    heroStats.defending = false;
  }
  animateAttack('monster-img', 'hero-img', damage, crit);
  heroStats.hp -= damage;
  updateCombatDisplay();
  return crit ? `Monster critically hits for ${damage}. Hero HP is ${heroStats.hp}.` : `Monster attacks for ${damage}. Hero HP is ${heroStats.hp}.`;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function enemyPhase(initialMsg) {
  turn = 'enemy';
  updateTurnIndicator();
  setCombatMessage(initialMsg + ' Monster turn');
  await delay(1000);

  setCombatMessage('Monster selects action');
  await delay(1000);

  setCombatMessage('Monster takes action');
  await delay(1000);

  const attackMsg = monsterTurn();
  setCombatMessage(attackMsg);
  await delay(1000);

  if (heroStats.hp <= 0) {
    endBattle(attackMsg + ' Hero defeated!');
    return attackMsg + ' Hero defeated!';
  }

  turn = 'player';
  decrementCooldowns();
  updateTurnIndicator();
  setCombatMessage(attackMsg);
  await delay(1000);

  return attackMsg;
}

async function attackAction() {
  if (!currentMonster || turn !== 'player') return '';
  const attackBtn = document.getElementById('attack-btn');
  const defendBtn = document.getElementById('defend-btn');
  const fireballBtn = document.getElementById('fireball-btn');
  if (attackBtn) attackBtn.style.display = 'none';
  if (defendBtn) defendBtn.style.display = 'none';
  if (fireballBtn) fireballBtn.style.display = 'none';
  let damage = heroAttackPower();
  const crit = Math.random() < heroStats.critChance;
  if (crit) damage = Math.floor(damage * heroStats.critMultiplier);
  damage = applyResistance(currentMonster, damage, 'Physical');
  animateAttack('hero-img', 'monster-img', damage, crit);
  currentMonster.stats.hp -= damage;
  if (heroEquipment.left) degradeWeapon(heroEquipment.left);
  if (heroEquipment.right && heroEquipment.right !== heroEquipment.left) {
    degradeWeapon(heroEquipment.right);
  }
  updateEquipmentUI();
  updateCombatDisplay();
  let msg = crit ? `Hero critically hits! Monster HP is ${currentMonster.stats.hp}.` : `Hero attacks! Monster HP is ${currentMonster.stats.hp}.`;
  setCombatMessage(msg);
  if (currentMonster.stats.hp <= 0) {
    const finalMsg = msg + ' Monster defeated!';
    setCombatMessage(finalMsg);
    const mImg = document.getElementById('monster-img');
    const icon = document.getElementById('monster-element-icon');
    if (mImg) mImg.classList.add('defeated');
    if (icon) icon.style.display = 'none';
    handleRewards().then(() => {
      endBattle(finalMsg);
      if (mImg) mImg.classList.remove('defeated');
    });
    return finalMsg;
  }
  await delay(1000);
  return enemyPhase(msg);
}

async function castFireballAction() {
  if (!currentMonster || turn !== 'player' || heroStats.mp < FIREBALL_COST) return '';
  const attackBtn = document.getElementById('attack-btn');
  const defendBtn = document.getElementById('defend-btn');
  const fireballBtn = document.getElementById('fireball-btn');
  if (attackBtn) attackBtn.style.display = 'none';
  if (defendBtn) defendBtn.style.display = 'none';
  if (fireballBtn) fireballBtn.style.display = 'none';
  heroStats.mp -= FIREBALL_COST;
  let damage = fireballDamage();
  damage = applyResistance(currentMonster, damage, 'Fire');
  await animateFireball('hero-img', 'monster-img', damage, false);
  currentMonster.stats.hp -= damage;
  updateCombatDisplay();
  let msg = `Hero casts Fireball! Monster HP is ${currentMonster.stats.hp}.`;
  setCombatMessage(msg);
  if (currentMonster.stats.hp <= 0) {
    const finalMsg = msg + ' Monster defeated!';
    setCombatMessage(finalMsg);
    const mImg = document.getElementById('monster-img');
    const icon = document.getElementById('monster-element-icon');
    if (mImg) mImg.classList.add('defeated');
    if (icon) icon.style.display = 'none';
    handleRewards().then(() => {
      endBattle(finalMsg);
      if (mImg) mImg.classList.remove('defeated');
    });
    return finalMsg;
  }
  await delay(1000);
  return enemyPhase(msg);
}

async function doubleShotAction() {
  if (!currentMonster || turn !== 'player' || skillCooldowns.doubleShot > 0) return '';
  const attackBtn = document.getElementById('attack-btn');
  const defendBtn = document.getElementById('defend-btn');
  const doubleBtn = document.getElementById('double-shot-btn');
  const bashBtn = document.getElementById('shield-bash-btn');
  const fireballBtn = document.getElementById('fireball-btn');
  [attackBtn, defendBtn, doubleBtn, bashBtn, fireballBtn].forEach(btn => {
    if (btn) btn.style.display = 'none';
  });
  skillCooldowns.doubleShot = 3;
  let totalDamage = 0;
  for (let i = 0; i < 2; i++) {
    let damage = heroAttackPower();
    const crit = Math.random() < heroStats.critChance;
    if (crit) damage = Math.floor(damage * heroStats.critMultiplier);
    damage = applyResistance(currentMonster, damage, 'Physical');
    animateAttack('hero-img', 'monster-img', damage, crit);
    currentMonster.stats.hp -= damage;
    totalDamage += damage;
    if (heroEquipment.left) degradeWeapon(heroEquipment.left);
    if (heroEquipment.right && heroEquipment.right !== heroEquipment.left) {
      degradeWeapon(heroEquipment.right);
    }
    updateEquipmentUI();
    updateCombatDisplay();
    if (currentMonster.stats.hp <= 0) break;
    await delay(300);
  }
  let msg = `Hero uses Double Shot! Monster HP is ${currentMonster.stats.hp}.`;
  setCombatMessage(msg);
  if (currentMonster.stats.hp <= 0) {
    const finalMsg = 'Hero uses Double Shot! Monster defeated!';
    setCombatMessage(finalMsg);
    const mImg = document.getElementById('monster-img');
    const icon = document.getElementById('monster-element-icon');
    if (mImg) mImg.classList.add('defeated');
    if (icon) icon.style.display = 'none';
    await handleRewards();
    endBattle(finalMsg);
    if (mImg) mImg.classList.remove('defeated');
    return finalMsg;
  }
  await delay(1000);
  return enemyPhase(msg);
}

async function shieldBashAction() {
  if (!currentMonster || turn !== 'player' || skillCooldowns.shieldBash > 0) return '';
  const attackBtn = document.getElementById('attack-btn');
  const defendBtn = document.getElementById('defend-btn');
  const doubleBtn = document.getElementById('double-shot-btn');
  const bashBtn = document.getElementById('shield-bash-btn');
  const fireballBtn = document.getElementById('fireball-btn');
  [attackBtn, defendBtn, doubleBtn, bashBtn, fireballBtn].forEach(btn => {
    if (btn) btn.style.display = 'none';
  });
  skillCooldowns.shieldBash = 4;
  let damage = Math.floor(heroAttackPower() * 0.8);
  damage = applyResistance(currentMonster, damage, 'Physical');
  animateAttack('hero-img', 'monster-img', damage, false);
  currentMonster.stats.hp -= damage;
  if (heroEquipment.left) degradeWeapon(heroEquipment.left);
  if (heroEquipment.right && heroEquipment.right !== heroEquipment.left) {
    degradeWeapon(heroEquipment.right);
  }
  updateEquipmentUI();
  updateCombatDisplay();
  let msg = `Hero uses Shield Bash! Monster HP is ${currentMonster.stats.hp}.`;
  if (Math.random() < 0.5) {
    currentMonster.stunned = true;
    msg = `Hero uses Shield Bash! Monster stunned. HP is ${currentMonster.stats.hp}.`;
  } else {
    currentMonster.atkPenalty = 1;
    msg = `Hero uses Shield Bash! Monster weakened. HP is ${currentMonster.stats.hp}.`;
  }
  setCombatMessage(msg);
  if (currentMonster.stats.hp <= 0) {
    const finalMsg = 'Hero uses Shield Bash! Monster defeated!';
    setCombatMessage(finalMsg);
    const mImg = document.getElementById('monster-img');
    const icon = document.getElementById('monster-element-icon');
    if (mImg) mImg.classList.add('defeated');
    if (icon) icon.style.display = 'none';
    await handleRewards();
    endBattle(finalMsg);
    if (mImg) mImg.classList.remove('defeated');
    return finalMsg;
  }
  await delay(1000);
  return enemyPhase(msg);
}

async function healAction() {
  if (!currentMonster || turn !== 'player' || heroStats.mp < HEAL_COST) return '';
  const attackBtn = document.getElementById('attack-btn');
  const defendBtn = document.getElementById('defend-btn');
  const healBtn = document.getElementById('heal-btn');
  const fireballBtn = document.getElementById('fireball-btn');
  const stunBtn = document.getElementById('stun-strike-btn');
  [attackBtn, defendBtn, healBtn, fireballBtn, stunBtn].forEach(btn => {
    if (btn) btn.style.display = 'none';
  });
  heroStats.mp -= HEAL_COST;
  heroStats.hp = Math.min(heroStats.maxHp, heroStats.hp + HEAL_AMOUNT);
  updateCombatDisplay();
  const msg = `Hero casts Heal! HP is ${heroStats.hp}.`;
  setCombatMessage(msg);
  await delay(1000);
  return enemyPhase(msg);
}

async function stunningStrikeAction() {
  if (!currentMonster || turn !== 'player' || skillCooldowns.stunningStrike > 0) return '';
  const attackBtn = document.getElementById('attack-btn');
  const defendBtn = document.getElementById('defend-btn');
  const doubleBtn = document.getElementById('double-shot-btn');
  const bashBtn = document.getElementById('shield-bash-btn');
  const fireballBtn = document.getElementById('fireball-btn');
  const healBtn = document.getElementById('heal-btn');
  const stunBtn = document.getElementById('stun-strike-btn');
  [attackBtn, defendBtn, doubleBtn, bashBtn, fireballBtn, healBtn, stunBtn].forEach(btn => {
    if (btn) btn.style.display = 'none';
  });
  skillCooldowns.stunningStrike = STUNNING_STRIKE_COOLDOWN;
  let damage = Math.floor(heroAttackPower() * 0.5);
  damage = applyResistance(currentMonster, damage, 'Physical');
  animateAttack('hero-img', 'monster-img', damage, false);
  currentMonster.stats.hp -= damage;
  if (heroEquipment.left) degradeWeapon(heroEquipment.left);
  if (heroEquipment.right && heroEquipment.right !== heroEquipment.left) {
    degradeWeapon(heroEquipment.right);
  }
  updateEquipmentUI();
  updateCombatDisplay();
  let msg = `Hero uses Stunning Strike! Monster HP is ${currentMonster.stats.hp}.`;
  if (Math.random() < STUNNING_STRIKE_STUN_CHANCE) {
    currentMonster.stunned = true;
    msg = `Hero uses Stunning Strike! Monster stunned. HP is ${currentMonster.stats.hp}.`;
  }
  setCombatMessage(msg);
  if (currentMonster.stats.hp <= 0) {
    const finalMsg = 'Hero uses Stunning Strike! Monster defeated!';
    setCombatMessage(finalMsg);
    const mImg = document.getElementById('monster-img');
    const icon = document.getElementById('monster-element-icon');
    if (mImg) mImg.classList.add('defeated');
    if (icon) icon.style.display = 'none';
    await handleRewards();
    endBattle(finalMsg);
    if (mImg) mImg.classList.remove('defeated');
    return finalMsg;
  }
  await delay(1000);
  return enemyPhase(msg);
}

async function defendAction() {
  if (!currentMonster || turn !== 'player') return '';
  const attackBtn = document.getElementById('attack-btn');
  const defendBtn = document.getElementById('defend-btn');
  if (attackBtn) attackBtn.style.display = 'none';
  if (defendBtn) defendBtn.style.display = 'none';
  heroStats.defending = true;
  let msg = 'Hero defends.';
  setCombatMessage(msg);
  await delay(1000);
  return enemyPhase(msg);
}

function preload() {
  if (this.load && this.load.spritesheet) {
    this.load.spritesheet('heroSheet', './assets/Dungeon_Character_at.png', {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet(
      'skeletonSheet',
      './assets/Enemy_Animations_Set/enemies-skeleton1_idle.png',
      {
        frameWidth: 32,
        frameHeight: 32
      }
    );
  }
}

function create() {
  const graphics = this.add.graphics();
  graphics.fillStyle(0x444444, 1);
  mapData.forEach((row, y) => {
    row.forEach((cell, x) => {
      const color = cell === 1 ? 0x888888 : 0x222222;
      graphics.fillStyle(color, 1);
      graphics.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    });
  });

  // spawn hero on a walkable tile to ensure movement works
  if (this.add.sprite) {
    hero = this.add.sprite(
      tileSize + tileSize / 2,
      tileSize + tileSize / 2,
      'heroSheet',
      0
    );
    hero.setOrigin(0.5, 0.5);
    hero.setScale(1);
  } else {
    hero = this.add.rectangle(tileSize + tileSize / 2, tileSize + tileSize / 2, tileSize, tileSize, 0xff0000);
  }
  spawnMonsters(this);
  cursors = this.input.keyboard.createCursorKeys();
  wasd = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });
}

function update() {
  checkRespawns(this);
  if (!hero || !cursors || !wasd) return;
  const speed = 200;
  const delta = this.game.loop.delta / 1000;
  let newX = hero.x;
  let newY = hero.y;
  if (cursors.left.isDown || wasd.left.isDown) newX -= speed * delta;
  if (cursors.right.isDown || wasd.right.isDown) newX += speed * delta;
  if (cursors.up.isDown || wasd.up.isDown) newY -= speed * delta;
  if (cursors.down.isDown || wasd.down.isDown) newY += speed * delta;

  const halfW = hero.width / 2;
  const halfH = hero.height / 2;
  const checkTile = (x, y) => {
    const tx = Math.floor(x / tileSize);
    const ty = Math.floor(y / tileSize);
    return mapData[ty] && mapData[ty][tx] === 1;
  };

  if (checkTile(newX - halfW, hero.y) && checkTile(newX + halfW - 1, hero.y)) {
    hero.x = newX;
  }
  if (checkTile(hero.x, newY - halfH) && checkTile(hero.x, newY + halfH - 1)) {
    hero.y = newY;
  }
  const width = this.sys.game.config.width;
  const height = this.sys.game.config.height;
  hero.x = Math.max(halfW, Math.min(width - halfW, hero.x));
  hero.y = Math.max(halfH, Math.min(height - halfH, hero.y));

  const heroTileX = Math.floor(hero.x / tileSize);
  const heroTileY = Math.floor(hero.y / tileSize);
  monsters.forEach(m => {
    if (
      Math.abs(heroTileX - m.tileX) <= 1 &&
      Math.abs(heroTileY - m.tileY) <= 1 &&
      !inBattle
    ) {
      inBattle = true;
      console.log('Battle start!');
      enterBattle(m);
    }
  });
  if (heroTileX === DUNGEON_DOOR.x && heroTileY === DUNGEON_DOOR.y) {
    this.scene.start("TownScene", { x: TOWN_ENTRY.x * tileSize + tileSize / 2, y: TOWN_ENTRY.y * tileSize + tileSize / 2 });
    return;
  }
}
function townPreload() {
  preload.call(this);
}

function townCreate(data = {}) {
  const graphics = this.add.graphics();
  graphics.fillStyle(0x444444, 1);
  townMapData.forEach((row, y) => {
    row.forEach((cell, x) => {
      const color = cell === 1 ? 0x888888 : 0x222222;
      graphics.fillStyle(color, 1);
      graphics.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    });
  });
  const spawnX = data.x !== undefined ? data.x : TOWN_ENTRY.x * tileSize + tileSize / 2;
  const spawnY = data.y !== undefined ? data.y : TOWN_ENTRY.y * tileSize + tileSize / 2;
  if (this.add.sprite) {
    hero = this.add.sprite(spawnX, spawnY, "heroSheet", 0);
    hero.setOrigin(0.5, 0.5);
    hero.setScale(1);
  } else {
    hero = this.add.rectangle(spawnX, spawnY, tileSize, tileSize, 0xff0000);
  }
  cursors = this.input.keyboard.createCursorKeys();
  wasd = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });
}

function townUpdate() {
  if (!hero || !cursors || !wasd) return;
  const speed = 200;
  const delta = this.game.loop.delta / 1000;
  let newX = hero.x;
  let newY = hero.y;
  if (cursors.left.isDown || wasd.left.isDown) newX -= speed * delta;
  if (cursors.right.isDown || wasd.right.isDown) newX += speed * delta;
  if (cursors.up.isDown || wasd.up.isDown) newY -= speed * delta;
  if (cursors.down.isDown || wasd.down.isDown) newY += speed * delta;
  const halfW = hero.width / 2;
  const halfH = hero.height / 2;
  const checkTile = (x, y) => {
    const tx = Math.floor(x / tileSize);
    const ty = Math.floor(y / tileSize);
    return townMapData[ty] && townMapData[ty][tx] === 1;
  };
  if (checkTile(newX - halfW, hero.y) && checkTile(newX + halfW - 1, hero.y)) {
    hero.x = newX;
  }
  if (checkTile(hero.x, newY - halfH) && checkTile(hero.x, newY + halfH - 1)) {
    hero.y = newY;
  }
  const width = this.sys.game.config.width;
  const height = this.sys.game.config.height;
  hero.x = Math.max(halfW, Math.min(width - halfW, hero.x));
  hero.y = Math.max(halfH, Math.min(height - halfH, hero.y));
  const heroTileX = Math.floor(hero.x / tileSize);
  const heroTileY = Math.floor(hero.y / tileSize);
  if (heroTileX === TOWN_DOOR.x && heroTileY === TOWN_DOOR.y) {
    this.scene.start("DungeonScene", { x: DUNGEON_ENTRY.x * tileSize + tileSize / 2, y: DUNGEON_ENTRY.y * tileSize + tileSize / 2 });
    return;
  }
}


const game = new Phaser.Game(config);
const canvasEl = document.querySelector('canvas');
if (canvasEl) canvasEl.classList.add('game-canvas');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  const errorEl = document.getElementById('error-message');
  const clanContainer = document.getElementById('clan-selection-container');
  const clanOptions = document.querySelectorAll('.clan-option');
  const clanMessage = document.getElementById('selected-clan-message');
  const jobContainer = document.getElementById('job-selection-container');
  const jobOptions = document.querySelectorAll('.job-option');
  const jobMessage = document.getElementById('selected-job-message');
  const jobWarning = document.getElementById('job-warning');
  const continueBtn = document.getElementById('job-continue');
  const attackBtn = document.getElementById('attack-btn');
  const defendBtn = document.getElementById('defend-btn');
  const fireballBtn = document.getElementById('fireball-btn');
  const doubleShotBtn = document.getElementById('double-shot-btn');
  const shieldBashBtn = document.getElementById('shield-bash-btn');
  const healBtn = document.getElementById('heal-btn');
  const stunBtn = document.getElementById('stun-strike-btn');
  const strBtn = document.getElementById('str-plus');
  const spdBtn = document.getElementById('spd-plus');
  const magBtn = document.getElementById('mag-plus');

  let selectedClan = localStorage.getItem('selectedClan') || null;
  let selectedJob = localStorage.getItem('selectedJob') || null;
  const registered = localStorage.getItem('registered') === 'true';
  let jobConfirmed = localStorage.getItem('jobConfirmed') === 'true';

  const PHASES = { REGISTER: 'register', CLAN: 'clan', JOB: 'job', PLAY: 'play' };
  const showPhase = phase => {
    document.getElementById('registration-container').style.display =
      phase === PHASES.REGISTER ? 'flex' : 'none';
    clanContainer.style.display = phase === PHASES.CLAN ? 'block' : 'none';
    jobContainer.style.display = phase === PHASES.JOB ? 'block' : 'none';
  };

  if (selectedClan) {
    clanOptions.forEach(o => {
      if (o.dataset.clan === selectedClan) o.classList.add('selected');
    });
    if (clanMessage) clanMessage.textContent = `Selected Clan: ${selectedClan}`;
  }

  if (selectedJob) {
    jobOptions.forEach(o => {
      if (o.dataset.job === selectedJob) o.classList.add('selected');
    });
    if (jobMessage) {
      const msg = jobConfirmed ? 'Job Confirmed' : 'Selected Job';
      jobMessage.textContent = `${msg}: ${selectedJob}`;
    }
    if (jobConfirmed) assignDefaultWeapon(selectedJob);
  }

  const initPhase = () => {
    if (!registered) showPhase(PHASES.REGISTER);
    else if (!selectedClan) showPhase(PHASES.CLAN);
    else if (!jobConfirmed) showPhase(PHASES.JOB);
    else showPhase(PHASES.PLAY);
  };

  clanOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      clanOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedClan = opt.dataset.clan;
      localStorage.setItem('selectedClan', selectedClan);
      if (clanMessage) clanMessage.textContent = `Selected Clan: ${selectedClan}`;
      showPhase(PHASES.JOB);
    });
  });

  jobOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      jobOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedJob = opt.dataset.job;
      localStorage.setItem('selectedJob', selectedJob);
      if (jobMessage) {
        jobMessage.textContent = `Selected Job: ${selectedJob}`;
      }
      if (jobWarning) jobWarning.textContent = '';
    });
  });

  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      if (!selectedJob) {
        if (jobWarning) jobWarning.textContent = 'Please select a job.';
        return;
      }
      if (jobWarning) jobWarning.textContent = '';
      jobConfirmed = true;
      localStorage.setItem('jobConfirmed', 'true');
      if (jobMessage) jobMessage.textContent = `Job Confirmed: ${selectedJob}`;
      assignDefaultWeapon(selectedJob);
      showPhase(PHASES.PLAY);
    });
  }

  if (attackBtn) attackBtn.addEventListener('click', attackAction);
  if (defendBtn) defendBtn.addEventListener('click', defendAction);
  if (fireballBtn) fireballBtn.addEventListener('click', castFireballAction);
  if (doubleShotBtn) doubleShotBtn.addEventListener('click', doubleShotAction);
  if (shieldBashBtn) shieldBashBtn.addEventListener('click', shieldBashAction);
  if (healBtn) healBtn.addEventListener('click', healAction);
  if (stunBtn) stunBtn.addEventListener('click', stunningStrikeAction);
  if (strBtn) strBtn.addEventListener('click', () => allocateAttribute('str'));
  if (spdBtn) spdBtn.addEventListener('click', () => allocateAttribute('spd'));
  if (magBtn) magBtn.addEventListener('click', () => allocateAttribute('mag'));

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const username = form.username.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value.trim();

      const error = typeof validateRegistration === 'function'
        ? validateRegistration(username, email, password)
        : '';

      if (error) {
        errorEl.textContent = error;
        return;
      }

      errorEl.textContent = '';
      localStorage.setItem('registered', 'true');
      localStorage.setItem('username', username);
      console.log('Registered:', { username, email });
      showPhase(PHASES.CLAN);
    });
  }

  initPhase();
  updateHeroHUD();
  updateAttributeUI();
  updateEquipmentUI();
  updateSkillButtons();
});

// expose functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    tileSize,
    mapData,
    preload,
    townMapData,
    townPreload,
    townCreate,
    townUpdate,
    create,
    update,
    getHero: () => hero,
    setHero: h => { hero = h; },
    setInputs: (c, w) => { cursors = c; wasd = w; },
    getMonsters: () => monsters,
    setMonsters: m => { monsters = m; },
    heroStats,
    enterBattle,
    attackAction,
    castFireballAction,
    defendAction,
    endBattle,
    handleRewards,
    updateHeroHUD,
    updateAttributeUI,
    allocateAttribute,
    equipWeapon,
    assignDefaultWeapon,
    heroEquipment,
    updateEquipmentUI,
    weaponDamage,
    heroAttackPower,
    fireballDamage,
    animateFireball,
    updateMonsterInfo,
    modifyMonsterResistance,
    setMonsterElement,
    doubleShotAction,
    shieldBashAction,
    healAction,
    stunningStrikeAction,
    skillCooldowns,
    updateSkillButtons,
    decrementCooldowns,
    updateTurnIndicator,
    getTurn: () => turn,
    setTurn: t => { turn = t; },
    getBattleState: () => inBattle,
    setBattleState: b => { inBattle = b; },
    playerRewards,
    checkRespawns,
    monsterSpawns,
    RESPAWN_DELAY,
    ELEMENT_ICONS
  };
}

