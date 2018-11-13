import * as React from "react";
import logo from "../../images/lang.svg";
import LanguageButton from "../../components/languageButton/languageButton";

export default class LanguageBanner extends React.Component {
    render() {
        return (
            <div className="LanguageBanner">
                <LanguageButton
                    language={"ENGLISH"}
                    selected={true}
                />
                <LanguageButton
                    language={"简体中文"}
                    selected={false}
                />
                <LanguageButton
                    language={"繁體中文"}
                    selected={false}
                />
                <div className="langBtnWrapper systemLanguageSelector">
                    <a href="chooselang:">
                        <img src={logo} alt="" />
                    </a>
                </div>
            </div>
        );
    }
}