
class Scene2 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }
    create(){
        
        let video1=this.add.video(550, 260, 'video');
        video1.play(true,0,15);   
       
        let text1=this.add.text(340,30,"MAZER",{
        font:"150px",
        fill:"white"
        
        });
        
        // const levels= new Button(400, 300, 'Start Game', this, () => creatediv());
        const startgame = new Button(555, 370, 'Start Game', this, () => this.scene.start("Gaming"));


           
}


 
}


class Button {
    constructor(x, y, label, scene, callback) {
        const button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(20)
            .setStyle({ backgroundColor: '#111', font:'35px' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
    }
}



    