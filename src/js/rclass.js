export const WARRIOR = 0;
export const RANGER = 1;
export const MYSTIC = 2;
export const MAGE = 3;

const MAX_POINTS = 150;
const URUK_MAGE_MALUS = 3;
const ORC_SCALE = 2 / 3;

export default function RClass(initialClassPoints = [0, 0, 0, 0]) {
	const self = {};
	const classPoints = [...initialClassPoints];

	function getUrukMalus(type) {
		return type === MAGE ? URUK_MAGE_MALUS : 0;
	}

	function getPoints(type) {
		return classPoints[type];
	}

	function getCoefficient(type) {
		const points = getPoints(type);

		return 10 * Math.sqrt(points);
	}

	function getLevelInternal(type, { scale = 1, malus = 0 } = {}) {
		const points = getCoefficient(type);

		return Math.floor((3 * scale * points) / 10) - malus;
	}

	function getLevel(type) {
		return getLevelInternal(type);
	}

	function getOrcLevel(type) {
		return getLevelInternal(type, { scale : ORC_SCALE });
	}

	function getUrukLevel(type) {
		return getLevelInternal(type, { malus : getUrukMalus(type) });
	}

	function setPoints(type, points) {
		classPoints[type] = points;

		return self;
	}

	function setLevelInternal(type, level, { scale = 1, malus = 0 } = {}) {
		classPoints[type] = Math.ceil(((level + malus) / (3 * scale)) ** 2);

		return self;
	}

	function setLevel(type, level) {
		return setLevelInternal(type, level);
	}

	function setOrcLevel(type, level) {
		return setLevelInternal(type, level, { scale : ORC_SCALE });
	}

	function setUrukLevel(type, level) {
		return setLevelInternal(type, level, { malus : getUrukMalus(type) });
	}

	function getTotal() {
		return classPoints.reduce((y, x) => y + x);
	}

	function getRemaining() {
		return MAX_POINTS - getTotal();
	}

	function toJSON() {
		return [...classPoints];
	}

	return Object.assign(self, {
		getPoints,
		getCoefficient,
		getLevel,
		getOrcLevel,
		getUrukLevel,
		getTotal,
		getRemaining,
		setPoints,
		setLevel,
		setOrcLevel,
		setUrukLevel,
		toJSON
	});
}
