window.onload=function(){


let config = {
  type: Phaser.AUTO,
  width: 1000, // Set the desired width of the game canvas
  height: 1000, // Set the desired height of the game canvas
  parent: 'game-container', // The ID of the HTML element to attach the game canvas to
  //begin: scaling for game

  scale:{
    parent:'game-container',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom:1,
  },

  //end: scaling for game

  scene: [Scene1, Scene2,Scene3,SettingsMenu,GameOver,Story],
  physics: {
    default: 'arcade', // Set the default physics system to Arcade Physics
    arcade: {
      // Configure the Arcade Physics settings
      gravity: { y: 0 }, // Disable gravity for a top-down maze game
      debug: false, // Set to true for debugging collision boundaries
    },
  },
};
let character;
let direction;

function idleDirection(direction) {
  switch (direction) {
    case 'up':
      return 10;
    case 'down':
      return 1;
    case 'left':
      return 4;
    case 'right':
      return 7;
  }
}

function preload() {
  this.load.spritesheet('character', './src/assets/images/spritesheet.png', {
    frameWidth: 48,
    frameHeight: 48,
  });
}

function create() {
  this.cameras.main.setBackgroundColor('#0000FF');
  character = this.physics.add.sprite(48, 48, 'character');
  this.physics.world.setBoundsCollision(true, true, true, true);
  character.setCollideWorldBounds(true);

  character.setInteractive();

  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('character', { start: 9, end: 11 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('character', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('character', { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('character', { start: 6, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  character.x += 300;
}

function update() {
  // Update the game state...

  let cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) {
    character.anims.play('left', true); // Play 'left' animation
    character.x -= 5;
    direction = 'left';
  }
  if (cursors.right.isDown) {
    character.anims.play('right', true); // Play 'left' animation
    character.x += 5;
    direction = 'right';
  }
  if (cursors.up.isDown) {
    character.anims.play('up', true); // Play 'left' animation
    character.y -= 5;
    direction = 'up';
  }
  if (cursors.down.isDown) {
    console.log(character.anims);
    character.anims.play('down', true); // Play 'left' animation
    character.y += 5;
    direction = 'down';
  } else {
    character.anims.stop(); // Stop the animation
    character.setTexture('character', idleDirection(direction)); // Set a specific frame for idle state
  }
  //winning condition was met{load map 2}
}

const game = new Phaser.Game(config);
}
