import {Container, Tab, Tabs} from "react-bootstrap";
import React from "react";
import BlogSearch from "../../stateful/BlogSearch";
import {appConfig} from "../../../config";
import CreateBlogForm from "../../stateful/CreateBlogForm";
import BlogList from "../blog/BlogList";

/**
 * @param props : {
 *   currentUser : {
 *     username : "",
 *     id : "",
 *     uid : ""
 *   },
 *   authorId : "",
 *   name : "",
 *   likedBlogs: {
 *     content: [],
 *     totalPage: ,
 *     number: ,
 *   },
 *   getLikedBlogsWithParams: (params) => {}
 *   handleModalShow : (title, content, path) => {}
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const UserHomeContent = (props) => {
  return (
    <Tabs defaultActiveKey="blogs"
          id="user-home-content-tab"
          className="mb-3"
          style={{fontSize: "25px"}}
          fill >
      <Tab eventKey="blogs" title={props.name + "'s Blogs"}>
        <Container className={"shadow-lg p-3 mb-5 bg-white rounded"} style={{minHeight: "800px"}}>
          <BlogSearch pageSize={appConfig.blogListPageSize}
                      authorId={props.authorId}
                      searchButtonText={"Search blogs under " + props.name}
                      title={"All Blogs written by " + props.name}/>
        </Container>
      </Tab>
      <Tab eventKey="createBlog" title="Write New Blog">
        <Container className={"shadow-lg p-3 mb-5 bg-white rounded"} style={{minHeight: "600px"}}>
          <CreateBlogForm currentUser={props.currentUser}
                          handleModalShow={props.handleModalShow} />
        </Container>
      </Tab>
      <Tab eventKey="likedBlogs" title={props.name + " liked blogs"}>
        <Container className={"shadow-lg p-3 mb-5 bg-white rounded"} style={{minHeight: "600px"}}>
          <BlogList content={props.likedBlogs.content}
                    currentPage={props.likedBlogs.number}
                    totalPages={props.likedBlogs.totalPages}
                    pageSize={appConfig.blogListPageSize}
                    getBlogsWithSearchParams={props.getLikedBlogsWithParams} />
        </Container>
      </Tab>
    </Tabs>
  )
}

export default UserHomeContent;