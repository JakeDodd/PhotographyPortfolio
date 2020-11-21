import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import GalleryPage from "./GalleryPage";
import ContactPage from "./ContactPage";
import AboutMe from "./AboutMe";
import Title from "./Title";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../static/css/index.css";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <Title />
        </div>
        <div className="body">
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/Gallery" component={GalleryPage} />
              <Route exact path="/Contact" component={ContactPage} />
              <Route exact path="/About" component={AboutMe} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
