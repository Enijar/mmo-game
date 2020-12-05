import world from "../assets/sprites/world.png";
import worldData from "../assets/data/world.json";
import loadSprites from "./load-sprites";
import state from "./state";
import createCamera from "./camera";
import createCanvas from "./canvas";

export function createGame() {
  const canvas = createCanvas();
  const camera = createCamera(canvas);

  let nextFrameId;
  loadSprites({ world }).then((sprites) => {
    (function render() {
      nextFrameId = requestAnimationFrame(render);

      const { width: w, height: h } = canvas;

      canvas.ctx.clearRect(0, 0, w, h);

      // Updates
      // @todo multiple updates per render (depending on tick rate)
      camera.update();

      // Background
      canvas.ctx.fillStyle = "#333";
      canvas.ctx.fillRect(0, 0, w, h);

      // Map
      // @todo don't render things which fall outside of the screen/camera view
      worldData.tiles.forEach((tile) => {
        const x = sprites.world.s * (tile.x - state.camera.x);
        const y = sprites.world.s * (tile.y - state.camera.y);
        canvas.drawSprite(sprites.world, tile.id, x, y);
      });
    })();
  });

  return {
    canvas,
    destroy() {
      cancelAnimationFrame(nextFrameId);
      canvas.destroy();
      camera.destroy();
    },
  };
}
