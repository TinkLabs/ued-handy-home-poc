import * as React from "react";
import logo from "../../images/lang.svg";
import LanguageButton from "../../components/languageButton/languageButton";

export default class LanguageBanner extends React.Component {
    render() {
        return (
            <div className="LanguageBanner">
                <LanguageButton
                    onClick={this.props.onClick}
                    language={this.props.availableLanguage[0].full}
                    locale={this.props.availableLanguage[0].short}
                    selected={
                        this.props.availableLanguage[0].short === this.props.displayLanguage}
                />
                <LanguageButton
                    onClick={this.props.onClick}
                    language={this.props.availableLanguage[1].full}
                    locale={this.props.availableLanguage[1].short}
                    selected={
                        this.props.availableLanguage[1].short === this.props.displayLanguage}
                />
                <LanguageButton
                    onClick={this.props.onClick}
                    language={this.props.availableLanguage[2].full}
                    locale={this.props.availableLanguage[2].short}
                    selected={
                        this.props.availableLanguage[2].short === this.props.displayLanguage}
                />
                <div className="langBtnWrapper systemLanguageSelector">
                    <a href="xchooselang:">
                        <img src={logo} alt="" />
                    </a>
                </div>
            </div>
        );
    }
}