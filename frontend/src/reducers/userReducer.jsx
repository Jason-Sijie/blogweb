import { appConfig } from "../config";
import {ACTIONS} from "../constants/actions";

const initialState = {
  token: {
    content: "",
    type: "",
    expireTime: 0,
    startTime: 0,
  },
  currentUser: {},
  isLogin: false
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.USER.UPDATE_TOKEN_CREDENTIALS:
      const currentTime = new Date().getTime();
      const newToken = {
        content: action.payload.token,
        type: action.payload.type,
        expireTime: currentTime + action.payload.expire,
        startTime: currentTime
      }
      localStorage.setItem(appConfig, JSON.stringify(newToken));

      state = {
        ...state,
        token: newToken
      }
      break;

    case ACTIONS.USER.UPDATE_CURRENT_USER_DETAILS:
      state = {
        ...state,
        currentUser: action.payload
      }
      break;

    case ACTIONS.USER.LOGIN:
      state = {
        ...state,
        isLogin: true
      }
      break;

    case ACTIONS.USER.LOGOUT:
      localStorage.removeItem(appConfig.tokenKey);

      state = {
        ...state,
        isLogin: false,
        token: {
          content: "",
          type: "",
          expireTime: 0,
          startTime: 0,
        },
        currentUser: {},
      }
      break;
  }

  return state;
}

export default userReducer;

