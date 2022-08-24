import {stringify} from "qs";
import {api} from "../config";
import axios from "axios";
import {defaultErrorResponse, getBackendRequestBasicHeader} from "../utils/requestUtil";

export const getBlogsWithParams = (params, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  params = stringify(params, {arrayFormat: "repeat", skipNulls: true});
  console.log("Get blogs with params: ", params)
  const url = api.blogWeb.blog + "?" + params;
  console.log("Request URL: ", url)

  axios.get(url)
    .then(promise => {
      console.log(promise.data)
      successCallback(promise.data)
    }).catch(error => {
      console.log(error)
      failureCallback(error.response || defaultErrorResponse)
    })
}

export const getBlogDetailById = (id, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  const url = api.blogWeb.blog + "/" + id;

  axios.get(url, {
    headers: {}
  }).then(promise => {
    successCallback(promise.data)
  }).catch(error => {
    console.log(error)
    failureCallback(error.response || defaultErrorResponse)
  })
}

export const updateBlogContent = (blog, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  const url = api.blogWeb.blog + "/" + blog.id;
  let headers = getBackendRequestBasicHeader();

  axios.put(url, blog,{
    headers: headers
  }).then(promise => {
    successCallback(promise.data)
  }).catch(error => {
    console.log(error)
    failureCallback(error.response || defaultErrorResponse)
  })
}

export const deleteBlog = (id, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  const url = api.blogWeb.blog + "/" + id;
  let headers = getBackendRequestBasicHeader();

  axios.delete(url,{
    headers: headers
  }).then(promise => {
    successCallback(promise.data)
  }).catch(error => {
    console.log(error)
    failureCallback(error.response || defaultErrorResponse)
  })
}

export const createBlog = (blog, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  const url = api.blogWeb.blog;
  let headers = getBackendRequestBasicHeader();

  axios.post(url, blog,{
    headers: headers
  }).then(promise => {
    successCallback(promise.data)
  }).catch(error => {
    console.log(error)
    failureCallback(error.response || defaultErrorResponse)
  })
}

export const likeBlogById = (blogId, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  const url = api.blogWeb.blog + "/" + blogId + "/like";
  let headers = getBackendRequestBasicHeader();

  axios.put(url, null,{
    headers: headers
  }).then(promise => {
    console.log(promise.data)
    successCallback(promise.data)
  }).catch(error => {
    console.log(error)
    failureCallback(error.response || defaultErrorResponse)
  })
}

export const unlikeBlogById = (blogId, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  const url = api.blogWeb.blog + "/" + blogId + "/unlike";
  let headers = getBackendRequestBasicHeader();

  axios.put(url, null,{
    headers: headers
  }).then(promise => {
    console.log(promise.data)
    successCallback(promise.data)
  }).catch(error => {
    console.log(error)
    failureCallback(error.response || defaultErrorResponse)
  })
}