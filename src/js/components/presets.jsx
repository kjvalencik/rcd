import React, { PropTypes } from "react";

import categories from "../presets";

function RClass({ load, name, coeffs : [warrior, ranger, mystic, mage] }) {
	const preset = {
		name,
		warrior,
		ranger,
		mystic,
		mage
	};

	function onClick() {
		return load(preset);
	}

	return (
		<li><button onClick={onClick}>{name}</button></li>
	);
}

RClass.propTypes = {
	load   : PropTypes.func.isRequired,
	name   : PropTypes.string.isRequired,
	coeffs : PropTypes.arrayOf(PropTypes.number).isRequired
};

function Category({ load, label, classes }) {
	return (
		<li>
			<h3>{label}</h3>
			<ul>
				{classes.map(({ name, coeffs }) => (
					<RClass
						key={name}
						load={load}
						name={name}
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
		<ul>
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
