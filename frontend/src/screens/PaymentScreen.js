import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";
import { savePayment } from "../actions/cartActions";

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, invoiceAddress, payment } = cart;

  const [account, setAccount] = useState(payment.account);
  const [method, setMethod] = useState(payment.method);
  const [message, setMessage] = useState(null);

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
  }

  const paymentHandler = (e) => {
    e.preventDefault();
    if (method.trim() === "" || account.trim() === "") {
      setMessage("All Fields need to be filled in");
    } else {
      dispatch(savePayment({ method, account }));
      if (customerInfo && customerInfo.isPrime && customerInfo.isFranchise) {
        navigate("/placeorder");
      } else {
        navigate("/subscription");
      }
    }
  };

  return (
    <>
      <Meta title='Payment' />
      <CheckoutSteps step1 step2 step3 step4 />
      <FormContainer>
        {message && <Message>{message}</Message>}
        <h3 style={{ marginTop: "40px", marginBottom: "60px" }}>Payment</h3>
        <Form onSubmit={paymentHandler}>
          <Form.Group controlId='method'>
            <Form.Label>Payment Method:</Form.Label>
            <Row>
              <Col md={3}></Col>
              <Col md={3}>
                <Form.Check
                  type='radio'
                  name='method'
                  label='PayPal'
                  id='PayPal'
                  value='PayPal'
                  onChange={(e) => setMethod(e.target.value)}
                ></Form.Check>
              </Col>
              <Col md={3}>
                <Form.Check
                  type='radio'
                  name='method'
                  label='Visa'
                  id='Visa'
                  value='Visa'
                  onChange={(e) => setMethod(e.target.value)}
                ></Form.Check>
              </Col>
              <Col md={3}>
                <Form.Check
                  type='radio'
                  name='method'
                  label='MasterCard'
                  id='MasterCard'
                  value='MasterCard'
                  onChange={(e) => setMethod(e.target.value)}
                ></Form.Check>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId='account' style={{ marginTop: "30px" }}>
            <Form.Label>Card Number:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Card Number'
              value={account}
              onChange={(e) => setAccount(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Row>
            <Col md={8}></Col>
            <Col md={4}>
              <Button type='submit' className='btn btn-block'>
                Continue
              </Button>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
