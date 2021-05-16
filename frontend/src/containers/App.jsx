import {Component} from "react";

import BlogItem from "../components/BlogItem";
import logo from '../images/logo.svg';
import './App.css';


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
        </body>
      </div>
    );
  }
}

export default App;
