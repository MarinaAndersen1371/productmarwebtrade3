import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Table, ListGroup } from "react-bootstrap";
import { addDecimals } from "../helpers";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";

const FranchiseProductListScreen = () => {
  const params = useParams();
  const pageNumber = params.pageNumber || 1;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const productList = useSelector((state) => state.productList);
  const { products, loading, error, page, pages } = productList;

  useEffect(() => {
    if (customerInfo && customerInfo.isFranchise) {
      dispatch(listProducts("", pageNumber));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, customerInfo, pageNumber]);

  return (
    <>
      <Meta title='Product List' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : products && products.length === 0 ? (
        <Message variant='info'>No data to show</Message>
      ) : (
        <ListGroup>
          <ListGroup.Item>
            <h1>Product List</h1>
            <Table responsive hover striped>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Wholesale Price (-10%)</th>
                  <th>Special Offer (-5%)</th>
                  <th>Warranty (2%)</th>
                  <th>Device Protection</th>
                  <th>Count in Stock</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>
                        <Link to={`/product/${product._id}`}>
                          {product.name}
                        </Link>
                      </td>
                      <td>{product.brand}</td>
                      <td>{product.category}</td>
                      <td>${addDecimals(product.price)}</td>
                      <td>
                        ${addDecimals(+product.price - +product.price * 0.1)}
                      </td>
                      <td>
                        ${addDecimals(+product.price - +product.price * 0.05)}
                      </td>
                      <td>${addDecimals(+product.price * 0.02)}</td>
                      <td>
                        {product.extra ? (
                          <span>$4/1Year $5/2Years</span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        <strong
                          className={
                            +product.countInStock > 0 ? "green" : "red"
                          }
                        >
                          {product.countInStock}
                        </strong>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </ListGroup.Item>
          <Paginate page={page} pages={pages} />
        </ListGroup>
      )}
    </>
  );
};

export default FranchiseProductListScreen;
