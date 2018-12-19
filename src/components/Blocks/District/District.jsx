import * as React from "react";
import PropTypes from 'prop-types';
import VisibilitySensor from "react-visibility-sensor";

import ToolTips from "components/ToolTips/ToolTips";
import MainPosterBanner from "components/MainPosterBanner/MainPosterBanner";
import ScrollBanner from "components/ScrollBanner/ScrollBanner";

import t from "translation/translate";
import mixpanel from "utils/mixpanel";

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
                            // console.log('Content Impression', 
                            // this.props.districtContent.mainSpot.name,
                            // this.props.districtContent.mainSpot.tracker.content_id,
                            // this.props.districtContent.mainSpot.tracker.content_type,
                            // this.props.displayLanguage,
                            // this.props.districtContent.mainSpot.tracker.content_position,
                            // this.props.districtContent.district,
                            // this.props.districtContent.mainSpot.iLink,
                            // );
                            mixpanel().track("Content Impression", {
                                "content_title": this.props.districtContent.mainSpot.name,
                                "content_id": this.props.districtContent.mainSpot.tracker.content_id,
                                "content_type": this.props.districtContent.mainSpot.tracker.content_type,
                                "content_locale": this.props.displayLanguage,
                                "content_position": this.props.districtContent.mainSpot.tracker.content_position,
                                "content_location": this.props.districtContent.district,
                            });
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
                            // console.log('Listing Banner Click', 
                            // this.props.districtContent.mainSpot.name,
                            // this.props.districtContent.mainSpot.tracker.content_id,
                            // this.props.districtContent.mainSpot.tracker.content_type,
                            // this.props.displayLanguage,
                            // this.props.districtContent.mainSpot.tracker.content_position,
                            // this.props.districtContent.district)
                            mixpanel().track("Listing Banner Click", {
                                "content_title": this.props.districtContent.mainSpot.name,
                                "content_id": this.props.districtContent.mainSpot.tracker.content_id,
                                "content_type": this.props.districtContent.mainSpot.tracker.content_type,
                                "content_locale": this.props.displayLanguage,
                                "content_position": this.props.districtContent.mainSpot.tracker.content_position,
                                "content_location": this.props.districtContent.district,
                            });
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
                    district={this.props.districtContent.district}
                    content={this.props.districtContent.otherSpot}
                    displayLanguage={this.props.displayLanguage}
                />
                <div className="seeMoreOn">
                    <a
                        href={this.props.districtContent.seeMoreOn.iLink}
                        onClick={() => {
                            // console.log('see-more', this.props.districtContent.district, this.props.districtContent.seeMoreOn.iLink);
                            mixpanel().track("Homepage Click", {
                                "click_type": "see-more",
                                "content_location": this.props.districtContent.district,
                            });
                        }}
                    >{seeMore}</a>
                </div>
            </div >
        )
    }
}

District.propTypes = IProps;