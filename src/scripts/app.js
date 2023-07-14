const config = {
  type: Phaser.AUTO,
  width: 800, // Set the desired width of the game canvas
  height: 600, // Set the desired height of the game canvas
  parent: 'game-container', // The ID of the HTML element to attach the game canvas to
  scene: {
    preload: preload, // Function for preloading game assets
    create: create, // Function for initializing game objects
    update: update, // Function for game logic and updates
  },
  physics: {
    default: 'arcade', // Set the default physics system to Arcade Physics
    arcade: {
      // Configure the Arcade Physics settings
      gravity: { y: 0 }, // Disable gravity for a top-down maze game
      debug: false, // Set to true for debugging collision boundaries
    },
  },
};

function preload() {}

function create() {}

function update() {}

const game = new Phaser.Game(config);
