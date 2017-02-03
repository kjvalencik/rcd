export const RESET = "RESET";
export const LOAD = "LOAD";
export const LOAD_HASH = "LOAD_HASH";

export const SET_POINTS = "SET_POINTS";
export const SET_LEVEL = "SET_LEVEL";
export const SET_URUK_LEVEL = "SET_URUK_LEVEL";
export const SET_ORC_LEVEL = "SET_ORC_LEVEL";

export const OPTIMIZE = "OPTIMIZE";
export const OPTIMIZE_URUK = "OPTIMIZE_URUK";
export const OPTIMIZE_ORC = "OPTIMIZE_ORC";

export function reset() {
	return { type : RESET };
}

export function load(preset) {
	return { type : LOAD, preset };
}

export function loadHash(hash) {
	return { type : LOAD_HASH, hash };
}

export function setPoints(prof, value) {
	return { type : SET_POINTS, prof, value };
}

export function setLevel(prof, value) {
	return { type : SET_LEVEL, prof, value };
}

export function setUrukLevel(prof, value) {
	return { type : SET_URUK_LEVEL, prof, value };
}

export function setOrcLevel(prof, value) {
	return { type : SET_ORC_LEVEL, prof, value };
}

export function optimize() {
	return { type : OPTIMIZE };
}

export function optimizeUruk() {
	return { type : OPTIMIZE_URUK };
}

export function optimizeOrc() {
	return { type : OPTIMIZE_ORC };
}
