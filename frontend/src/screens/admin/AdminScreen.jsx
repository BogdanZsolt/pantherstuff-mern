import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../../components/admin/Sidebar.jsx';
import '../../assets/styles/admin-dashboard.css';
import { Outlet, Navigate } from 'react-router-dom';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message.jsx';
import { useCheckIsAdminQuery } from '../../slices/usersApiSlice.js';

const AdminScreen = () => {
  const { data, isLoading, error } = useCheckIsAdminQuery();

  return (
    <Container fluid>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message></Message>
      ) : data?.isAdmin ? (
        <>
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
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </Container>
  );
};

export default AdminScreen;
