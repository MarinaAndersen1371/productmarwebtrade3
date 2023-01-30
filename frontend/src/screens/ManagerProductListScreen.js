import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, ListGroup, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import { addDecimals } from "../helpers";
import { listManagerProducts } from "../actions/productActions";

const ManagerProductListScreen = () => {
  const params = useParams();
  const pageNumber = params.pageNumber || 1;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const productManagerList = useSelector((state) => state.productManagerList);
  const { products, loading, error, page, pages, allproducts } =
    productManagerList;

  useEffect(() => {
    if (customerInfo && customerInfo.isManager) {
      dispatch(listManagerProducts("", pageNumber));
    } else {
      navigate("/login");
    }
  }, [dispatch, customerInfo, navigate, pageNumber]);

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
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Purchase Price</th>
                  <th>Standard Price</th>
                  <th>Wholesale Price (-10%)</th>
                  <th>Special Offer (-5%)</th>
                  <th>Warranty (2%)</th>
                  <th>Device Protection</th>
                  <th>Count in Stock</th>
                  <th></th>
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
                      <td>${addDecimals(+product.pricePurchase)}</td>
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
                      <td>
                        <Link to={`/manager/product/${product._id}/edit`}>
                          <Button className='btn btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </ListGroup.Item>

          <ListGroup.Item style={{ marginTop: "60px" }}>
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Total</th>
                  <th>Total Device Protection</th>
                  <th>Total Count in Stock</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Quantity / Page</td>
                  <td>{products && products.length} </td>
                  <td>
                    {products &&
                      products.reduce(
                        (acc, product) =>
                          acc + (product.extra === true ? 1 : 0),
                        0
                      )}{" "}
                  </td>
                  <td>
                    {products &&
                      products.reduce(
                        (acc, product) => acc + +product.countInStock,
                        0
                      )}{" "}
                  </td>
                </tr>
                <tr>
                  <td>Quantity / Total</td>
                  <td>{allproducts && allproducts.length} </td>
                  <td>
                    {allproducts &&
                      allproducts.reduce(
                        (acc, product) =>
                          acc + (product.extra === true ? 1 : 0),
                        0
                      )}{" "}
                  </td>
                  <td>
                    {allproducts &&
                      allproducts.reduce(
                        (acc, product) => acc + +product.countInStock,
                        0
                      )}{" "}
                  </td>
                </tr>
              </tbody>
            </Table>
          </ListGroup.Item>
          <Paginate page={page} pages={pages} />
        </ListGroup>
      )}
    </>
  );
};

export default ManagerProductListScreen;
