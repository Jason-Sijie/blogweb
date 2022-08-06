import {Col, Container, Row} from "react-bootstrap";
import RegisterUserForm from "../../stateful/RegisterUserForm";

/**
 * @param props : {
 *   registerUser: (username, password) => {}
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const RegisterPage = (props) => {
  return (
    <Container>
      <Row style={{justifyContent:"center", marginTop: "10%"}}>
        <Col xs={"6"} >
          <RegisterUserForm {...props}/>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterPage;