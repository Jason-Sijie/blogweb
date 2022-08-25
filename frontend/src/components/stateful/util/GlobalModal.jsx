import {Button, Modal} from "react-bootstrap";

/**
 * A global popup modal
 * @param props : {
 *   show: boolean,
 *   title: "",
 *   content: "",
 *   path: "", (optional)
 *   handleModalClose: () => {}
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const GlobalModal = (props) => {
  const {show, title, content, path, handleModalClose} = props;

  return (
    <>
      <Modal show={show} onHide={() => handleModalClose(path)} size="md">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleModalClose(path)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GlobalModal;