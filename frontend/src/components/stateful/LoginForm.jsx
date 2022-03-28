import {Component} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

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
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email"
                        placeholder="Enter email"
                        onChange={(event) => this.setState({username: event.target.value})}
                        required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"
                        placeholder="Password"
                        onChange={(event) => this.setState({password: event.target.value})}
                        required />
        </Form.Group>

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