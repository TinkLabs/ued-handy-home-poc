import React from "react"
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import ImageTag from "components/ImageTag/ImageTag";

import PropTypes from 'prop-types';
const IProps = {
    // link & tracker
    iLink: PropTypes.string,
    onClickMixpanel: PropTypes.func,
    // img block
    image: PropTypes.string,
    // info block
    title: PropTypes.string,
    description: PropTypes.string,
    transportType: PropTypes.string,
}

const styles = {
    card: {
        width: "125px",
        marginLeft: "1px",
        position: "relative",
    },
    media: {
        width: "125px",
        height: "125px",
    },
    content: {
        padding: 0,
    }
};

class ToDoCard extends React.Component {
    constructor(props) {
        super(props)

        this.renderTag = this.renderTag.bind(this);
    }
    renderTag() {
        const tag = this.props.tag;
        if (typeof (tag) !== "undefined") {
            if (tag.trim().length > 0) {
                return (
                    <ImageTag
                        text={tag.toUpperCase()}
                        style={{
                            position: "absolute",
                            fontSize: "9px",
                            lineHeight: "1.2",
                            paddingTop: "1px",
                            top: "6px",
                            left: "10px",
                        }}
                    />
                )
            }
        }
        return null;
    }
    render() {
        const { classes } = this.props;
        let etaIcon = "";
        if (this.props.transportType) {
            etaIcon = require(`images/eta_${this.props.transportType}.svg`);
        }
        return (
            <a
                className="toDoCardATag"
                href={this.props.iLink}
                onClick={this.props.onClickMixpanel}
            >
                <Card className={classes.card}>
                    {
                        this.renderTag()
                    }
                    <div className="toDoCard">
                        <CardMedia
                            className={classes.media}
                            image={this.props.image}
                            alt="article"
                        />
                        <CardContent className={classes.content}>
                            <div className="articleInfo">
                                <div className="articleTitle">{this.props.title}</div>
                                {
                                    (this.props.transportType) ?

                                        <div className="transportTime">
                                            <img
                                                src={etaIcon}
                                                alt="transport"
                                                className="transportType"
                                            />
                                            <span>
                                                {this.props.transportTime}
                                            </span>
                                        </div> :
                                        <div className="description">{this.props.description}</div>
                                }
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </a>
        )
    }
}

ToDoCard.propsTypes = IProps;

export default withStyles(styles)(ToDoCard);