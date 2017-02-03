import RClass, {
	URUK,
	ORC
} from "../rclass";

import {
	RESET,
	LOAD,
	LOAD_HASH,

	SET_POINTS,
	SET_LEVEL,
	SET_URUK_LEVEL,
	SET_ORC_LEVEL,

	OPTIMIZE,
	OPTIMIZE_URUK,
	OPTIMIZE_ORC
} from "../actions/rcd";

function loadHash(hash) {
	try {
		return RClass(JSON.parse(hash.slice(1)));
	} catch (e) {
		return RClass();
	}
}

export default function rcd(state = RClass(), {
	type,
	preset,
	hash,
	prof,
	value
}) {
	switch (type) {
		case RESET: return RClass();
		case LOAD: return preset;
		case LOAD_HASH: return loadHash(hash);

		case SET_POINTS: return state.setPoints(prof, value);
		case SET_LEVEL: return state.setLevel(prof, value);
		case SET_URUK_LEVEL: return state.setLevel(prof, value, URUK);
		case SET_ORC_LEVEL: return state.setLevel(prof, value, ORC);

		case OPTIMIZE: return state.optimize();
		case OPTIMIZE_URUK: return state.optimize(URUK);
		case OPTIMIZE_ORC: return state.optimize(ORC);

		default:
	}

	return state;
}
