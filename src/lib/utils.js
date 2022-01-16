export function getMidInputCoords(old, coords) {
  return {
    x: (old.x + coords.x) >> 1,
    y: (old.y + coords.y) >> 1,
  };
}

export function isTouch() {
  return "ontouchstart" in window.document;
}

export function getInputCoords(e) {
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

export function getWindowToCanvas(canvas, x, y) {
  var rect = canvas.getBoundingClientRect();
  var screenX = (x - rect.left) * (canvas.width / rect.width);
  var screenY = (y - rect.top) * (canvas.height / rect.height);

  const ctx = canvas.getContext("2d");
  var transform = ctx.getTransform();
  if (transform.isIdentity) {
    return {
      x: screenX,
      y: screenY,
    };
  } else {
    const invMat = transform.invertSelf();
    return {
      x: Math.round(screenX * invMat.a + screenY * invMat.c + invMat.e),
      y: Math.round(screenX * invMat.b + screenY * invMat.d + invMat.f),
    };
  }
}

export function preventScrolling(params, canvas) {
  document.body.addEventListener(
    "touchstart",
    function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
    },
    false
  );
  document.body.addEventListener(
    "touchend",
    function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
    },
    false
  );
  document.body.addEventListener(
    "touchmove",
    function (e) {
      if (e.target == canvas) {
        e.preventDefault();
      }
    },
    false
  );
}
