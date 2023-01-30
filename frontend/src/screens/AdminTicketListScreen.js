import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Table, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { getAdminTicketList, deleteTicket } from "../actions/ticketActions";

const AdminTicketListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const ticketAdminList = useSelector((state) => state.ticketAdminList);
  const { tickets, loading, error } = ticketAdminList;

  const ticketDelete = useSelector((state) => state.ticketDelete);
  const { success, loading: loadingDelete, error: errorDelete } = ticketDelete;

  useEffect(() => {
    if (customerInfo && customerInfo.isAdmin) {
      dispatch(getAdminTicketList());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, customerInfo, success]);

  const deleteHandler = (id) => {
    if (window.confirm("Do you really want to delete this Ticket?")) {
      dispatch(deleteTicket(id));
    }
  };

  return (
    <>
      <Meta title='Ticket List' />
      {loading ? (
        <Loader />
      ) : loadingDelete ? (
        <Loader />
      ) : errorDelete ? (
        <Message>{errorDelete}</Message>
      ) : error ? (
        <Message>{error}</Message>
      ) : tickets && tickets.length === 0 ? (
        <Message variant='info'>No data to show</Message>
      ) : (
        <ListGroup>
          <ListGroup.Item>
            <h1>Ticket List</h1>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Request Category</th>
                  <th>Ticket Status</th>
                  <th>Booked Time (Support)</th>
                  <th>Booked Time (Manager)</th>
                  <th>Total Booked Time</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tickets &&
                  tickets.map((ticket) => (
                    <tr key={ticket._id}>
                      <td>{ticket._id}</td>
                      <td>{ticket.createdAt.substring(0, 10)}</td>
                      <td>
                        {ticket.customer.deleted ? (
                          <span className='purple'>removed Customer</span>
                        ) : (
                          <span>
                            {ticket.customer.firstName} {ticket.customer.name}
                          </span>
                        )}
                      </td>
                      <td>{ticket.type}</td>
                      <td
                        className={
                          ticket.status === "New"
                            ? "blue"
                            : ticket.status === "On hold"
                            ? "red"
                            : ""
                        }
                      >
                        {ticket.status}
                      </td>
                      <td>{ticket.timeSupport}</td>
                      <td>{ticket.timeManager}</td>
                      <td>{+ticket.timeManager + +ticket.timeSupport}</td>
                      <td>
                        <Link to={`/ticket/${ticket._id}`}>
                          <Button className='btn btn-sm'>Details</Button>
                        </Link>
                      </td>
                      <td>
                        <Button
                          className='btn btn-sm'
                          variant='danger'
                          onClick={() => deleteHandler(ticket._id)}
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

export default AdminTicketListScreen;
