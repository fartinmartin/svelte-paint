<script>
  import Paint from "$lib/Paint.svelte";

  // for mobile/iOS (otherwise body scrolls as you draw)
  import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
  import { onMount, onDestroy } from "svelte";
  onMount(() => disableBodyScroll(sc.getCanvas()));
  onDestroy(() => clearAllBodyScrollLocks());

  const setup = ({ context: ctx, width, height }) => {
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, width, height);
    ctx.fillRect(0, 0, width, height);
    ctx.fillRect(0, 0, width, height);
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "red";
    ctx.fillRect(90, 46.25, 20, 20);
  };
  let sc, sp;
</script>

<Paint
  width={600}
  height={200}
  style="width: 100%; margin: 0 auto; outline: 1px solid tomato;"
  {setup}
  bind:sc
  bind:this={sp}
  on:start={(e) => console.log(e.detail.text)}
  on:draw={(e) => console.log(e.detail.text)}
  on:end={(e) => console.log(e.detail.text)}
  on:cancel={(e) => console.log(e.detail.text)}
/>

<div>
  <div>
    <button on:click={sp.download}>dl</button>
  </div>
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
