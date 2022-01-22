<script>
  import Paint from "$lib/Paint.svelte";

  // for mobile/iOS (otherwise body scrolls as you draw)
  import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
  import { onMount, onDestroy } from "svelte";
  onMount(() => disableBodyScroll(sc.getCanvas()));
  onDestroy(() => clearAllBodyScrollLocks());

  let sc,
    sp,
    mode = "draw",
    color = "tomato",
    cap = "round",
    size = 10;
  $: brush = { mode, color, cap, size };
</script>

<Paint
  width={600}
  height={200}
  {...brush}
  style="width: 100%; margin: 0 auto; outline: 1px solid tomato;"
  bind:sc
  bind:this={sp}
  on:start={(e) => console.log(e.detail.text)}
  on:draw={(e) => console.log(e.detail.text)}
  on:end={(e) => console.log(e.detail.text)}
/>

<div>
  <div>
    <button on:click={sp.download}>dl</button>
  </div>
  <div>
    <button on:click={() => (mode = "draw")}>draw</button>
    <button on:click={() => (mode = "erase")}>erase</button>
    <button on:click={() => (mode = "fill")}>fill</button>
  </div>
  <div>
    <button on:click={() => (cap = "round")}>round</button>
    <button on:click={() => (cap = "butt")}>butt</button>
  </div>
  <div>
    <button on:click={() => (size = 5)}>size 5</button>
    <button on:click={() => size--}>size -</button>
    <button on:click={() => size++}>size +</button>
  </div>
  <div>
    <button on:click={() => (color = "tomato")}>tomato</button>
    <button on:click={() => (color = "blue")}>blue</button>
  </div>
  <div>
    <button on:click={sp.clear}>clear</button>
    <button on:click={sp.undo}>undo</button>
    <button on:click={sp.redo}>redo</button>
  </div>
  <div>
    <button on:click={sp.save} disabled>save</button>
    <button on:click={sp.load} disabled>load</button>
  </div>
  <div>
    <button on:click={() => sp.play()}>play</button>
    <button on:click={() => sp.pause()} disabled>pause</button>
  </div>
</div>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  button {
    margin: 0.25rem;
  }
</style>
