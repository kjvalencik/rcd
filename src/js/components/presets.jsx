import React, { PropTypes } from "react";

import RClass from "../rclass";
import categories from "../presets";

function Preset({ load, name, coeffs }) {
	const preset = RClass(coeffs);

	function onClick() {
		return load(preset);
	}

	return (
		<li className="preset">
			<button onClick={onClick}>{name}</button>
		</li>
	);
}

Preset.propTypes = {
	load   : PropTypes.func.isRequired,
	name   : PropTypes.string.isRequired,
	coeffs : PropTypes.arrayOf(PropTypes.number).isRequired
};

function Category({ load, label, classes }) {
	return (
		<li>
			<h3>{label}</h3>
			<ul className="presets">
				{classes.map(({ name, coeffs }) => (
					<Preset
						key={name}
						name={name}
						load={load}
						coeffs={coeffs}
					/>
				))}
			</ul>
		</li>
	);
}

Category.propTypes = {
	label   : PropTypes.string.isRequired,
	load    : PropTypes.func.isRequired,
	classes : PropTypes.arrayOf(PropTypes.shape({
		name   : PropTypes.string.isRequired,
		coeffs : PropTypes.arrayOf(PropTypes.number).isRequired
	})).isRequired
};

function Presets({ load }) {
	return (
		<ul className="preset-categories">
			{categories.map(({ category, classes }) => (
				<Category
					key={category}
					load={load}
					label={category}
					classes={classes}
				/>
			))}
		</ul>
	);
}

Presets.propTypes = {
	load : PropTypes.func.isRequired
};

export default Presets;
