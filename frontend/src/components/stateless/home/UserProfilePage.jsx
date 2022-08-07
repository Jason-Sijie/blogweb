import {useParams} from "react-router-dom";
import UserProfileForm from "../../stateful/UserProfileForm";
import {Col, Container, Row} from "react-bootstrap";

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
  let params = useParams()
  return (
    <Container>
      <Row style={{justifyContent:"center", marginTop:"10%"}}>
        <Col xs={"9"} >
          <UserProfileForm userId={params.id}
                           currentUser={props.currentUser}
                           handleModalShow={props.handleModalShow}/>
        </Col>
      </Row>
    </Container>

  )
}

export default UserProfilePage;