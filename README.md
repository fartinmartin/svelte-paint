# svelte-paint

Hoping to combine (some of) the features of [`svelte-canvas`](https://www.npmjs.com/package/svelte-canvas), [`simple-drawing-board`](https://www.npmjs.com/package/simple-drawing-board), [`vb-canvas`](https://www.npmjs.com/package/vb-canvas), and [`lazy-brush`](https://www.npmjs.com/package/lazy-brush).

## Feature list

- [x] reactive canvas rendering<sup>\*</sup>
- [x] brush settings<sup>†</sup>
- [x] erase mode<sup>†</sup>
- [x] toDataURL<sup>†</sup>
- [x] ResizeObserver for responsive canvas<sup>‡</sup>
- [x] smooth/lazy brush<sup>‖</sup>
- [ ] history<sup>†</sup>
- [ ] fill/paint bucket mode
- [ ] save/load history (aka path(s) data)
- [ ] drawing playback

<sup>courtesy of or inspired by <sup>\*</sup>`svelte-canvas`, <sup>†</sup>`simple-drawing-board`, <sup>‡</sup>`vb-canvas` (via `@fartinmartin/svelte-canvas`), <sup>‖</sup>`lazy-brush`</sup>

## API

### Parameters

| parameter                 | type                                  | default                   | description                                                                                                                        |
| ------------------------- | ------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `width`<sup>\*</sup>      | `Number`                              | `640`                     | `<canvas>` element's width                                                                                                         |
| `height`<sup>\*</sup>     | `Number`                              | `640`                     | `<canvas>` element's height                                                                                                        |
| `pixelRatio`<sup>\*</sup> | `Number`                              | `window.devicePixelRatio` | `<canvas>` element's [pixel density](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio#Examples).           |
| `style`<sup>\*</sup>      | `String`                              | `null`                    | CSS style string to be applied to the `<canvas>` element                                                                           |
| `setup`<sup>\*</sup>      | `({context, width, height}) => {...}` | `null`                    | A function that is called once at initialization (see [`svelte-canvas`'s Layer doc](https://github.com/dnass/svelte-canvas#layer)) |

<sup><sup>\*</sup>`svelte-canvas` API pass-through, except for `autoclear` which must be `false` in order for your drawing to persist.</sup>

### Methods

| method                      | param types                                                                             | description                                                       |
| --------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `getCanvas()`<sup>\*</sup>  |                                                                                         | Returns `<canvas>` element                                        |
| `getContext()`<sup>\*</sup> |                                                                                         | Returns `<canvas>` element's 2D rendering context                 |
| `redraw()`<sup>\*</sup>     |                                                                                         | Forces a re-render of the canvas                                  |
| `setMode(mode)`             | `"draw"` \| `"erase"` \| `"fill"`                                                       | Sets drawing mode                                                 |
| `setColor(color)`           | `String`                                                                                | Sets brush color                                                  |
| `setSize(size)`             | `Number`                                                                                | Sets brush size                                                   |
| `decSize()`                 |                                                                                         | Decrements the brush size                                         |
| `incSize()`                 |                                                                                         | Increments the brush size                                         |
| `setCap(cap)`               | `"round"` \| `"butt"` \| `"square"`                                                     | Sets brush cap style                                              |
| `undo()`                    |                                                                                         | TODO: Steps back in the path history                              |
| `redo()`                    |                                                                                         | TODO: Steps forward in the path history                           |
| `clear()`                   |                                                                                         | Clears the canvas (a "clear" "path" is added to the path history) |
| `save()`                    |                                                                                         | TODO: Exports the current history                                 |
| `load(history)`             | `History`<sup>†</sup>                                                                   | TODO: Imports a history                                           |
| `toDataURL(type, options)`  | See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL) | Shortcut to canvas.toDataURL API                                  |
| `play()`                    |                                                                                         | TODO: Plays histroy from step 0                                   |
| `pause()`                   |                                                                                         | TODO: Pauses `play()` at current step                             |
| `goto(step)`                | `Number`                                                                                | TODO: Instantly paints history to passed step                     |

<sup><sup>\*</sup>`svelte-canvas` API pass-through. <sup>†</sup>`History` object is yet to be defined.</sup>

### Events

| event         | payload       | description                               |
| ------------- | ------------- | ----------------------------------------- |
| `on:start`    | `{ payload }` | Input down. Receive payload :)            |
| `on:draw`     | `{ payload }` | Input move. Receive payload :)            |
| `on:end`      | `{ payload }` | Input up. Receive payload :)              |
| `on:cancel`   | `{ payload }` | Input cancel. Receive payload :)          |
| `on:savePath` | `{ payload }` | Path saved to history. Receive payload :) |
