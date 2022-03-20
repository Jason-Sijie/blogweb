import {actions} from "../constants/actions";

const initialState = {
  blogListPage: [],
  detailedBlog: {},
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.blog.UPDATE_DETAILED_BLOG:
      state = {
        ...state,
        detailedBlog: action.payload
      }
      break;

    case actions.blog.UPDATE_BLOG_LIST_PAGE:
      state = {
        ...state,
        blogListPage: action.payload
      }
      break;

  }

  return state;
}

export default blogReducer;