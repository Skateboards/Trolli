import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Login from "./components/AuthFlow/Login";
import Register from "./components/AuthFlow/Register";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path="/" component={NavBar} />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
