import getMidCoords from "./getMidCoords";

export const render = (
  { context: ctx },
  brush,
  { isDisabled, isDrawing, brushHasMoved },
  currentPath
) => {
  // ⚠️ TODO: maybe this function just accepts neutral "brush" and "path" props,
  // those are then only updated on "isDrawing" or "isPlaying" or something like that?

  if (!isDrawing) return;

  setBrush(ctx, brush);
  brush.mode !== "fill" ? drawPath(ctx, currentPath) : drawFill();
};

const setBrush = (ctx, { mode, size, cap, color }) => {
  ctx.globalCompositeOperation =
    mode === "erase" ? "destination-out" : "source-over";

  ctx.lineWidth = size;
  ctx.lineCap = cap;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

const drawPath = (ctx, path) => {
  if (path.length < 2) return;

  let p1 = path[0]; // cur?
  let p2 = path[1]; // old?

  ctx.moveTo(p2.x, p2.y);
  ctx.beginPath();

  for (let i = 1, len = path.length; i < len; i++) {
    // ⚠️ TODO: is there a way to do this without unnecessarily calling .quadraticCurveTo() ? is it basically drawing the line over and over until mouseUp?
    const midPoint = getMidCoords(p1, p2);
    ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
    p1 = path[i];
    p2 = path[i + 1];
  }

  ctx.stroke();
};

const drawDot = (ctx, { x, y }, { cap, size }) => {
  ctx.beginPath();
  const r = size / 2;
  if (cap === "round") ctx.arc(x, y, r, 0, 2 * Math.PI);
  if (cap !== "round") ctx.rect(x - r, y - r, size, size);
  ctx.fill();
};

const drawFill = (ctx, path) => {};
