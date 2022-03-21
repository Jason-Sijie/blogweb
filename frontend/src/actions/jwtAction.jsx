import axios from "axios";
import {api} from "../config";
import {actions} from "../constants/actions";
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
      type: actions.jwt.UPDATE_TOKEN_CREDENTIALS,
      payload: promise.data,
    })
    dispatch(push("/"))
  }).catch(error => {
    console.log(error)
  })
}