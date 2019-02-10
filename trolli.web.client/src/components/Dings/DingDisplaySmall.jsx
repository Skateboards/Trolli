import React, { PureComponent } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

export default class DingDisplaySmall extends PureComponent {
  render() {
    const { ding } = this.props;
    return (
      <div>
        <Card className=" m-3 text-center">
          <CardHeader className="d-flex" style={{ backgroundColor: "#17a2b8" }}>
            <i className="fas fa-route ml-auto mr-2 pt-1" />
            <span>{ding.routeId}</span>
          </CardHeader>
          <CardBody
            className="p-5"
            style={{ backgroundColor: "#f8f9fa", color: "black" }}
          >
            {ding.value}
          </CardBody>
        </Card>
      </div>
    );
  }
}
