const tileSize = 32;
const mapData = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0],
  [0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0],
  [0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
  [0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0],
  [0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0],
  [0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0],
  [0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
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
let cursors;
let wasd;

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
  cursors = this.input.keyboard.createCursorKeys();
  wasd = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });
}

function update() {
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
    setInputs: (c, w) => { cursors = c; wasd = w; }
  };
}

