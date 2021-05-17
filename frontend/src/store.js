import { act } from "react-dom/test-utils";
import {createStore, combineReducers, applyMiddleware} from "redux";
import axiom from "redux-axiom";
import thunk from "redux-thunk";
import logger from "redux-logger";

import blogReducer  from "./reducers/blogReducer.jsx";

const store = createStore(combineReducers({
    blogReducer: blogReducer
}), {}, applyMiddleware(logger, thunk, axiom));

export default store;