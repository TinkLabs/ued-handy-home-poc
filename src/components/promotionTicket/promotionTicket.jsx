import * as React from "react";
import mixpanel from '../../utils/mixpanel';

export default class PromotionTickets extends React.Component {
    render() {
        let book = "";
        if (this.props.displayLanguage === "en_US") {
            book = "BOOK";
        } else if (this.props.displayLanguage === "zh_TW") {
            book = "預 訂";
        } else if (this.props.displayLanguage === "zh_CN") {
            book = "预 订";
        }
        return (
            <a
                href={this.props.iLink}
                className="promotionTicketATag"
                onClick={() => {
                    mixpanel().track("Deal Click", {
                        item: this.props.item,
                        item_id: this.props.item_id,
                        item_type: this.props.item_type,
                        item_position: this.props.ticket_ID,
                    });
                }}
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
                            <span>{this.props.salesRecord}</span>
                        </div>
                    </div>
                    <div className="bookTicketButton">
                        <p>{book}</p>
                    </div>
                </div>
            </a>
        )
    }
}