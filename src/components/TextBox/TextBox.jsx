import * as React from 'react';
// import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import { ValidatorComponent } from "react-form-validator-core";

class SignUpTextBox extends ValidatorComponent {
    componentDidMount() {
		this.configure();
	}
    render() {
        if (this.props.show) {
            return (
                <Badge
                    badgeContent={this.props.error ? "!" : "√"}
                    color={this.props.error ? "error" : "default"}
                    className={`badge ${this.props.error ? "" : "badge-ok"}`}
                    invisible={this.props.value.length === 0}
                >
                    <TextField
                        name={this.props.name}
                        label={this.props.label}
                        className="signUpTextBox"
                        margin="normal"
                        variant="filled"
                        placeholder={this.props.placeholder}
                        helperText={this.props.helperText}
                        value={this.props.value}
                        error={this.props.error}
                        onChange={this.props.onChange}
                        fullWidth
                    />
                </Badge>
            )
        } else {
            return <div />
        }
    }
}

export default SignUpTextBox;