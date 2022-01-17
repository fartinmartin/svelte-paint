import { writable } from "svelte/store";

export const mode = writable("draw");

export const size = writable(10);

export const color = writable("tomato");

export const cap = writable("round");
