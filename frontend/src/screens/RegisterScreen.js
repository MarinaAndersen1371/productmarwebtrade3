import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/customerActions";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [purpose, setPurpose] = useState("Other");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const customerRegister = useSelector((state) => state.customerRegister);
  const { loading, error, customerInfo } = customerRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (customerInfo) {
      navigate(redirect);
    }
  }, [redirect, navigate, customerInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        register(
          firstName,
          name,
          email,
          password,
          phone,
          birthday,
          gender,
          purpose
        )
      );
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message>{message}</Message>}
      {error && <Message>{error}</Message>}
      {loading && <Loader />}
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
            <Col md={3}>
              <Form.Label>Date of Birth:</Form.Label>
            </Col>
            <Col md={5}>
              <Form.Control
                type='date'
                name='birthday'
                min='1940-01-01'
                max='2010-12-31'
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              ></Form.Control>
            </Col>
            <Col md={4}></Col>
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

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
