import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { updateSupportTicket, openTicket } from "../actions/ticketActions";

const SupportTicket = ({ ticket, customerInfo, ticketId }) => {
  const [commentSupport, setCommentSupport] = useState("");
  const [status, setStatus] = useState("");
  const [mark, setMark] = useState("");
  const [timeSupport, setTimeSupport] = useState(0);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const ticketOpen = useSelector((state) => state.ticketOpen);
  const { loading, success } = ticketOpen;

  const ticketSupportUpdate = useSelector((state) => state.ticketSupportUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = ticketSupportUpdate;

  useEffect(() => {
    if (success || successUpdate) {
      dispatch({ type: "TICKET_SUPPORT_UPDATE_RESET" });
      dispatch({ type: "TICKET_OPEN_RESET" });
    }
  }, [dispatch, success, successUpdate]);

  const openHandler = () => {
    dispatch(openTicket(ticket));
  };

  const supportUpdateHandler = (e) => {
    e.preventDefault();
    if (status.trim() === "") {
      setMessage("Please choose Status Option");
    } else {
      dispatch(
        updateSupportTicket({
          _id: ticketId,
          commentSupport,
          status,
          mark,
          timeSupport,
        })
      );
      setCommentSupport("");
      setMessage(null);
    }
  };

  return (
    customerInfo &&
    customerInfo.isSupport &&
    (ticket && (ticket.open || ticket.status === "On hold") ? (
      <ListGroup.Item
        style={{
          marginTop: "40px",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message>{errorUpdate}</Message>}
        <Form onSubmit={supportUpdateHandler}>
          <Row>
            <Col md={5}>
              <Form.Group controlId='commentSupport'>
                <Form.Label>
                  <h6>Update Ticket Comment:</h6>
                </Form.Label>
                <Form.Control
                  as='textarea'
                  style={{ height: "100px" }}
                  value={commentSupport}
                  onChange={(e) => setCommentSupport(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group controlId='status'>
                <Form.Label>
                  <h6>Update Ticket Status:</h6>
                  {message && <Message>{message}</Message>}
                </Form.Label>
                <Form.Control
                  as='select'
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value=''>Select..</option>
                  <option value='New'>New</option>
                  <option value='On hold'>On hold</option>
                  <option value='Closed'>Closed</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group controlId='timeSupport'>
                <Form.Label>
                  <h6>Time Booking:</h6>
                </Form.Label>
                <Form.Control
                  type='number'
                  min={0}
                  value={timeSupport}
                  onChange={(e) => setTimeSupport(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId='mark'>
                <Form.Label>
                  <h6>Mark:</h6>
                </Form.Label>
                <Form.Control
                  as='select'
                  value={mark}
                  onChange={(e) => setMark(e.target.value)}
                >
                  <option value=' '>No Mark</option>
                  <option value='danger'>Danger</option>
                  <option value='info'>Info</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={9}></Col>
            <Col md={3}>
              <Button type='submit' className='btn btn-block my-5'>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </ListGroup.Item>
    ) : (
      <Row>
        <Col md={10}></Col>
        <Col md={2}>
          {loading && <Loader />}
          <Button
            type='button'
            className='btn btn-block my-3'
            onClick={openHandler}
          >
            Open Ticket
          </Button>
        </Col>
      </Row>
    ))
  );
};

export default SupportTicket;
