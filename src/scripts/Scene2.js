class Scene2 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }
    create(){
        
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);
        this.add.text(300,140,"Playing game",{
        font:"30px",
        fill:"yellow"
        
        });
        const button1 = new Button(400, 300, 'Start Game', this, () => this.scene.start("Gaming"));
}
    

}


class Button {
    constructor(x, y, label, scene, callback) {
        const button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
    }
}