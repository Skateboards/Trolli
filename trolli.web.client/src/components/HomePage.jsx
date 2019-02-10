import React, { PureComponent } from "react";
import { Jumbotron, Container, Button } from "reactstrap";

import DingDisplaySmall from "./Dings/DingDisplaySmall";

export default class HomePage extends PureComponent {
  mapDingToDisplay = ding => {
    return <DingDisplaySmall dingData={ding} />;
  };

  render() {
    const dings = ["a", "b", "c", "d", "e", "f", "g"];
    return (
      <div className="bg-light-blue">
        <Jumbotron fluid className="text-center mb-0 bg-light-blue">
          <Container fluid>
            <Button color="info" className="btn-block">
              Suggested Routes
            </Button>
            <Button
              color="secondary"
              className="btn-block"
              onClick={() => this.props.history.push("/ding/new")}
            >
              New Ding
            </Button>
          </Container>
        </Jumbotron>
        <div
          className="text-center p-3"
          style={{
            backgroundColor: "#f8f9fa",
            color: "black",
            margin: "0 20px",
            borderRadius: "50px"
          }}
        >
          <strong>Dings Near You</strong>
        </div>
        {dings.map(this.mapDingToDisplay)}
      </div>
    );
  }
}
