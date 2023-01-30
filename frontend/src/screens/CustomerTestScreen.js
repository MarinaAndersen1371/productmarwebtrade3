import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal, Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import {
  getCustomerDetails,
  updateTestCustomer,
} from "../actions/customerActions";

const CustomerTestScreen = () => {
  const { id: customerId } = useParams();

  const [test1, setTest1] = useState("");
  const [test2, setTest2] = useState("");
  const [test3, setTest3] = useState("");
  const [test4, setTest4] = useState("");
  const [test5, setTest5] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);

  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const customerDetails = useSelector((state) => state.customerDetails);
  const { loading, error, customer } = customerDetails;

  const customerUpdate = useSelector((state) => state.customerUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = customerUpdate;

  useEffect(() => {
    if (!customerInfo) {
      navigate("/login");
    }
    if (
      !customer ||
      !customer._id ||
      customer._id !== customerId ||
      successUpdate
    ) {
      dispatch({ type: "CUSTOMER_UPDATE_TEST_RESET" });
      dispatch(getCustomerDetails(customerId));
    }
  }, [dispatch, navigate, successUpdate, customer, customerId, customerInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      test1 === "" ||
      test2 === "" ||
      test3 === "" ||
      test4 === "" ||
      test5 === ""
    ) {
      setMessage("Please choose only 'Yes' or 'No' option");
    } else {
      dispatch(
        updateTestCustomer({
          _id: customerId,
          test1,
          test2,
          test3,
          test4,
          test5,
        })
      );
      setMessage(null);
      handleShow();
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <Meta title='Training Test' />
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message>{errorUpdate}</Message>}
      <Row>
        <Col md={8}>
          <Link to='/profile' className='btn btn-light'>
            Go Back
          </Link>
        </Col>
        <Col md={4}>
          <h6>
            Participant: {customer && customer.firstName}{" "}
            {customer && customer.name}
          </h6>
        </Col>
      </Row>
      <ListGroup>
        <Modal show={show} animation={false}>
          <Modal.Body>
            <p>
              <strong>Test has been submitted!</strong>
            </p>
            <p>
              <strong>
                Once it has been verified your Account Status will be updated.
              </strong>
            </p>
            <Row>
              <Col md={10}></Col>
              <Col md={2}>
                <Button variant='primary' onClick={() => navigate(-1)}>
                  OK
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
        <h1 style={{ marginTop: "50px", marginBottom: "30px" }}>
          Franchise Association Training Test
        </h1>
        <h5>
          Successfully Test Completion requires minimum 4 correct answers (80%
          Score). Please choose your answers:
        </h5>
        {message && <Message>{message}</Message>}
        <Form onSubmit={submitHandler}>
          <ListGroup.Item style={{ marginTop: "30px", paddingTop: "30px" }}>
            <Form.Group controlId='test1'>
              <Row>
                <Col md={10}>
                  <Form.Label>
                    Question1: Question question question question question
                    question question question question question question
                    question question question?
                  </Form.Label>
                </Col>
                <Col md={2}>
                  <Form.Control
                    as='select'
                    value={test1}
                    onChange={(e) => setTest1(e.target.value)}
                  >
                    <option value=''>Select...</option>
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>
          </ListGroup.Item>

          <ListGroup.Item>
            <Form.Group controlId='test2'>
              <Row>
                <Col md={10}>
                  <Form.Label>
                    Question2: Question question question question question
                    question question question question question question
                    question question question?
                  </Form.Label>
                </Col>
                <Col md={2}>
                  <Form.Control
                    as='select'
                    value={test2}
                    onChange={(e) => setTest2(e.target.value)}
                  >
                    <option value=''>Select...</option>
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>
          </ListGroup.Item>

          <ListGroup.Item style={{ paddingTop: "30px" }}>
            <Form.Group controlId='test3'>
              <Row>
                <Col md={10}>
                  <Form.Label>
                    Question3: Question question question question question
                    question question question question question question
                    question question question?
                  </Form.Label>
                </Col>
                <Col md={2}>
                  <Form.Control
                    as='select'
                    value={test3}
                    onChange={(e) => setTest3(e.target.value)}
                  >
                    <option value=''>Select...</option>
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>
          </ListGroup.Item>

          <ListGroup.Item style={{ paddingTop: "30px" }}>
            <Form.Group controlId='test4'>
              <Row>
                <Col md={10}>
                  <Form.Label>
                    Question4: Question question question question question
                    question question question question question question
                    question question question?
                  </Form.Label>
                </Col>
                <Col md={2}>
                  <Form.Control
                    as='select'
                    value={test4}
                    onChange={(e) => setTest4(e.target.value)}
                  >
                    <option value=''>Select...</option>
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>
          </ListGroup.Item>

          <ListGroup.Item style={{ paddingTop: "30px" }}>
            <Form.Group controlId='test5'>
              <Row>
                <Col md={10}>
                  <Form.Label>
                    Question5: Question question question question question
                    question question question question question question
                    question question question?
                  </Form.Label>
                </Col>
                <Col md={2}>
                  <Form.Control
                    as='select'
                    value={test5}
                    onChange={(e) => setTest5(e.target.value)}
                  >
                    <option value=''>Select...</option>
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>
          </ListGroup.Item>
          <Button type='submit' variant='primary' className='btn m-3'>
            Submit Test
          </Button>
        </Form>
      </ListGroup>
    </>
  );
};

export default CustomerTestScreen;
