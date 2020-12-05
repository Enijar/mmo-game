import worldData from "../../assets/data/world.json";
import state from "../state/state";

export default function createWorld(canvas) {
  return {
    update() {
      // Map
      // @todo don't render things which fall outside of the screen/camera view
      worldData.tiles.forEach((tile) => {
        const x = state.sprites.world.s * (tile.x - state.camera.x);
        const y = state.sprites.world.s * (tile.y - state.camera.y);
        canvas.drawSprite(state.sprites.world, tile.id, x, y);
      });
    },
    destroy() {
      //
    },
  };
}
