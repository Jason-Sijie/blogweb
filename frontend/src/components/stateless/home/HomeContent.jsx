import {Container, Tab, Tabs} from "react-bootstrap";
import BlogList from "../../stateful/BlogList";
import React from "react";
import SearchPanel from "../../stateful/SearchPanel";
import BlogSearch from "../../stateful/BlogSearch";

/**
 * @param props : {
 *   getBlogsWithParams : (params) => {}
 *   blogListPage : {
 *     content : [],
 *     number : int,
 *     totalPages : int
 *   }
 *   authorId : "",
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const HomeContent = (props) => {
  return (
    <Container className={"shadow-lg p-3 pt-5 mb-5 bg-white rounded"} style={{minHeight: "800px"}}>
      <BlogSearch getBlogsWithParams={props.getBlogsWithParams}
                  blogListPage={props.blogListPage}
                  authorId={props.authorId}
                  pageSize={2}
                  searchButtonText="Search blogs under current author" />
    </Container>
  )
}

export default HomeContent;