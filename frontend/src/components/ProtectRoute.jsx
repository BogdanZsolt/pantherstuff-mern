import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectRoute = () => {
  const { userAuth } = useSelector((state) => state.auth);

  return (
    userAuth &&
    (userAuth.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />)
  );
};

export default ProtectRoute;
