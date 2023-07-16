let string1 = 'A little girl has to find her way in the dark in a halloween-ish creepy atmosphere. She is in a maze and does not know the path out of it. Some ghosts pop up every now and then. She must not come too close to a ghost, or else it will start following her. The maze is big, she has to discover the only way out of it. ';
class Story extends Phaser.Scene {
    constructor() {
      super({ key: 'story' });
    }
    create() {
        // this.scene.stop("Gaming");
      this.add.text(this.cameras.main.centerX-200, 200, string1,  { 
        fontSize: '70px', color: '#fff'
      });
    //   this.add.text(this.cameras.main.centerX-130, 300, 'SCORE:'+ score.toString(), { 
    //     fontSize: '60px', color: '#fff'
    //   });
    //   this.add.text(this.cameras.main.centerX-100, 400, ' HIGHEST:'+ score.toString(), { 
    //     fontSize: '30px', color: '#fff'
    //   });
      
    // const playagain = new Button(this.cameras.main.centerX, 500, ' Play Again ', this, () => { this.scene.stop(); this.scene.start("Gaming");
    // });
    const continue1 = new Button(this.cameras.main.centerX, 600, ' continue... ', this, () =>{ this.scene.start("Gaming");
    this.scene.stop();  });
    //   Phaser.Display.Align.In.Center(musicText, musicButton);
    }
  }
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