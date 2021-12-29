import {Component} from "react";
import {Button, Col, Container, OverlayTrigger, Popover, Row} from "react-bootstrap";
import MDEditor from '@uiw/react-md-editor';

import {colorInHex} from "../../constants/colors";

import "../../styles/blog_style.css";
import FigureImage from "react-bootstrap/FigureImage";

/**
 * props: {
 *   blog: {}
 * }
 */
class BlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.blog.content || "",
      updatedContent: props.blog.content || "",
      title: props.blog.title || "",
      updatedTitle: props.blog.title || "",
      description: props.blog.description || "",
      updatedDescription: props.blog.description || "",
      isEdit: false
    }
  }

  blogContent = (isEdit) => {
    if (isEdit) {
      return (
        <Row>
          <MDEditor
            value={this.state.updatedContent}
            onChange={(value) => {this.setState({updatedContent: value})}}
          />
        </Row>
      )
    } else {
      return (
        <Row>
          <MDEditor.Markdown source={this.state.content} />
        </Row>
      )
    }
  }

  editPanel = (isEdit) => {
    if (isEdit) {
      return(
        <Row style={{justifyContent: "right", padding: "0 20px", margin: "30px 0"}}>
          <Col xs={"auto"}>
            <Button style={{width: "100%"}} variant={"secondary"} onClick={() => {this.setState({isEdit: false})}}>Cancel</Button>
          </Col>
          <Col xs={"auto"}>
            <Button style={{width: "100%"}} variant={"primary"}>Submit</Button>
          </Col>
        </Row>
      )
    } else {
      return (
        <Row style={{justifyContent: "right", padding: "0 20px", margin: "30px 0"}}>
          <Col xs={"2"} lg={"1"}>
            <Button style={{width: "100%"}} variant={"primary"} onClick={() => {this.setState({isEdit: true})}}>Edit</Button>
          </Col>
        </Row>
      )
    }
  }

  overlayTriggerIcon = (type, placement) => {
    switch (type) {
      case "views":
        var iconSrc = "/icons/eye.png";
        var value = this.props.blog.views;
        break;
      case "likes":
        var iconSrc = "/icons/likes.png";
        var value = this.props.blog.likes;
    }

    return (
      <OverlayTrigger trigger="hover" placement={placement} overlay={
        <Popover>
          <Popover.Header as="h3">{type}</Popover.Header>
          <Popover.Body>
            <strong>{value || 0}</strong> {type} in total
          </Popover.Body>
        </Popover>
      }>
        <FigureImage width={"40px"} height={"40px"} src={iconSrc} style={{margin: "20px 0px"}} />
      </OverlayTrigger>
    )
  }

  blogHeader = () => {
    return(
      <Container className="blog_header" style={{backgroundImage: `url(/images/blog_header_background.jpg)`}}>
        <Row style={{justifyContent: "space-between"}}>
          <Col xs={"auto"}>
            {this.overlayTriggerIcon("views", "right")}
          </Col>
          <Col xs={"auto"}>
            {this.overlayTriggerIcon("likes", "left")}
          </Col>
        </Row>
        <Row>
          <div className="blog_header_title">{this.state.title}</div>
        </Row>
        <Row>
          <div className="blog_header_description">{this.state.description}</div>
        </Row>
      </Container>
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.blog != this.props.blog ) {
      this.setState({
        content: this.props.blog.content || "",
        updatedContent: this.props.blog.content || "",
        title: this.props.blog.title || "",
        updatedTitle: this.props.blog.title || "",
        description: this.props.blog.description || "",
        updatedDescription: this.props.blog.description || "",
        isEdit: false
      })
    }
  }

  render() {
    return(
      <Container>
        {this.blogHeader()}
        {this.editPanel(this.state.isEdit)}
        {this.blogContent(this.state.isEdit)}
      </Container>
    )
  }
}

export default BlogDetail;