class Ghost extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);
    this.speed = 400;
    this.setScale(0.65);
    //Animation Frames
    scene.anims.create({
      key: "ghostUp", // Custom animation key
      frames: this.anims.generateFrameNumbers("ghost", { start: 3, end: 3 }),
      frameRate: 5, // Adjust the frame rate as needed
      repeat: -1, // Repeat indefinitely
    });

    scene.anims.create({
      key: "ghostDown", // Custom animation key
      frames: this.anims.generateFrameNumbers("ghost", { start: 0, end: 0 }),
      frameRate: 5, // Adjust the frame rate as needed
      repeat: -1, // Repeat indefinitely
    });

    scene.anims.create({
      key: "ghostRight", // Custom animation key
      frames: this.anims.generateFrameNumbers("ghost", { start: 2, end: 2 }),
      frameRate: 5, // Adjust the frame rate as needed
      repeat: -1, // Repeat indefinitely
    });

    scene.anims.create({
      key: "ghostLeft", // Custom animation key
      frames: this.anims.generateFrameNumbers("ghost", { start: 1, end: 1 }),
      frameRate: 5, // Adjust the frame rate as needed
      repeat: -1, // Repeat indefinitely
    });
  }
}