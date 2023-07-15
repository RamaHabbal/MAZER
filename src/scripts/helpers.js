function renderTiles(x, y, maze, tilesize) {
  const width = tilesize * maze[0].length;
  const height = tilesize * maze.length;

  // Walls
  let wallsMap = this.make.tilemap({
    data: maze,
    tileWidth: 50,
    tileHeight: 50,
  });
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
