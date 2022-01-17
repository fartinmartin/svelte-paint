<script>
  export let coords, paths, brush;
</script>

<div class="debug">
  <div>
    <h3>coords</h3>
    <pre>{JSON.stringify(coords, null, 2)}</pre>
  </div>
  <div>
    <h3>paths</h3>
    <pre>{JSON.stringify(paths, null, 2)}</pre>
  </div>
  <div>
    <h3>brush</h3>
    <pre>{JSON.stringify(brush, null, 2)}</pre>
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
