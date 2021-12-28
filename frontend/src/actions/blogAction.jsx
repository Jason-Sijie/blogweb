import axios from "axios";
import {api} from "../config";
import {actions} from "../constants/actions";

export const getBlogDetailById = (id) => dispatch => {
  const url = api.blogWeb.blog + "/" + id;

  return axios.get(url, {
    headers: {}
  }).then(promise => {
    dispatch({
      type: actions.blog.UPDATE_DETAILED_BLOG,
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
      type: actions.blog.UPDATE_BLOG_LIST_PAGE,
      payload: promise.data,
    })
  }).catch(error => {
    console.log(error)
  })
}