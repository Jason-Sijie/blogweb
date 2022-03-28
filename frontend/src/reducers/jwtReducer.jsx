import {ACTIONS} from "../constants/actions";

const initialState = {
  token: {
    content: "",
    type: "",
    expireTime: 0,
    startTime: 0,
  }
}

const jwtReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.JWT.UPDATE_TOKEN_CREDENTIALS:
      const currentTime = new Date().getTime();
      const newToken = {
        content: action.payload.token,
        type: action.payload.type,
        expireTime: currentTime + action.payload.expire,
        startTime: currentTime
      }
      localStorage.setItem('token', JSON.stringify(newToken));

      state = {
        ...state,
        token: newToken
      }
      break;
  }

  return state;
}

export default jwtReducer;

