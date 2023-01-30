import { Col, Row, ListGroup } from "react-bootstrap";

const ForFromAddresses = ({ order }) => {
  return (
    <ListGroup>
      <Row>
        <Col md={6}>
          <ListGroup.Item>
            <h5>From</h5>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col md={4}>
                <h6 style={{ marginBottom: "16px" }}>Name:</h6>
                <h6 style={{ marginBottom: "57px" }}>Address:</h6>
                <h6 style={{ marginBottom: "18px" }}>Email Address:</h6>
                <h6>Phone Number:</h6>
              </Col>
              <Col md={8}>
                <p>MarWebTrade Center</p>
                <p>Bahnhofstr.15, Freiburg</p>
                <p>Freiburg 79111, Deutschland</p>
                <p>
                  <a href='/'>MarWebTrade_Center@web.de</a>
                </p>
                <p>+49 931 11-11111</p>
              </Col>
            </Row>
          </ListGroup.Item>
        </Col>
        <Col md={6}>
          <ListGroup.Item>
            <h5>For</h5>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col md={4}>
                <h6 style={{ marginBottom: "16px" }}>Name:</h6>
                <h6 style={{ marginBottom: "57px" }}>Address:</h6>
                <h6 style={{ marginBottom: "18px" }}>Email Address:</h6>
                <h6>Phone Number:</h6>
              </Col>
              <Col md={8}>
                <p>
                  {order && order.customer.firstName}{" "}
                  {order && order.customer.name}
                </p>
                <p>
                  {" "}
                  {order && order.invoiceAddress.address},{" "}
                  {order && order.invoiceAddress.city}
                </p>
                <p>
                  {order && order.invoiceAddress.postalCode},{" "}
                  {order && order.invoiceAddress.country}
                </p>
                <p>
                  <a href={`mailto:${order && order.customer.email}`}>
                    {order && order.customer.email}
                  </a>
                </p>
                <p>{order && order.customer.phone}</p>
              </Col>
            </Row>
          </ListGroup.Item>
        </Col>
      </Row>
    </ListGroup>
  );
};

export default ForFromAddresses;
