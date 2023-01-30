import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [name, setName] = useState(shippingAddress.name);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [fast, setFast] = useState(shippingAddress.fast);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  if (!customerInfo) {
    navigate("/login");
  }

  const schippingHandler = (e) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      address.trim() === "" ||
      city.trim() === "" ||
      country.trim() === "" ||
      postalCode.trim() === "" ||
      fast.trim() === ""
    ) {
      setMessage("All Fields need to be filled in");
    } else {
      dispatch(
        saveShippingAddress({ name, address, city, postalCode, country, fast })
      );
      navigate("/invoiceaddress");
    }
  };

  return (
    <>
      <Meta title='Shipping Address' />
      <CheckoutSteps step1 step2 />
      {message && <Message>{message}</Message>}
      <Form onSubmit={schippingHandler}>
        <Row style={{ marginTop: "50px" }}>
          <Col md={5}>
            <h3 style={{ marginBottom: "20px" }}>Shipping Address</h3>

            <Form.Group controlId='name'>
              <Form.Label>Recipient Name:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='address'>
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Street'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
              <Form.Label>City:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
              <Form.Label>Postal Code:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Postal Code'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
              <Form.Label>Country:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={2}></Col>
          <Col md={5}>
            <h3 style={{ marginBottom: "100px" }}>Choose Shipping type</h3>
            <Form.Group>
              <ListGroup>
                <ListGroup.Item>
                  <Form.Check
                    type='radio'
                    label='Standard Delivery'
                    name='fast'
                    id='Standard'
                    value='Standard'
                    onChange={(e) => setFast(e.target.value)}
                  ></Form.Check>
                  <p style={{ paddingTop: "20px" }}>
                    Standard Delivery Fee: $ 5.00
                  </p>
                  <p>(on total amount over $800 Delivery is free)</p>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ marginTop: "20px", marginBottom: "50px" }}
                >
                  <Form.Check
                    type='radio'
                    label='Fastest Delivery'
                    name='fast'
                    id='Fastest'
                    value='Fastest'
                    onChange={(e) => setFast(e.target.value)}
                  ></Form.Check>
                  <p style={{ paddingTop: "20px" }}>
                    Fastest Delivery Fee: $ 10.00
                  </p>
                  <p> (within 24 hours)</p>
                </ListGroup.Item>
              </ListGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={10}></Col>
          <Col md={2}>
            <Button type='submit' className='btn btn-block'>
              Continue
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ShippingScreen;
