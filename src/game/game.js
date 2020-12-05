import worldSprite from "../assets/sprites/world.png";
import state from "./state/state";
import { loadSprites } from "./utils";
import createCamera from "./entities/camera";
import createCanvas from "./entities/canvas";
import createWorld from "./entities/world";

export function createGame() {
  const canvas = createCanvas();
  const camera = createCamera(canvas);
  const world = createWorld(canvas);

  let nextFrameId;
  loadSprites({ world: worldSprite }).then((sprites) => {
    state.sprites = sprites;

    (function render() {
      nextFrameId = requestAnimationFrame(render);

      // Updates
      // @todo multiple updates per render (depending on tick rate)
      canvas.update();
      camera.update();
      world.update();
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
