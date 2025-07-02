const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
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
  hero = this.add.rectangle(400, 300, 40, 40, 0xff0000);
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
  if (cursors.left.isDown || wasd.left.isDown) hero.x -= speed * delta;
  if (cursors.right.isDown || wasd.right.isDown) hero.x += speed * delta;
  if (cursors.up.isDown || wasd.up.isDown) hero.y -= speed * delta;
  if (cursors.down.isDown || wasd.down.isDown) hero.y += speed * delta;
  const width = this.sys.game.config.width;
  const height = this.sys.game.config.height;
  const halfW = hero.width / 2;
  const halfH = hero.height / 2;
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
  let selectedClan = localStorage.getItem('selectedClan') || null;
  const jobContainer = document.getElementById('job-selection-container');
  const jobOptions = document.querySelectorAll('.job-option');
  const jobMessage = document.getElementById('selected-job-message');
  const jobWarning = document.getElementById('job-warning');
  const continueBtn = document.getElementById('job-continue');
  let selectedJob = localStorage.getItem('selectedJob') || null;

  if (selectedClan) {
    clanOptions.forEach(o => {
      if (o.dataset.clan === selectedClan) {
        o.classList.add('selected');
      }
    });
    if (clanMessage) {
      clanMessage.textContent = `Selected Clan: ${selectedClan}`;
    }
    if (jobContainer) {
      clanContainer.style.display = 'none';
      jobContainer.style.display = 'block';
    }
  }

  if (selectedJob) {
    jobOptions.forEach(o => {
      if (o.dataset.job === selectedJob) {
        o.classList.add('selected');
      }
    });
    if (jobMessage) {
      jobMessage.textContent = `Selected Job: ${selectedJob}`;
    }
  }

  clanOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      clanOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedClan = opt.dataset.clan;
      localStorage.setItem('selectedClan', selectedClan);
      if (clanMessage) {
        clanMessage.textContent = `Selected Clan: ${selectedClan}`;
      }
      if (jobContainer) {
        clanContainer.style.display = 'none';
        jobContainer.style.display = 'block';
      }
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
      if (jobMessage) jobMessage.textContent = `Job Confirmed: ${selectedJob}`;
    });
  }

  if (!form) return;
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
    console.log('Registered:', { username, email });
    document.getElementById('registration-container').style.display = 'none';
    if (clanContainer) {
      clanContainer.style.display = 'block';
    }
  });
});

