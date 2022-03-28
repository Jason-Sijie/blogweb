import React from 'react'
import {Route, Routes} from "react-router-dom";

import BlogList from "../components/stateful/BlogList";
import BlogDetailPage from "../components/stateless/BlogDetailPage";
import LoginPage from "../components/stateless/LoginPage";

export function AppRoutes(props){
  return (
    <Routes>
      <Route path="/" exact element={
        <BlogList {...props.blog.blogListPage}
                  pageSize={2}
                  getBlogsWithPageAndSize={props.action.blog.getBlogsWithPageAndSize}/>
      }/>
      <Route path="/blogs" exact element={
        <BlogList {...props.blog.blogListPage}
                  pageSize={2}
                  getBlogsWithPageAndSize={props.action.blog.getBlogsWithPageAndSize}/>
      }/>
      <Route path="/blogs/:id" element={
        <BlogDetailPage blog={props.blog.detailedBlog}
                        getBlogDetailById={props.action.blog.getBlogDetailById}
                        updateBlogContent={props.action.blog.updateBlogContent}/>
      }/>
      <Route path="/login" element={
        <LoginPage acquireJwtCredentials={props.action.jwt.acquireJwtCredentials}/>
      }/>
    </Routes>
  )
}