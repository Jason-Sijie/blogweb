import {api} from "../config";
import axios from "axios";

export const getProfileById = (id, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  console.log("Get profile by user id: ", id)
  const url = api.blogWeb.user + "/" + id + "/profiles";

  axios.get(url)
    .then(promise => {
      successCallback(promise.data)
    }).catch(error => {
      console.log(error)
      failureCallback(error.response || defaultErrorResponse)
  })
}

const defaultErrorResponse = {
  data: {
    message: "Sorry! The service is now unavailable."
  }
}