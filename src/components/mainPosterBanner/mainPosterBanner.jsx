import * as React from "react";
import mixpanel from 'utils/mixpanel';
// import env from '';

export default class MainPosterBanner extends React.Component {
    render() {
        const banner = this.props.bannerInfo;
        const topBannerStyle = {
            ...banner.styles,
            backgroundImage: banner.path,
        }
        return (
            <a
                href={banner.iLink}
                onClick={() => {
                    if (this.props.tracking) {
                        mixpanel().track("POI Click", {
                            item: banner.item,
                            item_id: banner.item_id,
                            item_type: banner.item_type,
                            item_position: banner.item_position,
                        });
                    }
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