import * as React from "react";

export default class MainPosterBanner extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        const topBannerStyle = {
            backgroundImage: this.props.mainPosterBanner,
        }
        return (
            <div 
                className="mainPosterBanner"
                style={topBannerStyle}
            />
        )
    }
}