import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";
import SearchPanel from "./SearchPanel";
import BlogList from "../../stateless/blog/BlogList";
import {getBlogsWithParams} from "../../../actions/blogRequests";
import LoadingSpinner from "../../stateless/util/LoadingSpinner";
import {Navigate} from "react-router-dom";

/**
 * props : {
 *   pageSize : int,
 *   authorId : "" (optional),
 *   title: "" (optional),
 *   tagNames: "" (optional),
 *   searchButtonText : "" (optional),
 *   searchPanelTitle : "" (optional),
 *   likesSort: "" (optional),
 *   viewsSort: "" (optional),
 *   gmtCreateSort: "" (optional),
 *   gmtUpdateSort: "" (optional),
 * }
 */
class BlogSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      tagNames: props.tagNames || null,
      title: null,
      likesSort: props.likesSort || null,
      viewsSort: props.viewsSort || null,
      gmtCreateSort: props.gmtCreateSort || null,
      gmtUpdateSort: props.gmtUpdateSort || null,
      loading: true
    }

    getBlogsWithParams({
      authorId: props.authorId,
      tagNames: this.state.tagNames,
      page: this.state.currentPage,
      size: props.pageSize,
      ...this.buildSortingParams()
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

  getBlogsWithSearchParams = (params) => {
    params = {
      authorId: this.props.authorId,
      tagNames: this.state.tagNames,
      title: this.state.title,
      ...this.buildSortingParams(),
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
    const {tagNames, title, viewsSort, likesSort, gmtCreateSort, gmtUpdateSort} = params;
    this.setState({
      tagNames: tagNames,
      title: title,
      viewsSort: viewsSort,
      likesSort: likesSort,
      gmtCreateSort: gmtCreateSort,
      gmtUpdateSort: gmtUpdateSort
    })
  }

  header = () => {
    return this.props.title ? (
      <Row style={{justifyContent: "center", padding: "10px"}}>
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
                       tagNames={this.state.tagNames}
                       viewsSort={this.state.viewsSort}
                       likesSort={this.state.likesSort}
                       gmtCreateSort={this.state.gmtCreateSort}
                       gmtUpdateSort={this.state.gmtUpdateSort}
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