import {api} from "../config";
import axios from "axios";
import {defaultErrorResponse, getBackendRequestBasicHeader} from "../utils/requestUtil";

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

export const getProfileByUid = (uid, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  console.log("Get profile by uid: ", uid)
  const url = api.blogWeb.user + "/profiles?uid=" + uid;

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
  if (profile == null || profile.userId == null) {
    return;
  }
  console.log("Creating profile: ", profile)
  const url = api.blogWeb.user + "/profiles";
  
  let headers = getBackendRequestBasicHeader();

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
  if (profile == null || profile.userId == null) {
    return;
  }
  console.log("Updating profile: ", profile)
  const url = api.blogWeb.user + "/" + profile.userId + "/profiles";
  
  let headers = getBackendRequestBasicHeader();

  axios.put(url, profile,{
    headers: headers
  }).then(promise => {
    successCallback(promise.data)
  }).catch(error => {
    console.log(error)
    failureCallback(error.response || defaultErrorResponse)
  })
}

export const uploadProfileAvatar = (avatar, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  if (avatar == null) {
    return;
  }
  console.log("Uploading avatar")
  const url = api.blogWeb.user + "/profiles/avatar";
  
  let headers = getBackendRequestBasicHeader();
  headers = {
    ...headers,
    "Content-Type": "image/jpeg"
  }

  axios.post(url, avatar,{
    headers: headers
  }).then(promise => {
    successCallback(promise.data)
  }).catch(error => {
    console.log(error)
    failureCallback(error.response || defaultErrorResponse)
  })
}

export const getProfileAvatarById = (userId, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  if (userId == null) {
    return;
  }
  console.log("Getting avatar of user: " + userId)
  const url = api.blogWeb.user + "/" + userId + "/profiles/avatar";
  
  let headers = getBackendRequestBasicHeader();

  axios.get(url, {
    headers: headers
  }).then(promise => {
    successCallback(promise.data)
  }).catch(error => {
    console.log(error)
    failureCallback(error.response || defaultErrorResponse)
  })
}
