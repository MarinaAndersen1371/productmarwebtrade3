import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Table, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { myTrim, addDecimals } from "../helpers";
import { listManagerCustomers } from "../actions/customerManagerActions";

const ManagerPrimeListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const customerManagerList = useSelector((state) => state.customerManagerList);
  const { customers, loading, error } = customerManagerList;

  useEffect(() => {
    if (customerInfo && customerInfo.isManager) {
      dispatch(listManagerCustomers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, customerInfo]);

  //-----------
  const qtyPrime =
    customers &&
    customers.reduce((acc, customer) => acc + (customer.isPrime ? 1 : 0), 0);
  //--------------

  return (
    <>
      <Meta title='Premium Member List' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : +qtyPrime === 0 ? (
        <Message variant='info'>No data to show</Message>
      ) : (
        <ListGroup>
          <ListGroup.Item>
            <h1>Premium Member List</h1>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Type of Purchasing</th>
                  <th>Premium</th>
                  <th>Premium Coupon</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {customers &&
                  customers.map(
                    (customer) =>
                      customer.isPrime && (
                        <tr key={customer._id}>
                          <td>{customer._id}</td>
                          <td>{customer.firstName}</td>
                          <td>{customer.name}</td>
                          <td>{customer.purpose}</td>
                          <td>from {customer.primeFrom.substring(0, 10)}</td>
                          <td>
                            {myTrim(customer.coupon) !== "" ? (
                              <span>{customer.coupon}</span>
                            ) : (
                              <i className='fas fa-times'></i>
                            )}
                          </td>
                          <td>
                            <Link to={`/manager/customer/${customer._id}/edit`}>
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
                  <th>Premium Members Quantity </th>
                  <th>Total Premium Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>{qtyPrime}</td>
                  <td>${addDecimals(+qtyPrime * 70)}</td>
                </tr>
              </tbody>
            </Table>
          </ListGroup.Item>
        </ListGroup>
      )}
    </>
  );
};

export default ManagerPrimeListScreen;
