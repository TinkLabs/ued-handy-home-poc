import * as React from "react";
import mixpanel from 'utils/mixpanel';

import logo from "images/lang.svg";
import LanguageButton from "components/LanguageButton/LanguageButton";

export default class LanguageBanner extends React.Component {
    render() {
        return (
            <div className="LanguageBanner">
                {
                    this.props.availableLanguage.map((lang, i) => (
                        <LanguageButton
                            key={i}
                            onClick={this.props.onClick}
                            onClickMixpanel={() => {
                                mixpanel().track('Homepage Click', {
                                    click_type: "choose_language",
                                    user_language: lang.full
                                });
                            }}
                            language={lang.full.toUpperCase()}
                            locale={lang.short}
                            selected={
                                lang.short === this.props.displayLanguage}
                        />
                    ))
                }
                <div className="langBtnWrapper systemLanguageSelector">
                    <a 
                        href="chooselang:"
                        onClick={() => {
                            mixpanel().track("Homepage Click", {
                                click_type: "choose_language",
                                choose_language: "more"
                            });
                        }}
                    >
                        <img src={logo} alt="" />
                    </a>
                </div>
            </div>
        );
    }
}