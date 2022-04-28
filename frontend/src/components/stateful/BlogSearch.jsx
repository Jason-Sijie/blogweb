import React, {Component} from "react";
import {Container} from "react-bootstrap";
import SearchPanel from "./SearchPanel";
import BlogList from "./BlogList";

/**
 * props : {
 *   getBlogsWithPageAndSize : (params) => {}
 *   blogListPage : {}
 *   authorId : "" (optional),
 *   text : "" (optional)
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
      ...this.state,
      ...params
    }

    this.props.getBlogsWithPageAndSize(params);
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
      <>
        <Container>
          <SearchPanel searchWithParams={this.getBlogsWithParams}
                       updateSearchParams={this.updateSearchParams}
                       text={this.props.text || "Search Blogs"}/>
        </Container>

        <BlogList {...this.props.blogListPage}
                  pageSize={2}
                  getBlogsWithPageAndSize={this.getBlogsWithParams}/>
      </>
    )
  }
}

export default BlogSearch;