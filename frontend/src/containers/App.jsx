import {Component} from "react";
import { connect } from "react-redux";
import {Container, Row, Col} from "react-bootstrap";

import {getBlogDetailById, getBlogsWithPageAndSize} from "../actions/blogAction";
import {acquireJwtCredentials} from "../actions/jwtAction";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./App.sass";
import BlogList from "../components/stateful/BlogList";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Container fluid={"xxl"}>
        <Row>
          <BlogList {...this.props.blog.blogListPage}
                    pageSize={2}
                    getBlogsWithPageAndSize={this.props.action.blog.getBlogsWithPageAndSize} />
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
