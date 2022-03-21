import {createStore, combineReducers, applyMiddleware} from "redux";
import { createRouterReducer, createRouterMiddleware } from '@lagunovsky/redux-react-router'
import thunk from "redux-thunk";
import logger from "redux-logger";

import blogReducer  from "./reducers/blogReducer.jsx";
import jwtReducer from "./reducers/jwtReducer";
import {browserHistory} from "./utils/history";

const store = createStore(combineReducers({
  router: createRouterReducer(browserHistory),
  blogReducer: blogReducer,
  jwtReducer: jwtReducer,
}), {}, applyMiddleware(
  logger,
  thunk,
  createRouterMiddleware(browserHistory)
));

export default store;