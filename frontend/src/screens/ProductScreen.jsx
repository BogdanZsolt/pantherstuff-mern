import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Button,
  Form,
  Container,
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
import ThumbsGallery from '../components/ThumbsGalery/index.jsx';
import { Trans, useTranslation } from 'react-i18next';
import SelectColor from '../components/SelectColor';
import SelectSize from '../components/SelectSize';
import { toCurrency, uuid } from '../utils/converter';
import Editor from '../components/Editor.jsx';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { toggleWishList } from '../slices/wishListSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const { t, i18n } = useTranslation(['product']);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showReview, setShowReview] = useState(false);
  const [productName, setProductName] = useState('');
  const [beforePrice, setBeforePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  const { userAuth } = useSelector((state) => state.auth);
  const { wishListItems } = useSelector((state) => state.wishList);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const addToCartHandler = () => {
    const { _id, name, currentPrice, thumbnails, countInStock, toBeDelivered } =
      product;
    const cartId = uuid();
    const name_hu = product.translations?.hu?.name || product.name;
    const currentPrice_hu =
      product.translations?.hu?.currentPrice || product.currentPrice;
    const thumbnail = thumbnails[0];
    const type = 'product';
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
        color,
        size,
        qty,
        countInStock,
        toBeDelivered,
      })
    );
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
      setColor(product.colors[0]);
      // setSize(product.sizes[0]);
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
      toast.success(t('reviewSubmitted'));
      setRating(0);
      setComment('');
      setShowReview(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const addToWishListHandler = () => {
    const { _id, name, currentPrice, thumbnails, toBeDelivered } = product;
    const name_hu = product.translations?.hu?.name || product.name;
    const currentPrice_hu =
      product.translations?.hu?.currentPrice || product.currentPrice;
    const thumbnail = thumbnails[0];
    const type = 'product';
    dispatch(
      toggleWishList({
        _id,
        type,
        name,
        name_hu,
        currentPrice,
        currentPrice_hu,
        thumbnail,
        toBeDelivered,
      })
    );
  };

  const hasReview = () => {
    const isUserReview = product?.reviews.find(
      (review) => review.user === userAuth._id
    );

    return isUserReview ? true : false;
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
                  <ThumbsGallery
                    images={product.thumbnails}
                    direction="vertical"
                    aspectRatio={2 / 3}
                  />
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
                      <SelectColor
                        colors={product.colors}
                        color={color}
                        setColor={setColor}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>{t('size')}</Row>
                      <SelectSize
                        sizes={product.sizes}
                        size={size}
                        setSize={setSize}
                      />
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
                id="product-tab"
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3 product-tab scrollto"
                justify
              >
                <Tab eventKey="description" title={t('productDetails')}>
                  <Editor content={product.description} editable={false} />
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
                          className="position-absolute z-1"
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
                    <h3>{t('ratingAndViews')}</h3>
                    <Row className="header">
                      <Col>
                        {product.reviews.length > 0 && (
                          <div className="d-flex align-items-center">
                            <span className="rating">{product.rating}</span>
                            <div className="wrap">
                              <span className="reviews">
                                {t('numReviews', {
                                  numReviews: product.numReviews,
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
                    {product.reviews.length === 0 && (
                      <Message>{t('noReviews')}</Message>
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
                        {loadingProductReview && <Loader />}

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
    </>
  );
};

export default ProductScreen;
