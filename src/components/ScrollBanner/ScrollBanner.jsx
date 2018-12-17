import * as React from "react";
import Slider from "react-slick";
// import mixpanel from 'utils/mixpanel';
import ToDoCard from "components/ToDoCard/ToDoCard";
import VisibilitySensor from "react-visibility-sensor";

import t from "translation/translate";
// import trackerInfo from "utils/trackerInfo";

import PropTypes from 'prop-types';
const IProps = {
    sliderSettings: PropTypes.object,
    content: PropTypes.array,
    displayLanguage: PropTypes.string,
}

export default class ScrollBanner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sliderSettings: {
                dots: false,
                arrows: false,
                centerMode: false,
                infinite: false,
                speed: 500,
                slidesToShow: 2.5,
                slidesToScroll: 2.5,
            },
            articles: [],
            titleHeight: 0,
        }

        this.adjustHeight = this.adjustHeight.bind(this);
    }
    componentDidMount() {
        if (this.props.sliderSettings !== undefined) {
            this.setState({
                sliderSettings: {
                    ...this.state.sliderSettings,
                    ...this.props.sliderSettings
                },
            })
        }
        this.adjustHeight();
    }
    componentDidUpdate(prevProp) {
        if (prevProp.displayLanguage !== this.props.displayLanguage) {
            this.adjustHeight(0);
        }
        if (this.state.titleHeight === 0) {
            this.adjustHeight();
        }
    }
    // find the tallest title div and sync the other in the row
    adjustHeight(height) {
        let maxHeight = 0;
        if (typeof(height) === "undefined") {
            this.props.content.forEach(fa => {
                const id = t(fa.name, this.props.displayLanguage);
                const h = document.getElementById(id).clientHeight;
                if (h > maxHeight) { maxHeight = h }
            });
        } else {
            maxHeight = height;
        }
        if (this.state.titleHeight !== maxHeight) {
            this.setState({
                titleHeight: maxHeight,
            });
        }
    }
    render() {
        const locale = this.props.displayLanguage;
        return (
            <div className="sliderContainer">
                <Slider
                    {...this.state.sliderSettings}
                >
                    {this.props.content.map((fa, i) => (
                        <VisibilitySensor
                            key={i}
                            onChange={(isVisible) => {
                                if (isVisible) {
                                //     mixpanel().track("Content Impression", {
                                //         content_title: fa.title,
                                //         content_id: fa.content_id,
                                //         content_type: fa.content_type,
                                //         content_locale: fa.content_locale,
                                //         content_position: fa.content_position,
                                //     });
                                }
                            }}
                        >
                            <ToDoCard
                                title={t(fa.name, locale)}
                                iLink={fa.iLink}
                                description={t(fa.description, locale)}
                                image={require(`images/${fa.image}`)}
                                onClickMixpanel={() => {
                                    // mixpanel().track("Listing Banner Click", {
                                    //     content_title: fa.title,
                                    //     content_id: fa.tracker.content_id,
                                    //     content_type: fa.tracker.content_type,
                                    //     content_locale: fa.tracker.content_locale,
                                    //     content_position: fa.tracker.content_position,
                                    // });
                                }}
                                tag={fa.tag}
                                titleHeight={this.state.titleHeight}
                                displayLanguage={locale}
                            />
                        </VisibilitySensor>
                    ))}
                </Slider>
            </div>
        );
    }
}

ScrollBanner.propsTypes = IProps;