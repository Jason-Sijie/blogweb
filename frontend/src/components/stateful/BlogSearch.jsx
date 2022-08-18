import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import SearchPanel from "./SearchPanel";
import BlogList from "../stateless/blog/BlogList";
import {getBlogsWithParams} from "../../actions/blogRequests";
import LoadingSpinner from "../stateless/util/LoadingSpinner";
import {Navigate} from "react-router-dom";

/**
 * props : {
 *   pageSize : int,
 *   authorId : "" (optional),
 *   title: "" (optional),
 *   searchButtonText : "" (optional),
 *   searchPanelTitle : "" (optional)
 * }
 */
class BlogSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      tagNames: null,
      blogTitle: null,
      loading: true
    }

    getBlogsWithParams({
      authorId: props.authorId,
      page: this.state.currentPage,
      size: props.pageSize
    }, (data) => {
      this.setState({
        content : data.content,
        totalPages : data.totalPages,
        currentPage : data.number,
        loading: false
      })
    }, (error) => {
      this.setState({
        loading: false,
        error: error.data
      })
    })
  }

  getBlogsWithSearchParams = (params) => {
    params = {
      authorId: this.props.authorId,
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
    }, (error) => {
      this.setState({
        loading: false,
        error: error.data
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

  header = () => {
    return this.props.title ? (
      <Row style={{justifyContent: "center", padding: "20px"}}>
        <Col xs={"12"} className={"text-center"}>
          <h3>{this.props.title}</h3>
        </Col>
      </Row>
    ) : (
      <></>
    )
  }

  render() {
    if (this.state.loading) {
      return <LoadingSpinner />
    } else if (this.state.error != null) {
      return <Navigate replace to="/error" state={this.state.error}/>
    } else {
      return (
        <div className="m-2 p-3">
          {this.header()}
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
        </div>
      )
    }
  }
}

export default BlogSearch;