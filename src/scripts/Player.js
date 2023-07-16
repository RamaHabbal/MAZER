class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.speed = 400;
    this.setScale(0.65);
    //Animation Frames
    scene.anims.create({
      key: 'up',
      frames: scene.anims.generateFrameNumbers(texture, {
        start: 9,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: 'down',
      frames: scene.anims.generateFrameNumbers(texture, {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: 'left',
      frames: scene.anims.generateFrameNumbers(texture, {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNumbers(texture, {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  idleDirection(direction) {
    switch (direction) {
      case 'up':
        return 10;
      case 'down':
        return 1;
      case 'left':
        return 3;
      case 'right':
        return 7;
    }
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

    if (onePressed || wasd) {
      if (movement_up || movement_w) {
        this.anims.play('up', true); // Play 'up' animation
        this.setVelocity(0, -this.speed);
        direction = 'up';
      } else if (movement_left || movement_a) {
        this.anims.play('left', true); // Play 'left' animation
        this.setVelocity(-this.speed, 0);
        direction = 'left';
      } else if (movement_right || movement_d) {
        this.anims.play('right', true); // Play 'right' animation
        this.setVelocity(this.speed, 0);
        direction = 'right';
      } else if (movement_down || movement_s) {
        this.anims.play('down', true); // Play 'down' animation
        this.setVelocity(0, this.speed);
        direction = 'down';
      }
    } else {
      this.setVelocity(0, 0);
      this.anims.stop(); // Stop the animation
      this.setTexture('character', this.idleDirection(direction)); // Set a specific frame for idle state
    }
  }
}
