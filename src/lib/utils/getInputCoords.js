// https://github.com/leader22/simple-drawing-board.js/blob/master/src/utils/dom.js
import getWindowToCanvas from "./getWindowToCanvas";
import isTouch from "./isTouch";

export default function getInputCoords(e) {
  let x, y;

  if (isTouch()) {
    x = e.touches[0].pageX;
    y = e.touches[0].pageY;
  } else {
    x = e.pageX;
    y = e.pageY;
  }

  return getWindowToCanvas(e.target, x, y);
}
