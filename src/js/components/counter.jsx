import React, { PropTypes } from "react";

function Counter({ increment, decrement, counter }) {
	return (
		<p>
			Clicked: {counter} times
			{" "}
			<button onClick={increment}>+</button>
			{" "}
			<button onClick={decrement}>-</button>
		</p>
	);
}

Counter.propTypes = {
	increment : PropTypes.func.isRequired,
	decrement : PropTypes.func.isRequired,
	counter   : PropTypes.number.isRequired
};

export default Counter;
