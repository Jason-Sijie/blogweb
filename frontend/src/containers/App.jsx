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
        // bgColor: "#fcb941"
      },
      {
        name: "Market",
        // bgColor: "#FC6042"
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <body>
          <BlogItem blog={this.defaultPost}/>
        </body>
      </div>
    );
  }
}

export default App;
