<svelte:options accessors />

<script>
  import { Canvas, Layer } from "svelte-canvas";
  import { coords, isDrawing, mode, size, cap, color, mid } from "./stores";
  import getMidInputCoords from "./utils/getMidInputCoords";
  import { down, up, move, cancel } from "./utils/inputEvents";

  // svelte-canvas api pass-through (except autoclear)
  export let width,
    height,
    pixelRatio,
    style,
    getCanvas,
    getContext,
    redraw,
    setup;

  // $: aspectRatio = width / height;

  $: render = ({ context: ctx }) => {
    if (!$isDrawing) return;

    // const currentMid = getMidInputCoords($coords.old, $coords.cur);

    if ($mode !== "fill") {
      ctx.globalCompositeOperation =
        $mode === "erase" ? "destination-out" : "source-over";

      ctx.lineWidth = $size;
      ctx.lineCap = $cap;
      ctx.strokeStyle = $color;

      ctx.beginPath();
      ctx.moveTo($mid.x, $mid.y);
      ctx.quadraticCurveTo(
        $coords.old.x,
        $coords.old.y,
        $coords.mid.x,
        $coords.mid.y
      );

      ctx.stroke();
    } else {
      console.log("fill mode", $coords.cur);
    }

    // why does this happen here, and not in an input up/down event listener? bc it has to happen after the drawing? bc we need access to currentMid?
    coords.updateOld($coords.cur);
    coords.updateMid($mid);
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
  on:mousedown={down}
  on:mousemove={move}
  on:mouseup={up}
  on:mouseout={cancel}
  on:touchstart={down}
  on:touchmove={move}
  on:touchend={up}
  on:touchcancel={cancel}
  on:gesturestart={cancel}
>
  <Layer {setup} {render} />
</Canvas>

<pre>{JSON.stringify($coords, null, 2)}</pre>
