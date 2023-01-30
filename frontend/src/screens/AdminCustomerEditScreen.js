import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import {
  getCustomerDetails,
  updateAdminCustomer,
} from "../actions/customerActions";

const AdminCustomerEditScreen = () => {
  const { id: customerId } = useParams();

  const [firstName, setFirstName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("yyyy-MM-dd");
  const [gender, setGender] = useState("");
  const [purpose, setPurpose] = useState("Other");
  const [testPaid, setTestPaid] = useState(false);
  const [testScore, setTestScore] = useState(0);
  const [coupon, setCoupon] = useState(" ");
  const [isPrime, setIsPrime] = useState(false);
  const [isFranchise, setIsFranchise] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isSupport, setIsSupport] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [image, setImage] = useState(" ");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const customerDetails = useSelector((state) => state.customerDetails);
  const { loading, error, customer } = customerDetails;

  const customerUpdate = useSelector((state) => state.customerUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success,
  } = customerUpdate;

  useEffect(() => {
    if (customerInfo && customerInfo.isAdmin) {
      if (success) {
        dispatch({ type: "CUSTOMER_UPDATE_RESET" });
        navigate(-1);
      } else if (!customer || customer._id !== customerId) {
        dispatch(getCustomerDetails(customerId));
      } else {
        setFirstName(customer.firstName);
        setName(customer.name);
        setEmail(customer.email);
        setPhone(customer.phone);
        setPurpose(customer.purpose);
        setImage(customer.image);
        setBirthday(customer.birthday);
        setGender(customer.gender);
        setIsPrime(customer.isPrime);
        setCoupon(customer.coupon);
        setTestPaid(customer.testPaid);
        setTestScore(customer.testScore);
        setIsFranchise(customer.isFranchise);
        setIsManager(customer.isManager);
        setIsSupport(customer.isSupport);
        setIsAdmin(customer.isAdmin);
      }
    } else {
      navigate("/login");
    }
  }, [dispatch, customerInfo, navigate, success, customer, customerId]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${customerInfo.token}`,
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateAdminCustomer({
        _id: customerId,
        firstName,
        name,
        email,
        phone,
        purpose,
        image,
        birthday,
        gender,
        isPrime,
        coupon,
        testPaid,
        testScore,
        isFranchise,
        isManager,
        isSupport,
        isAdmin,
      })
    );
  };

  return (
    <>
      <Meta title='Edit Customer' />
      <Link to='/admin/customerlist' className='btn btn-light'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Customer</h1>
        {errorUpdate && <Message>{errorUpdate}</Message>}
        {loadingUpdate && <Loader />}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
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

            <Form.Group controlId='image'>
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image URL'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
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

            <Row>
              <Col md={5}>
                <Form.Group controlId='isPrime'>
                  <Form.Check
                    label='Is Prime'
                    type='checkbox'
                    checked={isPrime}
                    onChange={(e) => setIsPrime(e.target.checked)}
                  ></Form.Check>
                </Form.Group>
              </Col>
              <Col md={7}>
                <Form.Group id='coupon'>
                  <Row>
                    <Col md={5}>
                      <Form.Label>Coupon:</Form.Label>
                    </Col>
                    <Col md={7}>
                      <Form.Control
                        type='text'
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                      ></Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={5}>
                <Form.Group controlId='testPaid'>
                  <Form.Check
                    label='Test paid'
                    type='checkbox'
                    checked={testPaid}
                    onChange={(e) => setTestPaid(e.target.checked)}
                  ></Form.Check>
                </Form.Group>
              </Col>
              <Col md={7}>
                <Form.Group id='testScore'>
                  <Row>
                    <Col md={6}>
                      <Form.Label>Test Score (%):</Form.Label>
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type='number'
                        min={0}
                        max={100}
                        value={testScore}
                        onChange={(e) => setTestScore(e.target.value)}
                      ></Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId='isFranchise'>
              <Form.Check
                label='Is Franchise'
                type='checkbox'
                checked={isFranchise}
                onChange={(e) => setIsFranchise(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group controlId='isManager'>
                  <Form.Check
                    label='Is Manager'
                    type='checkbox'
                    checked={isManager}
                    onChange={(e) => setIsManager(e.target.checked)}
                  ></Form.Check>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId='isSupport'>
                  <Form.Check
                    label='Is Support'
                    type='checkbox'
                    checked={isSupport}
                    onChange={(e) => setIsSupport(e.target.checked)}
                  ></Form.Check>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId='isAdmin'>
              <Form.Check
                label='Is Admin'
                type='checkbox'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AdminCustomerEditScreen;
