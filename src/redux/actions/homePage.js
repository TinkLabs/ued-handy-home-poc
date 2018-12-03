// import axios from "axios";
// import { API_SERVER } from "src/redux/store";

export const homePageActions = {
    SET_GLOBAL_PROPERTIES: "SET_GLOBAL_PROPERTIES",
    SET_DISPLAY_LANGUAGE: "SET_DISPLAY_LANGUAGE",
    GET_CONTENT_SUCCESS: "GET_CONTENT_SUCCESS",
    GET_CONTENT_FAIL: "GET_CONTENT_FAIL",
}

export const setGlobalProperties = (globalProperties) => {
    return {
        type: homePageActions.SET_GLOBAL_PROPERTIES,
        globalProperties,
    }
}
export const setDisplayLanguage = (locale) => {
    return {
        type: homePageActions.SET_DISPLAY_LANGUAGE,
        displayLanguage: locale,
    }
}
export const getContent = (hotelID, locales) => dispatch => {
    dispatch(getContentSuccess(hotelID, locales));
    // axios
    //     .post(`API_SERVER`, `package`)
    //     .then(res => {
    //         if (res.status === 200) {
    //             dispatch(getUserIDSuccess(res.data));
    //         } else {
    //             dispatch(getUserIDFail(res.status));
    //         }
    //     })
    //     .catch(err => {
    //         dispatch(getUserIDFail(err));
    //     });
}
export const getContentSuccess = (hotelID) => {
    const content = require(`../../localeContent/hotel_ID_${hotelID}/content.json`);
    return {
        type: homePageActions.GET_CONTENT_SUCCESS,
        content,
    }
}
export const getContentFail = (err) => {
    return {
        type: homePageActions.GET_CONTENT_FAIL,
        err,
    }
}