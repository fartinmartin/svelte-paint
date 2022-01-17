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

| parameter                 | default                   | description                                                                                             |
| ------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------- |
| `width`<sup>\*</sup>      | 640                       | Canvas width                                                                                            |
| `height`<sup>\*</sup>     | 640                       | Canvas height                                                                                           |
| `pixelRatio`<sup>\*</sup> | `window.devicePixelRatio` | Canvas [pixel ratio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio#Examples) |
| `style`<sup>\*</sup>      | `null`                    | A CSS style string which will be applied to the canvas element                                          |
| `size`                    | 10                        | Brush size                                                                                              |
| `color`                   | "tomato"                  | CSS color value                                                                                         |
| `mode`                    | "draw"                    | "draw" \| "erase" \| "fill"                                                                             |
| `cap`                     | "round"                   | "round" \| "butt" \| "square"                                                                           |

<sup><sup>\*</sup>`svelte-canvas` API pass-through, except for `autoclear` which must be `false` in order for your drawing to persist.</sup>

### Methods

| method                    | description                                                             |
| ------------------------- | ----------------------------------------------------------------------- |
| `getCanvas`<sup>\*</sup>  | Returns a reference to the canvas DOM element                           |
| `getContext`<sup>\*</sup> | Returns the canvas's 2D rendering context                               |
| `redraw`<sup>\*</sup>     | Forces a re-render of the canvas                                        |
| `undo`                    | TODO: Steps back in the path history                                    |
| `redo`                    | TODO: Steps forward in the path history                                 |
| `clear`                   | TODO: Clears the canvas (a "clear" "path" is added to the path history) |
| `save`                    | TODO: Exports the current history                                       |
| `load`                    | TODO: Imports a history                                                 |
| `toDataURL`               | TODO: canvas.toDataURL API                                              |
| `play`                    | TODO: Plays histroy from step 0                                         |
| `pause`                   | TODO: Pauses `play()` at current step                                   |

<sup><sup>\*</sup>`svelte-canvas` API pass-through.</sup>
