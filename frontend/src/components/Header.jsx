import { useState, useEffect } from 'react';
import {
  Container,
  Navbar,
  Offcanvas,
  Nav,
  NavDropdown,
  Badge,
} from 'react-bootstrap';
import { RiShoppingBagLine, RiUserLine } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Menu from './Menu';
import logo from '../assets/logo-200x200.png';
// import SearchBox from './SearchBox';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [scrollClass, setScrollClass] = useState('');

  const scrollNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 100 ? setScrollClass('scroll-nav') : setScrollClass('');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollNavbar);
    return () => window.removeEventListener('scroll', scrollNavbar);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar
        expand="md"
        className={`mb-3 ps-navbar ${scrollClass}`}
        fixed="top"
      >
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand href="/">
              <img src={logo} alt="PantherStuff" className="logo" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="offcanvas-navbar" />
          <Navbar.Offcanvas
            id="offcanvas-navbar"
            aria-labelledby="offcanvas-navbar-label"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvas-navbar-label">
                {/* <img src={logo} alt="PantherStuff" className="logo" /> */}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Menu />
              <Nav
                className="justify-content-end flex-grow-1 pe-3 right-menu"
                as="ul"
              >
                {/* <SearchBox /> */}
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <RiShoppingBagLine />
                    {cartItems.length > 0 && (
                      <Badge pill bg="success" style={{ marginLeft: '5px' }}>
                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      LogOut
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <RiUserLine />
                      Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="admin-menu">
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
