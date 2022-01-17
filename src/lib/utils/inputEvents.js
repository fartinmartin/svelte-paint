import { get } from "svelte/store";
import { isDrawing, coords } from "$lib/stores";
import getInputCoords from "./getInputCoords";

// set drawing state and dispatch saves to history
export const down = () => {
  isDrawing.true();

  const current = get(coords);
  coords.updateMid(current);
  coords.updateOld(current);
};

export const up = () => {
  // savePath();
  isDrawing.false();
};

export const move = (e) => {
  if (!get(isDrawing)) return;
  coords.updateCur(getInputCoords(e));
};

export const cancel = () => {
  // if (isDrawing) savePath();
  isDrawing.false();
};

// import { isDrawing } from "$lib/stores";
// import { coordsCurrent, coordsOld, coordsOldMid } from "$lib/stores/mouse";
// import { get } from "svelte/store";
// import getInputCoords from "./getInputCoords";

// // set drawing state and dispatch saves to history
// export const down = () => {
//   isDrawing.update((n) => (n = true));

//   const current = get(coordsCurrent);

//   coordsOld.update((n) => (n = current));
//   coordsOldMid.update((n) => (n = current));
//   console.log(get(coordsOld), get(coordsOldMid), get(coordsCurrent));
// };

// export const up = () => {
//   // savePath();
//   isDrawing.update((n) => (n = false));
// };

// export const move = (e) => {
//   if (!get(isDrawing)) return;
//   coordsCurrent.update((n) => (n = getInputCoords(e)));
// };

// export const cancel = () => {
//   // if (isDrawing) savePath();
//   isDrawing.update((n) => (n = false));
// };
