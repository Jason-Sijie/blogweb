import {createStore, combineReducers, applyMiddleware} from "redux";
import { createRouterReducer, createRouterMiddleware } from '@lagunovsky/redux-react-router'
import thunk from "redux-thunk";
import logger from "redux-logger";

import userReducer from "./reducers/userReducer";
import modalReducer from "./reducers/modalReducer";
import {browserHistory} from "./utils/history";
import {loadState, saveState} from "./utils/localStorage";
import debounce from "debounce";

const store = createStore(combineReducers({
  router: createRouterReducer(browserHistory),
  userReducer: userReducer,
  modalReducer: modalReducer
}), loadState(), applyMiddleware(
  logger,
  thunk,
  createRouterMiddleware(browserHistory)
));

store.subscribe(
  // we use debounce to save the state once each 800ms
  // for better performances in case multiple changes occur in a short time
  debounce(() => {
    saveState(store.getState());
  }, 800)
);

export default store;