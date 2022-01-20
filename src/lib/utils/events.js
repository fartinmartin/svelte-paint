const down = (e) => {
  e.preventDefault();

  const coords = getInputCoords(e);
  lazy.update(coords, { both: true });

  mouseHasMoved = true;
};

const up = (e) => {
  e.preventDefault();

  isDrawing = false;
  isPressing = false;
  points.length = 0;

  const brush = lazy.getBrushCoordinates();
  lazy.update(brush, { both: true });

  mouseHasMoved = true;
};

const move = (e) => {
  e.preventDefault();

  const coords = getInputCoords(e);
  const hasChanged = lazy.update(coords);
  const isDisabled = !lazy.isEnabled();

  if ((isPressing && hasChanged && !isDrawing) || (isDisabled && isPressing)) {
    isDrawing = true;
    points.push(lazy.brush.toObject());
  }

  if (isDrawing && (lazy.brushHasMoved() || isDisabled)) {
    points.push(lazy.brush.toObject());
  }

  mouseHasMoved = true;
};

// put in render loop?
if (isDrawing && (lazy.brushHasMoved() || isDisabled)) {
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

  ctx.lineTo(p1.x, p1.y);
  ctx.stroke();
}
