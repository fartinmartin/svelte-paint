// exposed methods
export const setMode = (newMode) => (mode = newMode);
export const setSize = (newSize) => (size = newSize);
export const decrementSize = () => size--;
export const incrementSize = () => size++;
export const setColor = (newColor) => (color = newColor);

export const clear = () => {
  const ctx = getContext();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  savePath({ mode: "clear", coords: [{ x: 0, y: 0 }] });
};
