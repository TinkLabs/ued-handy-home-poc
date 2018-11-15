import * as React from "react";
// import mixpanel from '../../utils/mixpanel';

export default class PromotionTickets extends React.Component {
    render() {
        return (
            <a
                href={this.props.iLink}
                className="promotionTicketATag"
                // onClick={() => {
                //     mixpanel().track("Advertising Banner Click", {
                //         campaign_id: this.props.campaign_id
                //         campaign_name: this.props.campaign_name
                //         banner_id: this.props.banner_id
                //         banner_name: this.props.banner_name
                //         screen_name: this.props.screen_name
                //     });
                // }}
            >
                <div
                    className="promotionTicket"
                    key={this.props.ticket_ID}
                >
                    <div className="ticketInfo">
                        <div className="dealName">{this.props.dealName}</div>
                        <div className="pricings">
                            <span className="sellingPrice">{this.props.sellingPrice}</span>
                            <span className="originalPrice">{this.props.originalPrice}</span>
                        </div>
                        <div className="salesRecord">
                            <img
                                src={this.props.ticketIcon}
                                alt="ticketIcon"
                                className=""
                            />
                            <span>${this.props.salesRecord}</span>
                        </div>
                    </div>
                    <div className="bookTicketButton">
                        <span>BOOK</span>
                    </div>
                </div>
            </a>
        )
    }
}