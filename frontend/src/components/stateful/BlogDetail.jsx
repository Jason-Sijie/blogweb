import {Component} from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import MDEditor from '@uiw/react-md-editor';

import "../../styles/blog_style.css";
import BlogHeader from "../stateless/blog/BlogHeader";
import TagList from "../stateless/util/TagList";
import TagListToasts from "../stateless/util/TagListToasts";

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

  removeTagFromUpdatedTags = (target) => {
    this.setState({updatedTags: this.state.updatedTags.filter(function(tag) {
        return tag.name !== target.name
      })});
  }

  AddTagToTags = () => {
    if (this.state.newTag === "") {
      return;
    }

    let target = this.state.newTag
    let newTags = this.state.updatedTags.filter(function(tag) {
      return tag.name !== target
    })

    this.setState({updatedTags: [...newTags, {"name": target}]});
  }

  changeStateOnEvent = (key) => {
    return (event) => {
      this.setState({
        [key]: event.target.value
      })
    }
  }

  blogMetadataForm = (isEdit) => {
    if (isEdit) {
      return (
        <Row style={{padding: "30px 30px 0px"}}>
          <Form className={"shadow p-3 mb-5 bg-white rounded"}>
            <Form.Group className="mb-3" controlId="blogTitle">
              <Form.Label>Blog Title</Form.Label>
              <Form.Control type="text"
                            value={this.state.updatedTitle}
                            onChange={this.changeStateOnEvent("updatedTitle")}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="blogContent">
              <Form.Label>Blog Description</Form.Label>
              <Form.Control as="textarea"
                            rows={3}
                            value={this.state.updatedDescription}
                            onChange={this.changeStateOnEvent("updatedDescription")}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="tag">
              <Form.Label>Add New Tag</Form.Label>
              <Row>
                <Col xs={"8"}>
                  <Form.Control type="text"
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
              <TagListToasts tags={this.state.updatedTags} onCloseAction={this.removeTagFromUpdatedTags}/>
            </Row>
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
              height={"1000px"}
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
              <TagList tags={this.state.updatedTags || []} fontSize={"18px"}/>
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
    if (prevProps.blog !== this.props.blog) {
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