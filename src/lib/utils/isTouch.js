// https://github.com/leader22/simple-drawing-board.js/blob/master/src/utils/dom.js
export default function isTouch() {
  return "ontouchstart" in window.document;
}
