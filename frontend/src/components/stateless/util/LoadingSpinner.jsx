import {Col, Container, Row, Spinner} from "react-bootstrap";
import React from "react";

const LoadingSpinner = (props) => {
  return (
    <Container style={{padding: "100px"}}>
      <Row style={{justifyContent: "center"}}>
        <Col xs={"3"}>
          <Spinner animation="border" size="large" style={{width: "150px", height: "150px"}} />
        </Col>
      </Row>
    </Container>
  )
}

export default LoadingSpinner;