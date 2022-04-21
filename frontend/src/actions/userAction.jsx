import axios from "axios";
import {api} from "../config";
import {ACTIONS} from "../constants/actions";
import {push} from "@lagunovsky/redux-react-router";

export const acquireJwtCredentials = (username, password) => dispatch => {
  const url = api.blogWeb.login;

  axios.post(url, {
    username: username,
    password: password
  }, {
    headers: {
      "Content-Type": "application/json"
    },
  }).then(promise => {
    dispatch({
      type: ACTIONS.USER.UPDATE_TOKEN_CREDENTIALS,
      payload: promise.data,
    })

    acquireCurrentUserDetails({
      type: promise.data.type,
      content: promise.data.token
    })(dispatch)

    dispatch({
      type: ACTIONS.USER.LOGIN
    })
    dispatch(push("/"))
  }).catch(error => {
    console.log(error.response)
    dispatch({
      type: ACTIONS.MODAL.SHOW_MODAL,
      payload: {
        title: "Login Failed",
        content: error.response.data.message
      },
    })
  })
}

export const acquireCurrentUserDetails = (token) => dispatch => {
  const url = api.blogWeb.self;
  console.log("Start acquireCurrentUserDetails method", token)

  axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": token.type + " " + token.content
    }
  }).then(promise => {
    dispatch({
      type: ACTIONS.USER.UPDATE_CURRENT_USER_DETAILS,
      payload: promise.data,
    })
  }).catch(error => {
    console.log(error.response)
    dispatch({
      type: ACTIONS.MODAL.SHOW_MODAL,
      payload: {
        title: "Failed to get current user details",
        content: error.response.data.message
      },
    })
  })
}