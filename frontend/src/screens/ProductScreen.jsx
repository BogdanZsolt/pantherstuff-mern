import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Button,
  Form,
  Container,
  ListGroupItem,
  Tabs,
  Tab,
  Badge,
  Modal,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import {
  RiCheckboxCircleLine,
  RiHeartLine,
  RiShareForwardLine,
  RiQuestionLine,
  RiGiftLine,
  RiTruckLine,
  RiHeartFill,
} from 'react-icons/ri';
import { toast } from 'react-toastify';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Banner from '../components/Banner';
import ThumbsGallery from '../components/ThumbsGallery';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { toggleWishList } from '../slices/wishListSlice';
import { Trans, useTranslation } from 'react-i18next';
import { toCurrency } from '../utils/converter';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const { t, i18n } = useTranslation(['product']);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showReview, setShowReview] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { wishListItems } = useSelector((state) => state.wishList);
  const [productName, setProductName] = useState('');
  const [beforePrice, setBeforePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);

  const [activeTab, setActiveTab] = useState('description');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const isWishListed = () => {
    const content = wishListItems.find((x) => x._id === productId);

    return content?._id === productId ? true : false;
  };

  useEffect(() => {
    if (product) {
      setProductName(
        i18n.language === 'en'
          ? product.name
          : product.translations?.hu?.name || product.name
      );
      setBeforePrice(
        i18n.language === 'en'
          ? product.beforePrice
          : product.translations?.hu?.beforePrice || product.beforePrice
      );
      setCurrentPrice(
        i18n.language === 'en'
          ? product.currentPrice
          : product.translations?.hu?.currentPrice || product.currentPrice
      );
      setShippingPrice(i18n.language === 'en' ? 100 : 20000);
    }
  }, [product, i18n.language]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review Submitted');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const addToWishListHandler = () => {
    dispatch(toggleWishList({ ...product }));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Banner src="/images/ecoprint-06.webp" title={productName} />
          <Meta title={productName} />
          <Container>
            <div className="product">
              <Link className="btn btn-primary my-3" to="/shop">
                Go Back
              </Link>
              <Row className="mb-5">
                <Col md={6}>
                  <ThumbsGallery images={product.thumbnails} />
                </Col>
                <Col md={6}>
                  <ListGroup>
                    <ListGroup.Item>
                      <h3>{productName}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
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
                        <Col className="text-end">
                          <FaStar />
                          {t('reviews', {
                            rating: product.rating,
                            count: product.numReviews,
                          })}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>{t('colors')}</Row>
                      <Row>
                        {product.colors.map((color, index) => (
                          <div className="color-box" key={index}>
                            <span
                              className="color"
                              style={{ backgroundColor: `${color}` }}
                            ></span>
                          </div>
                        ))}
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>{t('size')}</Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Trans values={{ count: product.countInStock }}>
                        {t('instock')}{' '}
                      </Trans>
                      <RiCheckboxCircleLine
                        style={
                          product.countInStock > 0
                            ? { backgroundColor: '#00ff00' }
                            : { backgroundColor: '#ff0000' }
                        }
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        {product.countInStock > 0 && (
                          <>
                            <Col xs={4} sm={4} md={6} lg={4}>
                              {t('qty')}
                            </Col>
                            <Col xs={8} sm={4} md={6} lg={4}>
                              <Form.Control
                                as="select"
                                value={qty}
                                onChange={(e) => setQty(Number(e.target.value))}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </Form.Control>
                            </Col>
                            <Col xs={12} sm={4} md={12} lg={4}>
                              <Button
                                className="btn btn-success btn-lasaphire"
                                type="button"
                                disabled={product.countInStock === 0}
                                onClick={addToCartHandler}
                              >
                                {t('addToCart')}
                              </Button>
                            </Col>
                          </>
                        )}
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <ul className="action">
                        <li>
                          <Link onClick={addToWishListHandler}>
                            {isWishListed() ? <RiHeartFill /> : <RiHeartLine />}
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
                    <ListGroupItem>
                      <ul className="shipping">
                        <li>
                          <RiGiftLine />
                          <span>
                            {t('freeShippingAndReturn', {
                              price: toCurrency(i18n.language, shippingPrice),
                            })}
                          </span>
                        </li>
                        <li>
                          <RiTruckLine />
                          <span>{t('estimateDelivery')} 01 - 07 jan, 2030</span>
                        </li>
                      </ul>
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
              <Tabs
                id="product-tab"
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3 product-tab scrollto"
                justify
              >
                <Tab eventKey="description" title={t('productDetails')}>
                  <p>{product.description}</p>
                </Tab>
                <Tab eventKey="custom" title={t('custom')}>
                  Tab content for Profile
                </Tab>
                <Tab
                  eventKey="reviews"
                  title={
                    <React.Fragment>
                      <span className="position-relative">
                        {t('reviewsTab')}
                        <Badge
                          className="position-absolute"
                          bg="secondary"
                          text="primary"
                          pill
                        >
                          {product.numReviews}
                        </Badge>
                      </span>
                    </React.Fragment>
                  }
                >
                  <Row className="review">
                    <h3>Rating & views</h3>
                    <Row className="header">
                      <Col>
                        {product.reviews.length > 0 && (
                          <div className="d-flex align-items-center">
                            <span className="rating">{product.rating}</span>
                            <div className="wrap">
                              <span className="reviews">{`${product.numReviews} reviews`}</span>
                            </div>
                          </div>
                        )}
                      </Col>
                      <Col className="text-end">
                        <Button onClick={() => setShowReview(true)}>
                          Write a review
                        </Button>
                      </Col>
                    </Row>
                    {product.reviews.length === 0 && (
                      <Message>No Reviews</Message>
                    )}
                    <ListGroup variant="flush">
                      {product.reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} />
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      ))}
                      <ListGroup.Item>
                        <h2>Write a Customer Review</h2>
                        {loadingProductReview && <Loader />}

                        {userInfo ? (
                          <Form onSubmit={submitHandler}>
                            <Form.Group controlId="rating" className="my-2">
                              <Form.Label>Rating</Form.Label>
                              <Form.Control
                                as="select"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                <option value="">Select...</option>
                                <option value="1">1 - Poor</option>
                                <option value="2">2 - Fair</option>
                                <option value="3">3 - Good</option>
                                <option value="4">4 - Very Good</option>
                                <option value="5">5 - Excelent</option>
                              </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="comment" className="my-2">
                              <Form.Label>Comment</Form.Label>
                              <Form.Control
                                as="textarea"
                                row="3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              ></Form.Control>
                              <Button
                                disabled={loadingProductReview}
                                type="submit"
                                variant="primary"
                              >
                                Submit
                              </Button>
                            </Form.Group>
                          </Form>
                        ) : (
                          <Message>
                            Please <Link to="/login">sign in</Link> to write a
                            review
                          </Message>
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  </Row>
                </Tab>
                <Tab eventKey="shipping" title={t('shipping')}>
                  Tab content for Contact
                </Tab>
              </Tabs>
            </div>
          </Container>
          <Modal show={showReview} onHide={() => setShowReview(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you are reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowReview(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => setShowReview(false)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default ProductScreen;
