import { Accordion, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BsSpeedometer2, BsPeople, BsTable } from 'react-icons/bs';

const SideMenu = ({ value, setValue }) => {
  return (
    <Accordion defaultActiveKey={value} className="w-100" flush>
      <Accordion.Item eventKey="products">
        <Accordion.Header onClick={() => setValue('products')}>
          <BsSpeedometer2 />
          Products
        </Accordion.Header>
        <Accordion.Body>
          <Nav.Item>
            <LinkContainer to="/admin/productlist" className="ps-3">
              <Nav.Link>All Products</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="posts">
        <Accordion.Header onClick={() => setValue('posts')}>
          <BsSpeedometer2 />
          Posts
        </Accordion.Header>
        <Accordion.Body>
          <Nav.Item>
            <LinkContainer to="/admin/postlist" className="ps-3">
              <Nav.Link>All Posts</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/admin/postcategorylist" className="ps-3">
              <Nav.Link>Post Categories</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/admin/commentlist" className="ps-3">
              <Nav.Link>Comments</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="users">
        <Accordion.Header onClick={() => setValue('users')}>
          <BsPeople />
          Users
        </Accordion.Header>
        <Accordion.Body>
          <Nav.Item>
            <LinkContainer to="/admin/userlist" className="ps-3">
              <Nav.Link>All Users</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="orders">
        <Accordion.Header onClick={() => setValue('orders')}>
          <BsTable />
          Orders
        </Accordion.Header>
        <Accordion.Body>
          <Nav.Item>
            <LinkContainer to="/admin/orderlist" className="ps-3">
              <Nav.Link>All Orders</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="subscribe">
        <Accordion.Header onClick={() => setValue('subscribe')}>
          <BsTable />
          Subscribe
        </Accordion.Header>
        <Accordion.Body>
          <Nav.Item>
            <LinkContainer to="/admin/subscriberlist" className="ps-3">
              <Nav.Link>Subscribers</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default SideMenu;
