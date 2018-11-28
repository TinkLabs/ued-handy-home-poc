import * as React from 'react';
import { Bling as GPT } from "react-gpt";

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

        this.handleEvent = this.handleEvent.bind(this);
        this.firstFire = true;
    }
    componentDidMount() {
        window.addEventListener('beforeunload', this.handleEvent, false);
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload');
    }
    handleEvent(e) {
        if (document.activeElement instanceof HTMLIFrameElement) {
            if (this.firstFire) {
                this.props.onClick();
                this.firstFire = false;
            }
        }
    }
    render() {
        GPT.setTargeting(this.props.targetArr[0], this.props.targetArr[1]);
        return (
            <GPT
                adUnitPath={this.props.adUnitPath}
                slotSize={this.props.slotSize}
                targeting={{ lang: this.props.target }}
                onSlotOnload={this.props.onSlotOnload}
                collapseEmptyDiv
                forceSafeFrame
            />
        );
    }
}