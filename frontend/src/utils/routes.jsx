import React from 'react'
import {Route, Routes} from "react-router-dom";

import BlogList from "../components/stateful/BlogList";
import BlogDetailPage from "../components/stateless/blog/BlogDetailPage";
import LoginPage from "../components/stateless/login/LoginPage";
import HomePage from "../components/stateless/home/HomePage";
import BlogListPage from "../components/stateless/blog/BlogListPage";

export function AppRoutes(props){
  return (
    <Routes>
      <Route path="/" exact element={
        <BlogListPage {...props} />
      }/>
      <Route path="/blogs" exact element={
        <BlogListPage {...props} />
      }/>
      <Route path="/blogs/:id" element={
        <BlogDetailPage blog={props.blog.detailedBlog}
                        getBlogDetailById={props.action.blog.getBlogDetailById}
                        updateBlogContent={props.action.blog.updateBlogContent}/>
      }/>
      <Route path="/login" element={
        <LoginPage acquireJwtCredentials={props.action.user.acquireJwtCredentials}/>
      }/>
      <Route path="/home" element={
        <HomePage {...props}/>
      }/>
    </Routes>
  )
}