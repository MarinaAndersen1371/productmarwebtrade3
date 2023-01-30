import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Table, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { listManagerCustomers } from "../actions/customerManagerActions";

const ManagerCustomerListScreen = () => {
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

  return (
    <>
      {" "}
      <Meta title='Customer List' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : customers && customers.length === 0 ? (
        <Message variant='info'>No data to show</Message>
      ) : (
        <ListGroup>
          <ListGroup.Item>
            <h1>Customer List</h1>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
                  <th>Date of Birth</th>
                  <th>Gender</th>
                  <th>Type of Purchasing</th>
                  <th>Premium</th>
                  <th>Test paid</th>
                  <th>Franchise</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {customers &&
                  customers.map((customer) => (
                    <tr key={customer._id}>
                      <td>{customer._id}</td>
                      <td>{customer.firstName}</td>
                      <td>{customer.name}</td>
                      <td>
                        <a href={`mailto: ${customer.email}`}>
                          {customer.email}
                        </a>
                      </td>
                      <td>{customer.phone}</td>
                      <td>{customer.birthday}</td>
                      <td>{customer.gender}</td>
                      <td>{customer.purpose}</td>
                      <td>
                        {customer.isPrime ? (
                          <span className='orange'>
                            from {customer.primeFrom.substring(0, 10)}
                          </span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {customer.testPaid ? (
                          <i className='fas fa-check'></i>
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
                        {customer.isAdmin ? (
                          <strong>Admin</strong>
                        ) : customer.isManager ? (
                          <strong>Manager</strong>
                        ) : customer.isSupport ? (
                          <strong>Support</strong>
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
                  ))}
              </tbody>
            </Table>
          </ListGroup.Item>
          <ListGroup.Item style={{ marginTop: "30px" }}>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Total Customers</th>
                  <th>Female Customers</th>
                  <th>Male Customers</th>
                  <th>Private Customers</th>
                  <th>Wholesale Business</th>
                  <th>Frachise Association</th>
                  <th>Premium Membership</th>
                  <th>Frachise Membership</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{customers && customers.length}</td>
                  <td>
                    {customers &&
                      customers.reduce(
                        (acc, customer) =>
                          acc + (customer.gender === "Female" ? 1 : 0),
                        0
                      )}
                  </td>
                  <td>
                    {customers &&
                      customers.reduce(
                        (acc, customer) =>
                          acc + (customer.gender === "Male" ? 1 : 0),
                        0
                      )}
                  </td>
                  <td>
                    {customers &&
                      customers.reduce(
                        (acc, customer) =>
                          acc +
                          (customer.purpose === "Private Customer" ||
                          customer.purpose === "Other"
                            ? 1
                            : 0),
                        0
                      )}
                  </td>
                  <td>
                    {customers &&
                      customers.reduce(
                        (acc, customer) =>
                          acc +
                          (customer.purpose === "Wholesale Business" ? 1 : 0),
                        0
                      )}
                  </td>
                  <td>
                    {customers &&
                      customers.reduce(
                        (acc, customer) =>
                          acc +
                          (customer.purpose === "Franchise Member" ? 1 : 0),
                        0
                      )}
                  </td>
                  <td>
                    {customers &&
                      customers.reduce(
                        (acc, customer) => acc + (customer.isPrime ? 1 : 0),
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

export default ManagerCustomerListScreen;
