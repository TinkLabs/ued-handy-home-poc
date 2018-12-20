import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mixpanel from 'utils/mixpanel';
// import { ValidatorForm } from "react-form-validator-core";
// import SignUpTextBox from "textBox/textBox";
// import PopUp from "popUp/popUp";

import {
    signUp,
} from "redux/actions/homePage";

const IProps = {
    signUpStatus: PropTypes.string,
};

class PureSignUp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            emailValid: false,
            popUp: false,
            successMsg: "Thank you",
            popUpMsg: "",
        }

        this.onType = this.onType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleFail = this.handleFail.bind(this);
        this.closePop = this.closePop.bind(this);
    }
    componentDidMount() {
        // 
    }
    shouldComponentUpdate(nextProps, nextState) {
        // trigger pop up after submiting
        if (nextProps.popUp === this.props.popUp) {
            if (nextProps.signUpStatus !== this.props.signUpStatus) {
                if (nextProps.signUpStatus === 'SIGN_UP_SUCCESS') {
                    this.handleSuccess();
                    return false;
                } else {
                    // this.handleFail(nextProps.signUpStatus);
                    this.handleFail("Please try again.")
                    return false;
                }
            }
        }
        return true;
    }
    componentDidUpdate(prevProp, prevState) {
        // validate form after input changes
        if (this.state.email.length === 0 && this.state.emailValid) {
            this.setState({
                emailValid: false,
            });
        } else if (this.state.email !== prevState.email) {
            const valid = this.form.isFormValid();
            this.setState({
                emailValid: valid,
            });
        }
    }
    onType(e) {
        this.setState({
            email: e.currentTarget.value,
        });
    }
    handleSubmit() {
        this.props.signUp(this.state.email);
    }
    handleSuccess() {
        this.setState({
            email: "",
            emailValid: false,
            popUp: true,
            popUpMsg: this.state.successMsg,
        });
    }
    handleFail(err) {
        this.setState({
            popUp: true,
            popUpMsg: err,
        });
    }
    closePop() {
        this.setState({
            popUp: false,
            popUpMsg: "",
        });
    }
    render() {
        const translation = {
            h1: {
                en_US: "Subscribe today",
                zh_CN: "Subscribe today",
                zh_TW: "Subscribe today",
            },
            h2: {
                en_US: "For more services and the best offers.",
                zh_CN: "For more services and the best offers.",
                zh_TW: "For more services and the best offers.",
            },
            btn: {
                en_US: "SUBSCRIBE NOW",
                zh_CN: "SUBSCRIBE NOW",
                zh_TW: "SUBSCRIBE NOW",
            },
        }
        return (
            <div>
                {/* <ValidatorForm
                    ref={(form) => this.form = form}
                    instantValidate
                    onSubmit={this.handleSubmit}
                    onError={this.handleInvalid}
                > */}
                    <div className="signUp-container">
                        <a
                            href={this.props.redirectURL}
                            onClick={() => {
                                mixpanel().track("Advertising Banner Click", {
                                    campaignid: "0",
                                    campaignname: "hi-signup",
                                    bannerid: "0",
                                    bannername: "hi-signup",
                                    "screen name": "Home",
                                    position: "2",
                                });
                            }}
                        >
                            <img src={this.props.bg} alt="sign-up" />
                        </a>
                        {/* <div className="logo-row">
                            <img
                                className="signUp-logo"
                                src={require(`images/handy_logo_white.svg`)}
                                alt="handy_logo" />
                        </div>
                        <div className="join-today">{translation.h1[this.props.locale]}</div>
                        <div className="more-services">{translation.h2[this.props.locale]}</div> */}
                        {/* <SignUpTextBox
                            show={false}
                            label="Email address"
                            className="signUp-input"
                            placeholder="Email address"
                            value={this.state.email}
                            error={!this.state.emailValid && this.state.email.length !== 0}
                            onChange={this.onType}
                            // react-form-validator-core
                            name="email"
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                        /> */}
                        {/* <a
                            className="signUp-joinNow"
                            href={this.props.redirectURL}
                        >
                        <span>{translation.btn[this.props.locale]}</span>
                        </a> */}
                    </div>
                {/* </ValidatorForm> */}
                {/* <PopUp
                    position={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.popUp}
                    duration={2000}
                    onClose={this.closePop}
                    ContentProps={{
                        'aria-describedby': 'popUp-text',
                    }}
                    message={<span id="popUp-text">{this.state.popUpMsg}</span>}
                /> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    signUpStatus: state.homePage.signUpStatus,
});

const mapDispatchToProps = (dispatch) => ({
    signUp: (email) => dispatch(signUp(email)),
});

PureSignUp.propTypes = IProps;

const SignUp = connect(mapStateToProps, mapDispatchToProps)(PureSignUp);

export default SignUp;