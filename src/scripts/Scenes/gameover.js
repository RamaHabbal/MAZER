class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "gameover" });
  }
  create() {
    if (highestscore <= score) {
      highestscore = score;
      setCookie("highestscore", highestscore, 10);
    }

    this.scene.stop("Gaming");
    this.scene.stop("Gaming2");
    this.scene.stop("settings");
    this.add.text(this.cameras.main.centerX - 200, 200, "GAME OVER", {
      fontSize: "70px",
      color: "#fff",
    });
    this.add.text(
      this.cameras.main.centerX - 130,
      300,
      "SCORE:" + score.toString(),
      {
        fontSize: "60px",
        color: "#fff",
      }
    );
    this.add.text(
      this.cameras.main.centerX - 100,
      400,
      " HIGHEST:" + highestscore.toString(),
      {
        fontSize: "30px",
        color: "#fff",
      }
    );

    const playagain = new Button(
      this.cameras.main.centerX,
      500,
      " Play Again ",
      this,
      () => {
        audio2.stop();
        this.scene.stop();
        this.scene.start("Gaming");
      }
    );
    const gotomenu = new Button(
      this.cameras.main.centerX,
      600,
      " Menu ",
      this,
      () => {
        audio2.stop();
        this.scene.start("Menu");
        this.scene.stop();
        this.scene.stop("Gaming");
      }
    );
    score = 0;
  }
}

this.config = {
  type: Phaser.AUTO,
  height: 600,
  width: 800,
  scene: [Scene3, SettingsMenu],
  parent: "Gaming",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 100 },
    },
  },
};
