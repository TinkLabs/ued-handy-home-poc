import { 
    applyMiddleware,
    createStore,
    compose,
    combineReducers
} from "redux";
import thunk from 'redux-thunk';
import { homePageReducer } from "./reducers/homePage";

// middleware
// redux-logger
import logger from 'redux-logger';
// redux dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const rootReducer = combineReducers({
    homePage: homePageReducer,
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));