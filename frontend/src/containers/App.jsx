import {Component} from "react";
import { connect } from "react-redux";
import {Container, Row, Col, Button} from "react-bootstrap";

import {getBlogDetailById, getBlogsWithPageAndSize} from "../actions/blogAction";
import {acquireJwtCredentials} from "../actions/jwtAction";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./App.sass";
import BlogList from "../components/stateful/BlogList";
import BlogDetail from "../components/stateful/BlogDetail";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Container fluid={"xxl"}>
        <Row>
          <Button onClick={() => {this.props.action.blog.getBlogDetailById(1)}} />
        </Row>
        <Row>
          <BlogList {...this.props.blog.blogListPage}
                    pageSize={2}
                    getBlogsWithPageAndSize={this.props.action.blog.getBlogsWithPageAndSize} />
        </Row>
        <Row>
          <BlogDetail blog={this.props.blog.detailedBlog} />
        </Row>
      </Container>

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
