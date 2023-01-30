import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Image, Col, Row, Table, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { addDecimals } from "../helpers";
import { getOrderDetails } from "../actions/orderActions";

const OrderReturnScreen = () => {
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

  //------------
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
    <>
      <Meta title={`Order ${order && order._id}`} />
      <Row>
        <Col md={9}>
          <h1>Return</h1>
          <h5 style={{ marginBottom: "40px" }}>
            {" "}
            for Order # {order && order._id}
          </h5>
          <h6>
            {" "}
            Return Status:{" "}
            {order && order.returnClosed ? (
              <span>Closed</span>
            ) : (
              <span>Opened</span>
            )}{" "}
          </h6>
        </Col>
        <Col md={3}>
          {order && (
            <Link to={`/order/${order._id}`}>
              <Button className='btn btn-block'>Go to Order</Button>
            </Link>
          )}
        </Col>
      </Row>
      <ListGroup>
        <ListGroup.Item>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th></th>
                <th>Items</th>
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
              <h6>Items Subtotal:</h6>
              {order && !order.isSent && <h6>Shipping Fee:</h6>}
              {order && order.voucherActive && <h6>Premium Voucher:</h6>}
              <h6>Total Netto:</h6>
              <h6>Tax Rate (15%):</h6>
              <h6>TOTAL BRUTTO:</h6>
            </Col>
            <Col md={2}>
              <h6 className='ml-1'>
                {" "}
                $ {addDecimals(order && order.itemsPriceBack)}
              </h6>
              {order && !order.isSent && (
                <h6 className='ml-1'>
                  {" "}
                  $ {addDecimals(order && order.shippingPriceBack)}
                </h6>
              )}
              {order && order.voucherActive && <h6>- $ 10.00</h6>}
              <h6 className='ml-1'>
                $ {addDecimals(order && order.totalNettoBack)}
              </h6>
              <h6 className='ml-1'>
                $ {addDecimals(order && order.taxPriceBack)}
              </h6>
              {order && (
                <h6 className={order.refund ? "green ml-1" : "ml-1"}>
                  $ {addDecimals(order && order.totalPriceBack)}
                </h6>
              )}
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <p>
            * There is no Refund for Gift Package, Premium or Franchise
            Subscriptions
          </p>
          <p>
            ** There is no Shipping Fee Refund for already dispatched Orders
          </p>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default OrderReturnScreen;
