import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { addDecimals } from "../helpers";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product && product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product && product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product && product.rating}
            text={`${product && product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h5'>
          $ {product && addDecimals(product.price)}{" "}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
