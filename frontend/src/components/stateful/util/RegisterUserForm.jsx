import {Component} from "react";
import {Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";

/**
 * props : {
 *   registerUser: (username, password) => {}
 * }
 */
class RegisterUserForm extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: ""
    };
  }

  registerUser = (event) => {
    event.preventDefault();
    if (this.state.password2 !== this.state.password) {
      this.props.handleModalShow("Error", "Please repeat your password correctly")
      return;
    }
    this.props.registerUser(this.state.username, this.state.password)
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
      <Form className={"shadow p-3 mb-5 bg-white rounded"} onSubmit={this.registerUser}>
        <Row>
          <h2>Create new account</h2>
        </Row>
        <FloatingLabel controlId="floatingLoginEmail" label="Email address" className="mt-2 mb-4">
          <Form.Control type="email"
                        placeholder="Email Address"
                        onChange={this.changeStateOnEvent("username")}
                        required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingLoginPassword" label="Password" className="mb-4">
          <Form.Control type="password"
                        placeholder="Password"
                        onChange={this.changeStateOnEvent("password")}
                        required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingLoginPassword2" label="Repeat password" className="mb-4">
          <Form.Control type="password"
                        placeholder="Password"
                        onChange={this.changeStateOnEvent("password2")}
                        required />
        </FloatingLabel>

        <Row style={{justifyContent:"right"}} className={"mb-2"}>
          <Col xs={"3"}>
            <Button style={{width: "100%"}} variant="primary" type="submit">
              Register
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default RegisterUserForm;