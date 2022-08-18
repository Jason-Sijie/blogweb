import {api, appConfig} from "../config";
import axios from "axios";
import { defaultErrorResponse, getBackendRequestBasicHeader } from "../utils/requestUtil";

export const getLikedBlogsByUserId = (params, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  let {userId, page, size} = params
  page = page || 0
  size = size || appConfig.blogListPageSize

  console.log("Get user " + userId + " liked blogs")
  const url = api.blogWeb.user + "/" + userId + "/likedBlogs?authorId=" + userId + "&page=" + page + "&size=" + size;

  let headers = getBackendRequestBasicHeader();

  axios.get(url, {
    headers: headers
  }).then(promise => {
    console.log(promise.data)
    successCallback(promise.data)
  }).catch(error => {
    console.log(error)
    failureCallback(error.response || defaultErrorResponse)
  })
}

export const isBlogLikedByCurrentUser = (blogId, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  console.log("Is blogs " + blogId + " liked by current user")
  const url = api.blogWeb.blog + "/" + blogId + "/isLiked";

  let headers = getBackendRequestBasicHeader();

  axios.get(url, {
    headers: headers
  }).then(promise => {
    console.log(promise.data)
    successCallback(promise.data)
  }).catch(error => {
    console.log(error)
    failureCallback(error.response || defaultErrorResponse)
  })
}