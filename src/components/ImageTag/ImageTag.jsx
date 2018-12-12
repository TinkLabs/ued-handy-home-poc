import * as React from "react";

export default class ImageTag extends React.Component {
    render() {
        return (
            <div className="image-tag-container" style={this.props.style}>
                <span className="image-tag-text">{(this.props.text) ? this.props.text.toUpperCase() : ""}</span>
            </div>
        )
    }
}