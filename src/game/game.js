import worldSprite from "../assets/sprites/world.png";
import state from "./state/state";
import { loadSprites } from "./utils";
import createCamera from "./entities/camera";
import createCanvas from "./entities/canvas";
import createWorld from "./entities/world";
import { TILE_SIZE } from "./consts";

export function createGame() {
  const canvas = createCanvas();
  const camera = createCamera(canvas);
  const world = createWorld(canvas);

  let nextFrameId;
  loadSprites({ world: worldSprite }).then((sprites) => {
    state.sprites = sprites;

    (function render() {
      nextFrameId = requestAnimationFrame(render);

      const { width: w, height: h } = canvas.element;
      const cW = (state.camera.width + 1) * TILE_SIZE;
      const cH = (state.camera.height + 1) * TILE_SIZE;
      const cX = (w - cW) / 2;
      const cY = (h - cH) / 2;

      canvas.update();

      canvas.ctx.save();
      canvas.ctx.translate(cX, cY);

      // Updates
      // @todo multiple updates per render (depending on tick rate)
      camera.update();
      world.update();

      canvas.ctx.translate(-cX, -cY);
      canvas.ctx.restore();
    })();
  });

  return {
    canvas,
    destroy() {
      cancelAnimationFrame(nextFrameId);
      canvas.destroy();
      camera.destroy();
      world.destroy();
    },
  };
}
