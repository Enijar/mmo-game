import fs from "fs";
import path from "path";
import settings from "../src/game/settings";
import { rand } from "../src/game/utils";

function randomWorldTiles(width, height) {
  const tiles = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      tiles.push({ id: rand(1, 33), y, x });
    }
  }
  return tiles;
}

const tiles = randomWorldTiles(settings.world.width, settings.world.height);

fs.writeFileSync(
  path.resolve("src", "assets", "data", "world.json"),
  JSON.stringify({ tiles }, null, 2),
  "utf8"
);
