import worldData from "../../assets/data/world.json";
import { TILE_SIZE } from "../consts";
import state from "../state/state";
import { tileToScreen } from "../utils";

export default function createWorld(canvas) {
  return {
    update() {
      // Map
      // @todo don't render things which fall outside of the screen/camera view
      worldData.tiles.forEach((tile) => {
        canvas.drawSprite(state.sprites.world, tile);
      });

      const { x, y } = tileToScreen(
        state.mouse.tileX,
        state.mouse.tileY,
        state.camera
      );
      canvas.ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      canvas.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    },
    destroy() {
      //
    },
  };
}
