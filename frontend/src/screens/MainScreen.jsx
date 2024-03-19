import { Outlet } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

const MainScreen = () => {
  return (
    <>
      <MainLayout>
        <main>
          <Outlet />
        </main>
      </MainLayout>
    </>
  );
};

export default MainScreen;
