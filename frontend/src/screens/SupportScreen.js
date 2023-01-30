import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Table, ListGroup, Row, Col, Button } from "react-bootstrap";
import FAQ from "../components/FAQ";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { myTrim } from "../helpers";
import { createTicket, getMyTicketList } from "../actions/ticketActions";

const SupportScreen = () => {
  const [quest, setQuest] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const ticketCreate = useSelector((state) => state.ticketCreate);
  const { error: errorCreate, success } = ticketCreate;

  const ticketMyList = useSelector((state) => state.ticketMyList);
  const { error, loading, tickets } = ticketMyList;

  useEffect(() => {
    if (!customerInfo) {
      navigate("/login");
    }
    if (success) {
      dispatch({ type: "TICKET_CREATE_RESET" });
      setMessage(
        "Thank you for contacting MarWeb Trade Center. Your Request has been submitted! Our Team will process it as soon as possible."
      );
      setQuest("");
      setType("");
    } else {
      dispatch(getMyTicketList());
    }
  }, [customerInfo, navigate, dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (myTrim(quest) === "" || !quest || myTrim(type) === "" || !type) {
      setMessage("No Request or Help Category to submit");
    } else {
      dispatch(createTicket({ quest, type }));
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <Meta title='Help&Support' />
      <h3 className='text-center'>
        We are here to help, {customerInfo && customerInfo.firstName}
      </h3>
      <Row className='my-5'>
        <Col md={6}>
          <ListGroup>
            <ListGroup.Item className='py-5'>
              {errorCreate && <Message>{errorCreate}</Message>}
              {message && <Message variant='info'>{message}</Message>}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='quest'>
                  <Form.Label>
                    <h5>What can we assist you with today?</h5>
                  </Form.Label>
                  <Form.Control
                    as='textarea'
                    style={{ height: "100px" }}
                    value={quest}
                    onChange={(e) => setQuest(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId='type'>
                  <Form.Label>
                    <h5 className='py-5'>In which area do you need a help?</h5>
                  </Form.Label>
                  <Form.Control
                    as='select'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value=''>Select...</option>
                    <option value='Order/ Payment'>Order/Payment</option>
                    <option value='Order/ Delivery'>Order/Delivery</option>
                    <option value='Order/ Return'>Order/Return</option>
                    <option value='Subscription/ Premium'>
                      Subscription/Premium
                    </option>
                    <option value='Subscription/ Franchising/ Training'>
                      Subscription/Franchising/Training
                    </option>
                    <option value='Profile /Account Status'>
                      Profile/Account Status
                    </option>
                    <option value='Other'>Other</option>
                  </Form.Control>
                </Form.Group>
                <Button type='submit' className='btn btn-block'>
                  Submit
                </Button>
              </Form>
            </ListGroup.Item>

            <ListGroup.Item className='py-5'>
              <h5 className='my-3'>My Requests:</h5>
              {tickets && tickets.length === 0 ? (
                <Message variant='info'>No Requests to show</Message>
              ) : (
                <Table responsive hover striped className='table-sm'>
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets &&
                      tickets.map((ticket) => (
                        <tr key={ticket._id}>
                          <td>
                            <Link to={`/ticket/${ticket._id}`}>
                              {ticket._id}
                            </Link>
                          </td>
                          <td>{ticket.createdAt.substring(0, 10)}</td>
                          <td>{ticket.status}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={6}>
          <FAQ />
        </Col>
      </Row>
    </>
  );
};

export default SupportScreen;
