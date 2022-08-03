import {Component} from "react";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import UserHomeHeader from "../stateless/home/UserHomeHeader";
import UserProfile from "../stateless/home/UserProfile";
import UserHomeContent from "../stateless/home/UserHomeContent";
import {getProfileById} from "../../actions/profileRequest";


/**
 * props : {
 *   userId : "",
 *   currentUser : {
 *     username : "",
 *     id : "",
 *     uid : ""
 *   }
 * }
 */
class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null
    }

    getProfileById(props.userId, (data) => {
      this.setState({
        loading: false,
        profile: {
          ...data
        }
      })
    }, (error) => {
      console.log(error)
      this.setState({
        loading: false,
        error: error.data
      })
    })
  }

  loadingPage = () => {
    return (
      <Container style={{padding: "100px"}}>
        <Row style={{justifyContent: "center"}}>
          <Col xs={"3"}>
            <Spinner animation="border" size="large" style={{width: "150px", height: "150px"}} />
          </Col>
        </Row>
      </Container>
    )
  }

  errorPage = () => {
    return (
      <Container className={"shadow"} style={{padding: "20px"}}>
        <h2>ERROR {this.state.error.status || ""}</h2>
        <h3>{this.state.error.message || "Cannot load page"}</h3>
      </Container>
    )
  }

  render() {
    if (this.state.loading === true) {
      return this.loadingPage()
    } else if (this.state.error != null) {
      return this.errorPage()
    } else {
      return(
        <Container fluid style={{margin: 0, padding: 0}}>
          <UserHomeHeader {...this.state.profile}/>
          <Row>
            <Col xs={3} style={{margin: "0% 2% 4% 4%", position: "relative", top: "-200px"}}>
              <UserProfile {...this.state.profile}/>
            </Col>
            <Col xs={8} style={{margin: "3% 0%"}}>
              <UserHomeContent authorId={this.props.currentUser.uid} />
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default UserHome;