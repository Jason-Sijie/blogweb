import {Container, Row} from "react-bootstrap";
import BlogItem from "../stateless/blog/BlogItem";
import Pages from "../stateless/util/Pages";
import {Component} from "react";

/**
 * props: {
 *   content: [],                         // list of blogs
 *   totalPages: ,                        // total number of pages
 *   number: ,                            // current page number
 *   pageSize: ,                          // number of element in each page
 *   leftNum: (optional),
 *   rightNum: (optional),
 *   getBlogsWithParams: (param) => {},
 * }
 */
class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: props.number || 0,
    }
    this.props.getBlogsWithParams({
      page: this.state.currentPage,
      size: this.props.pageSize
    });
  }

  updatePagination = (currentPage) => {
    this.setState({
      currentPage: currentPage,
    })
  }

  getBlogWithPageAndSize = (page, size) => {
    this.props.getBlogsWithParams({
      page: page,
      size: size
    });
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
          <Pages currentPage={this.state.currentPage}
                 totalPages={this.props.totalPages || 10}
                 leftNum={this.props.leftNum || 3}
                 rightNum={this.props.rightNum || 3}
                 pageSize={this.props.pageSize}
                 getContentWithPageAndSize={this.getBlogWithPageAndSize}
                 updatePagination={this.updatePagination} />
        </Row>
      </Container>
    )
  }

}

export default BlogList;