import axios from "axios";
import {api} from "../config";
import {ACTIONS} from "../constants/actions";
import {push} from "@lagunovsky/redux-react-router";

export const acquireJwtCredentials = (username, password) => dispatch => {
  const url = api.blogWeb.jwt;

  return axios.post(url, {
    username: username,
    password: password
  }, {
    headers: {
      "Content-Type": "application/json"
    },
  }).then(promise => {
    dispatch({
      type: ACTIONS.JWT.UPDATE_TOKEN_CREDENTIALS,
      payload: promise.data,
    })
    dispatch(push("/"))
  }).catch(error => {
    console.log(error)
    dispatch({
      type: ACTIONS.MODAL.SHOW_MODAL,
      payload: {
        title: "Login Failed",
        content: error.toString()
      },
    })
  })
}