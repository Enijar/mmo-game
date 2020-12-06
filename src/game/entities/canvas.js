import state from "../state/state";
import { getTileSize, worldToScreen } from "../utils";

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
      const { img } = sprite;
      const s = getTileSize();
      const screen = worldToScreen(tile.x, tile.y);
      const x = s * screen.x;
      const y = s * screen.y;
      const rowIndex = tile.id - 1;
      const oX = 0;
      const oY = img.width * rowIndex;

      if (
        tile.x < state.camera.x ||
        tile.x > state.camera.x + state.camera.width ||
        tile.y < state.camera.y ||
        tile.y > state.camera.y + state.camera.height
      ) {
        return;
      }
      // ctx.drawImage(img, oX, oY, s, s, x, y, s, s);
      ctx.drawImage(img, oX, oY, img.width, img.width, x, y, s, s);

      if (process.env.NODE_ENV === "development") {
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`${tile.x},${tile.y}`, x + s / 2, y + s / 2);
      }
    },
    destroy() {
      window.removeEventListener("resize", onResize);
    },
  };
}
