import { TILE_SIZE } from "./consts";
import state from "./state/state";

export function rand(min, max) {
  return Math.floor(Math.random() * max) + min;
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
  const s = getTileSize();
  const maxX = state.camera.width + Math.ceil(state.camera.width / s);
  const maxY = state.camera.height + Math.ceil(state.camera.height / s);
  return { maxX, maxY };
}

export function worldToScreen(worldX, worldY) {
  return {
    x: worldX - state.camera.x,
    y: worldY - state.camera.y,
  };
}

export function tileToScreen(x, y) {
  const s = getTileSize();
  return {
    x: (x - state.camera.x) * s,
    y: (y - state.camera.y) * s,
  };
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function getTileSize() {
  return TILE_SIZE * state.camera.zoom;
}
