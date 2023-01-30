import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Table, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { addDecimals } from "../helpers";
import { listManagerCustomers } from "../actions/customerManagerActions";

const ManagerFranchiseListScreen = () => {
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

  //----------
  const qtyFranchise =
    customers &&
    customers.reduce((acc, customer) => acc + (customer.testPaid ? 1 : 0), 0);
  //---------

  return (
    <>
      <Meta title='Franchise Association List' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : +qtyFranchise === 0 ? (
        <Message variant='info'>No data to show</Message>
      ) : (
        <ListGroup>
          <ListGroup.Item>
            <h1>Franchise Association Member List</h1>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Type of Purchasing</th>
                  <th>Test Score</th>
                  <th>Franchise</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {customers &&
                  customers.map(
                    (customer) =>
                      customer.testPaid && (
                        <tr key={customer._id}>
                          <td>{customer._id}</td>
                          <td>{customer.firstName}</td>
                          <td>{customer.name}</td>
                          <td>{customer.purpose}</td>
                          <td>
                            {+customer.testScore > 79 ? (
                              <span className='green'>
                                {customer.testScore}%
                              </span>
                            ) : +customer.testScore < 80 &&
                              +customer.testScore > 0 ? (
                              <span className='red'>{customer.testScore}%</span>
                            ) : (
                              <i className='fas fa-times'></i>
                            )}
                          </td>
                          <td>
                            {customer.isFranchise ? (
                              <span className='green'>
                                from {customer.franchiseFrom.substring(0, 10)}
                              </span>
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
                  <th>Paid Frachise Fee / Qty</th>
                  <th>Paid Frachise Fee / Amount</th>
                  <th>Training completed</th>
                  <th>Training not completed</th>
                  <th>Active Members</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>{qtyFranchise}</td>
                  <td>$ {addDecimals(+qtyFranchise * 500)}</td>
                  <td>
                    {customers &&
                      customers.reduce(
                        (acc, customer) =>
                          acc + (+customer.testScore > 79 ? 1 : 0),
                        0
                      )}
                  </td>
                  <td>
                    {customers &&
                      customers.reduce(
                        (acc, customer) =>
                          acc +
                          (customer.testPaid && +customer.testScore < 80
                            ? 1
                            : 0),
                        0
                      )}
                  </td>
                  <td>
                    {customers &&
                      customers.reduce(
                        (acc, customer) => acc + (customer.isFranchise ? 1 : 0),
                        0
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

export default ManagerFranchiseListScreen;
