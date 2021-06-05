import {Component} from "react";
import { connect } from "react-redux";

import BlogItem from "../components/BlogItem";
import './App.css';
import {getBlogDetailById} from "../actions/blogAction";


class App extends Component {
  constructor() {
    super();
  }

  defaultPost = {
    imgSrc: "https://i.ibb.co/YLmzhgp/construction-4445367-1920-2.jpg",
    tags: [
      {
        name: "Constructuion",
      },
      {
        name: "Market",
      },
    ],
    date: "14 Jan 2021",
    title: "TOP 5 Ways to Choose Bricks made from manufactured stone",
    text: "Brampton Brick® Select Series is a cost-effective clay brick product series...",
    url: "/someblog"
  }

  render() {
    return (
      <div className="App">
        <body>
          <BlogItem blog={this.defaultPost}/>
          {this.props.blog.currentBlog.title}
          <button onClick={() => this.props.getBlogDetailById(2)}>get blog</button>
        </body>
      </div>
    );
  }
}

const mapStateToProps = (state) => {  
  return {
    blog: state.blogReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBlogDetailById: (id) => {
      getBlogDetailById(id)(dispatch);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
