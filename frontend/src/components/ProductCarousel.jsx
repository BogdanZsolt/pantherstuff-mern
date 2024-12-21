import { Row } from 'react-bootstrap';
import Loader from './Loader.jsx';
import Message from './Message.jsx';
import Product from './Product.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { useGetProductsQuery } from '../slices/productsApiSlice.js';

const ProductCarousel = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({ sort: '-createdAt' });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row className="position-relative mx-5 mx-lg-0">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            spaceBetween={30}
            breakpoints={{
              481: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                centeredSlides: false,
              },
              768: {
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
            {products.data.map((product) => (
              <SwiperSlide key={product._id}>
                <Product product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="carousel-nav">
            <div className="swiper-button-prev">
              <RiArrowLeftLine />
            </div>
            <div className="swiper-button-next">
              <RiArrowRightLine />
            </div>
          </div>
        </Row>
      )}
    </>
  );
};

export default ProductCarousel;
