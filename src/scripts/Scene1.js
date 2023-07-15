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
          
    //this.load.audio
    //in other scenes;
    //then this.sound.add
    //this.sound.play();
    //let or var soundconfig={mute volume rate detune seek loop delay}
    //for animations https://www.youtube.com/watch?v=hJ91bkJPdH0&list=PLDyH9Tk5ZdFzEu_izyqgPFtHJJXkc79no&index=13
    //score label :> https://www.youtube.com/watch?v=a17P2A4Bgko&list=PLDyH9Tk5ZdFzEu_izyqgPFtHJJXkc79no&index=12
    //
    }

    create(){
        this.add.text(20,20,"Loading game...");
        this.scene.start("playGame");
       
    }

  



}

