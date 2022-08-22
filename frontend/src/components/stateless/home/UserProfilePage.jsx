import UserProfileForm from "../../stateful/home/UserProfileForm";
import {Col, Container, Row, NavLink, Button} from "react-bootstrap";

/**
 * @param props : {
 *   currentUser : {
 *     username : "",
 *     id : "",
 *     uid : ""
 *   },
 *   handleModalShow : (title, content, path) => {}
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const UserProfilePage = (props) => {

  if (props.currentUser == null || props.currentUser.username == null) {
    return (
      <div className={"pt-4"}>
        <Container className={"shadow p-3 mt-5 bg-white rounded"} style={{width: "50%"}}>
          <Row className={"text-center mb-3"}>
            <h2>You need to login first</h2>
          </Row>
          <Row style={{justifyContent: "center"}}>
            <Col xs={4} lg={3}>
              <NavLink to={"/login"}>
                <Button style={{width: "100%"}}>Sign In</Button>
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>
    )
  } else {
    return (
      <Container>
        <Row style={{justifyContent:"center", marginTop:"10%"}}>
          <Col xs={"9"} >
            <UserProfileForm userId={props.currentUser.id}
                             currentUser={props.currentUser}
                             handleModalShow={props.handleModalShow}/>
          </Col>
        </Row>
      </Container>
    )
  }

 
}

export default UserProfilePage;