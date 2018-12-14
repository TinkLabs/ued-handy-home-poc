import * as React from "react";
import Slider from "react-slick";
// import mixpanel from 'utils/mixpanel';
import ToDoCard from "components/ToDoCard/ToDoCard";
import VisibilitySensor from "react-visibility-sensor";

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
        // find the tallest title div and sync the other in the row
        let maxHeight = 0;
        this.props.content.forEach(fa => {
            const h = document.getElementById(fa.name).clientHeight;
            if (h > maxHeight) { maxHeight = h }
        });
        this.setState({
            titleHeight: maxHeight,
        });
    }
    render() {
        return (
            <div className="sliderContainer">
                <Slider
                    {...this.state.sliderSettings}
                >
                    {this.props.content.map((fa, i) => (
                        <VisibilitySensor
                            key={i}
                            onChange={(isVisible) => {
                                // if (isVisible) {
                                //     mixpanel().track("Content Impression", {
                                //         content_title: fa.title,
                                //         content_id: fa.content_id,
                                //         content_type: fa.content_type,
                                //         content_locale: fa.content_locale,
                                //         content_position: fa.content_position,
                                //     });
                                // }
                            }}
                        >
                            <ToDoCard
                                title={fa.name}
                                iLink={fa.iLink}
                                description={fa.description}
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
                            />
                        </VisibilitySensor>
                    ))}
                </Slider>
            </div>
        );
    }
}

ScrollBanner.propsTypes = IProps;