import * as React from "react";

export default class LanguageButton extends React.Component {
    constructor(props) {
        super(props);
        this.selected = this.props.selected ? "selected" : null;
    }

    render() {
        return (
            <div className={`langBtnWrapper ${this.selected}`}>
                <a href="sth" className="">{this.props.language}</a>
            </div>
        )
    }
}