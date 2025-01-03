import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
} from 'react-bootstrap';
import Banner from '../components/Banner.jsx';
// import ThumbsGallery from '../components/ThumbsGallery';
import EventThumbsGalery from '../components/ThumbsGalery/index.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import Meta from '../components/Meta.jsx';
import Editor from '../components/Editor.jsx';
import {
  getCanBooking,
  getEventDate,
  getTimeStamp,
  toCurrency,
  uuid,
} from '../utils/converter.js';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { addToCart } from '../slices/cartSlice';
import { useGetEventDetailsQuery } from '../slices/eventsApiSlice.js';

const EventScreen = () => {
  const { id: eventId } = useParams();
  const { t, i18n } = useTranslation(['event']);

  const [eventTitle, setEventTitle] = useState('');
  const [description, setDescription] = useState(null);
  const [beforePrice, setBeforePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [category, setCategory] = useState('');
  // const [advance, setAdvance] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [canBooking, setCanBooking] = useState(false);
  const [canBuy, setCanBuy] = useState(false);
  const [bookingModalshow, setBookingModalshow] = useState(false);
  const [activeAcceptButton, setActiveAcceptButton] = useState(false);

  const dispatch = useDispatch();

  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useGetEventDetailsQuery(eventId);

  useEffect(() => {
    if (event) {
      setEventTitle(
        i18n.language === 'en'
          ? event.title
          : event.translations?.hu?.title || event.title
      );
      setDescription(
        i18n.language === 'en'
          ? event.description
          : event.translations?.hu?.description || event.description
      );
      setCategory(
        i18n.language === 'en'
          ? event.category?.title
          : event.category?.translations?.hu?.title || event.category?.title
      );
      setBeforePrice(
        i18n.language === 'en'
          ? event.beforePrice
          : event.translations?.hu?.beforePrice || event.beforePrice
      );
      setCurrentPrice(
        i18n.language === 'en'
          ? event.currentPrice
          : event.translations?.hu?.currentPrice || event.currentPrice
      );
      setStartDate(getEventDate(event.startDate, i18n.language, true));
      setCanBooking(getCanBooking(event.startDate, 30));
      setCanBuy(getTimeStamp(event.startDate) > getTimeStamp(new Date()));
    }
  }, [event, i18n.language]);

  const addToCartHandler = (event, isAdvance = false) => {
    const { _id, title: name, currentPrice, advance, images } = event;
    const cartId = uuid();
    const name_hu = event.translations?.hu?.title || name;
    const currentPrice_hu =
      event.translations?.hu?.currentPrice || currentPrice;
    const advance_hu = event.translations?.hu?.advance || event.advance;
    const qty = 1;
    const type = 'event';

    dispatch(
      addToCart({
        cartId,
        _id,
        type,
        name,
        name_hu,
        thumbnail: images[0],
        currentPrice: isAdvance ? advance : currentPrice,
        currentPrice_hu: isAdvance ? advance_hu : currentPrice_hu,
        fullPrice: currentPrice,
        fullPrice_hu: currentPrice_hu,
        qty,
        toBeDelivered: false,
      })
    );

    setBookingModalshow(false);
  };

  const bookingModalHandleClose = () => setBookingModalshow(false);
  const bookingModalHandleShow = () => setBookingModalshow(true);

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
          <Banner src={event.images[0]} title={eventTitle} />
          <Meta title={event.title} />
          <Container className="pt-3">
            <div className="event">
              <Link className="btn btn-primary my-3" to="/event">
                {t('goBack')}
              </Link>
              <Row className="mb-2">
                <Col md={6}>
                  <EventThumbsGalery images={event.images} />
                </Col>
                <Col md={6}>
                  <ListGroup>
                    <ListGroup.Item className="pe-0 py-0">
                      {t('category')}{' '}
                      <Link to={`/event/category/${event.category?.id}`}>
                        <span className="fw-bold">{category}</span>
                      </Link>
                    </ListGroup.Item>
                    <ListGroup.Item className="pe-0 py-0">
                      <h3>{eventTitle}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item className="pe-0 py-0 mb-2">
                      <span className="fw-bold">{startDate}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="pe-0 py-0 mb-2">
                      <span className="fw-bold">{event.location?.address}</span>
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
                    <ListGroup.Item className="pe-0 py-0">
                      <RiCheckboxCircleLine
                        style={
                          event.maxGroupsize > 0
                            ? { backgroundColor: '#00ff00' }
                            : { backgroundColor: '#ff0000' }
                        }
                      />{' '}
                      <Trans
                        values={{
                          count: event.maxGroupsize,
                          free: event.maxGroupsize - event.booking?.length,
                        }}
                      >
                        {t('maxGroupSize')}{' '}
                      </Trans>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {canBuy && (
                        <Button
                          variant="success"
                          className="btn btn-lasaphire"
                          onClick={() => addToCartHandler(event)}
                        >
                          <span className="fw-bold">{t('iWillBeThere')}</span>
                        </Button>
                      )}{' '}
                      {canBooking && (
                        <Button
                          variant="primary"
                          className="btn"
                          onClick={bookingModalHandleShow}
                        >
                          <span className="fw-bold">{t('booking')}</span>
                        </Button>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <Row>
                <Editor content={description} editable={false} />
              </Row>
            </div>
          </Container>
        </>
      )}
      <Modal
        show={bookingModalshow}
        backdrop="static"
        keyboard={false}
        centered
        onHide={bookingModalHandleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('eventModalHeading')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('eventModalBody')}</p>
          <p>
            <Form.Check>
              <Form.Check.Input
                type="checkbox"
                id="activeAccept"
                checked={activeAcceptButton}
                onChange={(e) => setActiveAcceptButton(e.target.checked)}
              />
              <Form.Check.Label for="activeAccept">
                {t('acceptTerms&Conditions')}
              </Form.Check.Label>
            </Form.Check>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={bookingModalHandleClose}>
            {t('eventModalCloseButton')}
          </Button>
          <Button
            variant="success"
            className="btn-lasaphire"
            disabled={!activeAcceptButton}
            onClick={() => addToCartHandler(event, true)}
          >
            {t('eventModalContinueButton')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EventScreen;
