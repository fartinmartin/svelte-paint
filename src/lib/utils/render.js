export const render = (
  { context: ctx },
  { isDrawing, coords, mode, size, cap, color, cords }
) => {
  if (!isDrawing) return;

  if (mode !== "fill") {
    ctx.globalCompositeOperation =
      mode === "erase" ? "destination-out" : "source-over";

    ctx.lineWidth = size;
    ctx.lineCap = cap;
    ctx.strokeStyle = color;

    ctx.beginPath();

    ctx.moveTo(coords.old.x, coords.old.y);
    ctx.lineTo(coords.cur.x, coords.cur.y);

    // ctx.moveTo(coords.old.x, coords.old.y);
    // ctx.quadraticCurveTo(
    //   coords.mid.x,
    //   coords.mid.y,
    //   coords.cur.x,
    //   coords.cur.y
    // );
    ctx.stroke();
  }
  if (mode !== "fill") {
    ctx.globalCompositeOperation =
      mode === "erase" ? "destination-out" : "source-over";

    ctx.lineWidth = 10;
    ctx.lineCap = cap;
    ctx.strokeStyle = "blue";

    ctx.beginPath();

    // ctx.moveTo(cords.old.x, cords.old.y);
    // // ctx.lineTo(cords.cur.x, cords.cur.y);

    ctx.moveTo(cords.old.x, cords.old.y);
    ctx.quadraticCurveTo(cords.mid.x, cords.mid.y, cords.cur.x, cords.cur.y);
    ctx.stroke();
  } else {
    // console.log("fill mode", coords.cur);
  }
};
