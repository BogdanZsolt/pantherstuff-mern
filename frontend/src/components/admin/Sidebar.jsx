import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Collapse,
  Container,
  Dropdown,
  Nav,
  Navbar,
  Image,
} from 'react-bootstrap';
import logo from '../../assets/logo-200x200.png';
import { RiArticleLine, RiQuestionAnswerLine } from 'react-icons/ri';
import {
  BsSpeedometer2,
  BsPeople,
  BsTable,
  BsEnvelopePlus,
  BsBook,
} from 'react-icons/bs';
import { AiOutlineProduct } from 'react-icons/ai';
import { RxComponent1 } from 'react-icons/rx';
import { MdEvent } from 'react-icons/md';
import { logout } from '../../slices/authSlice';
import { useLogoutMutation } from '../../slices/usersApiSlice';

const Sidebar = () => {
  const { userAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState('products');

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
      <div className="mt-2 sidebar">
        <Container className="my-3" style={{ minHeight: '2rem' }}>
          <Navbar.Brand href="/" className="bg-primary">
            <Image src={logo} style={{ width: '3.5rem' }} />
          </Navbar.Brand>
        </Container>
        <hr className="text-primary d-none d-sm-block" />
        <Nav className="nav nav-pills flex-column">
          {/* Info */}
          <Nav.Item className="my-1">
            <Link
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen('dashboard')}
            >
              <BsSpeedometer2 className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">
                Dashboard
              </span>
            </Link>
          </Nav.Item>

          {/* Products */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen(open === 'products' ? '' : 'products')}
              aria-controls="products-collapse"
              aria-expanded={open}
              title="Products"
            >
              <AiOutlineProduct className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">
                Products
              </span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'products'}>
                <Nav id="products-collapse" className="flex-nowrap flex-column">
                  <Nav.Item className="ms-4 p-2">
                    <Link to="/admin/productlist" className="text-primary my-2">
                      <span>All Products</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      to="/admin/productcategorylist"
                      className="text-primary my-2"
                    >
                      <span>Product Categories</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      to="/admin/productcollectionlist"
                      className="text-primary my-2"
                    >
                      <span>Product Collections</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      to="/admin/productsizelist"
                      className="text-primary my-2"
                    >
                      <span>Product Sizes</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'products'}>
                <Dropdown.Item>
                  <Link to="/admin/productlist">
                    <span>All Products</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/admin/productcategorylist">
                    <span>
                      <span>Product Categories</span>
                    </span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/admin/productcollectionlist">
                    <span>Product Collections</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/admin/productsizelist">
                    <span>Product Sizes</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* Supplies */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen(open === 'supplies' ? '' : 'supplies')}
              aria-controls="supplies-collapse"
              aria-expanded={open}
              title="Supplies"
            >
              <RxComponent1 className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">
                Supplies
              </span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'supplies'}>
                <Nav id="supplies-collapse" className="flex-nowrap flex-column">
                  <Nav.Item className="ms-4 p-2">
                    <Link to="/admin/supplylist" className="text-primary my-2">
                      <span>All Supplies</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      to="/admin/supplycategorylist"
                      className="text-primary my-2"
                    >
                      <span>Supply Categories</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      to="/admin/supplysizelist"
                      className="text-primary my-2"
                    >
                      <span>Supply Sizes</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'supplies'}>
                <Dropdown.Item>
                  <Link to="/admin/supplylist">
                    <span>All Supplies</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/admin/supplycategorylist">
                    <span>
                      <span>Supply Categories</span>
                    </span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/admin/supplysizelist">
                    <span>Supply Sizes</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* Posts */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen(open === 'posts' ? '' : 'posts')}
              aria-controls="posts-collapse"
              aria-expanded={open}
              title="Posts"
            >
              <RiArticleLine className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">Posts</span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'posts'}>
                <Nav id="posts-collapse" className="flex-nowrap flex-column">
                  <Nav.Item className="ms-4 p-2">
                    <Link className="text-primary my-2" to="/admin/postlist">
                      <span>All Posts</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      className="text-primary my-2"
                      to="/admin/postcategorylist"
                    >
                      <span>Post Categories</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="ms-4 p-2">
                    <Link className="text-primary my-2" to="/admin/commentlist">
                      <span>Comments</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'posts'}>
                <Dropdown.Item>
                  <Link to="/admin/postlist">
                    <span>All Posts</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/admin/postcategorylist">
                    <span>
                      <span>Post Categories</span>
                    </span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/admin/commentlist">
                    <span>
                      <span>Comments</span>
                    </span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* FAQs */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen(open === 'faqs' ? '' : 'faqs')}
              aria-controls="users-collapse"
              aria-expanded={open}
            >
              <RiQuestionAnswerLine className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">Faqs</span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'faqs'}>
                <Nav id="users-collapse" className="flex-nowrap flex-column">
                  <Nav.Item className="ms-4 p-2">
                    <Link className="text-primary my-2" to="/admin/faqlist">
                      <span>All Faqs</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      className="text-primary my-2"
                      to="/admin/faqcategorylist"
                    >
                      <span>Faq Categories</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'faqs'}>
                <Dropdown.Item>
                  <Link to="/admin/faqlist">
                    <span>All Faqs</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/admin/faqcategorylist">
                    <span>Faq Categories</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* Users */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen(open === 'users' ? '' : 'users')}
              aria-controls="users-collapse"
              aria-expanded={open}
            >
              <BsPeople className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">Users</span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'users'}>
                <Nav id="users-collapse" className="flex-nowrap flex-column">
                  <Nav.Item className="ms-4 p-2">
                    <Link className="text-primary my-2" to="/admin/userlist">
                      <span>All users</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'users'}>
                <Dropdown.Item>
                  <Link to="/admin/userlist">
                    <span>All users</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
            <div className="d-none d-md-block">
              <Collapse in={open === 'users'}>
                <Nav id="users-collapse" className="flex-nowrap flex-column">
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      className="text-primary my-2"
                      to="/admin/membershipplan"
                    >
                      <span>membership plans</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'users'}>
                <Dropdown.Item>
                  <Link to="/admin/membershipplan">
                    <span>membership plans</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* Events */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen(open === 'events' ? '' : 'events')}
              aria-controls="events-collapse"
              aria-expanded={open}
            >
              <MdEvent className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">Events</span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'events'}>
                <Nav id="events-collapse" className="flex-nowrap flex-column">
                  <Nav.Item className="ms-4 p-2">
                    <Link className="text-primary my-2" to="/admin/eventlist">
                      <span>All events</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      className="text-primary my-2"
                      to="/admin/eventcategorylist"
                    >
                      <span>Event Categories</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="ms-4 p-2">
                    <Link className="text-primary my-2" to="/admin/bookinglist">
                      <span>Booking List</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'events'}>
                <Dropdown.Item>
                  <Link to="/admin/eventlist">
                    <span>All events</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/admin/eventcategorylist">
                    <span>Event Categories</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/admin/bookinglist">
                    <span>Booking List</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* Courses */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen(open === 'courses' ? '' : 'courses')}
              aria-controls="courses-collapse"
              aria-expanded={open}
            >
              <BsBook className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">Courses</span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'courses'}>
                <Nav id="courses-collapse" className="flex-nowrap flex-column">
                  <Nav.Item className="ms-4 p-2">
                    <Link className="text-primary my-2" to="/admin/courselist">
                      <span>All courses</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      className="text-primary my-2"
                      to="/admin/coursecategorylist"
                    >
                      <span>Course Categories</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'courses'}>
                <Dropdown.Item>
                  <Link to="/admin/courselist">
                    <span>All courses</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/admin/coursecategorylist">
                    <span>Course Categories</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* Orders */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen(open === 'orders' ? '' : 'orders')}
              aria-controls="orders-collapse"
              aria-expanded={open}
            >
              <BsTable className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">Orders</span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'orders'}>
                <Nav id="orders-collapse" className="flex-nowrap flex-column">
                  <Nav.Item className="ms-4 p-2">
                    <Link className="text-primary my-2" to="/admin/orderlist">
                      <span>All orders</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'orders'}>
                <Dropdown.Item>
                  <Link to="/admin/orderlist">
                    <span>All orders</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* Messages */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() => setOpen(open === 'messages' ? '' : 'messages')}
              aria-controls="messages-collapse"
              aria-expanded={open}
            >
              <BsTable className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">
                Messages
              </span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'messages'}>
                <Nav id="messages-collapse" className="flex-nowrap flex-column">
                  <Nav.Item className="ms-4 p-2">
                    <Link className="text-primary my-2" to="/admin/messagelist">
                      <span>All messages</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'messages'}>
                <Dropdown.Item>
                  <Link to="/admin/messagelist">
                    <span>All messages</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>

          {/* Subscribers */}
          <Nav.Item>
            <Dropdown.Toggle
              className="nav-link d-flex align-items-center text-primary"
              onClick={() =>
                setOpen(open === 'subscribers' ? '' : 'subscribers')
              }
              aria-controls="subscribers-collapse"
              aria-expanded={open}
            >
              <BsEnvelopePlus className="fs-4" />
              <span className="ms-2 fs-4 d-none d-md-inline-flex">
                Subscribers
              </span>
            </Dropdown.Toggle>
            <div className="d-none d-md-block">
              <Collapse in={open === 'subscribers'}>
                <Nav
                  id="subscribers-collapse"
                  className="flex-nowrap flex-column"
                >
                  <Nav.Item className="ms-4 p-2">
                    <Link
                      className="text-primary my-2"
                      to="/admin/subscriberlist"
                    >
                      <span>All subscribers</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Collapse>
            </div>
            <div className="d-block d-md-none dropdown-menu__container">
              <Dropdown.Menu show={open === 'subscribers'}>
                <Dropdown.Item>
                  <Link to="/admin/subscriberlist">
                    <span>All subscribers</span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </div>
          </Nav.Item>
        </Nav>
      </div>

      <Dropdown className="mb-3">
        <Dropdown.Toggle
          className="btn border-none d-flex align-items-center"
          variant="primary"
          id="triggerId"
        >
          <BsPeople className="fs-4" />
          <span className="fs-4 ms-3 d-none d-md-inline">{userAuth?.name}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <LinkContainer to="/admin">
            <Dropdown.Item>Admin Dashboard</Dropdown.Item>
          </LinkContainer>
          <LinkContainer to="/profile">
            <Dropdown.Item>Profile</Dropdown.Item>
          </LinkContainer>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logoutHandler}>LogOut</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Sidebar;
