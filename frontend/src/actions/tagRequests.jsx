import {api} from "../config";
import axios from "axios";
import {defaultErrorResponse, getBackendRequestBasicHeader} from "../utils/requestUtil";

export const getTopKTagsWithBlogSize = (topK, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  if (topK == null) {
    return;
  }
  console.log("Getting top " + topK + " tags with blog size")
  const url = api.blogWeb.tag + "?topKSize=" + topK;
  
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

export const getTopKTagsWithBlogView = (topK, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  if (topK == null) {
    return;
  }
  console.log("Getting top " + topK + " tags with blog view")
  const url = api.blogWeb.tag + "?topKView=" + topK;
  
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

export const getTopKTagsWithBlogLike = (topK, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  if (topK == null) {
    return;
  }
  console.log("Getting top " + topK + " tags with blog like")
  const url = api.blogWeb.tag + "?topKLike=" + topK;
  
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