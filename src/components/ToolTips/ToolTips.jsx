import * as React from "react";
import mixpanel from 'utils/mixpanel';

import PropTypes from 'prop-types';
const IProps = {
    LHS: PropTypes.string,
    RHS: PropTypes.object,
    tracker: PropTypes.object,
}

export default class ToolTips extends React.Component {
    constructor(props) {
        super(props)

        this.renderRHS = this.renderRHS.bind(this);
    }
    renderRHS() {
        if (this.props.RHS.iLink !== undefined) {
            return (
                <a
                    className="toolTips-RHS"
                    href={this.props.RHS.iLink}
                    onClick={() => {
                        mixpanel().track(this.props.RHS.tracker.name, {
                            click_type: this.props.RHS.tracker.click_type
                        });
                    }}
                >
                    {this.props.RHS.text}
                </a>
            )
        } else if (this.props.RHS.transport) {
            const iconPath = require(`images/eta_${this.props.RHS.transport}.svg`);
            const etaText = `${this.props.RHS.duration} from hotel`
            return (
                <div
                    className="toolTips-RHS toolTips-eta"
                >
                    <img
                        src={iconPath}
                        alt="icon"
                        className="toolTips-icon"
                    />
                    <span>
                        {etaText}
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
