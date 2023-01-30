import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Button, Table, ListGroup, Col, Row } from "react-bootstrap";
import { addDecimals } from "../helpers";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";
import {
  listProducts,
  createProduct,
  deleteProduct,
} from "../actions/productActions";

const AdminProductListScreen = () => {
  const params = useParams();
  const pageNumber = params.pageNumber || 1;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const productList = useSelector((state) => state.productList);
  const { products, loading, error, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    if (customerInfo && customerInfo.isAdmin) {
      if (successCreate) {
        dispatch({ type: "PRODUCT_CREATE_RESET" });
        navigate(`/admin/product/${createdProduct._id}/edit`);
      } else {
        dispatch(listProducts("", pageNumber));
      }
    } else {
      navigate("/login");
    }
  }, [
    dispatch,
    navigate,
    customerInfo,
    createdProduct,
    successCreate,
    successDelete,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Do you really want to delete this Product?")) {
      dispatch(deleteProduct(id));
      navigate("/admin/productlist");
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Meta title='Product List' />
      {loadingDelete && <Loader />}
      {loadingCreate && <Loader />}
      {errorDelete && <Message>{errorDelete}</Message>}
      {errorCreate && <Message>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <ListGroup>
          <ListGroup.Item>
            <Row className='align-items-center'>
              <Col>
                <h1>Product List</h1>
              </Col>
              <Col className='text-right'>
                <Button className='my-3' onClick={createHandler}>
                  <i className='fas fa-plus'> Create Product</i>
                </Button>
              </Col>
            </Row>
            <Table responsive hover striped>
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
                        <Link to={`/admin/product/${product._id}/edit`}>
                          <Button className='btn btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </Link>
                        <Button
                          className='btn btn-sm my-1'
                          variant='danger'
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
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

export default AdminProductListScreen;
