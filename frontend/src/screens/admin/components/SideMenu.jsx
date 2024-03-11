import { Nav } from 'react-bootstrap';
import { BsSpeedometer2, BsPeople, BsTable } from 'react-icons/bs';

const SideMenu = () => {
  return (
    <Nav className="flex-column pt-5">
      <Nav.Item>
        <Nav.Link
          href="/admin/productlist"
          className="d-flex align-items-center gap-1"
        >
          <BsSpeedometer2 className="fs-5" />
          Products
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/admin/postlist"
          className="d-flex align-items-center gap-1"
        >
          <BsSpeedometer2 />
          Posts
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/admin/userlist"
          className="d-flex align-items-center gap-1"
        >
          <BsPeople />
          Users
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="/admin/orderlist"
          className="d-flex align-items-center gap-1"
        >
          <BsTable />
          Orders
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default SideMenu;
