import {Component} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import MDEditor from "@uiw/react-md-editor";
import TagListToasts from "../stateless/util/TagListToasts";
import {createBlog} from "../../actions/blogRequests";
import {Navigate} from "react-router-dom";

/**
 * props : {
 *   currentUser : {
 *     username : "",
 *     id : "",
 *     uid : ""
 *   },
 *   handleModalShow : (title, content, path) => {}
 * }
 */
class CreateBlogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      content: "",
      newTag: "",
      tags: []
    }

    if (!this.isCurrentUserLoggedIn()) {
      this.props.handleModalShow("Cannot write new blog", "You must login first", "/login")
    }
  }

  isCurrentUserLoggedIn = () => {
    return !(this.props.currentUser == null || this.props.currentUser.username == null);
  }

  createBlog = () => {
    createBlog({
      title: this.state.title,
      description: this.state.description,
      content: this.state.content,
      tags: this.state.tags
    }, (data) => {
      console.log("Created Blog: " + data)
      this.props.handleModalShow("Created Blog Successfully", "Title: " + data.title, "/blogs/" + data.id)
    }, (error) => {
      console.log(error)
      let message = error.data != null ? error.data.message: ""
      if (error.status === 403) {
        message += ". You must log in first"
      }
      this.props.handleModalShow("Failed to create a blog", message, "")
    })
  }

  changeStateOnEvent = (key) => {
    return (event) => {
      this.setState({
        [key]: event.target.value
      })
    }
  }

  removeTagFromUpdatedTags = (target) => {
    this.setState({tags: this.state.tags.filter(function(tag) {
        return tag.name !== target.name
      })});
  }

  AddTagToTags = () => {
    if (this.state.newTag === "") {
      return;
    }

    let target = this.state.newTag
    let newTags = this.state.tags.filter(function(tag) {
      return tag.name !== target
    })

    this.setState({
      tags: [...newTags, {"name": target}],
      newTag: ""
    });
  }

  blogMetadataForm = () => {
    return (
      <Row style={{padding: "30px 30px 0px"}}>
        <Form className={"shadow p-3 mb-5 bg-white rounded"}>
          <Form.Group className="mb-3" controlId="blogTitle">
            <Form.Label><h4>Blog Title</h4></Form.Label>
            <Form.Control type="text"
                          value={this.state.title}
                          onChange={this.changeStateOnEvent("title")}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="blogDescription">
            <Form.Label><h5>Blog Description</h5></Form.Label>
            <Form.Control as="textarea"
                          rows={3}
                          value={this.state.description}
                          onChange={this.changeStateOnEvent("description")}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="tag">
            <Form.Label><h5>Add New Tag</h5></Form.Label>
            <Row>
              <Col xs={"8"}>
                <Form.Control type="text"
                              value={this.state.newTag}
                              onChange={this.changeStateOnEvent("newTag")}/>
              </Col>
              <Col xs={"4"}>
                <Button style={{width: "100%"}}
                        variant={"primary"}
                        onClick={this.AddTagToTags}>
                  Add Tag
                </Button>
              </Col>
            </Row>
          </Form.Group>

          <Row>
            <TagListToasts tags={this.state.tags} onCloseAction={this.removeTagFromUpdatedTags}/>
          </Row>

          <Row style={{justifyContent: "center"}}>
            <Col>
              <Button style={{width: "100%"}} variant={"Success"} onClick={this.createBlog}>
                Create Blog
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    )
  }

  render() {
    return this.state.error == null ? (
      <Container style={{minHeight: "500px"}} fluid>
        {this.blogMetadataForm()}
        <Row style={{padding: "30px 30px"}}>
          <MDEditor
            value={this.state.content}
            onChange={(value) => {this.setState({content: value})}}
            height={"1000px"}
            toolbarHeight={"30px"}
          />
        </Row>
      </Container>
    ) : (
      <Navigate replace to="/error" state={this.state.error}/>
    )
  }
}

export default CreateBlogForm;