<script>
  import Paint from "$lib/Paint.svelte";

  // for mobile/iOS (otherwise body scrolls as you draw)
  import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
  import { onMount, onDestroy } from "svelte";
  onMount(() => disableBodyScroll(sc.getCanvas()));
  onDestroy(() => clearAllBodyScrollLocks());

  let sc, sp;
</script>

<Paint
  width={300}
  height={100}
  style="outline: 1px solid tomato;"
  bind:sc
  bind:this={sp}
  on:start={(e) => console.log(e.detail.text)}
  on:draw={(e) => console.log(e.detail.text)}
  on:end={(e) => console.log(e.detail.text)}
  on:cancel={(e) => console.log(e.detail.text)}
/>

<div>
  <div>
    <button on:click={() => sp.setMode("draw")}>draw</button>
    <button on:click={() => sp.setMode("erase")}>erase</button>
    <button on:click={() => sp.setMode("fill")}>fill</button>
  </div>
  <div>
    <button on:click={() => sp.setCap("round")}>round</button>
    <button on:click={() => sp.setCap("butt")}>butt</button>
  </div>
  <div>
    <button on:click={() => sp.setSize(5)}>size 5</button>
    <button on:click={sp.decSize}>size -</button>
    <button on:click={sp.incSize}>size +</button>
  </div>
  <div>
    <button on:click={() => sp.setColor("tomato")}>tomato</button>
    <button on:click={() => sp.setColor("blue")}>blue</button>
  </div>
  <div>
    <button on:click={sp.clear}>clear</button>
    <button on:click={sp.undo} disabled>undo</button>
    <button on:click={sp.redo} disabled>redo</button>
  </div>
  <div>
    <button on:click={sp.save} disabled>save</button>
    <button on:click={sp.load} disabled>load</button>
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
