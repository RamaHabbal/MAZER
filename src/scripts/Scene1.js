class Scene1 extends Phaser.Scene {

    constructor(){
        super("bootGame");
    }

    preload(){
        
        this.load.video('video', './src/assets/images/halloweenbackground.mp4', 'loadeddata', false, true);

        this.load.spritesheet('character', './src/assets/images/spritesheet.png', {
              frameWidth: 48,
              frameHeight: 48,
            });
          
    }

    create(){
        this.add.text(20,20,"Loading game...");
        this.scene.start("playGame");
       
    }

  



}

