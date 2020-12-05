import { TILE_SIZE } from "./consts";
import settings from "./settings";
import state from "./state";

export default function createCamera(canvas) {
  function onKeyDown(event) {
    const screenMaxX = Math.ceil(canvas.element.width / TILE_SIZE);
    const screenMaxY = Math.ceil(canvas.element.height / TILE_SIZE);

    switch (event.key) {
      case "w":
        state.camera.y = Math.max(state.camera.y - 1, 0);
        break;
      case "s":
        state.camera.y = Math.min(
          state.camera.y + 1,
          settings.world.height - screenMaxY
        );
        break;
      case "a":
        state.camera.x = Math.max(state.camera.x - 1, 0);
        break;
      case "d":
        state.camera.x = Math.min(
          state.camera.x + 1,
          settings.world.width - screenMaxX
        );
        break;
      default:
        break;
    }
  }

  window.addEventListener("keydown", onKeyDown);

  return {
    destroy() {
      window.removeEventListener("keydown", onKeyDown);
    },
  };
}
