import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

/**
 * @param props : {
 *   logout : () => {}
 *   currentUser : {
 *     username : ""
 *   }
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const LogoutPage = (props) => {
  const {logout, currentUser} = props;

  if (currentUser.username == null || currentUser.username === "") {
    return (
      <Container>
        <Row style={{justifyContent: "center", marginTop: "10%"}}>
          <Col xs={"6"} className={"shadow p-3 mb-5 bg-white rounded"}>
            <Row style={{padding:"10px"}}>
              <h2> You are not logged in. </h2>
            </Row>
            <Row style={{justifyContent: "center", padding: "10px"}}>
              <Col xs={"6"}>
                <Link to={"/"}>
                  <Button style={{width: "100%"}}>
                    Back to home page
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  } else {
    return (
      <Container>
        <Row style={{justifyContent: "center", marginTop: "10%"}}>
          <Col xs={"6"} className={"shadow p-3 mb-5 bg-white rounded"}>
            <Row style={{padding: "10px"}}>
              <h2> Hello {currentUser.username} </h2>
              <h3> Are you sure you want to log out?</h3>
            </Row>
            <Row style={{justifyContent: "right", padding: "10px"}}>
              <Col xs={"4"}>
                <Button style={{width: "100%"}} onClick={logout}>
                  Log out
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default LogoutPage;