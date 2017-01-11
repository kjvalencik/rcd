import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Counter from "../components/counter";
import * as CounterActions from "../actions/counter";

// Must be a component for livereactload
// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
	render() {
		return (
			<div>
				<h1>Return of the Shadow</h1>
				<h2>Class Designer</h2>
				<Counter {...this.props} />
			</div>
		);
	}
}

App.propTypes = {
	increment : PropTypes.func.isRequired,
	decrement : PropTypes.func.isRequired,
	counter   : PropTypes.number.isRequired
};

function mapStateToProps(state) {
	return {
		counter : state.counter
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
