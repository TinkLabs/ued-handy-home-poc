import * as React from "react";
import PromotionTicket from "components/PromotionTicket/PromotionTicket";
import GPTAD from "components/gptAD/gptAD"

export default class PromotionBanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ticketIcon: require("images/ticketIcon.svg"),
        }
    }
    render() {
        const localeArray = this.props.availableLanguage.map(lang => lang.short.toLowerCase());
        return (
            <div>
                <GPTAD
                    adUnitPath={process.env.REACT_APP_GPTAD_ID}
                    slotSize={[328, 210]}
                    targetArr={["lang", localeArray]}
                    target={this.props.displayLanguage.toLowerCase()}
                />
                <div className="tickets">
                    {
                        this.props.adInfo.ADTicket.map((ticketInfo, i) => (
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