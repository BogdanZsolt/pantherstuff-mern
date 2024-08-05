import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Banner from '../components/Banner';
import ThumbsGallery from '../components/ThumbsGallery';
import { Trans, useTranslation } from 'react-i18next';
import { toCurrency, uuid } from '../utils/converter';
import { FaStar } from 'react-icons/fa';
import {
  RiCheckboxCircleLine,
  RiGiftLine,
  RiHeartFill,
  RiHeartLine,
  RiQuestionLine,
  RiShareForwardLine,
  RiTruckLine,
} from 'react-icons/ri';
import SelectSize from '../components/SelectSize';
import Editor from '../components/Editor.jsx';
import Rating from '../components/Rating';
import { toast } from 'react-toastify';
import {
  useGetSupplyDetailsQuery,
  useSupplyCreateReviewMutation,
} from '../slices/suppliesApiSlice.js';
import { toggleWishList } from '../slices/wishListSlice';
import { addToCart } from '../slices/cartSlice.js';

const SupplyScreen = () => {
  const { id: supplyId } = useParams();

  const { i18n, t } = useTranslation('supply');

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [supplyName, setSupplyName] = useState('');
  const [beforePrice, setBeforePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const { wishListItems } = useSelector((state) => state.wishList);

  const [activeTab, setActiveTab] = useState('description');

  const {
    data: supply,
    isLoading,
    refetch,
    error,
  } = useGetSupplyDetailsQuery(supplyId);

  const [createReview, { isLoading: loadingProductReview }] =
    useSupplyCreateReviewMutation();

  useEffect(() => {
    if (supply) {
      setSupplyName(
        i18n.language === 'en'
          ? supply.name
          : supply.translations?.hu?.name || supply.name
      );
      setBeforePrice(
        i18n.language === 'en'
          ? supply.beforePrice
          : supply.translations?.hu?.beforePrice || supply.beforePrice
      );
      setCurrentPrice(
        i18n.language === 'en'
          ? supply.currentPrice
          : supply.translations?.hu?.currentPrice || supply.currentPrice
      );
      setShippingPrice(i18n.language === 'en' ? 100 : 20000);
      setSize(supply.sizes[0]?._id);
    }
  }, [supply, i18n.language]);

  const addToCartHandler = () => {
    const { _id, name, currentPrice, thumbnails, countInStock } = supply;
    const cartId = uuid();
    const name_hu = supply.translations?.hu?.name || supply.name;
    const currentPrice_hu =
      supply.translations?.hu?.currentPrice || supply.currentPrice;
    const thumbnail = thumbnails[0];
    const type = 'supply';
    dispatch(
      addToCart({
        cartId,
        _id,
        type,
        name,
        name_hu,
        currentPrice,
        currentPrice_hu,
        thumbnail,
        qty,
        countInStock,
      })
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        supplyId,
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

  const addToWishListHandler = () => {
    dispatch(toggleWishList({ ...supply, type: 'supply' }));
  };

  const isWishListed = () => {
    const content = wishListItems.find((x) => x._id === supplyId);

    return content?._id === supplyId ? true : false;
  };

  const hasReview = () => {
    const isUserRview = supply?.reviews.find(
      (review) => review.user === userInfo._id
    );

    return isUserRview ? true : false;
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Banner src="/images/ecoprint-06.webp" title={supplyName} />
          <Meta title={supplyName} />
          <Container>
            <div className="supply">
              <Link className="btn btn-primary my-3" to="/supplystore">
                Go Back
              </Link>
              <Row className="mb-5">
                <Col md={6}>
                  <ThumbsGallery images={supply.thumbnails} />
                </Col>
                <Col md={6}>
                  <ListGroup>
                    <ListGroup.Item>
                      <h3>{supplyName}</h3>
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
                            rating: supply.rating,
                            count: supply.numReviews,
                          })}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>{t('size')}</Row>
                      <SelectSize
                        sizes={supply.sizes}
                        size={size}
                        setSize={setSize}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Trans values={{ count: supply.countInStock }}>
                        {t('instock')}{' '}
                      </Trans>
                      <RiCheckboxCircleLine
                        style={
                          supply.countInStock > 0
                            ? { backgroundColor: '#00ff00' }
                            : { backgroundColor: '#ff0000' }
                        }
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        {supply.countInStock > 0 && (
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
                                {[...Array(supply.countInStock).keys()].map(
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
                                disabled={supply.countInStock === 0}
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
                    <ListGroup.Item>
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
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <Tabs
                id="supply-tab"
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3 supply-tab scrollto"
                justify
              >
                <Tab eventKey="description" title={t('supplyDetails')}>
                  <Editor content={supply.description} editable={false} />
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
                          {supply.numReviews}
                        </Badge>
                      </span>
                    </React.Fragment>
                  }
                >
                  <Row className="review">
                    <h3>{t('ratingAndViews')}</h3>
                    <Row className="header">
                      <Col>
                        {supply.reviews.length > 0 && (
                          <div className="d-flex align-items-center">
                            <span className="rating">{supply.rating}</span>
                            <div className="wrap">
                              <span className="reviews">
                                {t('numReviews', {
                                  numReviews: supply.numReviews,
                                })}
                              </span>
                            </div>
                          </div>
                        )}
                      </Col>
                      {userInfo && !hasReview() && (
                        <Col className="text-end mb-3">
                          <Button onClick={() => setShowReview(true)}>
                            {t('writeAReview')}
                          </Button>
                        </Col>
                      )}
                    </Row>
                    {supply.reviews.length === 0 && (
                      <Message>{t('noReviews')}</Message>
                    )}
                    <ListGroup variant="flush">
                      {supply.reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} />
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      ))}
                      <ListGroup.Item>
                        {loadingProductReview && <Loader />}

                        {!userInfo && (
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
                <Tab eventKey="shipping" title={t('shipping')}>
                  Tab content for Contact
                </Tab>
              </Tabs>
            </div>
          </Container>
          <Modal show={showReview} onHide={() => setShowReview(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>{t('writeACustomerReview')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {userInfo && (
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
                      disabled={loadingProductReview}
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
        </>
      )}
    </div>
  );
};

export default SupplyScreen;
