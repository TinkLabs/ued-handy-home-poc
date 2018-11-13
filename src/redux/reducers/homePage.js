import { homePageActions } from "../actions/homePage";
import * as availableLanguage from "../../localeContent/availableLanguage.json";
import * as defaultContent from "../../localeContent/EN/content.json";

const initialState = {
    availableLanguage: availableLanguage.default,
    displayLanguage: "EN",
    content: [defaultContent.default],
}

export const homePageReducer = (state = initialState, action) => {
    switch(action.type) {
        case homePageActions.SET_DISPLAY_LANGUAGE: {
            return { ...state, displayLanguage: action.displayLanguage };
        }
        case homePageActions.GET_CONTENT_SUCCESS: {
            return { ...state, content: action.content };
        }
        case homePageActions.GET_CONTENT_FAIL: {
            return { ...state, err: action.err };
        }
        default: {
            return state;
        }
    }
}