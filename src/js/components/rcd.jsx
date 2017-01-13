import React, { PropTypes } from "react";

import {
	WARRIOR,
	RANGER,
	MYSTIC,
	MAGE
} from "../actions/rcd";

const RClass = PropTypes.shape({
	name    : PropTypes.string.isRequired,
	warrior : PropTypes.number.isRequired,
	ranger  : PropTypes.number.isRequired,
	mystic  : PropTypes.number.isRequired,
	mage    : PropTypes.number.isRequired
});

function RInput({ min, max, value, onChange }) {
	return (
		<input
			type="number"
			min={min}
			max={max}
			value={value}
			onChange={onChange}
			onBlur={onChange}
		/>
	);
}

RInput.defaultProps = {
	min : 0
};

RInput.propTypes = {
	min      : PropTypes.number,
	max      : PropTypes.number.isRequired,
	value    : PropTypes.number.isRequired,
	onChange : PropTypes.func.isRequired
};

function RView({ value }) {
	return (
		<input
			type="number"
			min={0}
			max={150}
			value={value}
			readOnly="readonly"
		/>
	);
}

RView.propTypes = {
	value : PropTypes.number.isRequired
};

function RRow({
	label,
	prof,
	points,
	setPoints,
	setLevel,
	setUrukLevel,
	setOrcLevel
}) {
	function onChange(method) {
		return ({ target : { value } }) => {
			const val = parseInt(value, 10) || 0;

			return method(prof, val);
		};
	}

	const maxLevel = 36;
	const maxPoints = 150;

	const coeff = 10 * Math.sqrt(points);
	const level = Math.floor((3 * coeff) / 10);

	const minUrukLevel = prof === MAGE ? -3 : 0;
	const maxUrukLevel = prof === MAGE ? maxLevel - 3 : maxLevel;
	const urukLevel = prof === MAGE ? level - 3 : level;

	const maxOrcLevel = (2 * maxLevel) / 3;
	const orcLevel = Math.floor((2 * level) / 3);

	return (
		<tr>
			<th>{label}</th>
			<td>
				<RInput
					max={maxLevel}
					value={level}
					onChange={onChange(setLevel)}
				/>
			</td>
			<td>
				<RInput
					max={maxPoints}
					value={points}
					onChange={onChange(setPoints)}
				/>
			</td>
			<td>
				<RView value={coeff} />
			</td>
			<td>
				<RInput
					min={minUrukLevel}
					max={maxUrukLevel}
					value={urukLevel}
					onChange={onChange(setUrukLevel)}
				/>
			</td>
			<td>
				<RInput
					max={maxOrcLevel}
					value={orcLevel}
					onChange={onChange(setOrcLevel)}
				/>
			</td>
		</tr>
	);
}

RRow.propTypes = {
	label        : PropTypes.string.isRequired,
	prof         : PropTypes.string.isRequired,
	points       : PropTypes.number.isRequired,
	setPoints    : PropTypes.func.isRequired,
	setLevel     : PropTypes.func.isRequired,
	setUrukLevel : PropTypes.func.isRequired,
	setOrcLevel  : PropTypes.func.isRequired
};

function RCD({
	rcd : {
		warrior,
		ranger,
		mystic,
		mage
	},
	reset,
	setPoints,
	setLevel,
	setUrukLevel,
	setOrcLevel
}) {
	const pointsUsed = warrior + ranger + mystic + mage;
	const pointsRemaining = 150 - pointsUsed;
	const setters = { setPoints, setLevel, setUrukLevel, setOrcLevel };

	return (
		<table>
			<thead>
				<tr>
					<th />
					<th>Level</th>
					<th>Points</th>
					<th>Coefficient</th>
					<th>Uruk-Hai</th>
					<th>Orc</th>
				</tr>
			</thead>
			<tbody>
				<RRow
					{...setters}
					label="Warrior"
					prof={WARRIOR}
					points={warrior}
				/>
				<RRow
					{...setters}
					label="Ranger"
					prof={RANGER}
					points={ranger}
				/>
				<RRow
					{...setters}
					label="Mystic"
					prof={MYSTIC}
					points={mystic}
				/>
				<RRow
					{...setters}
					label="Mage"
					prof={MAGE}
					points={mage}
				/>
			</tbody>
			<tfoot>
				<tr>
					<th>Total</th>
					<td />
					<td><RView value={pointsUsed} /></td>
				</tr>
				<tr>
					<th>Remaining</th>
					<td />
					<td><RView value={pointsRemaining} /></td>
				</tr>
				<tr>
					<td />
					<td />
					<td><button onClick={reset}>Clear</button></td>
				</tr>
			</tfoot>
		</table>
	);
}

RCD.propTypes = {
	rcd          : RClass.isRequired,
	reset        : PropTypes.func.isRequired,
	setPoints    : PropTypes.func.isRequired,
	setLevel     : PropTypes.func.isRequired,
	setUrukLevel : PropTypes.func.isRequired,
	setOrcLevel  : PropTypes.func.isRequired
};

export default RCD;
