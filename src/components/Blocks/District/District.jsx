import * as React from "react";
import PropTypes from 'prop-types';
import VisibilitySensor from "react-visibility-sensor";

import ToolTips from "components/ToolTips/ToolTips";
import MainPosterBanner from "components/MainPosterBanner/MainPosterBanner";
import ScrollBanner from "components/ScrollBanner/ScrollBanner";

import t from "translation/translate";

const IProps = {
    availableLanguage: PropTypes.array,
    displayLanguage: PropTypes.string,
    districtContent: PropTypes.object,
}

export default class District extends React.Component {
    render() {
        const locale = this.props.displayLanguage;
        const isChinese = (locale === "zh_TW") || (locale === "zh_CN");

        const imagePath = require(`images/${this.props.districtContent.mainSpot.image}`);
        const iconPath = require(`images/eta_${this.props.districtContent.eta.transport}.svg`);
        let etaText = "";
        switch (locale) {
            case "en_US": {
                etaText = `${this.props.districtContent.eta.duration} from hotel`;
                break;
            }
            case "zh_CN": {
                etaText = `距离酒店 ${this.props.districtContent.eta.duration} 分钟`;
                break;
            }
            case "zh_TW": {
                etaText = `距離酒店 ${this.props.districtContent.eta.duration} 分鐘`;
                break;
            }
            default: {
                break
            }
        }

        const seeMore = t(`SEE MORE ON ${this.props.districtContent.district.toUpperCase()}`, locale);

        return (
            <div className="district">
                <ToolTips
                    // string
                    LHS={t(this.props.districtContent.district, locale)}
                    // text, icon
                    RHS={etaText}
                    iconPath={iconPath}
                    displayLanguage={this.props.displayLanguage}
                />
                <VisibilitySensor
                    onChange={(isVisible) => {
                        if (isVisible) {
                            // mixpanel().track("Screen View", {
                            //     "Screen Name": "Home",
                            //     screen_number: 2,
                            // });
                        }
                    }}
                >
                    <MainPosterBanner
                        // img-path, styles, trackers, iLink
                        bannerInfo={{
                            ...this.props.districtContent.mainSpot,
                            path: `url(${imagePath})`,
                        }}
                        // darken bg
                        shade
                        // track click
                        tracker={() => {
                            // mixpanel().track("POI Click", {
                            //     item: banner.item,
                            //     item_id: banner.item_id,
                            //     item_type: banner.item_type,
                            //     item_position: banner.item_position,
                            // });
                        }}
                    >
                        <div className={`district-banner 
                            ${(isChinese) ? "district-banner-zh" : ""} 
                            ${(this.props.districtContent.mainSpot.name === "Fashion Walk" && isChinese) ? "fashion-walk" : ""}`}
                        >
                            <div className="district-banner-name">{t(this.props.districtContent.mainSpot.name, locale)}</div>
                            <div className="district-banner-desc">{t(this.props.districtContent.mainSpot.description, locale)}</div>
                        </div>
                    </MainPosterBanner>
                </VisibilitySensor>
                <ScrollBanner
                    sliderSettings={{
                        slidesToShow: 2.5,
                    }}
                    // title, iLink, type, time, img, tracker
                    content={this.props.districtContent.otherSpot}
                    displayLanguage={this.props.displayLanguage}
                />
                <div
                    className="seeMoreOn"
                >
                    <a
                        href={this.props.districtContent.seeMoreOn.iLink}
                        onClick={() => {
                            // mixpanel().track("POI Click", {
                            //     item: banner.item,
                            //     item_id: banner.item_id,
                            //     item_type: banner.item_type,
                            //     item_position: banner.item_position,
                            // });
                        }}
                    >{seeMore}</a>
                </div>
            </div >
        )
    }
}

District.propTypes = IProps;