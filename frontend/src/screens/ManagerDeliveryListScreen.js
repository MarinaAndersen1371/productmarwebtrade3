import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Table, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import ManagerDeliveryList from "../components/ManagerDeliveryList";
import Meta from "../components/Meta";
import { addDecimals } from "../helpers";
import { listManagerOrders } from "../actions/orderManagerActions";

const ManagerDeliveryListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const orderManagerList = useSelector((state) => state.orderManagerList);
  const { orders, loading, error } = orderManagerList;

  useEffect(() => {
    if (customerInfo && customerInfo.isManager) {
      dispatch(listManagerOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, customerInfo]);

  return (
    <>
      <Meta title='Delivery Note List' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : orders && orders.length === 0 ? (
        <Message variant='info'>No data to show</Message>
      ) : (
        <ListGroup>
          <ListGroup.Item>
            <h1>Delivery Note List</h1>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Order Total</th>
                  <th>Shipping Fee</th>
                  <th>Type of Shipping</th>
                  <th>Order dispatched</th>
                  <th>Order delivered</th>
                  <th>Return Status</th>
                  <th>Fee Refund</th>
                  <th>Received back</th>
                  <th>Return Closed</th>
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
                      <td>${addDecimals(order.totalPrice)}</td>
                      <td className={order.isPaid ? "blue" : ""}>
                        ${addDecimals(order.shippingPrice)}
                      </td>
                      <td>
                        {+order.shippingPrice === 10 ? (
                          <strong className='purple'>Fastest Delivery</strong>
                        ) : +order.shippingPrice === 0 ? (
                          <strong className='orange'>Free Delivery</strong>
                        ) : (
                          <strong>Standard Delivery</strong>
                        )}
                      </td>
                      <td>
                        {order.isSent ? (
                          <strong>{order.sentAt.substring(0, 10)}</strong>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <span className='green'>
                            {order.deliveredAt.substring(0, 10)}
                          </span>
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
                        {+order.shippingPriceBack > 0 ? (
                          <span>-${addDecimals(order.shippingPriceBack)}</span>
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
                        {order.returnClosed ? (
                          <i className='fas fa-check'></i>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        <Link to={`/deliverynote/${order._id}`}>
                          <Button className='btn btn-sm'>Details</Button>
                        </Link>
                      </td>
                      <td>
                        <Link to={`/manager/order/${order._id}/edit`}>
                          <Button className='btn btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </ListGroup.Item>

          <ListGroup.Item style={{ marginTop: "30px" }}>
            <ManagerDeliveryList orders={orders} />
          </ListGroup.Item>
        </ListGroup>
      )}
    </>
  );
};

export default ManagerDeliveryListScreen;
