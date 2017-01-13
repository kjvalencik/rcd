import {
	RESET,

	SET_POINTS,
	SET_LEVEL,
	SET_URUK_LEVEL,
	SET_ORC_LEVEL,

	WARRIOR,
	RANGER,
	MYSTIC,
	MAGE
} from "../actions/rcd";

const URUK_MAGE_MALUS = 3;
const ORC_MALUS = 2 / 3;

function getPoints(prev, next) {
	if (next < 1) {
		return prev < next ? 1 : 0;
	}

	return Math.ceil(next);
}

function getPointsNext(state, prof, points) {
	switch (prof) {
		case WARRIOR:
			return Object.assign({}, state, {
				warrior : getPoints(state.warrior, points)
			});
		case RANGER:
			return Object.assign({}, state, {
				ranger : getPoints(state.ranger, points)
			});
		case MYSTIC:
			return Object.assign({}, state, {
				mystic : getPoints(state.mystic, points)
			});
		case MAGE:
			return Object.assign({}, state, {
				mage : getPoints(state.mage, points)
			});
		default:
	}

	return state;
}

function getRemaining({ warrior, ranger, mystic, mage }) {
	return 150 - warrior - ranger - mystic - mage;
}

function setPoints(state, prof, points) {
	const next = getPointsNext(state, prof, points);
	const remaining = getRemaining(next);

	return remaining < 0 ? state : next;
}

function setLevel(state, prof, level) {
	const points = (level / 3) ** 2;

	return setPoints(state, prof, points);
}

function setUrukLevel(state, prof, urukLevel) {
	const level = prof === MAGE ? urukLevel + URUK_MAGE_MALUS : urukLevel;

	return setLevel(state, prof, level);
}

function setOrcLevel(state, prof, orcLevel) {
	const level = orcLevel / ORC_MALUS;

	return setLevel(state, prof, level);
}

function getDefaults(name = "") {
	return {
		name,
		warrior : 0,
		ranger  : 0,
		mystic  : 0,
		mage    : 0
	};
}

export default function rcd(state = getDefaults(), { type, prof, value }) {
	switch (type) {
		case RESET: return getDefaults(state.name);
		case SET_POINTS: return setPoints(state, prof, value);
		case SET_LEVEL: return setLevel(state, prof, value);
		case SET_URUK_LEVEL: return setUrukLevel(state, prof, value);
		case SET_ORC_LEVEL: return setOrcLevel(state, prof, value);
		default:
	}

	return state;
}
