import {Component} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import MDEditor from '@uiw/react-md-editor';

import "../../styles/blog_style.css";
import BlogHeader from "../stateless/BlogHeader";

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
      isEdit: false
    }
    this.props.getBlogDetailById(this.props.blogId);

  }

  blogContent = (isEdit) => {
    return (
      <Container style={{minHeight: "400px"}}>
        <Row style={{padding: "50px 30px"}}>
          {isEdit? (
            <MDEditor
              value={this.state.updatedContent}
              onChange={(value) => {this.setState({updatedContent: value})}}
              height={"800px"}
              toolbarHeight={"30px"}
            />
          ) : (
            <MDEditor.Markdown source={this.state.updatedContent} />
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
            <Col xs={"2"} lg={"1"}>
              <Button style={{width: "100%"}} variant={"secondary"} onClick={() => {this.setState({isEdit: false})}}>Cancel</Button>
            </Col>
            <Col xs={"2"} lg={"1"}>
              <Button style={{width: "100%"}} variant={"primary"} onClick={() => {this.setState({content: this.state.updatedContent})}}>Save</Button>
            </Col>
            <Col xs={"2"} lg={"1"}>
              <Button style={{width: "100%"}} variant={"primary"} onClick={() => {
                this.props.updateBlogContent({
                  id: this.props.blog.id,
                  bid: this.props.blog.bid,
                  content: this.state.updatedContent,
                  title: this.state.updatedTitle,
                  description: this.state.updatedDescription
                })
              }}>Submit</Button>
            </Col>
          </Row>
        </Card.Body>
      )
    } else {
      return (
        <Card.Body>
          <Row style={{justifyContent: "right"}}>
            <Col xs={"2"} lg={"1"}>
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