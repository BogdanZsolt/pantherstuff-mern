import { Row, Col, Offcanvas } from 'react-bootstrap';
import SideMenu from './admin/SideMenu.jsx';
import NavBar from './admin/NavBar.jsx';
import '../assets/styles/admin-dashboard.css';
import { useState } from 'react';

const AdminLayout = ({ children }) => {
  const [show, setShow] = useState(false);

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
          <SideMenu />
        </Col>
        <Col xs={12} lg={10}>
          {children}
        </Col>
      </Row>
      <Offcanvas
        show={show}
        onHide={handleClose}
        responsive="lg"
        backdrop={false}
        scroll={false}
        style={{ '--bs-offcanvas-bg': 'var(--bs-secondary)' }}
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex d-lg-none">
          <SideMenu />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AdminLayout;
