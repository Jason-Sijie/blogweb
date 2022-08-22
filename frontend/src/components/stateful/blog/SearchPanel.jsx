import {Component} from "react";
import {Button, Col, Form, Row, Container, Accordion} from "react-bootstrap";
import TagListToasts from "../../stateless/util/TagListToasts";

/**
 * props : {
 *   getBlogsWithSearchParams : (params) => {},
 *   searchButtonText : ""
 *   searchPanelTitle : ""
 *   pageSize : int,
 *   tagNames : []
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

    if (props.tagNames != null) {
      let initTags = props.tagNames.map((tagName) => {
        return {"name": tagName}
      })
      console.log("init tags:", initTags)
      this.state = {
        ...this.state,
        tags: initTags
      }
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

    this.setState({
      tags: [...newTags, {"name": target}],
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

  performSearch = () => {
    this.props.updateSearchParams({
      tagNames: this.state.tags.map((tag) => {
        return tag.name
      }),
      blogTitle: this.state.blogTitle || null
    })

    this.props.getBlogsWithSearchParams({
      tagNames: this.state.tags.map((tag) => {
        return tag.name
      }),
      title: this.state.blogTitle || null,
      page: 0,
      size: this.props.pageSize,
    });
  }

  render() {
    return (
      <Container fluid className={"shadow p-0 mb-3 bg-white rounded"}>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header><h4>Search Panel</h4></Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group className="mb-3" controlId="blogTitle">
                  <Form.Label>Blog Name</Form.Label>
                  <Form.Control type="text"
                                onChange={this.changeStateOnEvent("blogTitle")}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="tags">
                  <Form.Label>Tag Name</Form.Label>
                  <Row>
                    <Col xs={"8"}>
                      <Form.Control type="text"
                                    value={this.state.newTag}
                                    onChange={this.changeStateOnEvent("newTag")}/>
                    </Col>
                    <Col xs={"4"}>
                      <Button style={{width: "100%"}}
                              variant={"success"}
                              onClick={this.AddTagToTags}>
                        Add Tag to Search params
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>

                <Row className={"mb-2"}>
                  <TagListToasts tags={this.state.tags} onCloseAction={this.removeTagFromTags}/>
                </Row>

                <Row style={{padding: "0 2%"}}>
                  <Button style={{width: "100%"}}
                          variant={"primary"}
                          onClick={this.performSearch} >
                    {this.props.searchButtonText}
                  </Button>
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    )
  }
}

export default SearchPanel;