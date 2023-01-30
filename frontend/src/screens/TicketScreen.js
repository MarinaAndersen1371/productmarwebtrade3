import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, ListGroup } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ManagerTicket from "../components/ManagerTicket";
import SupportTicket from "../components/SupportTicket";
import Meta from "../components/Meta";
import { getTicketDetails } from "../actions/ticketActions";

const TicketScreen = () => {
  const { id: ticketId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const ticketDetails = useSelector((state) => state.ticketDetails);
  const { error, loading, ticket } = ticketDetails;

  useEffect(() => {
    if (!customerInfo) {
      navigate("/login");
    }
    if (!ticket || ticket._id !== ticketId) {
      dispatch(getTicketDetails(ticketId));
    }
  }, [dispatch, navigate, customerInfo, ticket, ticketId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <ListGroup>
      <Meta title={`Ticket ${ticket && ticket._id}`} />
      <h1>Ticket # {ticket && ticket._id}</h1>
      <h6>created at {ticket && ticket.createdAt}</h6>
      <h6 className='my-2'>Category: {ticket && ticket.type} </h6>
      <h6>
        Status:{" "}
        <span
          className={
            ticket && ticket.status === "New"
              ? "blue"
              : ticket && ticket.status === "On hold"
              ? "red"
              : "purple"
          }
        >
          {ticket && ticket.status}
        </span>
      </h6>
      <Row>
        <Col md={6}>
          <ListGroup.Item className='mt-3'>
            <h5>Request from:</h5>
          </ListGroup.Item>
          <ListGroup.Item>
            <h6>
              Client Name: {ticket && ticket.customer.firstName}{" "}
              {ticket && ticket.customer.name}
            </h6>
            <h6 className='my-2'>
              Email Address: {ticket && ticket.customer.email}
            </h6>
            <h6 className='my-2'>
              Phone Number: {ticket && ticket.customer.phone}
            </h6>
          </ListGroup.Item>
        </Col>
        <Col md={6}></Col>
      </Row>
      <ListGroup.Item className='mt-4'>
        <h5>Request:</h5>
      </ListGroup.Item>
      <ListGroup.Item>
        <p>{ticket && ticket.quest}</p>
      </ListGroup.Item>
      <ListGroup.Item className='mt-3'>
        <h5>Comment from Support Team:</h5>
      </ListGroup.Item>
      <ListGroup.Item>
        <p>{ticket && ticket.commentSupport}</p>
      </ListGroup.Item>
      <ListGroup.Item className='mt-3'>
        <h5>Comment from Manager:</h5>
      </ListGroup.Item>
      <ListGroup.Item>
        <p>{ticket && ticket.commentManager}</p>
      </ListGroup.Item>

      <ManagerTicket
        ticket={ticket}
        ticketId={ticketId}
        customerInfo={customerInfo}
      />

      <SupportTicket
        ticket={ticket}
        ticketId={ticketId}
        customerInfo={customerInfo}
      />
    </ListGroup>
  );
};

export default TicketScreen;
