class SettingsMenu extends Phaser.Scene {
    constructor() {
      super({ key: 'settings' });
    }
    create() {
      this.add.text(230, 40, 'Back To Menu?', { 
        fontSize: '70px', color: '#00000'
      });
      
      const Yes = new Button(this.cameras.main.centerX-100, 370, ' Yes ', this, () => { this.scene.start("Menu");
      this.scene.stop(); this.scene.stop("Gaming"); });
      const No = new Button(this.cameras.main.centerX+100, 370, ' No ', this, () => this.scene.stop());
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