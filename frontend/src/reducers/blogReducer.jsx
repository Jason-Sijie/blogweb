import {ACTIONS} from "../constants/actions";

const initialState = {
  blogListPage: [],
  detailedBlog: {},
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.BLOG.UPDATE_DETAILED_BLOG:
      state = {
        ...state,
        detailedBlog: action.payload
      }
      break;

    case ACTIONS.BLOG.UPDATE_BLOG_LIST_PAGE:
      state = {
        ...state,
        blogListPage: action.payload
      }
      break;

  }

  return state;
}

export default blogReducer;