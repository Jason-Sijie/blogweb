import {Container, Tab, Tabs} from "react-bootstrap";
import BlogList from "../../stateful/BlogList";
import React from "react";
import SearchPanel from "../../stateful/SearchPanel";

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HomeContent = (props) => {
  const getBlogsWithParams = (params) => {
    params = {
      ...params,
      authorId: props.user.currentUser.uid
    };
    props.action.blog.getBlogsWithPageAndSize(params);
  }

  return (
    <Container className={"shadow-lg p-3 mb-5 bg-white rounded"}>
      <Tabs defaultActiveKey="profile" id="home-content-tab" style={{margin: "20px 30px", fontSize: "20px"}}>
        <Tab eventKey="profile" title="Profile">
          Tab1
        </Tab>
        <Tab eventKey="blogs" title="Self Blogs">
          <Container>
            <SearchPanel searchWithParams={getBlogsWithParams}
                         text="Search Blogs within the current User"/>
          </Container>
          <BlogList {...props.blog.blogListPage}
                    pageSize={2}
                    getBlogsWithPageAndSize={getBlogsWithParams}/>
        </Tab>
      </Tabs>

    </Container>
  )
}

export default HomeContent;