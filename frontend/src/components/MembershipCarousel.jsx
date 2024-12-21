import { Button, Card, CardGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toCurrency, uuid } from '../utils/converter';
import { addToCart } from '../slices/cartSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { useGetPlansQuery } from '../slices/plansApiSlice';

const MembershipCarousel = () => {
  const { i18n, t } = useTranslation(['knowledge']);
  const {
    data: plans,
    isLoading,
    error,
  } = useGetPlansQuery({ sort: 'createdAt' });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCartHandler = (plan) => {
    const { _id, name, currentPrice, recommended, thumbnail, toBeDelivered } =
      plan;
    const cartId = uuid();
    const name_hu = plan.translations.hu.name || name;
    const currentPrice_hu = plan.translations.hu.currentPrice || currentPrice;
    const qty = 1;
    const type = 'membership';
    if (currentPrice === 0) {
      return navigate('/register');
    }
    console.log(_id);
    dispatch(
      addToCart({
        cartId,
        _id,
        type,
        name,
        name_hu,
        thumbnail,
        currentPrice,
        currentPrice_hu,
        recommended,
        qty,
        toBeDelivered,
      })
    );
    // return navigate('/cart');
  };

  console.log(plans);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <CardGroup
          className="position-relative text-center"
          style={{ gap: '1rem' }}
        >
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-button-plan-next',
              prevEl: '.swiper-button-plan-prev',
            }}
            spaceBetween={30}
            slidesPerGroup={1}
            breakpoints={{
              481: {
                slidesPerView: 1,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 2,
                centeredSlides: false,
              },
              1200: {
                slidesPerView: 3,
                centeredSlides: false,
              },
            }}
            className="plans-swiper p-3"
          >
            {plans.data.map((plan) => (
              <SwiperSlide key={plan._id}>
                <Card
                  className="rounded-3 shadow card-glass-container"
                  style={
                    plan.recommended
                      ? {
                          border: '5px solid rgba(var(--bs-success-rgb), 0.4)',
                          '--bs-card-height': '100%',
                        }
                      : { '--bs-card-height': '100%' }
                  }
                >
                  <Card.Header
                    as="div"
                    className="py-3 my-0 fw-normal card-glass"
                    style={
                      plan.recommended
                        ? {
                            '--glass-bg': 'var(--bs-success-rgb)',
                          }
                        : {}
                    }
                  >
                    <h4 className="m-0">
                      {i18n.language === 'en'
                        ? plan.name
                        : plan.translations.hu.name || plan.name}
                    </h4>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title as="h3" className="pricing-card-title">
                      <Trans
                        values={{
                          price: toCurrency(
                            i18n.language,
                            i18n.language === 'en'
                              ? plan.currentPrice
                              : plan.translations?.hu?.currentPrice ||
                                  plan.currentPrice
                          ),
                          unit: t(plan.timeLimitMeasure),
                        }}
                        components={{ 1: <small /> }}
                      >
                        {t('price')}
                      </Trans>
                    </Card.Title>
                    <Card.Text as="div">
                      <ul className="list-unstyled mt-3 mb-4">
                        {plan.features.map((feature, i) => (
                          <li key={i}>
                            {i18n.language === 'en'
                              ? feature
                              : plan.translations.hu.features[i]}
                          </li>
                        ))}
                      </ul>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer
                    style={
                      plan.recommended
                        ? {
                            backgroundColor: 'rgba(var(--bs-success-rgb), 0.2)',
                          }
                        : {}
                    }
                    className="card-glass"
                  >
                    <div className="card-overlay"></div>
                    <Button
                      className={`btn btn-lasaphire ${
                        plan.recommended && 'btn-success'
                      }`}
                      onClick={() => addToCartHandler(plan)}
                    >
                      {plan.currentPrice === 0 ? t('register') : t('addToCart')}
                    </Button>
                  </Card.Footer>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="carousel-nav">
            <div className="swiper-button-plan-prev">
              <RiArrowLeftLine />
            </div>
            <div className="swiper-button-plan-next">
              <RiArrowRightLine />
            </div>
          </div>
        </CardGroup>
      )}
    </>
  );
};

export default MembershipCarousel;
