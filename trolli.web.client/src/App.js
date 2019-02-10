import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import DingCreate from "./components/Dings/DingCreate";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path="/" component={NavBar} />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={Login} />
          <Route path="/ding/new" exact component={DingCreate} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
