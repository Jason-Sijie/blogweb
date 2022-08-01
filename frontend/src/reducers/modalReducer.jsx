import {ACTIONS} from "../constants/actions";

const initialState = {
  globalModal: {
    show: false,
    title: "",
    content: "",
    path: "",
  }
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.MODAL.SHOW_MODAL:
      const {title, content, path} = action.payload

      state = {
        ...state,
        globalModal: {
          show: true,
          title: title,
          content: content,
          path: path
        }
      }
      break;

    case ACTIONS.MODAL.HIDE_MODAL:
      state = {
        ...state,
        globalModal: {
          show: false,
          title: "",
          content: "",
          path: ""
        }
      }
      break;
  }

  return state;
}

export default modalReducer;