import React, { PropTypes, Component } from "react";

import {
	WARRIOR,
	RANGER,
	MYSTIC,
	MAGE,

	URUK,
	ORC
} from "../rclass";

const RClass = PropTypes.shape({
	getLevel       : PropTypes.func.isRequired,
	getPoints      : PropTypes.func.isRequired,
	getCoefficient : PropTypes.func.isRequired,
	getTotal       : PropTypes.func.isRequired,
	getRemaining   : PropTypes.func.isRequired
});

class RInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isFocused : false,
			value     : props.value
		};
	}

	onChange(event) {
		this.setState(Object.assign({}, this.state, {
			value : event.target.value
		}));

		this.props.onChange(event);
	}

	onFocus() {
		this.setState(Object.assign({}, this.state, {
			isFocused : true,
			value     : this.props.value
		}));
	}

	onBlur() {
		this.setState(Object.assign({}, this.state, {
			isFocused : true,
			value     : this.props.value
		}));
	}

	render() {
		const { isFocused } = this.state;
		const { min, max } = this.props;

		return (
			<input
				type="number"
				min={min}
				max={max}
				value={isFocused ? this.state.value : this.props.value}
				onFocus={() => this.onFocus()}
				onBlur={() => this.onBlur()}
				onChange={ev => this.onChange(ev)}
			/>
		);
	}
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
	rcd,
	setPoints,
	setLevel,
	setUrukLevel,
	setOrcLevel,
	optimize,
	optimizeOrc,
	optimizeUruk
}) {
	function onChange(method) {
		return ({ target : { value } }) => {
			const val = parseInt(value, 10) || 0;

			return method(prof, val);
		};
	}

	const maxLevel = 36;
	const maxPoints = 150;
	const minUrukLevel = prof === MAGE ? -3 : 0;
	const maxUrukLevel = prof === MAGE ? maxLevel - 3 : maxLevel;
	const maxOrcLevel = (2 * maxLevel) / 3;

	return (
		<tr>
			<th>{label}</th>
			<td>
				<RInput
					max={maxLevel}
					value={rcd.getLevel(prof)}
					onChange={onChange(setLevel)}
					onBlur={optimize}
				/>
			</td>
			<td>
				<RInput
					max={maxPoints}
					value={rcd.getPoints(prof)}
					onChange={onChange(setPoints)}
				/>
			</td>
			<td>
				<RView value={rcd.getCoefficient(prof)} />
			</td>
			<td>
				<RInput
					min={minUrukLevel}
					max={maxUrukLevel}
					value={rcd.getLevel(prof, URUK)}
					onChange={onChange(setUrukLevel)}
					onBlur={optimizeUruk}
				/>
			</td>
			<td>
				<RInput
					max={maxOrcLevel}
					value={rcd.getLevel(prof, ORC)}
					onChange={onChange(setOrcLevel)}
					onBlur={optimizeOrc}
				/>
			</td>
		</tr>
	);
}

RRow.propTypes = {
	rcd          : RClass.isRequired,
	label        : PropTypes.string.isRequired,
	prof         : PropTypes.string.isRequired,
	setPoints    : PropTypes.func.isRequired,
	setLevel     : PropTypes.func.isRequired,
	setUrukLevel : PropTypes.func.isRequired,
	setOrcLevel  : PropTypes.func.isRequired,
	optimize     : PropTypes.func.isRequired,
	optimizeOrc  : PropTypes.func.isRequired,
	optimizeUruk : PropTypes.func.isRequired
};

function RCD({
	rcd,
	reset,
	setPoints,
	setLevel,
	setUrukLevel,
	setOrcLevel,
	optimize,
	optimizeOrc,
	optimizeUruk
}) {
	const setters = {
		setPoints,
		setLevel,
		setUrukLevel,
		setOrcLevel,
		optimize,
		optimizeOrc,
		optimizeUruk
	};

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
					rcd={rcd}
				/>
				<RRow
					{...setters}
					label="Ranger"
					prof={RANGER}
					rcd={rcd}
				/>
				<RRow
					{...setters}
					label="Mystic"
					prof={MYSTIC}
					rcd={rcd}
				/>
				<RRow
					{...setters}
					label="Mage"
					prof={MAGE}
					rcd={rcd}
				/>
			</tbody>
			<tfoot>
				<tr>
					<th>Total</th>
					<td />
					<td><RView value={rcd.getTotal()} /></td>
				</tr>
				<tr>
					<th>Remaining</th>
					<td />
					<td><RView value={rcd.getRemaining()} /></td>
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
	setOrcLevel  : PropTypes.func.isRequired,
	optimize     : PropTypes.func.isRequired,
	optimizeOrc  : PropTypes.func.isRequired,
	optimizeUruk : PropTypes.func.isRequired
};

export default RCD;
