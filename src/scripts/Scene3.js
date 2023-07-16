let wallsLayer;
let floorLayer;
let house;
let ESCtext, scoreText;
let character;
let direction = 'down';

let player;
class Scene3 extends Phaser.Scene {
  constructor() {
    super('Gaming');
  }

  create() {
    player = new Player(this, 50, 50, 'character');

    // audio1.stop();
    let TILESIZE = 45;
    const vTiles = Math.floor(this.game.config.height / TILESIZE - 1);
    const hTiles = Math.floor(this.game.config.width / TILESIZE - 1);
    // const vTiles = 18;
    // const hTiles = 24;
    const mapHeight = Math.floor((vTiles - 1) / 2);
    const mapWidth = Math.floor((hTiles - 1) / 2);
    // const mapHeight = 10;
    // const mapWidth = 10;
    // Creates a maze object to make mazes of 10x10 cells
    const maze = new Maze(mapHeight, mapWidth);
    // Maze start in position: column 0, row 1
    maze.gateway(0, 0);
    // Maze exit in position: last column, row 7
    maze.gateway(mapWidth - 1, mapHeight - 1);
    // Creates the array of rows of tiles
    let mazeMap = maze.tiles();

    const x = Math.round((this.game.config.width - TILESIZE * hTiles) / 2);
    const y = Math.round((this.game.config.height - TILESIZE * vTiles) / 2);

    this.renderTiles(x, y, mazeMap, TILESIZE);

    this.cameras.main.setBackgroundColor('#C7671B');

    this.cameras.main.setBounds(0, 0, 800, 600);
    this.cameras.main.startFollow(player);
    this.cameras.main.setZoom(0.5);

    if (score <= 999) {
      scoreText = this.add.text(700, 170, 'SCORE:' + score.toString(), {
        fontSize: '25px',
        color: '#fff',
      });
    } else {
      scoreText = this.add.text(700, 170, 'SCORE:MAX', {
        fontSize: '25px',
        color: '#fff',
      });
    }

    ESCtext = this.add.text(170, 170, "press 'ESC' to leave", {
      fontSize: '10px',
      color: '#fff',
    });
    scoreText.setScrollFactor(0, 0);
    ESCtext.setScrollFactor(0, 0);

    scoreText.setDepth(1);
    ESCtext.setDepth(1);
  }

  swapZeros(arr) {
    arr.forEach((row, i) => {
      row.forEach((v, i, a) => {
        a[i] = a[i] ? 0 : 1;
      });
    });
  }
  renderTiles(x, y, maze, tilesize) {
    const width = tilesize * maze[0].length;
    const height = tilesize * maze.length;

    // Walls
    let wallsMap = this.make.tilemap({
      data: maze,
      tileWidth: 50,
      tileHeight: 50,
    });

    let wallTile = wallsMap.addTilesetImage('wall');
    wallsLayer = wallsMap.createStaticLayer(0, wallTile, 400, 400);
    wallsLayer.setDisplaySize(width, height);

    // Floor
    this.swapZeros(maze); // swaps 0 - 1
    let floorMap = this.make.tilemap({
      data: maze,
      tileWidth: 50,
      tileHeight: 50,
    });
    let floorTile = floorMap.addTilesetImage('ground');
    floorLayer = floorMap.createDynamicLayer(0, floorTile, 400, 400);

    floorLayer.setDisplaySize(width, height);
    wallsLayer.setDepth(-1);
    floorLayer.setDepth(-1);
  }

  update() {
    // Update the game state...
    player.update();
    let menusettings = this.input.keyboard.addKey('Esc');
    if (menusettings.isDown) {
      this.scene.launch('settings');
      //this is to pause character
      //this.scene.pause();
    }
  }
}
