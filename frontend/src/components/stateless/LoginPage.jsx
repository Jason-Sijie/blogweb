import LoginForm from "../stateful/LoginForm";
import {Col, Container, Row} from "react-bootstrap";

/**
 * @param props : {
 *   acquireJwtCredentials: (username, password) => {},
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const LoginPage = (props) => {

  return (
    <Container>
      <Row style={{justifyContent:"center", marginTop: "10%"}}>
        <Col xs={"6"} style={{borderStyle:"solid", padding:"10px", borderColor:"lightgray"}} >
          <LoginForm {...props}/>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage;