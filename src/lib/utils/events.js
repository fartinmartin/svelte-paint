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
