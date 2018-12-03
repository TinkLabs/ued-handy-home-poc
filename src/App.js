import * as React from 'react';
import { withCookies } from 'react-cookie';
import MainRouter from "./router/mainRouter"

// import pages
import './App.css';

class App extends React.Component {
	render() {
		return (
			<div>
                <MainRouter cookies={this.props.cookies} />
            </div>
		);
	}
}

export default withCookies(App);
