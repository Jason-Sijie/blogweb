import {ACTIONS} from "../constants/actions";

const initialState = {
  globalModal: {
    show: false,
    title: "",
    content: ""
  }
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.MODAL.SHOW_MODAL:
      const {title, content} = action.payload

      state = {
        ...state,
        globalModal: {
          show: true,
          title: title,
          content: content
        }
      }
      break;

    case ACTIONS.MODAL.HIDE_MODAL:
      state = {
        ...state,
        globalModal: {
          show: false,
          title: "",
          content: ""
        }
      }
  }

  return state;
}

export default modalReducer;