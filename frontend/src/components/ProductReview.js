import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { createProductReview } from "../actions/productActions";

const ProductReview = ({ product, params }) => {
  const [messageReview, setMessageReview] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const productReview = useSelector((state) => state.productReview);
  const { loading: loadingReview, error: errorReview, success } = productReview;

  useEffect(() => {
    if (success) {
      dispatch({ type: "PRODUCT_REVIEW_RESET" });
      setMessageReview("Review has been submitted!");
      setRating(0);
      setComment("");
    }
  }, [dispatch, success, product]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (comment.trim() === "" || +rating === 0) {
      setMessageReview("Review is not completed");
    } else {
      dispatch(createProductReview(params.id, { comment, rating }));
    }
  };

  return (
    <ListGroup>
      <Row>
        <Col md={6}>
          <h4>Product Reviews</h4>
          {product && product.reviews && product.reviews.length === 0 && (
            <Message variant='info'>No Reviews to show</Message>
          )}
          {product &&
            product.reviews &&
            product.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
          <ListGroup.Item>
            <h5>Write a Customer Review:</h5>
            {loadingReview && <Loader />}
            {errorReview && <Message>{errorReview}</Message>}
            {messageReview && (
              <Message variant='success'>{messageReview}</Message>
            )}
            {customerInfo ? (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='rating'>
                  <Form.Label>
                    <h6>Rating</h6>
                  </Form.Label>
                  <Form.Control
                    as='select'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value='0'>Select...</option>
                    <option value='1'>1 - Poor</option>
                    <option value='2'>2 - Fair</option>
                    <option value='3'>3 - Good</option>
                    <option value='4'>4 - Very Good </option>
                    <option value='5'>5 - Excellent</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='comment'>
                  <Form.Label>
                    <h6>Comment</h6>
                  </Form.Label>
                  <Form.Control
                    as='textarea'
                    row='3'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button
                  type='submit'
                  disabled={loadingReview}
                  variant='primary'
                >
                  Submit
                </Button>
              </Form>
            ) : (
              <Message variant='info'>
                Please <Link to='/login'> sign in</Link> to write a Customer
                Review
              </Message>
            )}
          </ListGroup.Item>
        </Col>
      </Row>
    </ListGroup>
  );
};

export default ProductReview;
