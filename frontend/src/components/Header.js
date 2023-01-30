import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import HeaderSmall from "./HeaderSmall";
import { logout } from "../actions/customerActions";

const Header = () => {
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <span className='headerLarge'>
        <Navbar style={{ background: "palevioletred", padding: "30px" }}>
          <Container>
            <Navbar.Brand as={Link} to='/'>
              <span className='lavender'>MarWebTradeCenter</span>
            </Navbar.Brand>
            <Nav.Link as={Link} to='/info' className='lavender infoSmall'>
              Info
            </Nav.Link>
            <Nav.Link as={Link} to='/contact' className='lavender'>
              Contact
            </Nav.Link>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <span>
                <SearchBox />
              </span>
              <Nav className='ml-auto'>
                {customerInfo ? (
                  <>
                    <Nav.Link as={Link} to='/cart'>
                      <i className='fas fa-cart-plus'></i>
                      <span className='lavender'>My Cart</span>
                    </Nav.Link>
                    <NavDropdown
                      title={
                        <span className='lavender'>
                          {customerInfo.firstName}
                        </span>
                      }
                      id='customername'
                    >
                      <NavDropdown.Item as='div'>
                        <Nav.Link
                          as={Link}
                          to='/profile'
                          className='palevioletred'
                        >
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
                      <i className='fa fa-user-plus'></i>{" "}
                      <span className='lavender'>Register</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to='/login'>
                      <i className='fa fa-key'></i>{" "}
                      <span className='lavender'>Sign In</span>
                    </Nav.Link>
                  </>
                )}
                {customerInfo && customerInfo.isAdmin && (
                  <NavDropdown
                    title={<span className='lavender'> Admin </span>}
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
                    title={<span className='lavender'> Manager </span>}
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
                    title={<span className='lavender'> Franchise </span>}
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
                    title={<span className='lavender'>Support </span>}
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
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </span>
      <span className='headerSmall'>
        <HeaderSmall />
      </span>
    </header>
  );
};

export default Header;
