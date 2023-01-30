import { Col, Row, ListGroup } from "react-bootstrap";

const InvoiceAddress = ({ order }) => {
  return (
    <ListGroup>
      <ListGroup.Item>
        <h5>Invoice Address</h5>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col md={5}>
            <h6>Name:</h6>
            <h6 style={{ marginTop: "17px" }}>Address:</h6>
            <h6 style={{ marginTop: "55px" }}>Phone Number:</h6>
            <h6 style={{ marginTop: "17px" }}>Email Address:</h6>
          </Col>
          <Col md={7}>
            <p>
              {order && order.customer.firstName} {order && order.customer.name}{" "}
            </p>
            <p>
              {order && order.invoiceAddress.address},{" "}
              {order && order.invoiceAddress.city}{" "}
            </p>
            <p>
              {order && order.invoiceAddress.postalCode},{" "}
              {order && order.invoiceAddress.country}
            </p>
            <p>{order && order.customer.phone}</p>
            <p>
              <a href={`mailto:${order && order.customer.email}`}>
                {order && order.customer.email}
              </a>
            </p>
          </Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default InvoiceAddress;
