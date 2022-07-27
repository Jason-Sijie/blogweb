import {Container, Tab, Tabs} from "react-bootstrap";
import BlogList from "../blog/BlogList";
import React from "react";
import SearchPanel from "../../stateful/SearchPanel";
import BlogSearch from "../../stateful/BlogSearch";

/**
 * @param props : {
 *   authorId : "",
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const HomeContent = (props) => {
  return (
    <Container className={"shadow-lg p-3 pt-5 mb-5 bg-white rounded"} style={{minHeight: "800px"}}>
      <BlogSearch pageSize={2}
                  authorId={props.authorId}
                  searchButtonText="Search blogs under current author" />
    </Container>
  )
}

export default HomeContent;