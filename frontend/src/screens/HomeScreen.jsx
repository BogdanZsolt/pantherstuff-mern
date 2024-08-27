import { Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import ProductCarousel from '../components/ProductCarousel.jsx';
import SupplyCarousel from '../components/SupplyCarousel.jsx';
import PhotoGallery from '../components/PhotoGallery.jsx';
import SubscribeForm from '../components/SubscribeForm.jsx';
import MembershipTable from '../components/MembershipTable.jsx';
import LatestPosts from '../components/LatestPosts.jsx';
import { useTranslation } from 'react-i18next';

const HomeScreens = () => {
  const { keyword } = useParams();
  const { t } = useTranslation(['home']);

  return (
    <>
      {keyword && (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}

      <Hero />
      <Container className="my-4">
        <h2 className="mt-5 fw-bolder">{t('dearVisitorsAndCuriousOnes')}</h2>
        <p className="lead">{t('weWouldLikeToHaveSomePatience')}</p>
        <Link to="/shop">
          <h3 className="text-secondary fs-1 mt-5">{t('products')}</h3>
        </Link>
        <ProductCarousel />
        <Link to="/supplystore">
          <h3 className="text-secondary fs-1 mt-5">{t('supplies')}</h3>
        </Link>
        <SupplyCarousel />
        <Link to="/membership">
          <h3 className="text-secondary fs-1 mt-5">{t('membership')}</h3>
        </Link>
        <MembershipTable />
        <LatestPosts />
        <SubscribeForm />
        <PhotoGallery />
      </Container>
    </>
  );
};

export default HomeScreens;
