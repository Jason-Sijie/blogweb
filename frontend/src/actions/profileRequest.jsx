import {api} from "../config";
import axios from "axios";

export const getProfileById = (id, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  console.log("Get profile by user id: ", id)
  const url = api.blogWeb.user + "/" + id + "/profiles";

  axios.get(url)
    .then(promise => {
      console.log(promise.data)
      successCallback(promise.data)
    }).catch(error => {
      console.log(error)
      failureCallback(error.response || defaultErrorResponse)
  })
}

export const createProfile = (profile, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  if (profile == null || profile.id == null) {
    return;
  }
  console.log("Creating profile: ", profile)
  const url = api.blogWeb.user + "/profiles";
  let headers = {
    "Content-Type": "application/json"
  };

  if (localStorage.getItem("token") != null) {
    const token = JSON.parse(localStorage.getItem("token"));
    headers = {
      ...headers,
      "Authorization": token.type + " " + token.content
    }
  }

  axios.post(url, profile,{
    headers: headers
  }).then(promise => {
    successCallback(promise.data)
  }).catch(error => {
    console.log(error)
    failureCallback(error.response || defaultErrorResponse)
  })
}

export const updateProfile = (profile, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  if (profile == null || profile.id == null) {
    return;
  }
  console.log("Updating profile: ", profile)
  const url = api.blogWeb.user + "/" + profile.id + "/profiles";
  let headers = {
    "Content-Type": "application/json"
  };

  if (localStorage.getItem("token") != null) {
    const token = JSON.parse(localStorage.getItem("token"));
    headers = {
      ...headers,
      "Authorization": token.type + " " + token.content
    }
  }

  axios.put(url, profile,{
    headers: headers
  }).then(promise => {
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