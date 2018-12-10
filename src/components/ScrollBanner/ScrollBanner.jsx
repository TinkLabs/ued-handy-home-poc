import * as React from "react";
import Slider from "react-slick";
// import mixpanel from 'utils/mixpanel';
import ToDoCard from "components/ToDoCard/ToDoCard";
import VisibilitySensor from "react-visibility-sensor";

import PropTypes from 'prop-types';
const IProps = {
    sliderSettings: PropTypes.object,
    content: PropTypes.array,
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
                slidesToScroll: 2,
            },
            articles: [],
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
                                image={fa.image}
                                onClickMixpanel={() => {
                                    // mixpanel().track("Listing Banner Click", {
                                    //     content_title: fa.title,
                                    //     content_id: fa.tracker.content_id,
                                    //     content_type: fa.tracker.content_type,
                                    //     content_locale: fa.tracker.content_locale,
                                    //     content_position: fa.tracker.content_position,
                                    // });
                                }}
                            />
                        </VisibilitySensor>
                    ))}
                </Slider>
            </div>
        );
    }
}

ScrollBanner.propsTypes = IProps;