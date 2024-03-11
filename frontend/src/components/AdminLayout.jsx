import { Row, Col, Offcanvas } from 'react-bootstrap';
import Sidebar from '../screens/admin/components/Sidebar.jsx';
import SideMenu from '../screens/admin/components/SideMenu.jsx';
import NavBar from '../screens/admin/components/NavBar.jsx';
import '../assets/styles/admin-dashboard.css';
import { useState } from 'react';

const AdminLayout = ({ children }) => {
  const [show, setShow] = useState(true);

  console.log(show);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  return (
    <>
      <Row>
        <NavBar show={handleOpen} />
      </Row>
      <Row>
        <Col lg={2}>
          <Sidebar>
            <SideMenu />
          </Sidebar>
        </Col>
        <Col xs={12} lg={10}>
          {children}
        </Col>
      </Row>
      <Offcanvas
        show={show}
        onHide={handleClose}
        responsive="lg"
        className="bg-secondary"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SideMenu />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AdminLayout;
