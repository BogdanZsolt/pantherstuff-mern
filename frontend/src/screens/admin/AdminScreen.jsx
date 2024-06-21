import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../../components/admin/Sidebar.jsx';
import '../../assets/styles/admin-dashboard.css';
import { Outlet } from 'react-router-dom';
const AdminScreen = () => {
  return (
    <Container fluid>
      <Row className="flex-nowrap">
        <Col
          xs={3}
          xxl={2}
          className="bg-secondary d-flex flex-column justify-content-between vh-100"
        >
          <Sidebar />
        </Col>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminScreen;
