export const RESET = "RESET";
export const LOAD = "LOAD";

export const SET_POINTS = "SET_POINTS";
export const SET_LEVEL = "SET_LEVEL";
export const SET_URUK_LEVEL = "SET_URUK_LEVEL";
export const SET_ORC_LEVEL = "SET_ORC_LEVEL";

export const WARRIOR = "WARRIOR";
export const RANGER = "RANGER";
export const MYSTIC = "MYSTIC";
export const MAGE = "MAGE";

export function reset() {
	return { type : RESET };
}

export function load(preset) {
	return { type : LOAD, preset };
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
