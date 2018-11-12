import * as React from "react";
import {
	BrowserRouter as Router,
	// Link,
	// Route,
	// Redirect,
	Switch,
} from "react-router-dom";

import HomePage from "../pages/page_home";

class MainRouter extends React.Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Switch>
						<HomePage />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default MainRouter;