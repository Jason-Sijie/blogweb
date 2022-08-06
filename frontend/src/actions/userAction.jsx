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
    dispatch({
      type: ACTIONS.MODAL.SHOW_MODAL,
      payload: {
        title: "Login Succeeded",
        content: "",
        path: "/home"
      }
    })

  }).catch(error => {
    console.log(error.response)

    dispatch({
      type: ACTIONS.MODAL.SHOW_MODAL,
      payload: {
        title: "Login Failed",
        content: error.response != null ? error.response.data.message : defaultErrorMessage
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
        content: error.response != null ? error.response.data.message : defaultErrorMessage
      },
    })
  })
}

export const logout = () => dispatch => {
  console.log("Start logging out")
  let token = localStorage.getItem("token")
  console.log("current token: " + token)

  if (token == null || token === "") {
    dispatch({
      type: ACTIONS.MODAL.SHOW_MODAL,
      payload: {
        title: "Logout Failed",
        content: "You must logged in first",
        path: "/"
      }
    })
  } else {
    dispatch({
      type: ACTIONS.USER.LOGOUT
    })

    dispatch({
      type: ACTIONS.MODAL.SHOW_MODAL,
      payload: {
        title: "Logout Succeeded",
        path: "/"
      }
    })
  }
}

export const registerGuestUser = (username, password) => dispatch => {
  console.log("Start registering guest user");

  const url = api.blogWeb.register;

  axios.post(url, {
    username: username,
    password: password
  }, {
    headers: {
      "Content-Type": "application/json"
    },
  }).then((promise) => {
    dispatch({
      type: ACTIONS.MODAL.SHOW_MODAL,
      payload: {
        title: "Registration Succeeded",
        content: "Successfully created user: " + username,
        path: "/login"
      }
    })
  }).catch((error) => {
    console.log(error.response)
    dispatch({
      type: ACTIONS.MODAL.SHOW_MODAL,
      payload: {
        title: "Failed to create new user: " + username,
        content: error.response != null ? error.response.data.message : defaultErrorMessage
      },
    })
  })
}

const defaultErrorMessage = "Sorry! The service is now unavailable."