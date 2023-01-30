import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, Image, ListGroup, Table } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { addDecimals } from "../helpers";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  if (!customerInfo) {
    navigate("/login");
  } else if (
    !cart.shippingAddress.name ||
    !cart.shippingAddress.address ||
    !cart.shippingAddress.city ||
    !cart.shippingAddress.postalCode ||
    !cart.shippingAddress.country ||
    !cart.shippingAddress.fast
  ) {
    navigate("/shipping");
  } else if (
    !cart.invoiceAddress.address ||
    !cart.invoiceAddress.city ||
    !cart.invoiceAddress.postalCode ||
    !cart.invoiceAddress.country
  ) {
    navigate("/invoiceaddress");
  } else if (!cart.payment.method || !cart.payment.account) {
    navigate("/payment");
  }

  //Calculate prices
  if (cart && cart.cartItems && cart.shippingAddress && cart.subscription) {
    cart.itemsPrice = addDecimals(
      cart.cartItems.reduce(
        (acc, item) =>
          acc +
          +item.qty * +item.price -
          +item.qty * +item.price * +item.discount +
          +item.qty * +item.price * +item.warranty +
          +item.gift +
          +item.qty * +item.extra1 +
          +item.qty * +item.extra2,
        0
      )
    );

    cart.primePrice = addDecimals(cart.subscription.prime === "Yes" ? 70 : 0);

    cart.franchisePrice = addDecimals(
      cart.subscription.franchise === "Yes" ? 500 : 0
    );

    cart.shippingPrice = addDecimals(
      cart.shippingAddress.fast === "Fastest"
        ? 10
        : (customerInfo && customerInfo.isPrime) ||
          cart.subscription.prime === "Yes" ||
          +cart.itemsPrice > 800
        ? 0
        : 5
    );
    cart.shipping =
      cart.shippingAddress.fast === "Fastest"
        ? "Fastest"
        : (customerInfo && customerInfo.isPrime) ||
          cart.subscription.prime === "Yes"
        ? "Prime"
        : "No";

    cart.extraPrice = cart.cartItems.reduce(
      (acc, item) => acc + +item.qty * +item.extra1 + +item.qty * +item.extra2,
      0
    );

    cart.totalNetto = addDecimals(
      +cart.itemsPrice +
        +cart.shippingPrice +
        +cart.primePrice +
        +cart.franchisePrice
    );

    cart.taxPrice = addDecimals(+cart.totalNetto * 0.15);

    cart.totalPrice = addDecimals(+cart.totalNetto + +cart.taxPrice);
  }

  //-------------------
  const qtyDiscount =
    cart && cart.cartItems.reduce((acc, item) => +item.discount + acc, 0);
  const qtyWarranty =
    cart && cart.cartItems.reduce((acc, item) => +item.warranty + acc, 0);
  const qtyGift =
    cart && cart.cartItems.reduce((acc, item) => +item.gift + acc, 0);
  //------------

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: "CUSTOMER_DETAILS_RESET" });
      dispatch({ type: "ORDER_CREATE_RESET" });
    }
    // eslint-disable-next-line
  }, [dispatch, navigate, order, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        invoiceAddress: cart.invoiceAddress,
        payment: cart.payment,
        primePrice: cart.primePrice,
        franchisePrice: cart.franchisePrice,
        shipping: cart.shipping,
      })
    );
  };

  return (
    <>
      <Meta title='My Order' />
      <CheckoutSteps step1 step2 step3 step4 step5 step6 />
      <h1 style={{ marginTop: "40px", marginBottom: "40px" }}>
        My Order Details
      </h1>
      {cart && cart.cartItems && cart.cartItems.length === 0 ? (
        <Message>Cart is empty</Message>
      ) : (
        <ListGroup>
          <ListGroup.Item>
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price/ Item</th>
                  {+qtyDiscount > 0 && <th>Discount/ Item</th>}
                  {+qtyWarranty > 0 && <th>Warranty/ Item</th>}
                  {+qtyGift > 0 && <th>Gift Package</th>}
                  {+cart.extraPrice > 0 && <th>Protection/ Item</th>}
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart &&
                  cart.cartItems &&
                  cart.cartItems.map((item) => (
                    <tr key={item.product}>
                      <td className='orderImage'>
                        <Image src={item.image} alt={item.name} fluid />
                      </td>
                      <td>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>
                      <td>{item.qty}</td>
                      <td>$ {addDecimals(item.price)}</td>
                      {+qtyDiscount > 0 && (
                        <td>
                          {+item.discount > 0 ? (
                            <span>
                              -$ {addDecimals(+item.price * +item.discount)}
                            </span>
                          ) : (
                            <i className='fas fa-times'></i>
                          )}
                        </td>
                      )}
                      {+qtyWarranty > 0 && (
                        <td>
                          {+item.warranty > 0 ? (
                            <span>
                              $ {addDecimals(+item.price * +item.warranty)}
                            </span>
                          ) : (
                            <i className='fas fa-times'></i>
                          )}
                        </td>
                      )}
                      {+qtyGift > 0 && (
                        <td>
                          {+item.gift > 0 ? (
                            <span>$ 5.00</span>
                          ) : (
                            <i className='fas fa-times'></i>
                          )}
                        </td>
                      )}
                      {+cart.extraPrice > 0 && (
                        <td>
                          {+item.extra1 + +item.extra2 > 0 ? (
                            <span>
                              $ {addDecimals(+item.extra1 + +item.extra2)}
                            </span>
                          ) : (
                            <i className='fas fa-times'></i>
                          )}
                        </td>
                      )}
                      <td>
                        $
                        {addDecimals(
                          +item.qty * +item.price -
                            +item.qty * +item.price * +item.discount +
                            +item.qty * +item.price * +item.warranty +
                            +item.gift +
                            +item.qty * +item.extra1 +
                            +item.qty * +item.extra2
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </ListGroup.Item>

          <Row style={{ marginTop: "40px" }}>
            <Col md={6}>
              <ListGroup.Item>
                <h5>Shipping Address</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={5}>
                    <h6>Name:</h6>{" "}
                    <h6 style={{ marginTop: "20px" }}>Address:</h6>
                  </Col>
                  <Col md={7}>
                    <p>
                      {" "}
                      {cart &&
                        cart.shippingAddress &&
                        cart.shippingAddress.name}
                    </p>
                    <p>
                      {cart &&
                        cart.shippingAddress &&
                        cart.shippingAddress.address}
                      ,{" "}
                      {cart &&
                        cart.shippingAddress &&
                        cart.shippingAddress.city}
                    </p>
                    <p>
                      {cart &&
                        cart.shippingAddress &&
                        cart.shippingAddress.postalCode}
                      ,{" "}
                      {cart &&
                        cart.shippingAddress &&
                        cart.shippingAddress.country}
                    </p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item style={{ marginTop: "20px" }}>
                <h5>Invoice Address</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={5}>
                    <h6>Name:</h6>{" "}
                    <h6 style={{ marginTop: "20px" }}>Address:</h6>
                  </Col>
                  <Col md={7}>
                    <p>
                      {" "}
                      {customerInfo && customerInfo.firstName}{" "}
                      {customerInfo && customerInfo.name}
                    </p>
                    <p>
                      {cart &&
                        cart.invoiceAddress &&
                        cart.invoiceAddress.address}
                      ,{" "}
                      {cart && cart.invoiceAddress && cart.invoiceAddress.city}
                    </p>
                    <p>
                      {cart &&
                        cart.invoiceAddress &&
                        cart.invoiceAddress.postalCode}
                      ,{" "}
                      {cart &&
                        cart.invoiceAddress &&
                        cart.invoiceAddress.country}
                    </p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item style={{ marginTop: "20px" }}>
                <h5>Payment</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={5}>
                    <h6>Payment Method:</h6>{" "}
                    <h6 style={{ marginTop: "20px" }}>Account ending in:</h6>
                  </Col>
                  <Col md={7}>
                    <p> {cart && cart.payment && cart.payment.method} </p>
                    <p>
                      ********
                      {cart &&
                        cart.payment &&
                        cart.payment.account.substring(
                          cart.payment.account.length - 4,
                          cart.payment.account.length
                        )}
                    </p>
                  </Col>
                </Row>
              </ListGroup.Item>
            </Col>
            <Col md={6}>
              <ListGroup.Item>
                <h5>My Order Summary</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={7}>
                    <h6>Items Subtotal:</h6>
                  </Col>
                  <Col md={5}>
                    <h6>$ {cart && cart.itemsPrice}</h6>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={7}>
                    <h6>Shipping Fee:</h6>
                  </Col>
                  <Col md={5}>
                    <h6>$ {cart && cart.shippingPrice}</h6>
                  </Col>
                </Row>
              </ListGroup.Item>
              {cart && +cart.primePrice > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col md={7}>
                      <h6>Premium Subscription Fee:</h6>
                    </Col>
                    <Col md={5}>
                      <h6>$ {cart && cart.primePrice}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              {cart && +cart.franchisePrice > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col md={7}>
                      <h6>Franchising System Fee:</h6>
                    </Col>
                    <Col md={5}>
                      <h6>$ {cart && cart.franchisePrice}</h6>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Row>
                  <Col md={7}>
                    <h6>Total Netto:</h6>
                  </Col>
                  <Col md={5}>
                    <h6>$ {cart && cart.totalNetto}</h6>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={7}>
                    <h6>Tax Rate (15%):</h6>
                  </Col>
                  <Col md={5}>
                    <h6>$ {cart && cart.taxPrice}</h6>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={7}>
                    <h6>TOTAL BRUTTO:</h6>
                  </Col>
                  <Col md={5}>
                    <h6>$ {cart && cart.totalPrice}</h6>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message>{error}</Message>}
                <Button
                  type='button'
                  className='btn btn-block'
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </Col>
          </Row>
        </ListGroup>
      )}
    </>
  );
};

export default PlaceOrderScreen;
