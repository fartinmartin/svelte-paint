export const render = (
  { context: ctx },
  { isDrawing, coords, mode, size, cap, color }
) => {
  if (!isDrawing) return;

  if (mode !== "fill") {
    ctx.globalCompositeOperation =
      mode === "erase" ? "destination-out" : "source-over";

    ctx.lineWidth = size;
    ctx.lineCap = cap;
    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(coords.mid.x, coords.mid.y);
    ctx.quadraticCurveTo(
      coords.old.x,
      coords.old.y,
      coords.dim.x,
      coords.dim.y
    );
    ctx.stroke();
  } else {
    // console.log("fill mode", coords.cur);
  }
};
