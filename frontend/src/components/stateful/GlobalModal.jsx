import {Button, Modal} from "react-bootstrap";

/**
 * A global popup modal
 * @param props : {
 *   show: boolean,
 *   title: string,
 *   content: string,
 *   handleClose: () => {}
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const GlobalModal = (props) => {
  const {show, title, content, handleModalClose} = props;

  return (
    <>
      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GlobalModal;