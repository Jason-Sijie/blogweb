import {Component} from "react";
import {Button, Card, Col, Container, Dropdown, Form, ListGroup, ListGroupItem, Row, Toast} from "react-bootstrap";
import MDEditor from '@uiw/react-md-editor';

import "../../styles/blog_style.css";
import BlogHeader from "../stateless/BlogHeader";
import TagList from "../stateless/TagList";

/**
 * @Params props: {
 *   blogId: ,
 *   blog: {},
 *   getBlogDetailById: (id) => {}
 *   updateBlogContent: (blog) => {}
 * }
 */
class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedContent: props.blog.content || "",
      updatedTitle: props.blog.title || "",
      updatedDescription: props.blog.description || "",
      updatedTags: props.blog.tags || [],
      newTag: "",
      isEdit: false
    }
    this.props.getBlogDetailById(this.props.blogId);
  }

  removeTagFromUpdatedTags = (name) => {
    this.setState({updatedTags: this.state.updatedTags.filter(function(tag) {
        return tag.name !== name
      })});
  }

  tagListToasts = (tags) => {
    const toasts = tags.map((tag) =>
      <Toast style={{margin: "10px"}} onClose={() => this.removeTagFromUpdatedTags(tag.name)}>
        <Toast.Header>
          <strong  className="me-auto">Tag Name</strong>
          <small>Delete Tag</small>
        </Toast.Header>
        <Toast.Body>{tag.name}</Toast.Body>
      </Toast>
    )

    return (
      <Row>
        {toasts}
      </Row>
    )
  }

  blogMetadataForm = (isEdit) => {
    if (isEdit) {
      return (
        <Row style={{padding: "30px 30px 0px"}}>
          <Form>
            <Form.Group className="mb-3" controlId="blogTitle">
              <Form.Label>Blog Title</Form.Label>
              <Form.Control type="text"
                            value={this.state.updatedTitle}
                            onChange={(event) => this.setState({updatedTitle: event.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="blogContent">
              <Form.Label>Blog Description</Form.Label>
              <Form.Control as="textarea"
                            rows={3}
                            value={this.state.updatedDescription}
                            onChange={(event) => this.setState({updatedDescription: event.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="tag">
              <Form.Label>Add New Tag</Form.Label>
              <Row>
                <Col xs={"8"}>
                  <Form.Control type="text"
                                onChange={(event) => this.setState({newTag: event.target.value})}/>
                </Col>
                <Col xs={"4"}>
                  <Button style={{width: "100%"}} variant={"primary"} onClick={() => {
                    this.setState({updatedTags: [...this.state.updatedTags, {"name": this.state.newTag}]})
                  }}> Add </Button>
                </Col>
              </Row>
            </Form.Group>
            {this.tagListToasts(this.state.updatedTags)}
          </Form>
        </Row>
      )
    }
  }

  blogContent = (isEdit) => {
    return (
      <Container style={{minHeight: "500px"}}>
        {this.blogMetadataForm(isEdit)}

        <Row style={{padding: "30px 30px"}}>
          {isEdit? (
            <MDEditor
              value={this.state.updatedContent}
              onChange={(value) => {this.setState({updatedContent: value})}}
              height={"800px"}
              toolbarHeight={"30px"}
            />
          ) : (
            <MDEditor.Markdown source={this.state.updatedContent}
                               height={"800px"}/>
          )}
        </Row>
      </Container>
    )
  }

  editPanel = (isEdit) => {
    if (isEdit) {
      return(
        <Card.Body>
          <Row style={{justifyContent: "right"}}>
            <Col xs={"2"} xxl={"1"}>
              <Button style={{width: "100%"}} variant={"secondary"} onClick={() => {this.setState({isEdit: false})}}>Back</Button>
            </Col>
            <Col xs={"2"} xxl={"1"}>
              <Button style={{width: "100%"}} variant={"primary"} onClick={() => {
                this.props.updateBlogContent({
                  ...this.props.blog,
                  content: this.state.updatedContent,
                  title: this.state.updatedTitle,
                  description: this.state.updatedDescription,
                  tags: this.state.updatedTags
                })
              }}>Submit</Button>
            </Col>
          </Row>
        </Card.Body>
      )
    } else {
      return (
        <Card.Body>
          <Row style={{justifyContent: "space-between"}}>
            <Col xs={"10"} style={{margin: "10px 0px"}}>
              <TagList tags={this.state.updatedTags || []} fontSize={"15px"}/>
            </Col>
            <Col xs={"2"} xl={"1"} style={{margin: "10px 0px"}}>
              <Button style={{width: "100%"}} variant={"primary"} onClick={() => {this.setState({isEdit: true})}}>Edit</Button>
            </Col>
          </Row>
        </Card.Body>
      )
    }
  }

  metadataPanel = (isEdit) => {
    return(
      <Container>
        <Card>
          <Card.Header>
            <Row style={{justifyContent: "space-between"}}>
              <Col xs={"auto"}>
                Create Time: <div style={{color:"grey"}}>{new Date(this.props.blog.gmtCreate).toLocaleString()}</div>
              </Col>
              <Col xs={"auto"}>
                Last Modified: <div style={{color:"grey"}}>{new Date(this.props.blog.gmtUpdate).toLocaleString()}</div>
              </Col>
            </Row>
          </Card.Header>
          {this.editPanel(isEdit)}
        </Card>
      </Container>
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.blog != this.props.blog) {
      this.setState({
        updatedContent: this.props.blog.content || "",
        updatedTitle: this.props.blog.title || "",
        updatedDescription: this.props.blog.description || "",
        updatedTags: this.props.blog.tags || [],
        isEdit: false
      })
    }
  }

  render() {
    return(
      <Container>
        <BlogHeader {...this.props.blog} />
        {this.metadataPanel(this.state.isEdit)}
        {this.blogContent(this.state.isEdit)}
      </Container>
    )
  }
}

export default BlogDetail;