<script>
  import Paint from "$lib/Paint.svelte";
  import { onDestroy, onMount } from "svelte";
  import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
  import Debug from "../dev/Debug.svelte";
  import ControlBar from "../dev/ControlBar.svelte";
  import Nav from "../dev/Nav.svelte";
  import { size } from "lodash-es";
  import { get } from "svelte/store";

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

<button on:click={() => canvas.setMode("draw")}>draw</button>
<button on:click={() => canvas.setMode("erase")}>erase</button>
<button on:click={() => canvas.setMode("fill")}>fill</button>
<button on:click={() => canvas.setSize(5)}>size 5</button>
<button on:click={canvas.decrementSize}>size -</button>
<button on:click={canvas.incrementSize}>size +</button>
<button on:click={() => canvas.setColor("blue")}>blue</button>
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
