class Ghost extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, character) {
    super(scene, x, y, texture);
    //intialize: ghost = new Ghost(this,x,y,"ghost",character)
    // character.body.x, this.character, this.scene
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.speed = 400;
    this.setScale(0.65);

    scene.anims.create({
      key: 'ghostUp', // Custom animation key
      frames: scene.anims.generateFrameNumbers('ghost', { start: 3, end: 3 }),
      frameRate: 5, // Adjust the frame rate as needed
      repeat: -1, // Repeat indefinitely
    });

    scene.anims.create({
      key: 'ghostDown', // Custom animation key
      frames: scene.anims.generateFrameNumbers('ghost', { start: 0, end: 0 }),
      frameRate: 5, // Adjust the frame rate as needed
      repeat: -1, // Repeat indefinitely
    });

    scene.anims.create({
      key: 'ghostRight', // Custom animation key
      frames: scene.anims.generateFrameNumbers('ghost', { start: 2, end: 2 }),
      frameRate: 5, // Adjust the frame rate as needed
      repeat: -1, // Repeat indefinitely
    });

    scene.anims.create({
      key: 'ghostLeft', // Custom animation key
      frames: scene.anims.generateFrameNumbers('ghost', { start: 1, end: 1 }),
      frameRate: 5, // Adjust the frame rate as needed
      repeat: -1, // Repeat indefinitely
    });
  }

  update() {
    const cursors = this.scene.input.keyboard.createCursorKeys();

    const movement_up = cursors.up.isDown;
    const movement_down = cursors.down.isDown;
    const movement_left = cursors.left.isDown;
    const movement_right = cursors.right.isDown;

    const movement_w = this.scene.input.keyboard.addKey('W').isDown;
    const movement_a = this.scene.input.keyboard.addKey('A').isDown;
    const movement_s = this.scene.input.keyboard.addKey('S').isDown;
    const movement_d = this.scene.input.keyboard.addKey('D').isDown;

    const onePressed =
      movement_up || movement_down || movement_left || movement_right;
    const wasd = movement_w || movement_s || movement_a || movement_d;

    if (movement_up || movement_w) {
      character.anims.play('up', true); // Play 'up' animation
      character.y -= 4;
      direction = 'up';
      ghost.anims.play('ghostUp', true); // Play 'up' animation
      ghost.x = character.body.position.x;
      ghost.y = character.body.position.y + 50;
      if (movementright || movementD) {
        character.anims.play('up', true); // Play 'right' animation
        character.x += 3;
        direction = 'right';
      }
      if (movementleft || movementA) {
        character.anims.play('up', true); // Play 'left' animation
        character.x -= 3;
        direction = 'left';
      }
    } else if (movementdown || movementS) {
      character.anims.play('down', true); // Play 'down' animation
      character.y += 4;
      direction = 'down';
      ghost.anims.play('ghostDown', true); // Play 'up' animation
      ghost.x = character.body.position.x;
      ghost.y = character.body.position.y - 50;
      if (movementright || movementD) {
        character.anims.play('down', true); // Play 'right' animation
        character.x += 3;
        direction = 'right';
        ghost.anims.play('ghostRight', true); // Play 'up' animation
        ghost.x = character.body.position.x - 50;
        ghost.y = character.body.position.y;
      }
      if (movementleft || movementA) {
        character.anims.play('down', true); // Play 'left' animation
        character.x -= 3;
        direction = 'left';
        ghost.anims.play('ghostLeft', true); // Play 'up' animation
        ghost.x = character.body.position.x + 90;
        ghost.y = character.body.position.y;
      }
    } else if (movementleft || movementA) {
      character.anims.play('left', true); // Play 'left' animation
      character.x -= 4;
      direction = 'left';
      ghost.anims.play('ghostLeft', true); // Play 'up' animation
      ghost.x = character.body.position.x + 90;
      ghost.y = character.body.position.y;
    } else if (movementright || movementD) {
      character.anims.play('right', true); // Play 'right' animation
      character.x += 4;
      direction = 'right';
      ghost.anims.play('ghostRight', true); // Play 'up' animation
      ghost.x = character.body.position.x - 50;
      ghost.y = character.body.position.y;
    }
  }
}
