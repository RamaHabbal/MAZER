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





////////////////////
///////////////////
function renderTiles(x, y, maze, tilesize) {
  const width = tilesize * maze[0].length;
  const height = tilesize * maze.length;

  // Walls
  let wallsMap = this.make.tilemap({
    data: maze,
    tileWidth: 50,
    tileHeight: 50,
  });
  let wallTile = wallsMap.addTilesetImage('wall');
  let wallsLayer = wallsMap.createStaticLayer(0, wallTile, x, y);
  wallsLayer.setDisplaySize(width, height);

  // Floor
  this.swapZeros(maze); // swaps 0 - 1
  let map = this.make.tilemap({ data: maze, tileWidth: 50, tileHeight: 50 });
  let floorTile = map.addTilesetImage('floor');
  let floorLayer = map.createDynamicLayer(0, floorTile, x, y);
  floorLayer.setDisplaySize(width, height);

  // Shadows
  const offset = 0.2 * tilesize;
  let rt = this.add.renderTexture(x + offset, y + offset, width, height);
  rt.draw(wallsLayer, 0, 0);
  rt.setAlpha(0.4);
  rt.setTint(0);

  // Move walls to front
  wallsLayer.setDepth(rt.depth + 1);

  // Renders solution
  this.renderSolution(map);
}


class Scene2 extends Phaser.Scene {
    constructor(){
        super("Menu");
    }

    create(){
        
        let video1=this.add.video(0, 0, 'video').setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
        video1.scale = 0.6;
        video1.play(true,0,15); 
        
        const audio = this.sound.add('audio', { loop: true, autoplay: true});
        audio.play();
        console.log(this.sound.locked)
       
        let text1=this.add.text(0,0,"MAZER",{
        font:"150px",
        fill:"white"
        
        }).setOrigin(-0.5,0);
        
        
        const startgame = new Button(this.cameras.main.centerX, 370, 'Start Game', this, () => this.scene.start("Gaming"));           
}}



class Button {
    constructor(x, y, label, scene, callback) {
        const button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(20)
            .setStyle({ backgroundColor: '#111', font:'35px', margin:'0px' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
    }
}