class Scene1 extends Phaser.Scene {
  constructor() {
    super('Scene1');
    this.character;
    this.direction;
  }

  idleDirection() {
    switch (this.direction) {
      case 'up':
        return 10;
      case 'down':
        return 1;
      case 'left':
        return 4;
      case 'right':
        return 7;
    }
  }

  preload() {
    this.load.spritesheet('character', './src/assets/images/spritesheet.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
  }

  create() {
    this.cameras.main.setBackgroundColor('#0000FF');
    this.character = this.physics.add.sprite(48, 48, 'character');
    this.physics.world.setBoundsCollision(true, true, true, true);
    this.character.setCollideWorldBounds(true);

    this.character.setInteractive();

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('character', {
        start: 9,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('character', {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('character', {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('character', {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.character.x += 300;

    // Creates a maze object to make mazes of 10x10 cells
    const maze = new Maze(10, 10);
    // Maze start in position: column 0, row 1
    maze.gateway(0, 1);
    // Maze exit in position: last column, row 7
    maze.gateway(10 - 1, 7);
    // Creates the array of rows of tiles

    let TILESIZE = 32;
    const vTiles = Math.floor(this.game.config.height / TILESIZE - 1);
    const hTiles = Math.floor(this.game.config.width / TILESIZE - 1);
    const x = Math.round((this.game.config.width - TILESIZE * hTiles) / 2);
    const y = Math.round((this.game.config.height - TILESIZE * vTiles) / 2);
    let mazeMap = maze.tiles();

    this.renderTiles(x, y, mazeMap, 32);
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
    console.log(wallsMap);
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

  update() {
    // Update the game state...

    let cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.character.anims.play('left', true); // Play 'left' animation
      this.character.x -= 5;
      this.direction = 'left';
    } else if (cursors.right.isDown) {
      this.character.anims.play('right', true); // Play 'left' animation
      this.character.x += 5;
      this.direction = 'right';
    } else if (cursors.up.isDown) {
      this.character.anims.play('up', true); // Play 'left' animation
      this.character.y -= 5;
      this.direction = 'up';
    } else if (cursors.down.isDown) {
      this.character.anims.play('down', true); // Play 'left' animation
      this.character.y += 5;
      this.direction = 'down';
    } else {
      this.character.anims.stop(); // Stop the animation
      this.character.setTexture('character', this.idleDirection()); // Set a specific frame for idle state
    }
    //winning condition was met{load map 2}
  }
}
