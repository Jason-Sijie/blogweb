import BlogList from "../../stateful/BlogList";
import React from "react";
import SearchPanel from "../../stateful/SearchPanel";
import {Container} from "react-bootstrap";

const BlogListPage = (props) => {
  const getBlogsWithParams = (params) => {
    props.action.blog.getBlogsWithPageAndSize(params);
  }

  return (
    <>
      <Container>
        <SearchPanel searchWithParams={getBlogsWithParams}
                     text="Search Blogs"/>
      </Container>

      <BlogList {...props.blog.blogListPage}
                pageSize={2}
                getBlogsWithPageAndSize={props.action.blog.getBlogsWithPageAndSize}/>
    </>
  )
}

export default BlogListPage;