import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RCD from "../components/rcd";
import * as RCDActions from "../actions/rcd";

// Must be a component for livereactload
// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
	render() {
		return (
			<div>
				<h1>Return of the Shadow</h1>
				<h2>Class Designer</h2>
				<RCD {...this.props} />
			</div>
		);
	}
}

function mapStateToProps({ rcd }) {
	return {
		rcd
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(RCDActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
