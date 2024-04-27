import { Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import ProductCarousel from '../components/ProductCarousel.jsx';
import PhotoGallery from '../components/PhotoGallery.jsx';
import SubscribeForm from '../components/SubscribeForm.jsx';
import LatestPosts from '../components/LatestPosts.jsx';

const HomeScreens = () => {
  const { keyword } = useParams();

  return (
    <>
      {keyword && (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}

      <Hero />
      <Container className="my-4">
        <h1>Latest Products</h1>
        <ProductCarousel />
        <LatestPosts />
        <SubscribeForm />
        <PhotoGallery />
      </Container>
    </>
  );
};

export default HomeScreens;
