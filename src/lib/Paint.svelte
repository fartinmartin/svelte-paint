<svelte:options accessors />

<script>
  import { onMount } from "svelte";

  import { Canvas, Layer } from "svelte-canvas";
  import getInputCoords from "./utils/getInputCoords";
  import getMidInputCoords from "./utils/getMidInputCoords";

  // svelte-canvas api pass-through (except autoclear)
  export let width,
    height,
    pixelRatio,
    style,
    getCanvas,
    getContext,
    redraw,
    setup;

  // svelte-paint
  let size = 10,
    color = "tomato",
    mode = "draw", // "draw" | "erase" | "fill"
    cap = "round",
    isDrawing,
    currentPath = [],
    paths = [],
    coords = {
      old: { x: 0, y: 0 },
      oldMid: { x: 0, y: 0 },
      current: { x: 0, y: 0 },
    };

  $: aspectRatio = width / height;
  $: isSameCoords =
    coords.old.x === coords.current.x && coords.old.y === coords.current.y;

  // exposed methods
  export const clear = () => {
    const ctx = getContext();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    savePath({ mode: "clear", coords: [{ x: 0, y: 0 }] });
  };

  // set drawing state and dispatch saves to history
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

  // internal methods
  const savePath = (path) => {
    if (path) paths.push(path);
    // otherwise, create path
  };

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
    } else {
      console.log("fill mode", coords.current);
    }

    // why does this happen here, and not in an input up/down event listener? bc it has to happen after the drawing? bc we need access to currentMid?
    coords.old = coords.current;
    coords.oldMid = currentMid;
  };
</script>

<Canvas
  {width}
  {height}
  {pixelRatio}
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
  <Layer {setup} {render} />
</Canvas>
