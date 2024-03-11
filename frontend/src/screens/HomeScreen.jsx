import { Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../components/MainLayout.jsx';
import Hero from '../components/Hero.jsx';
import PhotoGallery from '../components/PhotoGallery.jsx';
import ProductCarousel from '../components/ProductCarousel.jsx';

const HomeScreens = () => {
  const { keyword } = useParams();

  return (
    <>
      {keyword && (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}

      <MainLayout>
        <Hero />
        <Container className="my-4">
          <h1>Latest Products</h1>
          <ProductCarousel />
          <PhotoGallery />
        </Container>
      </MainLayout>
    </>
  );
};

export default HomeScreens;
