import {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Navigate} from 'react-router-dom';
import UserHomeHeader from "../stateless/home/UserHomeHeader";
import UserProfile from "../stateless/home/UserProfile";
import UserHomeContent from "../stateless/home/UserHomeContent";
import {getProfileById} from "../../actions/profileRequest";
import LoadingSpinner from "../stateless/util/LoadingSpinner";


/**
 * props : {
 *   userId : "",
 *   currentUser : {
 *     username : "",
 *     id : "",
 *     uid : ""
 *   },
 *   handleModalShow : (title, content, path) => {}
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
      if (props.currentUser != null && props.currentUser.id != null && props.userId.toString() === props.currentUser.id.toString()) {
        // need to create profile
        this.props.handleModalShow("No User Profile",
          "You need to create your user profile first. Please click the \"Close\" button to jump to Profile Creation Page", "/users/" + props.userId + "/profile")
      } else {
        // service error
        this.setState({
          loading: false,
          error: error.data,
        })
      }
    })
  }

  render() {
    if (this.state.loading === true) {
      return <LoadingSpinner/>
    } else if (this.state.error != null) {
      return <Navigate replace to="/error" state={this.state.error}/>
    } else {
      return(
        <Container fluid style={{margin: 0, padding: 0}}>
          <UserHomeHeader {...this.state.profile}/>
          <Row>
            <Col xs={3} style={{margin: "0% 2% 4% 4%", position: "relative", top: "-200px"}}>
              <UserProfile {...this.state.profile}/>
            </Col>
            <Col xs={8} style={{margin: "3% 0%"}}>
              <UserHomeContent authorId={this.props.currentUser.uid}
                               name={this.state.profile.name}
                               handleModalShow={this.props.handleModalShow}/>
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default UserHome;