import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row, Table, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import ShippingAddress from "../components/ShippingAddress";
import { addDecimals } from "../helpers";
import { getOrderDetails } from "../actions/orderActions";

const DeliveryNoteScreen = () => {
  const { id: orderId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    if (!customerInfo) {
      navigate("/login");
    }
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId, navigate, customerInfo]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <Meta title={`Delivery Note ${order && order._id}`} />
      <Row>
        <Col md={9}>
          <h1>Delivery Note # {order && order._id}</h1>
          <h6>Order placed on {order && order.createdAt.substring(0, 10)}</h6>
        </Col>
        <Col md={3}>
          {order && (
            <Link to={`/order/${order._id}`}>
              <Button className='btn btn-block my-2'>Go to Order</Button>
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
        <Row style={{ marginTop: "80px", marginBottom: "40px" }}>
          <Col md={6}>
            <ShippingAddress order={order} />
          </Col>
          <Col md={6}>
            <ListGroup.Item>
              <h5>Delivery Status</h5>
            </ListGroup.Item>
            <ListGroup.Item style={{ paddingBottom: "25px" }}>
              <Row>
                <Col md={7}>
                  {" "}
                  <h6>Type of Shipping:</h6>
                </Col>
                <Col md={5}>
                  {" "}
                  {order &&
                    (+order.shippingPrice === 10 ? (
                      <h6>Fastest Delivery</h6>
                    ) : +order.shippingPrice === 0 ? (
                      <h6>Free Delivery</h6>
                    ) : (
                      <h6>Standard Delivery</h6>
                    ))}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item style={{ paddingBottom: "25px" }}>
              <Row>
                <Col md={7}>
                  <h6>Shipping Fee:</h6>
                </Col>
                <Col md={5}>
                  <h6>$ {addDecimals(order && order.shippingPrice)}</h6>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {order && order.isDelivered ? (
                <Message variant='success'>
                  Order has been delivered on{" "}
                  {order.deliveredAt.substring(0, 10)}
                </Message>
              ) : order && !order.isDelivered && order.isSent ? (
                <Message variant='info'>
                  Order has been dispatched on {order.sentAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant='info'>Order is not sent yet</Message>
              )}
              {order && order.isReceived && (
                <Message variant='info'>
                  Order has been returned on {order.receivedAt.substring(0, 10)}
                </Message>
              )}
            </ListGroup.Item>
          </Col>
        </Row>
        <ListGroup.Item>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>Ordered Item</th>
                <th>Qty</th>
                <th>Gift Package</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <tr key={item.product}>
                    <td>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td>{item.qty}</td>
                    <td>
                      {+item.gift > 0 ? (
                        <i className='fas fa-check'></i>
                      ) : (
                        <i className='fas fa-times'></i>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default DeliveryNoteScreen;
