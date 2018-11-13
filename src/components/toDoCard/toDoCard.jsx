import React from "react"

export default class ToDoCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            etaIcon: require("../../images/eta_walk.svg"),
        }
    }
    componentDidMount() {
        this.setState({
            etaIcon: require(`../../images/eta_${this.props.transportType}.svg`),
        });
    }
    render() {
        console.log(this.state.etaIcon);
        return (
            <div className="toDoCard">
                <img
                    className="articleImage"
                    src={this.props.image}
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
        )
    }
}