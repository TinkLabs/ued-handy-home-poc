// import axios from "axios";
// import { API_SERVER } from "src/redux/store";

export const homePageActions = {
    SET_DISPLAY_LANGUAGE: "SET_DISPLAY_LANGUAGE",
    GET_CONTENT_SUCCESS: "GET_CONTENT_SUCCESS",
    GET_CONTENT_FAIL: "GET_CONTENT_FAIL",
}

export const setDisplayLanguage = (locale) => {
    return {
        type: homePageActions.SET_DISPLAY_LANGUAGE,
        displayLanguage: locale,
    }
}
export const getContent = (locales) => dispatch => {
    dispatch(getContentSuccess(locales));
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
export const getContentSuccess = (locales) => {
    const pkg = locales.map(l => require(`../../localeContent/${l.short}/content.json`));
    return {
        type: homePageActions.GET_CONTENT_SUCCESS,
        content: pkg,
    }
}
export const getContentFail = (err) => {
    return {
        type: homePageActions.GET_CONTENT_FAIL,
        err,
    }
}