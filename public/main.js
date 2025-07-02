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

let square;

function preload() {
  // nothing to preload yet
}

function create() {
  square = this.add.rectangle(400, 300, 50, 50, 0xff0000);
}

function update() {
  // placeholder update loop
}

const game = new Phaser.Game(config);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  const errorEl = document.getElementById('error-message');
  const clanContainer = document.getElementById('clan-selection-container');
  const clanOptions = document.querySelectorAll('.clan-option');
  const clanMessage = document.getElementById('selected-clan-message');
  let selectedClan = localStorage.getItem('selectedClan') || null;

  if (selectedClan) {
    clanOptions.forEach(o => {
      if (o.dataset.clan === selectedClan) {
        o.classList.add('selected');
      }
    });
    if (clanMessage) {
      clanMessage.textContent = `Selected Clan: ${selectedClan}`;
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
    });
  });

  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    let error = '';

    if (!username) {
      error = 'Username is required.';
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      error = 'Username can only contain letters, numbers, and underscores.';
    } else if (!email) {
      error = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      error = 'Enter a valid email address.';
    } else if (!password) {
      error = 'Password is required.';
    } else if (password.length < 8) {
      error = 'Password must be at least 8 characters.';
    }

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

