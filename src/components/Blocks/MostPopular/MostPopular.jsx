import * as React from "react";
import PropTypes from 'prop-types';

import ToolTips from "components/ToolTips/ToolTips";
import MainPosterBanner from "components/MainPosterBanner/MainPosterBanner";

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';

import t from "translation/translate";

import mixpanel from 'utils/mixpanel';
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
    constructor(props) {
        super(props)

        this.onClickMixpanel = this.onClickMixpanel.bind(this);
    }
    onClickMixpanel(e) {
        const info = trackerInfo.contentImpression;
        const event = info.Event;
        const data = info.data;
        const dataset = e.currentTarget.dataset.tracker;
        data.content_id = dataset.item_id;
        data.content_title = dataset.item;
        data.content_type = dataset.item_type;
        data.content_locale = this.props.displayLanguage;
        data.content_position = e.currentTarget.dataset.id;
        console.log(event, data);
        // mixpanel().track(event, data);
    }
    render() {
        const bannerPath = require(`images/${this.props.content.banner.image}`);
        const { classes } = this.props;
        const locale = this.props.displayLanguage;

        const template = trackerInfo.popularSeeMore;

        return (
            <div className="mostPopular">
                <ToolTips
                    // string
                    LHS={t("Most Popular", locale)}
                    // string
                    RHS={t("See More", locale)}
                    iLink={this.props.content.popularSeeMore.iLink}
                    // tracker object
                    tracker={template}
                    // custom css
                    styles={{
                        marginBottom: "0.5rem",
                    }}
                />
                <div>
                    <div className="popularSpots">
                        {
                            this.props.content.events.map((e, i) => (
                                <Card className={classes.card}>
                                    <a
                                        key={i}
                                        href={e.iLink}
                                        onClick={this.onClickMixpanel}
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
                <MainPosterBanner
                    // img-path, styles, trackers, iLink
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