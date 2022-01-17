<script>
  import Paint from "$lib/Paint.svelte";
  import { onDestroy, onMount } from "svelte";
  import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
  import Debug from "../dev/Debug.svelte";
  import ControlBar from "../dev/ControlBar.svelte";
  import Nav from "../dev/Nav.svelte";

  let canvas;

  // $: brush = {
  //   size: paint.getSize(),
  //   color: paint.getColor(),
  //   mode: paint.getMode(),
  //   cap: paint.getCap(),
  // };

  // for drawing on mobile/iOS
  onMount(() => disableBodyScroll(canvas.getCanvas()));
  onDestroy(clearAllBodyScrollLocks);
</script>

<Nav />

<Paint
  width={300}
  height={100}
  style="outline: 1px solid tomato;"
  bind:this={canvas}
/>

<button on:click={canvas.clear}>clear</button>

<!-- <ControlBar
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
/> -->

<!-- <Debug {coords} {paths} {brush} /> -->
