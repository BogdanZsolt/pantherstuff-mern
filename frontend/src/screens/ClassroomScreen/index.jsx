import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Col, Collapse, Container, Row } from 'react-bootstrap';
import Banner from '../../components/Banner';
import Meta from '../../components/Meta.jsx';
import Loader from '../../components/Loader';
import Message from '../../components/Message.jsx';
// import { convertSecondstoTime } from '../../utils/converter.js';
import { FaPlay } from 'react-icons/fa6';
import { CiText } from 'react-icons/ci';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import VideoPlayer from '../../components/VideoPlayer.jsx';
import { convertSecondstoTime } from '../../utils/converter.js';
import { useGetUserCourseProgressQuery } from '../../slices/coursesApiSlice.js';

// https://www.youtube.com/watch?v=OkKbAuQXFcM&t=1083s 6h46 11h:06 4h:22 4h:31
// https://youtu.be/VFYmBm2NkZ0?si=Z81Yy5Q4APD7gy6g
// https://vimeo.com/717781102?share=copy

const ClassroomScreen = () => {
  const { courseId } = useParams();
  const { t, i18n } = useTranslation(['course']);

  const [currentLesson, setCurrentLesson] = useState(null);
  const [showLessonList, setShowLessonList] = useState(false);

  const {
    data: course,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetUserCourseProgressQuery({ courseId });

  useEffect(() => {
    if (isSuccess && course) {
      setCurrentLesson(course.lessonProgress[0]);
    }
  }, [isSuccess, course]);

  const Curriculum = () => {
    return (
      <Card body className="shadow">
        <h3 className="text-center">{t('curriculum')}</h3>
        {course &&
          course.lessonProgress.map((item, index) => (
            <div
              key={index}
              className={`curriculum-lesson__item mb-2 ${
                item.lesson?._id === currentLesson.lesson?._id
                  ? 'text-primary bg-success'
                  : ''
              }`}
            >
              {item.lessonType === 'Video' ? (
                <FaPlay className="me-2" />
              ) : (
                <CiText className="me-2" />
              )}
              <p className="lead m-0 me-1">
                {i18n.language === 'en'
                  ? item.lesson?.title
                  : item.lesson?.translations?.hu?.title || item.lesson?.title}
              </p>
              <p className="lead m-0">
                {convertSecondstoTime(item.lesson?.duration)}
              </p>
            </div>
          ))}
      </Card>
    );
  };

  // if (course) {
  //   console.log(course);
  // }

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
        course &&
        currentLesson && (
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
            <Container fluid className="px-5 py-3">
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
              <Row className="flex-lg-nowrap">
                <Col
                  xs={12}
                  lg={true}
                  className="ps-md-2 pt-2 position-relative"
                >
                  <div
                    className="position-absolute top-0"
                    style={{ right: '-1rem' }}
                  >
                    <button
                      className="show-lesson-button d-none d-lg-inline-block"
                      onClick={() => setShowLessonList(!showLessonList)}
                    >
                      {showLessonList ? <FaChevronRight /> : <FaChevronLeft />}
                    </button>
                  </div>
                  <VideoPlayer
                    url={
                      i18n.language === 'en'
                        ? currentLesson.lesson?.videoUrl
                        : currentLesson.lesson?.translations?.hu?.videoUrl ||
                          currentLesson.lesson?.videoUrl
                    }
                  />
                  <h3 className="mt-3">
                    {i18n.language === 'en'
                      ? currentLesson?.lesson?.title
                      : currentLesson?.lesson?.translations?.hu?.title ||
                        currentLesson?.lesson?.title}
                  </h3>
                </Col>

                <Col
                  xs={12}
                  lg="auto"
                  className="px-2 d-none d-lg-block"
                  style={{ minHeight: '400px' }}
                >
                  <Collapse in={showLessonList} appear dimension="width">
                    <Card body className="shadow">
                      <h3 className="text-center">{t('curriculum')}</h3>
                      {course &&
                        course.lessonProgress.map((item, index) => (
                          <div
                            key={index}
                            className={`curriculum-lesson__item mb-2 ${
                              item.lesson?._id === currentLesson.lesson?._id
                                ? 'text-primary bg-success'
                                : ''
                            }`}
                          >
                            {item.lessonType === 'Video' ? (
                              <FaPlay className="me-2" />
                            ) : (
                              <CiText className="me-2" />
                            )}
                            <p className="lead m-0 me-1">
                              {i18n.language === 'en'
                                ? item.lesson?.title
                                : item.lesson?.translations?.hu?.title ||
                                  item.lesson?.title}
                            </p>
                            <p className="lead m-0">
                              {convertSecondstoTime(item.lesson?.duration)}
                            </p>
                          </div>
                        ))}
                    </Card>
                  </Collapse>
                </Col>
                <Col
                  xs={12}
                  lg="auto"
                  className="px-2 d-block d-lg-none"
                  style={{ minHeight: '400px' }}
                >
                  <Curriculum />
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
