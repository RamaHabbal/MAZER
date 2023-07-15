const config = {
  type: Phaser.AUTO,
  width: 800, // Set the desired width of the game canvas
  height: 600, // Set the desired height of the game canvas
  parent: 'game-container', // The ID of the HTML element to attach the game canvas to
  scene: {
    preload: preload, // Function for preloading game assets
    create: create, // Function for initializing game objects
    update: update, // Function for game logic and updates
  },
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
let wall_1, wall_2, wall_3, wall_4, wall_5, wall_11;
let up_right = 0;
let up_left = 0;
let down_right = 0;
let down_left = 0;

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
  
  this.load.spritesheet('wall_1', './src/assets/images/wall_v.png', {
    frameWidth: 40,
    frameHeight: 150,
  });

  this.load.spritesheet('wall_2', './src/assets/images/wall_h.png', {
    frameWidth: 350,
    frameHeight: 40,
  });
}

function create() {
  this.cameras.main.setBackgroundColor('#0000FF');
  character = this.physics.add.sprite(0, 50, 'character'); 
  wall_1 = this.physics.add.sprite(70, 55, 'wall_1'); 
  wall_2 = this.physics.add.sprite(0, 190, 'wall_2');
  wall_3 = this.physics.add.sprite(155, 115, 'wall_1');
  wall_4 = this.physics.add.sprite(225, 115, 'wall_1');
  wall_11 = this.physics.add.sprite(300, 55, 'wall_1');
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

  character.x += 0;
  
  //this.physics.add.collider(wall_1, character);
  //this.physics.add.collider(wall_1, c);

  //wall_1.setCollideWorldBounds(true);
  //wall_1.setInteractive();

  //this.physics.add.existing(character, true);

  //wall_1.body.allowGravity = false;
  //character.body.allowGravity = false;

  //wall_1.body.immovable = true;
  //character.body.immovable = true;
}

function update() {
  // Update the game state...
  
  let cursors = this.input.keyboard.createCursorKeys();

  console.log("X: " +  character.x);
  //console.log("Y: " +  character.y);

  let allowed_up = true;
  let allowed_down = true;
  let allowed_right = true;
  let allowed_left = true;
  
  if(character.x > 285 && character.x < 339 && character.y < 150) {
    allowed_right = false
  }

  if(character.x > 285 && character.x < 339 && character.y < 155) {
    allowed_up = false
  }

  if(character.x > 285 && character.x < 339 && character.y < 150) {
    allowed_left = false
  }

  if (cursors.up.isDown && cursors.right.isDown) {
    if (up_right % 2 == 0) {
      if (allowed_up) {
        character.anims.play('up', true); // Play 'up' animation
        character.y -= 5;
        direction = 'up';

        up_right++;
      }
    } else {
      if (allowed_right) {
        character.anims.play('right', true); // Play 'right' animation
        character.x += 5;
        direction = 'right';

        up_right++;
      }
    }

    console.log("up_right: " + up_right);
  } else if (cursors.up.isDown && cursors.left.isDown) {
    if (up_left % 2 == 0) {
      if (allowed_up) {
        character.anims.play('up', true); // Play 'up' animation
        character.y -= 5;
        direction = 'up';

        up_left++;
      }
    } else {
      if (allowed_left) {
        character.anims.play('left', true); // Play 'left' animation
        character.x -= 5;
        direction = 'left';

        up_left++;
      }
    }

    console.log("up_left: " + up_left);
  } else if (cursors.down.isDown && cursors.right.isDown) {
    if (down_right % 2 == 0) {
      if (allowed_down) {
        character.anims.play('down', true); // Play 'down' animation
        character.y += 5;
        direction = 'down';

        down_right++;
      }
    } else {
      if (allowed_right) {
        character.anims.play('right', true); // Play 'right' animation
        character.x += 5;
        direction = 'right';

        down_right++;
      }
    }

    console.log("down_right: " + down_right);
  } else if (cursors.down.isDown && cursors.left.isDown) {
    if (down_left % 2 == 0) {
      if (allowed_down) {
        character.anims.play('down', true); // Play 'down' animation
        character.y += 5;
        direction = 'down';

        down_left++;
      }
    } else {
      if (allowed_left) {
        character.anims.play('left', true); // Play 'left' animation
        character.x -= 5;
        direction = 'left';

        down_left++;
      }
    }

    console.log("down_left: " + down_left);
  } else if (cursors.left.isDown) {
      if (allowed_left) {
        character.anims.play('left', true); // Play 'left' animation
        character.x -= 5;
        direction = 'left';
      }
    } else if (cursors.right.isDown) {
      if (allowed_right) {
        character.anims.play('right', true); // Play 'right' animation
        character.x += 5;
        direction = 'right';
      }
    } else if(cursors.up.isDown) {
      if (allowed_up) {
        character.anims.play('up', true); // Play 'up' animation
        character.y -= 5;
        direction = 'up';
      }
    } else if(cursors.down.isDown) {
      if (allowed_down) {
        character.anims.play('down', true); // Play 'down' animation
        character.y += 5;
        direction = 'down';
      }
    } else {
      character.anims.stop(); // Stop the animation
      character.setTexture('character', idleDirection(direction)); // Set a specific frame for idle state
  }
}

const game = new Phaser.Game(config);
