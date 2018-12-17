import * as React from "react";
import mixpanel from 'utils/mixpanel';
import trackerInfo from "utils/trackerInfo";

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
                                const info = trackerInfo.langBanner;
                                const event = info.Event;
                                const data = info.data;
                                data.choose_language = lang.full;
                                // console.log(event, data)
                                mixpanel().track(event, data);
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
                            const info = trackerInfo.langBanner;
                            const event = info.Event;
                            const data = info.data;
                            data.choose_language = "more";
                            // console.log(event, data)
                            mixpanel().track(event, data);
                        }}
                    >
                        <img src={logo} alt="" />
                    </a>
                </div>
            </div>
        );
    }
}