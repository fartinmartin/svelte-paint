# svelte-paint

Hoping to combine (some of) the features of [`svelte-canvas`](https://www.npmjs.com/package/svelte-canvas), [`simple-drawing-board`](https://www.npmjs.com/package/simple-drawing-board), and [`vb-canvas`](https://www.npmjs.com/package/vb-canvas).

## Feature list

- [x] reactive canvas rendering<sup>\*</sup>
- [x] brush settings<sup>†</sup>
- [x] erase mode<sup>†</sup>
- [ ] toDataURL<sup>†</sup>
- [ ] history<sup>†</sup>
- [ ] ResizeObserver for responsive canvas<sup>‡</sup>
- [ ] fill/paint bucket mode
- [ ] save/load history (aka path(s) data)
- [ ] drawing playback

<sup>courtesy of or inspired by <sup>\*</sup>`svelte-canvas`, <sup>†</sup>`simple-drawing-board`, <sup>‡</sup>`vb-canvas`</sup>

## API

### Parameters

| parameter                 | type                                  | default                   | description                                                                                                                        |
| ------------------------- | ------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `width`<sup>\*</sup>      | `Number`                              | `640`                     | `<canvas>` element's width                                                                                                         |
| `height`<sup>\*</sup>     | `Number`                              | `640`                     | `<canvas>` element's height                                                                                                        |
| `pixelRatio`<sup>\*</sup> | `Number`                              | `window.devicePixelRatio` | [Pixel density](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio#Examples) of the `<canvas>` element       |
| `style`<sup>\*</sup>      | `String`                              | `null`                    | CSS style string to be applied to the `<canvas>` element                                                                           |
| `setup`<sup>\*</sup>      | `({context, width, height}) => {...}` | `null`                    | A function that is called once at initialization (see [`svelte-canvas`'s Layer doc](https://github.com/dnass/svelte-canvas#layer)) |
| `mode`                    | `"draw"` \| `"erase"` \| `"fill"`     | `"draw"`                  | Drawing mode for the brush                                                                                                         |
| `size`                    | `Number`                              | `10`                      | CanvasRenderingContext2D [lineWidth](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth)          |
| `color`                   | `String`                              | `"tomato"`                | CanvasRenderingContext2D [strokeStyle](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle)      |
| `cap`                     | `"round"` \| `"butt"` \| `"square"`   | `"round"`                 | CanvasRenderingContext2D [lineCap style](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap)        |

<sup><sup>\*</sup>`svelte-canvas` API pass-through, except for `autoclear` which must be `false` in order for your drawing to persist.</sup>

### Methods

| method                      | param types                                                                             | description                                                             |
| --------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `getCanvas()`<sup>\*</sup>  |                                                                                         | Returns a reference to the `<canvas>` element                           |
| `getContext()`<sup>\*</sup> |                                                                                         | Returns the `<canvas>` element's 2D rendering context                   |
| `redraw()`<sup>\*</sup>     |                                                                                         | Forces a re-render of the canvas                                        |
| `setMode(mode)`             | `"draw"` \| `"erase"` \| `"fill"`                                                       | TODO: Sets drawing mode                                                 |
| `setColor(color)`           | `String`                                                                                | TODO: Sets brush color                                                  |
| `setSize(size)`             | `Number`                                                                                | TODO: Sets brush size                                                   |
| `setCap(cap)`               | `"round"` \| `"butt"` \| `"square"`                                                     | TODO: Sets brush cap style                                              |
| `undo()`                    |                                                                                         | TODO: Steps back in the path history                                    |
| `redo()`                    |                                                                                         | TODO: Steps forward in the path history                                 |
| `clear()`                   |                                                                                         | TODO: Clears the canvas (a "clear" "path" is added to the path history) |
| `save()`                    |                                                                                         | TODO: Exports the current history                                       |
| `load(history)`             | `History`<sup>†</sup>                                                                   | TODO: Imports a history                                                 |
| `toDataURL(type, options)`  | See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL) | TODO: canvas.toDataURL API                                              |
| `play()`                    |                                                                                         | TODO: Plays histroy from step 0                                         |
| `pause()`                   |                                                                                         | TODO: Pauses `play()` at current step                                   |
| `goto(step)`                | `Number`                                                                                | TODO: Instantly paints history to passed step                           |

<sup><sup>\*</sup>`svelte-canvas` API pass-through.</sup>

<sup><sup>†</sup>`History` object is yet to be defined.</sup>
