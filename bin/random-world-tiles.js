import fs from "fs";
import path from "path";
import settings from "../src/game/settings";
import { randomWorldTiles } from "../src/game/utils";

const tiles = randomWorldTiles(settings.world.width, settings.world.height);

fs.writeFileSync(
  path.resolve("src", "assets", "data", "world.json"),
  JSON.stringify({ tiles }, null, 2),
  "utf8"
);
