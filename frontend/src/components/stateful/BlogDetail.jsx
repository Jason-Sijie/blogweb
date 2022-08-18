import {Component} from "react";
import {Button, Card, Col, Container, Form, Offcanvas, Row} from "react-bootstrap";
import MDEditor from '@uiw/react-md-editor';

import "../../styles/blog_style.css";
import BlogHeader from "../stateless/blog/BlogHeader";
import TagList from "../stateless/util/TagList";
import TagListToasts from "../stateless/util/TagListToasts";
import {getBlogDetailById, updateBlogContent} from "../../actions/blogRequests";
import LoadingSpinner from "../stateless/util/LoadingSpinner";
import {Navigate} from "react-router-dom";
import { getProfileById, getProfileByUid } from "../../actions/profileRequest";
import UserProfile from "../stateless/home/UserProfile";

/**
 * @Params props: {
 *   blogId : int,
 *   currentUser : (optional) {
 *     id : int,
 *     uid : "",
 *     username : ""
 *   },
 *   handleModalShow : (title, content, path) => {}
 * }
 */
class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {
        gmtCreate: "",
        gmtUpdate: "",
        authorId: ""
      },
      profile: {
        name: "",
        email: ""
      },
      profileShow: false,
      newTag: "",
      isEdit: false,
      loading: true
    }
    this.refreshBlogDetail()
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

    this.setState({
      updatedTags: [...newTags, {"name": target}],
      newTag: ""
    });
  }

  changeStateOnEvent = (key) => {
    return (event) => {
      this.setState({
        [key]: event.target.value
      })
    }
  }

  refreshBlogDetail = () => {
    getBlogDetailById(this.props.blogId, (data) => {
      this.setState({
        blog: data,
        updatedContent: data.content || "",
        updatedTitle: data.title || "",
        updatedDescription: data.description || "",
        updatedTags: data.tags || [],
        loading: false
      })

      getProfileByUid(this.state.blog.authorId, data => {
        this.setState({
          profile: data
        })
      }, error => {
        console.log(error.message)
      })

    }, (error) => {
      this.setState({
        loading: false,
        error: error.data
      })
    });

  }

  updateBlogContentWithMessage = () => {
    updateBlogContent({
      ...this.state.blog,
      content: this.state.updatedContent,
      title: this.state.updatedTitle,
      description: this.state.updatedDescription,
      tags: this.state.updatedTags
    }, (data) => {
      this.props.handleModalShow("Updated Blog Successfully", "Blog Title: " + data.title, "/blogs/" + data.id);
      this.refreshBlogDetail();
    }, (error) => {
      console.log(error)
      let message = error.data != null ? error.data.message : ""
      this.props.handleModalShow("Failed to update the blog", message, "");
    })
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
            <Form.Group className="mb-3" controlId="blogDescription">
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
              <TagListToasts tags={this.state.updatedTags} onCloseAction={this.removeTagFromUpdatedTags}/>
            </Row>
          </Form>
        </Row>
      )
    }
  }

  blogContent = () => {
    let isEdit = this.state.isEdit;

    return (
      <div className="p-2" style={{minHeight: "500px"}}>
        {this.blogMetadataForm(isEdit)}

        <Row style={{padding: "30px 30px"}}>
          {isEdit ? (
            <MDEditor
              value={this.state.updatedContent}
              onChange={(value) => {this.setState({updatedContent: value})}}
              height={"1000px"}
              toolbarHeight={"30px"}
            />
          ) : (
            <MDEditor.Markdown source={this.state.updatedContent}
                               height={"800px"} 
                               warpperElement={'light'}/>
          )}
        </Row>
      </div>
    )
  }

  displayEditPanel = () => {
    let shouldDisplay = this.props.currentUser != null && this.props.currentUser.uid === this.state.blog.authorId

    return shouldDisplay ? (
      this.editPanel()
    ) : (
      <Row style={{justifyContent: "space-between"}}>
        <Col xs={"10"} style={{margin: "10px 0px"}}>
          <TagList tags={this.state.updatedTags || []} fontSize={"18px"}/>
        </Col>
      </Row>
    )
  }

  editPanel = () => {
    return this.state.isEdit ? (
      <Card.Body>
        <Row style={{justifyContent: "right"}}>
          <Col xs={"2"} xxl={"1"}>
            <Button style={{width: "100%"}} variant={"secondary"} onClick={() => {this.setState({isEdit: false})}}>Back</Button>
          </Col>
          <Col xs={"2"} xxl={"1"}>
            <Button style={{width: "100%"}} variant={"primary"} onClick={this.updateBlogContentWithMessage}>
              Submit
            </Button>
          </Col>
        </Row>
      </Card.Body>
    ) : (
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

  metadataPanel = () => {
    return(
      <Card>
        <Card.Header>
          <Row style={{justifyContent: "space-between"}}>
            <Col xs={"auto"}>
              Create Time: <div style={{color:"grey"}}>{new Date(this.state.blog.gmtCreate).toLocaleString()}</div>
            </Col>
            <Col xs={"auto"}>
              Last Modified: <div style={{color:"grey"}}>{new Date(this.state.blog.gmtUpdate).toLocaleString()}</div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row style={{justifyContent: "space-between"}}>
            <Col>
              <Button variant="light"
                      onClick={() => this.setState({profileShow: true})}>
                <h5>{"Author: " + this.state.profile.name + ", Email: " + this.state.profile.email}</h5>
              </Button>
              <Offcanvas show={this.state.profileShow} style={{width: "25%"}}
                          onHide={() => this.setState({profileShow: false})}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Author Profile</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <UserProfile {...this.state.profile} />
                </Offcanvas.Body>
              </Offcanvas>
            </Col>
          </Row>
          <hr></hr>
          {this.displayEditPanel()}
        </Card.Body>
      </Card>
    )
  }

  render() {
    if (this.state.loading) {
      return <LoadingSpinner/>
    } else if (this.state.error != null) {
      return <Navigate replace to="/error" state={this.state.error}/>
    } else {
      return <div>
        <BlogHeader {...this.state.blog} 
                    currentUser={this.props.currentUser} 
                    refreshBlogDetail={this.refreshBlogDetail}/>
        {this.metadataPanel()}
        {this.blogContent()}
      </div>
    }
  }
}

export default BlogDetail;