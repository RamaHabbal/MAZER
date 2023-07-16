class Scene1 extends Phaser.Scene {

    constructor(){
        super("bootGame");
    }

    preload(){
        
        this.load.video('video', './src/assets/images/halloweenbackground.mp4', 'loadeddata', false, true);
        // this.load.image('house', './src/assets/images/house.png');
        
        this.load.image('image', './src/assets/images/logomaze.png');
        this.load.spritesheet('character', './src/assets/images/spritesheet.png', {
              frameWidth: 48,
              frameHeight: 48,
            });

        this.load.image('wall', './src/assets/images/wall.jpeg');
        this.load.image('ground', './src/assets/images/ground.jpeg');
        this.load.audio('audio', './src/assets/music/Peder_B_Helland_Darkness.m4a');
          
    }

    create(){
        this.add.text(20,20,"Loading game...");
        this.scene.start("Menu");
       
    }

  



}

