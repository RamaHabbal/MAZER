class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.speed = 200;
    this.setScale(0.65);
    //Animation Frames
    scene.anims.create({
      key: "up",
      frames: scene.anims.generateFrameNumbers(texture, {
        start: 9,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "down",
      frames: scene.anims.generateFrameNumbers(texture, {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "left",
      frames: scene.anims.generateFrameNumbers(texture, {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers(texture, {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

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

  idleDirection(direction) {
    switch (direction) {
      case "up":
        return 10;
      case "down":
        return 1;
      case "left":
        return 3;
      case "right":
        return 7;
    }
  }

  update() {
    let cursors = this.scene.input.keyboard.createCursorKeys();

    let movement_up = cursors.up.isDown;
    let movement_down = cursors.down.isDown;
    let movement_left = cursors.left.isDown;
    let movement_right = cursors.right.isDown;
    let movementW = this.scene.input.keyboard.addKey("W").isDown;
    let movementA = this.scene.input.keyboard.addKey("A").isDown;
    let movementS = this.scene.input.keyboard.addKey("S").isDown;
    let movementD = this.scene.input.keyboard.addKey("D").isDown;

    let up='up', down='down', left='left', right='right';
    let ghostUp='ghostUp', ghostDown='ghostDown', ghostLeft='ghostLeft', ghostRight='ghostRight';
    let directionUp='up', directionDown='down', directionLeft='left', directionRight='right';
    let upY=-this.speed, downY=this.speed, rightX=this.speed, leftX=-this.speed;
    let GupY=80, GdownY=-80, GleftX=80, GrightX=-80;

    if (score % 3 == 0 && score != 0) {
      up = 'down', down = 'up', left = 'right', right = 'left';

      ghostUp = 'ghostDown', ghostDown = 'ghostUp', ghostLeft = 'ghostRight', ghostRight = 'ghostLeft';

      upY = this.speed, downY = -this.speed, rightX = -this.speed, leftX = this.speed;

      directionUp = 'down', directionDown = 'up', directionLeft = 'right', directionRight = 'left';

      GupY = -80, GdownY = 80, GleftX = -80, GrightX = 80;
    }

    if (movement_up || movementW) {
      this.anims.play(up, true); // Play 'up' animation
      this.setVelocity(0, upY);
      direction = directionUp;

      ghost.anims.play(ghostUp, true);
      ghost.x = this.body.position.x;
      ghost.y = this.body.position.y + GupY;

      if (movement_left || movementA) {
        this.anims.play(up, true); // Play 'left' animation
        this.setVelocity(leftX, 0);
        direction = directionLeft;

        ghost.anims.play(ghostLeft, true);
        ghost.x = this.body.position.x + GleftX;
        ghost.y = this.body.position.y;
      }
      if (movement_right || movementD) {
        this.anims.play(up, true); // Play 'right' animation
        this.setVelocity(rightX, 0);
        direction = directionRight;

        ghost.anims.play(ghostRight, true);
        ghost.x = this.body.position.x + GrightX;
        ghost.y = this.body.position.y;
      }
    } else if (movement_down || movementS) {
      this.anims.play(down, true); // Play 'down' animation
      this.setVelocity(0, downY);
      direction = directionDown;

      ghost.anims.play(ghostDown, true);
      ghost.x = this.body.position.x;
      ghost.y = this.body.position.y + GdownY;
      if (movement_left || movementA) {
        this.anims.play(down, true); // Play 'left' animation
        this.setVelocity(leftX, 0);
        direction = directionLeft;

        ghost.anims.play(ghostLeft, true);
        ghost.x = this.body.position.x + GleftX;
        ghost.y = this.body.position.y;
      }
      if (movement_right || movementD) {
        this.anims.play(down, true); // Play 'right' animation
        this.setVelocity(rightX, 0);
        direction = directionRight;

        ghost.anims.play(ghostRight, true);
        ghost.x = this.body.position.x + GrightX;
        ghost.y = this.body.position.y;
      }
    } else if (movement_left || movementA) {
      this.anims.play(left, true); // Play 'left' animation
      this.setVelocity(leftX, 0);
      direction = directionLeft;

      ghost.anims.play(ghostLeft, true);
      ghost.x = this.body.position.x + GleftX;
      ghost.y = this.body.position.y;
    } else if (movement_right || movementD) {
      this.anims.play(right, true); // Play 'right' animation
      this.setVelocity(rightX, 0);
      direction = directionRight;

      ghost.anims.play(ghostRight, true);
      console.log(ghost);
      ghost.x = this.body.position.x + GrightX;
      ghost.y = this.body.position.y;
    } else {
      this.setVelocity(0, 0);
      this.anims.stop(); // Stop the animation
      this.setTexture("character", this.idleDirection(direction)); // Set a specific frame for idle state
    }
  }

  getPlayerX() {
    return this.x;
  }

  getPlayerY() {
    return this.y;
  }
}
