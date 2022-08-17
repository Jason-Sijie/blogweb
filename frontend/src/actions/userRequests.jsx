import {api, appConfig} from "../config";
import axios from "axios";

export const getLikedBlogsByUserId = (params, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  let {userId, page, size} = params
  page = page || 0
  size = size || appConfig.blogListPageSize

  console.log("Get user " + userId + " liked blogs")
  const url = api.blogWeb.user + "/" + userId + "/likedBlogs?authorId=" + userId + "&page=" + page + "&size=" + size;

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

const defaultErrorResponse = {
  data: {
    message: "Sorry! The service is now unavailable."
  }
}