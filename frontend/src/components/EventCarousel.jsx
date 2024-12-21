import { Row } from 'react-bootstrap';
import Loader from './Loader.jsx';
import Message from './Message.jsx';
import Event from './Event.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { useGetEventsQuery } from '../slices/eventsApiSlice.js';

const EventCarousel = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useGetEventsQuery({
    sort: '-createdAt',
    startDate_gte: Date(Date.now()),
  });

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
              nextEl: '.swiper-button-event-next',
              prevEl: '.swiper-button-event-prev',
            }}
            spaceBetween={40}
            slidesPerGroup={1}
            breakpoints={{
              481: {
                slidesPerView: 1,
                centeredSlides: true,
              },
              992: {
                slidesPerView: 2,
                centeredSlides: false,
              },
              1440: {
                slidesPerView: 3,
                centeredSlides: false,
              },
            }}
            className="event-swiper"
            style={{ padding: '2rem 2rem 2rem 0' }}
          >
            {events.data.map((event) => (
              <SwiperSlide key={event._id}>
                <Event event={event} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="carousel-nav">
            <div className="swiper-button-event-prev">
              <RiArrowLeftLine />
            </div>
            <div className="swiper-button-event-next">
              <RiArrowRightLine />
            </div>
          </div>
        </Row>
      )}
    </>
  );
};

export default EventCarousel;
