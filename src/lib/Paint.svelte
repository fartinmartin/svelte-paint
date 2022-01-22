<script>
  import { createEventDispatcher } from "svelte";
  import { Canvas, Layer, t } from "@fartinmartin/svelte-canvas";
  import { LazyBrush } from "lazy-brush";
  import { render as renderFn } from "./utils/render";
  import getInputCoords from "./utils/getInputCoords";

  // svelte-canvas api pass-through (except autoclear)
  export let sc, width, height, pixelRatio, style, setup;
  $: render = (p) => renderFn(p, brush, input, currentPath);

  // brush settings
  export let mode = "draw", // "draw" | "erase" | "fill" | "clear"
    size = 10,
    cap = "round", // "round" | "butt" | "square"
    color = "tomato",
    radius = 2,
    enabled = true,
    initialPoint = { x: 0, y: 0 };

  // svelte-paint
  let currentStep = 0;
  let currentPath = [];
  let paths = [];

  // lazy-brush
  const lazy = new LazyBrush({ radius, enabled, initialPoint }); // include in $: brush ??
  let isDisabled = false;
  let isPressing = false;
  let isDrawing = false;

  // computed values
  $: input = { isDisabled, isPressing, isDrawing };
  $: brush = { mode, size, cap, color };
  $: payload = { ...brush, currentPath, currentStep };
  $: undoable = currentStep > 0;
  $: redoable = currentStep >= paths.length;

  // svelte-paint input events
  const dispatch = createEventDispatcher();

  const down = (e) => {
    e.preventDefault();

    lazy.update(getInputCoords(e), { both: true });
    isPressing = true;

    dispatch("start", { text: "start!", payload });
  };

  // TODO: only cancel once BRUSH (not mouse) has left canvas.. this has to do with lazy-brush
  const cancel = (e) => isPressing && up(e, "cancel");
  const up = (e, type) => {
    e.preventDefault();

    isDrawing = false;
    isPressing = false;

    const brush = lazy.getBrushCoordinates();
    lazy.update(brush, { both: true });

    savePath();
    dispatch("end", { text: "end!", payload, cancel: type === "cancel" });
  };

  const move = (e) => {
    if (!isPressing) return;
    e.preventDefault();

    const hasChanged = lazy.update(getInputCoords(e));
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

    dispatch("draw", { text: "draw!", payload });
  };

  // svelte-paint internal methods
  const savePath = () => {
    paths = [...paths, { ...brush, points: [...currentPath] }]; // instead of paths.push(payload)
    currentPath.length = 0;
    currentStep++;
    dispatch("savePath", { text: "savePath!", payload });
  };

  const clearCanvas = () => {
    const ctx = sc.getContext();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const drawPathsToStep = (step = currentStep) => {
    clearCanvas();
  };

  // svelte-paint external methods
  export const clear = () => {
    clearCanvas();
    savePath("clear"); // "clear" does nothing right now :D
  };

  export const canUndo = () => undoable;
  export const canRedo = () => redoable;

  export const undo = () => {
    if (!undoable) return;
    currentStep--;
    drawPathsToStep(currentStep);
  };

  export const redo = () => {
    if (!redoable) return;
    currentStep++;
    drawPathsToStep(currentStep);
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

  export const toDataURL = (type = "image/png", quality = 1) => {
    return sc.getCanvas().toDataURL(type, quality);
  };

  export const download = (
    type = "image/png",
    quality = 1,
    filename = "image.png"
  ) => {
    const a = document.createElement("a");
    a.href = toDataURL(type, quality);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.parentNode.removeChild(a);
  };

  export const play = () => {};
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

<pre>isPressing: {isPressing}</pre>
<pre>isDrawing: {isDrawing}</pre>
<pre>paths: {currentStep} / {paths.length}</pre>
<pre>mode: {mode}</pre>
<pre>size: {size}</pre>
<pre>color: {color}</pre>
<pre>cap: {cap}</pre>
<pre>currentPath.length: {currentPath.length}</pre>
