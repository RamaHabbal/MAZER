
class Scene4 extends Phaser.Scene {
    constructor(){
        super("Gaming2");
    }

    create(){
      this.scene.stop("Gaming");
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
        maze.gateway(mapWidth - 1, mapHeight-1);
        // Creates the array of rows of tiles
        let mazeMap = maze.tiles();
    
        const x = Math.round((this.game.config.width - TILESIZE * hTiles) / 2);
        const y = Math.round((this.game.config.height - TILESIZE * vTiles) / 2);
    
        this.renderTiles(x, y, mazeMap, TILESIZE);
        
        this.cameras.main.setBackgroundColor('#C7671B');
        character = this.physics.add.sprite(48, 48, 'character');
        portal = this.physics.add.sprite(100, 48, 'portal');
        ghost = this.physics.add.sprite(0, 0, 'ghost');

        character.setPosition(10,50);
        portal.setPosition(985,940);
        ghost.setPosition(-10,0);

        this.physics.world.setBoundsCollision(true, true, true, true);
        character.setCollideWorldBounds(true);

        character.setImmovable(true);
        character.setInteractive();

        portal.displayWidth = 70;
        portal.displayHeight = 70;

        portal.setImmovable(true);
        portal.setInteractive();
        portal.setDepth(2);
        ghost.setDepth(2);

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

        this.cameras.main.setBounds(0,0,1000,1000);
        this.cameras.main.startFollow(character);
        this.cameras.main.setZoom(1.5);
        
        // this.physics.add.Collider(character,wallsLayer);
        // house=this.add.image(0, 0, 'house').setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
       
        if (score <=999){
          scoreText = this.add.text(700, 170, "SCORE:"+score.toString(), {fontSize: '25px', color: '#fff'});
        }else{
          scoreText = this.add.text(700, 170, "SCORE:MAX", {fontSize: '25px', color: '#fff'});
        }
        
        Timertext= this.add.text(700, 200,"Timer:" + timestart.toString(),  {fontSize: '25px', color: '#fff'});
        Timertext.setScrollFactor(0,0);
        Timertext.setDepth(1);
        ESCtext = this.add.text(170, 170, "press 'ESC' to leave", {fontSize: '10px', color: '#fff'});
        scoreText.setScrollFactor(0,0) ;
        ESCtext.setScrollFactor(0,0) ;
        
        scoreText.setDepth(1);
        ESCtext.setDepth(1);
     
        //timer
        this.triggerTimer = this.time.addEvent({
        callback: this.timerEvent,
        callbackScope: this,
        delay: 1000, 
        loop: true
    });


        
     
    }

 

    timerEvent() {
      console.log('timerEvent');
      
        Timertext.setText("Timer:"+ timestart);
        timestart--;
      if (timestart==0){
        this.scene.launch("gameover");
        timestart=25;
      }
  }
    ////////

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
      wallsLayer = wallsMap.createStaticLayer(0, wallTile, x, y);
      wallsLayer.setDisplaySize(width, height);

      //for loop to add collision to each wall block --to do here
  
      // Floor
      this.swapZeros(maze); // swaps 0 - 1
      let floorMap = this.make.tilemap({
        data: maze,
        tileWidth: 50,
        tileHeight: 50,
      });
      let floorTile = floorMap.addTilesetImage('ground');
      floorLayer = floorMap.createDynamicLayer(0, floorTile, x, y);
  
      floorLayer.setDisplaySize(width, height);
  
      // Shadows
      const offset = 0.2 * tilesize;
      let rt = this.add.renderTexture(x + offset, y + offset, width, height);
      rt.draw(wallsLayer, 0, 0);
      rt.setAlpha(0.4);
      rt.setTint(0);
  
      // Move walls to front
      wallsLayer.setDepth(rt.depth + 1);
}

///////

    update() {
        // Update the game state...
        let cursors = this.input.keyboard.createCursorKeys();
        let movementup = cursors.up.isDown;
        let movementdown = cursors.down.isDown;
        let movementleft = cursors.left.isDown;
        let movementright = cursors.right.isDown;
        
        let movementW=this.input.keyboard.addKey('W').isDown;
        let movementA=this.input.keyboard.addKey('A').isDown;
        let movementS=this.input.keyboard.addKey('S').isDown;
        let movementD=this.input.keyboard.addKey('D').isDown;
      
        let menusettings = this.input.keyboard.addKey('Esc');
        
        if(menusettings.isDown){
            this.scene.launch('settings');
            
            //this is to pause character
           //this.scene.pause();
        };

        console.log("c x: " + character.x);
        console.log("c y: " + character.y);
        console.log("portal x: " + portal.x);
        console.log("portal y: " + portal.y);

        if(character.body.position.x >= 940 && character.body.position.y >= 900){
          console.log("inside c x: " + character.x);
          console.log("inside c y: " + character.y);
          this.scene.start("Gaming");
          score+=1;
          timestart=25;
        }
        


        if (movementup || movementW ) {
            character.anims.play('up', true); // Play 'up' animation
            character.y -= 5;
            direction = 'up';

            ghost.anims.play('ghostUp', true); // Play 'up' animation
            direction = 'ghostUp';
            ghost.x = character.body.position.x;
            ghost.y = character.body.position.y + 50;
            if (movementright ||  movementD) {
            
                character.anims.play('up', true); // Play 'right' animation
                character.x += 5;
                direction = 'right';
                }
            if (movementleft ||  movementA) {
                    character.anims.play('up', true); // Play 'left' animation
                    character.x -= 5;
                    direction = 'left';
                }
        }
        else if (movementdown || movementS) {
          character.anims.play('down', true); // Play 'down' animation
          character.y += 5;
          direction = 'down';

          ghost.anims.play('ghostDown', true); // Play 'up' animation
          direction = 'ghostDown';
          ghost.x = character.body.position.x;
          ghost.y = character.body.position.y - 50;

          if (movementright || movementD) {
            character.anims.play('down', true); // Play 'right' animation
            character.x += 5;
            direction = 'right';

            ghost.anims.play('ghostRight', true); // Play 'up' animation
            direction = 'ghostRight';
            ghost.x = character.body.position.x - 50;
            ghost.y = character.body.position.y;
          }
          if (movementleft || movementA) {
            character.anims.play('down', true); // Play 'left' animation
            character.x -= 5;
            direction = 'left';

            ghost.anims.play('ghostLeft', true); // Play 'up' animation
            direction = 'ghostLeft';
            ghost.x = character.body.position.x + 90;
            ghost.y = character.body.position.y;
          }
        }
        else if (movementleft || movementA) {
          character.anims.play('left', true); // Play 'left' animation
          character.x -= 5;
          direction = 'left';

          ghost.anims.play('ghostLeft', true); // Play 'up' animation
          direction = 'ghostLeft';
          ghost.x = character.body.position.x + 90;
          ghost.y = character.body.position.y;
        }
        else if (movementright || movementD) {
          character.anims.play('right', true); // Play 'right' animation
          character.x += 5;
          direction = 'right';

          ghost.anims.play('ghostRight', true); // Play 'up' animation
          direction = 'ghostRight';
          ghost.x = character.body.position.x - 50;
          ghost.y = character.body.position.y;
        } 
        else {
        character.anims.stop(); // Stop the animation
        character.setTexture('character', idleDirection(direction)); // Set a specific frame for idle state
        }
        //winning condition was met{load map 2}
    }
}