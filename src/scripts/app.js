window.onload=function(){


let config = {
  type: Phaser.AUTO,
  width: 1000, // Set the desired width of the game canvas
  height: 1000, // Set the desired height of the game canvas
  parent: 'game-container', // The ID of the HTML element to attach the game canvas to
  //begin: scaling for game

  scale:{
    parent:'game-container',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom:1,
  },

  //end: scaling for game

  scene: [Scene1, Scene2,Scene3,SettingsMenu,GameOver,Story, Scene4],
  physics: {
    default: 'arcade', // Set the default physics system to Arcade Physics
    arcade: {
      // Configure the Arcade Physics settings
      gravity: { y: 0 }, // Disable gravity for a top-down maze game
      debug: false, // Set to true for debugging collision boundaries
    },
  },
};

const game = new Phaser.Game(config);
}
