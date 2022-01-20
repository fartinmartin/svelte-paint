import getMidCoords from "./getMidCoords";

export const render = (
  { context: ctx },
  { isDisabled, isDrawing, brushHasMoved, currentPath, mode, size, cap, color }
) => {
  if (!isDrawing) return;

  if (mode !== "fill") {
    ctx.globalCompositeOperation =
      mode === "erase" ? "destination-out" : "source-over";

    ctx.lineWidth = size;
    ctx.lineCap = cap;
    ctx.strokeStyle = color;

    // how to handle "dots"???

    if (isDrawing && (brushHasMoved || isDisabled) && currentPath.length >= 2) {
      let p1 = currentPath[0]; // cur?
      let p2 = currentPath[1]; // old?

      ctx.moveTo(p2.x, p2.y);
      ctx.beginPath();

      for (let i = 1, len = currentPath.length; i < len; i++) {
        const midPoint = getMidCoords(p1, p2);
        ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
        p1 = currentPath[i];
        p2 = currentPath[i + 1];
      }

      // ctx.lineTo(p1.x, p1.y);
      ctx.stroke();
    }
  } else {
    // console.log("fill mode", coords.cur);
  }
};
