import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import RouteMap from "./components/routemap";

class App extends Component {
  render() {
    return (
      <div className="App">
        <RouteMap />
      </div>
    );
  }
}

export default App;
