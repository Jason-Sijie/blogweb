import {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Navigate} from 'react-router-dom';
import UserHomeHeader from "../../stateless/home/UserHomeHeader";
import UserProfile from "../../stateless/home/UserProfile";
import UserHomeContent from "../../stateless/home/UserHomeContent";
import {getProfileAvatarById, getProfileById} from "../../../actions/profileRequest";
import LoadingSpinner from "../../stateless/util/LoadingSpinner";
import { getLikedBlogsByUserId } from "../../../actions/userRequests";
import { appConfig } from "../../../config";
import {api} from "../../../config";


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
      error: null,
      likedBlogs: {
        content: [],
        totalPages: 0,
        number: 0
      }
    }

    getProfileById(this.props.userId, (data) => {
      console.log("succeeded to get profile")
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
          "You need to create your user profile first. Please click the \"Close\" button to jump to Profile Creation Page", "/users/profile")
      } else {
        // service error
        this.setState({
          loading: false,
          error: error.data,
        })
      }
    })

    getLikedBlogsByUserId({
      userId: props.userId,
      page: 0,
      size: appConfig.blogListPageSize
    }, (data) => {
      this.setState({
        likedBlogs: data
      })
    }, error => {
      this.props.handleModalShow("Failed to retrieve liked blogs", error.message, "")
    })
  }

  getLikedBlogsWithParams = (params) => {
    getLikedBlogsByUserId({
      userId: this.props.userId,
      page: params.page,
      size: params.size || appConfig.blogListPageSize
    }, (data) => {
      this.setState({
        likedBlogs: data
      })
    }, error => {
      this.props.handleModalShow("Failed to retrieve liked blogs", error.message, "")
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
            <Col xs={3} style={{margin: "0% 2% 4% 2%", position: "relative", top: "-150px"}}>
              <UserProfile {...this.state.profile}
                            avatar={api.blogWeb.user + "/" + this.props.userId + "/profiles/avatar"} />
            </Col>
            <Col xs={8}>
              <UserHomeContent authorId={this.props.userId}
                               currentUser={this.props.currentUser}
                               name={this.state.profile.name}
                               likedBlogs={this.state.likedBlogs}
                               getLikedBlogsWithParams={this.getLikedBlogsWithParams}
                               handleModalShow={this.props.handleModalShow}/>
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default UserHome;