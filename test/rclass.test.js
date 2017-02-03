import test from "ava";

import RClass, {
	WARRIOR,
	RANGER,
	MYSTIC,
	MAGE,
	URUK,
	ORC
} from "../src/js/rclass";

test("should initialize empty class", (t) => {
	t.deepEqual(RClass().toJSON(), [0, 0, 0, 0]);
});

test("should validate numbers on class", (t) => {
	t.deepEqual(RClass().toJSON(), [0, 0, 0, 0]);
});

test("should be able to compare identical coeffs", (t) => {
	t.true(RClass([1, 2, 3, 4]).isEqual(RClass([1, 2, 3, 4])));
	t.false(RClass([1, 2, 3, 4]).isEqual(RClass([0, 2, 3, 4])));
});

test("should be able to get total and remaining points", (t) => {
	const r = RClass([1, 2, 3, 4]);

	t.is(r.getTotal(), 10);
	t.is(r.getRemaining(), 140);
});

test("should be able to get points", (t) => {
	const r = RClass([1, 2, 3, 4]);

	t.is(r.getPoints(WARRIOR), 1);
	t.is(r.getPoints(RANGER), 2);
	t.is(r.getPoints(MYSTIC), 3);
	t.is(r.getPoints(MAGE), 4);
	t.is(r.getPoints(NaN), 0);
});

test("should be able to get coefficients", (t) => {
	const r = RClass([100, 25, 16, 9]);

	t.is(r.getCoefficient(WARRIOR), 100);
	t.is(r.getCoefficient(RANGER), 50);
	t.is(r.getCoefficient(MYSTIC), 40);
	t.is(r.getCoefficient(MAGE), 30);
});

test("should be able to get levels", (t) => {
	const r = RClass([100, 25, 16, 9]);

	t.is(r.getLevel(WARRIOR), 30);
	t.is(r.getLevel(RANGER), 15);
	t.is(r.getLevel(MYSTIC), 12);
	t.is(r.getLevel(MAGE), 9);
});

test("should be able to get uruk levels", (t) => {
	const r = RClass([100, 25, 16, 9]);

	t.is(r.getLevel(WARRIOR, URUK), 30);
	t.is(r.getLevel(RANGER, URUK), 15);
	t.is(r.getLevel(MYSTIC, URUK), 12);
	t.is(r.getLevel(MAGE, URUK), 6);
});

test("should be able to get orc levels", (t) => {
	const r = RClass([100, 25, 16, 9]);

	t.is(r.getLevel(WARRIOR, ORC), 20);
	t.is(r.getLevel(RANGER, ORC), 10);
	t.is(r.getLevel(MYSTIC, ORC), 8);
	t.is(r.getLevel(MAGE, ORC), 6);
});

test("should be able to set points", (t) => {
	const r = RClass()
		.setPoints(WARRIOR, 100)
		.setPoints(RANGER, 25)
		.setPoints(MYSTIC, 16)
		.setPoints(MAGE, 9)
		.setPoints(NaN, 1000);

	t.deepEqual(r.toJSON(), [100, 25, 16, 9]);
});

test("should be able to set level", (t) => {
	const r = RClass()
		.setLevel(WARRIOR, 30)
		.setLevel(RANGER, 15)
		.setLevel(MYSTIC, 12)
		.setLevel(MAGE, 9);

	t.deepEqual(r.toJSON(), [100, 25, 16, 9]);
});

test("should be able to set uruk levels", (t) => {
	const r = RClass()
		.setLevel(WARRIOR, 30, URUK)
		.setLevel(RANGER, 15, URUK)
		.setLevel(MYSTIC, 12, URUK)
		.setLevel(MAGE, 6, URUK);

	t.deepEqual(r.toJSON(), [100, 25, 16, 9]);
});

test("should be able to set orc levels", (t) => {
	const r = RClass()
		.setLevel(WARRIOR, 20, ORC)
		.setLevel(RANGER, 10, ORC)
		.setLevel(MYSTIC, 8, ORC)
		.setLevel(MAGE, 6, ORC);

	t.deepEqual(r.toJSON(), [100, 25, 16, 9]);
});

test("should be able to optimize points", (t) => {
	const r = RClass([57, 57, 57, 57]).optimize();

	t.deepEqual(r.toJSON(), [54, 54, 54, 54]);
});

test("should be able to optimize points for orc", (t) => {
	const r = RClass([58, 58, 58, 58]).optimize(ORC);

	t.deepEqual(r.toJSON(), [57, 57, 57, 57]);
});
