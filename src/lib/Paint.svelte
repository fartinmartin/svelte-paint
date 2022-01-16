<script>
  import { Canvas, Layer } from "svelte-canvas";
  import {
    getInputCoords,
    getMidInputCoords,
    getWindowToCanvas,
  } from "./utils";

  export let width,
    height,
    size = "15",
    color = "tomato",
    mode = "draw", // "draw" | "erase" | "fill"
    cap = "round",
    isDrawing,
    paths = [],
    coords = {
      old: { x: 0, y: 0 },
      oldMid: { x: 0, y: 0 },
      current: { x: 0, y: 0 },
    },
    style;
  // TODO: "presentation" mode? where paths are provided and interaction is not allowed

  $: aspectRatio = width / height;
  // $: isSameCoords =
  //   coords.old.x === coords.current.x && coords.old.y === coords.current.y;

  export let getCanvas, getContext, redraw;

  // set mouse state
  const inputDown = () => {
    isDrawing = true;
    coords.old = coords.oldMid = coords.current;
  };

  const inputUp = () => {
    // savePath();
    isDrawing = false;
  };

  const inputMove = (e) => {
    coords.current = getInputCoords(e);
  };

  const inputCancel = (e) => {
    // if (isDrawing) savePath();
    isDrawing = false;
  };

  const savePath = () => paths.push(currentPath);

  $: render = ({ context: ctx }) => {
    if (!isDrawing) return;

    const currentMid = getMidInputCoords(coords.old, coords.current);

    if (mode !== "fill") {
      ctx.globalCompositeOperation =
        mode === "erase" ? "destination-out" : "source-over";

      ctx.lineWidth = size;
      ctx.lineCap = cap;
      ctx.strokeStyle = color;

      ctx.beginPath();
      ctx.moveTo(currentMid.x, currentMid.y);
      ctx.quadraticCurveTo(
        coords.old.x,
        coords.old.y,
        coords.oldMid.x,
        coords.oldMid.y
      );
      ctx.stroke();
    }

    // why does this happen here, and not in an event listener? bc it has to happen after the drawing?
    coords.old = coords.current;
    coords.oldMid = currentMid;
  };
</script>

<Canvas
  {width}
  {height}
  {style}
  autoclear={false}
  bind:getCanvas
  bind:getContext
  bind:redraw
  on:mousedown={inputDown}
  on:mousemove={inputMove}
  on:mouseup={inputUp}
  on:mouseout={inputCancel}
  on:touchstart={inputDown}
  on:touchmove={inputMove}
  on:touchend={inputUp}
  on:touchcancel={inputCancel}
  on:gesturestart={inputCancel}
>
  <Layer {render} />
</Canvas>
