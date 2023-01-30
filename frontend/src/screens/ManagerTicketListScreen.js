import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, ListGroup, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { getManagerTicketList } from "../actions/ticketActions";

const ManagerTicketListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const ticketManagerList = useSelector((state) => state.ticketManagerList);
  const { tickets, loading, error } = ticketManagerList;

  useEffect(() => {
    if (customerInfo && customerInfo.isManager) {
      dispatch(getManagerTicketList());
    } else {
      navigate("/login");
    }
  }, [dispatch, customerInfo, navigate]);

  return (
    <>
      <Meta title='Ticket List' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : tickets && tickets.length === 0 ? (
        <Message variant='info'>No data to show</Message>
      ) : (
        <ListGroup>
          <ListGroup.Item>
            <h1>Ticket List</h1>
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Request Category</th>
                  <th>Ticket Status</th>
                  <th>Booked Time (Support)</th>
                  <th>Booked Time (Manager)</th>
                  <th>Total Time</th>
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
                      {ticket.mark === "danger" ? (
                        <td>
                          <i className='fas fa-exclamation'></i>
                        </td>
                      ) : ticket.mark === "info" ? (
                        <td>
                          <i className='fas fa-question'></i>
                        </td>
                      ) : (
                        <td></td>
                      )}
                      <td>
                        <Link to={`/ticket/${ticket._id}`}>
                          <Button className='btn btn-sm'>Details</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </ListGroup.Item>

          <ListGroup.Item style={{ marginTop: "60px" }}>
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Total Tickets</th>
                  <th>New Tickets</th>
                  <th>On hold Tickets</th>
                  <th>Closed Tickets</th>
                  <th>Total Booked Time/min</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>{tickets && tickets.length}</td>
                  <td>
                    {tickets &&
                      tickets.reduce(
                        (acc, ticket) =>
                          acc + (ticket.status === "New" ? 1 : 0),
                        0
                      )}{" "}
                  </td>
                  <td>
                    {tickets &&
                      tickets.reduce(
                        (acc, ticket) =>
                          acc + (ticket.status === "On hold" ? 1 : 0),
                        0
                      )}{" "}
                  </td>
                  <td>
                    {tickets &&
                      tickets.reduce(
                        (acc, ticket) =>
                          acc + (ticket.status === "Closed" ? 1 : 0),
                        0
                      )}{" "}
                  </td>
                  <td>
                    {" "}
                    {tickets &&
                      tickets.reduce(
                        (acc, ticket) =>
                          acc + (+ticket.timeManager + +ticket.timeSupport),
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

export default ManagerTicketListScreen;
