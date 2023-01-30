import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { Nav, NavDropdown, Modal, Button } from "react-bootstrap";
import { logout } from "../actions/customerActions";

const HeaderSmall = () => {
  // const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  function handleShow() {
    setShow(true);
  }

  return (
    <div className='headerMenu'>
      <NavLink to='/' className='menuBrand'>
        MarWebTradeCenter
      </NavLink>
      <Button onClick={() => handleShow()}>
        <i className='fas fa-bars'></i>
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Nav>
            {customerInfo ? (
              <>
                <Nav.Link as={Link} to='/cart'>
                  <i className='fas fa-cart-plus palevioletred'></i>
                  <span className='palevioletred'>My Cart</span>
                </Nav.Link>
                <NavDropdown
                  title={
                    <span className='palevioletred'>
                      {customerInfo.firstName}
                    </span>
                  }
                  id='customername'
                >
                  <NavDropdown.Item as='div'>
                    <Nav.Link as={Link} to='/profile' className='palevioletred'>
                      <span className='palevioletred'>Profile</span>
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item as='div'>
                    <Nav.Link as={Link} to='/myorders'>
                      <span className='palevioletred'>Orders&Returns</span>
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item as='div'>
                    <Nav.Link as={Link} to='/support'>
                      <span className='palevioletred'>Help&Support</span>
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <strong className='ml-2 palevioletred'>Logout</strong>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to='/register'>
                  <i className='fa fa-user-plus palevioletred'></i>{" "}
                  <span className='palevioletred'>Register</span>
                </Nav.Link>
                <Nav.Link as={Link} to='/login'>
                  <i className='fa fa-key palevioletred'></i>{" "}
                  <span className='palevioletred'>Sign In</span>
                </Nav.Link>
              </>
            )}
            {customerInfo && customerInfo.isAdmin && (
              <NavDropdown
                title={<span className='palevioletred'> Admin </span>}
                id='admin'
              >
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/admin/customerlist'>
                    <span className='palevioletred'>Customers</span>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/admin/ticketlist'>
                    <span className='palevioletred'>Tickets</span>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/admin/orderlist'>
                    <span className='palevioletred'>Orders</span>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/admin/productlist'>
                    <span className='palevioletred'>Products</span>
                  </Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {customerInfo && customerInfo.isManager && (
              <NavDropdown
                title={<span className='palevioletred'> Manager </span>}
                id='manager'
              >
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/manager/customerlist'>
                    <span className='palevioletred'>Customers</span>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/manager/primelist'>
                    <span className='palevioletred'>Premium</span>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/manager/franchiselist'>
                    <span className='palevioletred'>Franchise</span>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/manager/ticketlist'>
                    <span className='palevioletred'>Tickets</span>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/manager/orderlist'>
                    <span className='palevioletred'>Orders</span>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/manager/returnlist'>
                    <span className='palevioletred'>Returns</span>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/manager/invoicelist'>
                    <span className='palevioletred'>Invoices</span>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/manager/deliverylist'>
                    <span className='palevioletred'>Logistics</span>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/manager/devicelist'>
                    <span className='palevioletred'>Devices</span>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/manager/voucherlist'>
                    <span className='palevioletred'>Vouchers</span>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/manager/productlist'>
                    <span className='palevioletred'>Products</span>
                  </Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {customerInfo && customerInfo.isFranchise && (
              <NavDropdown
                title={<span className='palevioletred'> Franchise </span>}
                id='franchise'
              >
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/franchise/info'>
                    <span className='palevioletred'>Info</span>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/franchise/productlist'>
                    <span className='palevioletred'>Products</span>
                  </Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {customerInfo && customerInfo.isSupport && (
              <NavDropdown
                title={<span className='palevioletred'>Support </span>}
                id='support'
              >
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/support/orderlist'>
                    <span className='palevioletred'>Orders</span>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/support/deliverylist'>
                    <span className='palevioletred'>Logistics</span>
                  </Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item as='div'>
                  <Nav.Link as={Link} to='/support/ticketlist'>
                    <span className='palevioletred'>Tickets</span>
                  </Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HeaderSmall;
