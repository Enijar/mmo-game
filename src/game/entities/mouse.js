import { TILE_SIZE } from "../consts";
import state from "../state/state";
import mouse from "../state/mouse";
import { clamp } from "../utils";

export default function createMouse(canvas) {
  function updateMouseState() {
    const { x, y } = state.mouse;
    const { width: w, height: h } = canvas.element;
    const cW = (state.camera.width + 1) * TILE_SIZE;
    const cH = (state.camera.height + 1) * TILE_SIZE;
    const cX = (w - cW) / 2;
    const cY = (h - cH) / 2;
    mouse.tileX =
      clamp(Math.floor((x - cX) / TILE_SIZE), 0, state.camera.width) +
      state.camera.x;
    mouse.tileY =
      clamp(Math.floor((y - cY) / TILE_SIZE), 0, state.camera.height) +
      state.camera.y;
  }

  function onMove(event) {
    state.mouse.x = event.pageX;
    state.mouse.y = event.pageY;
  }

  function onDown() {
    state.mouse.down = true;
  }

  function onUp() {
    state.mouse.down = false;
  }

  window.addEventListener("mousemove", onMove);
  window.addEventListener("mousedown", onDown);
  window.addEventListener("mouseup", onUp);

  return {
    update() {
      updateMouseState();
    },
    destroy() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    },
  };
}
