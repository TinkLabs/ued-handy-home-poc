import * as React from "react";
import PromotionTicket from "../promotionTicket/promotionTicket";
// import GoogleTagManager from "../googleTagManager/googleTagManager"
// import DFPAD from "../dfpManager/dfpManager"
import GPTAD from "../gptAD/gptAD"
import mixpanel from '../../utils/mixpanel';

export default class PromotionBanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ticketIcon: require("../../images/ticketIcon.svg"),
        }
        this.onClickADBanner = this.onClickADBanner.bind(this);
    }
    onClickADBanner() {
        mixpanel().track("Advertising Banner Click", {
            campaign_id: this.props.campaign_id,
            campaign_name: this.props.campaign_name,
            banner_id: this.props.banner_id,
            banner_name: this.props.banner_name,
            screen_name: this.props.screen_name,
        });
    }
    render() {
        // console.log(this.props.tickets)
        return (
            <div>
                <a
                    href={this.props.iLink}
                    onClick={this.onClickADBanner}
                >
                    <div className="gptAD">
                        <GPTAD
                            // adUnitPath={"/21623654641/Tinklabs/NHS-01"}
                            adUnitPath={"/21623654641/Test/Test-NHS-01"}
                            slotSize={[328, 210]}
                            // target={["lang", `${this.props.displayLanguage.toLowerCase()}`]}
                        />
                    </div>
                </a>
                <div className="tickets">
                    {
                        this.props.tickets.ADTicket.map((ticketInfo, i) => (
                            <PromotionTicket
                                { ...ticketInfo }
                                key={i}
                                ticketIcon={this.state.ticketIcon}
                                displayLanguage={this.props.displayLanguage}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}