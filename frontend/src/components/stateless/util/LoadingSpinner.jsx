import {Col, Container, Row, Spinner} from "react-bootstrap";
import React from "react";

/**
 * @param props : {
 *   padding: "", (optional)
 *   position: "", (optional)
 *   size: "", (optional)
 * }
 * @returns 
 */
const LoadingSpinner = (props) => {
  return (
    <Container style={{padding: props.padding || "100px"}}>
      <Row style={{justifyContent: props.position || "center"}}>
        <Col xs={"3"}>
          <Spinner animation="border" size={props.size || "large"} style={{width: "150px", height: "150px"}} />
        </Col>
      </Row>
    </Container>
  )
}

export default LoadingSpinner;