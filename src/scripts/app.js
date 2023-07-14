window.onload=function(){


const config = {
  type: Phaser.AUTO,
  width: 800, // Set the desired width of the game canvas
  height: 800, // Set the desired height of the game canvas
  parent: 'game-container', // The ID of the HTML element to attach the game canvas to
  scene: [Scene1, Scene2]
};

const game = new Phaser.Game(config);
}