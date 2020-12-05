import { TILE_SIZE } from "./consts";
import state from "./state/state";

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

// @todo load in chunks
export async function loadSprites(assets) {
  const loadedAssets = {};

  for (const asset in assets) {
    if (!assets.hasOwnProperty(asset)) continue;
    await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        loadedAssets[asset] = {
          img,
          w: img.width,
          h: img.height,
        };
        resolve();
      };
      img.src = assets[asset];
    });
  }

  return loadedAssets;
}

export function getMaxCamera() {
  const maxX = state.camera.width + Math.ceil(state.camera.width / TILE_SIZE);
  const maxY = state.camera.height + Math.ceil(state.camera.height / TILE_SIZE);
  return { maxX, maxY };
}

export function worldToScreen(worldX, worldY, camera) {
  return {
    x: worldX - camera.x,
    y: worldY - camera.y,
  };
}

export function tileToScreen(x, y, camera) {
  return {
    x: (x - camera.x) * TILE_SIZE,
    y: (y - camera.y) * TILE_SIZE,
  };
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
