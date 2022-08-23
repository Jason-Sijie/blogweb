import {Component} from "react";
import {Button, Col, Form, Row, Container, Accordion} from "react-bootstrap";
import TagListToasts from "../../stateless/util/TagListToasts";

/**
 * props : {
 *   getBlogsWithSearchParams : (params) => {},
 *   searchButtonText : ""
 *   searchPanelTitle : ""
 *   pageSize : int,
 *   tagNames : [], (optional)
 *   viewsSort : "", (optional)
 *   likesSort : "", (optional)
 *   gmtCreateSort : "", (optional)
 *   gmtUpdateSort : "", (optional)
 * }
 */
class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      tags: [],
      newTag: "",
      viewsSort: props.viewsSort || "null",
      likesSort: props.likesSort || "null",
      gmtCreateSort: props.gmtCreateSort || "null",
      gmtUpdateSort: props.gmtUpdateSort || "null"
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
      title: this.state.title || null,
      viewsSort: this.state.viewsSort,
      likesSort: this.state.likesSort,
      gmtCreateSort: this.state.gmtCreateSort,
      gmtUpdateSort: this.state.gmtUpdateSort
    })

    this.props.getBlogsWithSearchParams({
      tagNames: this.state.tags.map((tag) => {
        return tag.name
      }),
      title: this.state.title || null,
      page: 0,
      size: this.props.pageSize,
      ...this.buildSortingParams()
    });
  }

  buildSortingParams = () => {
    let sorts = []
    let directions = []
    if (this.state.viewsSort === "ASC" || this.state.viewsSort === "DESC") {
      sorts.push("views")
      directions.push(this.state.viewsSort)
    } 
    if (this.state.likesSort === "ASC" || this.state.likesSort === "DESC") {
      sorts.push("likes")
      directions.push(this.state.likesSort)
    } 
    if (this.state.gmtCreateSort === "ASC" || this.state.gmtCreateSort === "DESC") {
      sorts.push("gmtCreate")
      directions.push(this.state.gmtCreateSort)
    } 
    if (this.state.gmtUpdateSort === "ASC" || this.state.gmtUpdateSort === "DESC") {
      sorts.push("gmtUpdate")
      directions.push(this.state.gmtUpdateSort)
    } 

    return {
      sorts: sorts,
      directions: directions
    }
  }

  sortingPanel = () => {
    return (
      <Row style={{justifyContent: "right"}}>
        <Col xs={"auto"} style={{marginRight: "1%", marginLeft: "1%"}}>
          <Row>
            <Col xs="auto" style={{alignSelf: "center", padding: "0", margin: "0"}}>
              Views
            </Col>
            <Col xs="auto">
              <Form.Select defaultValue={this.state.viewsSort} onChange={this.changeStateOnEvent("viewsSort")}>
                <option value="DESC">Most to Fewest</option>
                <option value="ASC">Fewest to Most</option>
                <option value="null">No Sort</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
        <Col xs={"auto"} style={{marginRight: "1%", marginLeft: "1%"}}>
          <Row>
            <Col xs="auto" style={{alignSelf: "center", padding: "0", margin: "0"}}>
              Likes
            </Col>
            <Col xs="auto">
              <Form.Select defaultValue={this.state.likesSort} onChange={this.changeStateOnEvent("likesSort")}>
                <option value="DESC">Most to Fewest</option>
                <option value="ASC">Fewest to Most</option>
                <option value="null">No Sort</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
        <Col xs={"auto"} style={{marginRight: "1%", marginLeft: "1%"}}>
          <Row>
            <Col xs="auto" style={{alignSelf: "center", padding: "0", margin: "0"}}>
              Creation Time
            </Col>
            <Col xs="auto">
              <Form.Select defaultValue={this.state.gmtCreateSort} onChange={this.changeStateOnEvent("gmtCreateSort")}>
                <option value="DESC">Latest to Oldest</option>
                <option value="ASC">Oldest to Latest</option>
                <option value="null">No Sort</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
        <Col xs={"auto"} style={{marginRight: "1%", marginLeft: "1%"}}>
          <Row>
            <Col xs="auto" style={{alignSelf: "center", padding: "0", margin: "0"}}>
              Update Time
            </Col>
            <Col xs="auto">
              <Form.Select defaultValue={this.state.gmtUpdateSort} onChange={this.changeStateOnEvent("gmtUpdateSort")}>
                <option value="DESC">Latest to Oldest</option>
                <option value="ASC">Oldest to Latest</option>
                <option value="null">No Sort</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
      </Row>
    )
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
                  <Row>
                    <Col xs="9">
                      <Form.Control type="text"
                                    onChange={this.changeStateOnEvent("title")}/>
                    </Col>
                    <Col xs="3" style={{alignSelf: "center"}}>
                      <Button style={{width: "100%"}}
                              variant={"primary"}
                              onClick={this.performSearch} >
                        {this.props.searchButtonText}
                      </Button>
                    </Col>
                  </Row>
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

                {this.sortingPanel()}
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    )
  }
}

export default SearchPanel;