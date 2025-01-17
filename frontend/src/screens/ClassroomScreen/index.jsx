import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import Banner from '../../components/Banner';
import Meta from '../../components/Meta.jsx';
import Loader from '../../components/Loader';
import Message from '../../components/Message.jsx';
import { convertSecondstoTime } from '../../utils/converter.js';
import { FaPlay } from 'react-icons/fa6';
import { CiText } from 'react-icons/ci';
import VideoPlayer from '../../components/VideoPlayer.jsx';
import { useGetUserCourseProgressQuery } from '../../slices/coursesApiSlice.js';

// https://www.youtube.com/watch?v=OkKbAuQXFcM&t=1083s 6h46 11h:06 4h:22 4h:31

const ClassroomScreen = () => {
  const { courseId } = useParams();
  const { t, i18n } = useTranslation(['course']);

  const [currentLesson, setCurrentLesson] = useState(null);

  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useGetUserCourseProgressQuery({ courseId });

  useEffect(() => {
    if (course) {
      setCurrentLesson(course.lessonProgress[0]);
    }
  }, [course]);

  if (course) {
    console.log(course);
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
        course && (
          <>
            <Banner
              src="/images/ecoprint-03-1280x360.webp"
              title={t('classroom')}
            />
            <Meta
              title={`${t('classroom')} | ${
                i18n.language === 'en'
                  ? course.course.title
                  : course.course.translations?.hu?.title || course.course.title
              }`}
            />
            <Container>
              <h2 className="text-center mt-3 mb-0">
                {18n.language === 'en'
                  ? course.course.title
                  : course.course.translations?.hu?.title ||
                    course.course.title}
              </h2>
              <Link
                to={`/onlinecourses/category/${course.course.category?.id}`}
              >
                <p className="text-center">
                  {i18n.language === 'en'
                    ? course.course.category.title
                    : course.course.category.translations?.hu?.title ||
                      course.course.category.title}
                </p>
              </Link>
              <Row>
                <Col lg={8}>
                  <VideoPlayer
                    url="https://youtu.be/VFYmBm2NkZ0?si=Z81Yy5Q4APD7gy6g"
                    width="100%"
                    height="468px"
                  />
                </Col>
                <Col lg={4}>
                  <h3 className="text-center">{t('curriculum')}</h3>
                  {course.lessonProgress &&
                    course.lessonProgress?.map((item, idx) => (
                      <div
                        key={idx}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <h4>
                          {i18n.language === 'en'
                            ? item.lesson.title
                            : item.lesson.translations?.hu?.title}
                        </h4>
                        <button className="btn btn-secondary p-0">
                          {item.lessonType === 'Video' ? (
                            <FaPlay />
                          ) : (
                            <CiText />
                          )}
                        </button>
                        <div>{convertSecondstoTime(item.lesson?.duration)}</div>
                      </div>
                    ))}
                </Col>
              </Row>
            </Container>
          </>
        )
      )}
    </>
  );
};

export default ClassroomScreen;
