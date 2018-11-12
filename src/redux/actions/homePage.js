// import {
//     Action,
//     Dispatch
// } from "redux";
// import axios from "axios";

// import { API_SERVER } from "src/redux/store";

export const homePageActions = {
    GET_ID_SUCCESS: "GET_ID_SUCCESS",
    GET_ID_FAIL: "GET_ID_FAIL",
}

export function getUserID(userId) {
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
export function getUserIDSuccess(userId) {
    return {
        type: homePageActions.GET_ID_SUCCESS,
        userId,
    }
}
export function getUserIDFail(err) {
    return {
        type: homePageActions.GET_ID_FAIL,
        err,
    }
}