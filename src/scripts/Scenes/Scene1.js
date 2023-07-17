class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.video(
      "video",
      "./src/assets/images/halloweenbackground.mp4",
      "loadeddata",
      false,
      true
    );

    this.load.image("image", "./src/assets/images/logomaze.png");
    this.load.spritesheet("character", "./src/assets/images/spritesheet.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.spritesheet("portal", "./src/assets/images/newportal.png", {
      frameWidth: 50,
      frameHeight: 50,
    });

    this.load.spritesheet("ghost", "./src/assets/images/ghosts.png", {
      frameWidth: 41,
      frameHeight: 48,
    });

    this.load.image("wall", "./src/assets/images/wall.jpeg");
    this.load.image("ground", "./src/assets/images/ground.jpeg");
    this.load.audio("audio", "./src/assets/music/Peder_B_Helland_Darkness.m4a");
    this.load.audio("audio2", "./src/assets/music/Sadly_Go_Round.m4a");

    //circle object for Fog-of-War effect
    const graphics = this.make.graphics();
    const radius = 50;
    const maxAlpha = 0.5;
    const alphaStep = (maxAlpha / radius) * 2.5;
    graphics.fillStyle(0xffffff, maxAlpha);
    for (let r = radius; r >= 0; r -= 5) {
      graphics.fillCircle(radius, radius, r);
      graphics.fillStyle(0xffffff, Math.max(maxAlpha - (r / 2) * alphaStep, 0));
    }
    graphics.generateTexture("circle", radius * 2, radius * 2);
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("Menu");
  }
}