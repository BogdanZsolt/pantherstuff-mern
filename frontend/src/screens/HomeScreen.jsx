import { Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import ProductCarousel from '../components/ProductCarousel.jsx';
import SupplyCarousel from '../components/SupplyCarousel.jsx';
import PhotoGallery from '../components/PhotoGallery.jsx';
import SubscribeForm from '../components/SubscribeForm.jsx';
import CourseCarousel from '../components/CourseCarousel.jsx';
import EventCarousel from '../components/EventCarousel.jsx';
import LatestPostsCarousel from '../components/LatestPostsCarousel.jsx';
import { Trans, useTranslation } from 'react-i18next';
import MembershipCarousel from '../components/MembershipCarousel.jsx';

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
          <h3 className="text-secondary mt-5">{t('products')}</h3>
        </Link>
        <ProductCarousel />
        <Link to="/supplystore">
          <h3 className="text-secondary mt-5">{t('supplies')}</h3>
        </Link>
        <SupplyCarousel />
        <Link to="/membership">
          <h3 className="text-secondary mt-5">{t('membership')}</h3>
        </Link>
        <MembershipCarousel />
        <Link to="/onlinecourses">
          <h3 className="text-secondary mt-5">{t('onlineCourses')}</h3>
        </Link>
        <CourseCarousel />
        <Link to="/event">
          <h3 className="text-secondary mt-5">{t('retreats&workshops')}</h3>
        </Link>
        <EventCarousel />
        <h3 className="text-secondary mt-5">
          <Trans
            i18nKey={t('latestPosts')}
            components={{ 1: <Link to={'blog'} /> }}
          />
        </h3>
        <LatestPostsCarousel />
        <SubscribeForm />
        <PhotoGallery />
      </Container>
    </>
  );
};

export default HomeScreens;
