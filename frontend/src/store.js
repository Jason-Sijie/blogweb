import {createStore, combineReducers, applyMiddleware} from "redux";
import { createRouterReducer, createRouterMiddleware } from '@lagunovsky/redux-react-router'
import thunk from "redux-thunk";
import logger from "redux-logger";

import userReducer from "./reducers/userReducer";
import modalReducer from "./reducers/modalReducer";
import {browserHistory} from "./utils/history";

const store = createStore(combineReducers({
  router: createRouterReducer(browserHistory),
  userReducer: userReducer,
  modalReducer: modalReducer
}), {}, applyMiddleware(
  logger,
  thunk,
  createRouterMiddleware(browserHistory)
));

export default store;