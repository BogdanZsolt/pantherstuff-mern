import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { userAuth } = useSelector((state) => state.auth);

  console.log(userAuth);

  return (
    userAuth &&
    (userAuth.isAdmin ? <Outlet /> : <Navigate to="/login" replace />)
  );
};

export default AdminRoute;
