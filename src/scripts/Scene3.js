let character;
let direction='down';

 function idleDirection(direction){
    switch (direction) {
      case 'up':
        return 10;
      case 'down':
        return 1;
      case 'left':
        return 3;
      case 'right':
        return 7;
        
    }
  }
  
class Scene3 extends Phaser.Scene {
  constructor(){
    super("Gaming");
  }
      
  create(){
    let TILESIZE = 45;
    // const vTiles = Math.floor(this.game.config.height / TILESIZE - 1);
    // const hTiles = Math.floor(this.game.config.width / TILESIZE - 1);
    const vTiles = 13;
    const hTiles = 11;
    // const mapHeight = Math.floor((vTiles - 1) / 2);
    // const mapWidth = Math.floor((hTiles - 1) / 2);
    const mapHeight = 6;
    const mapWidth = 6;
    // Creates a maze object to make mazes of 10x10 cells
    const maze = new Maze(mapHeight, mapWidth);
    // Maze start in position: column 0, row 1
    maze.gateway(0, 0);
    // Maze exit in position: last column, row 7
    maze.gateway(mapWidth - 1, mapHeight-1);
    // Creates the array of rows of tiles
    let mazeMap = maze.tiles();
    
    const x = Math.round((this.game.config.width - TILESIZE * hTiles) / 2);
    const y = Math.round((this.game.config.height - TILESIZE * vTiles) / 2);
    
    this.renderTiles(x, y, mazeMap, TILESIZE);

    this.cameras.main.setBounds(0,0,860,640);
    this.cameras.main.startFollow(character);
    this.cameras.main.setZoom(1.3);
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
    
    console.log(wallsMap);
    
    let wallTile = wallsMap.addTilesetImage('wall');
    let wallsLayer = wallsMap.createStaticLayer(0, wallTile, x, y);
    wallsLayer.setDisplaySize(width, height);

    //for loop to add collision to each wall block --to do here
  
    // Create a group for the walls
    this.wallsGroup = this.physics.add.staticGroup();
    this.wallsGroup.add(wallsLayer); // Add the wallsLayer to the group

    // Add collision between the character and the walls group
    //this.physics.add.collider(character, this.wallsGroup);

    // Floor
    this.swapZeros(maze); // swaps 0 - 1
    let floorMap = this.make.tilemap({
      data: maze,
      tileWidth: 50,
      tileHeight: 50,
    });
    
    let floorTile = floorMap.addTilesetImage('ground');
    let floorLayer = floorMap.createDynamicLayer(0, floorTile, x, y);
  
    floorLayer.setDisplaySize(width, height);
  
    // Shadows
    const offset = 0.2 * tilesize;
    let rt = this.add.renderTexture(x + offset, y + offset, width, height);
    rt.draw(wallsLayer, 0, 0);
    rt.setAlpha(0.4);
    rt.setTint(0);
  
    // Move walls to front
    wallsLayer.setDepth(rt.depth + 1);
  
    this.cameras.main.setBackgroundColor('#C7671B');
    character = this.physics.add.sprite(48, 48, 'character');
    character.setPosition(-150,90);
    this.physics.world.setBoundsCollision(true, true, true, true);
    character.setCollideWorldBounds(true);

    character.setInteractive();

    // Add collision between the character and the walls layer
    //this.physics.add.collider(character, wallsLayer);
    //wallTile.setImmovable(true);
    character.setImmovable(true);

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('character', { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
    
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('character', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });
    
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('character', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('character', { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    character.x += 300;
    const menu = new Button(70, 40, 'Menu', this, () => this.scene.start("Menu"));
    
    // this.physics.add.collider(this.character,wallsLayer);
    // SetCollisionByProperty(properties, collides, recalculateFaces, layer)
    //this.physics.add.collider(this.projectiles,this.powerUps)
    //projectile.destroy();
    //overlap

    // Add an event listener for the escape key to open the menu
    //this.input.keyboard.on('keydown-ESC', this.openMenu, this);

    // Create and add the Menu scene to the game
    //this.scene.add("Menu", Menu);
  }

  // openMenu() {
  //   this.scene.pause("Scene3");
  //   this.scene.run("Menu");
  // }

  update() {
    // Update the game state...
    let cursors = this.input.keyboard.createCursorKeys();
    let movementup = cursors.up.isDown;
    let movementdown = cursors.down.isDown;
    let movementleft = cursors.left.isDown;
    let movementright = cursors.right.isDown;
            
    if (movementup) {
      character.anims.play('up', true); // Play 'up' animation
      character.y -= 3;
      direction = 'up';
      
      if (movementright) {
        character.anims.play('right', true); // Play 'right' animation
        character.x += 3;
        direction = 'right';
      }
      
      if (movementleft) {
        character.anims.play('left', true); // Play 'left' animation
        character.x -= 3;
        direction = 'left';
      }
    }
    else if (movementdown) {
      character.anims.play('down', true); // Play 'down' animation
      character.y += 3;
      direction = 'down';
      
      if (movementright) {
        character.anims.play('right', true); // Play 'right' animation
        character.x += 3;
        direction = 'right';
      }
      
      if (movementleft) {
        character.anims.play('left', true); // Play 'left' animation
        character.x -= 3;
        direction = 'left';
      }
    }
    else if (movementleft) {
      character.anims.play('left', true); // Play 'left' animation
      character.x -= 3;
      direction = 'left';
    }
    else if (movementright) {
      character.anims.play('right', true); // Play 'right' animation
      character.x += 3;
      direction = 'right';
    } 
    else {
      character.anims.stop(); // Stop the animation
      character.setTexture('character', idleDirection(direction)); // Set a specific frame for idle state
    }
    //winning condition was met{load map 2}
  }      
}