import worldData from "../../assets/data/world.json";
import state from "../state/state";
import { getTileSize, tileToScreen } from "../utils";

export default function createWorld(canvas) {
  return {
    update() {
      const s = getTileSize();

      // Map
      // @todo don't render things which fall outside of the screen/camera view
      worldData.tiles.forEach((tile) => {
        canvas.drawSprite(state.sprites.terrain, tile);
      });

      const { x, y } = tileToScreen(state.mouse.tileX, state.mouse.tileY);
      canvas.ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      canvas.ctx.fillRect(x, y, s, s);
    },
    destroy() {
      //
    },
  };
}
