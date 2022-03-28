import axios from "axios";
import {api} from "../config";
import {ACTIONS} from "../constants/actions";

export const getBlogDetailById = (id) => dispatch => {
  const url = api.blogWeb.blog + "/" + id;

  return axios.get(url, {
    headers: {}
  }).then(promise => {
    dispatch({
      type: ACTIONS.BLOG.UPDATE_DETAILED_BLOG,
      payload: promise.data,
    })
  }).catch(error => {
    console.log(error)
  })
}

export const getBlogsWithPageAndSize = (page, size) => dispatch => {
  const url = api.blogWeb.blog;
  return axios.get(url, {
    params: {
      page: page,
      size: size
    }
  }).then(promise => {
    dispatch({
      type: ACTIONS.BLOG.UPDATE_BLOG_LIST_PAGE,
      payload: promise.data,
    })
  }).catch(error => {
    console.log(error)
  })
}

export const updateBlogContent = (blog) => dispatch => {
  const url = api.blogWeb.blog + "/" + blog.id;
  var headers;
  if (localStorage.getItem("token") != null) {
    const token = JSON.parse(localStorage.getItem("token"));
    headers = {
      "Content-Type": "application/json",
      "Authorization": token.type + " " + token.content
    }
  } else {
    headers = {
      "Content-Type": "application/json"
    }
  }

  return axios.put(url, blog,{
    headers: headers
  }).then(promise => {
    dispatch({
      type: ACTIONS.BLOG.UPDATE_DETAILED_BLOG,
      payload: promise.data,
    })
    dispatch({
      type: ACTIONS.MODAL.SHOW_MODAL,
      payload: {
        title: "Update Succeeded",
        content: "Successfully updated the blog at " + new Date().toLocaleString()
      }
    })
  }).catch(error => {
    console.log(error.response)
    dispatch({
      type: ACTIONS.MODAL.SHOW_MODAL,
      payload: {
        title: "Update Blog Failed",
        content: error.response.data.message,
      }
    })
  })
}