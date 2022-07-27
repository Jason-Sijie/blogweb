import React, {Component} from "react";
import {Container, Row} from "react-bootstrap";
import SearchPanel from "./SearchPanel";
import BlogList from "../stateless/blog/BlogList";
import {getBlogsWithParams} from "../../actions/blogRequests";

/**
 * props : {
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
      currentPage: 0,
      authorId: props.authorId || null,
      tagNames: null,
      blogTitle: null
    }

    getBlogsWithParams({
      page: this.state.currentPage,
      size: props.pageSize
    }, (data) => {
      this.setState({
        content : data.content,
        totalPages : data.totalPages,
        currentPage : data.number
      })
    })
  }

  getBlogsWithSearchParams = (params) => {
    params = {
      authorId: this.state.authorId,
      tagNames: this.state.tagNames,
      blogTitle: this.state.blogTitle,
      ...params
    }

    getBlogsWithParams(params, (data) => {
      this.setState({
        content: data.content,
        currentPage: data.number,
        totalPages: data.totalPages
      })
    });
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
        <SearchPanel getBlogsWithSearchParams={this.getBlogsWithSearchParams}
                     updateSearchParams={this.updateSearchParams}
                     pageSize={this.props.pageSize}
                     searchButtonText={this.props.searchButtonText || "Search Blogs"}
                     searchPanelTitle={this.props.searchPanelTitle || "Search Panel"} />

        <BlogList content={this.state.content}
                  currentPage={this.state.currentPage}
                  totalPages={this.state.totalPages}
                  pageSize={this.props.pageSize}
                  getBlogsWithSearchParams={this.getBlogsWithSearchParams}
        />
      </Container>
    )
  }
}

export default BlogSearch;