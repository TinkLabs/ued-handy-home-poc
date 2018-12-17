import * as React from "react";
// import mixpanel from 'utils/mixpanel';

export default class MainPosterBanner extends React.Component {
    render() {
        const banner = this.props.bannerInfo;
        const topBannerStyle = {
            ...banner.styles,
            backgroundImage: banner.path,
        }
        return (
            <a
                className={`main-poster-banner-wrapper ${(this.props.shade ? "mainPosterBanner-shade" : "")}`}
                href={banner.iLink}
                onClick={() => {
                    if (this.props.tracker) {
                        // this.props.tracker();
                    }
                }}
            >
                <div 
                    className="mainPosterBanner"
                    style={topBannerStyle}
                />
                {
                    (this.props.children) ?
                    this.props.children : null
                }
            </a>
        )
    }
}