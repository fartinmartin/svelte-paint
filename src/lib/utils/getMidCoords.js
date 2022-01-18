// https://github.com/leader22/simple-drawing-board.js/blob/master/src/utils/dom.js
export default function getMidCoords(old, coords) {
  return {
    x: (old.x + coords.x) >> 1,
    y: (old.y + coords.y) >> 1,
  };
}
