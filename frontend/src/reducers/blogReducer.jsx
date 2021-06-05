const { act } = require("react-dom/test-utils");

const initialState = {
  blogs: [],
  currentBlog: {},
  count: 0
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BLOG_UPDATE_CURRENT":
      state = {
        ...state,
        currentBlog: action.payload
      }
      break;
    
    case "BLOG_UPDATE_ALL":
      state = {
        ...state,
        blogs: action.payload
      }
      break;
  }

  return state;
} 

export default blogReducer;