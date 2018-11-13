import * as React from "react";

export default class PromotionBanner extends React.Component {
    render() {
        return (
            <div className="promotionBanner" key={this.props.id}>
                <img src={this.props.image} alt="banner"/>
            </div>
        )
    }
}