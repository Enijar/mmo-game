import state from "../state/state";
import { TILE_SIZE } from "../consts";

export default function createCanvas() {
  const element = document.createElement("canvas");
  const ctx = element.getContext("2d");

  function setCanvasSize() {
    element.width = window.innerWidth;
    element.height = window.innerHeight;
  }

  function onResize() {
    setCanvasSize(element);
  }

  setCanvasSize(element);
  window.addEventListener("resize", onResize);

  return {
    element,
    ctx,
    update() {
      const { width: w, height: h } = element;
      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = "#333";
      ctx.fillRect(0, 0, w, h);
    },
    drawSprite(sprite, tile) {
      const { zoom } = state.camera;
      const { img, s, w } = sprite;
      const x = s * (tile.x - state.camera.x);
      const y = s * (tile.y - state.camera.y);
      const cols = Math.ceil(w / s);
      const index = tile.id - 1;
      const colIndex = index % cols;
      const rowIndex = Math.floor(index / cols);
      const oX = s * colIndex;
      const oY = s * rowIndex;
      ctx.drawImage(img, oX, oY, s, s, x, y, s * zoom, s * zoom);

      if (process.env.NODE_ENV === "development") {
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(
          `${tile.x},${tile.y}`,
          x + TILE_SIZE / 2,
          y + TILE_SIZE / 2
        );
      }
    },
    destroy() {
      window.removeEventListener("resize", onResize);
    },
  };
}
