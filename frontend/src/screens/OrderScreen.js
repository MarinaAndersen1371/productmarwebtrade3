import axios from "axios";
import { useState, useEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Button,
  Col,
  Row,
  Table,
  ListGroup,
  Image,
} from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import ShippingAddress from "../components/ShippingAddress";
import InvoiceAddress from "../components/InvoiceAddress";
import Payment from "../components/Payment";
import Meta from "../components/Meta";
import { addDecimals, myTrim } from "../helpers";
import {
  getOrderDetails,
  orderPay,
  getCustomerCoupon,
} from "../actions/orderActions";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const [sdkReady, setSdkReady] = useState(false);
  const [voucher, setVoucher] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderToPaid = useSelector((state) => state.orderToPaid);
  const { loading: loadingPay, success } = orderToPaid;

  const orderCustomerCoupon = useSelector((state) => state.orderCustomerCoupon);
  const {
    loading: loadingCoupon,
    error: errorCoupon,
    success: successCoupon,
  } = orderCustomerCoupon;

  useEffect(() => {
    if (!customerInfo) {
      navigate("/login");
    }
    if (successCoupon) {
      dispatch({ type: "ORDER_CUSTOMER_COUPON_RESET" });
      setMessage(
        "Your Voucher has been submitted! Once it has been verified and activated you can proceed with Order Payment"
      );
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || order._id !== orderId || success) {
      dispatch({ type: "ORDER_PAY_RESET" });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    order,
    orderId,
    navigate,
    customerInfo,
    success,
    successCoupon,
  ]);

  const payHandler = (paymentResult) => {
    dispatch(orderPay(orderId, paymentResult));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (customerInfo && myTrim(customerInfo.coupon) !== myTrim(voucher)) {
      setMessage("Invalid Voucher");
    } else {
      dispatch(getCustomerCoupon({ _id: orderId, voucher }));
      setVoucher("");
    }
  };

  //--------------
  const qtyDiscount =
    order && order.orderItems.reduce((acc, item) => +item.discount + acc, 0);
  const qtyWarranty =
    order && order.orderItems.reduce((acc, item) => +item.warranty + acc, 0);
  const qtyGift =
    order && order.orderItems.reduce((acc, item) => +item.gift + acc, 0);
  //------------

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <Meta title={`Order ${order && order._id}`} />
      <Row>
        <Col md={9}>
          <h1>Order # {order && order._id}</h1>
          <h6>placed on {order && order.createdAt.substring(0, 10)}</h6>
          {order && order.returnActive && (
            <Link to={`/returnedorder/${order._id}`}>
              <Button variant='primary'>Return</Button>
            </Link>
          )}
          {order &&
            customerInfo &&
            !order.returnActive &&
            customerInfo.email === order.customer.email && (
              <Link to={`/confirmreturn/${order._id}`}>
                <Button variant='primary'>Return</Button>
              </Link>
            )}
        </Col>
        <Col md={3}>
          {order && (
            <Link to={`/deliverynote/${order._id}`}>
              <Button className='btn btn-block my-2'>
                Go to Delivery Note
              </Button>
            </Link>
          )}
          {order && (
            <Link to={`/invoice/${order._id}`}>
              <Button className='btn btn-block my-2'>Go to Invoice</Button>
            </Link>
          )}
          {order && +order.extraPrice > 0 && (
            <Link to={`/device/${order._id}`}>
              <Button className='btn btn-block'>
                Go to Device Protection Card
              </Button>
            </Link>
          )}
        </Col>
      </Row>
      <ListGroup>
        <ListGroup.Item style={{ marginTop: "50px", marginBottom: "20px" }}>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th></th>
                <th>Ordered Item</th>
                <th>Qty</th>
                <th>Price/ Item</th>
                {+qtyDiscount > 0 && <th>Discount/ Item</th>}
                {+qtyWarranty > 0 && <th>Warranty/ Item</th>}
                {+qtyGift > 0 && <th>Gift Package</th>}
                {order && +order.extraPrice > 0 && <th>Protection/ Item</th>}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order.orderItems &&
                order.orderItems.map((item) => (
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
                            -$ {addDecimals(+item.discount * +item.price)}
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
                            $ {addDecimals(+item.warranty * +item.price)}
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
                    {+order.extraPrice > 0 && (
                      <td>
                        {+item.extra1 > 0 && !order.isPaid ? (
                          <span>$4.00 / 1Year</span>
                        ) : +item.extra1 > 0 &&
                          order.isPaid &&
                          !order.isExtra ? (
                          <Link to={`/device/${order._id}`}>
                            <span className='blue'>$4.00 / 1Year</span>
                          </Link>
                        ) : +item.extra1 > 0 &&
                          order.isPaid &&
                          order.isExtra ? (
                          <Link to={`/device/${order._id}`}>
                            <span className='green'>$4.00 / 1Year</span>
                          </Link>
                        ) : +item.extra2 > 0 && !order.isPaid ? (
                          <span>$5.00 / 2Years</span>
                        ) : +item.extra2 > 0 &&
                          order.isPaid &&
                          !order.isExtra ? (
                          <Link to={`/device/${order._id}`}>
                            <span className='blue'>$5.00 / 2Years </span>
                          </Link>
                        ) : +item.extra2 > 0 &&
                          order.isPaid &&
                          order.isExtra ? (
                          <Link to={`/device/${order._id}`}>
                            <span className='green'> $5.00 / 2Years</span>
                          </Link>
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
        {loadingCoupon && <Loader />}
        {customerInfo &&
          order &&
          customerInfo.email === order.customer.email &&
          !order.isPaid &&
          myTrim(customerInfo.coupon) !== myTrim(order.voucher) &&
          myTrim(customerInfo.coupon) !== "" &&
          myTrim(order.voucher) === "" &&
          !order.returnActive && (
            <ListGroup.Item>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='coupon'>
                  <Row>
                    <Col md={5}></Col>
                    <Col md={2}>
                      <Form.Label>
                        <h5>Add Voucher:</h5>
                      </Form.Label>
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        type='text'
                        value={voucher}
                        onChange={(e) => setVoucher(e.target.value)}
                        placeholder='Enter Voucher'
                      ></Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button type='submit' className='btn btn-block'>
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
              {message && <Message variant='info'>{message}</Message>}
              {errorCoupon && <Message>{errorCoupon}</Message>}
            </ListGroup.Item>
          )}
        <Row style={{ marginTop: "20px" }}>
          <Col md={6}>
            <ShippingAddress order={order} />
            <ListGroup.Item>
              {order && order.isDelivered ? (
                <Message variant='success'>
                  Order has been delivered on{" "}
                  {order && order.deliveredAt.substring(0, 10)}
                </Message>
              ) : order && !order.isDelivered && order.isSent ? (
                <Message variant='info'>
                  Order has been dispatched on{" "}
                  {order && order.sentAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant='info'>Order is not sent yet</Message>
              )}
            </ListGroup.Item>
            <InvoiceAddress order={order} />
            <Payment order={order} />
            <ListGroup.Item>
              {order && order.isPaid ? (
                <Message variant='success'>
                  Invoice has been paid at {order && order.paidAt}
                </Message>
              ) : (
                <Message variant='info'>Invoice is not paid</Message>
              )}
            </ListGroup.Item>
          </Col>
          <Col md={6}>
            <ListGroup.Item>
              <h5>Order Summary</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={7}>
                  {" "}
                  <h6>Items Subtotal:</h6>
                </Col>
                <Col md={5}>
                  <h6>$ {addDecimals(order.itemsPrice)}</h6>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={7}>
                  {" "}
                  <h6>Shipping Fee:</h6>
                </Col>
                <Col md={5}>
                  <h6>$ {addDecimals(order.shippingPrice)}</h6>
                </Col>
              </Row>
            </ListGroup.Item>
            {+order.primePrice > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col md={7}>
                    <h6>Premium Subscription Fee:</h6>
                  </Col>
                  <Col md={5}>
                    <h6>$ 70.00</h6>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
            {+order.franchisePrice > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col md={7}>
                    <h6>Franchising System Fee:</h6>
                  </Col>
                  <Col md={5}>
                    <h6>$ 500.00</h6>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
            {order && order.voucherActive && (
              <ListGroup.Item>
                <Row>
                  <Col md={7}>
                    <h6>Premium Voucher:</h6>
                  </Col>
                  <Col md={5}>
                    <h6>-$ 10.00</h6>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Row>
                <Col md={7}>
                  <h6>Total Netto:</h6>{" "}
                </Col>
                <Col md={5}>
                  {" "}
                  <h6>$ {addDecimals(order.totalNetto)}</h6>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={7}>
                  <h6>Tax Rate (15%):</h6>{" "}
                </Col>
                <Col md={5}>
                  {" "}
                  <h6>$ {addDecimals(order.taxPrice)}</h6>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {" "}
              <Row>
                <Col md={7}>
                  <h6>TOTAL BRUTTO:</h6>
                </Col>
                <Col md={5}>
                  <h6 className={order && order.isPaid ? "blue" : ""}>
                    $ {addDecimals(order.totalPrice)}
                  </h6>
                </Col>
              </Row>
            </ListGroup.Item>
            {customerInfo &&
              order &&
              customerInfo.email === order.customer.email &&
              !order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : order && order.returnActive ? (
                    <Message variant='info'>
                      Order Return Status is activated
                    </Message>
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={payHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            <Row style={{ marginTop: "10px" }}>
              <Col md={6}></Col>
              <Col md={6}>
                {order && (
                  <Link to={`/deliverynote/${order._id}`}>
                    <Button className='btn btn-block my-2'>
                      Go to Delivery Note
                    </Button>
                  </Link>
                )}
                {order && (
                  <Link to={`/invoice/${order._id}`}>
                    <Button className='btn btn-block my-2'>
                      Go to Invoice
                    </Button>
                  </Link>
                )}
                {order && +order.extraPrice > 0 && (
                  <Link to={`/device/${order._id}`}>
                    <Button className='btn btn-block'>
                      Go to Device Protection Card
                    </Button>
                  </Link>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </ListGroup>
    </>
  );
};

export default OrderScreen;
