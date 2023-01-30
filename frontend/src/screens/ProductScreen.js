import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Rating from "../components/Rating";
import ProductImage from "../components/ProductImage";
import ProductReview from "../components/ProductReview";
import { addDecimals } from "../helpers";
import { listProductDetails } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [warranty1, setWarranty1] = useState("No");
  const [gift1, setGift1] = useState("No");
  const [extra11, setExtra11] = useState("No");
  const [extra22, setExtra22] = useState("No");
  const [message, setMessage] = useState(null);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (!product || !product._id || product._id !== params.id) {
      dispatch(listProductDetails(params.id));
    }
  }, [dispatch, params, product]);

  //-----
  const warranty = warranty1 === "Yes" ? 0.02 : 0;
  const gift = gift1 === "Yes" ? 5 : 0;
  const extra1 = extra11 === "Yes" ? 4 : 0;
  const extra2 = extra22 === "Yes" ? 5 : 0;
  const discount = +qty > 2 && +qty < 11 ? 0.05 : +qty > 10 ? 0.1 : 0;
  //------

  const addToCartHandler = () => {
    if ((extra11 === "Yes") & (extra22 === "Yes")) {
      setMessage(
        "Please choose only one option: 1-year or 2-year device protection."
      );
      setExtra11("No");
      setExtra22("No");
    } else {
      dispatch(
        addToCart(product._id, qty, discount, warranty, gift, extra1, extra2)
      );
      navigate("/cart");
    }
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <Meta title={product && product.name} />
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {product && product.deleted ? (
        <Message variant='info'>
          This Product is removed from the Product List
        </Message>
      ) : (
        <ListGroup className='my-2'>
          <Row>
            <Col md={4}>
              <ListGroup.Item
                style={{ paddingTop: "100px", paddingBottom: "50px" }}
              >
                <Image
                  src={product && product.image}
                  alt={product && product.name}
                  fluid
                  style={{ paddingBottom: "30px" }}
                />
                <ProductImage product={product} />
              </ListGroup.Item>
              <ListGroup.Item
                style={{ paddingTop: "40px", paddingBottom: "23px" }}
              >
                <Rating
                  value={product && product.rating}
                  text={`${product && product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item style={{ paddingTop: "30px" }}>
                <Row>
                  <Col md={7}>
                    <h6>Status:</h6>
                  </Col>
                  <Col md={5}>
                    {product && +product.countInStock > 0 ? (
                      <strong className='green'>In Stock</strong>
                    ) : (
                      <strong className='red'>Out of Stock</strong>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
            </Col>
            <Col md={8}>
              <ListGroup.Item>
                <h3 style={{ textAlign: "center" }}>
                  {product && product.name}
                </h3>
              </ListGroup.Item>
              <Row>
                <Col md={6}>
                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>
                        <h6>Brand:</h6>
                      </Col>
                      <Col md={6}>
                        <p>{product && product.brand}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>
                        <h6>Category:</h6>
                      </Col>
                      <Col md={6}>
                        <p>{product && product.category}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item style={{ paddingTop: "20px" }}>
                    <h6>Description:</h6>
                    <p>{product && product.description} </p>{" "}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>
                        <h6>Delivery:</h6>
                      </Col>
                      <Col md={6}>
                        <p>$ 5.00</p>
                      </Col>
                      <p style={{ marginLeft: "15px", marginTop: "26px" }}>
                        (on total amount over $800 Delivery is free)
                      </p>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>
                        <h6>Fastest Delivery:</h6>
                      </Col>
                      <Col md={6}>
                        <p>$ 10.00</p>
                      </Col>
                      <p style={{ marginLeft: "15px" }}>(within 24 hours)</p>
                    </Row>
                  </ListGroup.Item>
                </Col>
                <Col md={6}>
                  <ListGroup.Item>
                    <Row>
                      <Col md={7}>
                        <h5>Price:</h5>
                      </Col>
                      <Col md={5}>
                        <h5
                          className={
                            product && +product.countInStock > 0
                              ? "green"
                              : "red"
                          }
                        >
                          $ {addDecimals(product && product.price)}
                        </h5>
                      </Col>
                      <span className='ml-5'>
                        (Price does not include Tax Rate 15%)
                      </span>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={7}>
                        <h6>Special Offer:</h6>
                      </Col>
                      <Col md={5}>
                        <p>
                          <strong>discount 5%</strong>
                        </p>
                      </Col>
                      <span>
                        (on order more than 2 items of the same Product)
                      </span>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={7}>
                        <h6>Wholesale Offer:</h6>
                      </Col>
                      <Col md={5}>
                        <p>
                          <strong>discount 10%</strong>
                        </p>
                      </Col>
                      <p>(on order more than 10 items of the same Product)</p>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={7}>
                        <h6>Quantity:</h6>
                      </Col>
                      <Col md={5}>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          disabled={product && product.countInStock === 0}
                        >
                          {[
                            ...Array(product && product.countInStock).keys(),
                          ].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={7}>
                        <h6>Warranty Card:</h6>
                        <p>(2% of item's price)</p>
                      </Col>
                      <Col md={5}>
                        <Form.Control
                          as='select'
                          value={warranty1}
                          onChange={(e) => setWarranty1(e.target.value)}
                        >
                          <option value='No'>No</option>
                          <option value='Yes'>Yes</option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={7}>
                        <h6>This will be a gift?</h6>
                        <p>(gift package / $5.00)</p>
                      </Col>
                      <Col md={5}>
                        <Form.Control
                          as='select'
                          value={gift1}
                          onChange={(e) => setGift1(e.target.value)}
                        >
                          <option value='No'>No</option>
                          <option value='Yes'>Yes</option>
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          {product && product.extra && (
            <ListGroup.Item style={{ marginTop: "20px" }}>
              {message && <Message>{message}</Message>}
              <h5
                style={{
                  textAlign: "center",
                  paddingTop: "30px",
                  paddingBottom: "20px",
                }}
              >
                Add Extra Protection? Check if this cover meets your needs:
              </h5>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col md={8}>
                      <h6>1-year Device Protection / $ 4.00</h6>
                      <p>
                        This cover protects your product from accident
                        mechanical and electrical breakdowns damage from the
                        purchase (from the day you receive your product) for 1
                        year.
                      </p>
                    </Col>
                    <Col md={4}>
                      <Form.Control
                        as='select'
                        value={extra11}
                        onChange={(e) => setExtra11(e.target.value)}
                      >
                        <option value='No'>No</option>
                        <option value='Yes'>Yes</option>
                      </Form.Control>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md={8}>
                      <h6>2-year Device Protection / $ 5.00</h6>
                      <p>
                        Up to 2 years of coverage against accidental damage
                        (from the day you receive your product).
                      </p>
                    </Col>
                    <Col md={4}>
                      <Form.Control
                        as='select'
                        value={extra22}
                        onChange={(e) => setExtra22(e.target.value)}
                      >
                        <option value='No'>No</option>
                        <option value='Yes'>Yes</option>
                      </Form.Control>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ListGroup.Item>
          )}
          {product && +product.countInStock > 0 ? (
            <Row>
              <Col md={9}></Col>
              <Col md={3}>
                <Button
                  type='button'
                  className='btn btn-block'
                  onClick={addToCartHandler}
                  style={{ fontSize: "17px", marginTop: "15px" }}
                >
                  Add to Cart
                </Button>
              </Col>
            </Row>
          ) : (
            <Message variant='info'>This Product is not available</Message>
          )}
          <ProductReview product={product} params={params} />
        </ListGroup>
      )}
    </>
  );
};

export default ProductScreen;
