import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Row, Col, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { myTrim } from "../helpers";
import {
  updateVoucher,
  updateSend,
  updateCover,
  updateRefund,
  updateReturnClosed,
} from "../actions/orderManagerActions";
import { getOrderDetails } from "../actions/orderActions";

const ManagerOrderEditScreen = () => {
  const { id: orderId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderSend = useSelector((state) => state.orderSend);
  const { loading: loadingSend, success: successSend } = orderSend;

  const orderCover = useSelector((state) => state.orderCover);
  const { loading: loadingCover, success: successCover } = orderCover;

  const orderVoucher = useSelector((state) => state.orderVoucher);
  const { loading: loadingVoucher, success: successVoucher } = orderVoucher;

  const orderRefund = useSelector((state) => state.orderRefund);
  const { loading: loadingRefund, success: successRefund } = orderRefund;

  const orderCloseReturn = useSelector((state) => state.orderCloseReturn);
  const { loading: loadingCloseReturn, success: successCloseReturn } =
    orderCloseReturn;

  useEffect(() => {
    if (customerInfo && customerInfo.isManager) {
      if (
        !order ||
        order._id !== orderId ||
        successCover ||
        successSend ||
        successVoucher ||
        successRefund ||
        successCloseReturn
      ) {
        dispatch({ type: "ORDER_SEND_RESET" });
        dispatch({ type: "ORDER_VOUCHER_RESET" });
        dispatch({ type: "ORDER_COVER_RESET" });
        dispatch({ type: "ORDER_REFUND_RESET" });
        dispatch({ type: "ORDER_CLOSE_RETURN_RESET" });
        dispatch(getOrderDetails(orderId));
      }
    } else {
      navigate("/login");
    }
  }, [
    dispatch,
    navigate,
    customerInfo,
    order,
    orderId,
    successSend,
    successVoucher,
    successCover,
    successRefund,
    successCloseReturn,
  ]);

  const sendHandler = () => {
    dispatch(updateSend(order));
  };

  const voucherHandler = () => {
    dispatch(updateVoucher(order));
  };

  const coverHandler = () => {
    dispatch(updateCover(order));
  };

  const refundHandler = () => {
    dispatch(updateRefund(order));
  };

  const closeHandler = () => {
    dispatch(updateReturnClosed(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      {loadingSend && <Loader />}
      {loadingCover && <Loader />}
      {loadingVoucher && <Loader />}
      {loadingRefund && <Loader />}
      {loadingCloseReturn && <Loader />}
      <Meta title='Edit Order' />
      {order && (
        <Link to={`/order/${order._id}`} className='btn btn-light m-3'>
          Order
        </Link>
      )}
      <Link to={"/manager/orderlist"} className='btn btn-light  m-3'>
        Order List
      </Link>
      <Link to={"/manager/invoicelist"} className='btn btn-light m-3'>
        Invoice List
      </Link>
      <Link to={"/manager/deliverylist"} className='btn btn-light m-3'>
        Delivery Note List
      </Link>
      <Link to={"/manager/devicelist"} className='btn btn-light m-3'>
        Device Protection List
      </Link>
      <Link to={"/manager/voucherlist"} className='btn btn-light m-3'>
        Voucher List
      </Link>
      <Link to={"/manager/returnlist"} className='btn btn-light  m-3'>
        Order Return List
      </Link>
      <h1>Update Order Status</h1>
      <h6>Order ID: {order && order._id}</h6>
      <h6>placed on: {order && order.createdAt.substring(0, 10)}</h6>
      <h6>
        Customer Name: {order && order.customer.firstName}{" "}
        {order && order.customer.name}
      </h6>
      <ListGroup>
        <Row className='my-5'>
          <Col md={6}>
            <ListGroup.Item className='py-4'>
              <h5>Delivery Status:</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              {order && order.isSent ? (
                <Message variant='info'>
                  Order has been dispatched on {order.sentAt.substring(0, 10)}
                </Message>
              ) : (
                <Message> Order is not dispatched </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item className='py-4'>
              {order && order.isDelivered ? (
                <Message variant='success'>
                  Order has been delivered on{" "}
                  {order.deliveredAt.substring(0, 10)}
                </Message>
              ) : (
                <Message> Order is not delivered </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h5>Invoice Status:</h5>
            </ListGroup.Item>
            <ListGroup.Item className='py-4'>
              {order && order.isPaid ? (
                <Message variant='success'>
                  Invoice has been paid on {order.paidAt.substring(0, 10)}
                </Message>
              ) : (
                <Message>Invoice is not paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item className='py-4'>
              {order && order.invoiceSent ? (
                <Message variant='success'>
                  Invoice has been sent on {order.invoiceAt.substring(0, 10)}
                </Message>
              ) : (
                <Message> Invoice is not sent </Message>
              )}
              <Button
                type='button'
                className='btn btn-block'
                onClick={sendHandler}
                disabled={order && (!order.isPaid || order.invoiceSent)}
              >
                Mark Invoice as sent
              </Button>
            </ListGroup.Item>

            <ListGroup.Item className='py-4'>
              <h5>Premium Voucher Status:</h5>
            </ListGroup.Item>
            <ListGroup.Item className='py-4'>
              {order && order.voucherActive ? (
                <Message variant='success'>Voucher is active</Message>
              ) : order &&
                !order.voucherActive &&
                myTrim(order.voucher) !== "" ? (
                <Message>Voucher is not active</Message>
              ) : (
                <Message variant='info'>
                  No Voucher submitted for this Order{" "}
                </Message>
              )}
              <Button
                type='button'
                className='btn btn-block'
                disabled={
                  order &&
                  (order.isPaid ||
                    order.voucherActive ||
                    myTrim(order.voucher) === "")
                }
                onClick={voucherHandler}
              >
                Activate Voucher
              </Button>
            </ListGroup.Item>
          </Col>

          <Col md={6}>
            <ListGroup.Item className='py-4'>
              <h5>Device Protection Status:</h5>
            </ListGroup.Item>
            <ListGroup.Item className='py-4'>
              {order && +order.extraPrice > 0 && order.isPaid ? (
                <Message variant='success'>Cover has been paid</Message>
              ) : order && +order.extraPrice > 0 && !order.isPaid ? (
                <Message variant='info'>Cover is not paid</Message>
              ) : (
                <Message variant='info'>
                  No Extra Device Protection for this Order{" "}
                </Message>
              )}
            </ListGroup.Item>
            {order && order.isExtra && (
              <ListGroup.Item>
                <Message variant='success'>
                  Active from {order.extraFrom.substring(0, 10)}
                </Message>
              </ListGroup.Item>
            )}
            {order && +order.extraPrice > 0 && !order.isExtra && (
              <ListGroup.Item className='py-4'>
                <Message>Not active</Message>
              </ListGroup.Item>
            )}
            <ListGroup.Item className='py-4'>
              <Button
                type='button'
                className='btn btn-block'
                onClick={coverHandler}
                disabled={
                  order &&
                  (order.isExtra ||
                    !order.isPaid ||
                    !order.isDelivered ||
                    +order.extraPrice === 0 ||
                    order.returnActive)
                }
              >
                Mark Status as active
              </Button>
            </ListGroup.Item>

            <ListGroup.Item className='py-4'>
              <h5>Order Return Status:</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              {order && order.returnActive && !order.returnClosed ? (
                <Message variant='info'>Return is opened</Message>
              ) : order && order.returnActive && order.returnClosed ? (
                <Message variant='success'>Return is closed</Message>
              ) : (
                <Message variant='info'>No Return for this Order</Message>
              )}
            </ListGroup.Item>
            {order && order.isReceived && (
              <ListGroup.Item className='py-4'>
                <Message variant='success'>
                  Return has been received on{" "}
                  {order.receivedAt.substring(0, 10)}
                </Message>
              </ListGroup.Item>
            )}
            {order && order.returnActive && order.isSent && !order.isReceived && (
              <ListGroup.Item className='py-4'>
                <Message variant='info'>Return is not received back</Message>
              </ListGroup.Item>
            )}
            {order && order.returnActive && order.isPaid && !order.refund && (
              <ListGroup.Item className='py-4'>
                <Message>Refund is not paid</Message>
              </ListGroup.Item>
            )}
            {order && order.refund && (
              <ListGroup.Item>
                <Message variant='success'>
                  Refund has been paid on {order.refundAt.substring(0, 10)}
                </Message>
              </ListGroup.Item>
            )}
            <ListGroup.Item className='py-4'>
              <Button
                type='button'
                className='btn btn-block'
                onClick={refundHandler}
                disabled={
                  order &&
                  (!order.returnActive ||
                    (order.returnActive && !order.isPaid) ||
                    (order.returnActive && order.isSent && !order.isReceived) ||
                    order.refund ||
                    order.returnClosed)
                }
              >
                Mark Refund as paid
              </Button>
            </ListGroup.Item>
            <ListGroup.Item className='py-4'>
              <Button
                type='button'
                className='btn btn-block'
                onClick={closeHandler}
                disabled={
                  order &&
                  (!order.returnActive ||
                    (order.returnActive && order.isPaid && !order.refund) ||
                    (order.returnActive && order.isSent && !order.isReceived) ||
                    order.returnClosed)
                }
              >
                Mark Order Return as closed
              </Button>
            </ListGroup.Item>
          </Col>
        </Row>
      </ListGroup>
    </>
  );
};

export default ManagerOrderEditScreen;
