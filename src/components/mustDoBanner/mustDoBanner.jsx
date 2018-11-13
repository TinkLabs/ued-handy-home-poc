import * as React from "react";
import Slider from "react-slick";
import ToDoCard from "../toDoCard/toDoCard";

export default class MustDoBanner extends React.Component {
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
    render() {
        const articles = this.props.articles.find(c => c.locale === this.props.displayLanguage).eatLikeALocal;
        return (
            <div className="mustDoBanner">
                <div className="subMustDoBanner">
                    <div className="eatLikeALocal">
                        EAT LIKE A LOCAL
                    </div>
                    <div className="seeMore">
                        SEE MORE
                    </div>
                </div>
                <div className="sliderContainer">
                    <Slider {...this.state.sliderSettings}>
                        { articles.map((fa, i) => (
                            <ToDoCard
                                key={i}
                                image={fa.image}
                                title={fa.title}
                                placeType={fa.placeType}
                                transportType={fa.transportType}
                                transportTime={fa.transportTime}
                            />
                        ))}
                    </Slider>
                </div>
            </div>
        );
    }
}