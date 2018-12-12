import * as React from "react";
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

const IProps = {
    position: PropTypes.object,
    open: PropTypes.bool,
    duration: PropTypes.number,
    ContentProps: PropTypes.object,
    onClose: PropTypes.func,
    message: PropTypes.element,
}

export default class PopUp extends React.Component {
    render() {
        return (
            <Snackbar
                anchorOrigin={this.props.position}
                open={this.props.open}
                autoHideDuration={this.props.duration}
                onClose={this.props.onClose}
                ContentProps={this.props.ContentProps}
                message={this.props.message}
            />
        )
    }
}

PopUp.propTypes = IProps;