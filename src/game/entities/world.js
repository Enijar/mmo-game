import worldData from "../../assets/data/world.json";
import state from "../state/state";

export default function createWorld(canvas) {
  return {
    update() {
      // Map
      // @todo don't render things which fall outside of the screen/camera view
      worldData.tiles.forEach((tile) => {
        canvas.drawSprite(state.sprites.world, tile);
      });
    },
    destroy() {
      //
    },
  };
}
