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
    drawSprite(sprite, tileId, x = 0, y = 0) {
      const { img, w, s } = sprite;
      const cols = Math.ceil(w / s);
      const index = tileId - 1;
      const colIndex = index % cols;
      const rowIndex = Math.floor(index / cols);
      const oX = s * colIndex;
      const oY = s * rowIndex;
      ctx.drawImage(img, oX, oY, s, s, x, y, s, s);
    },
    destroy() {
      window.removeEventListener("resize", onResize);
    },
  };
}
