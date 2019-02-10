import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import "./App.css";

import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import RouteMap from "./components/RouteMap";
import Login from "./components/AuthFlow/Login";
import Register from "./components/AuthFlow/Register";
import PageLoader from "./components/PageLoader";
import Logout from "./components/AuthFlow/Logout";

import * as userService from "./Services/userService";

const listofAnonymousPages = [
  "/goodbye",
  "/login",
  "/register",
  "/recover",
  "/forgot",
  "/reset"
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAuthorized: false,
      lastLogin: null,
      currentUser: {}
    };
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  static getDerivedStateFromProps(props) {
    const locationState = props.location.state;
    if (locationState) {
      if (locationState.action === "USERLOGIN") {
        let state = { ...locationState };
        state.action = null;
        props.history.replace({
          state
        });
        return {
          userAuthorized: true,
          lastLogin: Date()
        };
      } else if (locationState.action === "USERLOGOUT") {
        let state = { ...locationState };
        state.action = null;
        props.history.replace({
          state
        });
        return {
          userAuthorized: false,
          lastLogin: null,
          currentUser: {}
        };
      }
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userAuthorized !== this.state.userAuthorized) {
      this.getContent();
    }
    if (prevState.lastLogin !== this.state.lastLogin) {
      this.getCurrentUser();
    }
  }

  getCurrentUser = () => {
    userService
      .getCurrent()
      .then(this.onGetCurrentSuccess)
      .catch(this.onGetCurrentFail);
  };

  onGetCurrentSuccess = data => {
    console.log("Current User: ", data);
    this.setState({
      userAuthorized: true,
      currentUser: data.item
    });
  };

  onGetCurrentFail = err => {
    console.error(err);
    this.setState({
      userAuthorized: false,
      currentUser: {}
    });
    if (listofAnonymousPages.indexOf(this.props.location.pathname) > -1) {
      return;
    }
    this.props.history.push("/login?return=" + this.props.location.pathname);
  };

  onLogoutSuccess = () => {
    this.getCurrentUser();
  };

  onLogoutFail(err) {
    console.log(err);
  }
  render() {
    console.log(this.props.location);
    let content = null;
    if (listofAnonymousPages.indexOf(this.props.location.pathname) > -1) {
      content = (
        <React.Fragment>
          <Route
            path="/"
            render={props => (
              <NavBar {...props} isAuth={this.state.userAuthorized} />
            )}
          />
          <Switch>
            <Route
              path="/login"
              exact
              render={props => (
                <Login {...props} userAuthorized={this.state.userAuthorized} />
              )}
            />
            <Route
              path="/register"
              exact
              render={props => (
                <Register
                  {...props}
                  userAuthorized={this.state.userAuthorized}
                />
              )}
            />
          </Switch>
        </React.Fragment>
      );
    } else {
      content = this.getContent();
    }
    return content;
  }

  getContent = () => {
    let content = null;
    if (this.state.userAuthorized) {
      content = (
        <React.Fragment>
          <Route
            path="/"
            render={props => (
              <NavBar {...props} userAuthorized={this.state.userAuthorized} />
            )}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <HomePage
                  {...props}
                  userAuthorized={this.state.userAuthorized}
                />
              )}
            />
            <Route
              path="/login"
              exact
              render={props => (
                <Login {...props} userAuthorized={this.state.userAuthorized} />
              )}
            />
            <Route
              path="/logout"
              exact
              render={props => <Logout {...props} />}
            />
            <Route
              path="/register"
              exact
              render={props => (
                <Register
                  {...props}
                  userAuthorized={this.state.userAuthorized}
                />
              )}
            />
            <Route
              path="/myroute"
              exact
              render={props => (
                <RouteMap
                  {...props}
                  userAuthorized={this.state.userAuthorized}
                />
              )}
            />
          </Switch>
        </React.Fragment>
      );
    } else {
      content = <PageLoader />;
    }
    return content;
  };
}

export default withRouter(App);
