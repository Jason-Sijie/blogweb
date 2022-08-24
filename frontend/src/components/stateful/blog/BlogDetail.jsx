import {Component} from "react";
import {Button, Card, Col, Form, Modal, Offcanvas, Row} from "react-bootstrap";
import MDEditor from '@uiw/react-md-editor';

import BlogHeader from "./BlogHeader";
import TagList from "../../stateless/util/TagList";
import TagListToasts from "../../stateless/util/TagListToasts";
import {deleteBlog, getBlogDetailById, updateBlogContent} from "../../../actions/blogRequests";
import LoadingSpinner from "../../stateless/util/LoadingSpinner";
import {Navigate} from "react-router-dom";
import { getProfileById, getProfileAvatarById } from "../../../actions/profileRequest";
import UserProfile from "../../stateless/home/UserProfile";
import { api } from "../../../config";

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
      loading: true,
      hasAvatar: false,
      deleteModalShow: false
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

      getProfileById(this.state.blog.authorId, data => {
        this.setState({
          profile: data
        })
      }, error => {
        console.log(error.message)
      })

      getProfileAvatarById(this.state.blog.authorId, (data) => {
        console.log("succeeded to get profile avatar")
        this.setState({
          hasAvatar: true
        })
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

  handleBlogDelete = () => {
    deleteBlog(this.props.blogId, (data) => {
      this.props.handleModalShow("Delete Blog Successfully", "", "/");
    }, (error) => {
      console.log(error)
      this.props.handleModalShow("Failed to delete blog", error.data.message, "");
    })
  }

  blogMetadataForm = (isEdit) => {
    if (isEdit) {
      return (
        <Row style={{padding: "30px 30px 0px"}}>
          <Form className={"shadow p-3 bg-white rounded"}>
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
    let shouldDisplay = this.props.currentUser != null && this.props.currentUser.id === this.state.blog.authorId

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
      <Row style={{justifyContent: "right"}}>
        <Col xs={"2"}>
          <Button style={{width: "100%"}} variant={"secondary"} onClick={() => {this.setState({isEdit: false})}}>Back</Button>
        </Col>
        <Col xs={"2"}>
          <Button style={{width: "100%"}} variant={"primary"} onClick={this.updateBlogContentWithMessage}>
            Submit
          </Button>
        </Col>
      </Row>
    ) : (
      <Row style={{justifyContent: "space-between"}}>
        <Col xs={"8"}>
          <TagList tags={this.state.updatedTags || []} fontSize={"18px"}/>
        </Col>
        <Col xs={"2"}>
          <Button style={{width: "100%"}} variant={"dark"} onClick={() => this.setState({deleteModalShow: true})}>Delete</Button>
        </Col>
        <Col xs={"2"}>
          <Button style={{width: "100%"}} variant={"primary"} onClick={() => {this.setState({isEdit: true})}}>Edit</Button>
        </Col>
        <Modal show={this.state.deleteModalShow} onHide={() => this.setState({deleteModalShow: false})} size="md">
          <Modal.Header closeButton>
            <Modal.Title>Delete Blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this blog? You can not rollback this operation</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="mr-2" onClick={() => this.setState({deleteModalShow: false})}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleBlogDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    )
  }

  metadataPanel = () => {
    return(
      <Card>
        <Card.Header>
          <Row style={{justifyContent: "space-between"}}>
            <Col xs={"6"} style={{fontSize: "15px"}}>
              <Row xs="auto">
                Create Time: <a style={{color:"grey"}}>{new Date(this.state.blog.gmtCreate).toLocaleString()}</a>
              </Row>
              <Row xs="auto">
                Last Modified: <a style={{color:"grey"}}>{new Date(this.state.blog.gmtUpdate).toLocaleString()}</a>
              </Row>
            </Col>
            <Col xs="auto">
              <img src={this.state.hasAvatar ? api.blogWeb.user + "/" + this.state.blog.authorId + "/profiles/avatar" : "/images/profile_avatar_1.png"} 
                  alt={"avatar_image"}
                  style={{width: "50px", borderRadius: "50%"}}/>
              <a>
                <Button variant="light" style={{textAlign: "center", fontSize: "15px"}}
                       onClick={() => this.setState({profileShow: true})}>
                  {this.state.profile.name + ", " + this.state.profile.email}
                </Button>
                <Offcanvas show={this.state.profileShow} style={{width: "25%"}}
                          onHide={() => this.setState({profileShow: false})}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Author Profile</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <UserProfile {...this.state.profile} 
                                avatar={this.state.hasAvatar ? api.blogWeb.user + "/" + this.state.blog.authorId + "/profiles/avatar" : "/images/profile_avatar_1.png"} />
                  </Offcanvas.Body>
                </Offcanvas>
              </a>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
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
                    handleModalShow={this.props.handleModalShow}
                    refreshBlogDetail={this.refreshBlogDetail}/>
        {this.metadataPanel()}
        {this.blogContent()}
      </div>
    }
  }
}

export default BlogDetail;