export const WARRIOR = "WARRIOR";
export const RANGER = "RANGER";
export const MYSTIC = "MYSTIC";
export const MAGE = "MAGE";

export const URUK = 0;
export const ORC = 1;

function RClass(profs = [0, 0, 0, 0]) {
	const self = {};

	const warrior = parseInt(profs[0], 10) || 0;
	const ranger = parseInt(profs[1], 10) || 0;
	const mystic = parseInt(profs[2], 10) || 0;
	const mage = parseInt(profs[3], 10) || 0;

	function isEqual(rClass) {
		return rClass.getPoints(WARRIOR) === warrior
			&& rClass.getPoints(RANGER) === ranger
			&& rClass.getPoints(MYSTIC) === mystic
			&& rClass.getPoints(MAGE) === mage;
	}

	function toJSON() {
		return [warrior, ranger, mystic, mage];
	}

	function getTotal() {
		return warrior + ranger + mystic + mage;
	}

	function getRemaining() {
		return 150 - getTotal();
	}

	function getPoints(prof) {
		switch (prof) {
			case WARRIOR: return warrior;
			case RANGER: return ranger;
			case MYSTIC: return mystic;
			case MAGE: return mage;
			default:
		}

		return 0;
	}

	function getCoefficient(prof) {
		return 10 * Math.sqrt(getPoints(prof));
	}

	function getLevel(prof, race) {
		const level = (3 * getCoefficient(prof)) / 10;

		if (race === ORC) {
			return Math.floor((2 * level) / 3);
		} else if (race === URUK && prof === MAGE) {
			return Math.floor(level - 3);
		}

		return Math.floor(level);
	}

	function setPoints(prof, points) {
		switch (prof) {
			case WARRIOR: return RClass([points, ranger, mystic, mage]);
			case RANGER: return RClass([warrior, points, mystic, mage]);
			case MYSTIC: return RClass([warrior, ranger, points, mage]);
			case MAGE: return RClass([warrior, ranger, mystic, points]);
			default:
		}

		return self;
	}

	function setLevel(prof, level, race) {
		if (race === ORC) {
			return setLevel(prof, (3 * level) / 2);
		}

		if (race === URUK && prof === MAGE) {
			return setLevel(prof, level + 3);
		}

		return setPoints(prof, Math.ceil((level / 3) ** 2));
	}

	function optimize(race) {
		return setLevel(WARRIOR, getLevel(WARRIOR, race), race)
			.setLevel(RANGER, getLevel(RANGER, race), race)
			.setLevel(MYSTIC, getLevel(MYSTIC, race), race)
			.setLevel(MAGE, getLevel(MAGE, race), race);
	}

	return Object.freeze(Object.assign(self, {
		isEqual,
		toJSON,
		getTotal,
		getRemaining,
		getPoints,
		getCoefficient,
		getLevel,
		setPoints,
		setLevel,
		optimize
	}));
}

export default RClass;
