import * as React from "react";
import PropTypes from 'prop-types';
import VisibilitySensor from "react-visibility-sensor";

import ToolTips from "components/ToolTips/ToolTips";
import MainPosterBanner from "components/MainPosterBanner/MainPosterBanner";

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';

import t from "translation/translate";

// import mixpanel from 'utils/mixpanel';
import trackerInfo from "utils/trackerInfo";

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

        const seeMoreTracker = trackerInfo.popularSeeMore;

        return (
            <div className="mostPopular">
                <ToolTips
                    // string
                    LHS={t("Most Popular", locale)}
                    // string
                    RHS={t("See More", locale)}
                    iLink={this.props.content.popularSeeMore.iLink}
                    // tracker object
                    tracker={seeMoreTracker}
                    // custom css
                    styles={{
                        marginBottom: "0.5rem",
                    }}
                />
                <div>
                    <div className="popularSpots">
                        {
                            this.props.content.events.map((e, i) => (
                                <Card className={classes.card} key={i}>
                                    <a
                                        href={e.iLink}
                                        onClick={this.trackerCardClick}
                                        data-id={i}
                                        data-tracker={e.tracker}
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            image={require(`images/${e.image}`)}
                                            title="popular places"
                                        />
                                    </a>
                                    <div className="popular-spot-text">
                                        <div className="popular-spot-name">{t(e.name, locale)}</div>
                                        <div className="popular-spot-desc">{t(e.subtext, locale)}</div>
                                    </div>
                                </Card>
                            ))
                        }
                    </div>
                </div>
                <VisibilitySensor
                    onChange={(isVisible) => {
                        if (isVisible) {
                            // mixpanel().track("Screen View", {
                            //     "Screen Name": "Home",
                            //     screen_number: 2,
                            // });
                        }
                    }}
                >
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
                        // track click
                        tracker={() => {
                            // mixpanel().track("POI Click", {
                            //     item: banner.item,
                            //     item_id: banner.item_id,
                            //     item_type: banner.item_type,
                            //     item_position: banner.item_position,
                            // });
                        }}
                    />
                </VisibilitySensor>
            </div>
        )
    }
}

MostPopular.propTypes = IProps;

export default withStyles(styles)(MostPopular);