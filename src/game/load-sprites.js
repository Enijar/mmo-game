const TILE_SIZE = 32;

// @todo load in chunks
export default async function loadSprites(assets) {
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
          s: TILE_SIZE,
        };
        resolve();
      };
      img.src = assets[asset];
    });
  }

  return loadedAssets;
}
