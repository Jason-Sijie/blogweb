import {Container, Tab, Tabs} from "react-bootstrap";
import BlogList from "../../stateful/BlogList";
import React from "react";
import SearchPanel from "../../stateful/SearchPanel";
import BlogSearch from "../../stateful/BlogSearch";

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HomeContent = (props) => {
  return (
    <Container className={"shadow-lg p-3 mb-5 bg-white rounded"}>
      <Tabs defaultActiveKey="profile" id="home-content-tab" style={{margin: "20px 30px", fontSize: "20px"}}>
        <Tab eventKey="profile" title="Profile">
          Tab1
        </Tab>
        <Tab eventKey="blogs" title="Self Blogs">
          <BlogSearch getBlogsWithPageAndSize={props.action.blog.getBlogsWithPageAndSize}
                      blogListPage={props.blog.blogListPage}
                      authorId={props.user.currentUser.uid}
                      text="Search Blogs under current User"/>
        </Tab>
      </Tabs>

    </Container>
  )
}

export default HomeContent;