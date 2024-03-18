import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Row, Col, Offcanvas } from 'react-bootstrap';
import SideMenu from '../../components/admin/SideMenu.jsx';
import NavBar from '../../components/admin/NavBar.jsx';
import '../../assets/styles/admin-dashboard.css';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/admin/Sidebar.jsx';

const AdminScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState('products');

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  return userInfo && userInfo.isAdmin ? (
    <>
      <Row>
        <NavBar show={handleOpen} />
      </Row>
      <Row>
        <Col lg={2}>
          <Sidebar>
            <SideMenu value={active} setValue={setActive} />
          </Sidebar>
        </Col>
        <Col xs={12} lg={10}>
          <Outlet />
        </Col>
      </Row>
      <Offcanvas
        show={show}
        onHide={handleClose}
        responsive="lg"
        backdrop={false}
        scroll={false}
        className="admin-menu-canvas"
        style={{ '--bs-offcanvas-bg': 'var(--bs-secondary)' }}
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex d-lg-none">
          <SideMenu value={active} setValue={setActive} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminScreen;
