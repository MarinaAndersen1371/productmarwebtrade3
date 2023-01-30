import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import Meta from "../components/Meta";
import { saveInvoiceAddress } from "../actions/cartActions";

const InvoiceAddressScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, invoiceAddress } = cart;

  const [address, setAddress] = useState(invoiceAddress.address);
  const [city, setCity] = useState(invoiceAddress.city);
  const [postalCode, setPostalCode] = useState(invoiceAddress.postalCode);
  const [country, setCountry] = useState(invoiceAddress.country);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      address.trim() === "" ||
      city.trim() === "" ||
      postalCode.trim() === "" ||
      country.trim() === ""
    ) {
      setMessage("All Fields need to be filled in");
    } else {
      dispatch(saveInvoiceAddress({ address, city, postalCode, country }));
      navigate("/payment");
    }
  };

  return (
    <>
      <Meta title='Invoice Address' />
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h3>Invoice Address</h3>
        {message && <Message>{message}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='address'>
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Address'
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

export default InvoiceAddressScreen;
