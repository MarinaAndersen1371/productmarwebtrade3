import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4, step5, step6 }) => {
  return (
    <Nav className='justify-content-center'>
      <Nav.Item>
        {step1 ? (
          <Nav.Link as={Link} to='/login'>
            Sign In
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <Nav.Link as={Link} to='/shipping'>
            Shipping
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <Nav.Link as={Link} to='/invoiceaddress'>
            Invoice
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Invoice</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <Nav.Link as={Link} to='/payment'>
            Payment
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step5 ? (
          <Nav.Link as={Link} to='/subscription'>
            Subscriptions
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Subscriptions</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step6 ? (
          <Nav.Link as={Link} to='/placeorder'>
            Place Order
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
