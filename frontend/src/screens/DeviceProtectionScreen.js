import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row, Table, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import ForFromAddresses from "../components/ForFromAddresses";
import { addDecimals } from "../helpers";
import { getOrderDetails } from "../actions/orderActions";

const DeviceProtectionScreen = () => {
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
    } else if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId, navigate, customerInfo]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <Meta title={`Order ${order && order._id}`} />
      <Row style={{ marginBottom: "40px" }}>
        <Col md={9}>
          <h2>Extra Device Protection Card # {order && order._id}</h2>
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
          {order && (
            <Link to={`/deliverynote/${order._id}`}>
              <Button className='btn btn-block'>Go to Delivery Note</Button>
            </Link>
          )}
        </Col>
      </Row>
      <ListGroup>
        <Meta title={`Order ${order && order._id}`} />
        <ForFromAddresses order={order} customerInfo={customerInfo} />

        <ListGroup.Item style={{ marginTop: "50px", marginBottom: "20px" }}>
          <Table responsive hover striped>
            <thead>
              {order && +order.extraPrice > 0 && (
                <tr>
                  <th style={{ width: "250px" }}>Device</th>
                  <th>Qty</th>
                  <th style={{ width: "400px" }}>Cover</th>
                  <th>Price /Item </th>
                  <th>Total </th>
                  <th>Status</th>
                </tr>
              )}
            </thead>
            <tbody>
              {order &&
                order.orderItems &&
                order.orderItems.map(
                  (item) =>
                    +item.extra1 + +item.extra2 > 0 && (
                      <tr key={item.product}>
                        <td>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </td>
                        <td>{item.qty}</td>
                        {+item.extra1 > 0 ? (
                          <td>
                            <p>
                              {" "}
                              <strong>
                                1-year device protection / $ 4.00:
                              </strong>
                            </p>
                            <p>
                              This cover protects your product from accident
                              mechanical and electrical breakdowns damage from
                              the purchase (from the day you receive your
                              product) for 1 year.
                            </p>
                          </td>
                        ) : (
                          <td>
                            <p>
                              {" "}
                              <strong>2-year Extra Device Protection:</strong>
                            </p>
                            <p>
                              Up to 2 years of coverage against accidental
                              damage (from the day you receive your product).
                            </p>
                          </td>
                        )}
                        <td className={order.isPaid ? "blue" : ""}>
                          ${addDecimals(+item.extra1 + +item.extra2)}
                        </td>
                        <td className={order.isPaid ? "blue" : ""}>
                          $
                          {addDecimals(
                            +item.qty * +item.extra1 + +item.qty * +item.extra2
                          )}
                        </td>
                        <td>
                          {order && order.isExtra ? (
                            <span className='green'>
                              Active from{" "}
                              {order && order.extraFrom.substring(0, 10)}
                            </span>
                          ) : (
                            <span>Not active</span>
                          )}
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </Table>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default DeviceProtectionScreen;
