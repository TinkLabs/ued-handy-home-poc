import * as React from "react";
import VisibilitySensor from "react-visibility-sensor";
import mixpanel from "utils/mixpanel";

// this component creates consecutive empty divs of height equal to 
// screen height that has z-index smaller than that of the main content
// this component is mainly used to detect screen view in tracking

export default class VisibiltyChecker extends React.Component {
    constructor(props) {
        super(props)

        this.getMaxHeight = this.getMaxHeight.bind(this);
        this.getScreenHeight = this.getScreenHeight.bind(this);
        this.renderBG = this.renderBG.bind(this);
    }
    getMaxHeight() {
        const body = document.body;
        const html = document.documentElement;
        return Math.max(
            body.scrollHeight, body.offsetHeight, body.clientHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight,
            document.getElementById('root').offsetHeight);
    }
    getScreenHeight() {
        return window.innerHeight;
    }
    renderBG() {
        const maxH = this.getMaxHeight();
        const screenH = this.getScreenHeight();
        const numOfScreen = Math.floor(maxH / screenH);
        const lastScreenH = maxH - (screenH * numOfScreen);
        const elements = [];
        let accumHeight = 0;
        for (let i = 0; i <= numOfScreen; i++) {
            const style = {
                height: `${(i !== numOfScreen) ? screenH : lastScreenH}px`,
                top: accumHeight,
                // backgroundColor: `rgba(25,25,25,${i/10})`
            };
            accumHeight += screenH;
            const element = (
                <VisibilitySensor
                    key={i}
                    partialVisibility
                    onChange={(isVisible) => {
                        if (isVisible) {
                            // console.log(i)
                            mixpanel().track("Screen View", {
                                "Screen Name": "Home",
                                screen_number: i,
                            });
                        }
                    }}
                >
                    <div className="visibiltyChecker" style={style} />
                </VisibilitySensor>
            )
            elements.push(element);
        }
        return elements;
    }
    render() {
        return (
            <div className="visibiltyWrapper">
                {
                    this.renderBG().map(e => e)
                }
            </div>
        )
    }
}