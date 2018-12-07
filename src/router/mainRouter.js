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
import ErrorPage from "pages/page_error";

class MainRouter extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			error: null,
			errorInfo: null,
		}
	}
	componentDidCatch(error, errorInfo) {
		console.log('caught')
		// Display fallback UI
		this.setState({ error, errorInfo });
		// You can also log the error to an error reporting service
		// logErrorToMyService(error, info);
	  }
	render() {
		if (this.state.error) {
			return (
				<ErrorPage 
					error={this.state.error}
					errorInfo={this.state.errorInfo}
				/>
			)
		} else {
			return (
				<Router>
					<div className="App">
						<Switch>
							<Route
								path="/"
								render={()=>(<HomePage cookies={this.props.cookies} />)}
							/>
						</Switch>
					</div>
				</Router>
			);
		}
	}
}

export default withCookies(MainRouter);