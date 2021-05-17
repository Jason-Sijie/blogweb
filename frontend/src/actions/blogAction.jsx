import axios from "axios";
import {api} from "../config";

export const getBlogDetailById = (id) => dispatch => {
    const url = api.blog.baseUrl + api.blog.blog + "/" + id;

    return axios.get(url, {
        headers: {

        }
    }).then(promise => {
        dispatch({
            type: "BLOG_UPDATE_CURRENT",
            payload: promise.data,
        })
    }).catch(error => {
        console.log(error)
    })
}
