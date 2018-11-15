import React from "react"

export default class ToDoCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            etaIcon: "",
        }
        this.onClick = this.onClick.bind(this);
    }
    componentDidMount() {
        this.setState({
            etaIcon: require(`../../images/eta_${this.props.transportType}.svg`),
            image: require(`../../images/${this.props.image}`),
        });
    }
    onClick() {
        this.props.onClickMixpanel();
    }
    render() {
        return (
            <a
                className="toDoCardATag"
                href={this.props.iLink}
                onClick={this.onClick}
            >
                <div
                    className="toDoCard"
                >
                    <img
                        className="articleImage"
                        src={this.state.image}
                        alt="food" />
                    <div className="articleInfo">
                        <div className="articleTitle">{this.props.title}</div>
                        <div>
                            <div className="placeType">{this.props.placeType}</div>
                            <div className="transportTime">
                                <img
                                    src={this.state.etaIcon}
                                    alt="transport"
                                    className=""
                                />
                                <span>
                                    {this.props.transportTime}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        )
    }
}