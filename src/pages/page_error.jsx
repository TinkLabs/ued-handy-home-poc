import * as React from "react";

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
		}
	}
	componentDidCatch(error, errorInfo) {
		console.log('caught')
		// Display fallback UI
		this.setState({ 
			error,
			errorInfo,
			hasError: true,
		});
		// You can also log the error to an error reporting service
		// logErrorToMyService(error, info);
	}
	render() {
		if (this.state.hasError) {
			return (
				<div className="errorPage">
					<div>
						{this.props.error && this.props.error.toString()}
					</div>
					<div>
						{this.props.errorInfo && this.props.errorInfo.componentStack}
					</div>
					<div>Sorry, something went wrong, please try again</div>
				</div>
			)
		}
		return this.props.children;
	}
}