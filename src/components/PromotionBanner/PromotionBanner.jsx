import * as React from "react";
import LoadingAnimate from "components/LoadingAnimate/LoadingAnimate";
import PromotionTicket from "components/PromotionTicket/PromotionTicket";
import GPTAD from "components/gptAD/gptAD"
import mixpanel from 'utils/mixpanel';
import trackerInfo from 'utils/trackerInfo.js';

export default class PromotionBanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ticketIcon: require("images/ticketIcon.svg"),
            adReady: false,
        }
        this.onClickADBanner = this.onClickADBanner.bind(this);
        this.localeADReady = this.localeADReady.bind(this);
    }
    // fired after user click ad and right before redirect
    onClickADBanner(e) {
        const template = trackerInfo.adClick;
        const event = template.Event;
        const dataKey = Object.keys(template);
        const data = {};
        dataKey.forEach(key => {
            if (key !== "Event") {
                data[key] = template[key]
            }
        });
        data.position = 1;
        mixpanel().track(event, data);
    }
    // fired after slot (locale) specific ad is displayed
    localeADReady() {
        const template = trackerInfo.adDownload;
        const event = template.Event;
        const dataKey = Object.keys(template);
        const data = {};
        dataKey.forEach(key => {
            if (key !== "Event") {
                data[key] = template[key]
            }
        });
        data.position = 1;
        mixpanel().track(event, data);

        this.setState({
            adReady: true,
        });
    }
    render() {
        const localeArray = this.props.availableLanguage.map(lang => lang.short.toLowerCase());
        return (
            <div>
                <div className="gptAD">
                    {
                        (this.state.adReady) ?
                        null :
                        <LoadingAnimate
                            type="spin"
                            color="rgb(53, 126, 221)"
                        />
                    }
                    <GPTAD
                        adUnitPath={process.env.REACT_APP_GPTAD_ID}
                        slotSize={[328, 210]}
                        targetArr={["lang", localeArray]}
                        target={this.props.displayLanguage.toLowerCase()}
                        onSlotOnload={this.localeADReady}
                        onClick={this.onClickADBanner}
                    />
                </div>
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