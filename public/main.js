const tileSize = 32;
const mapData = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

const config = {
  type: Phaser.AUTO,
  width: tileSize * mapData[0].length,
  height: tileSize * mapData.length,
  backgroundColor: '#1d212d',
  scene: {
    preload,
    create,
    update
  }
};

let hero;
let heroStats = { hp: 100, mp: 30, atk: 10, level: 1, exp: 0, defending: false };
let playerRewards = { exp: 0, gold: 0, items: [] };
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
  setTimeout(() => {
    banner.classList.remove('visible');
  }, 800);
}

function updateTurnIndicator() {
  const indicator = document.getElementById('turn-indicator');
  if (indicator) {
    indicator.textContent = turn === 'player' ? 'Player Turn' : 'Enemy Turn';
  }
  showTurnBanner(turn === 'player' ? 'Hero Turn' : 'Monster Turn');
  const attackBtn = document.getElementById('attack-btn');
  const defendBtn = document.getElementById('defend-btn');
  const display = turn === 'player' ? 'inline-block' : 'none';
  if (attackBtn) attackBtn.style.display = display;
  if (defendBtn) defendBtn.style.display = display;
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
  currentMonster = null;
  turn = 'player';
  updateTurnIndicator();
  if (result) setCombatMessage(result);
}

function spawnMonsterAt(spawn, scene) {
  const sprite = scene.add.rectangle(
    spawn.x * tileSize + tileSize / 2,
    spawn.y * tileSize + tileSize / 2,
    tileSize,
    tileSize,
    0x00ff00
  );
  return { sprite, tileX: spawn.x, tileY: spawn.y, stats: { hp: 30, atk: 5 }, spawn };
}

function scheduleRespawn(monster) {
  if (monster.spawn) {
    monster.spawn.nextSpawn = Date.now() + RESPAWN_DELAY;
  }
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
  if (heroEl) heroEl.textContent = `Hero HP: ${heroStats.hp}`;
  if (monsterEl) monsterEl.textContent = `Monster HP: ${monster.stats.hp}`;
  combat.style.display = 'block';
  const msgEl = document.getElementById('combat-message');
  if (msgEl) msgEl.textContent = 'Battle started!';
  updateTurnIndicator();
}

function updateCombatDisplay() {
  const heroEl = document.getElementById('hero-stats');
  const monsterEl = document.getElementById('monster-stats');
  if (heroEl) heroEl.textContent = `Hero HP: ${heroStats.hp}`;
  if (monsterEl && currentMonster) monsterEl.textContent = `Monster HP: ${currentMonster.stats.hp}`;
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
    heroStats.hp += 10;
    heroStats.mp += 5;
    heroStats.atk += 2;
    leveled = true;
  }
  if (leveled) {
    const msgEl = document.getElementById('level-up-message');
    if (msgEl) msgEl.textContent = `Level Up! Level ${heroStats.level}`;
  }
}

function handleRewards() {
  const reward = { exp: 10 };
  playerRewards.exp += reward.exp;
  heroStats.exp += reward.exp;
  const msgEl = document.getElementById('reward-message');
  const container = document.getElementById('reward-container');
  if (msgEl) msgEl.textContent = `Earned ${reward.exp} XP`;
  if (container) {
    container.style.display = 'block';
    setTimeout(() => {
      container.style.display = 'none';
      const lvlMsg = document.getElementById('level-up-message');
      if (lvlMsg) lvlMsg.textContent = '';
    }, 3000);
  }
  checkLevelUp();
}

function showDamage(targetId, amount) {
  const target = document.getElementById(targetId);
  const container = document.getElementById('combat-container');
  if (!target || !container) return;
  const rect = target.getBoundingClientRect();
  const cRect = container.getBoundingClientRect();
  const dmg = document.createElement('div');
  dmg.className = 'damage-number';
  dmg.textContent = `-${amount}`;
  dmg.style.left = `${rect.left - cRect.left + rect.width / 2}px`;
  dmg.style.top = `${rect.top - cRect.top - 10}px`;
  container.appendChild(dmg);
  setTimeout(() => dmg.remove(), 800);
}

function animateAttack(attackerId, targetId, damage) {
  const attacker = document.getElementById(attackerId);
  const target = document.getElementById(targetId);
  if (attacker) {
    const cls = attackerId === 'hero-img' ? 'lunge-left' : 'lunge-right';
    attacker.classList.add('attacking', cls);
  }
  if (target) target.classList.add('damaged');
  if (damage != null) showDamage(targetId, damage);
  setTimeout(() => {
    if (attacker) {
      attacker.classList.remove('attacking', 'lunge-left', 'lunge-right');
    }
    if (target) target.classList.remove('damaged');
  }, 300);
}

function monsterTurn() {
  if (!currentMonster) return '';
  let damage = currentMonster.stats.atk;
  if (heroStats.defending) {
    damage = Math.floor(damage / 2);
    heroStats.defending = false;
  }
  animateAttack('monster-img', 'hero-img', damage);
  heroStats.hp -= damage;
  updateCombatDisplay();
  return `Monster attacks for ${damage}. Hero HP is ${heroStats.hp}.`;
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
  updateTurnIndicator();
  setCombatMessage(attackMsg);
  await delay(1000);

  return attackMsg;
}

async function attackAction() {
  if (!currentMonster || turn !== 'player') return '';
  const attackBtn = document.getElementById('attack-btn');
  const defendBtn = document.getElementById('defend-btn');
  if (attackBtn) attackBtn.style.display = 'none';
  if (defendBtn) defendBtn.style.display = 'none';
  animateAttack('hero-img', 'monster-img', heroStats.atk);
  currentMonster.stats.hp -= heroStats.atk;
  updateCombatDisplay();
  let msg = `Hero attacks! Monster HP is ${currentMonster.stats.hp}.`;
  if (currentMonster.stats.hp <= 0) {
    handleRewards();
    endBattle(msg + ' Monster defeated!');
    return msg + ' Monster defeated!';
  }
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
  return enemyPhase(msg);
}

function preload() {
  // nothing to preload yet
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
  hero = this.add.rectangle(tileSize + tileSize / 2, tileSize + tileSize / 2, tileSize, tileSize, 0xff0000);
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
}

const game = new Phaser.Game(config);

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
      showPhase(PHASES.PLAY);
    });
  }

  if (attackBtn) attackBtn.addEventListener('click', attackAction);
  if (defendBtn) defendBtn.addEventListener('click', defendAction);

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
      console.log('Registered:', { username, email });
      showPhase(PHASES.CLAN);
    });
  }

  initPhase();
});

// expose functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    tileSize,
    mapData,
    preload,
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
    defendAction,
    endBattle,
    handleRewards,
    updateTurnIndicator,
    getTurn: () => turn,
    setTurn: t => { turn = t; },
    getBattleState: () => inBattle,
    setBattleState: b => { inBattle = b; },
    playerRewards,
    checkRespawns,
    monsterSpawns,
    RESPAWN_DELAY
  };
}

