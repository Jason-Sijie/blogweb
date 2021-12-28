import axios from "axios";
import {api} from "../config";
import {actions} from "../constants/actions";

export const acquireJwtCredentials = (username, password) => dispatch => {
  const url = api.blogWeb.jwt;

  return axios.post(url, {
    username: username,
    password: password
  }, {
    headers: {},
  }).then(promise => {
    dispatch({
      type: actions.jwt.UPDATE_TOKEN_CREDENTIALS,
      payload: promise.data,
    })
  }).catch(error => {
    console.log(error)
  })
}