import React from 'react'
import {Route, Routes} from "react-router-dom";

import BlogDetailPage from "../components/stateless/blog/BlogDetailPage";
import LoginPage from "../components/stateless/login/LoginPage";
import UserHomePage from "../components/stateless/home/UserHomePage";
import BlogListPage from "../components/stateless/blog/BlogListPage";
import LogoutPage from "../components/stateless/login/LogoutPage";
import HomePage from "../components/stateless/home/HomePage";
import ErrorPage from "../components/stateless/util/ErrorPage";
import {appConfig} from "../config";
import CreateBlogPage from "../components/stateless/blog/CreateBlogPage";
import RegisterPage from "../components/stateless/login/RegisterPage";
import UserProfilePage from "../components/stateless/home/UserProfilePage";

export function AppRoutes(props){
  return (
    <Routes>
      <Route path="/" exact element={
        <BlogListPage pageSize={appConfig.blogListPageSize}
                      searchButtonText={"Search Blogs"}
                      title={"All Blogs on Site"}/>
      }/>
      <Route path="/blogs" exact element={
        <BlogListPage pageSize={appConfig.blogListPageSize}
                      searchButtonText={"Search Blogs"}
                      title={"All Blogs on Site"}/>
      }/>
      <Route path="/blogs/:id" element={
        <BlogDetailPage currentUser={props.user.currentUser}
                        handleModalShow={props.action.modal.handleModalShow}/>
      }/>
      <Route path="/blogs/create" element={
        <CreateBlogPage currentUser={props.user.currentUser}
                        handleModalShow={props.action.modal.handleModalShow}/>
      }/>
      <Route path="/login" element={
        <LoginPage acquireJwtCredentials={props.action.user.acquireJwtCredentials}/>
      }/>
      <Route path="/users/register" element={
        <RegisterPage registerUser={props.action.user.registerUser}/>
      }/>
      <Route path="/logout" element={
        <LogoutPage logout={props.action.user.logout}
                    currentUser={props.user.currentUser} />
      }/>
      <Route path="/home" element={
        <HomePage currentUser={props.user.currentUser}
                  handleModalShow={props.action.modal.handleModalShow}/>
      }/>
      <Route path="/users/:id/home" element={
        <UserHomePage currentUser={props.user.currentUser}
                      handleModalShow={props.action.modal.handleModalShow}/>
      }/>
      <Route path="/users/profile" element={
        <UserProfilePage currentUser={props.user.currentUser}
                         handleModalShow={props.action.modal.handleModalShow}/>
      }/>
      <Route path={"/error"} element={
        <ErrorPage />
      }/>
    </Routes>
  )
}