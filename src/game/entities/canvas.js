import state from "../state/state";
import { worldToScreen } from "../utils";
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
      const { img, w } = sprite;
      const screen = worldToScreen(tile.x, tile.y, state.camera);
      const x = TILE_SIZE * screen.x;
      const y = TILE_SIZE * screen.y;
      const oW = Math.ceil(w / TILE_SIZE);
      const index = tile.id - 1;
      const colIndex = index % oW;
      const rowIndex = Math.floor(index / oW);
      const oX = TILE_SIZE * colIndex;
      const oY = TILE_SIZE * rowIndex;

      if (
        tile.x < state.camera.x ||
        tile.x > state.camera.x + state.camera.width ||
        tile.y < state.camera.y ||
        tile.y > state.camera.y + state.camera.height
      ) {
        return;
      }

      ctx.drawImage(
        img,
        oX,
        oY,
        TILE_SIZE,
        TILE_SIZE,
        x,
        y,
        TILE_SIZE,
        TILE_SIZE
      );

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
