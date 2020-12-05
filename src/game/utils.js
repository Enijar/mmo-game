export function rand(min, max) {
  return Math.floor(Math.random() * max) + min;
}

export function randomWorldTiles(width, height) {
  const tiles = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      tiles.push({ id: rand(1, 11), y, x });
    }
  }
  return tiles;
}
