import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Image,
  Button,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo-200x200.png';
import { useLogoutMutation } from '../../../slices/usersApiSlice';
import { RiUserLine } from 'react-icons/ri';
import { logout } from '../../../slices/authSlice';

const NavBar = ({ show }) => {
  const { userInfo } = useSelector((state) => state.auth);
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
    <Navbar className="bg-secondary">
      <Container fluid>
        <Navbar.Brand href="/" className="bg-primary">
          <Image src={logo} style={{ width: '3.5rem' }} />
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="admin-nav-dropdown">
                {userInfo.isAdmin && (
                  <LinkContainer to="/admin">
                    <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
                  </LinkContainer>
                )}
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
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
            <Nav.Item className="d-block d-lg-none">
              <Button variant="primary" onClick={show}>
                Toggle static offcanvas
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
