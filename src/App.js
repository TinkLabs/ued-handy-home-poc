import * as React from 'react';
import { connect } from "react-redux";
import MainRouter from "./router/mainRouter"

// import pages
import './App.css';

class PureApp extends React.Component {
	render() {
		return (
			<div>
				<MainRouter />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		//
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		// 
	}
}

const App = connect(mapStateToProps, mapDispatchToProps)(PureApp);

export default App;
