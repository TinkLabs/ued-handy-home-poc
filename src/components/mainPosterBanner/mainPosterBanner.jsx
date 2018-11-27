import * as React from "react";
import mixpanel from '../../utils/mixpanel';

export default class MainPosterBanner extends React.Component {
    render() {
        const banner = this.props.mainPosterBanner;
        const topBannerStyle = {
            backgroundImage: banner.image,
        }
        return (
            <a
                href={banner.iLink}
                onClick={() => {
                    // if (window.Android) {window.Android.showToast(banner.iLink);}
                    mixpanel().track("POI Click", {
                        // item: this.props.bannerInfo.item,
                        // item_id: this.props.bannerInfo.item_id,
                        // item_type: this.props.bannerInfo.item_type,
                        // item_position: this.props.bannerInfo.item_position,
                        item: 'USS',
                        item_id: '7',
                        item_type: 'attractions',
                        item_position: '1',
                    });
                }}
            >
                <div 
                    className="mainPosterBanner"
                    style={topBannerStyle}
                />
            </a>
        )
    }
}