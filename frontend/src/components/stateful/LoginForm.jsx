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

  render() {
    return (
      <Form>
        <FloatingLabel controlId="floatingLoginEmail" label="Email address" className="mb-3">
          <Form.Control type="email"
                        placeholder="name@example.com"
                        onChange={(event) => this.setState({username: event.target.value})}
                        required />
        </FloatingLabel>


        <FloatingLabel controlId="floatingLoginPassword" label="Password" className="mb-3">
          <Form.Control type="password"
                        placeholder="Password"
                        onChange={(event) => this.setState({password: event.target.value})}
                        required />
        </FloatingLabel>

        <Row style={{justifyContent:"right"}}>
          <Col xs={"auto"}>
            <Button variant="primary" onClick={this.performLogin}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default LoginForm;