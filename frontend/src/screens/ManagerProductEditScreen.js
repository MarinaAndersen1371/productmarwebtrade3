import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Button, Image, Form, ListGroup, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import {
  listProductDetails,
  updateManagerProduct,
} from "../actions/productActions";

const ManagerProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [pricePurchase, setPricePurchase] = useState(0);
  const [extra, setExtra] = useState(false);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState(" ");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productManagerUpdate = useSelector(
    (state) => state.productManagerUpdate
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success,
  } = productManagerUpdate;

  useEffect(() => {
    if (customerInfo && customerInfo.isManager) {
      if (success) {
        dispatch({ type: "PRODUCT_MANAGER_UPDATE_RESET" });
        navigate(-1);
      } else if (!product || !product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setBrand(product.brand);
        setCategory(product.category);
        setDescription(product.description);
        setPrice(product.price);
        setPricePurchase(product.pricePurchase);
        setImage(product.image);
        setCountInStock(product.countInStock);
        setExtra(product.extra);
      }
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, success, customerInfo, product, productId]);

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
      updateManagerProduct({
        _id: productId,
        name,
        brand,
        category,
        description,
        price,
        pricePurchase,
        image,
        countInStock,
        extra,
      })
    );
  };

  return (
    <>
      <Meta title='Edit Product' />
      <Link to='/manager/productlist' className='btn btn-light'>
        Go Back
      </Link>
      <h1 style={{ marginTop: "50px", marginBottom: "30px" }}>Edit Product</h1>
      {errorUpdate && <Message>{errorUpdate}</Message>}
      {loadingUpdate && <Loader />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <ListGroup>
            <Row>
              <Col md={6}>
                <ListGroup.Item>
                  <Image
                    src={product && product.image}
                    alt={product && product.name}
                    fluid
                  />
                  <Form.Group controlId='image'>
                    <Form.Label>
                      <h5>Image:</h5>
                    </Form.Label>
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
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Group controlId='countInStock'>
                    <Row>
                      <Col md={6}>
                        <Form.Label>
                          <h5>Count in Stock:</h5>
                        </Form.Label>
                      </Col>
                      <Col md={6}>
                        {" "}
                        <Form.Control
                          type='number'
                          min={0}
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                        {product && product.countInStock > 0 ? (
                          <h6 className='green'>In Stock</h6>
                        ) : (
                          <h6 className='red'>Out of Stock</h6>
                        )}
                      </Col>
                    </Row>
                  </Form.Group>
                </ListGroup.Item>
              </Col>
              <Col md={6}>
                <ListGroup.Item style={{ paddingTop: "40px" }}>
                  <Form.Group controlId='name'>
                    <Row>
                      <Col md={6}>
                        <Form.Label>
                          <h5>Name:</h5>
                        </Form.Label>
                      </Col>
                      <Col md={6}>
                        {" "}
                        <Form.Control
                          type='text'
                          placeholder='Enter Name'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item style={{ paddingTop: "20px" }}>
                  <Form.Group controlId='brand'>
                    <Row>
                      <Col md={6}>
                        <Form.Label>
                          <h5>Brand:</h5>
                        </Form.Label>
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          type='text'
                          placeholder='Enter Brand'
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                        ></Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item style={{ paddingTop: "20px" }}>
                  <Form.Group controlId='category'>
                    <Row>
                      <Col md={6}>
                        <Form.Label>
                          <h5>Category:</h5>
                        </Form.Label>
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          type='text'
                          placeholder='Enter Category'
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                      </Col>
                    </Row>
                  </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ paddingTop: "20px", paddingBottom: "30px" }}
                >
                  <Form.Group controlId='description'>
                    <Form.Label>
                      <h5>Description:</h5>
                    </Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item style={{ paddingTop: "20px" }}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId='price'>
                        <Form.Label>
                          <h5>Standart Price:</h5>
                        </Form.Label>
                        <Form.Control
                          type='number'
                          step='0.01'
                          min={0}
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId='pricePurchase'>
                        <Form.Label>
                          <h5>Purchase Price:</h5>
                        </Form.Label>
                        <Form.Control
                          type='number'
                          step='0.01'
                          min={0}
                          value={pricePurchase}
                          onChange={(e) => setPricePurchase(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ paddingTop: "30px", paddingBottom: "20px" }}
                >
                  <Row>
                    <Col md={7}>
                      <h5>Extra Device Protection</h5>
                    </Col>
                    <Col md={5}>
                      <Form.Group controlId='extra'>
                        <Form.Check
                          type='checkbox'
                          checked={extra}
                          onChange={(e) => setExtra(e.target.checked)}
                        ></Form.Check>
                      </Form.Group>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <Button
                  type='submit'
                  variant='primary'
                  className='btn btn-block my-3'
                >
                  Update
                </Button>
              </Col>
            </Row>
          </ListGroup>
        </Form>
      )}
    </>
  );
};

export default ManagerProductEditScreen;
