import {Component} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import TagListToasts from "../stateless/util/TagListToasts";

/**
 * props : {
 *   searchWithParams : (params) => {},
 *   text : "" (optional)
 *   page : 0 (optional)
 *   size : 0 (optional)
 * }
 */
class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogTitle: "",
      tags: [],
      newTag: ""
    }
  }

  removeTagFromTags = (target) => {
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

    this.setState({tags: [...newTags, {"name": target}]});
  }

  changeStateOnEvent = (key) => {
    return (event) => {
      this.setState({
        [key]: event.target.value
      })
    }
  }

  performSearch = () => {
    this.props.updateSearchParams({
      tagNames: this.state.tags.map((tag) => {
        return tag.name
      }),
      blogTitle: this.state.blogTitle || null
    })

    this.props.searchWithParams({
      tagNames: this.state.tags.map((tag) => {
        return tag.name
      }),
      blogTitle: this.state.blogTitle || null,
      page: this.props.page || 0,
      size: this.props.size || 2,
    });
  }

  render() {
    return (
      <Form className={"shadow p-3 mb-5 bg-white rounded"}>
        <h2>Search Panel</h2>
        <Form.Group className="mb-3" controlId="blogTitle">
          <Form.Label>Blog Name</Form.Label>
          <Form.Control type="text"
                        placeholder="Not Support Searching by Blog Title"
                        disabled
                        onChange={this.changeStateOnEvent("blogTitle")}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="tags">
          <Form.Label>Tag Name</Form.Label>
          <Row>
            <Col xs={"8"}>
              <Form.Control type="text"
                            onChange={this.changeStateOnEvent("newTag")}/>
            </Col>
            <Col xs={"4"}>
              <Button style={{width: "100%"}}
                      variant={"secondary"}
                      onClick={this.AddTagToTags}>
                Add Tag to Search params
              </Button>
            </Col>
          </Row>
        </Form.Group>

        <Row className={"mb-2"}>
          <TagListToasts tags={this.state.tags} onCloseAction={this.removeTagFromTags}/>
        </Row>

        <Row className={"pe-3 ps-3"}>
          <Button style={{width: "100%"}}
                  variant={"primary"}
                  onClick={this.performSearch} >
            {this.props.text || "Search Blogs"}
          </Button>
        </Row>
      </Form>
    )
  }
}

export default SearchPanel;