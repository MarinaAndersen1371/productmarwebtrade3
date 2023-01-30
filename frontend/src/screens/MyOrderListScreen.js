import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { addDecimals, myTrim } from "../helpers";
import { listMyOrders } from "../actions/orderActions";

const MyOrderListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { orders, loading, error } = orderMyList;

  useEffect(() => {
    if (!customerInfo) {
      navigate("/login");
    } else {
      dispatch(listMyOrders());
    }
  }, [dispatch, navigate, customerInfo]);

  //------
  const qtyPrime =
    orders &&
    orders.reduce((acc, order) => acc + (+order.primePrice > 0 ? 1 : 0), 0);
  const qtyVoucher =
    orders &&
    orders.reduce(
      (acc, order) => acc + (myTrim(order.voucher) !== "" ? 1 : 0),
      0
    );
  const qtyFranchise =
    orders &&
    orders.reduce((acc, order) => acc + (+order.franchisePrice > 0 ? 1 : 0), 0);
  //----

  return (
    <>
      <Meta title='My Orders' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : orders && orders.length === 0 ? (
        <Message variant='info'>No Orders to show</Message>
      ) : (
        <ListGroup>
          <ListGroup.Item>
            <h1>My Orders</h1>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Order Total</th>
                  <th>Shipping Fee</th>
                  {+qtyPrime > 0 && <th>Premium Fee</th>}
                  {+qtyVoucher > 0 && <th>Premium Voucher</th>}
                  {+qtyVoucher > 0 && <th>Voucher Status</th>}
                  {+qtyFranchise > 0 && <th>Franchise Fee</th>}
                  <th>Delivery Status</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <Link to={`/order/${order._id}`}>{order._id}</Link>
                      </td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td className={order.isPaid ? "blue" : ""}>
                        ${addDecimals(order.totalPrice)}
                      </td>
                      <td>${addDecimals(order.shippingPrice)}</td>
                      {+qtyPrime > 0 && (
                        <td>
                          {+order.primePrice > 0 ? (
                            <span>$70.00</span>
                          ) : (
                            <i className='fas fa-times'></i>
                          )}
                        </td>
                      )}
                      {+qtyVoucher > 0 && (
                        <td>
                          {myTrim(order.voucher) !== "" ? (
                            order.voucher
                          ) : (
                            <i className='fas fa-times'></i>
                          )}
                        </td>
                      )}
                      {+qtyVoucher > 0 && (
                        <td>
                          {order.voucherActive ? (
                            <i className='fas fa-check'></i>
                          ) : (
                            <i className='fas fa-times'></i>
                          )}
                        </td>
                      )}
                      {+qtyFranchise > 0 && (
                        <td>
                          {+order.franchisePrice > 0 ? (
                            <span>$500.00</span>
                          ) : (
                            <i className='fas fa-times'></i>
                          )}
                        </td>
                      )}
                      <td>
                        {order.isDelivered ? (
                          <span className='green'>
                            Delivered on {order.deliveredAt.substring(0, 10)}
                          </span>
                        ) : !order.isDelivered && order.isSent ? (
                          <span className='orange'>
                            {" "}
                            Dispatched on {order.sentAt.substring(0, 10)}
                          </span>
                        ) : (
                          <span>Not sent</span>
                        )}
                      </td>
                      <td>
                        <Link to={`/returnedorder/${order._id}`}>
                          <Button
                            className='btn btn-sm'
                            disabled={order && !order.returnActive}
                          >
                            Return
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </ListGroup.Item>
        </ListGroup>
      )}
    </>
  );
};

export default MyOrderListScreen;
