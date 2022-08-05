import {stringify} from "qs";
import {api} from "../config";
import axios from "axios";

export const getBlogsWithParams = (params, successCallback = (data) => {}, failureCallback = (error) => {}) => {
  params = stringify(params, {arrayFormat: "repeat", skipNulls: true});
  console.log("Get blogs with params: ", params)
  const url = api.blogWeb.blog + "?" + params;

  axios.get(url)
    .then(promise => {
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

  axios.put(url, blog,{
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

  axios.post(url, blog,{
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