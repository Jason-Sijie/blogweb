import {Container, Row} from "react-bootstrap";
import BlogItem from "../stateless/blog/BlogItem";
import Pages from "../stateless/util/Pages";
import {Component} from "react";

/**
 * props: {
 *   content: []
 *   getBlogsWithPageAndSize: (page, size) => {}
 *   totalPages: ,
 *   number: ,
 *   leftNum: (optional),
 *   rightNum: (optional),
 *   pageSize: (pageSize),
 * }
 */
class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        currentPage: props.number || 0,
        leftNum: props.leftNum || 3,
        rightNum: props.rightNum || 3,
        pageSize: props.pageSize || 5,
      }
    }
  }

  componentDidMount() {
    this.props.getBlogsWithPageAndSize({
      page: this.state.pagination.currentPage,
      size: this.state.pagination.pageSize
    });
  }

  updatePagination = (num) => {
    this.setState({
      pagination: {
        currentPage: num,
        leftNum: this.props.leftNum || 3,
        rightNum: this.props.rightNum || 3,
        pageSize: this.props.pageSize || 5,
      }
    })
  }

  render() {
    return (
      <Container>
        {(this.props.content || []).map((item, idx) => {
          return (
            <Row key={idx} style={{margin: "10px 0"}}>
              <BlogItem blog={item} />
            </Row>
          );
        })}

        <Row>
          <Pages {...this.state.pagination}
                 totalPages={this.props.totalPages || 10}
                 getContentWithPageAndSize={this.props.getBlogsWithPageAndSize}
                 updatePagination={this.updatePagination} />
        </Row>
      </Container>
    )
  }

}

export default BlogList;