<script>
  import Paint from "$lib/Paint.svelte";
  import { onDestroy, onMount } from "svelte";
  import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
  import Debug from "../dev/Debug.svelte";
  import ControlBar from "../dev/ControlBar.svelte";
  import Nav from "../dev/Nav.svelte";

  let getCanvas,
    coords,
    paths,
    size,
    color,
    mode,
    cap,
    clear,
    undo,
    redo,
    saveProject,
    saveImage;

  $: brush = { size, color, mode, cap };

  // for drawing on mobile/iOS
  onMount(() => disableBodyScroll(getCanvas()));
  onDestroy(clearAllBodyScrollLocks);
</script>

<Nav />

<Paint
  width={100}
  height={100}
  responsive
  style="outline: 1px solid tomato;"
  bind:getCanvas
  bind:coords
  bind:paths
  bind:size
  bind:color
  bind:mode
  bind:cap
  bind:clear
  bind:undo
  bind:redo
/>

<ControlBar
  on:mode={(m) => (mode = m.detail)}
  on:sizeDec={() => size--}
  on:sizeInc={() => size++}
  on:color={(c) => (color = c.detail)}
  on:cap={(c) => (cap = c.detail)}
  on:clear={clear}
  on:undo={undo}
  on:redo={redo}
  on:saveProject={saveProject}
  on:saveImage={saveImage}
  on:loadProject={() => {}}
  on:loadImage={() => {}}
  on:playProject={() => {}}
  on:pauseProject={() => {}}
  on:runContextCB={() => {}}
/>

<Debug {coords} {paths} {brush} />
