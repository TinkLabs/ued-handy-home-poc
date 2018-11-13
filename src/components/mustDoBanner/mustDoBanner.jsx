import * as React from "react";
import Slider from "react-slick";
import ToDoCard from "../toDoCard/toDoCard";

import article1 from "../../images/article1/drawable-hdpi/straight.jpg";
import article2 from "../../images/article2/drawable-hdpi/straight.jpg";
import article3 from "../../images/article3/drawable-hdpi/straight.jpg";

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
            }
        }
        this.foodArticles = [
            {
                title: "Best Chicken Rice",
                placeType: "Hawker Food",
                transportType: "walk",
                transportTime: "18 min from hotel",
                image: article1,
            },
            {
                title: "5 Local Drinks",
                placeType: "Bars",
                transportType: "drive",
                transportTime: "18 min from hotel",
                image: article2,
            },
            {
                title: "Local Cafe",
                placeType: "Coffee Shop",
                transportType: "walk",
                transportTime: "18 min from hotel",
                image: article3,
            },
        ];
    }
    render() {
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
                        { this.foodArticles.map((fa, i) => (
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