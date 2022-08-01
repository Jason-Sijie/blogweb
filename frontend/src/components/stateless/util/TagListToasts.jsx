import {Row, Toast} from "react-bootstrap";
import {getColorFromString} from "../../../constants/colors";

/**
 * @param props : {
 *   tags : [],
 *   onCloseAction : () => {},
 *   toastWidth : "" (optional)
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const TagListToasts = (props) => {
  const {tags, onCloseAction, toastWidth} = props;

  const toasts = tags.map((tag) =>
    <Toast key={"tagToast-" + tag.name} style={{margin: "10px", width: toastWidth || "auto"}} onClose={() => onCloseAction(tag)}>
      <Toast.Header>
        <strong className="me-auto" style={{color: getColorFromString(tag.name)}}>Tag Name</strong>
      </Toast.Header>
      <Toast.Body>{tag.name}</Toast.Body>
    </Toast>
  )

  return (
    <Row>
      {toasts}
    </Row>
  )
}

export default TagListToasts;