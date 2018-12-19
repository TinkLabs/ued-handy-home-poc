import * as React from "react";
import PropTypes from 'prop-types';
import VisibilitySensor from "react-visibility-sensor";

import ToolTips from "components/ToolTips/ToolTips";
import MainPosterBanner from "components/MainPosterBanner/MainPosterBanner";

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';

import t from "translation/translate";
import mixpanel from 'utils/mixpanel';

const IProps = {
    displayLanguage: PropTypes.string,
    content: PropTypes.object,
}

const styles = theme => ({
    card: {
        width: "100%",
        boxShadow: "none",
        borderRadius: "3px",
    },
    media: {
        height: "150px",
    },
    actions: {
        display: 'flex',
    },
});

class MostPopular extends React.Component {
    render() {
        const bannerPath = require(`images/${this.props.content.banner.image}`);
        const { classes } = this.props;
        const locale = this.props.displayLanguage;

        return (
            <div className="mostPopular">
                <ToolTips
                    // string
                    LHS={t("Most Popular", locale)}
                    // string
                    RHS={t("See More", locale)}
                    iLink={this.props.content.popularSeeMore.iLink}
                    // tracker
                    RHSTracker={() => {
                        // console.log("homepage click", "see-more", "popular");
                        mixpanel().track("Homepage Click", {
                            "click_type": "see-more",
                            "content_location": "popular",
                        })
                    }}
                    // custom css
                    styles={{
                        marginBottom: "0.5rem",
                    }}
                />
                <div>
                    <div className="popularSpots">
                        {
                            this.props.content.events.map((e, i) => (
                                <VisibilitySensor
                                    key={i}
                                    onChange={(isVisible) => {
                                        if (isVisible) {
                                            // console.log('Content Impression',
                                            //     e.name,
                                            //     e.tracker.item_id,
                                            //     e.tracker.item_type,
                                            //     this.props.displayLanguage,
                                            //     e.tracker.item_position,
                                            //     "popular",
                                            //     e.iLink,
                                            // );
                                            mixpanel().track("Content Impression", {
                                                "content_title": e.name,
                                                "content_id": e.tracker.item_id,
                                                "content_type": e.tracker.item_type,
                                                "content_locale": this.props.displayLanguage,
                                                "content_position": e.tracker.item_position,
                                                "content_location": "popular",
                                            });
                                        }
                                    }}
                                >
                                    <Card className={classes.card}>
                                        <a
                                            href={e.iLink}
                                            onClick={() => {
                                                // console.log("Listing Banner Click",
                                                //     e.name,
                                                //     e.tracker.item_id,
                                                //     e.tracker.item_type,
                                                //     this.props.displayLanguage,
                                                //     e.tracker.item_position,
                                                //     "popular",
                                                //     e.iLink,
                                                // );
                                                mixpanel().track("Listing Banner Click", {
                                                    "content_title": e.name,
                                                    "content_id": e.tracker.item_id,
                                                    "content_type": e.tracker.item_type,
                                                    "content_locale": this.props.displayLanguage,
                                                    "content_position": e.tracker.item_position,
                                                    "content_location": "popular",
                                                })
                                            }}
                                            data-id={i}
                                            data-tracker={e.tracker}
                                        >
                                            <CardMedia
                                                className={classes.media}
                                                image={require(`images/${e.image}`)}
                                                title="popular places"
                                            />
                                            <div className="popular-spot-text">
                                                <div className="popular-spot-name">{t(e.name, locale)}</div>
                                                <div className="popular-spot-desc">{t(e.subtext, locale)}</div>
                                            </div>
                                        </a>
                                    </Card>
                                </VisibilitySensor>
                            ))
                        }
                    </div>
                </div>
                <MainPosterBanner
                    // img-path, styles, iLink
                    bannerInfo={{
                        ...this.props.content.banner,
                        path: `url(${bannerPath})`,
                        styles: {
                            height: "84px",
                            borderRadius: 0,
                            marginLeft: "-1rem",
                            marginRight: "-1rem",
                        }
                    }}
                />
            </div>
        )
    }
}

MostPopular.propTypes = IProps;

export default withStyles(styles)(MostPopular);