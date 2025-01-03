import React, { useEffect, useState } from 'react';
import {
  // useNavigate,
  Link,
  useParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import {
  Badge,
  Button,
  Col,
  Container,
  ListGroup,
  Modal,
  Row,
  Tab,
  Tabs,
  Form,
} from 'react-bootstrap';
import Banner from '../components/Banner.jsx';
import Meta from '../components/Meta.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import ThumbsGalery from '../components/ThumbsGalery/index.jsx';
import { toCurrency, uuid } from '../utils/converter';
import Rating from '../components/Rating.jsx';
import Editor from '../components/Editor.jsx';
import { toast } from 'react-toastify';
import {
  RiHeartFill,
  RiHeartLine,
  RiQuestionLine,
  RiShareForwardLine,
} from 'react-icons/ri';
import {
  useGetCourseDetailsQuery,
  useCourseCreateReviewMutation,
} from '../slices/coursesApiSlice.js';
import { toggleWishList } from '../slices/wishListSlice';
import { addToCart } from '../slices/cartSlice.js';

const CourseScreen = () => {
  const { id: courseId } = useParams();
  const { t, i18n } = useTranslation(['course']);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [courseTitle, setCourseTitle] = useState('');
  const [description, setDescription] = useState(null);
  const [beforePrice, setBeforePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showReview, setShowReview] = useState(false);

  const { userAuth } = useSelector((state) => state.auth);
  const { wishListItems } = useSelector((state) => state.wishList);

  const {
    data: course,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCourseDetailsQuery(courseId);

  const [createReview, { isLoading: isLoadingReview }] =
    useCourseCreateReviewMutation();

  const isWishListed = () => {
    const content = wishListItems.find((x) => x._id === courseId);

    return content?._id === courseId ? true : false;
  };

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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        courseId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success(t('reviewSubmitted'));
      setRating(0);
      setComment('');
      setShowReview(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const addToCartHandler = () => {
    const { _id, title: name, currentPrice, images } = course;
    const cartId = uuid();
    const name_hu = course.translations?.hu?.title || name;
    const currentPrice_hu =
      course.translations?.hu?.currentPrice || currentPrice;
    const qty = 1;
    const type = 'course';
    dispatch(
      addToCart({
        cartId,
        _id,
        type,
        name,
        name_hu,
        thumbnail: images[0],
        currentPrice,
        currentPrice_hu,
        qty,
        toBeDelivered: false,
      })
    );
  };

  const addToWishListHandler = () => {
    const { _id, title, currentPrice, images } = course;
    const name_hu = course.translations?.hu?.title || title;
    const currentPrice_hu =
      course.translations?.hu?.currentPrice || currentPrice;
    const thumbnail = images[0];
    const type = 'course';
    dispatch(
      toggleWishList({
        _id,
        type,
        name: title,
        name_hu,
        currentPrice,
        currentPrice_hu,
        thumbnail,
        toBeDelivered: false,
      })
    );
  };

  const hasReview = () => {
    const isUserReview = course?.reviews.find(
      (review) => review.user === userAuth._id
    );

    return isUserReview ? true : false;
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
                        <Link
                          to={`/onlinecourses/category/${course.category?.id}`}
                        >
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
                      <ListGroup.Item>
                        <ul className="action">
                          <li>
                            <Link onClick={addToWishListHandler}>
                              {isWishListed() ? (
                                <RiHeartFill />
                              ) : (
                                <RiHeartLine />
                              )}
                              <span>{t('addToWishlist')}</span>
                            </Link>
                          </li>
                          <li>
                            <Link>
                              <RiShareForwardLine />
                              <span>{t('share')}</span>
                            </Link>
                          </li>
                          <li>
                            <Link>
                              <RiQuestionLine />
                              <span>{t('askQuestion')}</span>
                            </Link>
                          </li>
                        </ul>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
                <Tabs
                  id="course-tab"
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-3 course-tab scrollto"
                  justify
                >
                  <Tab eventKey="description" title={t('courseDetails')}>
                    <Editor content={description} editable={false} />
                  </Tab>
                  <Tab eventKey="curriculum" title={t('curriculum')}>
                    Tab content for Profile
                  </Tab>
                  <Tab
                    eventKey="reviews"
                    title={
                      <React.Fragment>
                        <span className="position-relative">
                          {t('reviewsTab')}
                          <Badge
                            className="position-absolute z-1"
                            bg="secondary"
                            text="primary"
                            pill
                          >
                            {course.numReviews}
                          </Badge>
                        </span>
                      </React.Fragment>
                    }
                  >
                    <Row className="review">
                      <h3>{t('ratingAndViews')}</h3>
                      <Row className="header">
                        <Col>
                          {course.reviews.length > 0 && (
                            <div className="d-flex align-items-center">
                              <span className="rating">{course.rating}</span>
                              <div className="wrap">
                                <span className="reviews">
                                  {t('numReviews', {
                                    numReviews: course.numReviews,
                                  })}
                                </span>
                              </div>
                            </div>
                          )}
                        </Col>
                        {userAuth && !hasReview() && (
                          <Col className="text-end my-3">
                            <Button onClick={() => setShowReview(true)}>
                              {t('writeAReview')}
                            </Button>
                          </Col>
                        )}
                      </Row>
                      {course.reviews.length === 0 && (
                        <Message>{t('noReviews')}</Message>
                      )}
                      <ListGroup variant="flush">
                        {course.reviews.map((review) => (
                          <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} />
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                          </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                          {isLoadingReview && <Loader />}

                          {!userAuth && (
                            <Message>
                              <Trans
                                i18nKey={t('pleaseSignInToWriteReview')}
                                components={{ 1: <Link to="/login" /> }}
                              />
                            </Message>
                          )}
                        </ListGroup.Item>
                      </ListGroup>
                    </Row>
                  </Tab>
                </Tabs>
              </div>
            </Container>
            <Modal
              show={showReview}
              onHide={() => setShowReview(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>{t('writeACustomerReview')}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {userAuth && (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating" className="my-2">
                      <Form.Label>{t('rating')}</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">{t('select')}...</option>
                        <option value="1">1 - {t('poor')}</option>
                        <option value="2">2 - {t('fair')}</option>
                        <option value="3">3 - {t('good')}</option>
                        <option value="4">4 - {t('veryGood')}</option>
                        <option value="5">5 - {t('excelent')}</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment" className="my-2">
                      <Form.Label>{t('comment')}</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                      <Button
                        disabled={isLoadingReview}
                        type="submit"
                        variant="primary"
                        className="my-2"
                      >
                        {t('submit')}
                      </Button>
                    </Form.Group>
                  </Form>
                )}
              </Modal.Body>
            </Modal>
          </div>
        </>
      )}
    </>
  );
};

export default CourseScreen;
