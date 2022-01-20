import getMidCoords from "./getMidCoords";

export const render = (
  { context: ctx },
  { isDisabled, isDrawing, brushHasMoved, points, mode, size, cap, color }
) => {
  if (!isDrawing) return;

  if (mode !== "fill") {
    ctx.globalCompositeOperation =
      mode === "erase" ? "destination-out" : "source-over";

    ctx.lineWidth = size;
    ctx.lineCap = cap;
    ctx.strokeStyle = color;

    if (isDrawing && (brushHasMoved || isDisabled) && points.length >= 2) {
      let p1 = points[0]; // cur?
      let p2 = points[1]; // old?

      ctx.moveTo(p2.x, p2.y);
      ctx.beginPath();

      for (let i = 1, len = points.length; i < len; i++) {
        const midPoint = midPointBtw(p1, p2);
        ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
        p1 = points[i];
        p2 = points[i + 1];
      }

      // ctx.lineTo(p1.x, p1.y);
      ctx.stroke();
    }
  } else {
    // console.log("fill mode", coords.cur);
  }
};

function midPointBtw(p1, p2) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2,
  };
}
