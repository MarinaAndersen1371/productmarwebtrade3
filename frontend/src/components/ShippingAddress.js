import { Col, Row, ListGroup } from "react-bootstrap";

const ShippingAddress = ({ order }) => {
  return (
    <ListGroup>
      <ListGroup.Item>
        <h5>Shipping Address</h5>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col md={5}>
            <h6>Name:</h6>
            <h6 style={{ marginTop: "17px" }}>Address:</h6>
          </Col>
          <Col md={7}>
            <p>{order && order.shippingAddress.name}</p>
            <p>
              {order && order.shippingAddress.address},{" "}
              {order && order.shippingAddress.city}{" "}
            </p>
            <p>
              {order && order.shippingAddress.postalCode},{" "}
              {order && order.shippingAddress.country}
            </p>
          </Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ShippingAddress;
