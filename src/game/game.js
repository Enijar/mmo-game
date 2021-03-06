import sprites from "./sprites";
import { getTileSize, loadSprites } from "./utils";
import state from "./state/state";
import createCamera from "./entities/camera";
import createCanvas from "./entities/canvas";
import createWorld from "./entities/world";
import createMouse from "./entities/mouse";

export function createGame() {
  const canvas = createCanvas();
  const camera = createCamera(canvas);
  const world = createWorld(canvas);
  const mouse = createMouse(canvas);

  let nextFrameId;
  loadSprites(sprites).then((sprites) => {
    state.sprites = sprites;

    (function render() {
      nextFrameId = requestAnimationFrame(render);
      const { width: w, height: h } = canvas.element;
      const s = getTileSize();
      const cW = (state.camera.width + 1) * s;
      const cH = (state.camera.height + 1) * s;
      const cX = (w - cW) / 2;
      const cY = (h - cH) / 2;

      canvas.update();

      canvas.ctx.save();
      canvas.ctx.translate(cX, cY);

      // @todo multiple updates per render (depending on tick rate)
      // Updates

      mouse.update();
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
      mouse.destroy();
    },
  };
}
