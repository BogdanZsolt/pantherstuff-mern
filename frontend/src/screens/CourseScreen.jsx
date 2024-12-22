import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import Banner from '../components/Banner.jsx';
import Meta from '../components/Meta.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import ThumbsGalery from '../components/ThumbsGalery/index.jsx';
import { toCurrency } from '../utils/converter';
import { useGetCourseDetailsQuery } from '../slices/coursesApiSlice.js';

const CourseScreen = () => {
  const { id: courseId } = useParams();
  const { t, i18n } = useTranslation(['course']);

  const [courseTitle, setCourseTitle] = useState('');
  const [description, setDescription] = useState(null);
  const [beforePrice, setBeforePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [category, setCategory] = useState('');

  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useGetCourseDetailsQuery(courseId);

  useEffect(() => {
    if (course) {
      setCourseTitle(
        i18n.language === 'en'
          ? course.title
          : course.translations?.hu?.title || course.title
      );
      setDescription(
        i18n.language === 'en'
          ? course.description
          : course.translations?.hu?.description || course.description
      );
      setCategory(
        i18n.language === 'en'
          ? course.category?.title
          : course.category?.translations?.hu?.title || course.category?.title
      );
      setBeforePrice(
        i18n.language === 'en'
          ? course.beforePrice
          : course.translations?.hu?.beforePrice || course.beforePrice
      );
      setCurrentPrice(
        i18n.language === 'en'
          ? course.currentPrice
          : course.translations?.hu?.currentPrice || course.currentPrice
      );
    }
  }, [course, i18n.language]);

  const addToCartHandler = () => {
    console.log('kurzus kosárba');
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <div>
            <Banner src={course.images[0]} title={courseTitle} />
            <Meta title={course.title} />
            <Container className="pt-3">
              <div className="course">
                <Link className="btn btn-primary my-3" to="/onlinecourses">
                  {t('goBack')}
                </Link>
                <Row className="mb-2">
                  <Col md={6}>
                    <ThumbsGalery
                      images={course.images}
                      aspectRatio={16 / 10}
                    />
                  </Col>
                  <Col md={6}>
                    <ListGroup>
                      <ListGroup.Item className="pe-0 py-0">
                        {t('category')}{' '}
                        <Link to={`/course/category/${course.category?.id}`}>
                          <span className="fw-bold">{category}</span>
                        </Link>
                      </ListGroup.Item>
                      <ListGroup.Item className="pe-0 py-0">
                        <h3>{courseTitle}</h3>
                      </ListGroup.Item>
                      <ListGroup.Item className="pe-0 py-0 mb-2">
                        <Row className="align-items-center justify-content-between">
                          <Col className="price">
                            <span className="current">
                              {toCurrency(i18n.language, currentPrice)}
                            </span>
                            {beforePrice > 0 && (
                              <div className="wrap">
                                <span className="before">
                                  {toCurrency(i18n.language, beforePrice)}
                                </span>
                                <span className="discount">
                                  {(
                                    (beforePrice / currentPrice - 1) *
                                    100
                                  ).toFixed(2)}
                                  %
                                </span>
                              </div>
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button
                          variant="success"
                          className="btn btn-lasaphire"
                          onClick={addToCartHandler}
                        >
                          {t('addToCart')}
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        </>
      )}
    </>
  );
};

export default CourseScreen;
