import {Row, Col, Card, Button} from "react-bootstrap";
import TagList from "../util/TagList";
import {Link} from "react-router-dom";
import { Component } from "react";
import { getProfileById } from "../../../actions/profileRequest";

/**
 * props : {
 *   blog: {
 *       ...
 *   },
 * }
 */
class BlogItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: null
    }

    getProfileById(props.blog.authorId, (data) => {
      this.setState({
        author: data
      })
    })
  }

  getAuthorInfo = () => {
    if (this.state.author == null) {
      return "Author Info"
    } else {
      return this.state.author.name + ", " + this.state.author.email
    }
  }

  render() {
    return (
      <Card style={{margin: 0, padding: 0}}>
        <Card.Header>
          <Row style={{justifyContent: "space-between"}}>
            <Col xs={"auto"}> Views: {this.props.blog.views} </Col>
            <Col xs={"auto"}> Likes: {this.props.blog.likes} </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title as={"h2"}>
            {this.props.blog.title}
          </Card.Title>
          <Card.Subtitle style={{margin: "10px"}}>
            <TagList tags={this.props.blog.tags || []} fontSize="18px"/>
          </Card.Subtitle>
          <Card.Text style={{color: "grey"}}>
            {this.props.blog.description}
          </Card.Text>
          <Row>
            <Col>
              <Link to={"/users/" + this.props.blog.authorId + "/home"} key={this.props.blog.authorId + "home"}>
                <Button style={{float:"left"}} variant="light" >
                  {this.getAuthorInfo()}
                </Button>
              </Link>
            </Col>
            <Col>
              <Link to={"/blogs/" + this.props.blog.id} key={this.props.blog.id + "blog"}>
                <Button style={{float:"right"}} variant="primary" >Read More</Button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Row style={{justifyContent: "space-between"}}>
            <Col xs={"auto"}>
              Create Time: <div style={{color:"grey"}}>{new Date(this.props.blog.gmtCreate).toLocaleString()}</div>
            </Col>
            <Col xs={"auto"}>
              Last Modified: <div style={{color:"grey"}}>{new Date(this.props.blog.gmtUpdate).toLocaleString()}</div>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    );
  } 
}
 
export default BlogItem;