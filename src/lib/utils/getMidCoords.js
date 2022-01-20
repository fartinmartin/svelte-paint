// https://github.com/leader22/simple-drawing-board.js/blob/master/src/utils/dom.js
export default function getMidCoords(p1, p2) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2,
  };
}
