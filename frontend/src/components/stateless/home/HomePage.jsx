import UserHome from "../../stateful/UserHome";
import {Navigate, NavLink} from "react-router-dom";
import {Button, Col, Container, Row} from "react-bootstrap";

/**
 * @param props : {
 *   currentUser : {
 *     username : "",
 *     id : "",
 *     uid : ""
 *   },
 *   handleModalShow : (title, content, path) => {}
 * }
 * @returns {*}
 * @constructor
 */
const HomePage = (props) => {
  const {currentUser} = props;

  if (currentUser == null || currentUser.username == null) {
    return (
      <div className={"pt-4"}>
        <Container className={"shadow p-3 mt-5 bg-white rounded"} style={{width: "30%"}}>
          <Row className={"text-center mb-3"}>
            <h2>You need to login first</h2>
          </Row>
          <Row style={{justifyContent: "center"}}>
            <Col xs={3}>
              <NavLink to={"/login"}>
                <Button style={{width: "100%"}}>To Login</Button>
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>
    )
  } else {
    return <UserHome userId={currentUser.id}
                     currentUser={currentUser}
                     handleModalShow={props.handleModalShow}/>
  }
}

export default HomePage;