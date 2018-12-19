import * as React from 'react';
import { Bling as GPT } from "react-gpt";

import LoadingAnimate from "components/LoadingAnimate/LoadingAnimate";
import mixpanel from 'utils/mixpanel';
import trackerInfo from 'utils/trackerInfo.js';

GPT.enableSingleRequest();

/*
 * Remarks
 * 1. `beforeunload` is fired a few times for unknown reason, check if onClick is already fired before calling
 * 2. events fired with user action:
 *      tap: focus x2 > blur > mouseover > beforeunload x3+
 *      long press: focus x2 > blur
 */

export default class GPTAD extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            adReady: false,
        }

        this.localeADReady = this.localeADReady.bind(this);
        this.onClickADBanner = this.onClickADBanner.bind(this);

        this.handleEvent = this.handleEvent.bind(this);
        this.firstFire = true;
    }
    componentDidMount() {
        window.addEventListener('beforeunload', this.handleEvent, false);
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload');
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
    handleEvent(e) {
        if (document.activeElement instanceof HTMLIFrameElement) {
            if (this.firstFire) {
                this.onClickADBanner();
                this.firstFire = false;
            }
        }
    }
    render() {
        GPT.setTargeting(this.props.targetArr[0], this.props.targetArr[1]);
        return (
            <div className="gptAD">
                {
                    (this.state.adReady) ?
                        null :
                        <LoadingAnimate
                            type="spin"
                            color="rgb(53, 126, 221)"
                        />
                }
                <GPT
                    adUnitPath={this.props.adUnitPath}
                    slotSize={this.props.slotSize}
                    targeting={{ lang: this.props.target }}
                    onSlotRenderEnded={this.localeADReady}
                    collapseEmptyDiv
                    forceSafeFrame
                />
            </div>
        );
    }
}