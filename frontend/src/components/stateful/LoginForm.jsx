import {Component} from "react";
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";

/**
 * @param props : {
 *   acquireJwtCredentials: (username, password) => {},
 * }
 * @returns {JSX.Element}
 * @constructor
 */
class LoginForm extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  performLogin = () => {
    this.props.acquireJwtCredentials(this.state.username, this.state.password)
  }

  changeStateOnEvent = (key) => {
    return (event) => {
      this.setState({
        [key]: event.target.value
      })
    }
  }

  render() {
    return (
      <Form className={"shadow p-3 mb-5 bg-white rounded"}>
        <FloatingLabel controlId="floatingLoginEmail" label="Email address" className="mt-2 mb-4">
          <Form.Control type="email"
                        placeholder="name@example.com"
                        onChange={this.changeStateOnEvent("username")}
                        required />
        </FloatingLabel>


        <FloatingLabel controlId="floatingLoginPassword" label="Password" className="mb-4">
          <Form.Control type="password"
                        placeholder="Password"
                        onChange={this.changeStateOnEvent("password")}
                        required />
        </FloatingLabel>

        <Row style={{justifyContent:"right"}} className={"mb-2"}>
          <Col xs={"3"}>
            <Button style={{width: "100%"}} variant="primary" onClick={this.performLogin}>
              Log in
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default LoginForm;