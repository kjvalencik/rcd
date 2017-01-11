import test from "ava";

import RClass, {
	WARRIOR,
	RANGER,
	MYSTIC,
	MAGE
} from "../src/js/rclass";

test("should be able to initialize from array", (t) => {
	const r = RClass([1, 2, 3, 4]);

	t.deepEqual(r.toJSON(), [1, 2, 3, 4]);
});

test("should be able to set points", (t) => {
	const r = RClass()
		.setPoints(WARRIOR, 100)
		.setPoints(RANGER, 25)
		.setPoints(MYSTIC, 9)
		.setPoints(MAGE, 1);

	t.is(r.getLevel(WARRIOR), 30);
	t.is(r.getLevel(RANGER), 15);
	t.is(r.getLevel(MYSTIC), 9);
	t.is(r.getLevel(MAGE), 3);
});

test("should be able to set levels", (t) => {
	const r = RClass()
		.setLevel(WARRIOR, 30)
		.setLevel(RANGER, 15)
		.setLevel(MYSTIC, 9)
		.setLevel(MAGE, 3);

	t.is(r.getPoints(WARRIOR), 100);
	t.is(r.getPoints(RANGER), 25);
	t.is(r.getPoints(MYSTIC), 9);
	t.is(r.getPoints(MAGE), 1);
});

test("should be able to get orc levels", (t) => {
	const r = RClass([100, 25, 9, 1]);

	t.is(r.getOrcLevel(WARRIOR), 20);
	t.is(r.getOrcLevel(RANGER), 10);
	t.is(r.getOrcLevel(MYSTIC), 6);
	t.is(r.getOrcLevel(MAGE), 2);
});

test("should be able to get uruk levels", (t) => {
	const r = RClass([100, 25, 9, 1]);

	t.is(r.getUrukLevel(WARRIOR), 30);
	t.is(r.getUrukLevel(RANGER), 15);
	t.is(r.getUrukLevel(MYSTIC), 9);
	t.is(r.getUrukLevel(MAGE), 0);
});

test("should be able to orc levels", (t) => {
	const r = RClass()
		.setOrcLevel(WARRIOR, 20)
		.setOrcLevel(RANGER, 10)
		.setOrcLevel(MYSTIC, 6)
		.setOrcLevel(MAGE, 2);

	t.deepEqual(r.toJSON(), [100, 25, 9, 1]);
});

test("should be able to uruk levels", (t) => {
	const r = RClass()
		.setUrukLevel(WARRIOR, 30)
		.setUrukLevel(RANGER, 15)
		.setUrukLevel(MYSTIC, 9)
		.setUrukLevel(MAGE, 0);

	t.deepEqual(r.toJSON(), [100, 25, 9, 1]);
});

test("should get total points used", (t) => {
	const r = RClass([1, 2, 3, 4]);

	t.is(r.getTotal(), 10);
});

test("should get remaining points", (t) => {
	const r = RClass([1, 2, 3, 4]);

	t.is(r.getRemaining(), 140);
});
