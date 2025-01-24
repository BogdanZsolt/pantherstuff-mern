import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Col, Collapse, Container, Row } from 'react-bootstrap';
import Banner from '../../components/Banner';
import Meta from '../../components/Meta.jsx';
import Loader from '../../components/Loader';
import Message from '../../components/Message.jsx';
// import { convertSecondstoTime } from '../../utils/converter.js';
import { MdOutlineOndemandVideo, MdOutlineArticle } from 'react-icons/md';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import VideoPlayer from '../../components/VideoPlayer.jsx';
import TextViewer from './TextViewer.jsx';
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

  const { data, isLoading, isError, error } = useGetUserCourseProgressQuery({
    courseId,
  });

  useEffect(() => {
    if (data) {
      setCurrentLesson(data.course?.curriculum[0]);
    }
  }, [data]);

  const Curriculum = () => {
    return (
      <>
        <h3 className="text-center">{t('curriculum')}</h3>
        {data &&
          data.course?.curriculum?.map((item, index) => (
            <div
              role="button"
              key={index}
              className={`curriculum-lesson__item mb-2 p-2 rounded ${
                item.lesson?._id === currentLesson.lesson?._id
                  ? 'text-primary bg-success'
                  : ''
              }`}
              onClick={() => setCurrentLesson(item)}
            >
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  <input type="checkbox" className="me-2" />
                  <span className="lead m-0 me-1">
                    {i18n.language === 'en'
                      ? item.lesson?.title
                      : item.lesson?.translations?.hu?.title ||
                        item.lesson?.title}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-center ms-2">
                  {item.lessonType === 'Video' ? (
                    <MdOutlineOndemandVideo className="me-2" />
                  ) : (
                    <MdOutlineArticle className="me-2" />
                  )}
                  <span className="m-0">
                    {convertSecondstoTime(item.lesson?.duration)}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  };

  // if (course) {
  //   console.log(course);
  // }

  if (data) {
    console.log(data);
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
        data &&
        currentLesson && (
          <>
            <Banner
              src="/images/ecoprint-03-1280x360.webp"
              title={t('classroom')}
            />
            <Meta
              title={`${t('classroom')} | ${
                i18n.language === 'en'
                  ? data.course.title
                  : data.course.translations?.hu?.title || data.course.title
              }`}
            />
            <Container fluid className="px-5 py-3">
              <h2 className="text-center mt-3 mb-0">
                {18n.language === 'en'
                  ? data.course.title
                  : data.course.translations?.hu?.title || data.course.title}
              </h2>
              <Link to={`/onlinecourses/category/${data.course.category?.id}`}>
                <p className="text-center">
                  {i18n.language === 'en'
                    ? data.course.category.title
                    : data.course.category.translations?.hu?.title ||
                      data.course.category.title}
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
                  {currentLesson.lessonType === 'Video' ? (
                    <>
                      <VideoPlayer
                        url={
                          i18n.language === 'en'
                            ? currentLesson.lesson?.videoUrl
                            : currentLesson.lesson?.translations?.hu
                                ?.videoUrl || currentLesson.lesson?.videoUrl
                        }
                      />
                      <h3 className="mt-3">
                        {i18n.language === 'en'
                          ? currentLesson?.lesson?.title
                          : currentLesson?.lesson?.translations?.hu?.title ||
                            currentLesson?.lesson?.title}
                      </h3>
                    </>
                  ) : (
                    <TextViewer content={currentLesson.lesson.text} />
                  )}
                </Col>

                <Col
                  xs={12}
                  lg="auto"
                  className="px-2 d-none d-lg-block"
                  style={{ minHeight: '400px' }}
                >
                  <Collapse in={showLessonList} appear dimension="width">
                    <Card body className="shadow h-100">
                      <Curriculum />
                    </Card>
                  </Collapse>
                </Col>
                <Col
                  xs={12}
                  lg="auto"
                  className="px-2 d-block d-lg-none"
                  style={{ minHeight: '400px' }}
                >
                  <Card body className="shadow">
                    <Curriculum />
                  </Card>
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
