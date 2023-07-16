class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.speed = 100;

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
    let cursors = this.scene.input.keyboard.createCursorKeys();

    let movement_up = cursors.up.isDown;
    let movement_down = cursors.down.isDown;
    let movement_left = cursors.left.isDown;
    let movement_right = cursors.right.isDown;
    const onePressed =
      movement_up || movement_down || movement_left || movement_right;
    if (onePressed) {
      if (movement_up) {
        this.anims.play('up', true); // Play 'up' animation
        this.setVelocity(0, -100);
        direction = 'up';
      } else if (movement_left) {
        this.anims.play('left', true); // Play 'left' animation
        this.setVelocity(-100, 0);
        direction = 'left';
      } else if (movement_right) {
        this.anims.play('right', true); // Play 'right' animation
        this.setVelocity(100, 0);
        direction = 'right';
      } else if (movement_down) {
        this.anims.play('down', true); // Play 'down' animation
        this.setVelocity(0, 100);
        direction = 'down';
      }
    } else {
      this.setVelocity(0, 0);
      this.anims.stop(); // Stop the animation
      this.setTexture('character', this.idleDirection(direction)); // Set a specific frame for idle state
    }
  }
}
