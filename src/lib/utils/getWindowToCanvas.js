// https://github.com/georgedoescode/VBCanvas/issues/2
export default function getWindowToCanvas(canvas, x, y) {
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
