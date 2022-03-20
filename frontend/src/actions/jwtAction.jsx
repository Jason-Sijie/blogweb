import axios from "axios";
import {api} from "../config";
import {actions} from "../constants/actions";
import { useNavigate } from "react-router-dom";

export const acquireJwtCredentials = (username, password) => dispatch => {
  const url = api.blogWeb.jwt;
  let navigate = useNavigate();

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
    navigate('/')
  }).catch(error => {
    console.log(error)
  })
}