import {ACTIONS} from "../constants/actions";

export const handleModalClose = () => dispatch => {
  dispatch({
    type: ACTIONS.MODAL.HIDE_MODAL,
    payload: {}
  });
}

export const handleModalShow = (title, content) => dispatch => {
  dispatch({
    type: ACTIONS.MODAL.SHOW_MODAL,
    payload: {
      title: title,
      content: content
    }
  });
}