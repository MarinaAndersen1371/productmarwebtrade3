import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { myTrim } from "../helpers";
import {
  getCustomerDetails,
  updateCustomerProfile,
} from "../actions/customerActions";

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("yyyy-MM-dd");
  const [gender, setGender] = useState("");
  const [purpose, setPurpose] = useState("Other");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const customerDetails = useSelector((state) => state.customerDetails);
  const { loading, error, customer } = customerDetails;

  const customerUpdateProfile = useSelector(
    (state) => state.customerUpdateProfile
  );
  const { success } = customerUpdateProfile;

  useEffect(() => {
    if (!customerInfo) {
      navigate("/login");
    } else if (!customer || customer.email !== customerInfo.email || success) {
      dispatch({ type: "CUSTOMER_UPDATE_PROFILE_RESET" });
      dispatch(getCustomerDetails("profile"));
    } else {
      setFirstName(customer.firstName);
      setName(customer.name);
      setEmail(customer.email);
      setPhone(customer.phone);
      setPurpose(customer.purpose);
      setBirthday(customer.birthday);
      setGender(customer.gender);
    }
  }, [dispatch, navigate, customer, success, customerInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateCustomerProfile({
          id: customer._id,
          firstName,
          name,
          email,
          password,
          phone,
          birthday,
          gender,
          purpose,
        })
      );
      setMessage("Profile has been updated");
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Row>
      <Meta title='My Account' />
      <Col md={5}>
        {customer && myTrim(customer.image) !== "" ? (
          <Image
            src={customer.image}
            alt={customer.name}
            roundedCircle
            className={customer.gender === "Female" ? "fotoFemale" : "fotoMale"}
          />
        ) : (
          <i
            className={
              customer && customer.gender === "Male"
                ? "fas fa-user-tie"
                : "fas fa-user"
            }
          ></i>
        )}

        <h1 style={{ marginTop: "80px", marginBottom: "30px" }}>
          My Account Status:
        </h1>
        <ListGroup>
          <ListGroup.Item>
            <Row>
              <Col md={7}>
                <h6>Premium Member:</h6>
              </Col>
              <Col md={5}>
                {customer && customer.isPrime ? (
                  <Message variant='success'>
                    Active from {customer.primeFrom.substring(0, 10)}
                  </Message>
                ) : (
                  <Message variant='info'>Not active</Message>
                )}
              </Col>
            </Row>
          </ListGroup.Item>
          {customer && myTrim(customer.coupon) !== "" && (
            <ListGroup.Item>
              <Row>
                <Col md={7}>
                  <h6>Loyalty Points Voucher ($10):</h6>
                </Col>
                <Col md={5}>
                  <Message variant='success'>{customer.coupon}</Message>
                </Col>
              </Row>
            </ListGroup.Item>
          )}
          <ListGroup.Item style={{ marginTop: "30px" }}>
            <Row>
              <Col md={7}>
                <h6>Franchise Association Member:</h6>
              </Col>
              <Col md={5}>
                {customer && customer.isFranchise ? (
                  <Message variant='success'>
                    Active from {customer.franchiseFrom.substring(0, 10)}
                  </Message>
                ) : (
                  <Message variant='info'>Not active</Message>
                )}
              </Col>
            </Row>
          </ListGroup.Item>
          {customer && customer.testPaid && (
            <ListGroup.Item>
              <Message variant='success'>Training is paid</Message>
            </ListGroup.Item>
          )}
          {customer && +customer.testScore > 79 && (
            <ListGroup.Item>
              <Message variant='success'>
                Training has been completed with {customer.testScore}%
              </Message>
            </ListGroup.Item>
          )}
          {customer && +customer.testScore > 0 && +customer.testScore < 80 && (
            <ListGroup.Item>
              <Message>
                Training has been failed with {customer.testScore}%
              </Message>
              <Message>
                Test Answers: 1.{customer.test1}, 2.
                {customer.test2}, 3.{customer.test3}, 4.
                {customer.test4}, 5.{customer.test5}
              </Message>
            </ListGroup.Item>
          )}
          {customer && customer.testPaid && +customer.testScore === 0 && (
            <ListGroup.Item>
              <Row>
                <Col md={7}></Col>
                <Col md={5}>
                  <Link to={`/customertest/${customer._id}`}>
                    <Button className='btn btn-block'>Go To Online Test</Button>
                  </Link>
                </Col>
              </Row>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Col>
      <Col md={2}></Col>
      <Col md={5}>
        <h1>Profile</h1>
        {message && <Message>{message}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='firstName'>
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='name'>
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Last Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address:</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='phone'>
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Phone Number (e.g. +49000 0000000)'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='purpose'>
            <Form.Label>Type of Purchasing:</Form.Label>
            <Form.Control
              as='select'
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            >
              <option value='Other'>Other</option>
              <option value='Private Customer'>Private Customer</option>
              <option value='Wholesale Business'>Wholesale Business</option>
              <option value='Franchise Member'>Franchise Member</option>
            </Form.Control>
          </Form.Group>

          <Form.Group id='birthday'>
            <Row>
              <Col md={6}>
                <Form.Label>Date of Birth:</Form.Label>
              </Col>
              <Col md={6}>
                <Form.Control
                  type='date'
                  min='1940-01-01'
                  max='2010-12-31'
                  name='birthday'
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group>
            <Row>
              <Col md={4}>
                <Form.Label>Gender:</Form.Label>
              </Col>
              <Col md={4}>
                <Form.Check
                  type='radio'
                  label='Female'
                  id='Female'
                  name='gender'
                  value='Female'
                  onChange={(e) => setGender(e.target.value)}
                ></Form.Check>
              </Col>
              <Col md={4}>
                <Form.Check
                  type='radio'
                  label='Male'
                  id='Male'
                  name='gender'
                  value='Male'
                  onChange={(e) => setGender(e.target.value)}
                ></Form.Check>
              </Col>
            </Row>
          </Form.Group>

          <Button type='submit' className='btn btn-block'>
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
