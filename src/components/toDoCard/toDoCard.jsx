import React from "react"
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
    card: {
        width: "125px",
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
    render() {
        const { classes } = this.props;
        const image = require(`images/${this.props.image}`);
        const etaIcon = require(`images/eta_${this.props.transportType}.svg`);
        return (
            <a
                className="toDoCardATag"
                href={this.props.iLink}
                onClick={this.props.onClickMixpanel}
            >
                <Card className={classes.card}>
                    <div className="toDoCard">
                        <CardMedia
                            className={classes.media}
                            image={image}
                            alt="food"
                        />
                        <CardContent className={classes.content}>
                            <div className="articleInfo">
                                <div className="articleTitle">{this.props.title}</div>
                                <div>
                                    <div className="placeType">{this.props.placeType}</div>
                                    <div className="transportTime">
                                        <img
                                            src={etaIcon}
                                            alt="transport"
                                            className="transportType"
                                        />
                                        <span>
                                            {this.props.transportTime}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </a>
        )
    }
}

export default withStyles(styles)(ToDoCard);