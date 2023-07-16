let wallsLayer;
let floorLayer;
let portal;
let ESCtext, scoreText;
let character;
let direction = 'down';
let ghost;
let Timertext;
let timestart = 14;
let wallsMap;
let ghostScale;
let mapScale;

//  function idleDirection(direction){
//     switch (direction) {
//       case 'up':
//         return 10;
//       case 'down':
//         return 1;
//       case 'left':
//         return 3;
//       case 'right':
//         return 7;

//     }
//   }

class Scene3 extends Phaser.Scene {
  constructor() {
    super('Gaming');
  }

  create() {
    audio1.stop();

    let TILESIZE = 45;
    // const vTiles = Math.floor(this.game.config.height / TILESIZE - 1);
    // const hTiles = Math.floor(this.game.config.width / TILESIZE - 1);
    const vTiles = 23;
    const hTiles = 23;
    // const mapHeight = Math.floor((vTiles - 1) / 2);
    // const mapWidth = Math.floor((hTiles - 1) / 2);
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

    this.cameras.main.setBackgroundColor('#C7671B');
    // character = this.physics.add.sprite(48, 48, 'character');
    portal = this.physics.add.sprite(100, 48, 'portal');
    ghost = this.physics.add.sprite(0, 0, 'ghost');

    wallsLayer.setCollision(1, true);
    character = new Player(this, 10, 50, 'character');
    this.physics.add.collider(wallsLayer, character);

    // character.setPosition(10,50);
    portal.setPosition(985, 940);
    ghost.setPosition(-10, 0);

    this.physics.world.setBoundsCollision(true, true, true, true);
    character.setCollideWorldBounds(true);

    this.cameras.main.setBounds(0, 0, 1000, 1000);
    this.cameras.main.startFollow(character);
    this.cameras.main.setZoom(1.5);

    portal.displayWidth = 70;
    portal.displayHeight = 70;

    portal.setImmovable(true);
    portal.setInteractive();
    portal.setDepth(2);
    ghost.setDepth(2);

    this.anims.create({
      key: 'portalAnimation', // Custom animation key
      frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 2 }),
      frameRate: 5, // Adjust the frame rate as needed
      repeat: -1, // Repeat indefinitely
    });

    this.anims.create({
      key: 'ghostUp', // Custom animation key
      frames: this.anims.generateFrameNumbers('ghost', { start: 3, end: 3 }),
      frameRate: 5, // Adjust the frame rate as needed
      repeat: -1, // Repeat indefinitely
    });

    this.anims.create({
      key: 'ghostDown', // Custom animation key
      frames: this.anims.generateFrameNumbers('ghost', { start: 0, end: 0 }),
      frameRate: 5, // Adjust the frame rate as needed
      repeat: -1, // Repeat indefinitely
    });

    this.anims.create({
      key: 'ghostRight', // Custom animation key
      frames: this.anims.generateFrameNumbers('ghost', { start: 2, end: 2 }),
      frameRate: 5, // Adjust the frame rate as needed
      repeat: -1, // Repeat indefinitely
    });

    this.anims.create({
      key: 'ghostLeft', // Custom animation key
      frames: this.anims.generateFrameNumbers('ghost', { start: 1, end: 1 }),
      frameRate: 5, // Adjust the frame rate as needed
      repeat: -1, // Repeat indefinitely
    });

    portal.anims.play('portalAnimation');

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

    Timertext = this.add.text(700, 200, 'Timer:' + timestart.toString(), {
      fontSize: '25px',
      color: '#fff',
    });
    Timertext.setScrollFactor(0, 0);
    Timertext.setDepth(1);
    ESCtext = this.add.text(170, 170, "press 'ESC' to leave", {
      fontSize: '10px',
      color: '#fff',
    });
    scoreText.setScrollFactor(0, 0);
    ESCtext.setScrollFactor(0, 0);

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
    console.log('timerEvent');

    Timertext.setText('Timer:' + timestart);
    timestart--;
    if (timestart == 0) {
      this.scene.launch('gameover');
      timestart = 14;
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

    let wallTile = wallsMap.addTilesetImage('wall');
    wallsLayer = wallsMap.createStaticLayer(0, wallTile, x, y);
    wallsLayer.setDisplaySize(width, height);

    // Floor
    this.swapZeros(maze);
    let floorMap = this.make.tilemap({
      data: maze,
      tileWidth: 50,
      tileHeight: 50,
    });
    let floorTile = floorMap.addTilesetImage('ground');
    floorLayer = floorMap.createDynamicLayer(0, floorTile, x, y);

    floorLayer.setDisplaySize(width, height);

    // Move walls to front
    wallsLayer.setDepth(-1);
    floorLayer.setDepth(-1);
  }
  update() {
    character.update();
    let menusettings = this.input.keyboard.addKey('Esc');

    if (menusettings.isDown) {
      this.scene.launch('settings');
      this.scene.pause();
    }
    if (character.body.position.x >= 940 && character.body.position.y >= 900) {
      console.log('inside c x: ' + character.x);
      console.log('inside c y: ' + character.y);
      this.scene.start('Gaming');
      score += 1;
      timestart = 14;
    }
    // if (movementup || movementW) {
    //   character.anims.play('up', true); // Play 'up' animation
    //   character.y -= 4;
    //   direction = 'up';

    //   ghost.anims.play('ghostUp', true); // Play 'up' animation

    //   ghost.x = character.body.position.x;
    //   ghost.y = character.body.position.y + 50;
    //   if (movementright || movementD) {
    //     character.anims.play('up', true); // Play 'right' animation
    //     character.x += 3;
    //     direction = 'right';
    //   }
    //   if (movementleft || movementA) {
    //     character.anims.play('up', true); // Play 'left' animation
    //     character.x -= 3;
    //     direction = 'left';
    //   }
    // } else if (movementdown || movementS) {
    //   character.anims.play('down', true); // Play 'down' animation
    //   character.y += 4;
    //   direction = 'down';

    //   ghost.anims.play('ghostDown', true); // Play 'up' animation

    //   ghost.x = character.body.position.x;
    //   ghost.y = character.body.position.y - 50;

    //   if (movementright || movementD) {
    //     character.anims.play('down', true); // Play 'right' animation
    //     character.x += 3;
    //     direction = 'right';

    //     ghost.anims.play('ghostRight', true); // Play 'up' animation

    //     ghost.x = character.body.position.x - 50;
    //     ghost.y = character.body.position.y;
    //   }
    //   if (movementleft || movementA) {
    //     character.anims.play('down', true); // Play 'left' animation
    //     character.x -= 3;
    //     direction = 'left';

    //     ghost.anims.play('ghostLeft', true); // Play 'up' animation

    //     ghost.x = character.body.position.x + 90;
    //     ghost.y = character.body.position.y;
    //   }
    // } else if (movementleft || movementA) {
    //   character.anims.play('left', true); // Play 'left' animation
    //   character.x -= 4;
    //   direction = 'left';

    //   ghost.anims.play('ghostLeft', true); // Play 'up' animation

    //   ghost.x = character.body.position.x + 90;
    //   ghost.y = character.body.position.y;
    // } else if (movementright || movementD) {
    //   character.anims.play('right', true); // Play 'right' animation
    //   character.x += 4;
    //   direction = 'right';

    //   ghost.anims.play('ghostRight', true); // Play 'up' animation

    //   ghost.x = character.body.position.x - 50;
    //   ghost.y = character.body.position.y;
    // }
  }

  //     update() {
  //         // Update the game state...
  //         // let cursors = this.input.keyboard.createCursorKeys();
  //         // let movementup = cursors.up.isDown;
  //         // let movementdown = cursors.down.isDown;
  //         // let movementleft = cursors.left.isDown;
  //         // let movementright = cursors.right.isDown;

  //         let movementW=this.input.keyboard.addKey('W').isDown;
  //         let movementA=this.input.keyboard.addKey('A').isDown;
  //         let movementS=this.input.keyboard.addKey('S').isDown;
  //         let movementD=this.input.keyboard.addKey('D').isDown;

  //     if (movementup || movementW ) {
  //         character.anims.play('up', true); // Play 'up' animation
  //         character.y -= 4;
  //         direction = 'up';

  //         ghost.anims.play('ghostUp', true); // Play 'up' animation

  //         ghost.x = character.body.position.x;
  //         ghost.y = character.body.position.y + 50;
  //     //         if (movementright ||  movementD) {

  //     //             character.anims.play('up', true); // Play 'right' animation
  //     //             character.x += 3;
  //     //             direction = 'right';
  //     //             }
  //     //         if (movementleft ||  movementA) {
  //     //                 character.anims.play('up', true); // Play 'left' animation
  //     //                 character.x -= 3;
  //     //                 direction = 'left';
  //     //             }
  //     //     }
  //     //     else if (movementdown || movementS) {
  //     //       character.anims.play('down', true); // Play 'down' animation
  //     //       character.y += 4;
  //     //       direction = 'down';

  //     //       ghost.anims.play('ghostDown', true); // Play 'up' animation

  //     //       ghost.x = character.body.position.x;
  //     //       ghost.y = character.body.position.y - 50;

  //     //     //   if (movementright || movementD) {
  //     //     //     character.anims.play('down', true); // Play 'right' animation
  //     //     //     character.x += 3;
  //     //     //     direction = 'right';

  //     //     //     ghost.anims.play('ghostRight', true); // Play 'up' animation

  //     //     //     ghost.x = character.body.position.x - 50;
  //     //     //     ghost.y = character.body.position.y;
  //     //     //   }
  //     //     //   if (movementleft || movementA) {
  //     //     //     character.anims.play('down', true); // Play 'left' animation
  //     //     //     character.x -= 3;
  //     //     //     direction = 'left';

  //     //     //     ghost.anims.play('ghostLeft', true); // Play 'up' animation

  //     //     //     ghost.x = character.body.position.x + 90;
  //     //     //     ghost.y = character.body.position.y;
  //     //     //   }
  //     //     // }
  //     //     // else if (movementleft || movementA) {
  //     //     //   character.anims.play('left', true); // Play 'left' animation
  //     //     //   character.x -= 4;
  //     //     //   direction = 'left';

  //     //     //   ghost.anims.play('ghostLeft', true); // Play 'up' animation

  //     //     //   ghost.x = character.body.position.x + 90;
  //     //     //   ghost.y = character.body.position.y;
  //     //     // }
  //     //     // else if (movementright || movementD) {
  //     //     //   character.anims.play('right', true); // Play 'right' animation
  //     //     //   character.x += 4;
  //     //     //   direction = 'right';

  //     //     //   ghost.anims.play('ghostRight', true); // Play 'up' animation

  //     //     //   ghost.x = character.body.position.x - 50;
  //     //     //   ghost.y = character.body.position.y;
  //     //     // }
  //     //     // else {
  //     //     // character.anims.stop(); // Stop the animation
  //     //     // character.setTexture('character', idleDirection(direction)); // Set a specific frame for idle state
  //     //     // }
  //     //     //winning condition was met{load map 2}
  //     // }
}
