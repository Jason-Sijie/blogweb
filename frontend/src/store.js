import { act } from "react-dom/test-utils";
import {createStore, combineReducers, applyMiddleware} from "redux";
// import * as action from "redux-axiom";

import blogReducer  from "./reducers/blogReducer.jsx";

const store = createStore(combineReducers({
    blogReducer: blogReducer
}), {}, applyMiddleware());

export default store;