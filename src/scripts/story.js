let string1 =
  "A little girl has to find her way in the dark in a halloween-ish creepy atmosphere. She is in a maze and does not know the path out of it. Some ghosts pop up every now and then. She must not come too close to a ghost, or else it will start following her. The maze is big, she has to discover the only way out of it. ";
  class Story extends Phaser.Scene {
    constructor() {
      super({ key: "story" });
    }
    create() {
      const textStyle = {
        fontSize: "30px",
        color: "#f39c12",


        wordWrap: {
          width: 700, // Adjust the width to control when the text wraps to the next line
        },
      };
  
      let x = this.cameras.main.centerX - 350;
      let y = 150;
      let delay = 20; // Adjust the delay between each letter appearance
  
      for (let i = 0; i < string1.length; i++) {
        const char = string1[i];
        this.time.delayedCall(delay * i, () => {
          this.add.text(x, y, char, textStyle);
          x += 15; // Adjust the horizontal distance between each letter
          if (char === " " && x >= this.cameras.main.centerX + 350) {
            x = this.cameras.main.centerX - 350;
            y += 50; // Adjust the vertical distance for each new line
          }
        }, null, this);
      }
  
      const continue1 = new Button(
        this.cameras.main.centerX,
        600,
        " continue... ",
        this,
        () => {
          this.scene.start("Gaming");
          this.scene.stop();
        }
      );
    }
  }
  
this.config = {
  type: Phaser.AUTO,
  height: 600,
  width: 800,
  scene: [Scene3, Story],
  parent: "Gaming",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 100 },
    },
  },
};

  this.config = {
    type: Phaser.AUTO,
    height: 600,
    width: 800,
    scene: [Scene3, Story],
    parent: 'Gaming',
    physics: {
      default: 'arcade',
      arcade: { 
        gravity: { y: 100 }
      }
    }
  };