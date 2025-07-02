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
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!username || !email || !password) {
      alert('All fields are required.');
      return;
    }

    console.log('Registered:', { username, email });
    document.getElementById('registration-container').style.display = 'none';
  });
});

