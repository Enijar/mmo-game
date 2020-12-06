import settings from "../settings";
import state from "../state/state";
import { getMaxCamera, getTileSize } from "../utils";

export default function createCamera(canvas) {
  function onKeyDown(event) {
    const key = event.key.toLowerCase();
    if (!state.pressedKeys.includes(key)) state.pressedKeys.push(key);
  }

  function onKeyUp(event) {
    const key = event.key.toLowerCase();
    const keyIndex = state.pressedKeys.indexOf(key);
    if (keyIndex > -1) state.pressedKeys.splice(keyIndex, 1);
  }

  function onResize() {
    const { maxX, maxY } = getMaxCamera();
    state.camera.y = Math.max(state.camera.y, 0);
    state.camera.y = Math.min(state.camera.y, settings.world.height - maxY);
    state.camera.x = Math.max(state.camera.x, 0);
    state.camera.x = Math.min(state.camera.x, settings.world.width - maxX);
  }

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("resize", onResize);

  return {
    update() {
      const { maxX, maxY } = getMaxCamera();
      const { width: w, height: h } = canvas.element;
      const s = getTileSize();

      // If camera size is bigger than screen size, resize camera to fit inside screen
      if ((state.camera.width + 1) * s >= w) {
        state.camera.width = Math.ceil(w / s) - 1;
      } else {
        state.camera.width = settings.camera.width;
      }
      if ((state.camera.height + 1) * s >= h) {
        state.camera.height = Math.ceil(h / s) - 1;
      } else {
        state.camera.height = settings.camera.height;
      }

      state.pressedKeys.forEach((pressedKey) => {
        if (pressedKey === "w") {
          state.camera.y = Math.max(state.camera.y - 1, 0);
        }
        if (pressedKey === "s") {
          state.camera.y = Math.min(
            state.camera.y + 1,
            settings.world.height - maxY
          );
        }
        if (pressedKey === "a") {
          state.camera.x = Math.max(state.camera.x - 1, 0);
        }
        if (pressedKey === "d") {
          state.camera.x = Math.min(
            state.camera.x + 1,
            settings.world.width - maxX
          );
        }
        if (pressedKey === "=") {
          state.camera.zoom = Math.min(
            state.camera.zoom + settings.camera.zoomIncrement,
            settings.camera.maxZoom
          );
          state.pressedKeys = state.pressedKeys.filter(
            (pressedKey) => pressedKey !== "="
          );
        }
        if (pressedKey === "-") {
          state.camera.zoom = Math.max(
            state.camera.zoom - settings.camera.zoomIncrement,
            settings.camera.minZoom
          );
          state.pressedKeys = state.pressedKeys.filter(
            (pressedKey) => pressedKey !== "-"
          );
        }
      });
    },
    destroy() {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("resize", onResize);
    },
  };
}
