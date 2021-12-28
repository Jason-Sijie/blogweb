import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import blogReducer  from "./reducers/blogReducer.jsx";
import jwtReducer from "./reducers/jwtReducer";

const store = createStore(combineReducers({
  blogReducer: blogReducer,
  jwtReducer: jwtReducer,
}), {}, applyMiddleware(logger, thunk));

export default store;