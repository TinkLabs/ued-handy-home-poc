import * as React from "react";

export default class ErrorPage extends React.Component {
	render() {
		return (
			<div className="errorPage">
				<div>
					{this.props.error && this.props.error.toString()}
				</div>
				<div>
					{this.props.errorInfo && this.props.errorInfo.componentStack}
				</div>
			</div>
		)
	}
}
