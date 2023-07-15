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
        this.cameras.main.setBackgroundColor('#C7671B');
        character = this.physics.add.sprite(48, 48, 'character');
        this.physics.world.setBoundsCollision(true, true, true, true);
        character.setCollideWorldBounds(true);

        character.setInteractive();

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
        const menu = new Button(70, 40, 'Menu', this, () => this.scene.start("playGame"));

 



        //this.physics.add.collider(this.projectiles,this.powerUps)
        //projectile.destroy();
        //overlap

}





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