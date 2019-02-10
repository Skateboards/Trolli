import React, { PureComponent } from "react";
import { Jumbotron, Container } from "reactstrap";

import DingDisplaySmall from "./Dings/DingDisplaySmall";

export default class HomePage extends PureComponent {
  state = {
    nearbyDings: []
  };
  mapDingToDisplay = ding => {
    return <DingDisplaySmall dingData={ding} />;
  };

  getNearbyDings = () => {
    const nearbyDings = ["a", "b", "c", "d", "e", "f", "g"];
    this.setState({
      nearbyDings
    });
  };

  render() {
    const { nearbyDings } = this.state;
    return (
      <div className="bg-light-blue">
        <Jumbotron fluid className="text-center mb-0 bg-light-blue">
          <Container fluid>
            <div
              className="text-center p-3"
              style={{
                backgroundColor: "rgb(23, 162, 184)",
                color: "white",
                margin: "0 20px 20px 20px",
                borderRadius: "50px"
              }}
              onClick={() => this.props.history.push("/myroute")}
            >
              <i className="fas fa-map-marked-alt mr-2" />
              <strong>My Route</strong>
            </div>
            <div
              className="text-center p-3"
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                margin: "0 20px 20px 20px",
                borderRadius: "50px"
              }}
              onClick={() => this.props.history.push("/ding/new")}
            >
              <i className="fas fa-bell mr-2" />
              <strong>New Ding</strong>
            </div>
            <div
              className="text-center p-3"
              style={{
                backgroundColor: "#f8f9fa",
                color: "black",
                margin: "0 20px 20px 20px",
                borderRadius: "50px"
              }}
              onClick={this.getNearbyDings}
            >
              <i className="fas fa-location-arrow mr-2" />
              <strong>Dings Near Me</strong>
            </div>
          </Container>
        </Jumbotron>
        <Container fluid>{nearbyDings.map(this.mapDingToDisplay)}</Container>
      </div>
    );
  }
}
