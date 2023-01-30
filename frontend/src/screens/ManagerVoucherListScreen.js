import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Table, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { addDecimals, myTrim } from "../helpers";
import { listManagerOrders } from "../actions/orderManagerActions";

const ManagerVoucherListScreen = () => {
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

  //-----
  const qtyVoucher =
    orders &&
    orders.reduce(
      (acc, order) => acc + (myTrim(order.voucher) !== "" ? 1 : 0),
      0
    );
  //-----

  return (
    <>
      <Meta title='Loyalty Points Voucher List' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : +qtyVoucher === 0 ? (
        <Message variant='info'>No data to show</Message>
      ) : (
        <ListGroup>
          <ListGroup.Item>
            <h1>Loyalty Points Voucher List</h1>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Order Total</th>
                  <th>Premium Voucher</th>
                  <th>Voucher Status</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map(
                    (order) =>
                      myTrim(order.voucher) !== "" && (
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
                          <td>$ {addDecimals(order.totalPrice)}</td>
                          <td className={order.isPaid ? "blue" : ""}>
                            {order.voucher}
                          </td>
                          <td>
                            {order.voucherActive ? (
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
                  <th>Total/Amount</th>
                  <th>Active/Qty</th>
                  <th>Active/Amount</th>
                  <th>Not active/Qty</th>
                  <th>Not active/Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>{qtyVoucher}</td>
                  <td>${addDecimals(+qtyVoucher * 10)}</td>
                  <td>
                    {orders &&
                      orders.reduce(
                        (acc, order) => acc + (order.voucherActive ? 1 : 0),
                        0
                      )}
                  </td>
                  <td>
                    $
                    {addDecimals(
                      orders &&
                        orders.reduce(
                          (acc, order) => acc + (order.voucherActive ? 10 : 0),
                          0
                        )
                    )}
                  </td>
                  <td>
                    {orders &&
                      orders.reduce(
                        (acc, order) =>
                          acc +
                          (myTrim(order.voucher) !== "" && !order.voucherActive
                            ? 1
                            : 0),
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
                            (myTrim(order.voucher) !== "" &&
                            !order.voucherActive
                              ? 10
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

export default ManagerVoucherListScreen;
