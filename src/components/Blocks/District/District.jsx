import * as React from "react";
import PropTypes from 'prop-types';

import ToolTips from "components/ToolTips/ToolTips";
import MainPosterBanner from "components/MainPosterBanner/MainPosterBanner";
import ScrollBanner from "components/ScrollBanner/ScrollBanner";

const IProps = {
    toolTips: PropTypes.object,
    toDo: PropTypes.object,
    banner: PropTypes.object,
}

export default class District extends React.Component {
    render() {
        const imagePath = require(`images/${this.props.districtContent.mainSpot.image}`);
        return (
            <div className="district">
                <ToolTips
                    // string
                    LHS={this.props.districtContent.district}
                    // text, icon
                    RHS={this.props.districtContent.eta}
                />
                <MainPosterBanner
                    // img-path, styles, trackers, iLink
                    bannerInfo={{
                        ...this.props.districtContent.mainSpot,
                        path: `url(${imagePath})`,
                        styles: {
                            marginBottom: "0.5rem",
                        }
                    }}
                />
                <ScrollBanner
                    sliderSettings={{
                        slidesToShow: 2.5,
                    }}
                    // title, iLink, type, time, img, tracker
                    content={this.props.districtContent.otherSpot}
                />
                <div
                    className="seeMoreOn"
                >
                    See More On {this.props.districtContent.district}
                </div>
            </div>
        )
    }
}

District.propTypes = IProps;