import React from 'react'
import {Route, Routes} from "react-router-dom";

import BlogDetailPage from "../components/stateless/blog/BlogDetailPage";
import LoginPage from "../components/stateless/login/LoginPage";
import HomePage from "../components/stateless/home/HomePage";
import BlogListPage from "../components/stateless/blog/BlogListPage";
import UserHomePage from "../components/stateless/user/UserHomePage";
import LogoutPage from "../components/stateless/login/LogoutPage";
import {handleModalShow} from "../actions/modalAction";

export function AppRoutes(props){
  return (
    <Routes>
      <Route path="/" exact element={
        <BlogListPage pageSize={2} />
      }/>
      <Route path="/blogs" exact element={
        <BlogListPage pageSize={2} />
      }/>
      <Route path="/blogs/:id" element={
        <BlogDetailPage currentUser={props.user.currentUser} />
      }/>
      <Route path="/login" element={
        <LoginPage acquireJwtCredentials={props.action.user.acquireJwtCredentials}/>
      }/>
      <Route path="/logout" element={
        <LogoutPage logout={props.action.user.logout}
                    currentUser={props.user.currentUser}
                    handleModalShow={props.action.modal.handleModalShow}  />
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