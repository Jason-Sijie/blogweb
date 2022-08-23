import { Component } from "react";
import { Card, Spinner } from "react-bootstrap";
import { getTopKTagsWithBlogLike, getTopKTagsWithBlogSize, getTopKTagsWithBlogView } from "../../../actions/tagRequests";
import TagList from "../../stateless/util/TagList";

/**
 * props: {
 *   topK: num,
 *   header: "",
 *   detail: "",
 *   type: "size" | "view",
 *   border: "",
 *   color: "",
 * }
 */
class TopTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      loading: true,
    }

    if (props.type === "size") {
      getTopKTagsWithBlogSize(props.topK, (data) => {
        this.setState({
          tags: data
        })
      }, error => {
        console.log(error.data.message)
        this.setState({
          loading: false,
        })
      })
    } else if (props.type === "view") {
      getTopKTagsWithBlogView(props.topK, (data) => {
        this.setState({
          tags: data
        })
      }, error => {
        console.log(error.data.message)
        this.setState({
          loading: false,
        })
      })
    } else if (props.type === "like") {
      getTopKTagsWithBlogLike(props.topK, (data) => {
        this.setState({
          tags: data
        })
      }, error => {
        console.log(error.data.message)
        this.setState({
          loading: false,
        })
      })
    }

  }

  render() {
    return (
      <Card border={this.props.border || "light"} style={{width: "100%", padding: "0"}}>
        <Card.Header>
          <h4>{this.props.header}</h4> 
        </Card.Header>
        {this.state.loading === true ? (
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <TagList tags={this.state.tags} fontSize="18px" color={this.props.color || "info"}/>
        </Card.Body>  
        ) : (
          <Spinner animation="border" size={"sm"} style={{width: "100px", height: "100px", marginLeft: "30%"}} />
        )}
      </Card>
    )
  }
}

export default TopTags;