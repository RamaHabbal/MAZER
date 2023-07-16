class GameOver extends Phaser.Scene {
    constructor() {
      super({ key: 'gameover' });
    }
    create() {
        this.scene.stop("Gaming");
      this.add.text(this.cameras.main.centerX-200, 200, 'GAME OVER', { 
        fontSize: '70px', color: '#fff'
      });
      this.add.text(this.cameras.main.centerX-130, 300, 'SCORE:'+ score.toString(), { 
        fontSize: '60px', color: '#fff'
      });
      this.add.text(this.cameras.main.centerX-100, 400, ' HIGHEST:'+ score.toString(), { 
        fontSize: '30px', color: '#fff'
      });
      
    const playagain = new Button(this.cameras.main.centerX, 500, ' Play Again ', this, () => { this.scene.stop(); this.scene.start("Gaming");
    });
    const gotomenu = new Button(this.cameras.main.centerX, 600, ' Menu ', this, () =>{ this.scene.start("Menu");
    this.scene.stop(); this.scene.stop("Gaming"); });
    //   Phaser.Display.Align.In.Center(musicText, musicButton);
    }
  }
  this.config = {
    type: Phaser.AUTO,
    height: 600,
    width: 800,
    scene: [Scene3, SettingsMenu],
    parent: 'Gaming',
    physics: {
      default: 'arcade',
      arcade: { 
        gravity: { y: 100 }
      }
    }
  };