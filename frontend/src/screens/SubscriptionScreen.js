import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import Meta from "../components/Meta";
import { saveSubscription } from "../actions/cartActions";

const SubscriptionScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, invoiceAddress, payment } = cart;

  const [prime, setPrime] = useState("No");
  const [franchise, setFranchise] = useState("No");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  if (!customerInfo) {
    navigate("/login");
  } else if (
    !shippingAddress.name ||
    !shippingAddress.address ||
    !shippingAddress.city ||
    !shippingAddress.postalCode ||
    !shippingAddress.country ||
    !shippingAddress.fast
  ) {
    navigate("/shipping");
  } else if (
    !invoiceAddress.address ||
    !invoiceAddress.city ||
    !invoiceAddress.postalCode ||
    !invoiceAddress.country
  ) {
    navigate("/invoiceaddress");
  } else if (!payment.method || !payment.account) {
    navigate("/payment");
  }

  const subscriptionHandler = (e) => {
    e.preventDefault();
    dispatch(saveSubscription({ prime, franchise }));
    navigate("/placeorder");
  };

  return (
    <>
      <Meta title='Subscriptions & Memberships' />
      <CheckoutSteps step1 step2 step3 step4 step5 />
      <h3
        style={{ marginTop: "40px", marginBottom: "60px", textAlign: "center" }}
      >
        Subscriptions & Memberships
      </h3>
      <ListGroup>
        <Form onSubmit={subscriptionHandler}>
          <Row>
            <Col md={5}>
              <ListGroup.Item>
                <h6 style={{ paddingBottom: "20px", paddingTop: "20px" }}>
                  Premium Member: $ 70.00
                </h6>
                <p>Free Prime Shipping (doesn't include Fastest Delivery)</p>
                <p style={{ paddingBottom: "20px" }}>Loyalty Points Voucher.</p>
              </ListGroup.Item>
              {customerInfo && customerInfo.isPrime ? (
                <ListGroup.Item
                  style={{ marginTop: "30px", paddingTop: "30px" }}
                >
                  <h6 style={{ paddingBottom: "30px" }}>
                    Your Premium Membership status is active
                  </h6>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item
                  style={{ marginBottom: "20px", marginTop: "30px" }}
                >
                  <Form.Group controlId='prime'>
                    <Row>
                      <Col md={8}>
                        {" "}
                        <Form.Label>
                          <h6>Subscribe for Premium Membership:</h6>
                        </Form.Label>
                      </Col>
                      <Col md={4}>
                        <Form.Control
                          as='select'
                          value={prime}
                          onChange={(e) => setPrime(e.target.value)}
                        >
                          <option value='No'>No</option>
                          <option value='Yes'>Yes</option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>
                </ListGroup.Item>
              )}
            </Col>
            <Col md={2}></Col>
            <Col md={5}>
              <ListGroup.Item>
                <h6 style={{ paddingBottom: "20px", paddingTop: "20px" }}>
                  Franchising System Member: $ 500.00
                </h6>
                <p>(a one-off joining fee)</p>
                <p>
                  In order to become a Member of the Franchise Association you
                  need to complete a training.
                </p>
              </ListGroup.Item>
              {customerInfo && customerInfo.isFranchise ? (
                <ListGroup.Item
                  style={{ marginTop: "30px", paddingTop: "30px" }}
                >
                  <h6 style={{ paddingBottom: "10px" }}>
                    Your Franchise Association Membership status is active
                  </h6>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item
                  style={{ marginBottom: "20px", marginTop: "30px" }}
                >
                  {" "}
                  <Form.Group controlId='franchise'>
                    <Row>
                      <Col md={8}>
                        <Form.Label>
                          <h6>
                            {" "}
                            Subscribe for Franchise Association Membership:
                          </h6>
                        </Form.Label>
                      </Col>
                      <Col md={4}>
                        <Form.Control
                          as='select'
                          value={franchise}
                          onChange={(e) => setFranchise(e.target.value)}
                        >
                          <option value='No'>No</option>
                          <option value='Yes'>Yes</option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>
                </ListGroup.Item>
              )}
            </Col>
          </Row>
          <Row>
            <Col md={10}></Col>
            <Col md={2}>
              {" "}
              <Button
                type='submit'
                className='btn btn-block'
                style={{ marginTop: "30px" }}
              >
                Continue
              </Button>
            </Col>
          </Row>
        </Form>
      </ListGroup>
    </>
  );
};

export default SubscriptionScreen;
