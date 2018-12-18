import * as React from "react";

import PropTypes from 'prop-types';
const IProps = {
    LHS: PropTypes.string,
    RHS: PropTypes.string,
    tracker: PropTypes.object,
}

export default class ToolTips extends React.Component {
    constructor(props) {
        super(props)

        this.renderRHS = this.renderRHS.bind(this);
    }
    renderRHS() {
        if (typeof(this.props.iLink) !== "undefined") {
            return (
                <a
                    className="toolTips-RHS"
                    href={this.props.iLink}
                    onClick={this.props.RHSTracker}
                >
                    {this.props.RHS}
                </a>
            )
        } else {
            return (
                <div
                    className="toolTips-RHS toolTips-eta"
                >
                {
                    (this.props.iconPath) ? 
                        <img
                            src={this.props.iconPath}
                            alt="icon"
                            className="toolTips-icon"
                        /> : null
                }
                    <span>
                        {this.props.RHS}
                    </span>
                </div>
            )
        }
    }
    render() {
        return (
            <div
                className="toolTips"
                style={this.props.styles}
            >
                <div className="toolTips-LHS">
                    {this.props.LHS}
                </div>
                {
                    this.renderRHS()
                }
            </div>
        );
    }
}
ToolTips.propTypes = IProps;
