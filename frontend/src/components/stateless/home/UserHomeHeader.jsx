import {Col, Container, Row} from "react-bootstrap";
import OverlayIcon from "../util/OverlayIcon";

import "../../../styles/home_style.css";

/**
 * @param props : {
 *   email : "",
 *   name : ""
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const UserHomeHeader = (props) => {
  return (
    <Container fluid className="home_header" style={{backgroundImage: `url(/images/home_header_background.jpg)`}}>
      <Row className="home_header_title">
        <p>{props.name}</p>
      </Row>
      <Row className="home_header_description">
        <p>Email: {props.email}</p>
      </Row>
    </Container>
  )
}

export default UserHomeHeader;