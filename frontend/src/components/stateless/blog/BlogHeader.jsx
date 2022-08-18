import {Col, Container, Row} from "react-bootstrap";
import OverlayIcon from "../util/OverlayIcon";

import "../../../styles/blog_style.css";
import { Component } from "react";
import { isBlogLikedByCurrentUser } from "../../../actions/userRequests";
import { likeBlogById, unlikeBlogById } from "../../../actions/blogRequests";

/**
 * @param props: {
 *   id: ,
 *   title: ,
 *   description: ,
 *   likes: ,
 *   views: ,
 *   currentUser: {
 *     id: , 
 *   }
 * }
 * @returns {JSX.Element}
 */
class BlogHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
    }

    this.updateLikedStatus()
  }

  updateLikedStatus = () => {
    if (this.props.currentUser == null || this.props.currentUser.id == null) {
      return;
    }

    isBlogLikedByCurrentUser(this.props.id, (data) => {
      if (data != null && data.id != null) {
        this.setState({
          liked: true
        })
      }
    }, error => {
      console.log(error.message)
      this.setState({
        liked: false
      })
    })
  }

  handleLikedClick = () => {
    if (this.props.currentUser == null || this.props.currentUser.id == null) {
      return;
    }
    console.log("handle like button")
    if (this.state.liked === true) {
      unlikeBlogById(this.props.id, (data) => {
        this.props.refreshBlogDetail()
        this.setState({
          liked: false
        })
      }, (error) => {
        this.updateLikedStatus()
      })
    } else {
      likeBlogById(this.props.id, (data) => {
        this.props.refreshBlogDetail()
        this.setState({
          liked: true
        })
      }, (error) => {
        this.updateLikedStatus()
      })
    }
  }

  render() {
    return (
      <Container>
        <Container className="blog_header" style={{backgroundImage: `url(/images/blog_header_background.jpg)`}}>
          <Row style={{justifyContent: "space-between"}}>
            <Col xs={"auto"} style={{margin: "20px 20px"}}>
              <OverlayIcon trigger={['hover', 'focus']} placement={"right"} src={"/icons/views.png"} header={"Views"}
                           body={() => (<div><strong>{this.props.views}</strong> views in total</div>)}  />
            </Col>
            <Col xs={"auto"} style={{margin: "20px 20px"}} onClick={this.handleLikedClick} >
              <OverlayIcon trigger={['hover', 'focus']} 
                            placement={"left"} 
                            src={this.state.liked ? "/icons/likes_active.png" : "/icons/likes.png"} 
                            header={"Likes"}
                            body={() => (<div><strong>{this.props.likes}</strong> likes in total</div>)} />
            </Col>
          </Row>
          <Row>
            <div className="blog_header_title">{this.props.title}</div>
          </Row>
          <Row>
            <div className="blog_header_description">{this.props.description}</div>
          </Row>
        </Container>
      </Container>
    )
  }
}

export default BlogHeader;