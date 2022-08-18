import { ACTIONS } from "../constants/actions"

export const isTokenExpired = (store) => () => {
  let token = store.getState().userReducer.token
  console.log("token: ", token)
  if (token != null && token.expireTime != null && token.expireTime > 0) {
    console.log("expire time: ", token.expireTime)
    if (new Date().getTime() > token.expireTime) {
      console.log("Your login token expired.")
      store.dispatch({
       type: ACTIONS.USER.LOGOUT
      })
      store.dispatch({
        type: ACTIONS.MODAL.SHOW_MODAL,
        payload: {
          title: "You login token expired",
          content: "Please login again. Redirect to the login page",
          path: "/login"
        }
      })
    }
  }
}