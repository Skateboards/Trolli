import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path="/" component={NavBar} />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
