import { createStore } from "redux";

import reducer from "../reducers";

export default function configureStore(initialState) {
	const store = createStore(reducer, initialState);

	if (module.onReload) {
		module.onReload(() => {
			// eslint-disable-next-line global-require
			const nextReducer = require("../reducers");

			store.replaceReducer(nextReducer.default || nextReducer);

			return true;
		});
	}

	return store;
}
