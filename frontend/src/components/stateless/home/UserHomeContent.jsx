import {Container, Tab, Tabs} from "react-bootstrap";
import React from "react";
import BlogSearch from "../../stateful/BlogSearch";
import {appConfig} from "../../../config";
import CreateBlogForm from "../../stateful/CreateBlogForm";
import BlogList from "../blog/BlogList";
import "../../../styles/tab_style.css";

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
    <Tabs className="nav-tabs m-3"
          defaultActiveKey="blogs"
          id="user-home-content-tab"
          style={{fontSize: "25px"}}
          fill >
      <Tab className="nav-link" eventKey="blogs" title={props.name + "'s Blogs"}>
        <Container className={"shadow-lg bg-white rounded p-3 m-3"} style={{minHeight: "800px"}} fluid>
          <BlogSearch pageSize={appConfig.blogListPageSize}
                      authorId={props.authorId}
                      searchButtonText={"Search blogs under " + props.name}
                      title={"All Blogs written by " + props.name}/>
        </Container>
      </Tab>
      <Tab className="nav-link" eventKey="createBlog" title="Write New Blog">
        <Container className={"shadow-lg bg-white rounded m-3 p-3"} style={{minHeight: "600px"}} fluid>
          <CreateBlogForm currentUser={props.currentUser}
                          handleModalShow={props.handleModalShow} />
        </Container>
      </Tab>
      <Tab className="nav-link" eventKey="likedBlogs" title={props.name + " liked blogs"}>
        <Container className={"shadow-lg bg-white rounded m-3 p-3"} style={{minHeight: "600px"}} fluid>
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