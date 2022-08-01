import {ACTIONS} from "../constants/actions";
import {push} from "@lagunovsky/redux-react-router";

export const handleModalClose = (path = "") => dispatch => {
  dispatch({
    type: ACTIONS.MODAL.HIDE_MODAL,
  });

  if (path != null && path !== "") {
    dispatch(push(path))
  }
}

export const handleModalShow = (title, content, path) => dispatch => {
  dispatch({
    type: ACTIONS.MODAL.SHOW_MODAL,
    payload: {
      title: title,
      content: content,
      path: path
    }
  });
}