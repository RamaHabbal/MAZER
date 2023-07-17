let wallsLayer;
let floorLayer;
let portal;
let ESCtext, scoreText;
let character;
let direction = "down";
let ghost;
let Timertext;
let timestart = 80;
let wallsMap;
let ghostScale;
let mapScale;
let vision;
let rt;

class Scene3 extends Phaser.Scene {
  constructor() {
    super("Gaming");
  }

  create() {
    audio1.stop();
    audio2 = this.sound.add('audio2', { loop: true, autoplay: true});
    audio2.play();

    let TILESIZE = 45;
    const vTiles = 23;
    const hTiles = 23;
    const mapHeight = 11;
    const mapWidth = 11;
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
    this.swapZeros(mazeMap);
    this.renderTiles(x, y, mazeMap, TILESIZE);

    this.cameras.main.setBackgroundColor("#C7671B");
    portal = this.physics.add.sprite(100, 48, "portal");
    ghost = this.physics.add.sprite(0, 0, "ghost");

    wallsLayer.setCollision(1, true);
    character = new Player(this, 10, 50, "character", ghost);
    this.physics.add.collider(wallsLayer, character);

    portal.setPosition(985, 940);
    ghost.setPosition(-10, 0);

    this.physics.world.setBoundsCollision(true, true, true, true);
    character.setCollideWorldBounds(true);

    portal.displayWidth = 70;
    portal.displayHeight = 70;

    portal.setImmovable(true);
    portal.setInteractive();
    portal.setDepth(2);
    ghost.setDepth(2);

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("character", {
        start: 9,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("character", {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("character", {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("character", {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "portalAnimation", // Custom animation key
      frames: this.anims.generateFrameNumbers("portal", { start: 0, end: 2 }),
      frameRate: 5, // Adjust the frame rate as needed
      repeat: -1, // Repeat indefinitely
    });

    portal.anims.play("portalAnimation");

    this.cameras.main.setBounds(0, 0, 1000, 1000);
    this.cameras.main.startFollow(character);
    this.cameras.main.setZoom(1.5);

    if(score == 0) {
      this.cameras.main.setZoom(1);

      Timertext= this.add.text(870, 60,"Timer:" + timestart.toString(),  {fontSize: '25px', color: '#fff'});
      ESCtext = this.add.text(40, 10, "press 'ESC' to leave", {fontSize: '16px', color: '#fff'});
      if (score <=999){
        scoreText = this.add.text(870, 30, "SCORE:"+score.toString(), {fontSize: '25px', color: '#fff'});
      }else{
        scoreText = this.add.text(870, 30, "SCORE:MAX", {fontSize: '25px', color: '#fff'});
      }
    }
    else if (score % 2 == 0 && score % 3 != 0 && score % 4 != 0) {
      this.cameras.main.setZoom(1.75);

      Timertext= this.add.text(650, 250,"Timer:" + timestart.toString(),  {fontSize: '25px', color: '#fff'});
      ESCtext = this.add.text(230, 230, "press 'ESC' to leave", {fontSize: '16px', color: '#fff'});
      if (score <=999){
        scoreText = this.add.text(650, 220, "SCORE:"+score.toString(), {fontSize: '25px', color: '#fff'});
      }else{
        scoreText = this.add.text(650, 220, "SCORE:MAX", {fontSize: '25px', color: '#fff'});
      }
    }
    else {
      this.cameras.main.setZoom(1.5);

      Timertext= this.add.text(700, 200,"Timer:" + timestart.toString(),  {fontSize: '25px', color: '#fff'});
      ESCtext = this.add.text(170, 170, "press 'ESC' to leave", {fontSize: '16px', color: '#fff'});
      if (score <=999){
        scoreText = this.add.text(700, 170, "SCORE:"+score.toString(), {fontSize: '25px', color: '#fff'});
      }else{
        scoreText = this.add.text(700, 170, "SCORE:MAX", {fontSize: '25px', color: '#fff'});
      }
    }
    
    Timertext.setScrollFactor(0,0);
    scoreText.setScrollFactor(0,0);
    ESCtext.setScrollFactor(0,0);
    
    Timertext.setDepth(1);
    scoreText.setDepth(1);
    ESCtext.setDepth(1);

    //timer
    this.triggerTimer = this.time.addEvent({
      callback: this.timerEvent,
      callbackScope: this,
      delay: 1000,
      loop: true,
    });
  }

  timerEvent() {
    Timertext.setText("Timer:" + timestart);
    timestart--;
    if (timestart == 0) {
      this.scene.launch("gameover");
      timestart = 80;
    }
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
    wallsMap = this.make.tilemap({
      data: maze,
      tileWidth: 50,
      tileHeight: 50,
    });

    let wallTile = wallsMap.addTilesetImage("wall");
    wallsLayer = wallsMap.createStaticLayer(0, wallTile, x, y);
    wallsLayer.setDisplaySize(width, height);

    // Floor
    // swaps 0 - 1
    this.swapZeros(maze);
    let floorMap = this.make.tilemap({
      data: maze,
      tileWidth: 50,
      tileHeight: 50,
    });
    let floorTile = floorMap.addTilesetImage("ground");
    floorLayer = floorMap.createDynamicLayer(0, floorTile, x, y);

    floorLayer.setDisplaySize(width, height);

    // Move walls to front
    wallsLayer.setDepth(-1);
    floorLayer.setDepth(-1);

    rt = this.make.renderTexture(
      {
        width,
        height,
      },
      true
    );

    if(score % 4 == 0 && score != 0 && score % 3 != 0) {
      // fill it with black
      rt.fill(0x000000, 1);

      // draw the floorLayer into it
      rt.draw(wallsLayer);
      //rt.draw(floorLayer)

      // set a dark blue tint
      rt.setTint(0x0a2948);

      vision = this.make.image({
        x: 0,
        y: 0,
        key: "circle",
        add: false,
      });
      vision.scale = 2.5;

      rt.mask = new Phaser.Display.Masks.BitmapMask(this, vision);
      rt.mask.invertAlpha = true;

      const circle = this.add.sprite(400, 300, "circle");
      circle.setScale(0);
      this.tweens.add({
        targets: vision,
        scale: 2.2,
        duration: 1000,
        ease: "Linear",
        yoyo: true,
        repeat: -1,
      });
    }
  }

  update() {
    character.update();
    if (vision) {
      vision.x = character.getPlayerX();
      vision.y = character.getPlayerY();
    }

    let menusettings = this.input.keyboard.addKey('Esc');

    if(menusettings.isDown){
      this.scene.launch('settings');
    };

    if(character.body.position.x >= 940 && character.body.position.y >= 900){
      this.scene.start("Gaming");
      score+=1;
      timestart=80;
      audio2.stop();
    }
  }
}