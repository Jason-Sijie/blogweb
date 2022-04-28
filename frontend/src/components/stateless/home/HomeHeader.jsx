import {Col, Container, Row} from "react-bootstrap";
import OverlayIcon from "../util/OverlayIcon";

import "../../../styles/home_style.css";

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HomeHeader = (props) => {
  return (
    <Container fluid className="home_header" style={{backgroundImage: `url(/images/home_header_background.jpg)`}}>
      <Row className="home_header_title">
        <p>Jason Yu</p>
      </Row>
      <Row className="home_header_description">
        <p>Email: yusj.jason@gmail.com</p>
      </Row>
    </Container>
  )
}

export default HomeHeader;