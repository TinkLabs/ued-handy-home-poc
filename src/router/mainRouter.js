import * as React from "react";
import {
	BrowserRouter as Router,
	// Link,
	// Route,
	// Redirect,
	Switch,
	Route,
} from "react-router-dom";
import { withCookies } from 'react-cookie';

import HomePage from "pages/page_home";
import ErrorBoundary from "pages/page_error";

class MainRouter extends React.Component {
	render() {
		return (
			<ErrorBoundary>
				<Router>
					<div className="App">
						<Switch>
							<Route
								path="/"
								render={() => (<HomePage cookies={this.props.cookies} />)}
							/>
						</Switch>
					</div>
				</Router>
			</ErrorBoundary>
		);
	}
}

export default withCookies(MainRouter);