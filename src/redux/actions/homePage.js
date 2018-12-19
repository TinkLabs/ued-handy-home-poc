import axios from "utils/axios";

export const homePageActions = {
    SET_GLOBAL_PROPERTIES: "SET_GLOBAL_PROPERTIES",
    SET_DISPLAY_LANGUAGE: "SET_DISPLAY_LANGUAGE",
    GET_CONTENT_SUCCESS: "GET_CONTENT_SUCCESS",
    GET_CONTENT_FAIL: "GET_CONTENT_FAIL",
    SIGN_UP_STATUS_RESET: "SIGN_UP_STATUS_RESET",
    SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
    SIGN_UP_FAIL: "SIGN_UP_FAIL",
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
export const getContent = (hotelID) => dispatch => {
    // dispatch(getContentSuccess(hotelID));
    const param = { hotelID };
    axios.get(`/api/content`, { param })
        .then(res => {
            switch (res.status) {
                case 200: {
                    dispatch(getContentSuccess(res.data));
                    break;
                }
                case 300: {
                    dispatch(getContentSuccess(res.statusText));
                    break;
                }
                default: {
                    dispatch(getContentSuccess(res.statusText));
                    break;
                }
            }
        })
        .catch(err => console.log(err));
        
}
export const getContentSuccess = (content) => {
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
export const signUp = (email) => dispatch => {
    dispatch(signUpStatusReset());
    axios.post('subscribe', email)
        .then(res => {
            switch (res.status) {
                case 200: {
                    dispatch(signUpSuccess(res.statusText));
                    break;
                }
                case 300: {
                    dispatch(signUpFail(res.statusText));
                    break;
                }
                default: {
                    dispatch(signUpFail(res.statusText));
                    break;
                }
            }
        })
        .catch(err => console.log(err));
}
export const signUpStatusReset = () => {
    return {
        type: homePageActions.SIGN_UP_STATUS_RESET,
    }
}
export const signUpSuccess = () => {
    return {
        type: homePageActions.SIGN_UP_SUCCESS,
    }
}
export const signUpFail = (err) => {
    return {
        type: homePageActions.SIGN_UP_FAIL,
        err,
    }
}