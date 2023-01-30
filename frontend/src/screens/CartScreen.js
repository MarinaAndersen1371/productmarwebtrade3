import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Table, Button } from "react-bootstrap";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { addDecimals } from "../helpers";
import { removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (customerInfo) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  };

  //-------
  const qtyExtra =
    cartItems &&
    cartItems.reduce((acc, item) => acc + +item.extra1 + +item.extra2, 0);
  //-----
  return (
    <>
      <Meta title='My Shopping Cart' />
      <h1>My Shopping Cart</h1>
      {cartItems && cartItems.length === 0 ? (
        <Message variant='info'>
          Shopping Cart is empty <Link to='/'>Go back</Link>
        </Message>
      ) : (
        <ListGroup>
          <ListGroup.Item>
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price/ Item</th>
                  <th>Discount/ Item</th>
                  <th>Warranty/ Item</th>
                  <th>Gift Package</th>
                  {+qtyExtra > 0 && <th>Protection/ Item</th>}
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems &&
                  cartItems.map((item) => (
                    <tr key={item.product}>
                      <td className='orderImage'>
                        <Image src={item.image} alt={item.name} fluid />
                      </td>
                      <td>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>
                      <td>{item.qty}</td>
                      <td>$ {addDecimals(item.price)}</td>
                      <td>
                        {+item.discount > 0 ? (
                          <span>
                            -$ {addDecimals(+item.price * +item.discount)}
                          </span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {+item.warranty > 0 ? (
                          <span>
                            $ {addDecimals(+item.price * +item.warranty)}
                          </span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      <td>
                        {+item.gift > 0 ? (
                          <span>$ 5.00</span>
                        ) : (
                          <i className='fas fa-times'></i>
                        )}
                      </td>
                      {+qtyExtra > 0 && (
                        <td>
                          {+item.extra1 + +item.extra2 > 0 ? (
                            <span>
                              $ {addDecimals(+item.extra1 + +item.extra2)}
                            </span>
                          ) : (
                            <i className='fas fa-times'></i>
                          )}
                        </td>
                      )}
                      <td>
                        $
                        {addDecimals(
                          +item.qty * +item.price -
                            +item.qty * +item.price * +item.discount +
                            +item.qty * +item.price * +item.warranty +
                            +item.gift +
                            +item.qty * +item.extra1 +
                            +item.qty * +item.extra2
                        )}
                      </td>
                      <td>
                        <Button
                          type='button'
                          variant='danger'
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col md={6}></Col>
              <Col md={3}>
                <h5>Items Subtotal:</h5>
              </Col>
              <Col md={3}>
                <h5>
                  ${" "}
                  {cartItems &&
                    addDecimals(
                      cartItems.reduce(
                        (acc, item) =>
                          acc +
                          +item.qty * +item.price -
                          +item.qty * +item.price * +item.discount +
                          +item.qty * +item.price * +item.warranty +
                          +item.gift +
                          +item.qty * +item.extra1 +
                          +item.qty * +item.extra2,
                        0
                      )
                    )}
                </h5>
                <Button
                  type='button'
                  onClick={checkoutHandler}
                  className='btn btn-block my-3'
                >
                  Proceed to Checkout
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      )}
    </>
  );
};

export default CartScreen;
