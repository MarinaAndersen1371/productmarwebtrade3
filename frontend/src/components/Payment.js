import { Col, Row, ListGroup } from "react-bootstrap";

const Payment = ({ order }) => {
  return (
    <ListGroup>
      <ListGroup.Item>
        <h5>Payment</h5>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col md={5}>
            <h6>Payment Method:</h6>
            <h6 style={{ marginTop: "15px" }}>Account ending in:</h6>
          </Col>
          <Col md={7}>
            <p>{order && order.payment.method}</p>
            <p>
              *****{" "}
              {order &&
                order.payment.account.substring(
                  order.payment.account.length - 4,
                  order.payment.account
                )}
            </p>
          </Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Payment;
