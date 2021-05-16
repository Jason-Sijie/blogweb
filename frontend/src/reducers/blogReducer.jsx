const { act } = require("react-dom/test-utils");

const initialState = {
  blogs: [],
  currentBlog: {},
  count: 0
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FOO_BLOG":
      state = {
        ...state,
        currentBlog: action.blog
      }
      break;
  }

  return state;
} 

export default blogReducer;