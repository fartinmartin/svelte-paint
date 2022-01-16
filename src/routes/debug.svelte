<script>
  import Paint from "$lib/Paint.svelte";
  import { onDestroy, onMount } from "svelte";
  import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

  let coords, paths;

  let getCanvas;
  onMount(() => disableBodyScroll(getCanvas()));
  onDestroy(clearAllBodyScrollLocks);
</script>

<Paint
  bind:getCanvas
  width={100}
  height={100}
  responsive
  bind:coords
  bind:paths
  style="outline: 1px solid tomato;"
/>

<div class="debug">
  <div>
    <h3>points</h3>
    <pre>{JSON.stringify(coords, null, 2)}</pre>
  </div>
  <div>
    <h3>paths</h3>
    <pre>{JSON.stringify(paths, null, 2)}</pre>
  </div>
</div>

<style>
  .debug {
    display: flex;
    font-family: "Menlo", "Courier New", Courier, monospace;
  }
  .debug div {
    width: 50%;
  }
  pre {
    overflow: scroll;
  }
</style>
