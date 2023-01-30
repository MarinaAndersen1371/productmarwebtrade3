import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Table, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { addDecimals } from "../helpers";
import { listManagerOrders } from "../actions/orderManagerActions";

const ManagerDeviceListScreen = () => {
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

  //---------
  const qtyExtra =
    orders &&
    orders.reduce((acc, order) => acc + (+order.extraPrice > 0 ? 1 : 0), 0);
  //---------

  return (
    <>
      <Meta title='Extra Device Protection List' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : +qtyExtra === 0 ? (
        <Message variant='info'>No data to show</Message>
      ) : (
        <ListGroup>
          <ListGroup.Item>
            <h1>Extra Device Protection Card List</h1>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Total Cover</th>
                  <th>Status</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map(
                    (order) =>
                      +order.extraPrice > 0 && (
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
                          <td className={order.isPaid ? "blue" : ""}>
                            $ {addDecimals(order.extraPrice)}
                          </td>
                          <td>
                            {order.isExtra ? (
                              <strong className='green'>
                                Active from {order.extraFrom.substring(0, 10)}
                              </strong>
                            ) : (
                              <strong>Not active</strong>
                            )}
                          </td>
                          <td>
                            <Link to={`/device/${order._id}`}>
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
                      )
                  )}
              </tbody>
            </Table>
          </ListGroup.Item>

          <ListGroup.Item style={{ marginTop: "30px" }}>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th></th>
                  <th>Total/Qty</th>
                  <th>Total/Fee</th>
                  <th>Active/Qty</th>
                  <th>Active/Fee</th>
                  <th>Not active/Qty</th>
                  <th>Not active/Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>{qtyExtra}</td>
                  <td>
                    $
                    {addDecimals(
                      orders &&
                        orders.reduce(
                          (acc, order) => acc + +order.extraPrice,
                          0
                        )
                    )}
                  </td>
                  <td>
                    {orders &&
                      orders.reduce(
                        (acc, order) => acc + (order.isExtra ? 1 : 0),
                        0
                      )}
                  </td>
                  <td>
                    $
                    {addDecimals(
                      orders &&
                        orders.reduce(
                          (acc, order) =>
                            acc + (order.isExtra ? +order.extraPrice : 0),
                          0
                        )
                    )}
                  </td>
                  <td>
                    {orders &&
                      orders.reduce(
                        (acc, order) =>
                          acc +
                          (!order.isExtra && +order.extraPrice > 0 ? 1 : 0),
                        0
                      )}
                  </td>
                  <td>
                    $
                    {addDecimals(
                      orders &&
                        orders.reduce(
                          (acc, order) =>
                            acc +
                            (!order.isExtra && +order.extraPrice > 0
                              ? order.extraPrice
                              : 0),
                          0
                        )
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </ListGroup.Item>
        </ListGroup>
      )}
    </>
  );
};

export default ManagerDeviceListScreen;
