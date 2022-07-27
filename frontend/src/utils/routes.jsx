import React from 'react'
import {Route, Routes} from "react-router-dom";

import BlogDetailPage from "../components/stateless/blog/BlogDetailPage";
import LoginPage from "../components/stateless/login/LoginPage";
import HomePage from "../components/stateless/home/HomePage";
import BlogListPage from "../components/stateless/blog/BlogListPage";
import UserHomePage from "../components/stateless/user/UserHomePage";

export function AppRoutes(props){
  return (
    <Routes>
      <Route path="/" exact element={
        <BlogListPage getBlogsWithParams={props.action.blog.getBlogsWithParams}
                      blogListPage={props.blog.blogListPage}
                      pageSize={2} />
      }/>
      <Route path="/blogs" exact element={
        <BlogListPage getBlogsWithParams={props.action.blog.getBlogsWithParams}
                      blogListPage={props.blog.blogListPage}
                      pageSize={2} />
      }/>
      <Route path="/blogs/:id" element={
        <BlogDetailPage blog={props.blog.detailedBlog}
                        getBlogDetailById={props.action.blog.getBlogDetailById}
                        updateBlogContent={props.action.blog.updateBlogContent}
                        currentUser={props.user.currentUser} />
      }/>
      <Route path="/login" element={
        <LoginPage acquireJwtCredentials={props.action.user.acquireJwtCredentials}/>
      }/>
      <Route path="/home" element={
        <HomePage {...props}/>
      }/>
      <Route path="/home/users/:id" element={
        <UserHomePage />
      }/>
    </Routes>
  )
}