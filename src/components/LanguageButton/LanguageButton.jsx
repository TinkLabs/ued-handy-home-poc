import * as React from "react";

export default class LanguageButton extends React.Component {
    constructor(props) {
        super(props);
        this.selected = this.props.selected ? "selected" : "";
        this.onClick = this.onClick.bind(this);
    }

    onClick = (e) => {
        // this.props.onClickMixpanel();
        this.props.onClick(this.props.locale);
    }
    shouldComponentUpdate(nextProps) {
        if (this.props.selected !== nextProps.selected) {
            this.selected = nextProps.selected ? "selected" : "";
            return true;
        }
        return false;
    }
    render() {
        return (
            <div className={`langBtnWrapper ${this.selected}`}>
                <span
                    className=""
                    onClick={this.onClick}
                >
                    {this.props.language}
                </span>
            </div>
        )
    }
}