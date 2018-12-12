import * as React from "react";
import ReactLoading from 'react-loading';

export default class LoadingAnimate extends React.Component {
    render(){
        return (
            <div className="loading">
                <ReactLoading
                    type={this.props.type}
                    color={this.props.color}
                />
            </div>
        );
    }
}