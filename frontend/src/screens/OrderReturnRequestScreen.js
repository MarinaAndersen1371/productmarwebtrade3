import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Image, Col, Row, Table, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { addDecimals } from "../helpers";
import { getOrderDetails, confirmOrderReturn } from "../actions/orderActions";

const OrderReturnRequestScreen = () => {
  const { id: orderId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderConfirmReturn = useSelector((state) => state.orderConfirmReturn);
  const { success, loading: loadingReturn } = orderConfirmReturn;

  useEffect(() => {
    if (!customerInfo) {
      navigate("/login");
    }
    if (success) {
      dispatch({ type: "ORDER_CONFIRM_RETURN_RESET" });
      navigate(`/returnedorder/${order._id}`);
    }
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId, navigate, customerInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(confirmOrderReturn(order));
  };
  //-------------
  const qtyDiscount =
    order && order.orderItems.reduce((acc, item) => +item.discount + acc, 0);
  const qtyWarranty =
    order && order.orderItems.reduce((acc, item) => +item.warranty + acc, 0);
  //------------

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <ListGroup>
      <Meta title={`Order ${order && order._id}`} />
      {loadingReturn && <Loader />}
      <ListGroup.Item>
        {order && (
          <Link
            to={`/order/${order._id}`}
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <Button variant='primary'>Go to Order</Button>
          </Link>
        )}
        <h5>Order Items to return:</h5>
        <Table responsive hover striped>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Qty</th>
              <th>Price/ Item</th>
              {+qtyDiscount > 0 && <th>Discount/ Item</th>}
              {+qtyWarranty > 0 && <th>Warranty/ Item</th>}
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
                  {+order.extraPrice > 0 && (
                    <td>
                      {+item.extra1 + +item.extra2 > 0 ? (
                        <span>
                          $ {addDecimals(+item.extra1 + +item.extra2)}{" "}
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
                        +item.qty * +item.extra1 +
                        +item.qty * +item.extra2
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col md={7}></Col>
          <Col md={3}>
            <h5>Items Subtotal:</h5>
            <Button
              type='button'
              onClick={submitHandler}
              className='btn btn-block'
              style={{ marginTop: "30px", fontSize: "17px" }}
            >
              Confirm Order Return
            </Button>
          </Col>
          <Col md={2}>
            <h5>
              ${" "}
              {order &&
                addDecimals(
                  order.orderItems.reduce(
                    (acc, item) =>
                      acc +
                      +item.qty * +item.price -
                      +item.qty * +item.price * +item.discount +
                      +item.qty * +item.price * +item.warranty +
                      +item.qty * +item.extra1 +
                      +item.qty * +item.extra2,
                    0
                  )
                )}
            </h5>
          </Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <p>
          * There is no Refund for Gift Package, Premium or Franchise
          Subscriptions
        </p>
        <p>** There is no Shipping Fee Refund for already dispatched Orders</p>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default OrderReturnRequestScreen;
