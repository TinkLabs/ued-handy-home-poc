import {
    homePageActions,
} from "../actions/homePage";

// interface IHomePageState {
//     userID: string
// }

const initialState = {
    userID: "",
}

export const homePageReducer = (state = initialState, action) => {
    switch(action.type) {
        case homePageActions.GET_ID_SUCCESS: {
            return { ...state, userID: action.userID };
        }
        case homePageActions.GET_ID_FAIL: {
            return { ...state, userID: "" };
        }
        default: {
            return state;
        }
    }
}