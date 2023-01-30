import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listTopProducts } from "../actions/productActions";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTop = useSelector((state) => state.productTop);
  const { loading, error, products } = productTop;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Carousel pause='hover'>
      {products &&
        products.map((product) => (
          <Carousel.Item key={product && product._id}>
            <Link to={`/product/${product._id}`}>
              <Image
                src={product && product.image}
                alt={product && product.name}
                fluid
              />
              <Carousel.Caption className='carousel-caption'>
                <h5>
                  {product && product.name} / ${product && product.price}
                </h5>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default ProductCarousel;
