class Scene3 extends Phaser.Scene {
    constructor(){
        super("Gaming");
    }
    create(){
        
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);
        this.add.text(300,140,"GAMING",{
        font:"30px",
        fill:"yellow"
        
        });
        
      
}
    
}