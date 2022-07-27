import React, {Component} from "react";
import {Container, Row} from "react-bootstrap";
import SearchPanel from "./SearchPanel";
import BlogList from "./BlogList";

/**
 * props : {
 *   getBlogsWithParams : (params) => {}
 *   blogListPage : {
 *     content: [],
 *     number: int,
 *     totalPages: int,
 *   }
 *   pageSize : int,
 *   authorId : "" (optional),
 *   searchButtonText : "" (optional),
 *   searchPanelTitle : "" (optional)
 * }
 */
class BlogSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorId: props.authorId || null,
      tagNames: null,
      blogTitle: null
    }
  }

  getBlogsWithParams = (params) => {
    params = {
      authorId: this.state.authorId,
      tagNames: this.state.tagNames,
      blogTitle: this.state.blogTitle,
      ...params
    }

    this.props.getBlogsWithParams(params);
  }

  updateSearchParams = (params) => {
    const {tagNames, blogTitle} = params;
    this.setState({
      tagNames: tagNames,
      blogTitle: blogTitle
    })
  }

  render() {
    return (
      <Container>
        <SearchPanel searchWithParams={this.getBlogsWithParams}
                     updateSearchParams={this.updateSearchParams}
                     pageSize={this.props.pageSize}
                     searchButtonText={this.props.searchButtonText || "Search Blogs"}
                     searchPanelTitle={this.props.searchPanelTitle || "Search Panel"} />

        <BlogList content={this.props.blogListPage.content}
                  totalPages={this.props.blogListPage.totalPages}
                  number={this.props.blogListPage.number}
                  pageSize={this.props.pageSize}
                  getBlogsWithParams={this.getBlogsWithParams} />
      </Container>
    )
  }
}

export default BlogSearch;