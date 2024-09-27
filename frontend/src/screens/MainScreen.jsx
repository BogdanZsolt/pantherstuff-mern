import { Outlet } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

const MainScreen = () => {
  return (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  );
};

export default MainScreen;
