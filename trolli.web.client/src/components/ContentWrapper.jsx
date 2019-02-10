import React from "react";
import { Row, Col } from "reactstrap";

export default function ContentWrapper({ children }) {
  return (
    <Row className="d-flex">
      <Col md={6} className="mx-auto">
        {children}
      </Col>
    </Row>
  );
}
