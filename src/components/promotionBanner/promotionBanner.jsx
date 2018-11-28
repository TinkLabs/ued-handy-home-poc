import * as React from "react";
import PromotionTicket from "../promotionTicket/promotionTicket";
import GPTAD from "../gptAD/gptAD"
import mixpanel from '../../utils/mixpanel';

export default class PromotionBanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ticketIcon: require("../../images/ticketIcon.svg"),
        }
        this.onClickADBanner = this.onClickADBanner.bind(this);
        this.localeADReady = this.localeADReady.bind(this);
    }
    // fired after user click ad and right before redirect
    onClickADBanner(e) {
        mixpanel().track("Advertising Banner Click", {
            campaignid: this.props.adInfo.campaignid,
            campaignname: this.props.adInfo.campaignname,
            bannerid: this.props.adInfo.bannerid,
            bannername: this.props.adInfo.bannername,
            "screen name": this.props.adInfo["screen name"],
            position: 1
        });
    }
    // fired after slot (locale) specific ad is displayed
    localeADReady() {
        mixpanel().track("Ads Image downloaded", {
            campaignid: this.props.adInfo.campaignid,
            campaignname: this.props.adInfo.campaignname,
            bannerid: this.props.adInfo.bannerid,
            bannername: this.props.adInfo.bannername,
            "screen name": this.props.adInfo["screen name"],
            position: 1
        });
    }
    render() {
        const localeArray = this.props.availableLanguage.map(lang => lang.short.toLowerCase());
        return (
            <div>
                <div className="gptAD">
                    <GPTAD
                        adUnitPath={"/21623654641/Tinklabs/NHS-01"}
                        slotSize={[328, 210]}
                        targetArr={["lang", localeArray]}
                        target={this.props.displayLanguage.toLowerCase()}
                        onSlotOnload={this.localeADReady}
                        onClick={this.onClickADBanner}
                    />
                </div>
                <div className="tickets">
                    {
                        this.props.tickets.ADTicket.map((ticketInfo, i) => (
                            <PromotionTicket
                                {...ticketInfo}
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