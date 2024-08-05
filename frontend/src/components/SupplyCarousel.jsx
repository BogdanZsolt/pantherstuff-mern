import { Row } from 'react-bootstrap';
import Loader from './Loader.jsx';
import Message from './Message.jsx';
import Supply from './Supply.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { useGetSuppliesQuery } from '../slices/suppliesApiSlice.js';

const SupplyCarousel = () => {
  const {
    data: supplies,
    isLoading,
    error,
  } = useGetSuppliesQuery({ sort: '-createdAt' });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row className="position-relative mx-4 mx-md-0">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-button-supply-next',
              prevEl: '.swiper-button-supply-prev',
            }}
            spaceBetween={30}
            breakpoints={{
              481: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                centeredSlides: false,
              },
              640: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                centeredSlides: false,
              },
              992: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                centeredSlides: false,
              },
              1200: {
                slidesPerView: 4,
                slidesPerGroup: 1,
                centeredSlides: false,
              },
            }}
          >
            {supplies.data.map((supply) => (
              <SwiperSlide key={supply._id}>
                <Supply supply={supply} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="carousel-nav">
            <div className="swiper-button-supply-prev">
              <RiArrowLeftLine />
            </div>
            <div className="swiper-button-supply-next">
              <RiArrowRightLine />
            </div>
          </div>
        </Row>
      )}
    </>
  );
};

export default SupplyCarousel;
