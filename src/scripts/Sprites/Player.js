class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, ghost) {
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

    if (movement_up || movementW) {
      this.anims.play("up", true); // Play 'up' animation
      this.setVelocity(0, -this.speed);
      direction = "up";

      ghost.anims.play("ghostUp", true);
      ghost.x = this.body.position.x;
      ghost.y = this.body.position.y + 80;

      if (movement_left || movementA) {
        this.anims.play("up", true); // Play 'left' animation
        this.setVelocity(-this.speed, 0);
        direction = "left";

        ghost.anims.play("ghostLeft", true);
        ghost.x = this.body.position.x + 80;
        ghost.y = this.body.position.y;
      }
      if (movement_right || movementD) {
        this.anims.play("up", true); // Play 'right' animation
        this.setVelocity(this.speed, 0);
        direction = "right";

        ghost.anims.play("ghostRight", true);
        ghost.x = this.body.position.x - 80;
        ghost.y = this.body.position.y;
      }
    } else if (movement_down || movementS) {
      this.anims.play("down", true); // Play 'down' animation
      this.setVelocity(0, this.speed);
      direction = "down";

      ghost.anims.play("ghostDown", true);
      ghost.x = this.body.position.x;
      ghost.y = this.body.position.y - 80;
      if (movement_left || movementA) {
        this.anims.play("down", true); // Play 'left' animation
        this.setVelocity(-this.speed, 0);
        direction = "left";

        ghost.anims.play("ghostLeft", true);
        ghost.x = this.body.position.x + 80;
        ghost.y = this.body.position.y;
      }
      if (movement_right || movementD) {
        this.anims.play("down", true); // Play 'right' animation
        this.setVelocity(this.speed, 0);
        direction = "right";

        ghost.anims.play("ghostRight", true);
        ghost.x = this.body.position.x - 80;
        ghost.y = this.body.position.y;
      }
    } else if (movement_left || movementA) {
      this.anims.play("left", true); // Play 'left' animation
      this.setVelocity(-this.speed, 0);
      direction = "left";

      ghost.anims.play("ghostLeft", true);
      ghost.x = this.body.position.x + 80;
      ghost.y = this.body.position.y;
    } else if (movement_right || movementD) {
      this.anims.play("right", true); // Play 'right' animation
      this.setVelocity(this.speed, 0);
      direction = "right";

      ghost.anims.play("ghostRight", true);
      console.log(ghost);
      ghost.x = this.body.position.x - 80;
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
