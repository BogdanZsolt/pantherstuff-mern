import { Row } from 'react-bootstrap';
import { useGetCoursesQuery } from '../slices/coursesApiSlice.js';
import Loader from './Loader.jsx';
import Message from './Message.jsx';
import Course from './Course.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { isLoggedUserOwner } from '../utils/ownnerUser.js';
import { useSelector } from 'react-redux';

const CourseCarousel = () => {
  const { userAuth } = useSelector((state) => state.auth);

  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useGetCoursesQuery({ sort: '-rating,-createdAt' });

  if (courses) {
    console.log(courses);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row className="position-relative mx-4 mx-md-0">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-button-course-next',
              prevEl: '.swiper-button-course-prev',
            }}
            spaceBetween={40}
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
              1280: {
                slidesPerView: 3,
                centeredSlides: false,
              },
            }}
            className="course-swiper"
            // style={{ padding: '2rem 2rem 2rem 0' }}
          >
            {courses.data.map((course) => (
              <SwiperSlide key={course._id}>
                <Course
                  course={course}
                  purchased={isLoggedUserOwner(userAuth?._id, course)}
                  date={course.students[0]?.purchasedAt}
                  orderId={course.students[0]?.order}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="carousel-nav">
            <div className="swiper-button-course-prev">
              <RiArrowLeftLine />
            </div>
            <div className="swiper-button-course-next">
              <RiArrowRightLine />
            </div>
          </div>
        </Row>
      )}
    </>
  );
};

export default CourseCarousel;
