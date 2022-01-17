// // ⚠️ not working :(

// import { cap, color, size, isDrawing, mode } from "$lib/stores";
// import { coordsCurrent, coordsOld, coordsOldMid } from "$lib/stores/mouse";
// import { get } from "svelte/store";

// export const render = ({ context: ctx }) => {
//   console.log("hi");
//   if (!get(isDrawing)) return;

//   const old = get(coordsOld);
//   const oldMid = get(coordsOldMid);
//   const current = get(coordsCurrent);
//   const currentMid = getMidInputCoords(old, current);

//   if (get(mode) !== "fill") {
//     ctx.globalCompositeOperation =
//       get(mode) === "erase" ? "destination-out" : "source-over";

//     ctx.lineWidth = get(size);
//     ctx.lineCap = get(cap);
//     ctx.strokeStyle = get(color);

//     ctx.beginPath();
//     ctx.moveTo(currentMid.x, currentMid.y);
//     ctx.quadraticCurveTo(old.x, old.y, oldMid.x, oldMid.y);
//     ctx.stroke();
//   } else {
//     console.log("fill mode", current);
//   }

//   // why does this happen here, and not in an input up/down event listener? bc it has to happen after the drawing? bc we need access to currentMid?
//   coordsOld.update((n) => (n = get(coordsCurrent)));
//   coordsOldMid.update((n) => (n = currentMid));
// };
