import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import HomePage from "./components/HomePage";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={HomePage} />
      </Router>
    );
  }
}

export default App;
