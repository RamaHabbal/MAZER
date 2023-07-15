//store data in cookies call them by function name on any page 
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  







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
        
        
        const startgame = new Button(555, 370, 'Start Game', this, () => this.scene.start("Gaming"));
       
        
        
           
}}



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



    