import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectRoute = () => {
  const { userAuth } = useSelector((state) => state.auth);

  console.log(userAuth?.isAuthenticated);

  return userAuth?.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectRoute;
