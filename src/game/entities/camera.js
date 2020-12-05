import { TILE_SIZE } from "../consts";
import settings from "../settings";
import state from "../state/state";

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
    const screenMaxX = Math.ceil(canvas.element.width / TILE_SIZE);
    const screenMaxY = Math.ceil(canvas.element.height / TILE_SIZE);

    state.camera.y = Math.max(state.camera.y, 0);
    state.camera.y = Math.min(
      state.camera.y,
      settings.world.height - screenMaxY
    );
    state.camera.x = Math.max(state.camera.x, 0);
    state.camera.x = Math.min(
      state.camera.x,
      settings.world.width - screenMaxX
    );
  }

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.addEventListener("resize", onResize);

  return {
    update() {
      const screenMaxX = Math.ceil(canvas.element.width / TILE_SIZE);
      const screenMaxY = Math.ceil(canvas.element.height / TILE_SIZE);

      state.pressedKeys.forEach((pressedKey) => {
        if (pressedKey === "w") {
          state.camera.y = Math.max(state.camera.y - 1, 0);
        }
        if (pressedKey === "s") {
          state.camera.y = Math.min(
            state.camera.y + 1,
            settings.world.height - screenMaxY
          );
        }
        if (pressedKey === "a") {
          state.camera.x = Math.max(state.camera.x - 1, 0);
        }
        if (pressedKey === "d") {
          state.camera.x = Math.min(
            state.camera.x + 1,
            settings.world.width - screenMaxX
          );
        }
        if (pressedKey === "=") {
          state.camera.zoom = Math.min(state.camera.zoom + 1, 5);
          state.pressedKeys = state.pressedKeys.filter(
            (pressedKey) => pressedKey !== "="
          );
        }
        if (pressedKey === "-") {
          state.camera.zoom = Math.max(state.camera.zoom - 1, 1);
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
