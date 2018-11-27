import * as React from 'react';
import {Bling as GPT} from "react-gpt";

GPT.enableSingleRequest();

export default class GPTAD extends React.Component {
    render() {
        GPT.setTargeting(this.props.targetArr[0], this.props.targetArr[1]);
        return (
            <GPT
                adUnitPath={this.props.adUnitPath}
                slotSize={this.props.slotSize}
                targeting={{lang: this.props.target}}
                onSlotOnload={this.props.onSlotOnload}
                collapseEmptyDiv
                forceSafeFrame
            />
        );
    }
}