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

let audio1;
let audio2;
let score=0;
let highestscore;
console.log(getCookie("highestscore"));
if (getCookie("highestscore")){
  highestscore=getCookie("highestscore");
}else{
  highestscore=score;
}

class Scene2 extends Phaser.Scene {
    constructor(){
        super("Menu");
    }
    create(){
      audio1 = this.sound.add('audio', { loop: true, autoplay: true});
      audio1.play();
      let video1=this.add.video(0, 0, 'video').setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
      video1.scale = 0.75;
      video1.play(true,0,15);   
       
      this.add.image(500,100,'image', './src/assets/images/logomaze.png').setDisplaySize(400,150);
        
      this.add.text(10,250, ' HIGHEST SCORE', { 
        color: 'black', font: '40px bolder',
      }).setOrigin(-1,0.5);
      this.add.text(this.cameras.main.centerX-10, 300, highestscore.toString(), { 
        font: '50px bolder', color: 'black'
      });
      const startgame = new Button(this.cameras.main.centerX+5, 400, 'Start Game', this, () => this.scene.start("story"));
    }
  }

class Button {
    constructor(x, y, label, scene, callback) {
        let button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(20)
            .setStyle({ backgroundColor: '#111', font:'35px', margin:'0px' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
    }
}