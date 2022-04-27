import axios from "axios";
import {api} from "../config";
import {ACTIONS} from "../constants/actions";
import {stringify} from "qs";

export const getBlogDetailById = (id) => dispatch => {
  const url = api.blogWeb.blog + "/" + id;

  axios.get(url, {
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

export const getBlogsWithPageAndSize = (params) => dispatch => {
  params = stringify(params, {arrayFormat: "repeat", skipNulls: true});
  console.log("Get blogs with params: ", params)
  const url = api.blogWeb.blog + "?" + params;

  axios.get(url)
    .then(promise => {
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