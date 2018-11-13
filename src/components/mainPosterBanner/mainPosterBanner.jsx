import * as React from "react";

export default class MainPosterBanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topBannerStyle: {
                backgroundImage: `url(${require("../../images/top-banner-set/drawable-hdpi/top_banner.png")})`,
            }
        }
    }
    render() {
        return (
            <div 
                className="mainPosterBanner"
                style={this.state.topBannerStyle}
            />
        )
    }
}