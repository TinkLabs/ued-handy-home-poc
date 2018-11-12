import * as React from "react";

import { connect } from 'react-redux';
import logo from "../images/logo.svg";

class PureHomePage extends React.Component {
	render() {
		return (
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
					</a>
			</header>
		)
	};
}

const mapStateToProps = (state) => {
	return {
		// 
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		// 
	};
}

const HomePage = connect(mapStateToProps, mapDispatchToProps)(PureHomePage);

export default HomePage;
