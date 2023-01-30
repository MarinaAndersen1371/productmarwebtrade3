import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Table, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { myTrim } from "../helpers";
import { listAdminCustomers, deleteCustomer } from "../actions/customerActions";

const AdminCustomerListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const customerAdminList = useSelector((state) => state.customerAdminList);
  const { customers, loading, error } = customerAdminList;

  const customerDelete = useSelector((state) => state.customerDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = customerDelete;

  useEffect(() => {
    if (customerInfo && customerInfo.isAdmin) {
      dispatch(listAdminCustomers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, customerInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Do you really want to delete this Customer?")) {
      dispatch(deleteCustomer(id));
      navigate("/admin/customerlist");
    }
  };

  return (
    <>
      <Meta title='Customer List' />
      {loadingDelete && <Loader />}
      {errorDelete && <Message>{errorDelete}</Message>}
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
                  <th>Premium Coupon</th>
                  <th>Test paid</th>
                  <th>Test Score</th>
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
                        {myTrim(customer.coupon) !== "" ? (
                          <span className='orange'>{customer.coupon}</span>
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
                        {+customer.testScore > 79 ? (
                          <span className='green'>{customer.testScore}%</span>
                        ) : +customer.testScore < 80 &&
                          customer.testScore > 0 ? (
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
                        <Link to={`/admin/customer/${customer._id}/edit`}>
                          <Button className='btn btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </Link>
                        <Button
                          className='btn btn-sm my-1'
                          variant='danger'
                          onClick={() => deleteHandler(customer._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
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

export default AdminCustomerListScreen;
