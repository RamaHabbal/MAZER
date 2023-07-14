class Scene1 extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }
    preload(){
        this.load.image("background","./src/assets/images/background.png");
    }
    create(){
        this.add.text(20,20,"Loading game...");
        this.scene.start("playGame");

    }

}