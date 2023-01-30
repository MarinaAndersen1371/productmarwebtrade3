import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import { randomString, myTrim } from "../helpers";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import {
  updateToPrime,
  updateToFranchise,
  updateTestToPaid,
  updateTestResult,
  updateCustomerCoupon,
  updateTestScore,
} from "../actions/customerManagerActions";
import { getCustomerDetails } from "../actions/customerActions";

const ManagerCustomerEditScreen = () => {
  const { id: customerId } = useParams();

  const [testScore, setTestScore] = useState(0);
  const [coupon, setCoupon] = useState(" ");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const customerDetails = useSelector((state) => state.customerDetails);
  const { loading, error, customer } = customerDetails;

  const customerPrime = useSelector((state) => state.customerPrime);
  const { loading: loadingPrime, success: successPrime } = customerPrime;

  const customerFranchise = useSelector((state) => state.customerFranchise);
  const { loading: loadingFranchise, success: successFranchise } =
    customerFranchise;

  const customerTestPaid = useSelector((state) => state.customerTestPaid);
  const { loading: loadingTestPaid, success: successTestPaid } =
    customerTestPaid;

  const customerTestResult = useSelector((state) => state.customerTestResult);
  const { loading: loadingTestResult, success: successTestResult } =
    customerTestResult;

  const customerTestScore = useSelector((state) => state.customerTestScore);
  const {
    loading: loadingTestScore,
    error: errorTestScore,
    success: successTestScore,
  } = customerTestScore;

  const customerCoupon = useSelector((state) => state.customerCoupon);
  const {
    loading: loadingCoupon,
    error: errorCoupon,
    success: successCoupon,
  } = customerCoupon;

  useEffect(() => {
    if (customerInfo && customerInfo.isManager) {
      if (
        !customer ||
        !customer.name ||
        customer._id !== customerId ||
        successPrime ||
        successFranchise ||
        successTestPaid ||
        successTestScore ||
        successCoupon ||
        successTestResult
      ) {
        dispatch({ type: "CUSTOMER_TEST_SCORE_RESET" });
        dispatch({ type: "CUSTOMER_TEST_RESULT_RESET" });
        dispatch({ type: "CUSTOMER_PRIME_RESET" });
        dispatch({ type: "CUSTOMER_FRANCHISE_RESET" });
        dispatch({ type: "CUSTOMER_TEST_PAID_RESET" });
        dispatch({ type: "CUSTOMER_COUPON_RESET" });
        dispatch(getCustomerDetails(customerId));
      } else {
        setTestScore(customer.testScore);
        setCoupon(customer.coupon);
      }
    } else {
      navigate("/login");
    }
  }, [
    dispatch,
    navigate,
    customerInfo,
    customer,
    customerId,
    successPrime,
    successFranchise,
    successTestPaid,
    successTestScore,
    successCoupon,
    successTestResult,
  ]);

  const primeHandler = () => {
    dispatch(updateToPrime(customer));
  };
  const franchiseHandler = () => {
    dispatch(updateToFranchise(customer));
  };
  const testPaidHandler = () => {
    dispatch(updateTestToPaid(customer));
  };
  const testResultHandler = () => {
    dispatch(updateTestResult(customer));
  };
  const testScoreHandler = (e) => {
    e.preventDefault();
    dispatch(updateTestScore({ _id: customerId, testScore }));
  };
  const couponHandler = (e) => {
    e.preventDefault();
    dispatch(updateCustomerCoupon({ _id: customerId, coupon }));
  };

  const generateCoupon = () => {
    setMessage(randomString(10));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      {loadingPrime && <Loader />}
      {loadingFranchise && <Loader />}
      {loadingTestPaid && <Loader />}
      {loadingTestResult && <Loader />}
      {loadingTestScore && <Loader />}
      {loadingCoupon && <Loader />}
      {errorTestScore && <Message>{errorTestScore}</Message>}
      {errorCoupon && <Message>{errorCoupon}</Message>}

      <Meta title='Edit Customer' />
      <Link to={"/manager/customerlist"} className='btn btn-light m-3 '>
        Go to Customer List
      </Link>
      <Link to={"/manager/primelist"} className='btn btn-light m-3'>
        Go to Premium Member List
      </Link>
      <Link to={"/manager/franchiselist"} className='btn btn-light m-3'>
        Go to Franchise Association List
      </Link>
      <h1>Update Customer Status</h1>
      <h5>
        Name: {customer && customer.firstName} {customer && customer.name}
      </h5>
      <h5>Customer ID: {customer && customer._id}</h5>

      <ListGroup>
        <Row className='my-5'>
          <Col md={6}>
            <ListGroup.Item className='py-4'>
              <h5>Premium Member:</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={4}>
                  <h6>Status:</h6>
                </Col>
                <Col md={8}>
                  {customer && customer.isPrime ? (
                    <Message variant='success'>
                      Active from {customer.primeFrom.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message variant='info'> Not active </Message>
                  )}
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={primeHandler}
                    disabled={customer && customer.isPrime}
                  >
                    Update Status to Premium
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className='py-4'>
              <Row>
                <Col md={4}>
                  <h6>Coupon:</h6>
                </Col>
                <Col md={8}>
                  {message && <Message variant='info'>{message}</Message>}
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={generateCoupon}
                  >
                    Generate Coupon
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className='py-4'>
              <Row>
                <Col md={4}></Col>
                <Col md={8}>
                  <Row>
                    <Col md={6}>
                      <Form.Control
                        type='text'
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                      ></Form.Control>
                    </Col>
                    <Col md={6}>
                      <Button
                        type='button'
                        className='btn btn-block'
                        onClick={couponHandler}
                        disabled={customer && !customer.isPrime}
                      >
                        Update Coupon
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ListGroup.Item>
          </Col>
          <Col md={6}>
            <ListGroup.Item className='py-4'>
              <h5>Franchise Association Member:</h5>
            </ListGroup.Item>
            <ListGroup.Item className='py-4'>
              <Row>
                <Col md={4}>
                  <h6>Training:</h6>
                </Col>
                <Col md={8}>
                  {customer && customer.testPaid ? (
                    <Message variant='success'>Training is paid</Message>
                  ) : (
                    <Message variant='info'> Training is not paid </Message>
                  )}
                  <Button
                    className='btn btn-block'
                    onClick={testPaidHandler}
                    disabled={customer && customer.testPaid}
                  >
                    Mark Training as paid
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className='py-4'>
              <Row>
                <Col md={4}>
                  <h6>Test Answers:</h6>
                </Col>
                <Col md={8}>
                  {customer && myTrim(customer.test1) === "" ? (
                    <Message variant='info'>No Answers to show</Message>
                  ) : (
                    <Message variant='info'>
                      {" "}
                      1.{customer && customer.test1}, 2.
                      {customer && customer.test2}, 3.
                      {customer && customer.test3}, 4.
                      {customer && customer.test4}, 5.
                      {customer && customer.test5}
                    </Message>
                  )}
                  <Button
                    className='btn btn-block my-2'
                    onClick={testResultHandler}
                    disabled={
                      customer &&
                      (!customer.testPaid ||
                        myTrim(customer.test1) === "" ||
                        +customer.testScore > 79)
                    }
                  >
                    Verify Test Answers
                  </Button>
                  {customer && +customer.testScore > 79 && (
                    <Message variant='success'>
                      Test has been completed with{" "}
                      {customer && customer.testScore}%
                    </Message>
                  )}
                  {customer &&
                    +customer.testScore < 80 &&
                    +customer.testScore > 0 && (
                      <Message>
                        Test has been failed with{" "}
                        {customer && customer.testScore}%
                      </Message>
                    )}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className='py-4'>
              <Row>
                <Col md={4}>
                  <h6>Training Score (%):</h6>
                </Col>
                <Col md={3}>
                  <Form.Control
                    type='number'
                    min={0}
                    max={100}
                    value={testScore}
                    onChange={(e) => setTestScore(e.target.value)}
                  ></Form.Control>
                </Col>
                <Col md={5}>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={testScoreHandler}
                    disabled={
                      customer &&
                      (!customer.testPaid || +customer.testScore > 79)
                    }
                  >
                    Update Test Score
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className='py-4'>
              <Row>
                <Col md={4}>
                  <h6>Status:</h6>
                </Col>
                <Col md={8}>
                  {customer && customer.isFranchise ? (
                    <Message variant='success'>
                      Active from {customer.franchiseFrom.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message variant='info'> Not active </Message>
                  )}
                  <Button
                    className='btn btn-block'
                    onClick={franchiseHandler}
                    disabled={
                      customer &&
                      (customer.isFranchise || +customer.testScore < 80)
                    }
                  >
                    Update Status to Franchise
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          </Col>
        </Row>
      </ListGroup>
    </>
  );
};

export default ManagerCustomerEditScreen;
