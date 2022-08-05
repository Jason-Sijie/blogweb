import {push} from "@lagunovsky/redux-react-router";

export const toErrorPage = (data) => dispatch => {
    dispatch(push("/error", data))
}