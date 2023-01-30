import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Table, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { addDecimals, myTrim } from "../helpers";
import { listAdminOrders } from "../actions/orderActions";

const AdminOrderListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const orderAdminList = useSelector((state) => state.orderAdminList);
  const { orders, loading, error } = orderAdminList;

  useEffect(() => {
    if (customerInfo && customerInfo.isAdmin) {
      dispatch(listAdminOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, customerInfo]);

  return (
    <>
      <Meta title='Order List' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : orders && orders.length === 0 ? (
        <Message variant='info'>No Orders to show</Message>
      ) : (
        <ListGroup>
          <ListGroup.Item>
            <h1>Order List</h1>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Total Netto</th>
                  <th>Total Brutto</th>
                  <th>Purchase Cost</th>
                  <th>Shipping Fee</th>
                  <th>Premium Fee</th>
                  <th>Premium Voucher</th>
                  <th>Voucher Status</th>
                  <th>Franchise Fee</th>
                  <th>Invoice paid</th>
                  <th>Delivery Status</th>
                  <th>Invoice sent</th>
                  <th>Return Status</th>
                  <th>Return Netto</th>
                  <th>Return Brutto</th>
                  <th>Received back</th>
                  <th>Refund paid</th>
                  <th>Return closed</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>
                        {order.customer.deleted ? (
                          <span className='purple'>removed Customer</span>
                        ) : (
                          <span>
                            {order.customer.firstName} {order.customer.name}
                          </span>
                        )}
                      </td>
                      <td>${addDecimals(order.totalNetto)}</td>
                      <td className={order.isPaid ? "blue" : ""}>
                        ${addDecimals(order.totalPrice)}
                      </td>
                      <td className='red'>-${addDecimals(order.cost)}</td>
                      <td>${addDecimals(order.shippingPrice)}</td>
                      <td>
                        {+order.primePrice > 0 ? (
                          <span>$70.00</span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {myTrim(order.voucher) !== "" ? (
                          order.voucher
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {order.voucherActive ? (
                          <i className='fas fa-check'></i>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {+order.franchisePrice > 0 ? (
                          <span>$500.00</span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {order.isPaid ? (
                          <span>{order.paidAt.substring(0, 10)}</span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <span className='green'>
                            Delivered/ {order.deliveredAt.substring(0, 10)}
                          </span>
                        ) : !order.isDelivered && order.isSent ? (
                          <span className='orange'>
                            {" "}
                            Dispatched/ {order.sentAt.substring(0, 10)}
                          </span>
                        ) : (
                          <span>Not sent</span>
                        )}
                      </td>
                      <td>
                        {order.invoiceSent ? (
                          <span>{order.invoiceAt.substring(0, 10)}</span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {order.returnActive ? (
                          <i className='fas fa-check'></i>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {order.returnActive ? (
                          <span>-${addDecimals(order.totalNettoBack)}</span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {order.returnActive ? (
                          <span>-${addDecimals(order.totalPriceBack)}</span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {order.isReceived ? (
                          <span className='green'>
                            {order.receivedAt.substring(0, 10)}
                          </span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {order.refund ? (
                          <span className='blue'>
                            {order.refundAt.substring(0, 10)}
                          </span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {order.returnClosed ? (
                          <i className='fas fa-check'></i>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        <Link to={`/order/${order._id}`}>
                          <Button className='btn btn-sm'>Details</Button>
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

export default AdminOrderListScreen;
