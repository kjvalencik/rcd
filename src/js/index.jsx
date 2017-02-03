import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./containers/app";
import configureStore from "./store/configure-store";
import { loadHash } from "./actions/rcd";
import rcd from "./reducers/rcd";

function updateURLHash({ rcd : r }) {
	global.location.hash = JSON.stringify(r.toJSON());
}

const store = configureStore({
	rcd : rcd({}, loadHash(global.location.hash))
});

// TODO: Should this be somewhere else?
// Side-effect driven hash store
store.subscribe(() => updateURLHash(store.getState()));
global.addEventListener("hashchange", () => (
	store.dispatch(loadHash(global.location.hash))
));

render(
	<Provider store={store}>
		<App />
	</Provider>,
	global.document.getElementById("designer")
);
