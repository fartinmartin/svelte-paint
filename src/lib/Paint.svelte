<script>
  import { createEventDispatcher } from "svelte";
  import { Canvas, Layer } from "svelte-canvas";
  import getInputCoords from "./utils/getInputCoords";
  import getMidCoords from "./utils/getMidCoords";
  import isTouch from "./utils/isTouch";
  import { LazyBrush } from "lazy-brush";
  import { render as renderFn } from "./utils/render";

  // svelte-canvas api pass-through (except autoclear)
  export let sc, width, height, pixelRatio, style, setup;
  $: render = (p) =>
    renderFn(p, { isDrawing, coords, mode, size, cap, color, cords });

  // svelte-paint brush settings
  let mode = "draw"; // "draw" | "erase" | "fill" | "clear"
  let size = 10;
  let cap = "round"; // "round" | "butt" | "square"
  let color = "tomato";

  // svelte-paint internals
  let currentPath = [];
  let currentStep = 0;
  let paths = [];
  let isDrawing = false;
  let isPlaying = false;
  let coords = {
    old: { x: 0, y: 0 },
    dim: { x: 0, y: 0 }, // dumb name for old mid
    mid: { x: 0, y: 0 }, // I'm wondering a) how necessary is it to use quadraticCurveTo() and therefor collecting mid values and b) how much extra cost is it to collect this data?
    cur: { x: 0, y: 0 }, //     (cont.) especially if it's resulting in worse line quality. compare svelte-paint (gaps in lines) to ecc (not so many gaps, eh?)
  };
  let cords = {
    old: { x: 0, y: 0 },
    mid: { x: 0, y: 0 },
    cur: { x: 0, y: 0 },
  };
  let cP = [];

  // $: isSameCoords = coords.old === coords.cur; // haven't used this yet but I feel like I'll need it? 🤔
  $: payload = { mode, size, cap, color, currentPath, currentStep };
  // export canUndo and canRedo ??? (also use them in the undo() and redo() fns)

  // lazy-brush
  const lazy = new LazyBrush({
    radius: 10,
    enabled: true,
    initialPoint: { x: 0, y: 0 },
  }); // default

  // svelte-paint input events
  const dispatch = createEventDispatcher();

  const down = (e) => {
    if (isPlaying) return;
    isDrawing = true;
    coords.old = coords.mid = coords.dim = coords.cur = getInputCoords(e);
    if (mode === "fill") currentPath = [...currentPath, coords]; // instead of currentPath.push(coords)
    dispatch("start", { text: "start!", payload });
  };

  const move = (e) => {
    if (isPlaying) return;
    if (!isDrawing) return;
    lazy.update(getInputCoords(e));
    cords.old = cords.cur;
    cords.cur = lazy.getBrushCoordinates();
    cords.mid = getMidCoords(cords.old, cords.cur);
    console.log(cords);
    // if (isTouch()) e.preventDefault();
    coords.old = coords.cur;
    coords.dim = coords.mid;
    coords.cur = getInputCoords(e);
    coords.mid = getMidCoords(coords.old, coords.mid);
    currentPath = [...currentPath, coords]; // instead of currentPath.push(coords)
    dispatch("draw", { text: "draw!", payload });
  };

  const up = () => {
    if (isPlaying) return;
    isDrawing = false;
    savePath();
    dispatch("end", { text: "end!", payload });
  };

  const cancel = () => {
    if (isPlaying) return;
    if (!isDrawing) return;
    isDrawing = false;
    savePath();
    dispatch("cancel", { text: "cancel!", payload });
  };

  // svelte-paint internal methods
  const savePath = () => {
    paths = [...paths, payload]; // instead of paths.push(payload)
    currentStep++;
    // console.log(currentStep, payload);
    // console.log(paths);
    dispatch("savePath", { text: "savePath!", payload });
  };

  const clearCanvas = () => {
    const ctx = sc.getContext();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const drawPathsToStep = (step = currentStep) => {
    clearCanvas();
    // svelte-canvas render fn?
  };

  // svelte-paint external methods
  export const setMode = (m) => (mode = m);
  export const setColor = (c) => (color = c);
  export const setCap = (c) => (cap = c);

  export const setSize = (s) => (size = s);
  export const decSize = () => size--;
  export const incSize = () => size++;

  export const clear = () => {
    clearCanvas();
    savePath("clear");
  };

  export const undo = () => {
    if (currentStep === 0) return;
    currentStep--;
    // drawPathsToStep(currentStep)
  };

  export const redo = () => {
    if (currentStep >= paths.length - 1) return; // could be off by +/- 1 here 😬
    currentStep++;
    // drawPathsToStep(currentStep)
  };

  export const goto = (step) => {
    if (step > currentStep) return;
    if (step < 0) return; // or is it `1`?
    currentStep = step;
    // drawPathsToStep(currentStep)
  };

  export const save = () => {
    return { paths, state: { ...payload } };
  };

  export const load = (pkg) => {
    // validate pkg, then:
    paths = pkg.paths;
    mode = pkg.mode;
    size = pkg.size;
    cap = pkg.cap;
    color = pkg.color;
    currentPath = pkg.currentPath;
    currentStep = pkg.currentStep;
    // drawPathsToStep(currentStep)
  };

  export const toDataURL = ({ type, quality } = {}) => {
    return sc.getCanvas().toDataURL(type, quality);
  };

  export const play = () => {
    // obvi just testing at the moment..
    isDrawing = !isDrawing;
    isPlaying = !isPlaying;

    let testPath = [
      randomCoords(),
      randomCoords(),
      randomCoords(),
      randomCoords(),
    ];

    for (let i = 0; i < testPath.length; i++) {
      coords = testPath[i];
      console.log(coords); // doesn't work :/
    }

    function randomCoords() {
      return {
        old: { x: Math.random() * width, y: Math.random() * height },
        dim: { x: Math.random() * width, y: Math.random() * height },
        mid: { x: Math.random() * width, y: Math.random() * height },
        cur: { x: Math.random() * width, y: Math.random() * height },
      };
    }

    // isDrawing = false;
  };

  export const pause = () => {};
</script>

<Canvas
  {width}
  {height}
  {pixelRatio}
  {style}
  autoclear={false}
  bind:this={sc}
  on:mousedown={down}
  on:touchstart={down}
  on:mousemove={move}
  on:touchmove={move}
  on:mouseup={up}
  on:touchend={up}
  on:mouseout={cancel}
  on:touchcancel={cancel}
  on:gesturestart={cancel}
>
  <Layer {setup} {render} />
</Canvas>

<pre
  style="text-align: center;">isPlaying: {isPlaying} | isDrawing: {isDrawing} | paths: {currentStep} / {paths.length} | mode: {mode} | size: {size} | color: {color} | cap: {cap}</pre>

<pre>{JSON.stringify(coords.cur)}</pre>
<!-- <pre>{JSON.stringify(cords)}</pre> -->
