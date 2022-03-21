import {Component} from "react";
import { connect } from "react-redux";
import {Route, Routes} from "react-router-dom";

import {getBlogDetailById, getBlogsWithPageAndSize, updateBlogContent} from "../actions/blogAction";
import {acquireJwtCredentials} from "../actions/jwtAction";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./App.sass";

import BlogList from "../components/stateful/BlogList";
import BlogDetailPage from "../components/stateless/BlogDetailPage";
import AppHeader from "../components/stateless/AppHeader";
import LoginPage from "../components/stateless/LoginPage";
import {AppRoutes} from "../utils/routes";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AppHeader />
        <div style={{marginTop: "60px"}}>
          <AppRoutes {...this.props} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {  
  return {
    blog: state.blogReducer,
    jwt: state.jwtReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: {
      blog: {
        getBlogDetailById: (id) => {
          getBlogDetailById(id)(dispatch);
        },
        getBlogsWithPageAndSize: (page, size) => {
          getBlogsWithPageAndSize(page, size)(dispatch);
        },
        updateBlogContent: (blog) => {
          updateBlogContent(blog)(dispatch);
        }
      },
      jwt: {
        acquireJwtCredentials: (username, password) => {
          acquireJwtCredentials(username, password)(dispatch);
        }
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
