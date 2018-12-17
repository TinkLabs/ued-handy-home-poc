import * as React from "react";
import PropTypes from 'prop-types';

import ToolTips from "components/ToolTips/ToolTips";
import MainPosterBanner from "components/MainPosterBanner/MainPosterBanner";

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';

import t from "translation/translate";

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
                    // tracker object
                    tracker={this.props.content.popularSeeMore.tracker}
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
                                    <CardMedia
                                        className={classes.media}
                                        image={require(`images/${e.image}`)}
                                        title="popular places"
                                    />
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