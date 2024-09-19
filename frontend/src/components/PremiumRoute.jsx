import { Outlet, Navigate } from 'react-router-dom';
import Loader from './Loader';
import Message from './Message.jsx';
import { useCheckIsPremiumQuery } from '../slices/usersApiSlice.js';

const PremiumRoute = () => {
  const { data, isLoading, error } = useCheckIsPremiumQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.Message || error.error}
        </Message>
      ) : data?.isPremium ? (
        <Outlet />
      ) : (
        <Navigate to="/membership" replace />
      )}
    </>
  );
};

export default PremiumRoute;
