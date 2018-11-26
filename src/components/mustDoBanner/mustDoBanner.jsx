import * as React from "react";
import Slider from "react-slick";
import mixpanel from '../../utils/mixpanel';
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
        let eatLikeALocal = "";
        let seeMore = "";
        if (this.props.displayLanguage === "en_US") {
            eatLikeALocal = "EAT LIKE A LOCAL";
            seeMore = "SEE MORE";
        } else if (this.props.displayLanguage === "zh_TW") {
            eatLikeALocal = "地道美食";
            seeMore = "查看更多";
        } else if (this.props.displayLanguage === "zh_CN") {
            eatLikeALocal = "地道美食";
            seeMore = "查看更多";
        }
        return (
            <div className="mustDoBanner">
                <div className="subMustDoBanner">
                    <div className="eatLikeALocal">
                        {eatLikeALocal}
                        {/* EAT LIKE A LOCAL */}
                    </div>
                    <a 
                        className="seeMore"
                        href="articleList:35"
                        onClick={() => {
                            // if (window.Android) {window.Android.showToast("see more");}
                            mixpanel().track("Homepage Click", {
                                click_type: "see-more"
                            });
                        }}
                    >
                        {seeMore}
                        {/* SEE MORE */}
                    </a>
                </div>
                <div className="sliderContainer">
                    <Slider {...this.state.sliderSettings}>
                        { articles.map((fa, i) => (
                            <ToDoCard
                                key={i}
                                title={fa.title}
                                iLink={fa.iLink}
                                placeType={fa.placeType}
                                transportType={fa.transportType}
                                transportTime={fa.transportTime}
                                image={fa.image}
                                onClickMixpanel={() => {
                                    // if (window.Android) {window.Android.showToast(fa.title);}
                                    mixpanel().track("Content Impression", {
                                        content_title: fa.title,
                                        content_id: fa.content_id,
                                        content_type: fa.content_type,
                                        content_locale: fa.content_locale,
                                        content_position: fa.content_position,
                                    });
                                }}
                            />
                        ))}
                    </Slider>
                </div>
            </div>
        );
    }
}