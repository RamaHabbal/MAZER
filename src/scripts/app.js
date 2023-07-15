window.onload = () => {
  const config = {
    type: Phaser.AUTO,
    width: 1680, // Set the desired width of the game canvas
    height: 1500, // Set the desired height of the game canvas
    parent: 'game-container', // The ID of the HTML element to attach the game canvas to
    scene: [Scene1],
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
};
