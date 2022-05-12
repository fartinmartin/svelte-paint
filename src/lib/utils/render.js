import getMidCoords from "./getMidCoords";

const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));
const _ = undefined;

export const playback = async ({ context: ctx }, paths, ms = 5) => {
  ctx.canvas.style.pointerEvents = "none"; // should this happen in <Paint/> when playback() is called?

  for (let i = 0, len = paths.length; i < len; i++) {
    const { points, ...brush } = paths[i];

    setBrush(ctx, { ...brush });
    drawPath(ctx, points, _, ms);

    await waitFor(200);
    // dispatch("done drawing path #1 of paths.length")
  }

  ctx.canvas.style.pointerEvents = "auto"; // should this happen in <Paint/> when playback() is called?

  // dispatch("done drawing x paths")
};

export const draw = ({ context: ctx }, brush, isDrawing, currentPath) => {
  // console.log(brush);
  if (!isDrawing) return;

  setBrush(ctx, brush);
  brush.mode !== "fill" ? drawPath(ctx, currentPath, brush) : drawFill();
};

const setBrush = (ctx, { mode, size, cap, color }) => {
  ctx.globalCompositeOperation =
    mode === "erase" ? "destination-out" : "source-over";

  ctx.lineWidth = size;
  ctx.lineCap = cap;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  // set lazy brush settings?? // pass lazy, then: lazy.setRadius(radius) // if enabled=true radius=0?
};

const drawPath = async (ctx, path, { cap, size }, ms) => {
  if (path.length && path.length < 2) drawDot(ctx, path[0], { cap, size });
  if (path.length < 2) return;

  let p1 = path[0]; // cur?
  let p2 = path[1]; // old?

  ctx.moveTo(p2.x, p2.y);
  ctx.beginPath();

  for (let i = 1, len = path.length; i < len; i++) {
    const midPoint = getMidCoords(p1, p2);
    ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);

    p1 = path[i];
    p2 = path[i + 1];

    if (ms) {
      ctx.stroke();
      await waitFor(ms);
    }
  }

  if (!ms) ctx.stroke();
};

const drawDot = (ctx, { x, y }, { cap, size }) => {
  // console.log("drawDot()!");
  ctx.beginPath();
  const r = size / 2;
  if (cap === "round") ctx.arc(x, y, r, 0, 2 * Math.PI);
  if (cap !== "round") ctx.rect(x - r, y - r, size, size);
  ctx.fill();
};

const drawFill = (ctx, path) => {};
