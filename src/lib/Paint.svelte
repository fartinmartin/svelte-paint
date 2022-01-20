<script>
  import { createEventDispatcher } from "svelte";
  import { Canvas, Layer } from "svelte-canvas";
  import { LazyBrush } from "lazy-brush";
  import { render as renderFn } from "./utils/render";
  import getInputCoords from "./utils/getInputCoords";

  // onMount(() => {
  //   // maybe this should/needs to be done in (a fork of) svelte-canvas 🤔
  //   observeElDimensions(sc.getCanvas(), resizeCanvas({}));
  // });
  //
  // does that mean.. i should move all of this logic to the svelte-canvas fork?

  // svelte-canvas api pass-through (except autoclear)
  export let sc, width, height, pixelRatio, style, setup;
  $: render = (p) => renderFn(p, { ...input, ...payload });

  // svelte-paint
  let isPlaying = false;
  let currentStep = 0;
  let paths = [];

  // lazy-brush
  let isDisabled = false;
  let isPressing = false;
  let isDrawing = false;
  let mouseHasMoved = false;
  let brushHasMoved = false;
  let coords = { x: 0, y: 0 };
  let currentPath = [];

  // brush settings TODO: allow these to be set initially via props
  let mode = "draw"; // "draw" | "erase" | "fill" | "clear"
  let size = 10;
  let cap = "round"; // "round" | "butt" | "square"
  let color = "tomato";
  const lazy = new LazyBrush({ radius: 2 }); // TODO: pass as options prop

  // computed values
  $: input = { isDisabled, isDrawing, brushHasMoved };
  $: brush = { mode, size, cap, color };
  $: payload = { ...brush, currentPath, currentStep };
  // export canUndo and canRedo ??? (also use them in the undo() and redo() fns)

  // svelte-paint input events
  const dispatch = createEventDispatcher();

  const down = (e) => {
    e.preventDefault();

    coords = getInputCoords(e);
    lazy.update(coords, { both: true });

    isPressing = true;
    mouseHasMoved = true;
    brushHasMoved = lazy.brushHasMoved();

    dispatch("start", { text: "start!", payload });
  };

  // TODO: only cancel once BRUSH (not mouse) has left canvas.. this has to do with lazy-brush
  const cancel = (e) => isPressing && up(e, "cancel");
  const up = (e, type) => {
    e.preventDefault();

    isDrawing = false;
    isPressing = false;
    currentPath.length = 0;

    const brush = lazy.getBrushCoordinates();
    lazy.update(brush, { both: true });

    mouseHasMoved = true;
    brushHasMoved = lazy.brushHasMoved();

    savePath();
    dispatch("end", { text: "end!", payload, cancel: type === "cancel" });
  };

  const move = (e) => {
    if (!isPressing) return;
    e.preventDefault();

    coords = getInputCoords(e);
    const hasChanged = lazy.update(coords);
    isDisabled = !lazy.isEnabled();

    if (
      (isPressing && hasChanged && !isDrawing) ||
      (isDisabled && isPressing)
    ) {
      isDrawing = true;
      currentPath = [...currentPath, lazy.brush.toObject()];
    }

    if (isDrawing && (lazy.brushHasMoved() || isDisabled)) {
      currentPath = [...currentPath, lazy.brush.toObject()];
    }

    mouseHasMoved = true;
    brushHasMoved = lazy.brushHasMoved();

    dispatch("draw", { text: "draw!", payload });
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

  export const play = () => {};
  export const pause = () => {};
</script>

<!-- style={`${style} width: 100%; max-width: 100%;`} -->
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

<pre>{currentPath.length}</pre>
<pre>{JSON.stringify(coords)}</pre>
<!-- <pre>{JSON.stringify(cords)}</pre> -->
