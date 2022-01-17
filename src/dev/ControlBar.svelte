<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const mode = (mode) => dispatch("mode", mode);

  const sizeDec = () => dispatch("sizeDec", { text: "size dec!" });
  const sizeInc = () => dispatch("sizeInc", { text: "size inc!" });

  const color = (color) => dispatch("color", color);
  const cap = (cap) => dispatch("cap", cap);

  const clear = () => dispatch("clear", { text: "Hello!" });
  const undo = () => dispatch("undo", { text: "Hello!" });
  const redo = () => dispatch("redo", { text: "Hello!" });

  const saveProject = () => dispatch("saveProject", { text: "Hello!" });
  const saveImage = () => dispatch("saveImage", { text: "Hello!" });

  const loadProject = () => dispatch("loadProject", { text: "Hello!" });
  const loadImage = () => dispatch("loadImage", { text: "Hello!" });

  const playProject = () => dispatch("playProject", { text: "Hello!" });
  const pauseProject = () => dispatch("pauseProject", { text: "Hello!" });

  const runContextCB = () => dispatch("runContextCB", { text: "Hello!" });
</script>

<div>
  <div>
    <button on:click={() => mode("draw")}>draw</button>
    <button on:click={() => mode("erase")}>erase</button>
    <button on:click={() => mode("fill")}>fill</button>
  </div>

  <div>
    <button on:click={sizeDec}>size -</button>
    <button on:click={sizeInc}>size +</button>
  </div>

  <div>
    <button on:click={() => color("yellow")}>yellow</button>
    <button on:click={() => color("blue")}>blue</button>
    <button on:click={() => color("green")}>green</button>
    <button on:click={() => color("red")}>red</button>
  </div>

  <div>
    <button on:click={() => cap("round")}>round</button>
    <button on:click={() => cap("butt")}>butt</button>
    <button on:click={() => cap("square")}>square</button>
  </div>

  <div>
    <button on:click={clear}>clear</button>
  </div>

  <div>
    <button on:click={undo}>undo</button>
    <button on:click={redo}>redo</button>
  </div>

  <div>
    <button on:click={saveProject}>save project</button>
    <button on:click={saveImage}>save image</button>
  </div>

  <div>
    <button on:click={loadProject}>load project</button>
    <button on:click={loadImage}>load image</button>
  </div>

  <div>
    <button on:click={playProject}>play project</button>
    <button on:click={pauseProject}>pause project</button>
  </div>

  <div>
    <button on:click={runContextCB}>context callback</button>
  </div>
</div>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0.5rem;
  }
  button {
    margin: 0 0.25rem;
  }
</style>
