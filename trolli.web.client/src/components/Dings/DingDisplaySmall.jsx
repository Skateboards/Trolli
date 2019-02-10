import React, { PureComponent } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

export default class DingDisplaySmall extends PureComponent {
  render() {
    return (
      <div key={this.props.dingData}>
        <Card className=" m-3 text-center">
          <CardHeader className="d-flex" style={{ backgroundColor: "#007bff" }}>
            <i className="fas fa-train ml-auto mr-2" />
            <span>58</span>
          </CardHeader>
          <CardBody className="p-5" style={{ backgroundColor: "#6c757d" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </CardBody>
        </Card>
      </div>
    );
  }
}
