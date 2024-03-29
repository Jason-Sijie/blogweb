// reference: https://dev.to/igorovic/simplest-way-to-persist-redux-state-to-localstorage-e67

// localStorage.js
import {appConfig} from "../config";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(appConfig.reduxKey);
    if (serializedState === null) {
      return undefined;
    }

    const item = JSON.parse(serializedState);
    console.log("load state", item)
    if (new Date().getTime() > item.expiry) {
      localStorage.removeItem(appConfig.reduxKey);
      return undefined;
    }
    return item.state;
  } catch (err) {
    return undefined;
  }
};

// localStorage.js
export const saveState = (state) => {
  const token = state.userReducer.token 
  if (token == null || token.content == null) {
    console.log("clean up token in local storage")
    localStorage.removeItem(appConfig.tokenKey)
  }

  try {
    const item = {
      state: state,
      expiry: new Date().getTime() + appConfig.pageStaleTimeInMS
    };
    console.log("save state: ", item)
    localStorage.setItem(appConfig.reduxKey, JSON.stringify(item));

    localStorage.setItem(appConfig.tokenKey, JSON.stringify(state.userReducer.token));
  } catch {
    // ignore write errors
  }
};