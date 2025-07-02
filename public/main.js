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

