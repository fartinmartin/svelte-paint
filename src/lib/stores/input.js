import { derived, writable } from "svelte/store";

export const isDrawing = (() => {
  const { subscribe, set, update } = writable(false);

  return {
    subscribe,
    false: () => update((state) => (state = false)),
    true: () => update((state) => (state = true)),
  };
})();

export const coords = (() => {
  const { subscribe, set, update } = writable({
    old: { x: 0, y: 0 },
    mid: { x: 0, y: 0 },
    cur: { x: 0, y: 0 },
  });

  return {
    subscribe,
    updateOld: (c) => update((state) => ({ ...state, old: c })),
    updateMid: (c) => update((state) => ({ ...state, mid: c })),
    updateCur: (c) => update((state) => ({ ...state, cur: c })),
  };
})();

export const mid = derived(coords, ($coords) => ({
  x: ($coords.old.x + $coords.cur.x) >> 1,
  y: ($coords.old.y + $coords.cur.y) >> 1,
}));
// getMidInputCoords($coords.old, $coords.cur); 
