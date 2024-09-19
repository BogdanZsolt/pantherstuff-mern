import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from '../../components/admin/Sidebar.jsx';
import '../../assets/styles/admin-dashboard.css';
import { Outlet, Navigate } from 'react-router-dom';

const AdminScreen = () => {
  const { userAuth } = useSelector((state) => state.auth);

  console.log(userAuth);

  return (
    <Container fluid>
      {userAuth &&
        (userAuth?.isAdmin ? (
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
        ))}
    </Container>
  );
};

export default AdminScreen;
