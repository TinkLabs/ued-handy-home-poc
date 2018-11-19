
import { homePageActions } from "../actions/homePage";

const hotelList = require(`../../localeContent/hotelList.json`);
const defaultHotel_ID = hotelList[0].hotel_ID;
const availableLanguage = hotelList.find(hotel => hotel.hotel_ID === defaultHotel_ID).availableLanguage;
const defaultLanguage = availableLanguage[0].short;
const defaultContent = require(`../../localeContent/hotel_ID_${defaultHotel_ID}/${defaultLanguage}/content.json`);

const initialState = {
    loaded: false,
    globalPropertiesReady: false,
    globalProperties: {
        hotel_id: defaultHotel_ID,
        deviceLocale: defaultLanguage, 
    },
    availableLanguage,
    displayLanguage: defaultLanguage,
    content: [defaultContent],
}

export const homePageReducer = (state = initialState, action) => {
    switch(action.type) {
        case homePageActions.SET_GLOBAL_PROPERTIES: {
            let displayLanguage = defaultLanguage;
            if (typeof(action.globalProperties.deviceLocale) !== "undefined") {
                const deviceLocale = action.globalProperties.deviceLocale;
                // console.log(deviceLocale);
                if (availableLanguage.find(locale => locale.short === deviceLocale)) {
                    // console.log('have')
                    displayLanguage = deviceLocale
                }
            }
            // console.log(displayLanguage)
            return {
                ...state,
                globalProperties: action.globalProperties,
                globalPropertiesReady: true,
                // displayLanguage: displayLanguage
            }
        }
        case homePageActions.SET_DISPLAY_LANGUAGE: {
            return {
                ...state,
                displayLanguage: action.displayLanguage
            };
        }
        case homePageActions.GET_CONTENT_SUCCESS: {
            return {
                ...state,
                content: action.content,
                loaded: true
            };
        }
        case homePageActions.GET_CONTENT_FAIL: {
            return {
                ...state,
                err: action.err
            };
        }
        default: {
            return state;
        }
    }
}