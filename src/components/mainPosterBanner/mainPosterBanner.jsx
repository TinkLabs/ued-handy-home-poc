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
                        item: banner.item,
                        item_id: banner.item_id,
                        item_type: banner.item_type,
                        item_position: banner.item_position,
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