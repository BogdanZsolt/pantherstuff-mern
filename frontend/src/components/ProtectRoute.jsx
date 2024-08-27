import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectRoute = () => {
  const { userAuth } = useSelector((state) => state.auth);

  return userAuth?.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectRoute;
